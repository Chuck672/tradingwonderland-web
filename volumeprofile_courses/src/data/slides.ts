import { chapter2Slides } from './chapter2';
import { chapter3Slides } from './chapter3';
import { chapter4Slides } from './chapter4';
import { chapter5Slides } from './chapter5';
import { chapter6Slides } from './chapter6';

export interface SlideData {
  id: string;
  title: { zh: string; en: string };
  content?: { zh: string[]; en: string[] };
  script: { zh: string; en: string };
  visualOnly?: boolean;
  chartType: "title" | "comparison" | "history" | "institutions" | "price-value" | "concept" | "term-summary" | "term-poc-va" | "term-nodes" | "term-tpo" | "term-extremes" | "term-shapes" | "candle-profile";
  chartData?: any;
}

export const chapter1Slides: SlideData[] = [
  {
    id: "intro",
    title: {
      zh: "Volume Profile 终极指南：从入门到进阶",
      en: "Ultimate Guide to Volume Profile: From Beginner to Advanced",
    },
    content: {
      zh: [
        "第一章：基础概念与底层逻辑",
        "摒弃传统指标的滞后性，直击市场真实的资金分布",
        "本章将彻底解析成交量分布图的核心思想与应用价值",
      ],
      en: [
        "Chapter 1: Basic Concepts and Underlying Logic",
        "Abandon lagging indicators, directly observe the market's real capital distribution",
        "This chapter fully analyzes the core ideas and application value of Volume Profile",
      ],
    },
    script: {
      zh: "各位交易者好，欢迎来到 Volume Profile 深度教学演示系统。在接下来的系列课程中，我们将剥离市场上繁杂的技术指标与噪音，带你直击交易中最核心的本质：真实的资金到底在哪里换手。今天我们从第一章基础概念讲起，你将彻底理解价格与价值的本质区别，并学会像机构一样去观察图表。",
      en: "Hello traders, welcome to the Volume Profile In-Depth Tutorial System. In the upcoming series, we will strip away the complex technical indicators and noise in the market, taking you straight to the core essence of trading: where real capital actually changes hands. Today we start with Chapter 1, basic concepts. You will thoroughly understand the fundamental difference between price and value, and learn to read charts like an institution.",
    },
    chartType: "title",
  },
  {
    id: "comparison",
    title: {
      zh: "什么是 Volume Profile？与传统成交量的本质区别",
      en: "What is Volume Profile? vs Traditional Volume",
    },
    content: {
      zh: [
        "传统成交量 (底轴)：基于时间 (Time-based)，显示某时间段内发生“多少”交易",
        "Volume Profile (侧轴)：基于价格 (Price-based)，显示特定价格上发生“多少”交易",
        "致命盲区：时间不能形成支撑阻力，只有堆积的订单才能阻挡价格",
        "核心维度转换：从研究“何时发生”转变为研究“何处发生”",
      ],
      en: [
        "Traditional Volume (Bottom Axis): Time-based, shows 'how much' traded during a period",
        "Volume Profile (Side Axis): Price-based, shows 'how much' traded at a specific price",
        "Fatal Blind Spot: Time does not create support/resistance, only stacked orders do",
        "Core Shift: From studying 'when it happened' to 'where it happened'",
      ],
    },
    script: {
      zh: "如果你打开一张标准的K线图，屏幕下方通常是传统的成交量柱状图。它告诉你在一根5分钟或1小时K线里，成交了多少合约。它回答的是“何时发生”。但这对交易帮助有限，因为时间无法成为价格的阻力。下午两点这个时间点并不会阻止趋势，真正能阻止趋势的，是在某个特定价格上大量堆积的限价单。Volume Profile 将成交量顺时针旋转了90度，画在纵轴上。它记录的是每一个价格水平上真实发生的成交量。这就直接回答了交易中最关键的问题：“资金密集换手发生在何处”。",
      en: "If you open a standard chart, you typically see traditional volume histograms at the bottom. It tells you how many contracts were traded during a 5-minute or 1-hour candle. It answers the question 'when'. But this is of limited help, because time cannot act as resistance. The fact that it is 2 PM will not stop a trend. What truly stops a trend are massive limit orders stacked at a specific price. Volume Profile rotates the volume 90 degrees and plots it on the vertical axis. It records the actual volume traded at each price level. This directly answers the most critical question in trading: 'Where did the dense exchange of capital occur?'.",
    },
    chartType: "comparison",
  },
  {
    id: "history",
    title: {
      zh: "Volume Profile 的起源与发展历史",
      en: "Origin and History of Volume Profile",
    },
    content: {
      zh: [
        "1980年代：芝加哥期货交易所 (CBOT) 场内交易员彼得·斯泰德迈尔",
        "第一阶段：Market Profile (市场轮廓) —— 基于时间停留在某价格的频率 (TPO)",
        "第二阶段：电子化交易与真实 Tick 级数据的普及",
        "现代进化：Volume Profile —— 摒弃时间预估，精确测量真实资金量",
      ],
      en: [
        "1980s: Peter Steidlmayer, floor trader at Chicago Board of Trade (CBOT)",
        "Phase 1: Market Profile — Based on frequency of time spent at a price (TPO)",
        "Phase 2: Popularization of electronic trading and real tick-level data",
        "Modern Evolution: Volume Profile — Discarding time estimates for precise volume measurement",
      ],
    },
    script: {
      zh: "为了真正掌握这个工具，我们必须了解它的演进历史。在1980年代的芝加哥期货交易所，一位名叫彼得·斯泰德迈尔的场内交易员观察到，市场的价格运动符合钟形曲线的统计学分布。他最初发明了 Market Profile（市场轮廓），用字母（TPO）来记录价格在某个位置停留的时间。但在当时，这只是一种对成交量的“预估”。随着交易全面电子化的到来，我们不再需要用时间去估算成交量。我们能直接拿到每一笔真实的Tick级交易数据。由此，Volume Profile 诞生了。这是一次从“估算”到“极其精确的测量”的技术革命。",
      en: "To truly master this tool, we must understand its evolution. In the 1980s at the Chicago Board of Trade, a floor trader named Peter Steidlmayer observed that market price movements followed a statistical bell-curve distribution. He originally invented Market Profile, using letters (TPOs) to record the time price spent at a level. But back then, this was just an 'estimation' of volume. With the advent of fully electronic trading, we no longer need to estimate volume using time. We can directly access actual tick-level data for every trade. Thus, Volume Profile was born. It is a technological revolution from 'estimation' to 'extremely precise measurement'.",
    },
    chartType: "history",
  },
  {
    id: "institutions",
    title: {
      zh: "为什么聪明的钱 (Smart Money) 都在用它？",
      en: "Why Does Smart Money Use It?",
    },
    content: {
      zh: [
        "流动性陷阱：机构资金庞大，无法在单一价格点完成建仓，否则将导致严重滑点",
        "缓慢吸收 (Absorption)：机构必须在一个价格区间内悄悄吸筹或派发",
        "高成交量节点 (HVN)：图表上的巨大凸起，就是机构留下的大量建仓脚印",
        "低成交量节点 (LVN)：价格快速穿越的真空区，通常代表强烈的价格拒绝",
      ],
      en: [
        "Liquidity Trap: Huge institutional capital cannot enter at a single price point without severe slippage",
        "Absorption: Institutions must quietly accumulate or distribute within a price range",
        "High Volume Node (HVN): Huge bulges on the chart are massive institutional footprints",
        "Low Volume Node (LVN): Vacuum zones crossed quickly, usually representing strong price rejection",
      ],
    },
    script: {
      zh: "为什么大型机构和量化算法极其依赖 Volume Profile？因为散户和机构面临的问题截然不同。散户可以在任何点位市价买入，而机构动辄上万手的订单面临着巨大的“流动性”问题。如果机构在单一价格直接买入，巨大的滑点会让他们的成本极高。因此，聪明的钱必须在一个价格区间内，利用时间缓慢地吸收筹码。这个悄悄建仓的过程，会在 Volume Profile 上留下一个巨大的凸起，也就是高成交量节点（HVN）。相反，那些价格快速扫过、凹陷下去的低成交量节点（LVN），则说明此处没有流动性，价格被市场强烈拒绝。理解了这一点，你就看懂了机构的底牌。",
      en: "Why do large institutions and quantitative algorithms rely so heavily on Volume Profile? Because retail and institutional traders face fundamentally different problems. A retail trader can buy at market at any point, but an institution with tens of thousands of contracts faces a massive 'liquidity' problem. If an institution buys directly at a single price, severe slippage would skyrocket their costs. Therefore, smart money must slowly absorb positions over time within a price range. This stealthy accumulation leaves a massive bulge on the Volume Profile, known as a High Volume Node (HVN). Conversely, the recessed Low Volume Nodes (LVNs) where price quickly swept through, indicate a lack of liquidity and strong price rejection by the market. Understanding this means you can see the institution's hidden cards.",
    },
    chartType: "institutions",
  },
  {
    id: "price-value",
    title: {
      zh: "核心理念：拍卖市场理论中的 价格 vs 价值",
      en: "Core Concept: Price vs Value in Auction Market Theory",
    },
    content: {
      zh: [
        "拍卖本质：金融市场是一个双向拍卖市场，目的是促成买卖双方的交易",
        "价格 (Price)：只是屏幕上跳动的当前报价，充满噪音、情绪和假突破",
        "价值 (Value)：基于统计学，买卖双方达成共识并完成 70% 成交量聚集的区域 (Value Area)",
        "均值回归现象：当价格过度偏离价值区域而缺乏新成交量跟进时，如同拉满的弹簧，极易被强力拉回",
      ],
      en: [
        "Auction Essence: Financial markets are two-way auctions designed to facilitate trades",
        "Price: Just a ticking quote on the screen, full of noise, emotion, and fakeouts",
        "Value: Statistically, the area where buyers/sellers reach consensus and 70% of volume occurs (Value Area)",
        "Mean Reversion: When price deviates too far from the Value Area without new volume, it acts like a stretched spring, easily snapping back",
      ],
    },
    script: {
      zh: "Volume Profile 最底层的逻辑，建立在拍卖市场理论之上。市场本质上是一个双向拍卖场，它的唯一目的是促成交易。在这里，我们要严格区分“价格”与“价值”。价格，只是你屏幕上那个不断跳动的最新成交价，它很容易被新闻、情绪或止损盘所影响。而“价值”呢？它是经过统计得出的、绝大多数买卖双方都认可的公允区间。在图表上，占据总成交量 70% 的密集区域，我们称为价值区域（Value Area）。当价格突然跌破或突破这个区域，如果没有任何新的成交量跟进，这意味着市场不认可这个新“价格”的“价值”。这就好比一根被拉伸的弹簧，价格会被一种引力迅速拉回价值区域内。寻找价格与价值的错位，就是我们交易获利的根本。",
      en: "The underlying logic of Volume Profile is built upon Auction Market Theory. The market is essentially a two-way auction, and its sole purpose is to facilitate trade. Here, we must strictly distinguish between 'Price' and 'Value'. Price is just the latest ticked quote on your screen, easily influenced by news, emotions, or stop-loss runs. But 'Value'? It is a statistically derived fair range agreed upon by the vast majority of buyers and sellers. On the chart, the dense area accounting for 70% of total volume is called the Value Area. When price suddenly breaks out of this area, if no new volume follows, it means the market does not accept the 'value' of this new 'price'. It is like a stretched rubber band; price will be rapidly pulled back into the Value Area by a gravitational force. Finding the dislocation between price and value is the fundamental source of trading profits.",
    },
    chartType: "price-value",
  }
];

export const slides: SlideData[] = [
  ...chapter1Slides,
  ...chapter2Slides,
  ...chapter3Slides,
  ...chapter4Slides,
  ...chapter5Slides,
  ...chapter6Slides,
];

export { chapter2Slides, chapter3Slides, chapter4Slides, chapter5Slides, chapter6Slides };
