"use client";

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { loadStripe } from "@stripe/stripe-js";
import { Check, ChevronRight, Star } from "lucide-react";
import Link from "next/link";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder");

export default function SubscribePage() {
  const { t } = useLanguage();

  const handleSubscribe = async () => {
    try {
      alert("Stripe Checkout Session will be created here.");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#00bfa5] mb-4">{t("sub.title")}</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t("sub.subtitle")}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] w-full">
        {/* Plan 1: Explorer */}
        <Card className="border border-white/10 bg-black/40 flex flex-col hover:border-[#00bfa5]/50 transition-colors">
          <CardHeader>
            <div className="text-2xl mb-2">📚</div>
            <CardTitle className="text-2xl">{t("sub.p1.name")}</CardTitle>
            <CardDescription className="text-md">{t("sub.p1.desc")}</CardDescription>
            <div className="text-4xl font-bold text-white mt-4">{t("sub.free")}<span className="text-sm text-gray-400 font-normal"> / {t("sub.lifetime")}</span></div>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-4 text-sm text-gray-300">
              <div>
                <div className="flex items-center font-bold text-white mb-2">
                  <span className="mr-2">📖</span> {t("sub.p1.f1")}
                </div>
                <ul className="space-y-2 pl-6 border-l border-white/10 ml-2">
                  <li className="relative before:content-[''] before:absolute before:w-3 before:h-[1px] before:bg-white/20 before:-left-6 before:top-1/2">{t("sub.p1.f2")}<br/><span className="text-xs text-gray-500">{t("sub.p1.f2_sub")}</span></li>
                  <li className="relative before:content-[''] before:absolute before:w-3 before:h-[1px] before:bg-white/20 before:-left-6 before:top-1/2">{t("sub.p1.f3")}<br/><span className="text-xs text-gray-500">{t("sub.p1.f3_sub")}</span></li>
                  <li className="relative before:content-[''] before:absolute before:w-3 before:h-[1px] before:bg-white/20 before:-left-6 before:top-1/2">{t("sub.p1.f4")}<br/><span className="text-xs text-gray-500">{t("sub.p1.f4_sub")}</span></li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="mt-auto pt-6">
            <Link href="/register" className="w-full">
              <Button variant="outline" className="w-full text-md py-6 border-white/20 text-white hover:bg-[#00bfa5] hover:text-black hover:border-[#00bfa5] transition-colors">{t("sub.register_free")}</Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Plan 2: Edge */}
        <Card className="border border-white/10 bg-black/40 flex flex-col hover:border-[#00bfa5]/50 transition-colors">
          <CardHeader>
            <div className="text-2xl mb-2">⚔️</div>
            <CardTitle className="text-2xl">{t("sub.p2.name")}</CardTitle>
            <CardDescription className="text-md">{t("sub.p2.desc")}</CardDescription>
            <div className="text-4xl font-bold text-white mt-4">{t("sub.p2.price")}<span className="text-sm text-gray-400 font-normal"> / {t("sub.lifetime_auth")}</span></div>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-center font-bold text-[#00bfa5]">
                <span className="mr-2">▲</span> {t("sub.p2.f1")}
              </div>
              
              <div>
                <div className="flex items-center font-bold text-white mb-2">
                  <span className="mr-2">🛠️</span> {t("sub.p2.f2")} <span className="text-xs font-normal text-gray-500 ml-2">{t("sub.p2.f2_sub")}</span>
                </div>
                <ul className="space-y-3 pl-6 border-l border-white/10 ml-2">
                  <li className="relative before:content-[''] before:absolute before:w-3 before:h-[1px] before:bg-white/20 before:-left-6 before:top-2">
                    <span className="text-[#00bfa5] font-semibold">{t("sub.p2.t1")}</span>
                    <p className="text-xs text-gray-400 mt-1 whitespace-pre-line">{t("sub.p2.t1_sub")}</p>
                  </li>
                  <li className="relative before:content-[''] before:absolute before:w-3 before:h-[1px] before:bg-white/20 before:-left-6 before:top-2">
                    <span className="text-[#00bfa5] font-semibold">{t("sub.p2.t2")}</span>
                    <p className="text-xs text-gray-400 mt-1 whitespace-pre-line">{t("sub.p2.t2_sub")}</p>
                  </li>
                  <li className="relative before:content-[''] before:absolute before:w-3 before:h-[1px] before:bg-white/20 before:-left-6 before:top-2">
                    <span className="text-[#00bfa5] font-semibold">{t("sub.p2.t3")}</span>
                    <p className="text-xs text-gray-400 mt-1 whitespace-pre-line">{t("sub.p2.t3_sub")}</p>
                  </li>
                  <li className="relative before:content-[''] before:absolute before:w-3 before:h-[1px] before:bg-white/20 before:-left-6 before:top-2">
                    <span className="text-[#00bfa5] font-semibold">{t("sub.p2.t4")}</span>
                    <p className="text-xs text-gray-400 mt-1 whitespace-pre-line">{t("sub.p2.t4_sub")}</p>
                  </li>
                  <li className="relative before:content-[''] before:absolute before:w-3 before:h-[1px] before:bg-white/20 before:-left-6 before:top-2">
                    <span className="text-[#00bfa5] font-semibold">{t("sub.p2.t5")}</span>
                    <p className="text-xs text-gray-400 mt-1 whitespace-pre-line">{t("sub.p2.t5_sub")}</p>
                  </li>
                </ul>
              </div>

              <ul className="space-y-2 pt-2">
                <li className="flex items-start"><span className="mr-2">📋</span> {t("sub.p2.f3")}</li>
                <li className="flex items-start"><span className="mr-2">🔄</span> {t("sub.p2.f4")}</li>
                <li className="flex items-start"><span className="mr-2">💬</span> {t("sub.p2.f5")}</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="mt-auto pt-6">
            <Button variant="outline" onClick={handleSubscribe} className="w-full text-md py-6 border-white/20 text-white hover:bg-[#00bfa5] hover:text-black hover:border-[#00bfa5] transition-colors">{t("sub.buy_now")}</Button>
          </CardFooter>
        </Card>

        {/* Plan 3: HawkEye */}
        <Card className="border border-[#00bfa5]/50 bg-black/40 flex flex-col relative overflow-hidden shadow-[0_0_30px_rgba(0,191,165,0.1)]">
          <div className="absolute top-0 right-0 bg-[#00bfa5] text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
            {t("sub.most_popular")}
          </div>
          <CardHeader>
            <div className="text-2xl mb-2">🦅</div>
            <CardTitle className="text-2xl">{t("sub.p3.name")}</CardTitle>
            <CardDescription className="text-md">{t("sub.p3.desc")}</CardDescription>
            <div className="text-4xl font-bold text-[#00bfa5] mt-4">{t("sub.p3.price")}<span className="text-sm text-gray-400 font-normal"> / {t("sub.lifetime_auth")}</span></div>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-center font-bold text-[#00bfa5]">
                <span className="mr-2">▲</span> {t("sub.p3.f1")}
              </div>
              
              <div>
                <div className="flex items-center font-bold text-white mb-2 text-[#00bfa5]">
                  <Star className="w-4 h-4 mr-2 fill-[#00bfa5]" /> {t("sub.p3.f2")}
                </div>
                <ul className="space-y-4 pl-6 border-l border-[#00bfa5]/30 ml-2">
                  <li className="relative before:content-[''] before:absolute before:w-3 before:h-[1px] before:bg-[#00bfa5]/50 before:-left-6 before:top-2">
                    <span className="text-white font-semibold flex items-center"><span className="mr-1">🤖</span> {t("sub.p3.t1")}</span>
                    <span className="text-xs text-[#00bfa5] ml-1 border border-[#00bfa5]/30 rounded px-1">{t("sub.p3.t1_badge")}</span>
                    <ul className="text-xs text-gray-400 mt-2 space-y-1 list-disc pl-4">
                      <li>{t("sub.p3.t1_1")}</li>
                      <li>{t("sub.p3.t1_2")}</li>
                      <li>{t("sub.p3.t1_3")}</li>
                      <li>{t("sub.p3.t1_4")}</li>
                    </ul>
                  </li>
                  <li className="relative before:content-[''] before:absolute before:w-3 before:h-[1px] before:bg-[#00bfa5]/50 before:-left-6 before:top-2">
                    <span className="text-white font-semibold flex items-center"><span className="mr-1">📊</span> {t("sub.p3.t2")}</span>
                    <span className="text-xs text-[#00bfa5] ml-1 border border-[#00bfa5]/30 rounded px-1">{t("sub.p3.t2_badge")}</span>
                    <ul className="text-xs text-gray-400 mt-2 space-y-1 list-disc pl-4">
                      <li>{t("sub.p3.t2_1")}</li>
                      <li>{t("sub.p3.t2_2")}</li>
                      <li>{t("sub.p3.t2_3")}</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <ul className="space-y-2 pt-2">
                <li className="flex items-start"><span className="mr-2">🔄</span> {t("sub.p3.f3")}</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="mt-auto pt-6">
            <Button variant="outline" onClick={handleSubscribe} className="w-full text-md py-6 border-white/20 text-white hover:bg-[#00bfa5] hover:text-black hover:border-[#00bfa5] transition-colors">{t("sub.buy_now")}</Button>
          </CardFooter>
        </Card>

        {/* Plan 4: Quantum */}
        <Card className="border border-purple-500/30 bg-black/40 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
            {t("sub.limited")}
          </div>
          <CardHeader>
            <div className="text-2xl mb-2">🤖</div>
            <CardTitle className="text-2xl">{t("sub.p4.name")}</CardTitle>
            <CardDescription className="text-md">{t("sub.p4.desc")}</CardDescription>
            <div className="text-4xl font-bold text-purple-400 mt-4">{t("sub.p4.price")}<span className="text-sm text-gray-400 font-normal"> / {t("sub.lifetime_auth")}</span></div>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-center font-bold text-purple-400">
                <span className="mr-2">▲</span> {t("sub.p4.f1")}
              </div>
              
              <div>
                <div className="flex items-center font-bold text-purple-400 mb-2">
                  <Star className="w-4 h-4 mr-2 fill-purple-400" /> {t("sub.p4.f2")}
                </div>
                <ul className="space-y-4 pl-6 border-l border-purple-500/30 ml-2">
                  <li className="relative before:content-[''] before:absolute before:w-3 before:h-[1px] before:bg-purple-500/50 before:-left-6 before:top-2">
                    <span className="text-white font-semibold flex items-center"><span className="mr-1">🤖</span> {t("sub.p4.t1")}</span>
                    <ul className="text-xs text-gray-400 mt-2 space-y-1 list-disc pl-4">
                      <li>{t("sub.p4.t1_1")}</li>
                      <li>{t("sub.p4.t1_2")}</li>
                      <li>{t("sub.p4.t1_3")}</li>
                      <li>{t("sub.p4.t1_4")}</li>
                    </ul>
                  </li>
                  <li className="relative before:content-[''] before:absolute before:w-3 before:h-[1px] before:bg-purple-500/50 before:-left-6 before:top-2">
                    <span className="text-white font-semibold flex items-center"><span className="mr-1">🧠</span> {t("sub.p4.t2")}</span>
                    <ul className="text-xs text-gray-400 mt-2 space-y-1 list-disc pl-4">
                      <li>{t("sub.p4.t2_1")}</li>
                      <li>{t("sub.p4.t2_2")}</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <ul className="space-y-2 pt-2">
                <li className="flex items-start"><span className="mr-2">👤</span> {t("sub.p4.f3")}</li>
                <li className="flex items-start"><span className="mr-2">🛠️</span> {t("sub.p4.f4")}</li>
                <li className="flex items-start"><span className="mr-2">📊</span> {t("sub.p4.f5")}</li>
                <li className="flex items-start"><span className="mr-2">🔬</span> {t("sub.p4.f6")}</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="mt-auto pt-6">
            <Button variant="outline" onClick={handleSubscribe} className="w-full text-md py-6 border-white/20 text-white hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-colors">{t("sub.buy_now")}</Button>
          </CardFooter>
        </Card>

      </div>
    </div>
  );
}
