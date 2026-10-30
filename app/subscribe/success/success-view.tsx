"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { RefreshSession } from "@/components/refresh-session";
import type { PlanId } from "@/lib/pricing";

export function SuccessView({
  sessionId,
  licenseCode,
  planId,
}: {
  sessionId: string | null;
  licenseCode: string | null;
  planId: PlanId | null;
}) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 pt-28 pb-12 text-center">
      <RefreshSession />
      <h1 className="text-4xl md:text-5xl font-bold text-[#00ff88] mb-4">{t("buy.success_title")}</h1>
      <p className="text-gray-300 text-lg max-w-xl mx-auto mb-4">{t("buy.success_body")}</p>
      {licenseCode ? (
        <div className="mb-6 max-w-xl w-full rounded-2xl border border-[#00ff88]/30 bg-[#111] px-5 py-4">
          <p className="text-sm text-gray-400 mb-2">{t("buy.success_code_label")}</p>
          <p className="font-mono text-lg text-white tracking-wide break-all">{licenseCode}</p>
          <p className="text-xs text-gray-500 mt-3">{t("dashboard.license_applied")}</p>
        </div>
      ) : null}
      {planId === "149" ? <p className="text-gray-400 text-sm max-w-xl mx-auto mb-4">{t("buy.success_indicators")}</p> : null}
      <p className="text-gray-500 text-sm max-w-xl mx-auto mb-8">{t("buy.success_note")}</p>
      {sessionId ? (
        <p className="text-xs text-gray-600 mb-8 break-all">
          {t("buy.reference")}: {sessionId}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-4 justify-center">
        {planId === "349" && licenseCode ? (
          <Button asChild className="bg-[#00ff88] text-black hover:bg-[#00cc6a]">
            <a href="/api/download/pitradingagent">{t("buy.success_download")}</a>
          </Button>
        ) : null}
        <Link href="/dashboard">
          <Button className={planId === "349" && licenseCode ? "bg-white/10 text-white hover:bg-white/20" : "bg-[#00ff88] text-black hover:bg-[#00cc6a]"}>
            {t("buy.dashboard")}
          </Button>
        </Link>
        <Link href="/">
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            {t("buy.home")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
