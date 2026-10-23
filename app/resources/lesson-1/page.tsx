"use client";

import { useLanguage } from "@/components/language-provider";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export default function LessonDetailPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <Link href="/resources" className="inline-flex items-center text-gray-400 hover:text-[#00ff88] transition-colors mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        {t("resources.back")}
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("lesson1.title")}</h1>
          <p className="text-gray-400">{t("lesson1.desc")}</p>
        </div>

        <div className="w-full aspect-video bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden relative">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/an2FUMWfdhs"
            title={t("lesson1.title")}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        <div className="prose prose-invert max-w-none pt-8 border-t border-white/10">
          <h2 className="text-2xl text-[#00ff88]">{t("lesson1.points")}</h2>
          <p className="text-gray-300 leading-relaxed text-lg">{t("lesson1.intro")}</p>
          <ul className="mt-4 space-y-2 text-gray-300">
            <li>{t("lesson1.b1")}</li>
            <li>{t("lesson1.b2")}</li>
            <li>{t("lesson1.b3")}</li>
            <li>{t("lesson1.b4")}</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}