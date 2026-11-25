import "server-only";
import { sendEmail } from "./email";
import { adminFulfillmentText, buyerFulfillmentText } from "./fulfill-copy";
import { getPublicSiteUrl } from "./site-url";
import type { FulfillResult } from "./fulfill-checkout";

function escapeHtml(text: string) {
  return text.replace(/[&<>]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[char] || char);
}

export function formatCheckoutAmount(amountTotal: number | null | undefined, currency: string | null | undefined, planId: string) {
  if (typeof amountTotal === "number") return `${(amountTotal / 100).toFixed(2)} ${currency || "usd"}`;
  return planId;
}

/** Best-effort. Membership is already stored; a mail failure must not roll that back. */
export async function sendFulfillmentEmails(input: { result: FulfillResult; amount: string; sessionId: string }) {
  const notice = {
    planId: input.result.planId,
    amount: input.amount,
    sessionId: input.sessionId,
    status: input.result.status,
    email: input.result.email,
    userId: input.result.userId,
    membershipLevel: input.result.membershipLevel,
    dashboardUrl: `${getPublicSiteUrl()}/dashboard`,
  };
  const record = {
    planId: notice.planId,
    amount: notice.amount,
    email: notice.email,
    userId: notice.userId,
    sessionId: notice.sessionId,
    status: notice.status,
    membershipLevel: notice.membershipLevel,
  };
  const smtpReady = Boolean(process.env.SMTP_USER?.trim() && process.env.SMTP_PASS?.trim());
  if (!smtpReady) {
    console.log("[STRIPE_FULFILLMENT]", JSON.stringify(record));
    return;
  }

  const admin = (process.env.ORDER_NOTIFY_EMAIL || process.env.SMTP_USER || "").trim();
  const asHtml = (text: string) =>
    `<pre style="font-family:ui-monospace,monospace;white-space:pre-wrap">${escapeHtml(text)}</pre>`;
  const sends = [];
  if (admin) {
    sends.push(
      sendEmail({
        to: admin,
        subject: `[QuantLogicLab] Paid USD ${input.result.planId}`,
        html: asHtml(adminFulfillmentText(notice)),
      }),
    );
  }
  if (input.result.email && input.result.email.toLowerCase() !== admin.toLowerCase()) {
    sends.push(
      sendEmail({
        to: input.result.email,
        subject: `Payment received (USD ${input.result.planId})`,
        html: asHtml(buyerFulfillmentText(notice)),
      }),
    );
  }
  if (sends.length === 0) {
    console.log("[STRIPE_FULFILLMENT]", JSON.stringify(record));
    return;
  }
  const results = await Promise.all(sends);
  if (results.some((item) => item && "error" in item && item.error)) {
    console.error("[STRIPE_WEBHOOK] email failed", JSON.stringify(record));
  }
}
