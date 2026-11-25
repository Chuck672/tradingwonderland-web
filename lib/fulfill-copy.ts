export type FulfillmentNotice = {
  planId: string;
  amount: string;
  sessionId: string;
  status: "applied" | "duplicate" | "pending_user";
  email: string | null;
  userId: string | null;
  membershipLevel: number;
  dashboardUrl: string;
};

function tierName(planId: string) {
  return planId === "349" ? "full PiTradingAgent desktop tool" : "full MT5 indicators & EA collection";
}

function tierNameZh(planId: string) {
  return planId === "349" ? "完整 PiTradingAgent 桌面工具" : "完整 MT5 指标和 EA 合集";
}

export function buyerFulfillmentText(input: FulfillmentNotice): string {
  const pending = input.status === "pending_user";
  const delivery = pending
    ? [
        "No QuantLogicLab account matched this email yet. Register or sign in with this email and the membership will be attached.",
        "还没有 QuantLogicLab 账号对上这个邮箱。请用这个邮箱注册或登录，会员会挂到该账号。",
        "Then open PiTradingAgent and sign in with that same email and password. License codes are no longer issued.",
        "然后打开 PiTradingAgent，用同一个邮箱和密码登录。网站不再发放授权码。",
      ]
    : input.planId === "349"
      ? [
          "Your QuantLogicLab membership is active. Open PiTradingAgent and sign in with this email and password. License codes are no longer issued.",
          "你的 QuantLogicLab 会员已生效。请打开 PiTradingAgent，用这个邮箱和密码登录。网站不再发放授权码。",
          "The installer is on your dashboard.",
          "安装包在个人中心下载。",
        ]
      : [
          "Your QuantLogicLab membership is active. The MT5 indicators and EAs are in the dashboard.",
          "你的 QuantLogicLab 会员已生效。MT5 指标和 EA 在个人中心下载。",
          "PiTradingAgent signs in with this same email and password. License codes are no longer issued.",
          "PiTradingAgent 使用同一个邮箱和密码登录。网站不再发放授权码。",
        ];
  return [
    `We received your payment for the ${tierName(input.planId)} (USD ${input.planId}).`,
    `我们已收到你购买「${tierNameZh(input.planId)}」的付款（USD ${input.planId}）。`,
    `Amount / 金额: ${input.amount}`,
    ...delivery,
    input.dashboardUrl,
    `Reference / 参考号: ${input.sessionId}`,
    "Support covers install and account questions only.",
    "售后仅限安装与账号答疑。",
    "This is not a discretionary trading service and it does not promise profits.",
    "不提供代客操盘，也不承诺收益。",
  ].join("\n");
}

export function adminFulfillmentText(input: FulfillmentNotice): string {
  return [
    `Paid ${tierName(input.planId)} (USD ${input.planId}).`,
    `Amount: ${input.amount}`,
    `Buyer email: ${input.email || "(none)"}`,
    `User id: ${input.userId || "(no matching account)"}`,
    `Fulfillment: ${input.status}`,
    `Membership level written: ${input.membershipLevel}`,
    "License code: not issued. Desktop sign-in is the QuantLogicLab account.",
    `Checkout session: ${input.sessionId}`,
    input.planId === "349"
      ? "Desktop installer is served from /api/download/pitradingagent after GITHUB_TOKEN + GITHUB_RELEASE_ASSET_URL (or PITRADINGAGENT_DOWNLOAD_URL, or private-tools/PiTradingAgent-Setup.zip)."
      : "This tier is the MT5 indicators and EA collection, not the desktop installer.",
  ].join("\n");
}
