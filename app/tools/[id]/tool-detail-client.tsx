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
      case "SVP5_pro": return t("tools.t1.title");
      case "inRangeVolumeProfile": return t("tools.t2.title");
      case "scalpTradingPanel": return t("tools.t3.title");
      case "strengthBubble_pro": return t("tools.t4.title");
      case "Trend_Panel9_pro": return t("tools.t5.title");
      case "XAUUSD_monitor": return t("tools.t6.title");
      default: return toolId;
    }
  };

  const getToolDesc = () => {
    switch (toolId) {
      case "SVP5_pro": return t("tools.t1.desc");
      case "inRangeVolumeProfile": return t("tools.t2.desc");
      case "scalpTradingPanel": return t("tools.t3.desc");
      case "strengthBubble_pro": return t("tools.t4.desc");
      case "Trend_Panel9_pro": return t("tools.t5.desc");
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

        {toolId === "SVP5_pro" ? (
          <div className="w-full aspect-video bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden relative">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/D7K-GS08alg"
              title="SVP5 Pro"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        ) : toolId === "Trend_Panel9_pro" ? (
          <div className="w-full aspect-video bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden relative">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/volyrCCkvfU"
              title="Trend Panel 9 Pro"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        ) : toolId === "scalpTradingPanel" ? (
          <div className="w-full aspect-video bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden relative">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/Bj2MYyOGTT8"
              title="Scalp Trading Panel"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        )  : (
          <div className="w-full aspect-video bg-[#0a0a0a] border border-white/10 rounded-2xl flex flex-col items-center justify-center text-gray-500 overflow-hidden relative group cursor-pointer hover:border-[#00ff88]/50 transition-colors">
            <PlayCircle className="w-16 h-16 mb-4 group-hover:text-[#00ff88] transition-colors" />
            <p className="text-lg">{t("tools.detail.video_tutorial")}</p>
            <p className="text-sm mt-2 opacity-60">(YouTube / Bilibili)</p>
          </div>
        )}

        {toolId === "SVP5_pro" ? (
          <div className="prose prose-invert max-w-none pt-8 border-t border-white/10">
            <h2 className="text-2xl">产品简介：Session Volume Profile v5 (SVP5)</h2>
            <h3 className="text-xl mt-6">1. 核心理念：洞悉“新老资金”的博弈</h3>
            <p>在市场中，价格的涨跌本质上是资金的博弈，是“老钱”与“新钱”之间的置换：</p>
            <ul>
              <li>老钱（存量资金）：过去已经成交的资金，构成了市场中坚实的支撑与阻力。</li>
              <li>新钱（增量资金）：当前入场、推动市场趋势发展的资金。</li>
            </ul>
            <p>SVP5 基于 MT5，帮助交易者识别这两股力量的消长与动向。通过高成交量区域（HVN/共识区）的识别，将隐藏在 K 线背后的资金轨迹可视化。</p>
            <h3 className="text-xl mt-6">2. 核心功能与特色</h3>
            <ul>
              <li>专为 MT5 打造：纯 MT5 环境运行，数据处理高效。</li>
              <li>智能时区管理：自动计算并调整经纪商服务器时间与 UTC 差值，自动适配冬令时与夏令时。</li>
              <li>多维度时间段覆盖：支持自定义亚洲盘、欧美盘，并独立支持悉尼盘，用于捕捉周初流动性注入与开盘缺口。</li>
            </ul>
            <p>提示：首次加载时建议开启 经纪商GMT时间 进行校准，确认无误后即可关闭。</p>
            <h3 className="text-xl mt-6">3. 视觉元素与实战解读</h3>
            <p>SVP5 将一个时段均分为三个阶段，并通过三色柱状图呈现不同时间段的资金动向（颜色可自定义）。</p>
            <ul>
              <li>时段前 1/3：早盘/早期。若极宽，说明开盘即爆发，机构急于建仓或抢筹。</li>
              <li>时段中 1/3：中盘/交接。若放量，说明多空分歧激烈。</li>
              <li>时段后 1/3：尾盘/收尾。若放量加宽，提示尾盘有大资金平仓或偷袭。</li>
            </ul>
            <h3 className="text-xl mt-6">关键价格线</h3>
            <ul>
              <li>POC（黄色实线）：该时段成交量最大的价格，常作为核心支撑/阻力与高胜率入场点。</li>
              <li>VA（橙色虚线，VAH/VAL）：包含 70% 核心成交量的价值区，边界突破常伴随趋势加速或假突破。</li>
            </ul>
            <h3 className="text-xl mt-6">4. 关键参数设置指南</h3>
            <ul>
              <li>uniqueID：同图叠加多个 SVP 时修改以防冲突（如 SVP5_Short、SVP5_Long）。</li>
              <li>tf0：建议 M1 或 M5 获取更细成交量分布，性能有限可用 M15。</li>
              <li>DaysToCalculate：历史数据计算天数，支持 1–30 天。</li>
              <li>ProfileTransparency：建议 40–60，确保清晰不遮挡 K 线；MaxProfileWidthPercent 控制剖面图最大宽度。</li>
            </ul>
            <h3 className="text-xl mt-6">5. 常见问题（FAQ）</h3>
            <p>Q1: 切换周期后指标消失？</p>
            <p>A: 内置修复机制，通常 1–2 秒或下个 Tick 自动恢复；若未恢复，刷新图表。</p>
            <p>Q2: 时段与本地时间对不上？</p>
            <p>A: 以经纪商服务器时间为准，核对右上角 Broker GMT 信息。</p>
            <p>Q3: 悉尼时段为何每周只显示一天？</p>
            <p>A: 定义为周日 21:00 至周一 00:00，用于观察周末休盘后的第一波资金动向，只在周一图表上显示。</p>
            <div className="mt-10 flex gap-4">
              <Link href="/dashboard">
                <Button className="bg-[#00ff88] text-black hover:bg-[#00cc6a] px-8">
                  前往个人中心下载
                </Button>
              </Link>
            </div>
          </div>
        ) : toolId === "Trend_Panel9_pro" ? (
          <div className="prose prose-invert max-w-none pt-8 border-t border-white/10">
            <h2 className="text-2xl">趋势面板 — 8因子共振系统 | 专为剥头皮与日内短线交易者设计</h2>
            <p>基于Session的8因子趋势共振面板，整合POC、VWAP+斜率、SMC流动性扫描、EMA、吞没形态、Delta背离、RSI与ATR，为剥头皮和日内交易提供方向参考。</p>
            <p>这不是信号指标，不会产生买卖信号。面板用于方向偏向评估，入场决策应基于价格行为与个人方法论。</p>
            <p>注意：看到满足5/8条件，不能机械下单，需等待价格行为信号。</p>
            <h3 className="text-xl mt-6">为什么需要这个指标？</h3>
            <p>传统EMA交叉滞后、无法识别主力位置、判断过于单一。趋势面板整合8个独立因子，横跨成交量分布、VWAP动态、聪明钱概念、价格行为形态、订单流与传统指标，提供多维度评估。</p>
            <p>引入了价格行为的吞没形态与SMC获取流动性，订单流中的Delta背离，Volume Profile的POC等作为因子。</p>
            <h3 className="text-xl mt-6">8个因子详解</h3>
            <h4>1. POC（控制点）</h4>
            <p>动态跟踪当前时段的Volume Profile POC，识别主力位置变化，根据时段成熟度在本时段与前一时段切换。</p>
            <h4>2. VWAP + 斜率过滤</h4>
            <p>结合斜率与ATR进行判断，避免与POC冗余，含亚盘过度延伸保护。</p>
            <h4>3. SMC 获取流动性</h4>
            <p>在M5抓取突破摆动高/低后回收的事件，单纯突破不回收不触发，识别机构扫描止损特征。</p>
            <h4>4. EMA</h4>
            <p>对比价格与EMA位置及斜率，在多因子框架中作为基线共识因子。</p>
            <h4>5. 吞没形态</h4>
            <p>在M1和M5同时检测看涨/看跌吞没，严格过滤：实体包裹、实体/振幅比阈值、吞没实体需不小于前K实体。</p>
            <h4>6. Delta背离</h4>
            <p>基于逐笔数据分析K线方向与Delta背离，为反转提供早期预警。</p>
            <h4>7. RSI</h4>
            <p>作为区域过滤：50–70看多，30–50看空，其余不考虑。</p>
            <h4>8. ATR</h4>
            <p>波动率过滤，确保存在剥头皮机会；自动归一化不同报价精度，默认阈值500点可调。</p>
            <h3 className="text-xl mt-6">评分系统</h3>
            <ul>
              <li>5/8及以上UP因子：上升趋势（绿）</li>
              <li>5/8及以上DOWN因子：下降趋势（红）</li>
              <li>双方均≥5：冲突（橙）</li>
              <li>双方均&lt;5：等待（黄）</li>
            </ul>
            <p>最低信号阈值可配置，默认5/8。</p>
            <h3 className="text-xl mt-6">创建目的</h3>
            <p>为新手提供方向参考；避免锚定效应；提升交易一致性；在持仓中提供反转提醒。</p>
            <h3 className="text-xl mt-6">最佳使用场景</h3>
            <p>在共识区成熟后效果最佳：形成过程信号较弱，成熟后更可靠；价格从共识区突破迁移为最佳窗口。流程：配合Volume Profile确定共识区→价格迁移开始→趋势面板确认方向→用价格行为/订单流寻找入场。</p>
            <h3 className="text-xl mt-6">关键参数</h3>
            <ul>
              <li>InpTF：分析周期，默认M5</li>
              <li>InpMinSignals：趋势确认最低因子数，默认5</li>
              <li>InpEMA_Period：EMA周期，默认20</li>
              <li>InpRSI_Period：RSI周期，默认14</li>
              <li>InpATR_Period：ATR周期，默认14</li>
              <li>InpATR_MinPoint：最低ATR阈值，默认500点</li>
              <li>InpVWAPSlopeBars：VWAP斜率窗口，默认3</li>
              <li>InpEngulfTF1/TF2：吞没周期，默认M1+M5</li>
              <li>InpEngulfBodyPct：吞没最小实体/振幅比，默认0.40</li>
              <li>InpSwingDepth：SMC摆动深度，默认5</li>
              <li>InpDeltaLookback：Delta背离回溯，默认5</li>
              <li>Session times：可配置亚洲/欧洲/美国时段边界</li>
              <li>InpMatureMinutes：时段成熟度阈值，默认15分钟</li>
            </ul>
            <h3 className="text-xl mt-6">系统要求</h3>
            <ul>
              <li>仅支持 MetaTrader 5</li>
              <li>Delta背离需 Tick 数据</li>
              <li>推荐用于成交量充足的品种</li>
              <li>可在任何图表周期加载</li>
            </ul>
            <div className="mt-10 flex gap-4">
              <Link href="/dashboard">
                <Button className="bg-[#00ff88] text-black hover:bg-[#00cc6a] px-8">
                  前往个人中心下载
                </Button>
              </Link>
            </div>
          </div>
        ) : toolId === "scalpTradingPanel" ? (
          <div className="prose prose-invert max-w-none pt-8 border-t border-white/10">
            <h2 className="text-2xl">Scalp Trading Panel (EA) — MT5 快捷交易面板</h2>
            <p>专为剥头皮与日内短线交易者打造的一站式执行工具。</p>
            <h3 className="text-xl mt-6">它是什么</h3>
            <p>Scalp Trading Panel 是一款运行在 MT5 上的 EA 交易面板，将下单、仓位管理、风险计算和可视化交易规划整合在一个紧凑的图表面板中。</p>
            <p>它不是信号指标，不提供买卖方向判断。解决的是：当你决定要做一笔交易时，如何又快又准地执行，并在持仓过程中高效管理仓位。</p>
            <h3 className="text-xl mt-6">核心功能</h3>
            <h4>快速开仓</h4>
            <p>一键 BUY / SELL 市价单，自动挂载预设止损与止盈。面板内置手数调节器，支持加减微调与手动输入。</p>
            <h4>可视化交易计划</h4>
            <ul>
              <li>PB / PS：一键生成做多或做空的可视化计划</li>
              <li>图表显示入场、止损区（蓝色）、止盈区（绿色），标签展示价格、距离、风险金额、仓位大小、盈亏比</li>
              <li>拖拽调整 TP / SL / Entry，实时重新计算</li>
              <li>EX：确认计划后一键市价执行</li>
            </ul>
            <p>仓位大小根据设定的最大单笔风险金额与止损距离自动计算，确保风险可控。</p>
            <h4>一键仓位管理</h4>
            <ul>
              <li>CH：平掉 50% 仓位，锁定利润</li>
              <li>BE：止损移至开仓价，保本</li>
              <li>C80：平掉 80% 仓位，留小仓博延伸</li>
              <li>CA：全部平仓</li>
            </ul>
            <h4>当日盈亏监控</h4>
            <p>实时显示当天浮动盈亏与已平仓盈亏（含手续费与隔夜利息），帮助执行每日止损纪律。</p>
            <h3 className="text-xl mt-6">解决什么问题</h3>
            <ul>
              <li>操作延迟：将操作压缩至一次点击</li>
              <li>不算风险就下单：强制可视化风险、仓位与盈亏比</li>
              <li>持仓管理混乱：分批止盈、保本、全平均一键完成</li>
            </ul>
            <h3 className="text-xl mt-6">推荐使用方式</h3>
            <ul>
              <li>配合 Trend Panel 确定方向</li>
              <li>用 PB / PS 在图上规划计划</li>
              <li>确认仓位、风险、盈亏比后 EX 执行</li>
              <li>持仓过程中 CH → BE → C80 分批管理</li>
            </ul>
            <p>趋势面板定方向，交易面板做执行。</p>
            <h3 className="text-xl mt-6">参数说明</h3>
            <ul>
              <li>InpLotSize：快速开仓初始手数（默认 0.01）</li>
              <li>StopLoss：快速开仓默认止损 Points（默认 50）</li>
              <li>TakeProfit：快速开仓默认止盈 Points（默认 100）</li>
              <li>MaxRiskPerTradeUSD：交易计划最大单笔风险 USD（默认 100）</li>
              <li>DefaultSLPoints：交易计划默认止损距离 Points（默认 5000）</li>
              <li>DefaultRR：交易计划默认盈亏比（默认 2.0）</li>
            </ul>
            <p>平台：MT5 | 类型：EA | 当前版本：V10</p>
            <div className="mt-10 flex gap-4">
              <Link href="/dashboard">
                <Button className="bg-[#00ff88] text-black hover:bg-[#00cc6a] px-8">
                  前往个人中心下载
                </Button>
              </Link>
            </div>
          </div>
        ) : (
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
        )}
      </motion.div>
    </div>
  );
}
