import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { createHmac } from "node:crypto";
import {
  DESKTOP_JWT_TTL_SECONDS,
  DESKTOP_LOGIN_EMAIL_LIMIT,
  DESKTOP_REFRESH_TTL_SECONDS,
  bearerToken,
  consumeDesktopLoginLimit,
  isBrowserDesktopCaller,
  readDesktopJwtSecret,
  signDesktopToken,
  verifyDesktopToken,
} from "./desktop-auth.ts";
import { createMemoryDeviceDirectory } from "./desktop-devices.ts";
import {
  handleDesktopLogin,
  handleDesktopRefresh,
  handleDesktopSession,
  type DesktopLoginDeps,
  type DesktopVerifyResult,
} from "./desktop-login.ts";
import { desktopMembershipBlock } from "./license.ts";
import { adminFulfillmentText, buyerFulfillmentText } from "./fulfill-copy.ts";

const SECRET = "desktop-jwt-secret-at-least-32-characters";
const NEXTAUTH = "nextauth-secret-must-stay-different-32";
const ENV = { DESKTOP_JWT_SECRET: SECRET, NEXTAUTH_SECRET: NEXTAUTH };
const NOW = new Date("2026-11-25T17:00:00.000Z");

const DEVICE = "device-home-01";

function loginRequest(body: unknown, headers: Record<string, string> = {}) {
  return new Request("https://quantlogiclab.com/api/desktop/login", {
    method: "POST",
    headers: { "content-type": "application/json", "x-real-ip": "203.0.113.10", ...headers },
    body: JSON.stringify(body),
  });
}

function loginDeps(
  verify: DesktopLoginDeps["verify"],
  extra: Partial<DesktopLoginDeps> = {},
): DesktopLoginDeps {
  return {
    now: () => NOW,
    env: ENV,
    buckets: new Map(),
    devices: createMemoryDeviceDirectory(),
    verify,
    ...extra,
  };
}

function accessToken(sub: string, email: string, deviceId: string, nowSec = Math.floor(NOW.getTime() / 1000)) {
  return signDesktopToken({ sub, email, deviceId, tokenUse: "access" }, SECRET, nowSec);
}

function craftToken(payload: Record<string, unknown>, secret = SECRET) {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = createHmac("sha256", secret).update(`${header}.${body}`).digest("base64url");
  return `${header}.${body}.${sig}`;
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
  const token = signDesktopToken(
    { sub: "user_1", email: "member@example.com", deviceId: DEVICE, tokenUse: "access" },
    SECRET,
    nowSec,
  );
  const ok = verifyDesktopToken(token, SECRET, nowSec + 10);
  assert.equal(ok.ok, true);
  if (ok.ok) {
    assert.equal(ok.claims.exp - ok.claims.iat, DESKTOP_JWT_TTL_SECONDS);
    assert.equal(ok.claims.deviceId, DEVICE);
    assert.equal(ok.claims.tokenUse, "access");
  }

  const refresh = signDesktopToken(
    { sub: "user_1", email: "member@example.com", deviceId: DEVICE, tokenUse: "refresh" },
    SECRET,
    nowSec,
  );
  const refreshOk = verifyDesktopToken(refresh, SECRET, nowSec + 10, "refresh");
  assert.equal(refreshOk.ok, true);
  if (refreshOk.ok) assert.equal(refreshOk.claims.exp - refreshOk.claims.iat, DESKTOP_REFRESH_TTL_SECONDS);
  assert.equal(verifyDesktopToken(refresh, SECRET, nowSec + 10).ok, false);
  assert.equal(verifyDesktopToken(token, SECRET, nowSec + 10, "refresh").ok, false);
  assert.equal(DESKTOP_REFRESH_TTL_SECONDS, 60 * 24 * 60 * 60);

  assert.equal(verifyDesktopToken(token, NEXTAUTH, nowSec + 10).ok, false);
  const other = signDesktopToken(
    { sub: "user_1", email: "member@example.com", deviceId: DEVICE, tokenUse: "access" },
    NEXTAUTH,
    nowSec,
  );
  assert.deepEqual(verifyDesktopToken(other, SECRET, nowSec + 10), { ok: false, reason: "invalid" });
  assert.deepEqual(verifyDesktopToken(token, SECRET, nowSec + DESKTOP_JWT_TTL_SECONDS), { ok: false, reason: "expired" });

  const legacy = craftToken({
    sub: "user_1",
    email: "member@example.com",
    iss: "quantlogiclab-desktop",
    aud: "pitradingagent",
    iat: nowSec,
    exp: nowSec + 60,
  });
  assert.deepEqual(verifyDesktopToken(legacy, SECRET, nowSec + 10), { ok: false, reason: "invalid" });
  assert.equal(bearerToken("bearer token.with.parts"), "token.with.parts");
  assert.equal(bearerToken("Basic abc"), null);
});

test("login returns a bearer token for a non-expiring PRO member and no license code", async () => {
  const buckets = new Map<string, number[]>();
  const devices = createMemoryDeviceDirectory();
  let calls = 0;
  const response = await handleDesktopLogin(loginRequest({
    email: " Member@Example.com ",
    password: "secret",
    deviceId: ` ${DEVICE} `,
    deviceName: "Office PC",
  }, {
    cookie: "next-auth.session-token=not-used",
  }), loginDeps(async (email, password) => {
    calls += 1;
    assert.equal(email, "Member@Example.com");
    assert.equal(password, "secret");
    return { ok: true, user: { id: "user_1", email: "Member@Example.com", membershipLevel: 1, vipUntil: null } };
  }, { buckets, devices }));

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("access-control-allow-origin"), null);
  assert.equal(response.headers.get("set-cookie"), null);
  assert.equal(calls, 1);
  const body = await response.json();
  assert.equal(body.tokenType, "Bearer");
  assert.equal(body.email, "Member@Example.com");
  assert.equal(body.membershipLevel, 1);
  assert.equal(body.vipUntil, null);
  assert.equal(body.deviceId, DEVICE);
  const nowSec = Math.floor(NOW.getTime() / 1000);
  assert.equal(body.expiresAt, new Date((nowSec + DESKTOP_JWT_TTL_SECONDS) * 1000).toISOString());
  assert.equal(body.refreshExpiresAt, new Date((nowSec + DESKTOP_REFRESH_TTL_SECONDS) * 1000).toISOString());
  assert.equal("code" in body, false);
  assert.equal("password" in body, false);
  const verified = verifyDesktopToken(body.token, SECRET, nowSec);
  assert.equal(verified.ok, true);
  const refresh = verifyDesktopToken(body.refreshToken, SECRET, nowSec, "refresh");
  assert.equal(refresh.ok, true);
  const stored = await devices.list("user_1");
  assert.equal(stored.length, 1);
  assert.equal(stored[0]?.deviceName, "Office PC");
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
      { email: `person${index}@example.com`, password: "secret", deviceId: DEVICE },
      { "x-real-ip": "203.0.113.20" },
    ), loginDeps(async () => item.reason, { buckets }));
    assert.equal(response.status, item.status);
    assert.equal((await response.json()).error, item.error);
  }

  const unpaidDevices = createMemoryDeviceDirectory();
  const unpaid = await handleDesktopLogin(loginRequest(
    { email: "free@example.com", password: "secret", deviceId: DEVICE },
    { "x-real-ip": "203.0.113.21" },
  ), loginDeps(
    async () => ({ ok: true, user: { id: "free", email: "free@example.com", membershipLevel: 0, vipUntil: null } }),
    { buckets, devices: unpaidDevices },
  ));
  assert.equal((await unpaid.json()).error, "unpaid");
  assert.equal((await unpaidDevices.list("free")).length, 0);

  const expiredDevices = createMemoryDeviceDirectory();
  const expired = await handleDesktopLogin(loginRequest(
    { email: "old@example.com", password: "secret", deviceId: DEVICE },
    { "x-real-ip": "203.0.113.22" },
  ), loginDeps(async () => ({
    ok: true,
    user: { id: "old", email: "old@example.com", membershipLevel: 2, vipUntil: "2020-01-01T00:00:00.000Z" },
  }), { buckets, devices: expiredDevices }));
  assert.equal(expired.status, 403);
  assert.equal((await expired.json()).error, "membership_expired");
  assert.equal((await expiredDevices.list("old")).length, 0);
});

test("browser origins are rejected and attempts are limited by IP and email", async () => {
  const buckets = new Map<string, number[]>();
  let calls = 0;
  const browser = await handleDesktopLogin(loginRequest(
    { email: "member@example.com", password: "secret", deviceId: DEVICE },
    { origin: "https://quantlogiclab.com" },
  ), loginDeps(async () => {
    calls += 1;
    return { ok: false, reason: "invalid" };
  }, { buckets }));
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
      { email: "limited@example.com", password: "nope", deviceId: DEVICE },
      { "x-real-ip": "203.0.113.30" },
    ), loginDeps(verify, { buckets }));
    assert.equal(response.status, 401);
  }
  const limited = await handleDesktopLogin(loginRequest(
    { email: "limited@example.com", password: "nope", deviceId: DEVICE },
    { "x-real-ip": "203.0.113.30" },
  ), loginDeps(verify, { buckets }));
  assert.equal(limited.status, 429);
  assert.equal((await limited.json()).error, "rate_limited");
  assert.ok(Number(limited.headers.get("retry-after")) > 0);

  const otherEmail = await handleDesktopLogin(loginRequest(
    { email: "other@example.com", password: "nope", deviceId: DEVICE },
    { "x-real-ip": "203.0.113.30" },
  ), loginDeps(verify, { buckets }));
  assert.equal(otherEmail.status, 401);

  const direct = consumeDesktopLoginLimit("203.0.113.30", "limited@example.com", NOW.getTime(), buckets);
  assert.equal(direct.ok, false);
});

test("session rechecks membership and rejects a browser or a bad token", async () => {
  const nowSec = Math.floor(NOW.getTime() / 1000);
  const devices = createMemoryDeviceDirectory();
  assert.equal((await devices.applyLogin({
    userId: "user_1",
    deviceId: DEVICE,
    deviceName: "Office PC",
    revokeDeviceId: null,
    now: NOW,
  })).ok, true);
  const token = accessToken("user_1", "member@example.com", DEVICE);
  const active = await handleDesktopSession(new Request("https://quantlogiclab.com/api/desktop/session", {
    headers: { authorization: `Bearer ${token}`, "x-real-ip": "203.0.113.40", cookie: "next-auth.session-token=not-used" },
  }), {
    now: () => NOW,
    env: ENV,
    devices,
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
  assert.equal(active.headers.get("set-cookie"), null);
  assert.equal("token" in activeBody, false);

  const expiredMembership = await handleDesktopSession(new Request("https://quantlogiclab.com/api/desktop/session", {
    headers: { authorization: `Bearer ${token}` },
  }), {
    now: () => NOW,
    env: ENV,
    devices,
    loadUser: async () => ({ id: "user_1", email: "member@example.com", membershipLevel: 1, vipUntil: "2020-01-01T00:00:00.000Z" }),
  });
  assert.equal((await expiredMembership.json()).error, "membership_expired");

  const stale = accessToken("user_1", "member@example.com", DEVICE, nowSec - DESKTOP_JWT_TTL_SECONDS - 5);
  const expiredToken = await handleDesktopSession(new Request("https://quantlogiclab.com/api/desktop/session", {
    headers: { authorization: `Bearer ${stale}` },
  }), {
    now: () => NOW,
    env: ENV,
    devices,
    loadUser: async () => {
      throw new Error("should not load");
    },
  });
  assert.equal((await expiredToken.json()).error, "token_expired");

  const refreshToken = signDesktopToken(
    { sub: "user_1", email: "member@example.com", deviceId: DEVICE, tokenUse: "refresh" },
    SECRET,
    nowSec,
  );
  const refreshAsSession = await handleDesktopSession(new Request("https://quantlogiclab.com/api/desktop/session", {
    headers: { authorization: `Bearer ${refreshToken}` },
  }), {
    now: () => NOW,
    env: ENV,
    devices,
    loadUser: async () => {
      throw new Error("should not load");
    },
  });
  assert.equal((await refreshAsSession.json()).error, "invalid_token");

  const browser = await handleDesktopSession(new Request("https://quantlogiclab.com/api/desktop/session", {
    headers: { authorization: `Bearer ${token}`, origin: "https://evil.example" },
  }), {
    now: () => NOW,
    env: ENV,
    devices,
    loadUser: async () => {
      throw new Error("should not load");
    },
  });
  assert.equal(browser.status, 403);
});

test("one membership keeps two computers and a third needs a kick", async () => {
  const devices = createMemoryDeviceDirectory();
  const buckets = new Map<string, number[]>();
  let now = new Date(NOW.getTime());
  const saved: Record<string, { token: string; refreshToken: string }> = {};

  async function signIn(deviceId: string, extra: Record<string, unknown> = {}) {
    now = new Date(now.getTime() + 60 * 1000);
    const response = await handleDesktopLogin(loginRequest({
      email: "member@example.com",
      password: "secret",
      deviceId,
      ...extra,
    }, { "x-real-ip": "203.0.113.50" }), loginDeps(async () => ({
      ok: true,
      user: { id: "user_1", email: "member@example.com", membershipLevel: 2, vipUntil: null },
    }), { buckets, devices, now: () => now }));
    const body = await response.json();
    if (response.status === 200) saved[deviceId] = { token: body.token, refreshToken: body.refreshToken };
    return { response, body, at: new Date(now.getTime()) };
  }

  const first = await signIn("device-a", { deviceName: "Office" });
  assert.equal(first.response.status, 200);
  const again = await signIn("device-a", { deviceName: "Office PC" });
  assert.equal(again.response.status, 200);
  let stored = await devices.list("user_1");
  assert.equal(stored.length, 1);
  assert.equal(stored[0]?.deviceId, "device-a");
  assert.equal(stored[0]?.deviceName, "Office PC");
  assert.equal(stored[0]?.lastSeenAt.toISOString(), again.at.toISOString());

  const second = await signIn("device-b", { deviceName: "Home" });
  assert.equal(second.response.status, 200);

  const third = await signIn("device-c", { deviceName: "Travel" });
  assert.equal(third.response.status, 403);
  assert.equal(third.body.error, "device_limit");
  assert.equal("token" in third.body, false);
  assert.deepEqual(third.body.devices.map((device: { id: string }) => device.id), ["device-b", "device-a"]);
  assert.equal(third.body.devices[0].name, "Home");
  assert.equal(third.body.devices[0].lastSeenAt, second.at.toISOString());
  assert.equal(third.body.devices[1].name, "Office PC");
  assert.equal(third.body.devices[1].lastSeenAt, again.at.toISOString());
  assert.equal((await devices.list("user_1")).length, 2);

  const missing = await signIn("device-c", { revokeDeviceId: "not-registered" });
  assert.equal(missing.response.status, 400);
  assert.equal(missing.body.error, "device_not_found");
  assert.equal(missing.body.devices.length, 2);
  assert.equal((await devices.list("user_1")).length, 2);

  const kicked = await signIn("device-c", { revokeDeviceId: "device-a", deviceName: "Travel" });
  assert.equal(kicked.response.status, 200);
  assert.equal(kicked.body.deviceId, "device-c");
  stored = await devices.list("user_1");
  assert.deepEqual(stored.map((device) => device.deviceId), ["device-b", "device-c"]);

  const fourth = await signIn("device-d");
  assert.equal(fourth.response.status, 403);
  assert.equal(fourth.body.error, "device_limit");
  assert.deepEqual(fourth.body.devices.map((device: { id: string }) => device.id), ["device-c", "device-b"]);

  const same = await signIn("device-b");
  assert.equal(same.response.status, 200);
  stored = await devices.list("user_1");
  assert.deepEqual(stored.map((device) => device.deviceId), ["device-b", "device-c"]);
  assert.equal(stored.find((device) => device.deviceId === "device-b")?.deviceName, "Home");

  const revokedRefresh = await handleDesktopRefresh(new Request("https://quantlogiclab.com/api/desktop/refresh", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ refreshToken: saved["device-a"]?.refreshToken, deviceId: "device-a" }),
  }), {
    now: () => now,
    env: ENV,
    devices,
    loadUser: async () => ({ id: "user_1", email: "member@example.com", membershipLevel: 2, vipUntil: null }),
  });
  assert.equal((await revokedRefresh.json()).error, "device_revoked");

  const revokedSession = await handleDesktopSession(new Request("https://quantlogiclab.com/api/desktop/session", {
    headers: { authorization: `Bearer ${saved["device-a"]?.token}` },
  }), {
    now: () => now,
    env: ENV,
    devices,
    loadUser: async () => ({ id: "user_1", email: "member@example.com", membershipLevel: 2, vipUntil: null }),
  });
  assert.equal((await revokedSession.json()).error, "device_revoked");
  assert.equal((await devices.list("user_1")).length, 2);

  for (const userId of ["user_2", "user_3"]) {
    assert.equal((await devices.applyLogin({
      userId,
      deviceId: "device-a",
      deviceName: null,
      revokeDeviceId: null,
      now,
    })).ok, true);
  }
  assert.equal((await devices.list("user_1")).length, 2);
  assert.equal((await devices.list("user_2")).length, 1);
});

test("refresh stays inside the original 60-day window and cannot add a computer", async () => {
  const devices = createMemoryDeviceDirectory();
  const buckets = new Map<string, number[]>();
  let now = new Date(NOW.getTime());
  let membership: { membershipLevel: number; vipUntil: string | null } = { membershipLevel: 2, vipUntil: null };
  let loads = 0;

  const login = await handleDesktopLogin(loginRequest({
    email: "member@example.com",
    password: "secret",
    deviceId: DEVICE,
    deviceName: "Office",
  }, { "x-real-ip": "203.0.113.60" }), loginDeps(async () => ({
    ok: true,
    user: { id: "user_1", email: "member@example.com", ...membership },
  }), { buckets, devices, now: () => now }));
  assert.equal(login.status, 200);
  const first = await login.json();

  async function refresh(body: unknown, headers: Record<string, string> = {}) {
    return handleDesktopRefresh(new Request("https://quantlogiclab.com/api/desktop/refresh", {
      method: "POST",
      headers: { "content-type": "application/json", ...headers },
      body: JSON.stringify(body),
    }), {
      now: () => now,
      env: ENV,
      devices,
      loadUser: async (id) => {
        loads += 1;
        assert.equal(id, "user_1");
        return { id, email: "member@example.com", ...membership };
      },
    });
  }

  now = new Date(NOW.getTime() + 30 * 24 * 60 * 60 * 1000);
  const renewed = await refresh({ refreshToken: first.refreshToken, deviceId: DEVICE });
  assert.equal(renewed.status, 200);
  assert.equal(renewed.headers.get("set-cookie"), null);
  assert.equal(renewed.headers.get("access-control-allow-origin"), null);
  const second = await renewed.json();
  assert.equal(second.refreshExpiresAt, first.refreshExpiresAt);
  assert.equal(second.expiresAt, new Date(Math.floor(now.getTime() / 1000) * 1000 + DESKTOP_JWT_TTL_SECONDS * 1000).toISOString());
  assert.equal(second.membershipLevel, 2);
  assert.equal(second.vipUntil, null);
  const firstClaims = verifyDesktopToken(first.refreshToken, SECRET, Math.floor(NOW.getTime() / 1000), "refresh");
  const secondClaims = verifyDesktopToken(second.refreshToken, SECRET, Math.floor(now.getTime() / 1000), "refresh");
  assert.equal(firstClaims.ok && secondClaims.ok && firstClaims.claims.exp === secondClaims.claims.exp, true);
  assert.equal(verifyDesktopToken(second.token, SECRET, Math.floor(now.getTime() / 1000)).ok, true);

  const originalAgain = await refresh({ refreshToken: first.refreshToken, deviceId: DEVICE });
  assert.equal(originalAgain.status, 200);
  const seen = (await devices.list("user_1"))[0]?.lastSeenAt.toISOString();
  assert.equal(seen, now.toISOString());
  assert.equal((await devices.list("user_1"))[0]?.deviceName, "Office");

  const beforeMismatch = loads;
  const mismatch = await refresh({ refreshToken: second.refreshToken, deviceId: "other-device-9" });
  assert.equal((await mismatch.json()).error, "invalid_token");
  assert.equal(loads, beforeMismatch);

  const accessAsRefresh = await refresh({ refreshToken: second.token, deviceId: DEVICE });
  assert.equal((await accessAsRefresh.json()).error, "invalid_token");

  const outsider = signDesktopToken(
    { sub: "user_1", email: "member@example.com", deviceId: "device-third-9", tokenUse: "refresh" },
    SECRET,
    Math.floor(now.getTime() / 1000),
  );
  const third = await refresh({ refreshToken: outsider, deviceId: "device-third-9" });
  assert.equal((await third.json()).error, "device_revoked");
  assert.deepEqual((await devices.list("user_1")).map((device) => device.deviceId), [DEVICE]);

  membership = { membershipLevel: 0, vipUntil: "2027-01-01T00:00:00.000Z" };
  const unpaid = await refresh({ refreshToken: first.refreshToken, deviceId: DEVICE });
  assert.equal(unpaid.status, 403);
  assert.equal((await unpaid.json()).error, "unpaid");
  assert.equal((await devices.list("user_1"))[0]?.lastSeenAt.toISOString(), seen);

  membership = { membershipLevel: 2, vipUntil: "2020-01-01T00:00:00.000Z" };
  const expired = await refresh({ refreshToken: first.refreshToken, deviceId: DEVICE });
  assert.equal((await expired.json()).error, "membership_expired");
  assert.equal((await devices.list("user_1"))[0]?.lastSeenAt.toISOString(), seen);

  membership = { membershipLevel: 2, vipUntil: null };
  const browser = await refresh(
    { refreshToken: first.refreshToken, deviceId: DEVICE },
    { origin: "https://quantlogiclab.com", "sec-fetch-mode": "cors" },
  );
  assert.equal(browser.status, 403);
  assert.equal((await browser.json()).error, "browser_origin");

  const beforeExpiry = loads;
  now = new Date(first.refreshExpiresAt);
  const elapsed = await refresh({ refreshToken: second.refreshToken, deviceId: DEVICE });
  assert.equal((await elapsed.json()).error, "token_expired");
  assert.equal(loads, beforeExpiry);
  assert.equal((await devices.list("user_1")).length, 1);
});

test("a registered computer can remove the other without opening a third slot", async () => {
  const devices = createMemoryDeviceDirectory();
  for (const deviceId of ["device-a", "device-b"]) {
    assert.equal((await devices.applyLogin({
      userId: "user_1",
      deviceId,
      deviceName: deviceId,
      revokeDeviceId: null,
      now: NOW,
    })).ok, true);
  }

  const rejected = await devices.applyLogin({
    userId: "user_1",
    deviceId: "device-c",
    deviceName: null,
    revokeDeviceId: "missing",
    now: NOW,
  });
  assert.equal(rejected.ok, false);
  if (!rejected.ok) assert.equal(rejected.error, "device_not_found");
  assert.deepEqual((await devices.list("user_1")).map((device) => device.deviceId), ["device-a", "device-b"]);

  const seen = new Date(NOW.getTime() + 1000);
  const kicked = await devices.applyLogin({
    userId: "user_1",
    deviceId: "device-a",
    deviceName: null,
    revokeDeviceId: "device-b",
    now: seen,
  });
  assert.equal(kicked.ok, true);
  const stored = await devices.list("user_1");
  assert.deepEqual(stored.map((device) => device.deviceId), ["device-a"]);
  assert.equal(stored[0]?.deviceName, "device-a");
  assert.equal(stored[0]?.lastSeenAt.toISOString(), seen.toISOString());
});

test("desktop login rejects a missing device id before checking the password", async () => {
  let calls = 0;
  const devices = createMemoryDeviceDirectory();
  const missing = await handleDesktopLogin(loginRequest({
    email: "member@example.com",
    password: "secret",
  }), loginDeps(async () => {
    calls += 1;
    return { ok: false, reason: "invalid" };
  }, { devices }));
  assert.equal(missing.status, 400);
  assert.equal((await missing.json()).error, "invalid_request");
  assert.equal(calls, 0);

  const self = await handleDesktopLogin(loginRequest({
    email: "member@example.com",
    password: "secret",
    deviceId: DEVICE,
    revokeDeviceId: DEVICE,
  }), loginDeps(async () => {
    calls += 1;
    return { ok: false, reason: "invalid" };
  }, { devices }));
  assert.equal(self.status, 400);
  assert.equal((await self.json()).error, "invalid_request");
  assert.equal(calls, 0);
  assert.equal((await devices.list("user_1")).length, 0);

  const longName = await handleDesktopLogin(loginRequest({
    email: "member@example.com",
    password: "secret",
    deviceId: DEVICE,
    deviceName: "x".repeat(121),
  }), loginDeps(async () => {
    calls += 1;
    return { ok: false, reason: "invalid" };
  }, { devices }));
  assert.equal(longName.status, 400);
  assert.equal(calls, 0);
});

test("desktop device migration is idempotent and has no secrets", () => {
  const sql = readFileSync(new URL("../drizzle/0005_desktop_device.sql", import.meta.url), "utf8");
  assert.match(sql, /CREATE TABLE IF NOT EXISTS `desktop_device`/);
  assert.match(sql, /`userId` varchar\(255\) NOT NULL/);
  assert.match(sql, /`deviceId` varchar\(128\) NOT NULL/);
  assert.match(sql, /`deviceName` varchar\(120\) NULL/);
  assert.match(sql, /`createdAt` datetime NOT NULL/);
  assert.match(sql, /`lastSeenAt` datetime NOT NULL/);
  assert.match(sql, /UNIQUE KEY `desktop_device_userId_deviceId_unique` \(`userId`, `deviceId`\)/);
  assert.match(sql, /ON DELETE CASCADE/);
  assert.match(sql, /u904162120_QuantLogicLab/);
  assert.doesNotMatch(sql, /DROP TABLE/i);
  assert.doesNotMatch(sql, /DATABASE_URL|mysql:\/\/|DESKTOP_JWT_SECRET|PASSWORD\s*=/i);

  const schema = readFileSync(new URL("./schema.ts", import.meta.url), "utf8");
  assert.match(schema, /"desktop_device"/);
  assert.match(schema, /desktop_device_userId_deviceId_unique/);

  for (const route of ["login", "session", "refresh"]) {
    const source = readFileSync(new URL(`../app/api/desktop/${route}/route.ts`, import.meta.url), "utf8");
    assert.equal(source.includes("getServerSession"), false);
    assert.equal(source.includes("NEXTAUTH"), false);
    assert.equal(source.includes("cookies("), false);
  }
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
