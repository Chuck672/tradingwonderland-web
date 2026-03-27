"use client";

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "motion/react";
import Link from "next/link";

export default function ToolsPage() {
  const { t } = useLanguage();

  const tools = [
    { id: "SVP5_pro", title: t("tools.t1.title"), desc: t("tools.t1.desc") },
    { id: "inRangeVolumeProfile", title: t("tools.t2.title"), desc: t("tools.t2.desc") },
    { id: "scalpTradingPanel", title: t("tools.t3.title"), desc: t("tools.t3.desc") },
    { id: "strengthBubble_pro", title: t("tools.t4.title"), desc: t("tools.t4.desc") },
    { id: "Trend_Panel9_pro", title: t("tools.t5.title"), desc: t("tools.t5.desc") },
    { id: "XAUUSD_monitor", title: t("tools.t6.title"), desc: t("tools.t6.desc") },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full pt-10">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-white mb-4">{t("nav.tools")}</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">{t("tools.desc")}</p>
      </div>

      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="rounded-tl-none rounded-tr-[60px] rounded-bl-[60px] rounded-br-none h-full flex flex-col border border-white/5 hover:border-[#00ff88]/50">
                <CardHeader className="flex-grow">
                  <CardTitle className="text-xl text-[#00ff88]">{tool.title}</CardTitle>
                  <CardDescription className="mt-3 text-sm leading-relaxed">{tool.desc}</CardDescription>
                </CardHeader>
                <CardFooter className="justify-center mt-auto pb-6">
                  <Link href={`/tools/${tool.id}`} className="w-full">
                    <Button variant="outline" className="border-white/20 text-white hover:bg-[#00ff88] hover:text-black hover:border-[#00ff88] w-full transition-colors">
                      {t("btn.get_tool")}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
