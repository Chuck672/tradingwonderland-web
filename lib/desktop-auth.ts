import { createHmac, timingSafeEqual } from "node:crypto";

/** Access tokens for PiTradingAgent. One hour, then the app uses its refresh token. */
export const DESKTOP_JWT_TTL_SECONDS = 60 * 60;

/**
 * Password login starts this window. A refresh mints a new access token and a
 * replacement refresh token that keeps the same expiry. It does not slide.
 */
export const DESKTOP_REFRESH_TTL_SECONDS = 60 * 24 * 60 * 60;

export const DESKTOP_ACCESS_AUDIENCE = "pitradingagent";
export const DESKTOP_REFRESH_AUDIENCE = "pitradingagent-refresh";

const DEVICE_ID_PATTERN = /^[\x21-\x7E]{1,128}$/;

export const DESKTOP_LOGIN_EMAIL_LIMIT = 8;
export const DESKTOP_LOGIN_IP_LIMIT = 40;
export const DESKTOP_LOGIN_WINDOW_MS = 15 * 60 * 1000;

const ISSUER = "quantlogiclab-desktop";

export type DesktopTokenUse = "access" | "refresh";

export type DesktopTokenClaims = {
  sub: string;
  email: string;
  deviceId: string;
  tokenUse: DesktopTokenUse;
  iat: number;
  exp: number;
  iss: typeof ISSUER;
  aud: typeof DESKTOP_ACCESS_AUDIENCE | typeof DESKTOP_REFRESH_AUDIENCE;
};

/** Visible ASCII, 1–128 characters. The desktop app must send this same string every time. */
export function isDesktopDeviceId(value: string): boolean {
  return DEVICE_ID_PATTERN.test(value);
}

type Env = Record<string, string | undefined>;

export function readDesktopJwtSecret(env: Env): { ok: true; secret: string } | { ok: false } {
  const secret = env.DESKTOP_JWT_SECRET?.trim() ?? "";
  const nextAuth = env.NEXTAUTH_SECRET?.trim() ?? "";
  if (secret.length < 32) return { ok: false };
  if (nextAuth && secret === nextAuth) return { ok: false };
  return { ok: true, secret };
}

function b64url(data: string) {
  return Buffer.from(data).toString("base64url");
}

export function signDesktopToken(
  input: { sub: string; email: string; deviceId: string; tokenUse: DesktopTokenUse },
  secret: string,
  nowSec: number,
  ttlSec = input.tokenUse === "refresh" ? DESKTOP_REFRESH_TTL_SECONDS : DESKTOP_JWT_TTL_SECONDS,
): string {
  const header = b64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = b64url(
    JSON.stringify({
      sub: input.sub,
      email: input.email,
      deviceId: input.deviceId,
      use: input.tokenUse,
      iss: ISSUER,
      aud: input.tokenUse === "refresh" ? DESKTOP_REFRESH_AUDIENCE : DESKTOP_ACCESS_AUDIENCE,
      iat: nowSec,
      exp: nowSec + ttlSec,
    }),
  );
  const data = `${header}.${payload}`;
  const sig = createHmac("sha256", secret).update(data).digest("base64url");
  return `${data}.${sig}`;
}

export function verifyDesktopToken(
  token: string,
  secret: string,
  nowSec: number,
  expectedUse: DesktopTokenUse = "access",
): { ok: true; claims: DesktopTokenClaims } | { ok: false; reason: "invalid" | "expired" } {
  const parts = token.split(".");
  if (parts.length !== 3 || parts.some((part) => part.length === 0)) {
    return { ok: false, reason: "invalid" };
  }

  const expected = createHmac("sha256", secret).update(`${parts[0]}.${parts[1]}`).digest();
  const actual = Buffer.from(parts[2], "base64url");
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
    return { ok: false, reason: "invalid" };
  }

  let header: { alg?: unknown };
  let payload: {
    sub?: unknown;
    email?: unknown;
    deviceId?: unknown;
    use?: unknown;
    iss?: unknown;
    aud?: unknown;
    iat?: unknown;
    exp?: unknown;
  };
  try {
    header = JSON.parse(Buffer.from(parts[0], "base64url").toString("utf8"));
    payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
  } catch {
    return { ok: false, reason: "invalid" };
  }

  const expectedAud = expectedUse === "refresh" ? DESKTOP_REFRESH_AUDIENCE : DESKTOP_ACCESS_AUDIENCE;
  if (header.alg !== "HS256") return { ok: false, reason: "invalid" };
  if (payload.iss !== ISSUER || payload.aud !== expectedAud) return { ok: false, reason: "invalid" };
  if (payload.use !== expectedUse) return { ok: false, reason: "invalid" };
  if (typeof payload.sub !== "string" || payload.sub.length === 0) return { ok: false, reason: "invalid" };
  if (typeof payload.email !== "string" || payload.email.length === 0) return { ok: false, reason: "invalid" };
  if (typeof payload.deviceId !== "string" || !isDesktopDeviceId(payload.deviceId)) return { ok: false, reason: "invalid" };
  if (typeof payload.exp !== "number" || typeof payload.iat !== "number") return { ok: false, reason: "invalid" };
  if (payload.exp <= nowSec) return { ok: false, reason: "expired" };

  return {
    ok: true,
    claims: {
      sub: payload.sub,
      email: payload.email,
      deviceId: payload.deviceId,
      tokenUse: expectedUse,
      iat: payload.iat,
      exp: payload.exp,
      iss: ISSUER,
      aud: expectedAud,
    },
  };
}

export function bearerToken(header: string | null): string | null {
  if (!header) return null;
  const match = /^Bearer\s+(\S+)$/i.exec(header.trim());
  return match?.[1] ?? null;
}

/** Any Origin or browser fetch metadata is a browser call. Electron's main process sends neither. */
export function isBrowserDesktopCaller(headers: Headers): boolean {
  if (headers.has("origin")) return true;
  if (headers.has("sec-fetch-site") || headers.has("sec-fetch-mode") || headers.has("sec-fetch-dest")) return true;
  return false;
}

export function clientIpFromHeaders(headers: Headers): string {
  const real = headers.get("x-real-ip")?.split(",")[0]?.trim();
  if (real) return real.slice(0, 80);
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (forwarded) return forwarded.slice(0, 80);
  return "unknown";
}

const loginBuckets = new Map<string, number[]>();

export function resetDesktopLoginLimit() {
  loginBuckets.clear();
}

function freshStamps(store: Map<string, number[]>, key: string, nowMs: number) {
  const cutoff = nowMs - DESKTOP_LOGIN_WINDOW_MS;
  return (store.get(key) ?? []).filter((stamp) => stamp > cutoff);
}

/**
 * Counts a sign-in attempt against IP+email and a wider per-IP ceiling.
 * The default map lives in this process. A restart or a second instance starts empty.
 */
export function consumeDesktopLoginLimit(
  ip: string,
  email: string,
  nowMs: number,
  store: Map<string, number[]> = loginBuckets,
): { ok: true } | { ok: false; retryAfterSec: number } {
  const emailKey = `e:${ip}:${email.trim().toLowerCase()}`;
  const ipKey = `i:${ip}`;
  const emailStamps = freshStamps(store, emailKey, nowMs);
  const ipStamps = freshStamps(store, ipKey, nowMs);
  const emailBlocked = emailStamps.length >= DESKTOP_LOGIN_EMAIL_LIMIT;
  const ipBlocked = ipStamps.length >= DESKTOP_LOGIN_IP_LIMIT;
  if (emailBlocked || ipBlocked) {
    store.set(emailKey, emailStamps);
    store.set(ipKey, ipStamps);
    const wait = (stamps: number[], limit: number) =>
      stamps.length < limit ? 0 : stamps[0] + DESKTOP_LOGIN_WINDOW_MS - nowMs;
    const delay = Math.max(wait(emailStamps, DESKTOP_LOGIN_EMAIL_LIMIT), wait(ipStamps, DESKTOP_LOGIN_IP_LIMIT));
    return { ok: false, retryAfterSec: Math.max(1, Math.ceil(delay / 1000)) };
  }
  emailStamps.push(nowMs);
  ipStamps.push(nowMs);
  store.set(emailKey, emailStamps);
  store.set(ipKey, ipStamps);
  return { ok: true };
}

/** Null means the membership has no expiry. Blank database values are reported the same way. */
export function vipUntilJson(value: Date | string | null | undefined): string | null {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}
