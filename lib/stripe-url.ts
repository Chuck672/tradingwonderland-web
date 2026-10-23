const STRIPE_CHECKOUT_HOSTS = new Set(["buy.stripe.com", "checkout.stripe.com", "pay.stripe.com"]);

/** True for Stripe-hosted Checkout Session and Payment Link URLs. */
export function isAllowedStripeHttpsUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && STRIPE_CHECKOUT_HOSTS.has(url.hostname.toLowerCase());
  } catch {
    return false;
  }
}
