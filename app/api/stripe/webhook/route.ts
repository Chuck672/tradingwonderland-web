import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { fulfillCheckoutRecord, logLicenseSchemaError } from "@/lib/fulfill-checkout";
import { formatCheckoutAmount, sendFulfillmentEmails } from "@/lib/fulfill-email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  if (!stripe || !webhookSecret) {
    console.error("[STRIPE_WEBHOOK] STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "missing_signature" }, { status: 400 });
  }

  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("[STRIPE_WEBHOOK] signature", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  let result;
  try {
    result = await fulfillCheckoutRecord({
      stripeSessionId: session.id,
      paymentStatus: session.payment_status,
      metadataPlanId: session.metadata?.planId,
      amountSubtotal: session.amount_subtotal,
      amountTotal: session.amount_total,
      userId: session.metadata?.userId || session.client_reference_id,
      email: session.customer_details?.email || session.customer_email,
      currency: session.currency,
    });
  } catch (error) {
    logLicenseSchemaError(error, "STRIPE_WEBHOOK");
    return NextResponse.json({ error: "fulfill_failed" }, { status: 500 });
  }

  if (result.status === "ignored") {
    if (result.reason === "unknown_plan") {
      console.error("[STRIPE_WEBHOOK] ignored plan", session.metadata?.planId || "(empty)");
    }
    return NextResponse.json({ received: true, ignored: result.reason });
  }

  if (result.status === "duplicate") {
    return NextResponse.json({ received: true, duplicate: true });
  }

  await sendFulfillmentEmails({
    result,
    amount: formatCheckoutAmount(session.amount_total, session.currency, result.planId),
    sessionId: session.id,
  });

  return NextResponse.json({ received: true, emailed: true, fulfilled: result.status });
}
