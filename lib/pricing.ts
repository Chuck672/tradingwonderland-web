export const PAID_PLANS = [
  {
    id: "149",
    amountUsd: 149,
    recommended: false,
    priceEnv: "STRIPE_PRICE_149",
    linkEnv: "STRIPE_PAYMENT_LINK_149",
  },
  {
    id: "349",
    amountUsd: 349,
    recommended: true,
    priceEnv: "STRIPE_PRICE_349",
    linkEnv: "STRIPE_PAYMENT_LINK_349",
  },
] as const;

export type PlanId = (typeof PAID_PLANS)[number]["id"];
export type CheckoutMethod = "checkout" | "payment_link" | "unconfigured";

export type PublicPlan = {
  id: PlanId;
  amountUsd: number;
  recommended: boolean;
  method: CheckoutMethod;
  paymentLinkUrl?: string;
};

const PRICE_ID = /^price_[A-Za-z0-9]+$/;

export function isPlanId(value: unknown): value is PlanId {
  return value === "149" || value === "349";
}

export function readPriceId(env: NodeJS.ProcessEnv, envName: string): string | null {
  const value = env[envName]?.trim() ?? "";
  if (!value) return null;
  return PRICE_ID.test(value) ? value : null;
}

export function readPaymentLink(env: NodeJS.ProcessEnv, envName: string): string | null {
  const value = env[envName]?.trim() ?? "";
  if (!value) return null;
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    const allowed = host === "buy.stripe.com" || host === "checkout.stripe.com" || host === "pay.stripe.com";
    if (url.protocol !== "https:" || !allowed) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function resolvePublicPlans(env: NodeJS.ProcessEnv = process.env): PublicPlan[] {
  const secret = Boolean(env.STRIPE_SECRET_KEY?.trim());
  return PAID_PLANS.map((plan) => {
    const priceId = readPriceId(env, plan.priceEnv);
    const paymentLinkUrl = readPaymentLink(env, plan.linkEnv);
    if (secret && priceId) {
      return {
        id: plan.id,
        amountUsd: plan.amountUsd,
        recommended: plan.recommended,
        method: "checkout" as const,
      };
    }
    if (paymentLinkUrl) {
      return {
        id: plan.id,
        amountUsd: plan.amountUsd,
        recommended: plan.recommended,
        method: "payment_link" as const,
        paymentLinkUrl,
      };
    }
    return {
      id: plan.id,
      amountUsd: plan.amountUsd,
      recommended: plan.recommended,
      method: "unconfigured" as const,
    };
  });
}

export function resolveServerPlan(planId: string, env: NodeJS.ProcessEnv = process.env) {
  if (!isPlanId(planId)) return null;
  const plan = PAID_PLANS.find((item) => item.id === planId);
  if (!plan) return null;
  const priceId = readPriceId(env, plan.priceEnv);
  const paymentLinkUrl = readPaymentLink(env, plan.linkEnv);
  const secret = Boolean(env.STRIPE_SECRET_KEY?.trim());
  return { ...plan, priceId, paymentLinkUrl, canCheckout: Boolean(secret && priceId) };
}
