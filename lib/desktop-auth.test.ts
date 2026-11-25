import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  DESKTOP_JWT_TTL_SECONDS,
  DESKTOP_LOGIN_EMAIL_LIMIT,
  bearerToken,
  consumeDesktopLoginLimit,
  isBrowserDesktopCaller,
  readDesktopJwtSecret,
  signDesktopToken,
  verifyDesktopToken,
} from "./desktop-auth.ts";
import { handleDesktopLogin, handleDesktopSession, type DesktopVerifyResult } from "./desktop-login.ts";
import { desktopMembershipBlock } from "./license.ts";
import { adminFulfillmentText, buyerFulfillmentText } from "./fulfill-copy.ts";

const SECRET = "desktop-jwt-secret-at-least-32-characters";
const NEXTAUTH = "nextauth-secret-must-stay-different-32";
const ENV = { DESKTOP_JWT_SECRET: SECRET, NEXTAUTH_SECRET: NEXTAUTH };
const NOW = new Date("2026-11-25T17:00:00.000Z");

function loginRequest(body: unknown, headers: Record<string, string> = {}) {
  return new Request("https://quantlogiclab.com/api/desktop/login", {
    method: "POST",
    headers: { "content-type": "application/json", "x-real-ip": "203.0.113.10", ...headers },
    body: JSON.stringify(body),
  });
}

test("a blank vipUntil is an active paid membership and a past date is expired", () => {
  const now = new Date("2026-11-25T17:00:00.000Z");
  assert.equal(desktopMembershipBlock(1, null, now), null);
  assert.equal(desktopMembershipBlock(2, "", now), null);
  assert.equal(desktopMembershipBlock(1, undefined, now), null);
  assert.equal(desktopMembershipBlock(0, null, now), "unpaid");
  assert.equal(desktopMembershipBlock(0, "2027-01-01T00:00:00.000Z", now), "unpaid");
  assert.equal(desktopMembershipBlock(1, "2020-01-01T00:00:00.000Z", now), "expired");
  assert.equal(desktopMembershipBlock(2, now, now), "expired");
  assert.equal(desktopMembershipBlock(2, "2027-01-01T00:00:00.000Z", now), null);
});

test("desktop tokens use their own secret and expire", () => {
  assert.deepEqual(readDesktopJwtSecret({ DESKTOP_JWT_SECRET: "short", NEXTAUTH_SECRET: NEXTAUTH }), { ok: false });
  assert.deepEqual(readDesktopJwtSecret({ DESKTOP_JWT_SECRET: SECRET, NEXTAUTH_SECRET: SECRET }), { ok: false });
  assert.deepEqual(readDesktopJwtSecret(ENV), { ok: true, secret: SECRET });

  const nowSec = 1_700_000_000;
  const token = signDesktopToken({ sub: "user_1", email: "member@example.com" }, SECRET, nowSec);
  const ok = verifyDesktopToken(token, SECRET, nowSec + 10);
  assert.equal(ok.ok, true);
  if (ok.ok) assert.equal(ok.claims.exp - ok.claims.iat, DESKTOP_JWT_TTL_SECONDS);

  assert.equal(verifyDesktopToken(token, NEXTAUTH, nowSec + 10).ok, false);
  const other = signDesktopToken({ sub: "user_1", email: "member@example.com" }, NEXTAUTH, nowSec);
  assert.deepEqual(verifyDesktopToken(other, SECRET, nowSec + 10), { ok: false, reason: "invalid" });
  assert.deepEqual(verifyDesktopToken(token, SECRET, nowSec + DESKTOP_JWT_TTL_SECONDS), { ok: false, reason: "expired" });
  assert.equal(bearerToken("bearer token.with.parts"), "token.with.parts");
  assert.equal(bearerToken("Basic abc"), null);
});

test("login returns a bearer token for a non-expiring PRO member and no license code", async () => {
  const buckets = new Map<string, number[]>();
  let calls = 0;
  const response = await handleDesktopLogin(loginRequest({ email: " Member@Example.com ", password: "secret" }, {
    cookie: "next-auth.session-token=not-used",
  }), {
    now: () => NOW,
    env: ENV,
    buckets,
    verify: async (email, password) => {
      calls += 1;
      assert.equal(email, "Member@Example.com");
      assert.equal(password, "secret");
      return { ok: true, user: { id: "user_1", email: "Member@Example.com", membershipLevel: 1, vipUntil: null } };
    },
  });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("access-control-allow-origin"), null);
  assert.equal(calls, 1);
  const body = await response.json();
  assert.equal(body.tokenType, "Bearer");
  assert.equal(body.email, "Member@Example.com");
  assert.equal(body.membershipLevel, 1);
  assert.equal(body.vipUntil, null);
  assert.equal(body.expiresAt, new Date(Math.floor(NOW.getTime() / 1000) * 1000 + DESKTOP_JWT_TTL_SECONDS * 1000).toISOString());
  assert.equal("code" in body, false);
  assert.equal("password" in body, false);
  const verified = verifyDesktopToken(body.token, SECRET, Math.floor(NOW.getTime() / 1000));
  assert.equal(verified.ok, true);
});

test("login distinguishes credentials, a missing password, free, and expired membership", async () => {
  const buckets = new Map<string, number[]>();
  const cases: Array<{ reason: DesktopVerifyResult; status: number; error: string; user?: { membershipLevel: number; vipUntil: string | null } }> = [
    { reason: { ok: false, reason: "unknown" }, status: 401, error: "invalid_credentials" },
    { reason: { ok: false, reason: "invalid" }, status: 401, error: "invalid_credentials" },
    { reason: { ok: false, reason: "password_not_set" }, status: 403, error: "password_not_set" },
  ];

  for (const [index, item] of cases.entries()) {
    const response = await handleDesktopLogin(loginRequest(
      { email: `person${index}@example.com`, password: "secret" },
      { "x-real-ip": "203.0.113.20" },
    ), {
      now: () => NOW,
      env: ENV,
      buckets,
      verify: async () => item.reason,
    });
    assert.equal(response.status, item.status);
    assert.equal((await response.json()).error, item.error);
  }

  const unpaid = await handleDesktopLogin(loginRequest(
    { email: "free@example.com", password: "secret" },
    { "x-real-ip": "203.0.113.21" },
  ), {
    now: () => NOW,
    env: ENV,
    buckets,
    verify: async () => ({ ok: true, user: { id: "free", email: "free@example.com", membershipLevel: 0, vipUntil: null } }),
  });
  assert.equal((await unpaid.json()).error, "unpaid");

  const expired = await handleDesktopLogin(loginRequest(
    { email: "old@example.com", password: "secret" },
    { "x-real-ip": "203.0.113.22" },
  ), {
    now: () => NOW,
    env: ENV,
    buckets,
    verify: async () => ({
      ok: true,
      user: { id: "old", email: "old@example.com", membershipLevel: 2, vipUntil: "2020-01-01T00:00:00.000Z" },
    }),
  });
  assert.equal(expired.status, 403);
  assert.equal((await expired.json()).error, "membership_expired");
});

test("browser origins are rejected and attempts are limited by IP and email", async () => {
  const buckets = new Map<string, number[]>();
  let calls = 0;
  const browser = await handleDesktopLogin(loginRequest(
    { email: "member@example.com", password: "secret" },
    { origin: "https://quantlogiclab.com" },
  ), {
    now: () => NOW,
    env: ENV,
    buckets,
    verify: async () => {
      calls += 1;
      return { ok: false, reason: "invalid" };
    },
  });
  assert.equal(browser.status, 403);
  assert.equal((await browser.json()).error, "browser_origin");
  assert.equal(browser.headers.get("access-control-allow-origin"), null);
  assert.equal(calls, 0);

  const fetchMeta = new Headers();
  fetchMeta.set("sec-fetch-site", "same-origin");
  assert.equal(isBrowserDesktopCaller(fetchMeta), true);
  assert.equal(isBrowserDesktopCaller(new Headers()), false);

  const verify = async (): Promise<DesktopVerifyResult> => ({ ok: false, reason: "invalid" });
  for (let i = 0; i < DESKTOP_LOGIN_EMAIL_LIMIT; i += 1) {
    const response = await handleDesktopLogin(loginRequest(
      { email: "limited@example.com", password: "nope" },
      { "x-real-ip": "203.0.113.30" },
    ), { now: () => NOW, env: ENV, buckets, verify });
    assert.equal(response.status, 401);
  }
  const limited = await handleDesktopLogin(loginRequest(
    { email: "limited@example.com", password: "nope" },
    { "x-real-ip": "203.0.113.30" },
  ), { now: () => NOW, env: ENV, buckets, verify });
  assert.equal(limited.status, 429);
  assert.equal((await limited.json()).error, "rate_limited");
  assert.ok(Number(limited.headers.get("retry-after")) > 0);

  const otherEmail = await handleDesktopLogin(loginRequest(
    { email: "other@example.com", password: "nope" },
    { "x-real-ip": "203.0.113.30" },
  ), { now: () => NOW, env: ENV, buckets, verify });
  assert.equal(otherEmail.status, 401);

  const direct = consumeDesktopLoginLimit("203.0.113.30", "limited@example.com", NOW.getTime(), buckets);
  assert.equal(direct.ok, false);
});

test("session rechecks membership and rejects a browser or a bad token", async () => {
  const nowSec = Math.floor(NOW.getTime() / 1000);
  const token = signDesktopToken({ sub: "user_1", email: "member@example.com" }, SECRET, nowSec);
  const active = await handleDesktopSession(new Request("https://quantlogiclab.com/api/desktop/session", {
    headers: { authorization: `Bearer ${token}`, "x-real-ip": "203.0.113.40" },
  }), {
    now: () => NOW,
    env: ENV,
    loadUser: async (id) => {
      assert.equal(id, "user_1");
      return { id, email: "member@example.com", membershipLevel: 2, vipUntil: null };
    },
  });
  assert.equal(active.status, 200);
  const activeBody = await active.json();
  assert.equal(activeBody.membershipLevel, 2);
  assert.equal(activeBody.vipUntil, null);
  assert.equal(active.headers.get("access-control-allow-origin"), null);
  assert.equal("token" in activeBody, false);

  const expiredMembership = await handleDesktopSession(new Request("https://quantlogiclab.com/api/desktop/session", {
    headers: { authorization: `Bearer ${token}` },
  }), {
    now: () => NOW,
    env: ENV,
    loadUser: async () => ({ id: "user_1", email: "member@example.com", membershipLevel: 1, vipUntil: "2020-01-01T00:00:00.000Z" }),
  });
  assert.equal((await expiredMembership.json()).error, "membership_expired");

  const stale = signDesktopToken({ sub: "user_1", email: "member@example.com" }, SECRET, nowSec - DESKTOP_JWT_TTL_SECONDS - 5);
  const expiredToken = await handleDesktopSession(new Request("https://quantlogiclab.com/api/desktop/session", {
    headers: { authorization: `Bearer ${stale}` },
  }), {
    now: () => NOW,
    env: ENV,
    loadUser: async () => {
      throw new Error("should not load");
    },
  });
  assert.equal((await expiredToken.json()).error, "token_expired");

  const browser = await handleDesktopSession(new Request("https://quantlogiclab.com/api/desktop/session", {
    headers: { authorization: `Bearer ${token}`, origin: "https://evil.example" },
  }), {
    now: () => NOW,
    env: ENV,
    loadUser: async () => {
      throw new Error("should not load");
    },
  });
  assert.equal(browser.status, 403);
});

test("fulfillment copy and checkout code no longer issue a license", () => {
  const notice = {
    planId: "349",
    amount: "349.00 usd",
    sessionId: "cs_test_123",
    status: "applied" as const,
    email: "member@example.com",
    userId: "user_1",
    membershipLevel: 2,
    dashboardUrl: "https://quantlogiclab.com/dashboard",
  };
  const buyer = buyerFulfillmentText(notice);
  const admin = adminFulfillmentText(notice);
  assert.match(buyer, /QuantLogicLab/);
  assert.match(buyer, /no longer issued/);
  assert.doesNotMatch(buyer, /ULTRA-|PRO-|PTA1|License code:/);
  assert.match(admin, /not issued/);
  assert.doesNotMatch(admin, /ULTRA-|PRO-|PTA1/);

  const fulfillment = readFileSync(new URL("./fulfill-checkout.ts", import.meta.url), "utf8");
  assert.equal(fulfillment.includes("generateLicenseCode"), false);
  assert.equal(fulfillment.includes("insert(activationCodes)"), false);
  assert.equal(fulfillment.includes("checkoutFulfillments"), true);

  const activate = readFileSync(new URL("../app/api/user/activate/route.ts", import.meta.url), "utf8");
  assert.equal(activate.includes("activationCodes"), false);
  assert.match(activate, /isAllowedOrigin/);
  assert.match(activate, /410/);
});
