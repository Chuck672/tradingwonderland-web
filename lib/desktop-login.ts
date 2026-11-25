import {
  DESKTOP_JWT_TTL_SECONDS,
  bearerToken,
  clientIpFromHeaders,
  consumeDesktopLoginLimit,
  isBrowserDesktopCaller,
  readDesktopJwtSecret,
  signDesktopToken,
  verifyDesktopToken,
  vipUntilJson,
} from "./desktop-auth.ts";
import { desktopMembershipBlock } from "./license.ts";

const NO_STORE = { "Cache-Control": "no-store" };
const EMAIL_MAX = 254;
const PASSWORD_MAX = 500;

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
  now?: () => Date;
  env?: Env;
  /** Test isolation. Production uses the process-local limiter. */
  buckets?: Map<string, number[]>;
};

export type DesktopSessionDeps = {
  loadUser: (id: string) => Promise<DesktopAccount | null>;
  now?: () => Date;
  env?: Env;
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

export async function handleDesktopLogin(request: Request, deps: DesktopLoginDeps): Promise<Response> {
  const rejected = browserRejected(request);
  if (rejected) return rejected;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid_request", message: "Email and password are required." }, 400);
  }

  const email = body && typeof body === "object" && "email" in body ? (body as { email?: unknown }).email : undefined;
  const password = body && typeof body === "object" && "password" in body ? (body as { password?: unknown }).password : undefined;
  if (typeof email !== "string" || typeof password !== "string") {
    return json({ error: "invalid_request", message: "Email and password are required." }, 400);
  }

  const normalizedEmail = email.trim();
  if (!normalizedEmail || normalizedEmail.length > EMAIL_MAX || password.length === 0 || password.length > PASSWORD_MAX) {
    return json({ error: "invalid_request", message: "Email and password are required." }, 400);
  }

  const now = deps.now?.() ?? new Date();
  const limit = consumeDesktopLoginLimit(
    clientIpFromHeaders(request.headers),
    normalizedEmail,
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

  const verified = await deps.verify(normalizedEmail, password);
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

  const nowSec = Math.floor(now.getTime() / 1000);
  const token = signDesktopToken({ sub: user.id, email: user.email }, secret.secret, nowSec);
  return json(
    {
      token,
      tokenType: "Bearer",
      expiresAt: new Date((nowSec + DESKTOP_JWT_TTL_SECONDS) * 1000).toISOString(),
      email: membership.email,
      membershipLevel: membership.membershipLevel,
      vipUntil: membership.vipUntil,
    },
    200,
  );
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
  const verified = verifyDesktopToken(token, secret.secret, Math.floor(now.getTime() / 1000));
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
