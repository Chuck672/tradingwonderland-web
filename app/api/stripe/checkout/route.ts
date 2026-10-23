import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getStripe } from "@/lib/stripe";
import { isPlanId, resolveServerPlan } from "@/lib/pricing";
import { getPublicSiteUrl } from "@/lib/site-url";
import { isCheckoutOriginAllowed } from "@/lib/checkout-origin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PRODUCT_NAME = "PiTradingAgent Setup 8.0.0";

export async function POST(req: NextRequest) {
  const forwardedHost = req.headers.get("x-forwarded-host");
  if (
    !isCheckoutOriginAllowed({
      originHeader: req.headers.get("origin"),
      hostHeader: forwardedHost || req.headers.get("host"),
      forwardedProto: req.headers.get("x-forwarded-proto"),
      nextOrigin: req.nextUrl.origin,
    })
  ) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const planId = typeof body === "object" && body && "planId" in body ? (body as { planId?: unknown }).planId : undefined;
  if (!isPlanId(planId)) {
    return NextResponse.json({ error: "unknown_plan" }, { status: 400 });
  }

  const plan = resolveServerPlan(planId);
  if (!plan) {
    return NextResponse.json({ error: "unknown_plan" }, { status: 400 });
  }

  if (plan.canCheckout && plan.priceId) {
    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json({ error: "unconfigured" }, { status: 503 });
    }

    let email: string | undefined;
    let userId = "";
    try {
      const session = await getServerSession(authOptions);
      if (session?.user?.email) email = session.user.email;
      if (session?.user?.id) userId = session.user.id;
    } catch (error) {
      console.error("[STRIPE_CHECKOUT] session lookup skipped", error instanceof Error ? error.message : "unknown");
    }

    const site = getPublicSiteUrl();
    try {
      const checkoutSession = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        customer_creation: "always",
        ...(email ? { customer_email: email } : {}),
        ...(userId ? { client_reference_id: userId } : {}),
        line_items: [{ price: plan.priceId, quantity: 1 }],
        success_url: `${site}/subscribe/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${site}/subscribe/cancel`,
        metadata: {
          planId: plan.id,
          product: PRODUCT_NAME,
          fulfillment: "zip+PTA1",
          userId,
        },
      });

      if (!checkoutSession.url) {
        return NextResponse.json({ error: "checkout_failed" }, { status: 502 });
      }
      return NextResponse.json({ url: checkoutSession.url });
    } catch (error) {
      console.error("[STRIPE_CHECKOUT]", error instanceof Error ? error.message : "unknown");
      return NextResponse.json({ error: "checkout_failed" }, { status: 502 });
    }
  }

  if (plan.paymentLinkUrl) {
    return NextResponse.json({ url: plan.paymentLinkUrl });
  }

  return NextResponse.json({ error: "unconfigured" }, { status: 503 });
}
