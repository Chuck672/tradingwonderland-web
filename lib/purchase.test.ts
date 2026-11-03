import assert from "node:assert/strict";
import test from "node:test";
import { clearToolReleaseCache, DEFAULT_TOOLS_REPO, findReleaseAssetId, isBrowserDownloadUrl, isSignedReleaseHost, openGithubReleaseAsset, resolveRemoteDownload, resolveRemoteToolDownload, resolveToolReleaseConfig, safeDownloadFilename, TOOL_RELEASE_CACHE_MS, withPaymentLinkIdentity } from "./download-target.ts";
import { canDownloadDesktop, grantUntil, isLicenseCode, isMembershipActive, nextMembershipLevel, nextVipUntil, planIdFromCheckout, planMembershipLevel, STRIPE_LICENSE_DAYS } from "./license.ts";
import { generateLicenseCode } from "./license-code.ts";
import { loginPathForPlan, safeCallbackPath } from "./return-path.ts";

test("login return path keeps the plan and drops other targets", () => {
  assert.equal(safeCallbackPath("/subscribe?plan=349"), "/subscribe?plan=349");
  assert.equal(safeCallbackPath("/subscribe?plan=149"), "/subscribe?plan=149");
  assert.equal(safeCallbackPath("/subscribe?plan=599"), "/subscribe");
  assert.equal(safeCallbackPath("/subscribe"), "/subscribe");
  assert.equal(safeCallbackPath("/dashboard"), "/dashboard");
  assert.equal(safeCallbackPath("https://evil.example/subscribe?plan=349"), "/dashboard");
  assert.equal(safeCallbackPath("//evil.example"), "/dashboard");
  assert.equal(safeCallbackPath("/subscribe?plan=349&next=https://evil.example"), "/subscribe");
  assert.equal(loginPathForPlan("149"), "/login?callbackUrl=%2Fsubscribe%3Fplan%3D149");
});

test("paid tiers map to PRO and ULTRA without a third price", () => {
  assert.equal(planMembershipLevel("149"), 1);
  assert.equal(planMembershipLevel("349"), 2);
  assert.equal(nextMembershipLevel(2, 1), 2);
  assert.equal(nextMembershipLevel(0, 1), 1);
  assert.equal(planIdFromCheckout({ metadataPlanId: "349", amountTotal: 14900 }), "349");
  assert.equal(planIdFromCheckout({ metadataPlanId: null, amountTotal: 14900 }), "149");
  assert.equal(planIdFromCheckout({ metadataPlanId: null, amountSubtotal: 34900, amountTotal: 34900 }), "349");
  assert.equal(planIdFromCheckout({ metadataPlanId: "599", amountTotal: 59900 }), null);
});

test("a webhook retry uses the original grant end and does not stack a year", () => {
  const anchor = new Date("2026-10-30T00:00:00.000Z");
  const end = grantUntil(anchor, STRIPE_LICENSE_DAYS);
  assert.equal(end.getTime() - anchor.getTime(), STRIPE_LICENSE_DAYS * 24 * 60 * 60 * 1000);
  const replay = nextVipUntil(end, grantUntil(anchor, STRIPE_LICENSE_DAYS));
  assert.equal(replay.toISOString(), end.toISOString());
  const longer = new Date("2028-01-01T00:00:00.000Z");
  assert.equal(nextVipUntil(longer, end).toISOString(), longer.toISOString());
});

test("stripe license codes match the redeem format", () => {
  assert.equal(isLicenseCode(generateLicenseCode("149")), true);
  assert.equal(isLicenseCode(generateLicenseCode("349")), true);
  assert.equal(generateLicenseCode("349").startsWith("ULTRA-"), true);
  assert.equal(generateLicenseCode("149").startsWith("PRO-"), true);
});

test("desktop download is the $349 level and never a GitHub browse page", () => {
  const future = new Date("2027-01-01T00:00:00.000Z");
  const past = new Date("2020-01-01T00:00:00.000Z");
  assert.equal(canDownloadDesktop(2, future, new Date("2026-10-30T00:00:00.000Z")), true);
  assert.equal(canDownloadDesktop(1, future, new Date("2026-10-30T00:00:00.000Z")), false);
  assert.equal(canDownloadDesktop(2, past, new Date("2026-10-30T00:00:00.000Z")), false);
  assert.equal(canDownloadDesktop(2, null), true);

  assert.equal(isBrowserDownloadUrl("https://github.com/Chuck672/tradingwonderland-web/releases"), false);
  assert.equal(isBrowserDownloadUrl("https://api.github.com/repos/Chuck672/tradingwonderland-web/releases/assets/1"), false);
  assert.equal(isBrowserDownloadUrl("https://downloads.example.com/PiTradingAgent-Setup.zip"), true);
  assert.equal(
    isSignedReleaseHost("https://release-assets.githubusercontent.com/example/file.zip?token=short"),
    true
  );
  assert.equal(isSignedReleaseHost("https://github.com/Chuck672/tradingwonderland-web"), false);

  const asset = "https://api.github.com/repos/Chuck672/private/releases/assets/42";
  assert.deepEqual(resolveRemoteDownload({ GITHUB_TOKEN: "ghp_test", GITHUB_RELEASE_ASSET_URL: asset }), {
    kind: "github",
    assetUrl: asset,
    token: "ghp_test",
    filename: "PiTradingAgent-Setup.zip",
  });
  assert.equal(
    resolveRemoteDownload({ PITRADINGAGENT_DOWNLOAD_URL: "https://github.com/Chuck672/tradingwonderland-web" }),
    null
  );
  assert.equal(safeDownloadFilename("../secret.zip"), "secret.zip");
  assert.equal(
    withPaymentLinkIdentity("https://buy.stripe.com/test_349", "user_1", "buyer@example.com"),
    "https://buy.stripe.com/test_349?client_reference_id=user_1&prefilled_email=buyer%40example.com"
  );
});

test("a blank vipUntil stays active when the tool level is high enough", () => {
  const now = new Date("2026-10-30T00:00:00.000Z");
  const past = new Date("2020-01-01T00:00:00.000Z");
  const future = "2027-01-01T00:00:00.000Z";
  assert.equal(isMembershipActive(1, null, 1, now), true);
  assert.equal(isMembershipActive(1, "", 1, now), true);
  assert.equal(isMembershipActive(1, undefined, 1, now), true);
  assert.equal(isMembershipActive(0, null, 1, now), false);
  assert.equal(isMembershipActive(1, past, 1, now), false);
  assert.equal(isMembershipActive(1, future, 1, now), true);
  assert.equal(isMembershipActive(1, now, 1, now), false);
  assert.equal(canDownloadDesktop(2, null, now), true);
  assert.equal(canDownloadDesktop(2, null, now), isMembershipActive(2, null, 2, now));
  assert.equal(canDownloadDesktop(1, null, now), false);
});

test("missing tools release tag skips GitHub so the route can use private-tools", async () => {
  clearToolReleaseCache();
  let calls = 0;
  const fetchImpl = async () => {
    calls += 1;
    return Response.json({ assets: [{ id: 1, name: "SVP5_pro.ex5" }] });
  };
  assert.equal(resolveToolReleaseConfig({ GITHUB_TOKEN: "ghp_test" }), null);
  assert.equal(resolveToolReleaseConfig({ GITHUB_TOOLS_RELEASE_TAG: "mt5-ex5" }), null);
  assert.equal(
    resolveToolReleaseConfig({
      GITHUB_TOKEN: "ghp_test",
      GITHUB_TOOLS_RELEASE_TAG: "mt5-ex5",
      GITHUB_TOOLS_REPO: "https://evil.example/repo",
    }),
    null
  );
  assert.equal(await resolveRemoteToolDownload("SVP5_pro.ex5", { GITHUB_TOKEN: "ghp_test" }, { fetchImpl }), null);
  assert.equal(calls, 0);

  const release = resolveToolReleaseConfig({
    GITHUB_TOKEN: " ghp_test ",
    GITHUB_TOOLS_RELEASE_TAG: " mt5-ex5 ",
  });
  assert.deepEqual(release, {
    token: "ghp_test",
    owner: "Chuck672",
    repo: "PiTradingAgentV8",
    tag: "mt5-ex5",
  });
  assert.equal(`${release?.owner}/${release?.repo}`, DEFAULT_TOOLS_REPO);
});

test("tool release assets match the exact filename and stay cached for a minute", async () => {
  clearToolReleaseCache();
  const payload = {
    assets: [
      { id: 11, name: "SVP5_pro.ex5.bak" },
      { id: 12, name: "svp5_pro.ex5" },
      { id: 13, name: "SVP5_pro.ex5" },
      { id: 0, name: "inRangeVP.ex5" },
      { id: 14, name: "inRangeVP.ex5" },
      { name: "scalpTradingPanel.ex5" },
    ],
  };
  assert.equal(findReleaseAssetId(payload.assets, "SVP5_pro.ex5"), 13);
  assert.equal(findReleaseAssetId(payload.assets, "SVP5_pro.ex5.bak"), 11);
  assert.equal(findReleaseAssetId(payload.assets, "missing.ex5"), null);

  const calls: Array<{ url: string; accept: string | null; authorization: string | null }> = [];
  const fetchImpl = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
    const headers = new Headers(init?.headers);
    calls.push({
      url,
      accept: headers.get("accept"),
      authorization: headers.get("authorization"),
    });
    if (url.endsWith("/releases/tags/mt5-ex5")) return Response.json(payload);
    return new Response("missing", { status: 404 });
  };
  const env = { GITHUB_TOKEN: "ghp_test", GITHUB_TOOLS_RELEASE_TAG: "mt5-ex5" };

  const hit = await resolveRemoteToolDownload("SVP5_pro.ex5", env, { fetchImpl, now: 1_000 });
  assert.deepEqual(hit, {
    assetUrl: "https://api.github.com/repos/Chuck672/PiTradingAgentV8/releases/assets/13",
    token: "ghp_test",
  });
  assert.equal(calls[0]?.accept, "application/vnd.github+json");
  assert.equal(calls[0]?.authorization, "Bearer ghp_test");

  const other = await resolveRemoteToolDownload("inRangeVP.ex5", env, { fetchImpl, now: 1_000 + TOOL_RELEASE_CACHE_MS - 1 });
  assert.equal(other?.assetUrl, "https://api.github.com/repos/Chuck672/PiTradingAgentV8/releases/assets/14");
  const miss = await resolveRemoteToolDownload("scalpTradingPanel.ex5", env, { fetchImpl, now: 1_000 + 5_000 });
  assert.equal(miss, null);
  assert.equal(calls.length, 1);

  const again = await resolveRemoteToolDownload("SVP5_pro.ex5", env, { fetchImpl, now: 1_000 + TOOL_RELEASE_CACHE_MS });
  assert.equal(again?.assetUrl, hit?.assetUrl);
  assert.equal(calls.length, 2);
});

test("a failed tools release lookup falls back instead of caching the error", async () => {
  clearToolReleaseCache();
  let calls = 0;
  const fetchImpl = async () => {
    calls += 1;
    return new Response("no release", { status: 404 });
  };
  const env = { GITHUB_TOKEN: "ghp_test", GITHUB_TOOLS_RELEASE_TAG: "missing-tag", GITHUB_TOOLS_REPO: "Chuck672/PiTradingAgentV8" };
  assert.equal(await resolveRemoteToolDownload("SVP5_pro.ex5", env, { fetchImpl, now: 0 }), null);
  assert.equal(await resolveRemoteToolDownload("SVP5_pro.ex5", env, { fetchImpl, now: 1_000 }), null);
  assert.equal(calls, 2);
});

test("signed release bytes are proxied and other hosts are not followed", async () => {
  const signed = "https://release-assets.githubusercontent.com/example/SVP5_pro.ex5?token=short";
  const asset = "https://api.github.com/repos/Chuck672/PiTradingAgentV8/releases/assets/13";
  const seen: string[] = [];

  const redirectFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
    seen.push(url);
    const headers = new Headers(init?.headers);
    if (url === asset) {
      assert.equal(headers.get("accept"), "application/octet-stream");
      assert.equal(headers.get("authorization"), "Bearer ghp_test");
      return new Response(null, { status: 302, headers: { location: signed } });
    }
    assert.equal(headers.get("authorization"), null);
    return new Response("ex5-bytes", { status: 200, headers: { "content-length": "9" } });
  };

  const proxied = await openGithubReleaseAsset(asset, "ghp_test", { fetchImpl: redirectFetch, followSigned: true });
  assert.equal(proxied.ok, true);
  if (proxied.ok && proxied.mode === "body") {
    assert.equal(proxied.contentLength, "9");
    assert.equal(await new Response(proxied.body).text(), "ex5-bytes");
  } else {
    assert.fail("expected the signed file body");
  }
  assert.deepEqual(seen, [asset, signed]);

  const browser = await openGithubReleaseAsset(asset, "ghp_test", {
    fetchImpl: async () => new Response(null, { status: 302, headers: { location: signed } }),
  });
  assert.deepEqual(browser, { ok: true, mode: "redirect", location: signed });

  let unsafeCalls = 0;
  const rejected = await openGithubReleaseAsset(asset, "ghp_test", {
    followSigned: true,
    fetchImpl: async () => {
      unsafeCalls += 1;
      return new Response(null, {
        status: 302,
        headers: { location: "https://github.com/Chuck672/PiTradingAgentV8/releases/download/mt5-ex5/SVP5_pro.ex5" },
      });
    },
  });
  assert.deepEqual(rejected, { ok: false, reason: "rejected-host", status: 302 });
  assert.equal(unsafeCalls, 1);
});
