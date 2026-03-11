"use client";

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlayCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export default function ToolDetailClient({ toolId }: { toolId: string }) {
  const { t } = useLanguage();

  // Find the tool title based on ID (simple mapping for now)
  const getToolTitle = () => {
    switch (toolId) {
      case "sessionVolumeProfile-pro": return t("tools.t1.title");
      case "inRangeVolumeProfile": return t("tools.t2.title");
      case "scalpQuickButton": return t("tools.t3.title");
      case "strengthBubble_pro": return t("tools.t4.title");
      case "XAUUSD_footprint": return t("tools.t5.title");
      case "XAUUSD_monitor": return t("tools.t6.title");
      default: return toolId;
    }
  };

  const getToolDesc = () => {
    switch (toolId) {
      case "sessionVolumeProfile-pro": return t("tools.t1.desc");
      case "inRangeVolumeProfile": return t("tools.t2.desc");
      case "scalpQuickButton": return t("tools.t3.desc");
      case "strengthBubble_pro": return t("tools.t4.desc");
      case "XAUUSD_footprint": return t("tools.t5.desc");
      case "XAUUSD_monitor": return t("tools.t6.desc");
      default: return "";
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <Link href="/tools" className="inline-flex items-center text-gray-400 hover:text-[#00ff88] transition-colors mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        {t("tools.detail.back")}
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{getToolTitle()}</h1>
          <p className="text-xl text-gray-400">{getToolDesc()}</p>
        </div>

        {/* Video Placeholder */}
        <div className="w-full aspect-video bg-[#0a0a0a] border border-white/10 rounded-2xl flex flex-col items-center justify-center text-gray-500 overflow-hidden relative group cursor-pointer hover:border-[#00ff88]/50 transition-colors">
          <PlayCircle className="w-16 h-16 mb-4 group-hover:text-[#00ff88] transition-colors" />
          <p className="text-lg">{t("tools.detail.video_tutorial")}</p>
          <p className="text-sm mt-2 opacity-60">(YouTube / Bilibili Video Placeholder)</p>
          {/* 
            // Future implementation example:
            <iframe 
              className="absolute inset-0 w-full h-full" 
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          */}
        </div>

        {/* Content Placeholder */}
        <div className="prose prose-invert max-w-none pt-8 border-t border-white/10">
          <p className="text-gray-300 leading-relaxed text-lg">
            {t("tools.detail.placeholder_desc")}
          </p>
          <div className="mt-10 flex gap-4">
            <Link href="/dashboard">
              <Button className="bg-[#00ff88] text-black hover:bg-[#00cc6a] px-8">
                前往个人中心下载
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
