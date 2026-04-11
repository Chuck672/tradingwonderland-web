"use client";

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlayCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export default function ToolDetailClient({ toolId }: { toolId: string }) {
  const { t } = useLanguage();

  // Find the tool title based on ID (simple mapping for now)
  const getToolTitle = () => {
    switch (toolId) {
      case "SVP5_pro": return t("tools.t1.title");
      case "inRangeVP": return t("tools.t2.title");
      case "scalpTradingPanel": return t("tools.t3.title");
      case "strengthBubble_pro": return t("tools.t4.title");
      case "Trend_Panel9_pro": return t("tools.t5.title");
      case "microOrderFlow": return t("tools.t6.title");
      default: return toolId;
    }
  };

  const getToolDesc = () => {
    switch (toolId) {
      case "SVP5_pro": return t("tools.t1.desc");
      case "inRangeVP": return t("tools.t2.desc");
      case "scalpTradingPanel": return t("tools.t3.desc");
      case "strengthBubble_pro": return t("tools.t4.desc");
      case "Trend_Panel9_pro": return t("tools.t5.desc");
      case "microOrderFlow": return t("tools.t6.desc");
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
        ) : toolId === "strengthBubble_pro" ? (
          <div className="w-full aspect-video bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden relative">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/AnKs4JMvIpI"
              title="Strength Bubble Pro"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        ) : toolId === "inRangeVP" ? (
          <div className="w-full aspect-video bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden relative">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/aHOAwhE2xf8"
              title="inRangeVP"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
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
        ) : toolId === "strengthBubble_pro" ? (
          <div className="prose prose-invert max-w-none pt-8 border-t border-white/10">
            <h2 className="text-2xl">DeltaVolumeBubble — 量能气泡指标</h2>
            <p className="text-lg text-gray-300">从订单流 Delta 中提炼的可视化工具，用「气泡大小 × 颜色」让你一眼读懂每根 K 线背后的多空真实博弈。</p>

            <h3 className="text-xl mt-8">🎯 这个指标解决什么问题？</h3>
            <p className="font-medium text-[#00ff88]">价格会骗人，但资金流向不会。</p>
            <p>传统K线只告诉你"价格去了哪里"，却不告诉你"谁在推动价格"。<br/>
            DeltaVolumeBubble 将订单流中的 Delta（主动买单 vs 主动卖单的净差值） 直接映射到每根K线上，用直观的气泡呈现：</p>
            <ul className="list-none pl-0 space-y-2 mt-4">
              <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span> <strong>绿色气泡</strong> = 主动买盘胜出（多头在发力）</li>
              <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span> <strong>红色气泡</strong> = 主动卖盘胜出（空头在砸盘）</li>
              <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full border-2 border-white/50 inline-block"></span> <strong>气泡越大</strong> = 多空搏杀越激烈，净胜出量越大</li>
            </ul>
            <p className="mt-4 italic text-gray-400">不再需要盯着密密麻麻的订单流数据表，一眼扫过去，资金在哪边，一目了然。</p>

            <h3 className="text-xl mt-8">🧩 两大核心组件，化繁为简</h3>
            <p>本指标摒弃了复杂冗余的显示，只保留两个最有决策价值的视觉组件：</p>

            <h4 className="text-lg text-[#00ff88] mt-6">组件一：量能气泡（Volume Bubble）</h4>
            <p>每根K线中央的气泡，是该K线内市价买单与市价卖单搏杀后的净胜出量可视化。</p>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full border-collapse border border-white/10 text-sm">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-4 py-2 text-left">应用场景</th>
                    <th className="border border-white/10 px-4 py-2 text-left">你能看到什么</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-4 py-2 font-medium">单K多空力量识别</td>
                    <td className="border border-white/10 px-4 py-2">绿色 = 买盘主导，红色 = 卖盘主导</td>
                  </tr>
                  <tr className="bg-white/5">
                    <td className="border border-white/10 px-4 py-2 font-medium">量能衰减判断</td>
                    <td className="border border-white/10 px-4 py-2">连续K线的气泡逐渐缩小 → 趋势动能正在枯竭</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-4 py-2 font-medium">努力 vs 结果识别</td>
                    <td className="border border-white/10 px-4 py-2">大气泡 + 小实体K线 → 大资金进场但价格没动 → 潜在反转信号</td>
                  </tr>
                  <tr className="bg-white/5">
                    <td className="border border-white/10 px-4 py-2 font-medium">真假突破辅助</td>
                    <td className="border border-white/10 px-4 py-2">突破K线的气泡颜色与方向是否一致？阳K负Delta / 阴K正Delta → 警惕流动性猎杀</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 className="text-lg text-[#00ff88] mt-6">组件二：背离三角（Divergence Triangle）</h4>
            <p>当出现 <strong>「阳K + 负Delta」</strong> 或 <strong>「阴K + 正Delta」</strong> 时，K线高低点旁会出现一个小三角标记。</p>
            <blockquote className="border-l-4 border-[#00ff88] pl-4 py-2 bg-white/5 my-4 text-gray-300">
              价格涨了，但其实是卖盘在主导；或者价格跌了，但其实是买盘在接货。——这就是量价背离，有一定概率为趋势即将反转的早期信号。
            </blockquote>

            <h3 className="text-xl mt-8">📐 适用场景</h3>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full border-collapse border border-white/10 text-sm">
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-4 py-3 font-medium min-w-[140px] text-[#00ff88]">左侧交易（逆势）</td>
                    <td className="border border-white/10 px-4 py-3">在关键支撑/阻力位，观察气泡是否出现量能衰减 + 背离三角 → 辅助判断反转概率，不再盲目接飞刀</td>
                  </tr>
                  <tr className="bg-white/5">
                    <td className="border border-white/10 px-4 py-3 font-medium text-[#00ff88]">右侧交易（顺势）</td>
                    <td className="border border-white/10 px-4 py-3">突破发生时，观察突破K线的气泡颜色与大小 → 确认是真突破还是流动性获取后的假突破</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-4 py-3 font-medium text-[#00ff88]">价格行为交易</td>
                    <td className="border border-white/10 px-4 py-3">作为裸K交易的额外确认层，在Pin Bar、吞没等形态出现时，用气泡验证背后是否有真实资金支撑</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-amber-400">💡 建议观察周期：15分钟 & 30分钟——在噪音与信息量之间取得最佳平衡。</p>

            <h3 className="text-xl mt-8">⚙️ 核心参数一览</h3>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full border-collapse border border-white/10 text-sm">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-4 py-2 text-left">参数</th>
                    <th className="border border-white/10 px-4 py-2 text-left">默认值</th>
                    <th className="border border-white/10 px-4 py-2 text-left">作用</th>
                    <th className="border border-white/10 px-4 py-2 text-left">调参建议</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-4 py-2 font-mono">MaxBars</td>
                    <td className="border border-white/10 px-4 py-2">100</td>
                    <td className="border border-white/10 px-4 py-2">最大回看K线数</td>
                    <td className="border border-white/10 px-4 py-2 text-gray-400">剥头皮/日内100根足够；最大建议≤500，避免Tick计算过载</td>
                  </tr>
                  <tr className="bg-white/5">
                    <td className="border border-white/10 px-4 py-2 font-mono">MinDeltaThreshold</td>
                    <td className="border border-white/10 px-4 py-2">0</td>
                    <td className="border border-white/10 px-4 py-2">气泡显示的最小Delta门槛</td>
                    <td className="border border-white/10 px-4 py-2 text-gray-400">不喜欢满屏气泡？调到50-100过滤噪音</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-4 py-2 font-mono">DivDeltaMin</td>
                    <td className="border border-white/10 px-4 py-2">10</td>
                    <td className="border border-white/10 px-4 py-2">背离三角的最小Delta过滤</td>
                    <td className="border border-white/10 px-4 py-2 text-gray-400">调到50+，只保留"主力级别"的量价背离</td>
                  </tr>
                  <tr className="bg-white/5">
                    <td className="border border-white/10 px-4 py-2 font-mono">SizeMult</td>
                    <td className="border border-white/10 px-4 py-2">2.5</td>
                    <td className="border border-white/10 px-4 py-2">气泡大小倍数</td>
                    <td className="border border-white/10 px-4 py-2 text-gray-400">4K屏可调大；小屏/密集K线调到1.5避免重叠</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-4 py-2 font-mono">Transparency</td>
                    <td className="border border-white/10 px-4 py-2">120</td>
                    <td className="border border-white/10 px-4 py-2">气泡透明度 (0-255)</td>
                    <td className="border border-white/10 px-4 py-2 text-gray-400">调低 = 更透明，确保不遮挡K线本身</td>
                  </tr>
                  <tr className="bg-white/5">
                    <td className="border border-white/10 px-4 py-2 font-mono">ShowDeltaValue</td>
                    <td className="border border-white/10 px-4 py-2">True</td>
                    <td className="border border-white/10 px-4 py-2">是否显示Delta数值</td>
                    <td className="border border-white/10 px-4 py-2 text-gray-400">极简主义者设为False，纯靠颜色+大小直觉判断</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-4 py-2 font-mono">TriangleOffset</td>
                    <td className="border border-white/10 px-4 py-2">-</td>
                    <td className="border border-white/10 px-4 py-2">背离三角与K线的间距</td>
                    <td className="border border-white/10 px-4 py-2 text-gray-400">觉得挤就调大</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl mt-8 text-rose-400 flex items-center gap-2"><AlertCircle className="w-5 h-5"/> ⚠️ 重要提醒</h3>
            <p className="font-medium text-white">这不是一个"出信号就无脑入场"的指标。</p>
            <p>不要看到单独一根K线出现大气泡就直接下单。它的价值在于——结合价格行为、市场结构、关键位置，为你的交易决策提供订单流维度的额外确认。</p>
            <p className="text-gray-400">建议不要与其他高计算量指标/EA共用同一图表窗口，以保证运行流畅。</p>

            <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl">
              <h3 className="text-xl font-bold text-[#00ff88] mb-2">总结</h3>
              <p className="text-lg">K线告诉你价格去了哪里，量能气泡告诉你——是谁在推。</p>
              <p className="mt-4 text-sm text-gray-400">本指标最佳运行场景为0点差账户或者固定点差账户， 即不会在新闻时段扩大点差的经纪商账户，推荐使用exness零点差账户。</p>
            </div>

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
            <h2 className="text-2xl">InRange Volume Profile — 自由定义分析区间的成交结构工具</h2>
            
            <h3 className="text-xl mt-8 text-[#00ff88]">一句话介绍</h3>
            <p className="text-lg font-medium text-white">框出你想看的任意区间，即时呈现成交结构。</p>
            <p>InRange Volume Profile 让你摆脱固定 Session 的限制，在任意时间范围内计算并绘制 Volume Profile，精准捕捉局部成交结构中的交易机会。</p>

            <h3 className="text-xl mt-8">为什么需要 InRange VP？</h3>
            <h4 className="text-lg text-[#00ff88] mt-6">比 Session VP 更灵活</h4>
            <p>Session Volume Profile 的计算区间是固定的——亚盘、欧盘、美盘，起点和终点预先定义，无法调整。<br/>
            InRange VP 的区间完全由你决定：</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>只看一个 Session 中的一小段行情</li>
              <li>将两个 Session 合并观察</li>
              <li>单独框出一段回撤结构</li>
              <li>只分析一段横盘震荡区间</li>
            </ul>
            <p className="italic text-gray-400 mt-2">不是让市场适配你的固定模板，而是你根据市场结构，自由定义分析区间。</p>

            <h4 className="text-lg text-[#00ff88] mt-6">覆盖更多交易场景</h4>
            <p>Session VP 擅长中大周期结构判断——识别价格迁移、震荡、流动性获取阶段。但现实市场中，真正流畅的趋势迁移并不多，回撤、盘整、微结构震荡往往占据一周的大半时间。<br/>
            InRange VP 专为这些"非标准趋势迁移"阶段设计，适合在 <strong>1 分钟、5 分钟</strong> 小周期上，观察局部价格区间内的成交结构。</p>

            <div className="overflow-x-auto mt-6">
              <table className="min-w-full border-collapse border border-white/10 text-sm">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-4 py-2 text-left w-1/4">对比维度</th>
                    <th className="border border-white/10 px-4 py-2 text-left">Session VP</th>
                    <th className="border border-white/10 px-4 py-2 text-left text-[#00ff88]">InRange VP</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-4 py-2 font-medium">区间</td>
                    <td className="border border-white/10 px-4 py-2">固定（按 Session 划分）</td>
                    <td className="border border-white/10 px-4 py-2 font-medium text-[#00ff88]">自由拖拽、动态定义</td>
                  </tr>
                  <tr className="bg-white/5">
                    <td className="border border-white/10 px-4 py-2 font-medium">适用周期</td>
                    <td className="border border-white/10 px-4 py-2">15 分钟、30 分钟及以上</td>
                    <td className="border border-white/10 px-4 py-2 font-medium text-[#00ff88]">1 分钟、5 分钟</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-4 py-2 font-medium">核心用途</td>
                    <td className="border border-white/10 px-4 py-2">大结构过滤与阶段判断</td>
                    <td className="border border-white/10 px-4 py-2 font-medium text-[#00ff88]">小结构执行与精确入场</td>
                  </tr>
                  <tr className="bg-white/5">
                    <td className="border border-white/10 px-4 py-2 font-medium">交易风格</td>
                    <td className="border border-white/10 px-4 py-2">趋势跟踪、波段</td>
                    <td className="border border-white/10 px-4 py-2 font-medium text-[#00ff88]">日内交易、剥头皮</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl mt-8 text-[#00ff88]">操作方式</h3>
            <p>三步完成：</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>将指标加载到图表，自动生成两条垂直线</li>
              <li>拖动两条线，框出你想分析的时间范围</li>
              <li>指标自动在该区间内计算并绘制 Volume Profile</li>
            </ol>
            <p className="font-medium mt-2">想看哪里，就框哪里。</p>

            <h3 className="text-xl mt-8">⚙️ 核心参数</h3>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full border-collapse border border-white/10 text-sm">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-4 py-2 text-left">参数</th>
                    <th className="border border-white/10 px-4 py-2 text-left">说明</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-4 py-2 font-mono">Calculation Timeframe</td>
                    <td className="border border-white/10 px-4 py-2">计算用的时间框架。当前图表为 1 分钟时，可指定用 5 分钟数据计算，获得更稳定的结构</td>
                  </tr>
                  <tr className="bg-white/5">
                    <td className="border border-white/10 px-4 py-2 font-mono">Precision</td>
                    <td className="border border-white/10 px-4 py-2">价格分层精度，数值越高结构越细腻，默认 200 即可满足大多数场景</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-4 py-2 font-mono">Applied Volume</td>
                    <td className="border border-white/10 px-4 py-2">选择 Tick Volume 或 Real Volume。有真实成交量数据的品种优先使用 Real Volume</td>
                  </tr>
                  <tr className="bg-white/5">
                    <td className="border border-white/10 px-4 py-2 font-mono">颜色与透明度</td>
                    <td className="border border-white/10 px-4 py-2">可分别自定义 Volume Bar、POC、HVN、LVN、起止线的颜色，以及整体透明度，避免遮挡 K 线</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl mt-8">📐 典型应用场景</h3>
            <h4 className="text-lg text-[#00ff88] mt-4">场景一：趋势内回调的左侧入场</h4>
            <p>趋势确认后，如果迁移初段未能进场且大周期目标位尚未到达，在价格回撤时框出回调区间，通过 POC 与 HVN 分布寻找左侧交易点。</p>
            
            <h4 className="text-lg text-[#00ff88] mt-4">场景二：小周期共识区与 POC 切换</h4>
            <p>在 1 分钟或 5 分钟图上，框出一段短期横盘区间，观察 POC 位置的迁移，判断多空共识是否正在发生转换。</p>
            
            <h4 className="text-lg text-[#00ff88] mt-4">场景三：区间内 POC 回归与反转</h4>
            <p>框出一段完整的价格波动区间，观察价格是否回归至 POC 并在该位置产生反转信号，作为执行依据。</p>

            <h3 className="text-xl mt-8">💡 使用建议</h3>
            <ol className="list-decimal pl-5 space-y-4">
              <li>
                <strong>不要孤立看 POC</strong><br/>
                <span className="text-gray-400">POC 是重要参考，但必须结合 HVN 分布、LVN 空洞、价格相对区间位置以及到价后的实际反应，综合判断。Volume Profile 不是"到价就做"的机械信号，而是帮你理解成交结构的地图。</span>
              </li>
              <li>
                <strong>区间选择要有结构逻辑</strong><br/>
                <span className="text-gray-400">灵活是优势，也是风险。不同区间可能呈现完全不同的结构。应围绕有逻辑的结构来定义区间：一段完整推动、一段完整回撤、一段明确震荡、一次突破前后的整理。避免随意截取无结构的行情。</span>
              </li>
              <li>
                <strong>小周期必须结合大周期上下文</strong><br/>
                <span className="text-gray-400">小周期结构极易被大周期背景覆盖。最理想的用法：<strong>大周期定方向和环境 → InRange VP 找局部执行位</strong>。留意上方是否贴近高周期阻力、当前是否处于 Session 高低点附近、是否临近重要新闻、是否处在大级别流动性区间内。</span>
              </li>
            </ol>

            <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl">
              <h3 className="text-xl font-bold text-[#00ff88] mb-4">总结</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2"><span>想在非趋势阶段依然找到交易机会</span> <span className="text-gray-500 mx-2">→</span> <span className="text-[#00ff88]">✅ 局部成交结构分析</span></li>
                <li className="flex items-center gap-2"><span>想自由选择分析区间而非被 Session 限制</span> <span className="text-gray-500 mx-2">→</span> <span className="text-[#00ff88]">✅ 动态区间、自由拖拽</span></li>
                <li className="flex items-center gap-2"><span>做日内或剥头皮，需要小周期精确执行</span> <span className="text-gray-500 mx-2">→</span> <span className="text-[#00ff88]">✅ 支持 1 分钟级别精细分析</span></li>
                <li className="flex items-center gap-2"><span>需要一个轻量、直观、即开即用的工具</span> <span className="text-gray-500 mx-2">→</span> <span className="text-[#00ff88]">✅ 加载即用，拖线即算</span></li>
              </ul>
              <p className="mt-6 text-lg font-medium text-white text-center">InRange Volume Profile——让你在任意市场结构中，看见成交的真相。</p>
            </div>

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
