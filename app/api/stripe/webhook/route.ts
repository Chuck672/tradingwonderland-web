import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { isPlanId } from "@/lib/pricing";
import { sendEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const seenEvents = new Set<string>();

function remember(eventId: string) {
  seenEvents.add(eventId);
  if (seenEvents.size > 500) {
    const oldest = seenEvents.values().next().value;
    if (oldest) seenEvents.delete(oldest);
  }
}

function tierName(planId: string) {
  return planId === "349" ? "full PiTradingAgent desktop tool" : "full MT5 indicators & EA collection";
}

function buyerText(input: { planId: string; amount: string; sessionId: string }) {
  const lines = [
    `We received your payment for the ${tierName(input.planId)} (USD ${input.planId}).`,
    `Amount: ${input.amount}`,
    `Reference: ${input.sessionId}`,
  ];
  if (input.planId === "349") {
    lines.push("Delivery is the setup zip and your PTA1 license. Both will be sent to this email address.");
  } else {
    lines.push("What you bought will be sent to this email address.");
  }
  lines.push("Support covers install and license questions only.");
  lines.push("This is not a discretionary trading service and it does not promise profits.");
  return lines.join("\n");
}

function adminText(input: { planId: string; amount: string; email: string; sessionId: string }) {
  return [
    `Fulfill the ${tierName(input.planId)} (USD ${input.planId}).`,
    `Amount: ${input.amount}`,
    `Buyer email: ${input.email || "(none on the Checkout session)"}`,
    `Checkout session: ${input.sessionId}`,
    input.planId === "349"
      ? "Send the setup zip and a PTA1 license to the buyer."
      : "Send the MT5 indicators and EA collection to the buyer.",
  ].join("\n");
}

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

  if (seenEvents.has(event.id)) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  if (session.payment_status !== "paid") {
    return NextResponse.json({ received: true });
  }

  const planId = session.metadata?.planId ?? "";
  if (!isPlanId(planId)) {
    console.error("[STRIPE_WEBHOOK] ignored plan", planId || "(empty)");
    remember(event.id);
    return NextResponse.json({ received: true });
  }

  const email = session.customer_details?.email || session.customer_email || "";
  const amount = typeof session.amount_total === "number" ? `${(session.amount_total / 100).toFixed(2)} ${session.currency || "usd"}` : planId;
  const record = {
    planId,
    amount,
    email,
    sessionId: session.id,
    product: tierName(planId),
    fulfillment: planId === "349" ? "zip+PTA1" : "indicators-ea",
  };

  const smtpReady = Boolean(process.env.SMTP_USER?.trim() && process.env.SMTP_PASS?.trim());
  if (!smtpReady) {
    console.log("[STRIPE_FULFILLMENT_PENDING]", JSON.stringify(record));
    remember(event.id);
    return NextResponse.json({ received: true, emailed: false });
  }

  const admin = (process.env.ORDER_NOTIFY_EMAIL || process.env.SMTP_USER || "").trim();
  const asHtml = (text: string) =>
    `<pre style="font-family:ui-monospace,monospace;white-space:pre-wrap">${text.replace(/[&<>]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[char] || char)}</pre>`;

  const sends = [];
  if (admin) {
    sends.push(
      sendEmail({
        to: admin,
        subject: `[QuantLogicLab] Fulfill USD ${planId}`,
        html: asHtml(adminText({ planId, amount, email, sessionId: session.id })),
      })
    );
  }
  if (email && email.toLowerCase() !== admin.toLowerCase()) {
    sends.push(
      sendEmail({
        to: email,
        subject: `Payment received (USD ${planId})`,
        html: asHtml(buyerText({ planId, amount, sessionId: session.id })),
      })
    );
  }

  if (sends.length === 0) {
    console.log("[STRIPE_FULFILLMENT_PENDING]", JSON.stringify(record));
    remember(event.id);
    return NextResponse.json({ received: true, emailed: false });
  }

  const results = await Promise.all(sends);
  if (results.some((result) => result && "error" in result && result.error)) {
    console.error("[STRIPE_WEBHOOK] email failed", JSON.stringify(record));
    return NextResponse.json({ error: "email_failed" }, { status: 500 });
  }

  remember(event.id);
  return NextResponse.json({ received: true, emailed: true });
}
