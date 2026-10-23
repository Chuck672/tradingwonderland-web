"use client";

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "motion/react";
import Link from "next/link";

export default function ToolsPage() {
  const { t } = useLanguage();

  const mt5Tools = [
    { id: "SVP5_pro", title: t("tools.t1.title"), desc: t("tools.t1.desc") },
    { id: "inRangeVP", title: t("tools.t2.title"), desc: t("tools.t2.desc") },
    { id: "scalpTradingPanel", title: t("tools.t3.title"), desc: t("tools.t3.desc") },
    { id: "strengthBubble_pro", title: t("tools.t4.title"), desc: t("tools.t4.desc") },
    { id: "Trend_Panel9_pro", title: t("tools.t5.title"), desc: t("tools.t5.desc") },
    { id: "microOrderFlow", title: t("tools.t6.title"), desc: t("tools.t6.desc") },
  ];

  const advancedTools = [
    { id: "awesomeChart", title: t("tools.t7.title"), desc: t("tools.t7.desc") },
    { id: "awesomeTradingAgent", title: t("tools.t8.title"), desc: t("tools.t8.desc") },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full pt-10">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-white mb-4">{t("nav.tools")}</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">{t("tools.desc")}</p>
      </div>

      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#00ff88] mb-4">
            {t("tools.mt5_heading")}
          </h2>
          <div className="h-px w-full bg-white/20 max-w-4xl mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mt5Tools.map((tool, i) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
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

      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#00ff88] mb-4">
            {t("tools.advanced_heading")}
          </h2>
          <div className="h-px w-full bg-white/20 max-w-4xl mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {advancedTools.map((tool, i) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
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

      {/* Disclaimer Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mb-10 text-center">
        <p className="text-gray-500 text-sm border-t border-white/10 pt-8 max-w-3xl mx-auto">
          {t("tools.disclaimer")}
        </p>
      </section>
    </div>
  );
}
