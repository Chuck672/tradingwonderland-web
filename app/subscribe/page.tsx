"use client";

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap, Shield, Crown, ArrowRight, Target } from "lucide-react";
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
          工具授权与课程赠送
        </h1>
        <div className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto space-y-2">
          <p>一次购买，长期使用。我们专注做工具，课程作为赠送内容开放自学。</p>
          <p className="text-base md:text-lg">售后范围：仅安装/授权答疑，不提供交易建议或策略指导。</p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-stretch">
        {/* Free Plan */}
        <div className="relative group flex flex-col p-8 rounded-3xl bg-[#111111] border border-white/10 hover:border-[#00ff88]/30 transition-all duration-300 h-full">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5 text-gray-400" />
              免费账户
            </h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">¥0</span>
              <span className="text-gray-500">/ 注册即可</span>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <p className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gray-400" /> 你将获得：
              </p>
              <ul className="space-y-3">
                {["工具介绍与视频教程（公开部分）", "赠送课程的公开内容（自学）", "更新公告与重要通知", "隐私/条款等基础页面访问"].map((feature, i) => (
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
                {["先了解工具体系与适配性", "暂时不需要下载高级工具的人"].map((audience, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-600 shrink-0 mt-1.5" />
                    <span className="leading-snug">{audience}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {session ? (
            <Link href="/dashboard" className="w-full mt-auto">
              <Button className="w-full bg-[#1a1a1a] hover:bg-[#222222] text-white border border-white/10 h-12 rounded-xl transition-all">
                前往个人中心
              </Button>
            </Link>
          ) : (
            <Link href="/register" className="w-full mt-auto">
              <Button className="w-full bg-[#1a1a1a] hover:bg-[#222222] text-white border border-white/10 h-12 rounded-xl transition-all">
                免费注册
              </Button>
            </Link>
          )}
        </div>

        {/* Basic Pack */}
        <div className="relative group flex flex-col p-8 rounded-3xl bg-[#111111] border border-white/10 hover:border-[#00ff88]/50 transition-all duration-300 shadow-xl h-full">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#00ff88]" />
              基础包 | MT5 指标全套
            </h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-400">¥</span>
              <span className="text-4xl font-extrabold text-white">1,280</span>
              <span className="text-gray-500">/ 一次性买断</span>
            </div>
            <div className="mt-3 text-sm text-gray-500">
              永久使用 · 永久更新 · 赠送课程（自学）
            </div>
          </div>
          
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <p className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00ff88]" /> 你将获得：
              </p>
              <ul className="space-y-3">
                {[
                  "解锁全部 MT5 指标下载权限（6 款）",
                  "永久更新：版本发布后可持续下载最新版本",
                  "赠送课程：录播/文档资源（自学）",
                  "安装与授权答疑（不含策略/交易建议）"
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
                  "希望快速获得 MT5 指标工具箱的人",
                  "倾向自学，不需要长期社群运营服务的人",
                  "希望用工具辅助复盘与研究的人"
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
              联系购买（获取激活码） <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Bundle */}
        <div className="relative group flex flex-col p-8 rounded-3xl bg-gradient-to-b from-[#00ff88]/5 to-[#111111] border border-[#00ff88]/30 transition-all duration-300 shadow-[0_0_30px_rgba(0,255,136,0.1)] transform md:-translate-y-4 h-[calc(100%+1rem)]">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#00ff88] rounded-full text-black text-xs font-bold uppercase tracking-wider whitespace-nowrap">
            最具价值推荐
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#00ff88] mb-2 flex items-center gap-2">
              <Crown className="w-5 h-5" />
              全家桶 | 工具全套
            </h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[#00ff88]/80">¥</span>
              <span className="text-4xl font-extrabold text-white">2,980</span>
              <span className="text-gray-500">/ 一次性买断</span>
            </div>
            <div className="mt-3 text-sm text-gray-400">
              awesomeChart + awesomeTradingAgent + 全部 MT5 指标 · 永久使用 · 永久更新
            </div>
          </div>
          
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <p className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00ff88]" /> 你将获得：
              </p>
              <ul className="space-y-3">
                {[
                  "包含基础包全部权益（全部 MT5 指标）",
                  "awesomeChart：高频更新的图表工具",
                  "awesomeTradingAgent：自动化工具（大体积交付）",
                  "永久更新：持续获得新版本下载权限",
                  "赠送课程：录播/文档资源（自学）",
                  "安装与授权答疑（不含策略/交易建议）"
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
                  "希望一次性拿到完整工具链的人",
                  "需要高频更新的图表工具与自动化工具的人",
                  "倾向自学，只需要安装/授权支持的人"
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
              联系购买（获取激活码） <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mb-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00ff88]/5 via-transparent to-[#00ff88]/5 rounded-3xl blur-xl" />
        <div className="relative p-8 md:p-10 rounded-3xl bg-[#111111] border border-white/10 backdrop-blur-md">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4">交付方式</h2>
          <div className="text-gray-300 leading-relaxed space-y-3">
            <p>购买后将通过激活码为账号开通权限。</p>
            <p>开通后前往个人中心下载工具并查看使用说明与课程赠送内容。</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {session ? (
              <Link href="/dashboard">
                <Button className="bg-[#00ff88] text-black hover:bg-[#00cc6a]">
                  前往个人中心
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button className="bg-[#00ff88] text-black hover:bg-[#00cc6a]">
                  登录后查看个人中心
                </Button>
              </Link>
            )}
            <Link href="/tools">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                查看工具列表
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {/* Disclaimer */}
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-800/50 pt-8">
          本页面所述工具与课程仅供学习研究与教育用途，不构成任何投资建议或交易信号。您应自行承担使用相关软件与策略所带来的全部风险。
        </p>
      </div>

    </div>
  );
}
