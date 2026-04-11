"use client";

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap, Shield, Crown, ArrowRight, Heart, Target } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function SubscribePage() {
  const { t } = useLanguage();
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-50 selection:bg-[#00ff88]/30 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          选择适合您的社区订阅计划
        </h1>
        <div className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto space-y-2">
          <p>为了更好地维护交易社区，感谢您的订阅与支持。</p>
          <p className="text-base md:text-lg">我们通过会员订阅持续维护课程、工具、策略研究与社区服务</p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-stretch">
        {/* Free Plan */}
        <div className="relative group flex flex-col p-8 rounded-3xl bg-[#111111] border border-white/10 hover:border-[#00ff88]/30 transition-all duration-300 h-full">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5 text-gray-400" />
              免费订阅
            </h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">¥0</span>
              <span className="text-gray-500">/ 免费加入</span>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <p className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gray-400" /> 你将获得：
              </p>
              <ul className="space-y-3">
                {["基础公开教育课程", "社区公告与学习更新通知", "新手量化研究认知内容", "部分历史案例教学分享", "社区基础交流权限"].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                    <span className="leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <p className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-gray-400" /> 适合人群：
              </p>
              <ul className="space-y-3">
                {["想先了解社区教育内容", "暂时不需要深度研究资源的人"].map((audience, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-600 shrink-0 mt-1.5" />
                    <span className="leading-snug">{audience}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link href="/register" className="w-full mt-auto">
            <Button className="w-full bg-[#1a1a1a] hover:bg-[#222222] text-white border border-white/10 h-12 rounded-xl transition-all">
              免费加入
            </Button>
          </Link>
        </div>

        {/* Basic Plan */}
        <div className="relative group flex flex-col p-8 rounded-3xl bg-[#111111] border border-white/10 hover:border-[#00ff88]/50 transition-all duration-300 shadow-xl h-full">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#00ff88]" />
              基础订阅 | 36个月
            </h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-400">¥</span>
              <span className="text-4xl font-extrabold text-white">2,980</span>
              <span className="text-gray-500">/ 一次性开通</span>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <p className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00ff88]" /> 你将获得：
              </p>
              <ul className="space-y-3">
                {[
                  "包含免费会员全部权益", 
                  "完整基础教育课程体系", 
                  "交易系统框架构建与学习路径（教育案例）", 
                  "手动交易策略框架与历史案例教学", 
                  "常用量化研究工具使用权限", 
                  "社区答疑权限", 
                  "工具更新通知与使用指导", 
                  "社区交流与长期学习陪伴"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-[#00ff88] shrink-0 mt-0.5" />
                    <span className="leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <p className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-[#00ff88]" /> 适合人群：
              </p>
              <ul className="space-y-3">
                {[
                  "想优化和完善交易系统", 
                  "从基础学习转向系统化研究", 
                  "需要课程、工具与社区陪伴共同成长的人"
                ].map((audience, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88]/60 shrink-0 mt-1.5" />
                    <span className="leading-snug">{audience}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link href="/contact" className="w-full mt-auto">
            <Button 
              className="w-full bg-[#1a1a1a] hover:bg-[#00ff88] hover:text-black text-white border border-white/10 hover:border-[#00ff88] h-12 rounded-xl transition-all"
            >
              联系社区助理 <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Advanced Plan */}
        <div className="relative group flex flex-col p-8 rounded-3xl bg-gradient-to-b from-[#00ff88]/5 to-[#111111] border border-[#00ff88]/30 transition-all duration-300 shadow-[0_0_30px_rgba(0,255,136,0.1)] transform md:-translate-y-4 h-[calc(100%+1rem)]">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#00ff88] rounded-full text-black text-xs font-bold uppercase tracking-wider whitespace-nowrap">
            最具价值推荐
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#00ff88] mb-2 flex items-center gap-2">
              <Crown className="w-5 h-5" />
              高级订阅 | 36个月
            </h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[#00ff88]/80">¥</span>
              <span className="text-4xl font-extrabold text-white">5,980</span>
              <span className="text-gray-500">/ 一次性开通</span>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <p className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00ff88]" /> 你将获得：
              </p>
              <ul className="space-y-3">
                {[
                  "包含基础订阅全部权益",
                  "高级量化策略研究内容（量化代码，策略教学）",
                  "量化辅助工具使用权限（含 AI 分析框架教育版）",
                  "深度历史复盘与专题教学直播",
                  "优先答疑支持",
                  "新AI量化工具内测资格",
                  "特定活动优先参与与资源",
                  "交易系统优化方向的教育建议"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-200">
                    <div className="mt-0.5 bg-[#00ff88]/20 rounded-full p-0.5">
                      <Check className="w-3 h-3 text-[#00ff88] shrink-0" />
                    </div>
                    <span className="leading-snug font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <p className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-[#00ff88]" /> 适合人群：
              </p>
              <ul className="space-y-3">
                {[
                  "已具备一定研究经验的学习者",
                  "希望提升研究效率与执行力的朋友",
                  "想在手动分析基础上引入量化辅助工具的人",
                  "需要更深度研究资源与优先支持的人"
                ].map((audience, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] shrink-0 mt-1.5" />
                    <span className="leading-snug">{audience}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link href="/contact" className="w-full mt-auto">
            <Button 
              className="w-full bg-[#00ff88] hover:bg-[#00cc6a] text-black font-bold h-12 rounded-xl shadow-[0_0_20px_rgba(0,255,136,0.2)] transition-all hover:scale-[1.02]"
            >
              联系社区助理 <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Why 3 Years Section */}
      <div className="max-w-4xl mx-auto mb-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00ff88]/5 via-transparent to-[#00ff88]/5 rounded-3xl blur-xl" />
        <div className="relative p-8 md:p-12 rounded-3xl bg-[#111111] border border-white/10 backdrop-blur-md">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="bg-[#1a1a1a] p-2 rounded-lg border border-white/10">⏳</span> 
            为什么是三年？
          </h2>
          <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
            <p>
              根据我们社区的观察：
            </p>
            <ul className="space-y-4 pl-4">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#00ff88] shrink-0 mt-2" />
                <span>多数成员在 <strong className="text-white font-semibold">第 1 年</strong> 完成量化认知的重建和分析系统搭建</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#00ff88] shrink-0 mt-2" />
                <span><strong className="text-white font-semibold">第 2 年</strong> 进入策略模型的反复回测和数据修正阶段</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#00ff88] shrink-0 mt-2" />
                <span><strong className="text-white font-semibold">第 3 年</strong> 模型趋于稳定，开始产出具有统计学正期望的回测结果</span>
              </li>
            </ul>
            <div className="pt-8 border-t border-white/10 mt-8">
              <p className="text-[#00ff88] font-medium text-xl text-center">
                三年，是一个研究员从"学习数据建模"到"构建成熟量化逻辑"最现实的时间跨度。
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Disclaimer */}
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-800/50 pt-8">
          本订阅计划内所有课程、工具、策略及案例仅供量化研究与交易教育学习使用，不构成任何投资建议或交易指导。实际市场结果因人而异，请自行承担全部风险。
        </p>
      </div>

    </div>
  );
}
