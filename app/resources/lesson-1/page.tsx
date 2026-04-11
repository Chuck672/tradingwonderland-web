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
        返回学习资源
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">2026-03-30 XAUUSD亚盘案例拆解</h1>
          <p className="text-gray-400">结合订单流与价格行为的实战复盘</p>
        </div>

        <div className="w-full aspect-video bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden relative">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/an2FUMWfdhs"
            title="2026-03-30 XAUUSD亚盘案例拆解"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        <div className="prose prose-invert max-w-none pt-8 border-t border-white/10">
          <h2 className="text-2xl text-[#00ff88]">案例解析要点</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            本期视频我们将详细拆解 2026年3月30日 黄金（XAUUSD）在亚洲盘时段的走势。
          </p>
          <ul className="mt-4 space-y-2 text-gray-300">
            <li><strong>市场背景：</strong> 亚洲盘初期的流动性特征与开盘缺口。</li>
            <li><strong>入场逻辑：</strong> 如何利用订单流工具识别关键支撑/阻力位的真实买卖盘。</li>
            <li><strong>风控管理：</strong> 止损的合理放置与盘中仓位管理的抉择。</li>
            <li><strong>复盘反思：</strong> 交易执行过程中的心态起伏与纪律坚守。</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}