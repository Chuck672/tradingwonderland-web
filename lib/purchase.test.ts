import assert from "node:assert/strict";
import test from "node:test";
import { isBrowserDownloadUrl, isSignedReleaseHost, resolveRemoteDownload, safeDownloadFilename, withPaymentLinkIdentity } from "./download-target.ts";
import { canDownloadDesktop, grantUntil, isLicenseCode, nextMembershipLevel, nextVipUntil, planIdFromCheckout, planMembershipLevel, STRIPE_LICENSE_DAYS } from "./license.ts";
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
