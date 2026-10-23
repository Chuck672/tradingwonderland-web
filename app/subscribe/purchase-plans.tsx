"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import type { PublicPlan } from "@/lib/pricing";
import { isAllowedStripeHttpsUrl } from "@/lib/stripe-url";

const COPY = {
  zh: {
    title: "PiTradingAgent Setup 8.0.0",
    subtitle: "MT5 图表伴侣桌面程序。一次性购买，交付安装包（zip）与 PTA1 授权。",
    sameDelivery: "两档交付相同：安装 zip + PTA1。$349 为推荐档。",
    overseas: "Stripe 结账仅面向中国大陆以外的买家。",
    bullets: ["MT5 图表伴侣桌面程序（Setup 8.0.0）", "交付：安装 zip + PTA1 授权", "售后仅限安装与授权答疑"],
    standard: "标准档",
    recommended: "推荐 ★",
    once: "一次性",
    buy: "海外信用卡购买",
    buying: "正在前往 Stripe…",
    unconfigured: "海外支付暂未配置",
    unconfiguredHint: "价格已标出。Stripe 环境变量配置完成后，此按钮会进入结账。",
    error: "暂时无法打开结账，请稍后再试。",
    redeem: "已有激活码？登录后可在个人中心兑换。",
    disclaimer: "本页面所述程序仅供图表查看与研究，不构成投资建议。不提供代客操盘，也不承诺收益。",
    footnote: "中国大陆用户请走闲鱼",
  },
  en: {
    title: "PiTradingAgent Setup 8.0.0",
    subtitle: "MT5 chart-companion desktop app. One-time purchase. Delivery is the setup zip and a PTA1 license.",
    sameDelivery: "Both tiers deliver the same zip and PTA1 license. $349 is the recommended tier.",
    overseas: "Stripe checkout is for buyers outside mainland China.",
    bullets: [
      "MT5 chart-companion desktop app (Setup 8.0.0)",
      "Delivery: setup zip + PTA1 license",
      "Support is limited to install and license questions",
    ],
    standard: "Standard",
    recommended: "Recommended ★",
    once: "one-time",
    buy: "Buy with card (overseas)",
    buying: "Opening Stripe…",
    unconfigured: "Overseas checkout is not configured",
    unconfiguredHint: "Prices are shown. This button opens checkout after the Stripe environment variables are set.",
    error: "Checkout could not be opened. Please try again later.",
    redeem: "Already have a license code? Sign in and redeem it in the dashboard.",
    disclaimer:
      "This desktop app is for chart review and research. It is not investment advice, not a discretionary trading service, and it does not promise profits.",
    footnote: "中国大陆用户请走闲鱼",
  },
} as const;

export function PurchasePlans({ plans }: { plans: PublicPlan[] }) {
  const { language } = useLanguage();
  const copy = language === "en" ? COPY.en : COPY.zh;
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout(planId: PublicPlan["id"]) {
    setError(null);
    setPending(planId);
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const data = (await response.json().catch(() => null)) as { url?: string } | null;
      if (!response.ok || !data?.url || !isAllowedStripeHttpsUrl(data.url)) {
        setError(copy.error);
        setPending(null);
        return;
      }
      window.location.assign(data.url);
    } catch {
      setError(copy.error);
      setPending(null);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-50 selection:bg-[#00ff88]/30 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">{copy.title}</h1>
        <p className="text-lg text-gray-400">{copy.subtitle}</p>
        <p className="text-sm text-gray-500">{copy.sameDelivery}</p>
        <p className="text-sm text-gray-500">{copy.overseas}</p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {plans.map((plan) => {
          const highlighted = plan.recommended;
          const link = plan.method === "payment_link" && plan.paymentLinkUrl && isAllowedStripeHttpsUrl(plan.paymentLinkUrl)
            ? plan.paymentLinkUrl
            : null;
          const unconfigured = plan.method === "unconfigured" || (plan.method === "payment_link" && !link);
          return (
            <div
              key={plan.id}
              className={`relative flex flex-col p-8 rounded-3xl bg-[#111111] border h-full ${
                highlighted ? "border-[#00ff88]/40 shadow-[0_0_30px_rgba(0,255,136,0.08)]" : "border-white/10"
              }`}
            >
              {highlighted ? (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#00ff88] rounded-full text-black text-xs font-bold tracking-wider whitespace-nowrap">
                  {copy.recommended}
                </div>
              ) : null}
              <h2 className="text-xl font-bold text-white mb-2">{highlighted ? (language === "en" ? "Recommended tier" : "推荐档") : copy.standard}</h2>
              <p className="text-sm text-gray-400 mb-4">PiTradingAgent Setup 8.0.0</p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-extrabold text-white">{`$${plan.amountUsd}`}</span>
                <span className="text-gray-500">{copy.once}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {copy.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-300">
                    <Check className={`w-4 h-4 shrink-0 mt-0.5 ${highlighted ? "text-[#00ff88]" : "text-gray-500"}`} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {unconfigured ? (
                <div className="space-y-2">
                  <Button disabled className="w-full h-12 rounded-xl bg-[#1a1a1a] text-gray-400 border border-white/10">
                    {copy.unconfigured}
                  </Button>
                  <p className="text-xs text-gray-500 leading-relaxed">{copy.unconfiguredHint}</p>
                </div>
              ) : link ? (
                <a href={link} rel="noopener noreferrer">
                  <Button className={`w-full h-12 rounded-xl ${highlighted ? "bg-[#00ff88] text-black hover:bg-[#00cc6a]" : "bg-[#1a1a1a] text-white border border-white/10 hover:bg-[#00ff88] hover:text-black"}`}>
                    {copy.buy} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              ) : (
                <Button
                  disabled={pending !== null}
                  onClick={() => startCheckout(plan.id)}
                  className={`w-full h-12 rounded-xl ${highlighted ? "bg-[#00ff88] text-black hover:bg-[#00cc6a]" : "bg-[#1a1a1a] text-white border border-white/10 hover:bg-[#00ff88] hover:text-black"}`}
                >
                  {pending === plan.id ? copy.buying : copy.buy} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          );
        })}
      </div>

      {error ? (
        <p className="max-w-4xl mx-auto mt-6 text-center text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      <p className="max-w-4xl mx-auto mt-10 text-center text-xs text-slate-500">{copy.footnote}</p>

      <div className="max-w-3xl mx-auto mt-8 text-center space-y-3">
        <Link href="/login" className="text-sm text-gray-400 hover:text-[#00ff88]">
          {copy.redeem}
        </Link>
        <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-800/50 pt-6">{copy.disclaimer}</p>
      </div>
    </div>
  );
}
