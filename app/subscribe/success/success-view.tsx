"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { RefreshSession } from "@/components/refresh-session";
import type { PlanId } from "@/lib/pricing";

export function SuccessView({
  sessionId,
  planId,
  showDownload,
}: {
  sessionId: string | null;
  planId: PlanId | null;
  showDownload: boolean;
}) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 pt-28 pb-12 text-center">
      <RefreshSession />
      <h1 className="text-4xl md:text-5xl font-bold text-[#00ff88] mb-4">{t("buy.success_title")}</h1>
      <p className="text-gray-300 text-lg max-w-xl mx-auto mb-4">{t("buy.success_body")}</p>
      <p className="text-gray-300 text-base max-w-xl mx-auto mb-4">{t("buy.success_login")}</p>
      {planId === "149" ? <p className="text-gray-400 text-sm max-w-xl mx-auto mb-4">{t("buy.success_indicators")}</p> : null}
      <p className="text-gray-500 text-sm max-w-xl mx-auto mb-8">{t("buy.success_note")}</p>
      {sessionId ? (
        <p className="text-xs text-gray-600 mb-8 break-all">
          {t("buy.reference")}: {sessionId}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-4 justify-center">
        {showDownload ? (
          <Button asChild className="bg-[#00ff88] text-black hover:bg-[#00cc6a]">
            <a href="/api/download/pitradingagent">{t("buy.success_download")}</a>
          </Button>
        ) : null}
        <Link href="/dashboard">
          <Button className={showDownload ? "bg-white/10 text-white hover:bg-white/20" : "bg-[#00ff88] text-black hover:bg-[#00cc6a]"}>
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
