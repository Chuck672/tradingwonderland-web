import assert from "node:assert/strict";
import test from "node:test";
import { canonicalRedirectTarget } from "./canonical-host.ts";
import { isCheckoutOriginAllowed } from "./checkout-origin.ts";
import { isPlanId, resolvePublicPlans, resolveServerPlan } from "./pricing.ts";
import { getPublicSiteUrl } from "./site-url.ts";

test("www redirect drops the Hostinger listen port", () => {
  assert.equal(
    canonicalRedirectTarget({
      hostHeader: "www.quantlogiclab.com",
      requestProtocol: "https:",
      pathname: "/",
      search: "",
    }),
    "https://quantlogiclab.com/"
  );
  assert.equal(
    canonicalRedirectTarget({
      hostHeader: "www.quantlogiclab.com:3000",
      requestProtocol: "https:",
      pathname: "/subscribe",
      search: "?plan=349",
    }),
    "https://quantlogiclab.com/subscribe?plan=349"
  );
});

test("apex https is left alone and http apex upgrades without a port", () => {
  assert.equal(
    canonicalRedirectTarget({
      hostHeader: "quantlogiclab.com",
      requestProtocol: "https:",
      pathname: "/",
      search: "",
    }),
    null
  );
  assert.equal(
    canonicalRedirectTarget({
      hostHeader: "quantlogiclab.com",
      requestProtocol: "http:",
      pathname: "/tools",
      search: "",
    }),
    "https://quantlogiclab.com/tools"
  );
});

test("other hosts are not redirected", () => {
  assert.equal(
    canonicalRedirectTarget({
      hostHeader: "localhost:3000",
      requestProtocol: "http:",
      pathname: "/",
      search: "",
    }),
    null
  );
});

test("public site url never keeps :3000 on the production host", () => {
  assert.equal(getPublicSiteUrl({ NEXTAUTH_URL: "https://quantlogiclab.com:3000" }), "https://quantlogiclab.com");
  assert.equal(getPublicSiteUrl({ NEXT_PUBLIC_SITE_URL: "http://localhost:3000" }), "http://localhost:3000");
  assert.equal(getPublicSiteUrl({}), "https://quantlogiclab.com");
});

test("only the two paid tiers exist", () => {
  assert.equal(isPlanId("149"), true);
  assert.equal(isPlanId("349"), true);
  assert.equal(isPlanId("599"), false);
  assert.equal(isPlanId("price_secret"), false);

  const plans = resolvePublicPlans({});
  assert.deepEqual(
    plans.map((plan) => plan.amountUsd),
    [149, 349]
  );
  assert.equal(plans.every((plan) => plan.method === "unconfigured"), true);
  assert.equal(resolveServerPlan("599", { STRIPE_SECRET_KEY: "sk_test_x", STRIPE_PRICE_599: "price_abc" }), null);
});

test("checkout session is preferred over a payment link", () => {
  const env = {
    STRIPE_SECRET_KEY: "sk_test_example",
    STRIPE_PRICE_149: "price_standard",
    STRIPE_PRICE_349: "not-a-price",
    STRIPE_PAYMENT_LINK_349: "https://buy.stripe.com/test_349",
  };
  const plans = resolvePublicPlans(env);
  assert.equal(plans[0]?.method, "checkout");
  assert.equal(plans[1]?.method, "payment_link");
  assert.equal(plans[1]?.paymentLinkUrl, "https://buy.stripe.com/test_349");
  assert.equal("priceId" in (plans[0] ?? {}), false);
});

test("checkout accepts the production origin and rejects other sites", () => {
  assert.equal(
    isCheckoutOriginAllowed({
      originHeader: "https://quantlogiclab.com",
      hostHeader: "127.0.0.1:3000",
      forwardedProto: "http",
      nextOrigin: "http://127.0.0.1:3000",
      env: {},
    }),
    true
  );
  assert.equal(
    isCheckoutOriginAllowed({
      originHeader: "https://evil.example",
      hostHeader: "quantlogiclab.com",
      forwardedProto: "https",
      nextOrigin: "http://127.0.0.1:3000",
      env: {},
    }),
    false
  );
});
