"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { ProductCarousel } from "@/components/product-carousel";
import { Button } from "@/components/ui/button";
import type { PlanId } from "@/lib/pricing";
import { loginPathForPlan } from "@/lib/return-path";

type HomePlan = {
  id: PlanId;
  amountUsd: number;
  recommended: boolean;
};

export function HomePage({ plans }: { plans: HomePlan[] }) {
  const { t } = useLanguage();
  const { status } = useSession();
  const buyHref = (planId: PlanId) => (status === "authenticated" ? `/subscribe?plan=${planId}` : loginPathForPlan(planId));

  return (
    <div className="bg-[#0a0a0a] text-slate-50">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <p className="text-sm font-semibold tracking-wide text-[#00ff88] mb-3">{t("home.kicker")}</p>
        <h1 className="max-w-3xl text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
          {t("home.hero_title")}
        </h1>
        <p className="max-w-3xl text-base text-gray-400 leading-relaxed mb-6">{t("home.hero_sub")}</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild size="lg">
            <Link href={buyHref("349")}>
              {t("home.cta")} <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/15 bg-transparent text-white hover:bg-white/5 hover:text-white">
            <a href="#pricing">{t("home.cta_prices")}</a>
          </Button>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16" aria-labelledby="product-slide-title">
        <ProductCarousel />
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-white/10">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">{t("home.pos_title")}</h2>
        <p className="text-gray-400 max-w-3xl mb-6 leading-relaxed">{t("home.pos_body")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(["1", "2", "3", "4"] as const).map((n) => (
            <div key={n} className="rounded-3xl border border-white/10 bg-[#111111] p-6">
              <h3 className="text-white font-semibold mb-2">{t(`home.pos${n}_t`)}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{t(`home.pos${n}_b`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-white/10">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">{t("home.who_title")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(["1", "2", "3", "4"] as const).map((n) => (
            <div key={n} className="rounded-3xl border border-white/10 bg-[#111111] p-6">
              <h3 className="text-white font-semibold mb-2">{t(`home.who${n}_t`)}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{t(`home.who${n}_b`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">{t("home.price_title")}</h2>
          <p className="text-gray-400 leading-relaxed">{t("home.price_body")}</p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.amountUsd}
              className={`relative flex flex-col p-8 rounded-3xl bg-[#111111] border ${
                plan.recommended ? "border-[#00ff88]/40 shadow-[0_0_30px_rgba(0,255,136,0.08)]" : "border-white/10"
              }`}
            >
              {plan.recommended ? (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#00ff88] rounded-full text-black text-xs font-bold tracking-wider whitespace-nowrap">
                  {t("buy.recommended")}
                </div>
              ) : null}
              <h3 className="text-xl font-bold text-white mb-6">
                {plan.recommended ? t("buy.tier_349") : t("buy.tier_149")}
              </h3>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl font-extrabold text-white">{`$${plan.amountUsd}`}</span>
                <span className="text-gray-500">{t("buy.once")}</span>
              </div>
              <Button asChild className="w-full h-12 rounded-xl mt-auto">
                <Link href={buyHref(plan.id)}>
                  {t("home.price_cta")} <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
        <p className="max-w-4xl mx-auto mt-10 text-center text-xs text-slate-500">{t("buy.footnote")}</p>
        <p className="max-w-3xl mx-auto mt-6 text-center text-xs text-slate-500 leading-relaxed">{t("buy.disclaimer")}</p>
      </section>
    </div>
  );
}
