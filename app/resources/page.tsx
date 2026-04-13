"use client";

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "motion/react";
import Link from "next/link";

export default function ResourcesPage() {
  const { t } = useLanguage();

  const courses = [
    { title: t("courses.c1.title"), desc: t("courses.c1.desc"), href: "/resources/psychology" },
    { title: t("courses.c2.title"), desc: t("courses.c2.desc"), href: "/resources/priceaction-course" },
    { title: t("courses.c3.title"), desc: t("courses.c3.desc"), href: "/resources/volumeprofile-course" },
    { title: t("courses.c4.title"), desc: t("courses.c4.desc"), href: "/resources/priceaction-manual" },
    { title: t("courses.c5.title"), desc: t("courses.c5.desc"), href: "/resources/tradingsystem" },
    { title: t("courses.c6.title"), desc: t("courses.c6.desc"), href: "/resources/trading-journal" },
    { title: t("courses.c7.title"), desc: t("courses.c7.desc"), href: "/resources/pretrade-checklist" },
  ];

  const strategies = [
    { title: t("strategy.c1.title"), desc: t("strategy.c1.desc") },
    { title: t("strategy.c2.title"), desc: t("strategy.c2.desc") },
    { title: t("strategy.c3.title"), desc: t("strategy.c3.desc") },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full pt-10">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-white mb-4">{t("nav.resources")}</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">{t("resources.desc")}</p>
      </div>

      {/* Courses Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#00ff88] mb-4">{t("courses.title")}</h2>
          <div className="h-px w-full bg-white/20 max-w-4xl mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="rounded-tl-none rounded-tr-[60px] rounded-bl-[60px] rounded-br-none h-full flex flex-col">
                <CardHeader className="flex-grow">
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <CardDescription className="mt-2">{course.desc}</CardDescription>
                </CardHeader>
                <CardFooter className="justify-center mt-auto pb-6">
                  {course.href.endsWith('.html') ? (
                    <a href={course.href} target="_blank" rel="noopener noreferrer" className="w-full">
                      <Button variant="outline" className="border-[#00ff88] text-[#00ff88] hover:bg-[#00ff88] hover:text-black w-full">
                        {t("btn.start")}
                      </Button>
                    </a>
                  ) : (
                    <Link href={course.href} className="w-full">
                      <Button variant="outline" className="border-[#00ff88] text-[#00ff88] hover:bg-[#00ff88] hover:text-black w-full">
                        {t("btn.start")}
                      </Button>
                    </Link>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Strategy Library Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#00ff88] mb-4">{t("strategy.title")}</h2>
          <div className="h-px w-full bg-white/20 max-w-4xl mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {strategies.map((strategy, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="rounded-tl-none rounded-tr-[60px] rounded-bl-[60px] rounded-br-none h-full flex flex-col">
                <CardHeader className="flex-grow">
                  <CardTitle className="text-xl">{strategy.title}</CardTitle>
                  <CardDescription className="mt-2">{strategy.desc}</CardDescription>
                </CardHeader>
                <CardFooter className="justify-center mt-auto pb-6">
                  <Button variant="outline" className="border-[#00ff88] text-[#00ff88] hover:bg-[#00ff88] hover:text-black w-full">
                    {t("btn.start")}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lesson Learn Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#00ff88] mb-4">{t("lesson.title")}</h2>
          <div className="h-px w-full bg-white/20 max-w-4xl mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="rounded-tl-none rounded-tr-[40px] rounded-bl-[40px] rounded-br-none h-full flex flex-col min-h-[160px]">
              <CardHeader className="flex-grow pt-6 pb-2">
                <CardTitle className="text-lg leading-tight">{t("lesson.c1.title")}</CardTitle>
                {t("lesson.c1.desc") && <CardDescription className="mt-2">{t("lesson.c1.desc")}</CardDescription>}
              </CardHeader>
              <CardFooter className="justify-center mt-auto pb-6">
                <Link href="/resources/lesson-1" className="w-full">
                  <Button variant="outline" className="border-[#00ff88] text-[#00ff88] hover:bg-[#00ff88] hover:text-black w-full">
                    {t("btn.read_article")}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mb-10 text-center">
        <p className="text-gray-500 text-sm border-t border-white/10 pt-8 max-w-3xl mx-auto">
          {t("resources.disclaimer")}
        </p>
      </section>
    </div>
  );
}
