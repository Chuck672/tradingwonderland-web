"use client";

import { useLanguage } from "@/components/language-provider";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export default function TermsPage() {
  const { language } = useLanguage();
  const isZh = language === "zh";

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <Link href="/" className="inline-flex items-center text-gray-400 hover:text-[#00ff88] transition-colors mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        {isZh ? "返回首页" : "Back to Home"}
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {isZh ? "服务条款" : "Terms of Service"}
          </h1>
          <p className="text-gray-400">
            {isZh ? "最后更新时间：2026年4月2日" : "Last Updated: April 2, 2026"}
          </p>
        </div>

        <div className="prose prose-invert max-w-none pt-8 border-t border-white/10 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-[#00ff88]">
              {isZh ? "1. 仅限教育与研究目的" : "1. Educational and Research Purpose Only"}
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm">
              {isZh ? 
                "量化逻辑实验室（QuantLogicLab，以下简称“我们”或“本平台”）提供量化分析工具、数据建模文档、算法逻辑脚本（如MQL5源码）及相关教育材料。所有内容严格仅供学术研究、软件开发教育及量化回测使用。" : 
                "QuantLogicLab (hereinafter referred to as \"we\", \"our\", or \"the Platform\") provides quantitative analysis tools, data modeling documentation, algorithmic logic scripts (such as MQL5 source code), and related educational materials. All content is strictly for academic research, software development education, and quantitative backtesting purposes."
              }
            </p>
            <p className="text-gray-300 leading-relaxed text-sm font-bold mt-2">
              {isZh ? 
                "我们不提供任何财务、投资或交易建议。我们不提供交易信号。我们不管理或代理客户资金。" : 
                "WE DO NOT PROVIDE FINANCIAL, INVESTMENT, OR TRADING ADVICE. WE DO NOT OFFER TRADING SIGNALS. WE DO NOT MANAGE OR HANDLE CLIENT FUNDS."
              }
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00ff88]">
              {isZh ? "2. 不保证盈利" : "2. No Guarantee of Profitability"}
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm">
              {isZh ? 
                "本平台上讨论的任何绩效指标、回测结果或统计期望值均为历史或假设数据，不保证未来表现。市场条件不断变化，算法模型在实盘环境中可能失效或产生意外结果。用户必须认识到量化建模本质上具有极高的风险。" : 
                "Any performance metrics, backtesting results, or statistical expectancies discussed on this platform are historical or hypothetical and do not guarantee future performance. Market conditions change continuously, and algorithmic models may fail or produce unexpected results in live environments. Users must acknowledge that quantitative modeling inherently involves substantial risk."
              }
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00ff88]">
              {isZh ? "3. 用户责任" : "3. User Responsibility"}
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm">
              {isZh ? 
                "如果您选择在实盘环境中应用 QuantLogicLab 提供的任何概念、算法或代码，您需完全自行承担风险。您全权负责在部署前对任何代码或逻辑进行彻底测试。因使用我们的教育材料或软件工具而导致的任何财务损失、数据损坏或软件错误，我们概不负责。" : 
                "If you choose to apply any concepts, algorithms, or code provided by QuantLogicLab in a live market environment, you do so entirely at your own risk. You are solely responsible for thoroughly testing any code or logic before deployment. We accept no liability for any financial losses, data corruption, or software errors resulting from the use of our educational materials or software tools."
              }
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00ff88]">
              {isZh ? "4. 知识产权" : "4. Intellectual Property"}
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm">
              {isZh ? 
                "本平台提供的所有专有算法、源代码、指标及教育文档均为 QuantLogicLab 的知识产权。这些内容仅在有限的、非排他性的、不可转让的许可下提供，仅供个人、教育或内部研究使用。未经事先书面同意，严禁对我们的材料进行二次分发、转售或商业开发。" : 
                "All proprietary algorithms, source codes, indicators, and educational documentation provided on this platform are the intellectual property of QuantLogicLab. They are provided under a limited, non-exclusive, non-transferable license for personal, educational, or internal research use only. Redistribution, resale, or commercial exploitation of our materials is strictly prohibited without prior written consent."
              }
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00ff88]">
              {isZh ? "5. 退款政策" : "5. Refund Policy"}
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm">
              {isZh ? 
                "由于我们的软件工具和教育文档具有数字化特性，所有销售一般被视为最终销售。退款仅在我们自行决定或适用消费者保护法要求的情况下发放。请在购买前确保我们的技术规格符合您的要求。" : 
                "Due to the digital nature of our software tools and educational documentation, all sales are generally considered final. Refunds are only issued at our sole discretion or as required by applicable consumer protection laws. Please ensure that our technical specifications meet your requirements before purchasing."
              }
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#00ff88]">
              {isZh ? "6. 条款修改" : "6. Modifications to Terms"}
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm">
              {isZh ? 
                "我们保留随时修改本服务条款的权利。任何更改在发布到此页面后立即生效。您在任何此类更改后继续使用本平台即表示您接受新条款。" : 
                "We reserve the right to modify these Terms of Service at any time. Any changes will be effective immediately upon posting to this page. Your continued use of the Platform after any such changes constitutes your acceptance of the new Terms."
              }
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}