"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export default function PriceActionManual() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Link href="/resources" className="inline-flex items-center text-gray-400 hover:text-[#00ff88] transition-colors mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        返回学习资源
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full h-[85vh] rounded-2xl overflow-hidden border border-white/10 bg-black relative"
      >
        <iframe 
          src="/priceaction_manual.html"
          className="w-full h-full border-none"
          title="价格行为交易手册"
          allowFullScreen
        />
      </motion.div>
    </div>
  );
}
