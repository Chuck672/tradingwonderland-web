"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";

export function CancelView() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 pt-28 pb-12 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("buy.cancel_title")}</h1>
      <p className="text-gray-300 text-lg max-w-xl mx-auto mb-8">{t("buy.cancel_body")}</p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/subscribe">
          <Button className="bg-[#00ff88] text-black hover:bg-[#00cc6a]">{t("buy.cancel_back")}</Button>
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
