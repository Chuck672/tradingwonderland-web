"use client";

import { useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap, Shield, Crown, ArrowRight, Heart, Target } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Currency = "CNY" | "USD" | "HKD";

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  HKD: "HK$",
  CNY: "¥",
  USD: "$",
};

const BASIC_PRICES: Record<Currency, number> = {
  HKD: 3380,
  CNY: 2980,
  USD: 449,
};

const ADVANCED_PRICES: Record<Currency, number> = {
  HKD: 6880,
  CNY: 5980,
  USD: 899,
};

export default function SubscribePage() {
  const { t } = useLanguage();
  const { data: session, status } = useSession();
  const router = useRouter();

  const [currency, setCurrency] = useState<Currency>("CNY");
  const [donationAmount, setDonationAmount] = useState<number>(1000);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (planId: string, amount?: number) => {
    if (status === "unauthenticated" || !session) {
      alert("请先登录 / Please login first");
      router.push("/login");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = planId === "donation" ? { planId, amount, currency } : { planId, currency };
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401) {
          alert("请先登录 / Please login first");
          window.location.href = "/login";
          return;
        }
        throw new Error(data.message || data.error || "Failed to create checkout session");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error:", error);
      alert("支付初始化失败，请稍后重试。");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-[#00bfa5]/30 py-16 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00bfa5]/10 text-[#00bfa5] text-sm font-medium mb-4 border border-[#00bfa5]/20">
          <Sparkles className="w-4 h-4" />
          <span>全新升级：绿洲交易社区</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
          选择适合您的社区订阅计划
        </h1>
        <div className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto space-y-2">
          <p>为了更好地维护交易社区，感谢您的订阅与支持。</p>
          <p className="text-base md:text-lg">我们通过会员订阅持续维护课程、工具、策略研究与社区服务</p>
        </div>

        {/* Currency Switcher */}
        <div className="flex justify-center mt-8">
          <div className="inline-flex bg-slate-900/50 p-1 rounded-lg border border-slate-800 backdrop-blur-sm">
            {(["CNY", "HKD", "USD"] as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  currency === c
                    ? "bg-[#00bfa5] text-slate-950 shadow-[0_0_15px_rgba(0,191,165,0.4)]"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24 items-stretch">
        {/* Free Plan */}
        <div className="relative group flex flex-col p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-all duration-300 backdrop-blur-sm h-full">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5 text-slate-400" />
              免费订阅
            </h3>
            <p className="text-slate-400 text-sm min-h-[40px]">适合刚加入社区，想先了解交易体系与社区氛围的朋友</p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">¥0</span>
              <span className="text-slate-500">/ 免费加入</span>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <p className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-slate-400" /> 你将获得：
              </p>
              <ul className="space-y-3">
                {["基础公开课程", "社区公告与更新通知", "新手交易认知内容", "部分案例分享", "社区基础交流权限"].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <span className="leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <p className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-slate-400" /> 适合人群：
              </p>
              <ul className="space-y-3">
                {["交易新手", "想先了解社区内容的人", "暂时不需要深度服务的人"].map((audience, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-600 shrink-0 mt-1.5" />
                    <span className="leading-snug">{audience}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link href="/register" className="w-full mt-auto">
            <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 h-12 rounded-xl transition-all">
              免费加入
            </Button>
          </Link>
        </div>

        {/* Basic Plan */}
        <div className="relative group flex flex-col p-8 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-[#00bfa5]/50 transition-all duration-300 backdrop-blur-sm shadow-xl h-full">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#00bfa5]" />
              基础订阅｜36个月
            </h3>
            <p className="text-slate-400 text-sm min-h-[40px]">适合希望系统学习、打磨交易系统，并建立稳定手动交易能力的成员</p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-2xl font-bold text-slate-400">{CURRENCY_SYMBOLS[currency]}</span>
              <span className="text-4xl font-extrabold text-white">{BASIC_PRICES[currency].toLocaleString()}</span>
              <span className="text-slate-500">/ 一次性开通</span>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <p className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00bfa5]" /> 你将获得：
              </p>
              <ul className="space-y-3">
                {[
                  "包含免费成员全部权益", 
                  "完整基础课程体系", 
                  "交易系统搭建与打磨路径", 
                  "手动交易策略框架与案例拆解", 
                  "常用交易工具使用权限", 
                  "每周市场观察 / 复盘内容", 
                  "社区答疑权限", 
                  "工具更新通知与使用指导", 
                  "社区交流与长期学习陪伴"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-[#00bfa5] shrink-0 mt-0.5" />
                    <span className="leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <p className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-[#00bfa5]" /> 适合人群：
              </p>
              <ul className="space-y-3">
                {[
                  "想建立完整交易框架的人", 
                  "想从混乱交易转向系统化交易的人", 
                  "以手动交易为主，希望提升稳定性的人", 
                  "需要课程、工具与社区陪伴共同支持的人"
                ].map((audience, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00bfa5]/60 shrink-0 mt-1.5" />
                    <span className="leading-snug">{audience}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Button 
            disabled={isSubmitting}
            onClick={() => handleSubscribe("basic")}
            className="w-full mt-auto bg-slate-800 hover:bg-[#00bfa5] hover:text-slate-950 text-white border border-slate-700 hover:border-[#00bfa5] h-12 rounded-xl transition-all"
          >
            开通订阅 <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Advanced Plan */}
        <div className="relative group flex flex-col p-8 rounded-3xl bg-gradient-to-b from-[#00bfa5]/10 to-slate-900/60 border border-[#00bfa5]/50 transition-all duration-300 backdrop-blur-sm shadow-[0_0_40px_rgba(0,191,165,0.15)] transform md:-translate-y-4 h-[calc(100%+1rem)]">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#00bfa5] to-emerald-400 rounded-full text-slate-950 text-xs font-bold uppercase tracking-wider whitespace-nowrap">
            最具价值推荐
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#00bfa5] mb-2 flex items-center gap-2">
              <Crown className="w-5 h-5" />
              高级订阅｜36个月
            </h3>
            <p className="text-slate-300 text-sm min-h-[40px]">适合希望在系统化交易基础上，进一步获得 EA 支持与更高效执行能力的交易者</p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[#00bfa5]/80">{CURRENCY_SYMBOLS[currency]}</span>
              <span className="text-4xl font-extrabold text-white">{ADVANCED_PRICES[currency].toLocaleString()}</span>
              <span className="text-slate-500">/ 一次性开通</span>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <p className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00bfa5]" /> 你将获得：
              </p>
              <ul className="space-y-3">
                {[
                  "包含基础会员全部权益",
                  "高级策略研究内容",
                  "EA 使用权限与配套指导",
                  "AI监测 / 自动化辅助工具权限",
                  "深度复盘与专题直播",
                  "优先答疑支持",
                  "小范围讨论组 / 核心群",
                  "新工具内测资格",
                  "特定活动优先参与资格",
                  "交易系统优化方向建议"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-200">
                    <div className="mt-0.5 bg-[#00bfa5]/20 rounded-full p-0.5">
                      <Check className="w-3 h-3 text-[#00bfa5] shrink-0" />
                    </div>
                    <span className="leading-snug font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <p className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-[#00bfa5]" /> 适合人群：
              </p>
              <ul className="space-y-3">
                {[
                  "已具备一定交易经验的人",
                  "希望提升执行效率的人",
                  "想在手动交易基础上引入 EA 辅助的人",
                  "需要更深度研究资源与优先支持的人"
                ].map((audience, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00bfa5] shrink-0 mt-1.5" />
                    <span className="leading-snug">{audience}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Button 
            disabled={isSubmitting}
            onClick={() => handleSubscribe("advanced")}
            className="w-full mt-auto bg-[#00bfa5] hover:bg-emerald-400 text-slate-950 font-bold h-12 rounded-xl shadow-[0_0_20px_rgba(0,191,165,0.4)] transition-all hover:scale-[1.02]"
          >
            开通订阅 <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Sponsorship */}
        <div className="relative group flex flex-col p-8 rounded-3xl bg-slate-900/40 border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 backdrop-blur-sm h-full">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-purple-400 mb-2 flex items-center gap-2">
              <Heart className="w-5 h-5" />
              社区赞助
            </h3>
            <p className="text-slate-400 text-sm min-h-[40px]">适合认可社区理念，愿意支持长期建设的朋友</p>
            <div className="mt-4">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">HK$</span>
                <input 
                  type="number" 
                  min="1000"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-white text-xl font-bold focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                />
              </div>
              <p className="text-xs text-slate-500 mt-2 text-right">最低支持 1000 HKD</p>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col gap-6">
            <div className="mb-6">
              <p className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" /> 您的支持将用于：
              </p>
              <ul className="space-y-3">
                {[
                  "社区内容更新",
                  "工具维护与优化",
                  "策略研究",
                  "成员答疑与服务完善",
                  "新功能开发与测试"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Button 
            disabled={isSubmitting || donationAmount < 1000}
            onClick={() => handleSubscribe("donation", donationAmount)}
            className="w-full mt-auto bg-slate-800 hover:bg-purple-600 text-white border border-slate-700 hover:border-purple-500 h-12 rounded-xl transition-all"
          >
            支持我们 <Heart className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Why 3 Years Section */}
      <div className="max-w-4xl mx-auto mb-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00bfa5]/10 via-transparent to-purple-500/10 rounded-3xl blur-xl" />
        <div className="relative p-8 md:p-12 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="bg-slate-800 p-2 rounded-lg">⏳</span> 
            为什么是三年？
          </h2>
          <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
            <p>
              根据我们社区的观察：
            </p>
            <ul className="space-y-4 pl-4">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#00bfa5] shrink-0 mt-2" />
                <span>多数成员在 <strong className="text-white font-semibold">第 1 年</strong> 完成交易认知的重建和系统搭建</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#00bfa5] shrink-0 mt-2" />
                <span><strong className="text-white font-semibold">第 2 年</strong> 进入反复验证和修正阶段，亏损逐步收窄</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#00bfa5] shrink-0 mt-2" />
                <span><strong className="text-white font-semibold">第 3 年</strong> 系统趋于稳定，开始产出可复制的交易结果</span>
              </li>
            </ul>
            <div className="pt-8 border-t border-slate-800/50 mt-8">
              <p className="text-[#00bfa5] font-medium text-xl text-center">
                三年，是一个交易者从"我想做交易"到"我能靠交易持续盈利"最现实的时间跨度。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
