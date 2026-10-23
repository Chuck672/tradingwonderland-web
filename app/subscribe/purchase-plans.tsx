"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import type { PublicPlan } from "@/lib/pricing";
import { isAllowedStripeHttpsUrl } from "@/lib/stripe-url";

export function PurchasePlans({ plans }: { plans: PublicPlan[] }) {
  const { t } = useLanguage();
  const [pending, setPending] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const bullets = [t("buy.bullet1"), t("buy.bullet2"), t("buy.bullet3")];

  async function startCheckout(planId: PublicPlan["id"]) {
    setFailed(false);
    setPending(planId);
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const data = (await response.json().catch(() => null)) as { url?: string } | null;
      if (!response.ok || !data?.url || !isAllowedStripeHttpsUrl(data.url)) {
        setFailed(true);
        setPending(null);
        return;
      }
      window.location.assign(data.url);
    } catch {
      setFailed(true);
      setPending(null);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-50 selection:bg-[#00ff88]/30 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">{t("buy.title")}</h1>
        <p className="text-lg text-gray-400">{t("buy.subtitle")}</p>
        <p className="text-sm text-gray-500">{t("buy.same")}</p>
        <p className="text-sm text-gray-500">{t("buy.overseas")}</p>
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
                  {t("buy.recommended")}
                </div>
              ) : null}
              <h2 className="text-xl font-bold text-white mb-2">{highlighted ? t("buy.tier_recommended") : t("buy.standard")}</h2>
              <p className="text-sm text-gray-400 mb-4">PiTradingAgent Setup 8.0.0</p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-extrabold text-white">{`$${plan.amountUsd}`}</span>
                <span className="text-gray-500">{t("buy.once")}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {bullets.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-300">
                    <Check className={`w-4 h-4 shrink-0 mt-0.5 ${highlighted ? "text-[#00ff88]" : "text-gray-500"}`} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {unconfigured ? (
                <div className="space-y-2">
                  <Button disabled className="w-full h-12 rounded-xl bg-[#1a1a1a] text-gray-400 border border-white/10">
                    {t("buy.unconfigured")}
                  </Button>
                  <p className="text-xs text-gray-500 leading-relaxed">{t("buy.unconfigured_hint")}</p>
                </div>
              ) : link ? (
                <a href={link} rel="noopener noreferrer">
                  <Button className={`w-full h-12 rounded-xl ${highlighted ? "bg-[#00ff88] text-black hover:bg-[#00cc6a]" : "bg-[#1a1a1a] text-white border border-white/10 hover:bg-[#00ff88] hover:text-black"}`}>
                    {t("buy.cta")} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              ) : (
                <Button
                  disabled={pending !== null}
                  onClick={() => startCheckout(plan.id)}
                  className={`w-full h-12 rounded-xl ${highlighted ? "bg-[#00ff88] text-black hover:bg-[#00cc6a]" : "bg-[#1a1a1a] text-white border border-white/10 hover:bg-[#00ff88] hover:text-black"}`}
                >
                  {pending === plan.id ? t("buy.opening") : t("buy.cta")} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          );
        })}
      </div>

      {failed ? (
        <p className="max-w-4xl mx-auto mt-6 text-center text-sm text-red-400" role="alert">
          {t("buy.error")}
        </p>
      ) : null}

      <p className="max-w-4xl mx-auto mt-10 text-center text-xs text-slate-500">{t("buy.footnote")}</p>

      <div className="max-w-3xl mx-auto mt-8 text-center space-y-3">
        <Link href="/login" className="text-sm text-gray-400 hover:text-[#00ff88]">
          {t("buy.redeem")}
        </Link>
        <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-800/50 pt-6">{t("buy.disclaimer")}</p>
      </div>
    </div>
  );
}
