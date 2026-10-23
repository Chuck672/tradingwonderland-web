"use client";

import { useLanguage } from "@/components/language-provider";
import { motion } from "motion/react";
import dynamic from "next/dynamic";

function ChartFallback() {
  const { t } = useLanguage();
  return (
    <div className="w-full h-[60vh] min-h-[400px] rounded-xl border border-white/10 bg-black flex items-center justify-center text-[#00bfa5]">
      {t("chart.loading")}
    </div>
  );
}

const TradingChart = dynamic(
  () => import("@/components/chart").then((m) => m.TradingChart),
  {
    ssr: false,
    loading: () => <ChartFallback />,
  }
);

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
        >
          {t("hero.title")}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10"
        >
          {t("hero.subtitle")}
        </motion.p>
      </section>

      {/* Chart Section */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <TradingChart />
        </motion.div>
      </section>
    </div>
  );
}
