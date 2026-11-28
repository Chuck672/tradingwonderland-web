import {
  DESKTOP_JWT_TTL_SECONDS,
  DESKTOP_REFRESH_TTL_SECONDS,
  bearerToken,
  clientIpFromHeaders,
  consumeDesktopLoginLimit,
  isBrowserDesktopCaller,
  readDesktopJwtSecret,
  signDesktopToken,
  verifyDesktopToken,
  vipUntilJson,
} from "./desktop-auth.ts";
import {
  DESKTOP_DEVICE_LIMIT,
  parseDesktopDeviceId,
  parseDesktopDeviceName,
  type DesktopDeviceDirectory,
  type DesktopDeviceView,
} from "./desktop-devices.ts";
import { desktopMembershipBlock } from "./license.ts";

const NO_STORE = { "Cache-Control": "no-store" };
const EMAIL_MAX = 254;
const PASSWORD_MAX = 500;
const REFRESH_TOKEN_MAX = 4000;

export type DesktopAccount = {
  id: string;
  email: string | null;
  membershipLevel: number | null;
  vipUntil: Date | string | null;
};

export type DesktopVerifyResult =
  | { ok: true; user: DesktopAccount }
  | { ok: false; reason: "missing" | "unknown" | "password_not_set" | "invalid" };

type Env = Record<string, string | undefined>;

export type DesktopLoginDeps = {
  verify: (email: string, password: string) => Promise<DesktopVerifyResult>;
  devices: DesktopDeviceDirectory;
  now?: () => Date;
  env?: Env;
  /** Test isolation. Production uses the process-local limiter. */
  buckets?: Map<string, number[]>;
};

export type DesktopSessionDeps = {
  loadUser: (id: string) => Promise<DesktopAccount | null>;
  devices: DesktopDeviceDirectory;
  now?: () => Date;
  env?: Env;
};

export type DesktopRefreshDeps = DesktopSessionDeps;

type LoginFields = {
  email: string;
  password: string;
  deviceId: string;
  deviceName: string | null;
  revokeDeviceId: string | null;
};

function json(body: unknown, status: number, extra?: Record<string, string>) {
  return Response.json(body, { status, headers: { ...NO_STORE, ...extra } });
}

function browserRejected(request: Request) {
  if (!isBrowserDesktopCaller(request.headers)) return null;
  return json({ error: "browser_origin", message: "Browser requests are not accepted." }, 403);
}

function secretOrResponse(env: Env) {
  const read = readDesktopJwtSecret(env);
  if (read.ok) return read;
  console.error("[DESKTOP_LOGIN] DESKTOP_JWT_SECRET is missing, shorter than 32 characters, or equal to NEXTAUTH_SECRET");
  return json({ error: "unconfigured", message: "Desktop sign-in is not configured." }, 503);
}

function membershipPayload(user: DesktopAccount, now: Date) {
  const level = user.membershipLevel ?? 0;
  const block = desktopMembershipBlock(level, user.vipUntil, now);
  if (block === "unpaid") {
    return json(
      { error: "unpaid", message: "This account does not have an active paid membership." },
      403,
    );
  }
  if (block === "expired") {
    return json({ error: "membership_expired", message: "This membership has expired." }, 403);
  }
  return {
    email: user.email,
    membershipLevel: level,
    vipUntil: vipUntilJson(user.vipUntil),
  };
}

function readLoginFields(body: unknown): { ok: true; fields: LoginFields } | { ok: false; message: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, message: "Email and password are required." };
  }
  const record = body as Record<string, unknown>;
  const email = record.email;
  const password = record.password;
  if (typeof email !== "string" || typeof password !== "string") {
    return { ok: false, message: "Email and password are required." };
  }
  const normalizedEmail = email.trim();
  if (!normalizedEmail || normalizedEmail.length > EMAIL_MAX || password.length === 0 || password.length > PASSWORD_MAX) {
    return { ok: false, message: "Email and password are required." };
  }

  const deviceId = parseDesktopDeviceId(record.deviceId);
  if (!deviceId) return { ok: false, message: "A device id is required." };

  const deviceName = parseDesktopDeviceName(record.deviceName);
  if (!deviceName.ok) return { ok: false, message: "The computer name is invalid." };

  let revokeDeviceId: string | null = null;
  if (record.revokeDeviceId != null && record.revokeDeviceId !== "") {
    const parsed = parseDesktopDeviceId(record.revokeDeviceId);
    if (!parsed) return { ok: false, message: "The computer to remove is invalid." };
    revokeDeviceId = parsed;
  }
  if (revokeDeviceId && revokeDeviceId === deviceId) {
    return { ok: false, message: "Choose a different computer to remove." };
  }

  return {
    ok: true,
    fields: {
      email: normalizedEmail,
      password,
      deviceId,
      deviceName: deviceName.name,
      revokeDeviceId,
    },
  };
}

function deviceError(error: "device_limit" | "device_not_found", devices: DesktopDeviceView[]) {
  if (error === "device_limit") {
    return json(
      {
        error,
        message: `This membership is already signed in on ${DESKTOP_DEVICE_LIMIT} computers.`,
        devices,
      },
      403,
    );
  }
  return json(
    {
      error,
      message: "That computer is not registered on this account.",
      devices,
    },
    400,
  );
}

function issueTokens(
  user: DesktopAccount & { email: string },
  membership: { email: string | null; membershipLevel: number; vipUntil: string | null },
  secret: string,
  now: Date,
  deviceId: string,
  refreshExpSec?: number,
) {
  const nowSec = Math.floor(now.getTime() / 1000);
  const refreshExp = refreshExpSec ?? nowSec + DESKTOP_REFRESH_TTL_SECONDS;
  const access = signDesktopToken(
    { sub: user.id, email: user.email, deviceId, tokenUse: "access" },
    secret,
    nowSec,
  );
  const refresh = signDesktopToken(
    { sub: user.id, email: user.email, deviceId, tokenUse: "refresh" },
    secret,
    nowSec,
    refreshExp - nowSec,
  );
  return json(
    {
      token: access,
      refreshToken: refresh,
      tokenType: "Bearer",
      expiresAt: new Date((nowSec + DESKTOP_JWT_TTL_SECONDS) * 1000).toISOString(),
      refreshExpiresAt: new Date(refreshExp * 1000).toISOString(),
      deviceId,
      email: membership.email,
      membershipLevel: membership.membershipLevel,
      vipUntil: membership.vipUntil,
    },
    200,
  );
}

export async function handleDesktopLogin(request: Request, deps: DesktopLoginDeps): Promise<Response> {
  const rejected = browserRejected(request);
  if (rejected) return rejected;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid_request", message: "Email and password are required." }, 400);
  }

  const fields = readLoginFields(body);
  if (!fields.ok) return json({ error: "invalid_request", message: fields.message }, 400);
  const login = fields.fields;

  const now = deps.now?.() ?? new Date();
  const limit = consumeDesktopLoginLimit(
    clientIpFromHeaders(request.headers),
    login.email,
    now.getTime(),
    deps.buckets,
  );
  if (!limit.ok) {
    return json(
      { error: "rate_limited", message: "Too many sign-in attempts. Try again later." },
      429,
      { "Retry-After": String(limit.retryAfterSec) },
    );
  }

  const env = deps.env ?? process.env;
  const secret = secretOrResponse(env);
  if (secret instanceof Response) return secret;

  const verified = await deps.verify(login.email, login.password);
  if (!verified.ok) {
    if (verified.reason === "password_not_set") {
      return json(
        {
          error: "password_not_set",
          message: "This QuantLogicLab account has no password. Set one on the website, then sign in with that email and password.",
        },
        403,
      );
    }
    return json({ error: "invalid_credentials", message: "Email or password is incorrect." }, 401);
  }

  const user = verified.user;
  if (!user.email) {
    console.error("[DESKTOP_LOGIN] account has no email");
    return json({ error: "server", message: "Desktop sign-in failed." }, 500);
  }

  const membership = membershipPayload(user, now);
  if (membership instanceof Response) return membership;

  const registered = await deps.devices.applyLogin({
    userId: user.id,
    deviceId: login.deviceId,
    deviceName: login.deviceName,
    revokeDeviceId: login.revokeDeviceId,
    now,
  });
  if (!registered.ok) return deviceError(registered.error, registered.devices);

  return issueTokens(user as DesktopAccount & { email: string }, membership, secret.secret, now, login.deviceId);
}

export async function handleDesktopSession(request: Request, deps: DesktopSessionDeps): Promise<Response> {
  const rejected = browserRejected(request);
  if (rejected) return rejected;

  const env = deps.env ?? process.env;
  const secret = secretOrResponse(env);
  if (secret instanceof Response) return secret;

  const token = bearerToken(request.headers.get("authorization"));
  if (!token) {
    return json({ error: "invalid_token", message: "The sign-in token is missing or invalid." }, 401);
  }

  const now = deps.now?.() ?? new Date();
  const verified = verifyDesktopToken(token, secret.secret, Math.floor(now.getTime() / 1000), "access");
  if (!verified.ok) {
    const expired = verified.reason === "expired";
    return json(
      {
        error: expired ? "token_expired" : "invalid_token",
        message: expired ? "The sign-in token has expired." : "The sign-in token is missing or invalid.",
      },
      401,
    );
  }

  const user = await deps.loadUser(verified.claims.sub);
  if (!user?.email) {
    return json({ error: "invalid_token", message: "The sign-in token is missing or invalid." }, 401);
  }

  const membership = membershipPayload(user, now);
  if (membership instanceof Response) return membership;

  const stillRegistered = await deps.devices.touch(user.id, verified.claims.deviceId, now);
  if (!stillRegistered) {
    return json(
      { error: "device_revoked", message: "This computer was removed from the account." },
      401,
    );
  }

  return json(
    {
      email: membership.email,
      membershipLevel: membership.membershipLevel,
      vipUntil: membership.vipUntil,
      expiresAt: new Date(verified.claims.exp * 1000).toISOString(),
    },
    200,
  );
}

function readRefreshFields(body: unknown): { ok: true; refreshToken: string; deviceId: string } | { ok: false } {
  if (!body || typeof body !== "object") return { ok: false };
  const record = body as Record<string, unknown>;
  const deviceId = parseDesktopDeviceId(record.deviceId);
  const refreshToken = record.refreshToken;
  if (!deviceId || typeof refreshToken !== "string") return { ok: false };
  const token = refreshToken.trim();
  if (token.length < 20 || token.length > REFRESH_TOKEN_MAX) return { ok: false };
  return { ok: true, refreshToken: token, deviceId };
}

/**
 * Mints a new one-hour access token for a computer that is already registered.
 * The refresh token's expiry stays on the 60-day deadline from the password login.
 */
export async function handleDesktopRefresh(request: Request, deps: DesktopRefreshDeps): Promise<Response> {
  const rejected = browserRejected(request);
  if (rejected) return rejected;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid_request", message: "A refresh token and device id are required." }, 400);
  }

  const fields = readRefreshFields(body);
  if (!fields.ok) {
    return json({ error: "invalid_request", message: "A refresh token and device id are required." }, 400);
  }

  const env = deps.env ?? process.env;
  const secret = secretOrResponse(env);
  if (secret instanceof Response) return secret;

  const now = deps.now?.() ?? new Date();
  const nowSec = Math.floor(now.getTime() / 1000);
  const verified = verifyDesktopToken(fields.refreshToken, secret.secret, nowSec, "refresh");
  if (!verified.ok) {
    const expired = verified.reason === "expired";
    return json(
      {
        error: expired ? "token_expired" : "invalid_token",
        message: expired ? "The refresh token has expired." : "The refresh token is missing or invalid.",
      },
      401,
    );
  }

  if (verified.claims.deviceId !== fields.deviceId) {
    return json({ error: "invalid_token", message: "The refresh token is missing or invalid." }, 401);
  }

  const user = await deps.loadUser(verified.claims.sub);
  if (!user?.email) {
    return json({ error: "invalid_token", message: "The refresh token is missing or invalid." }, 401);
  }

  const membership = membershipPayload(user, now);
  if (membership instanceof Response) return membership;

  const stillRegistered = await deps.devices.touch(user.id, fields.deviceId, now);
  if (!stillRegistered) {
    return json(
      { error: "device_revoked", message: "This computer was removed from the account." },
      401,
    );
  }

  return issueTokens(
    { ...user, email: user.email },
    membership,
    secret.secret,
    now,
    fields.deviceId,
    verified.claims.exp,
  );
}
