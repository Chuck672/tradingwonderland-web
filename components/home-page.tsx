"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";

type HomePlan = {
  amountUsd: number;
  recommended: boolean;
};

function Shot({
  src,
  alt,
  width,
  height,
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className="w-full h-auto rounded-2xl border border-white/10 bg-black"
    />
  );
}

function Caption({ children }: { children: string }) {
  return <figcaption className="mt-3 text-sm text-gray-500 leading-relaxed">{children}</figcaption>;
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm text-gray-300">
          <Check className="w-4 h-4 shrink-0 mt-0.5 text-[#00ff88]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function HomePage({ plans }: { plans: HomePlan[] }) {
  const { t } = useLanguage();

  return (
    <div className="bg-[#0a0a0a] text-slate-50">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <p className="text-sm font-semibold tracking-wide text-[#00ff88] mb-4">{t("home.kicker")}</p>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-5">
              {t("home.hero_title")}
            </h1>
            <p className="text-base md:text-lg text-gray-400 leading-relaxed mb-8">{t("home.hero_sub")}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg">
                <Link href="/subscribe">
                  {t("home.cta")} <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/15 bg-transparent text-white hover:bg-white/5 hover:text-white">
                <a href="#pricing">{t("home.cta_prices")}</a>
              </Button>
            </div>
          </div>
          <figure>
            <Shot
              src="/product/hero-ai.png"
              alt={t("home.alt_hero")}
              width={3839}
              height={2073}
              priority
            />
          </figure>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("home.pos_title")}</h2>
        <p className="text-gray-400 max-w-3xl mb-8 leading-relaxed">{t("home.pos_body")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(["1", "2", "3", "4"] as const).map((n) => (
            <div key={n} className="rounded-3xl border border-white/10 bg-[#111111] p-6">
              <h3 className="text-white font-semibold mb-2">{t(`home.pos${n}_t`)}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{t(`home.pos${n}_b`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("home.chart_title")}</h2>
            <p className="text-gray-400 leading-relaxed mb-6">{t("home.chart_body")}</p>
            <Bullets items={[t("home.chart_b1"), t("home.chart_b2"), t("home.chart_b3"), t("home.chart_b4")]} />
          </div>
          <figure>
            <Shot src="/product/chart-multitf.png" alt={t("home.alt_chart")} width={3839} height={2070} />
            <Caption>{t("home.chart_cap")}</Caption>
          </figure>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("home.ind_title")}</h2>
        <p className="text-gray-400 max-w-3xl leading-relaxed mb-8">{t("home.ind_body")}</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <figure>
            <Shot src="/product/indicator-a.png" alt={t("home.alt_ind1")} width={3839} height={2073} />
            <Caption>{t("home.ind_cap1")}</Caption>
          </figure>
          <figure>
            <Shot src="/product/trading-risk.png" alt={t("home.alt_ind2")} width={3837} height={2072} />
            <Caption>{t("home.ind_cap2")}</Caption>
          </figure>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <figure className="lg:order-2">
            <Shot src="/product/ai-agent.png" alt={t("home.alt_ai")} width={3836} height={2068} />
          </figure>
          <div className="lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("home.ai_title")}</h2>
            <p className="text-gray-400 leading-relaxed mb-6">{t("home.ai_body")}</p>
            <Bullets items={[t("home.ai_b1"), t("home.ai_b2"), t("home.ai_b3")]} />
            <p className="mt-6 text-sm text-gray-500 leading-relaxed">{t("home.ai_note")}</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("home.alert_title")}</h2>
            <p className="text-gray-400 leading-relaxed">{t("home.alert_body")}</p>
          </div>
          <figure>
            <Shot src="/product/alerts.png" alt={t("home.alt_alert")} width={3837} height={2070} />
            <Caption>{t("home.alert_cap")}</Caption>
          </figure>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <figure className="lg:order-2">
            <Shot src="/product/indicator-b.png" alt={t("home.alt_risk")} width={3837} height={2070} />
            <Caption>{t("home.risk_cap")}</Caption>
          </figure>
          <div className="lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("home.risk_title")}</h2>
            <p className="text-gray-400 leading-relaxed">{t("home.risk_body")}</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">{t("home.who_title")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(["1", "2", "3", "4"] as const).map((n) => (
            <div key={n} className="rounded-3xl border border-white/10 bg-[#111111] p-6">
              <h3 className="text-white font-semibold mb-2">{t(`home.who${n}_t`)}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{t(`home.who${n}_b`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("home.price_title")}</h2>
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
              <h3 className="text-xl font-bold text-white mb-2">
                {plan.recommended ? t("buy.tier_recommended") : t("buy.standard")}
              </h3>
              <p className="text-sm text-gray-400 mb-4">{t("home.kicker")}</p>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl font-extrabold text-white">{`$${plan.amountUsd}`}</span>
                <span className="text-gray-500">{t("buy.once")}</span>
              </div>
              <Button asChild className="w-full h-12 rounded-xl mt-auto">
                <Link href="/subscribe">
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
