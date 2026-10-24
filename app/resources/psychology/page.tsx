"use client";

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function PsychologyPage() {
  const { t } = useLanguage();

  const articles = [
    {
      id: "why-95-percent-fail",
      title: t("psych.a1.title"),
      desc: t("psych.a1.desc"),
      date: "2023-10-15",
      readTime: "10 min read"
    },
    {
      id: "from-loser-to-winner",
      title: t("psych.a2.title"),
      desc: t("psych.a2.desc"),
      date: "2023-11-02",
      readTime: "12 min read"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <Link href="/resources" className="inline-flex items-center text-gray-400 hover:text-[#00ff88] transition-colors mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        {t("resources.back")}
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center md:text-left mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("courses.c1.title")}</h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            {t("courses.c1.desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full flex flex-col bg-[#0a0a0a] border-white/10 hover:border-[#00ff88]/50 transition-colors group">
                <CardHeader className="flex-grow">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{article.date}</span>
                    <span className="flex items-center"><BookOpen className="w-4 h-4 mr-1" /> {article.readTime}</span>
                  </div>
                  <CardTitle className="text-2xl mb-3 group-hover:text-[#00ff88] transition-colors">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-base text-gray-400">
                    {article.desc}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-6">
                  <Link href={`/resources/psychology/${article.id}`} className="w-full">
                    <Button className="w-full bg-white/5 hover:bg-[#00ff88] text-white hover:text-black border border-white/10 hover:border-transparent transition-all">
                      {t("psych.read")}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
