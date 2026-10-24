"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export default function BbsDisabledPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-2xl font-bold text-white">{t("bbs.title")}</h1>
      <p className="mt-4 text-slate-400 leading-relaxed">{t("bbs.body")}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
        >
          {t("bbs.home")}
        </Link>
        <Link
          href="/resources"
          className="px-4 py-2 rounded-lg bg-[#00bfa5] hover:bg-[#00a893] text-slate-950 font-medium transition-colors"
        >
          {t("bbs.resources")}
        </Link>
      </div>
    </div>
  );
}
