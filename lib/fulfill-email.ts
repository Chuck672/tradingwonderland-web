import "server-only";
import { sendEmail } from "./email";
import { getPublicSiteUrl } from "./site-url";
import type { FulfillResult } from "./fulfill-checkout";

function tierName(planId: string) {
  return planId === "349" ? "full PiTradingAgent desktop tool" : "full MT5 indicators & EA collection";
}

function tierNameZh(planId: string) {
  return planId === "349" ? "完整 PiTradingAgent 桌面工具" : "完整 MT5 指标和 EA 合集";
}

function escapeHtml(text: string) {
  return text.replace(/[&<>]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[char] || char);
}

function buyerText(input: { result: FulfillResult; amount: string; sessionId: string }) {
  const dashboard = `${getPublicSiteUrl()}/dashboard`;
  const delivery =
    input.result.planId === "349"
      ? [
          "The license code is bound to your account. Open the dashboard to copy it and download PiTradingAgent.",
          "授权码已绑定到你的账号。请打开个人中心复制授权码，并下载 PiTradingAgent 安装包。",
        ]
      : [
          "The license code is bound to your account. The MT5 indicators and EAs are in the dashboard.",
          "授权码已绑定到你的账号。MT5 指标和 EA 在个人中心下载。",
        ];
  return [
    `We received your payment for the ${tierName(input.result.planId)} (USD ${input.result.planId}).`,
    `我们已收到你购买「${tierNameZh(input.result.planId)}」的付款（USD ${input.result.planId}）。`,
    `Amount / 金额: ${input.amount}`,
    `License code / 授权码: ${input.result.code}`,
    ...delivery,
    dashboard,
    `Reference / 参考号: ${input.sessionId}`,
    "Support covers install and license questions only.",
    "售后仅限安装与授权答疑。",
    "This is not a discretionary trading service and it does not promise profits.",
    "不提供代客操盘，也不承诺收益。",
  ].join("\n");
}

function adminText(input: { result: FulfillResult; amount: string; sessionId: string }) {
  return [
    `Paid ${tierName(input.result.planId)} (USD ${input.result.planId}).`,
    `Amount: ${input.amount}`,
    `Buyer email: ${input.result.email || "(none)"}`,
    `User id: ${input.result.userId || "(no matching account)"}`,
    `Fulfillment: ${input.result.status}`,
    `Membership level written: ${input.result.membershipLevel}`,
    `License code: ${input.result.code}`,
    `Checkout session: ${input.sessionId}`,
    input.result.planId === "349"
      ? "Desktop installer is served from /api/download/pitradingagent after GITHUB_TOKEN + GITHUB_RELEASE_ASSET_URL (or PITRADINGAGENT_DOWNLOAD_URL, or private-tools/PiTradingAgent-Setup.zip)."
      : "This tier is the MT5 indicators and EA collection, not the desktop installer.",
  ].join("\n");
}

export function formatCheckoutAmount(amountTotal: number | null | undefined, currency: string | null | undefined, planId: string) {
  if (typeof amountTotal === "number") return `${(amountTotal / 100).toFixed(2)} ${currency || "usd"}`;
  return planId;
}

/** Best-effort. The plan and code are already stored; a mail failure must not roll that back. */
export async function sendFulfillmentEmails(input: { result: FulfillResult; amount: string; sessionId: string }) {
  const record = {
    planId: input.result.planId,
    amount: input.amount,
    email: input.result.email,
    userId: input.result.userId,
    sessionId: input.sessionId,
    status: input.result.status,
    membershipLevel: input.result.membershipLevel,
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
        html: asHtml(adminText(input)),
      })
    );
  }
  if (input.result.email && input.result.email.toLowerCase() !== admin.toLowerCase()) {
    sends.push(
      sendEmail({
        to: input.result.email,
        subject: `Payment received (USD ${input.result.planId})`,
        html: asHtml(buyerText(input)),
      })
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
