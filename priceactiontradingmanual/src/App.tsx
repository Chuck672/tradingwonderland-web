import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Lang = "zh" | "en";
type Cycle = "drive" | "range" | "liquidity";
type SetupType = "breakout" | "fakeout" | "onion";

type Bilingual = Record<Lang, string>;

type UnitRow = {
  htf: Cycle;
  ltf: Cycle;
  lookFor: Bilingual;
  careful: Bilingual;
  setups: Record<SetupType, boolean>;
};

type Candle = {
  x: number;
  high: number;
  low: number;
  open: number;
  close: number;
  hollow?: boolean;
  tone?: "black" | "white" | "gray";
};

export const UI = {
  brand: { zh: "tradingwonderland price action lab", en: "tradingwonderland price action lab" },
  title: { zh: "价格行为交易手册", en: "Price Action Trading Manual" },
  subtitle: { zh: "priceaction trading manual v2", en: "priceaction trading manual v2" },
  toggle: { zh: "EN", en: "中" },
  directory: { zh: "目录", en: "Contents" },
  unit0: { zh: "Unit 0 完整图谱", en: "Unit 0 Full Chart" },
  unit1: { zh: "Unit 1 专业交易员一样交易", en: "Unit 1 Trade Like a Pro Trader" },
  unit2: { zh: "Unit 2 基础与进阶概念", en: "Unit 2 Basics and Advanced Concepts" },
  unit3: { zh: "Unit 3 市场阶段", en: "Unit 3 Market Cycles" },
  unit4: { zh: "Unit 4 执行", en: "Unit 4 Execution" },
  returnToContents: { zh: "回到目录", en: "Back To Contents" },
  mapTitle: { zh: "Daily Analysis 流程图", en: "Daily Analysis Flow" },
  statsTitle: { zh: "Setup 分布统计", en: "Setup Distribution" },
  unit1Title: { zh: "Unit 1 专业交易员一样交易", en: "Unit 1 Trade Like a Pro Trader" },
  identify: { zh: "识别", en: "IDENTIFY" },
  plan: { zh: "计划", en: "PLAN" },
  patience: { zh: "耐心", en: "PATIENCE" },
  execute: { zh: "执行", en: "EXECUTE" },
  planningWord: { zh: "计划", en: "PLANNING" },
  waitForBreakout: { zh: "等待突破", en: "Wait for breakout" },
  target: { zh: "目标", en: "TARGET" },
  waitDots: { zh: "等待...", en: "wait..." },
  nowEnter: { zh: "此处入场", en: "Now Enter" },
  unit2Title: { zh: "Unit 2 蜡烛图解剖", en: "Unit 2 Candle Review" },
  candleReview: { zh: "蜡烛图复盘", en: "CANDLE REVIEW" },
  candleAnatomy: { zh: "蜡烛图解剖", en: "CANDLE ANATOMY" },
  candleWicks: { zh: "蜡烛影线", en: "CANDLE WICKS" },
  noWick: { zh: "无上影/下影", en: "No Top/Bottom Wick" },
  marketStructure: { zh: "市场结构", en: "MARKET STRUCTURE" },
  bullishTrend: { zh: "多头趋势", en: "BULLISH TREND" },
  bearishTrend: { zh: "空头趋势", en: "BEARISH TREND" },
  ranges: { zh: "区间", en: "RANGES" },
  changeStructure: { zh: "结构切换", en: "CHANGE OF STRUCTURE" },
  tradeSetups: { zh: "交易设置", en: "TRADE SETUPS" },
  advancedConcepts: { zh: "高级概念", en: "ADVANCED CONCEPTS" },
  xauExample: { zh: "XAUUSD 市场示例", en: "XAUUSD Market Example" },
  unit3Title: { zh: "Unit 3 市场阶段", en: "Unit 3 Market Cycles" },
  marketCycles: { zh: "市场阶段", en: "MARKET CYCLES" },
  ltfVsHtf: { zh: "LTF VS HTF", en: "LTF VS HTF" },
  huntingOpportunities: { zh: "寻找机会", en: "HUNTING OPPORTUNITIES" },
  whenToBePatient: { zh: "何时保持耐心", en: "WHEN TO BE PATIENT" },
  setupsToLookFor: { zh: "寻找的交易设置", en: "setups to look for" },
  breakoutsFakeouts: { zh: "突破 / 假突破", en: "breakouts / fakeouts" },
  htfDrive: { zh: "HTF 价格迁移", en: "HTF DRIVE" },
  htfRange: { zh: "HTF 区间运动", en: "HTF RANGE" },
  htfFakeout: { zh: "HTF 假突破", en: "HTF FAKEOUT" },
};

export const UNIT3_TEXT = {
  overviewDesc: {
    zh: "在 HTF 和 LTF 上都能看到相同的市场阶段。为了更好地理解价格意图，我们需要结合两者，例如：识别 HTF 的价格迁移配合 LTF 的流动性抓取，并针对具体情况采取正确的入场。",
    en: "The same market cycles can be seen on both the HTF and LTF. To get a better understanding of what price wants to do, we need to use the combination of both, i.e., being able to identify a HTF drive with a LTF liquidity grab and taking the right entry for each specific situation.",
  },
  driveTitle: { zh: "价格迁移", en: "DRIVE" },
  drivePoints: [
    { zh: "清晰的市场方向", en: "Clear market direction" },
    { zh: "干净的推动与区间回补", en: "Clean pushes and range fill" },
    { zh: "可预测的价格行为", en: "Predictable price action" },
  ],
  driveHunting: {
    zh: "当价格处于迁移阶段时，会有更多的寻找机会。价格很可能已经找到了方向，顺势而为通常是最佳选择。需要注意的是，不要轻易被反向交易诱导。如果价格已经选定了当天的方向，最好不要试图当“英雄”。",
    en: "When price is driving, there are more hunting opportunities. Price has likely found its direction and jumping on the trend usually is the way to go. A word of caution is to not get easily persuaded into trades in the opposite direction. If price has chosen its direction for the day, it is usually best to not be the 'hero'.",
  },
  drivePatient: {
    zh: "价格通常处于迁移中，因为 HTF 已经抓取了流动性并正在其 HTF 区间内运行。因为我们始终处于 HTF 区间内，我们需要警惕的是 HTF 何时已经完成了区间回补。一旦发生，价格的可预测性就会大大降低。因此，我们通常以 HTF 区间回补为目标，一旦完成，我们就开始变得更加耐心。",
    en: "Price usually is driving because the HTF has grabbed liquidity and is driving in its HTF range. Because we are always in a HTF range, what we have to be careful of is when the HTF has already filled the range. Once that has happened, it makes price much less predictable. Because of this, we usually target the HTF range fills, and once that has happened, we start being more patient.",
  },
  driveChartDesc: {
    zh: "在此阶段，价格波动通常很清晰。价格通常会持续创造（在本例中）更低低点和更低高点。",
    en: "Price movement during this phase is often clear. Price typically continues to make (in this example) lower lows and lower highs.",
  },
  driveHtfDesc: {
    zh: "在 HTF 上，我们可能只看到强劲的看跌蜡烛和影线回补，但在 LTF 上，我们会看到价格下跌时形成的结构。这里唯一的担忧是价格是否有足够的流动性继续推动。",
    en: "On the HTF, we may just see strong bearish candles and wickfills, but on the LTF we will see structure being formed as price is coming down. The only worry here is whether or not price has enough liquidity to continue pushing.",
  },

  rangeTitle: { zh: "区间运动", en: "RANGE" },
  rangePoints: [
    { zh: "方向不明", en: "Uncertain direction" },
    { zh: "预期流动性", en: "Expecting liquidity" },
    { zh: "交易区间", en: "Trade the range" },
  ],
  rangeHunting: {
    zh: "当市场处于区间运动时，通常更难找到干净的头寸。价格需要显示方向，但在区间内时，我们无法确认价格是否会留在区间内，也无法确认突破是否真实。留意所有类型的头寸（假突破、夹心和突破），并等待适当的流动性抓取后再跟随价格的方向和延续。",
    en: "When the market is ranging, it is typically more difficult to find clean positions. Price needs to show direction but when its ranging, we have no confirmation that price will stay in the range, nor do we have confirmation that a breakout is truly a breakout. Watch out for all types of positions (fakeouts, onions and breakouts) and wait for a proper liquidity grab before following price's direction and continuation.",
  },
  rangePatient: {
    zh: "因为价格处于区间内，缺乏方向，这通常意味着我们需要保持耐心，等待方向形成。通常还需要成交量激增来突破区间，所以我们可以寻找流动性抓取。此外，要小心在假突破后立即开仓。假突破可能会演变成延续和市场结构切换。",
    en: "Because price is in a range, there is a lack of direction, and a lack of direction usually will mean we have to be patient and wait for direction to form. Usually a spike in volume is also required to break out of the range, so a liquidity grab is what we can look for. Additionally, be careful of taking positions immediately after the fakeout. A fakeout could turn into a continuation and market structure shift.",
  },
  rangeChartDesc: {
    zh: "价格最终会找到一个盘整的地方。这可能是因为三大交易时段之外缺乏成交量，但通常是价格需要更多流动性来继续推动的信号。",
    en: "Price will eventually find a place to consolidate. This can be because there is a lack of volume outside of the 3 main sessions, but usually is a sign that price requires more liquidity to continue its push.",
  },
  rangeHtfDesc: {
    zh: "根据区间持续的时间，价格在 HTF 上可能看起来仍在推进，但在 LTF 上，可以建立一个区间。",
    en: "Depending on how long it ranges for, price may look like it is still pushing through on the HTF, but on the LTF, a range can be established.",
  },

  liquidityTitle: { zh: "流动性", en: "LIQUIDITY" },
  liquidityPoints: [
    { zh: "价格操纵", en: "Price manipulation" },
    { zh: "选择方向", en: "Choosing direction" },
    { zh: "对价格行为做出反应", en: "React to price action" },
  ],
  liquidityHunting: {
    zh: "流动性分为两个阶段。对于流动性抓取本身，当价格在跟随 HTF 方向时收回到区间内，可能会发现寻找机会。为了进一步确认，请等待流动性抓取后的再次突破，通常这种头寸会有更高的胜率。总的来说，流动性的市场阶段是寻找头寸的好时机。",
    en: "Liquidity comes in two phases. For the Liquidity grab itself, hunting opportunities may be found when price closes back into the range when it follow the direction of the HTF. For further confirmation, wait until the re-breakout following the liquidity grab, and usually this position will have a higher win-rate. Overall, the market cycle of liquidity is a good time to hunt for positions.",
  },
  liquidityPatient: {
    zh: "如果价格在流动性抓取后没有很快开始迁移，这可能意味着价格更加不确定。它可能正在寻找相反方向的流动性以进行市场结构切换，或者只是延迟的价格行为。无论哪种方式，这时我们都应该行使耐心，等待进一步的确认，如突破收盘。",
    en: "In the case that price doesn't start driving soon after the liquidity grab, it could mean that price is more uncertain. It could be looking for liquidity in the opposite direction for a market structure shift, or it could just be delayed price action. Either way, this is when we should exercise patience and wait for further confirmations such as breakout closures.",
  },
  liquidityFakeoutTitle: { zh: "流动性 - 假突破", en: "LIQUIDITY - FAKEOUT" },
  liquidityFakeoutDesc: {
    zh: "当我们谈论流动性时，通常我们是在寻找价格达到过去曾触及的某个价格点。",
    en: "When we talk about liquidity, often we are looking for price to reach a certain price point that it has tapped in the past.",
  },
  liquidityContinuationTitle: { zh: "流动性 - 延续", en: "LIQUIDITY - CONTINUATION" },
  liquidityContinuationDesc: {
    zh: "抓取流动性后，价格可以做出决定。要么流动性抓取是市场结构切换的开始，要么是价格继续下跌的流动性。通过等待突破收盘形式的进一步确认，我们可以入场，因为知道价格更有可能进一步下跌。",
    en: "After grabbing liquidity, price can make a decision. Either the liquidity grab is the start of a market structure shift, or it is liquidity for price to continue pushing down. By waiting for a further confirmation in the form of a breakout closure, we can enter knowing that price is more likely to drive further down.",
  },
  liquidityHtfDesc: {
    zh: "这一点通常通过之前的价格行为找到，并镜像我们可以通过查看价格行为历史看到的走势。",
    en: "This point is typically found through previous price action and mirrors we can see by looking at price action history.",
  },
};

export const UNIT4_TEXT = {
  unit4Title: { zh: "Unit 4 执行", en: "Unit 4 Execution" },
  timeframesTitle: { zh: "理解时间周期", en: "UNDERSTANDING TIMEFRAMES" },
  readingTfTitle: { zh: "读取每个时间周期", en: "READING EACH TIMEFRAME" },
  readingTfDesc: { zh: "循环查看从 HTF（月线 -> 4H）到 LTF（1H - 15/5M）的每个时间周期，并尝试理解价格当前正在做什么。HTF 会告诉你价格在遥远的未来可能会去哪里，而 LTF 会告诉你价格在达到这些 HTF 目标之前短期内可能需要发生什么。", en: "Cycle through each timeframe from the HTF (Monthly -> 4H) to the LTF (1H - 15/5M) and try to understand what price is currently doing. The HTF will tell you where price will likely go in the far future, and the LTF will tell you what may need to happen in the short term before price is able to reach those HTF goals." },
  keyActivity: { zh: "这里的关键活动是识别 HTF 和 LTF 当前处于市场的哪个周期。我们需要识别价格是否拥有所需的流动性，以便继续其先前的轨迹。", en: "They key activity here is to identify what cycle of the market both the HTF and LTF is currently in. We need to identify whether or not price has the liquidity it needs, in order to continue in its previous trajectory" },
  tfClarityTitle: { zh: "时间周期的清晰度", en: "TIMEFRAME CLARITY" },
  tfClarityDesc: { zh: "并非每个时间周期的方向都是清晰的。偶尔会有某些时间周期的区间重叠或难以读取。这是非常正常的，因为对于先前不清晰的价格行为我们无能为力，我们唯一能做的就是寻找对我们来说最有意义的时间周期。", en: "Not every time frame will be clear in terms of direction. Occasionally there will be certain time frames which have ranges which overlap or are hard to read. This is very normal and because there is not much we can do about previous price action being unclear, all we can do is look for the timeframes that make the most sense to us" },
  tfOfInterestTitle: { zh: "感兴趣的时间周期", en: "TIMEFRAMES OF INTEREST" },
  tfOfInterestDesc: { zh: "当我们能够选择 3 或 4 个清晰且在水平方面互补的时间周期时，我们可以决定将这些时间周期用于我们的交易想法。", en: "When we are able to choose the 3 or 4 timeframes which are clear and complement each other in terms of levels, we can decide to use these timeframes for our trade idea" },
  tfAlignmentExample: { zh: "时间周期对齐的一个例子如下：\nDaily - 多头突破上方\n4H - 多头突破上方\n30M - 空头假突破\n这些时间周期都对齐以买入，但各自处于不同的周期。", en: "An example of timeframe alignment would be the following:\nDaily - Bullish Breakout above\n4H - Bullish Breakout above\n30M - Bearish fakeout\nThese timeframes all align for buys but are at different cycles individually" },
  executionStrategy: { zh: "执行与策略", en: "Execution & Strategy" },
  exampleAlignmentTitle: { zh: "对齐示例", en: "Example Alignment" },
  alignmentDaily: { zh: "日线", en: "Daily" },
  alignment4H: { zh: "4H", en: "4H" },
  alignment30M: { zh: "30M", en: "30M" },
  bullishBreakoutAbove: { zh: "上方多头突破", en: "Bullish Breakout above" },
  bearishFakeout: { zh: "空头假突破", en: "Bearish fakeout" },

  keyLevelsTitle: { zh: "制作关键水平", en: "MAKING KEY LEVELS" },
  whatLevelsTitle: { zh: "使用哪些水平", en: "WHAT LEVELS TO USE" },
  whatLevelsDesc: { zh: "你看图表的时间越长，你开始发现的水平就越多。如果你花太长时间寻找水平，你得出的水平可能太具体且视野太狭隘。尝试在 HTF 上标出 3 或 4 个主要水平，在 LTF 上标出 1 或 2 个次要水平。", en: "The longer you look at the charts, the more levels you will start to find. If you end up spending too long looking for levels, the levels you come up with are probably too specific and too tunnel visioned. Try to mark out 3 or 4 major levels on your HTF and on your LFT, maybe mark out 1 or 2 minor levels" },
  majorLevelsTitle: { zh: "主要水平", en: "MAJOR LEVELS" },
  majorLevelsDesc: { zh: "主要水平通常非常明显。它由在过去价格行为历史中被多次回测的支撑和阻力组成。这些水平通常也被 HTF 和 LTF 市场结构所尊重。", en: "A major level is a level that is usually quite obvious. It is made up of supports and resistances that have been retested many times in past price action history. These levels typically are also respected by both HTF and LTF market structure" },
  minorLevelsTitle: { zh: "次要水平", en: "MINOR LEVELS" },
  minorLevelsDesc: { zh: "次要水平通常也比较明显。它由支撑和阻力组成，在过去的价格行为历史中被多次回测。这些水平通常也受到 HTF 和 LTF 市场结构的尊重。", en: "A minor level is a level that is usually quite obvious. It is made up of supports and resistances that have been retested many times in past price action history. These levels typically are also respected by both HTF and LTF market structure" },
  unclearLevelsTitle: { zh: "不清晰的水平", en: "UNCLEAR LEVELS" },
  unclearLevelsDesc: { zh: "当一个水平看起来难以读取，并且你发现自己在怀疑它是否真的是一个横跨的水平时，它可能是一个不清晰的水平。如果你发现自己拼命尝试寻找与水平完全匹配的确切点，并且花了很长时间才找到，请尝试使用其他更清晰明显的水平代替。", en: "When a level looks difficult to read and you find yourself wondering if it actually is a level that goes across, it is probably an unclear level. If you find yourself trying desparately to find the exact points that match the level and it takes you quite a while to find, try using alternate levels intead which are clearer and obvious" },

  tradingPlanTitle: { zh: "寻找交易机会", en: "TRADING PLAN" },
  tradingPlanDesc: { zh: "一旦你有了水平，你就可以开始为价格制定计划。在这种情况下，让我们假设价格过去一直在向上推进，并已开始盘整。", en: "Once you have your levels, you can start creating a plan for price. In this case, lets assume that price has been pushing upwards in the past, and has started ranging" },
  examplePlanTitle: { zh: "交易计划示例", en: "EXAMPLE TRADING PLAN" },
  examplePlanPoints: [
    { zh: "1. 等待流动性抓取", en: "1. Wait for Liquidity grab" },
    { zh: "2. 等待突破收盘确认", en: "2. Wait for a breakout closure confirmation" },
    { zh: "3. 如果突破蜡烛有体面的上影线，则入场突破，否则等待进一步确认", en: "3. If the breakout candle has a decent top wick, take the breakout, if not, wait for further confirmation" }
  ],
  breakoutContTitle: { zh: "突破延续", en: "BREAKOUT CONTINUATION" },
  breakoutContDesc: { zh: "抓取流动性后，我们希望寻找突破收盘以确认我们的方向。然而，这根突破蜡烛的上影线非常小，这意味着我们可能需要进一步的确认。", en: "After Liquidity is grabbed, we want to look for the breakout closure to confirm our direction. However, this breakout candle has very little top wick, which means that we may need further confirmations" },
  range2BreakTitle: { zh: "区间 2 突破", en: "RANGE 2 BREAKOUT" },
  range2BreakDesc: { zh: "价格建立区间 2 后，现在更有把握继续向上推进。这是在流动性抓取和区间 2 突破收盘确认之后。", en: "After price establishes a range 2, price is now more confirmed to continue pushing upwards. This is following a liquidity grab, and range 2 breakout closure confirmation" },
  breakoutTitle: { zh: "突破", en: "BREAKOUT" },
  breakoutDesc: { zh: "计划的第一部分是看价格是否想要抓取流动性。现在我们看到流动性已被抓取，我们可以按照计划进入第 2 步：等待突破延续。", en: "The first part of the plan is to see if price wants to grab liquidity. Now that we see Liqiudity has been grabbed, we can follow our plan to step 2: waiting for a breakout continuation" },

  patienceTitle: { zh: "耐心等待和执行", en: "PATIENCE AND EXECUTION" },
  baseRangeTitle: { zh: "基础区间", en: "BASE RANGE" },
  trueBreakoutTitle: { zh: "真突破", en: "TRUE BREAKOUT" },
  liquidityGrabTitle: { zh: "流动性抓取", en: "LIQUIDITY GRAB" },
  anythingCanHappenTitle: { zh: "任何事情都可能发生", en: "ANYTHING CAN HAPPEN" },
  anythingCanHappenDesc: { zh: "作为交易者，我们必须明白我们无法控制市场和价格想做什么，我们无法确定价格会向上还是向下迁移。然而，我们可以做的是分析价格行为，以更好地了解价格可能去哪里。", en: "As traders we must understand that we have no control over what the market and price wants to do and we cannot say for certain that price will be driving up or down. However, what we can do is analyze price action to get a better understanding of where price might go" },
  possibilityATitle: { zh: "可能性 (A)", en: "POSSIBILITY (A)" },
  possibilityADesc: { zh: "价格的一个潜在情景可能是它继续向上推进。在这种情况下，我们预期价格在上涨过程中会继续创造更高的高点和更高的低点。", en: "A potential scenario of price could be that it continues to push up. What we would expect in this case is for price to continue making higher highs and higher lows on its way up" },
  possibilityBTitle: { zh: "可能性 (B)", en: "POSSIBILITY (B)" },
  possibilityBDesc: { zh: "然而，即使价格有足够的流动性，价格也同样可能发生假突破并回到区间内。通过查看 HTF，我们通常可以阻止自己进入对我们不利的反转头寸。", en: "However, price is equally likely to fakeout and come back into the range even if price has enough liquidity. By looking at the HTF, we can often stop ourselves from getting into positions that reverse on us" },
  fakeOutTitle: { zh: "假突破", en: "FAKE OUT" },
  crucialPatience: { zh: "这就是为什么保持耐心并适应价格行为至关重要。在任何给定时刻，价格都可以随心所欲。永远不要试图强迫行动进入我们的计划，因为这会降低你的胜率。", en: "This is why it is crucial to be patient and adapt to price action. At any given moment, price can do whatever it wants. Never try to force action into our plan as this will reduce your winrate" },

  trafficAdvantageTitle: { zh: "数据相似性", en: "DATA SIMILARITY" },
  historicalPriceTitle: { zh: "历史价格数据", en: "Historical Price Data" },
  currentPriceTitle: { zh: "当前价格数据", en: "Current Price Data" },
  historicLiquidityTitle: { zh: "1. 历史流动性", en: "1. HISTORIC LIQUIDITY" },
  historicLiquidityDesc: { zh: "无需猜测价格想在哪里抓取流动性。价格的好处在于它会重复其模式。如果我们能够识别价格当前处于哪个区域，并识别在那段时间内它在哪里抓取了流动性，我们就能更好地预测价格这次可能在哪里抓取流动性。", en: "There is no need to guess where price wants to grab its liquidity. The good thing about price is that it repeats its patterns. If we are able to identify which area price is currently in and identify where it grabbed liquidity during that period of time, we can better predict where price might grab liquidity this time" },
  historicBreakoutTitle: { zh: "2. 历史突破", en: "2. HISTORICAL BREAKOUT" },
  historicBreakoutDesc: { zh: "价格抓取流动性后，它突破了区间。这给了我们更好的价格方向指示，特别是由于价格之前已经抓取过流动性。", en: "After price grabs liquidity, it breaks out of the range. This gives us a better indication of price's direction, especially because price has grabbed liquidity previously" },
  historicRangeFillTitle: { zh: "3. 历史区间回补", en: "3. HISTORICAL RANGE FILL" },
  historicRangeFillDesc: { zh: "随着突破，我们可以看到价格已经回补了上方的下一个区间。因此，我们可以将此水平作为我们的交易目标。", en: "Following the breakout we can see that price has filled the next range up. Because of this, we can use this level as our trade target" },
  currentStruggleTitle: { zh: "4. 当前挣扎", en: "4. CURRENT STRUGGLE" },
  currentStruggleDesc: { zh: "从目前的价格行为来看，我们可以看到它一直在努力向上推进，尽管方向和动量是看涨的。价格不推进的主要原因之一是缺乏流动性——那么我们在哪里可以找到所需的流动性呢？", en: "With price action currently, we can see that it has been struggling to push up even though the direction and momentum is bullish. One of the main reasons price is not pushing is due to the lack of liquidity - so where can we find the liquidity required?" },
  currentLiquidityTitle: { zh: "5. 当前流动性", en: "5. CURRENT LIQUIDITY" },
  currentLiquidityDesc: { zh: "因为我们预期价格会在与之前抓取流动性相似的价格点抓取流动性，我们可以通过两种方式利用这一点：\n1. 既然我们预期会有流动性，我们可以建立头寸以达到这一点。\n2. 抓取流动性后，我们对价格可能去哪里有了更好的了解，并可以寻找流动性抓取后的头寸。", en: "Because we are expecting price to grab liquidity at a similar price point as where price previously grabbed liquidity, we can use this point to our advantage in two ways:\n1. Since we are expecting liquidity, we could take positions to get to this point\n2. After grabbing liquidity, we have a better idea of where price may go and can look for positions following the liquidity grab" },
  imperfectPriceTitle: { zh: "6. 不完美的价格", en: "6. IMPERFECT PRICE" },
  imperfectPriceDesc: { zh: "价格永远不会完美，因此，我们不能指望价格总是精确地触及我们的水平。这取决于我们是否决定在流动性抓取后进入头寸——完美的或不完美的。", en: "Price is never perfect, and because of this, we can't expect price to always tap into our level exactly. It is up to us if we decide to take positions after the liquidity grab - perfect or imperfect" },
};

const SETUP_LABEL: Record<SetupType, Bilingual> = {
  breakout: { zh: "突破", en: "BREAKOUT" },
  fakeout: { zh: "假突破", en: "FAKEOUT" },
  onion: { zh: "夹心", en: "ONION" },
};

const CYCLE_LABEL: Record<Cycle, Bilingual> = {
  drive: { zh: "价格迁移", en: "DRIVE" },
  range: { zh: "区间运动", en: "RANGE" },
  liquidity: { zh: "流动性", en: "LIQUIDITY" },
};

const COLUMN_INFO = [
  {
    title: { zh: "日内分析", en: "Daily Analysis" },
    desc: {
      zh: "从 HTF 到 LTF 做完整开盘分析。",
      en: "Start your day with a full HTF-to-LTF analysis.",
    },
  },
  {
    title: { zh: "高时间框架（HTF）", en: "Higher Time Frame (HTF)" },
    desc: {
      zh: "识别 HTF 当前所处周期。",
      en: "Identify the current HTF cycle.",
    },
  },
  {
    title: { zh: "低时间框架（LTF）", en: "Lower Time Frame (LTF)" },
    desc: {
      zh: "识别 LTF 当前所处周期。",
      en: "Identify the current LTF cycle.",
    },
  },
  {
    title: { zh: "观察重点", en: "What To Look For" },
    desc: {
      zh: "明确当下优先关注的交易线索。",
      en: "Define the main trade idea to track.",
    },
  },
  {
    title: { zh: "Setup 类型", en: "Setups Type" },
    desc: {
      zh: "决定入场模型。",
      en: "Choose your entry model.",
    },
  },
  {
    title: { zh: "重点风险", en: "What To Be Careful Of" },
    desc: {
      zh: "避免常见误判。",
      en: "Avoid common execution mistakes.",
    },
  },
];

const UNIT0_ROWS: UnitRow[] = [
  {
    htf: "drive",
    ltf: "drive",
    lookFor: { zh: "价格延续", en: "PRICE CONTINUATION" },
    careful: { zh: "关注更小周期流动性", en: "SMALLER TIMEFRAME LIQUIDITY" },
    setups: { breakout: true, fakeout: false, onion: false },
  },
  {
    htf: "drive",
    ltf: "range",
    lookFor: { zh: "LTF 流动性", en: "LTF LIQUIDITY" },
    careful: { zh: "避免把流动性误判为反转", en: "MISTAKING LIQUIDITY AS REVERSAL" },
    setups: { breakout: true, fakeout: true, onion: true },
  },
  {
    htf: "drive",
    ltf: "liquidity",
    lookFor: { zh: "延续", en: "CONTINUATION" },
    careful: { zh: "避免过早进入结构转换", en: "ENTERING TOO SOON INTO A CHANGE OF STRUCTURE" },
    setups: { breakout: true, fakeout: true, onion: false },
  },
  {
    htf: "range",
    ltf: "drive",
    lookFor: { zh: "R2BO 后延续", en: "CONTINUATION AFTER R2BO" },
    careful: { zh: "先等 R2BO，首破可能是假突破", en: "WAIT FOR R2BO, FIRST BREAKOUT COULD BE A FAKEOUT" },
    setups: { breakout: true, fakeout: false, onion: false },
  },
  {
    htf: "range",
    ltf: "range",
    lookFor: { zh: "先流动性后方向", en: "LIQUIDITY THEN DIRECTION" },
    careful: { zh: "避免把流动性抓取当作全天方向", en: "MISTAKING THE LIQUIDITY GRAB AS DIRECTION FOR THE DAY" },
    setups: { breakout: false, fakeout: false, onion: false },
  },
  {
    htf: "range",
    ltf: "liquidity",
    lookFor: { zh: "假突破后回补区间并上探 HTF 位", en: "RANGE FILL AFTER FAKEOUT AND UP TO HTF LVL" },
    careful: { zh: "等待流动性与回收区间，牢记 HTF 方向", en: "WAIT FOR LIQUIDITY AND CLOSURE BACK INTO RANGE, REMEMBER HTF DIRECTION" },
    setups: { breakout: true, fakeout: true, onion: false },
  },
  {
    htf: "liquidity",
    ltf: "drive",
    lookFor: { zh: "收回区间内，假突破后完成区间回补", en: "CLOSURE BACK INTO RANGE, FAKEOUTS INTO RANGE FILL" },
    careful: { zh: "避免把流动性误判为方向", en: "MISTAKING LIQUIDITY AS DIRECTION" },
    setups: { breakout: true, fakeout: true, onion: false },
  },
  {
    htf: "liquidity",
    ltf: "range",
    lookFor: { zh: "延续或 LTF 流动性", en: "CONTINUATION OR LTF LIQUIDITY" },
    careful: { zh: "警惕 LTF 流动性，优先 R2BO 或 LTF 假突破", en: "WATCH OUT FOR LTF LIQUIDITY, TAKE R2BO OR LTF FAKEOUTS" },
    setups: { breakout: true, fakeout: true, onion: false },
  },
  {
    htf: "liquidity",
    ltf: "liquidity",
    lookFor: { zh: "等待真实方向", en: "WAIT FOR ACTUAL DIRECTION" },
    careful: { zh: "等待 R2BO 确认方向，可能出现双假突破", en: "WAIT FOR R2BO TO CONFIRM DIRECTION, SOMETIMES DOUBLE FAKEOUTS HAPPEN" },
    setups: { breakout: true, fakeout: false, onion: false },
  },
];

import {
  Unit3OverviewChart,
  Unit3DriveChart,
  Unit3RangeChart,
  Unit3LiquidityChart,
  HtfDriveChart,
  HtfRangeChart,
  HtfFakeoutChart,
} from "./components/Unit3Charts";

import {
  KeyLevelsChart,
  TradingPlanChart,
  PossibilityChart,
  BaseRangeChart,
  TrafficLevelsChart,
} from "./components/Unit4Charts";

const CONTENTS = [
  { unit: "Unit 0", title: UI.unit0, href: "#unit0" },
  { unit: "Unit 1", title: UI.unit1, href: "#unit1" },
  { unit: "Unit 2", title: UI.unit2, href: "#unit2" },
  { unit: "Unit 3", title: UI.unit3, href: "#unit3" },
  { unit: "Unit 4", title: UI.unit4, href: "#unit4" },
];

const UNIT2_SUBCONTENTS = [
  {
    title: { zh: "1. 蜡烛图复盘", en: "1. Candle Review" },
    href: "#unit2-candle-review",
  },
  {
    title: { zh: "2. 市场结构", en: "2. Market Structure" },
    href: "#unit2-market-structure",
  },
  {
    title: { zh: "3. 交易设置", en: "3. Trade Setups" },
    href: "#unit2-trade-setups",
  },
  {
    title: { zh: "4. 高级概念", en: "4. Advanced Concepts" },
    href: "#unit2-advanced-concepts",
  },
  {
    title: { zh: "5. 流动性", en: "5. Liquidity" },
    href: "#unit2-liquidity",
  },
];

const UNIT3_SUBCONTENTS = [
  {
    title: { zh: "1. 市场阶段", en: "1. Market Cycles" },
    href: "#unit3-market-cycles",
  },
  {
    title: { zh: "2. 价格迁移 (Drive)", en: "2. Drive" },
    href: "#unit3-drive",
  },
  {
    title: { zh: "3. 区间运动 (Range)", en: "3. Range" },
    href: "#unit3-range",
  },
  {
    title: { zh: "4. 流动性 (Liquidity)", en: "4. Liquidity" },
    href: "#unit3-liquidity",
  },
];

const UNIT1_TEXT = {
  identifyA: {
    zh: "在高时间框架（HTF）与低时间框架（LTF）中识别当前市场周期。不同周期需要不同的交易计划。",
    en: "Understand the current market cycle in both high-time frame (HTF) and low-time frame (LTF) charts. Each market cycle requires a unique trading plan.",
  },
  identifyB: {
    zh: "结合 HTF 与 LTF K 线，建立完整的价格叙事。通过历史重复行为，推演接下来可能发生的价格路径。",
    en: "Utilize both HTF and LTF candlesticks to construct a comprehensive price narrative. Use repeatable historical behavior to project near-future moves.",
  },
  planA: {
    zh: "基于价格行为呈现出来的叙事制定计划。像一个完整故事一样，逻辑必须连贯，不要让计划硬套过去的走势。",
    en: "Develop your plan based on the narrative that price action presents. Like a story, your analysis should be logical and interconnected. Avoid forcing your plan to fit old moves.",
  },
  planB: {
    zh: "让计划保持简单: 识别 X，当 X 出现时执行 Y。计划越简单，复盘和追踪成功率越稳定。",
    en: "Keep your plan simple: identify 'X', and when 'X' occurs, execute 'Y'. The simpler your plan, the easier it is to track performance.",
  },
  patienceA: {
    zh: "在等待计划与市场行为对齐时保持耐心。价格有自己的节奏，并非每天都提供交易机会。",
    en: "Exercise patience while waiting for your plan to align with market movement. Price action follows its own path, and some days do not offer opportunities.",
  },
  patienceB: {
    zh: "保持冷静，市场明天还在。",
    en: "Stay calm, the market will still be there tomorrow.",
  },
  executeA: {
    zh: "当价格进入目标区域并与策略条件一致时，精准执行计划。",
    en: "Execute your plan with precision when price enters target zones and aligns with your strategy.",
  },
  executeB: {
    zh: "无论盈亏，计划都必须按规则执行。持续记录结果，才能评估模型有效性与长期胜率。",
    en: "Win or lose, a plan is a plan. Track both outcomes over time to evaluate setup effectiveness and long-term win rate.",
  },
};

const UNIT2_TEXT = {
  anatomyClosingTitle: { zh: "收盘价", en: "CLOSING PRICE" },
  anatomyClosingDesc: { zh: "蜡烛最终收盘的位置", en: "Price point where the candle closes" },
  anatomyOpeningTitle: { zh: "开盘价", en: "OPENING PRICE" },
  anatomyOpeningDesc: { zh: "蜡烛开启的位置，也是下一根蜡烛开盘的位置", en: "Price point where the candle opens, also where the next candle will open" },
  anatomyHighTitle: { zh: "上影线高点", en: "CANDLE WICK HIGH" },
  anatomyHighDesc: { zh: "价格触及的最高位置", en: "Highest point price reached" },
  anatomyBodyTitle: { zh: "蜡烛实体", en: "CANDLE BODY" },
  anatomyBodyDesc: { zh: "反映该根蜡烛大部分时间停留区域", en: "Reflects where price stayed for most of the candle" },
  anatomyLowTitle: { zh: "下影线低点", en: "CANDLE WICK LOW" },
  anatomyLowDesc: { zh: "价格触及的最低位置", en: "Lowest point price reached" },
  bullishNote: { zh: "适用于看涨蜡烛", en: "For bullish candles" },
  bearishNote: { zh: "看跌蜡烛逻辑相反", en: "The opposite applies for bearish candles" },
  wickRangeTitle: { zh: "影线区间", en: "WICK RANGES" },
  wickRangeDesc: {
    zh: "影线也是区间，只是发生在更小时间框架。影线告诉我们价格是否在延续时创造结构。",
    en: "Wicks are also ranges, but on smaller time frames. They help us see whether price is creating structure while continuing.",
  },
  openingWickTitle: { zh: "开盘影线", en: "OPENING WICK" },
  openingWickDesc: {
    zh: "下一根蜡烛开盘通常会回补前一根的一部分影线，然后再延续原方向。",
    en: "The opening of the next candle often retraces part of the previous candle before continuing in its direction.",
  },
  structureNote: {
    zh: "结构 = 价格持续抬高高点或抬升低点，从而形成可延续路径。",
    en: "Structure means price can form highs and lows that support continued drive.",
  },
  noWickLead: { zh: "不带影线的蜡烛提供的信息更少，下一根是否回补更不确定。", en: "Candles with no wicks give less information and create uncertainty for the next move." },
  noWickBody: {
    zh: "这种情况下，价格可能直接延续，也可能先回撤抓取流动性。避免主观猜测。",
    en: "In this case, price can continue directly or retrace for liquidity first. Avoid guessing.",
  },
  signsTitle: { zh: "回撤信号", en: "SIGNS OF RETRACEMENT" },
  signsDesc: {
    zh: "常见表现是先反转或回撤拿流动性，再回到原方向，但也可能直接穿越。",
    en: "Price often retraces to grab liquidity before continuing, but it can also drive straight through.",
  },
};

const UNIT2_MS_TEXT = {
  breakoutContinuationsTitle: { zh: "突破与延续", en: "BREAKOUTS & CONTINUATIONS" },
  breakoutContinuationsDesc: {
    zh: "区间仍会形成，但价格更容易向上突破并继续迁移至下一个阻力位。",
    en: "Ranges still form, but price tends to break above and continue toward the next resistance.",
  },
  higherHighsTitle: { zh: "更高高点", en: "HIGHER HIGHS" },
  higherHighsDesc: {
    zh: "多头趋势中，价格会持续抬高高点，通常直到触及 HTF 阻力。",
    en: "In a bullish trend, price continues to print higher highs until it reaches HTF resistance.",
  },
  higherLowsTitle: { zh: "更高低点", en: "HIGHER LOWS" },
  higherLowsDesc: {
    zh: "在抬高高点的同时，结构也会抬高低点。",
    en: "Alongside higher highs, price also creates higher lows.",
  },
  bullishLiquidityDesc: {
    zh: "抓流动性时，价格可能短暂跌破前低，再重新突破最新高点。",
    en: "During liquidity grabs, price can break a prior low before rebreaking the latest high.",
  },
  liquidityExample: { zh: "流动性示例", en: "Liquidity Example" },
  lowerHighsTitle: { zh: "更低高点", en: "LOWER HIGHS" },
  lowerHighsDesc: {
    zh: "空头延续下，市场结构会不断形成更低高点。",
    en: "As price drives lower, market structure creates lower highs.",
  },
  lowerLowsTitle: { zh: "更低低点", en: "LOWER LOWS" },
  lowerLowsDesc: {
    zh: "空头趋势中，价格会持续创出更低低点，直到触及 HTF 支撑。",
    en: "In a bearish trend, price keeps creating lower lows until it reaches HTF support.",
  },
  bearishLiquidityTitle: { zh: "流动性", en: "LIQUIDITY" },
  bearishLiquidityDesc: {
    zh: "考虑流动性后，价格有时会先回破前高，再继续跌破最新低点。",
    en: "With liquidity in mind, price can rebreak a previous high before breaking the latest low again.",
  },
  supportResistanceTitle: { zh: "支撑与阻力", en: "SUPPORT & RESISTANCE" },
  supportResistanceDesc: {
    zh: "在区间内，价格通常会尊重支撑与阻力位。",
    en: "Within a range, price respects support and resistance levels.",
  },
  establishedResistanceTitle: { zh: "已建立阻力", en: "ESTABLISHED RESISTANCE" },
  establishedResistanceDesc: {
    zh: "区间顶部的阻力，常由一根看涨蜡烛后接一根看跌蜡烛形成。",
    en: "Top resistance is often formed by one bullish candle followed by one bearish candle.",
  },
  establishedSupportTitle: { zh: "已建立支撑", en: "ESTABLISHED SUPPORT" },
  establishedSupportDesc: {
    zh: "区间底部支撑，常由一根看跌蜡烛后接一根看涨蜡烛形成。",
    en: "Bottom support is often formed by one bearish candle followed by one bullish candle.",
  },
  fakeoutDesc: {
    zh: "有时会出现假突破，突破区间后又收回区间内部，这同样属于流动性行为。",
    en: "You may get fakeouts: breakouts from the range followed by closes back into the range. This is also liquidity.",
  },
  fakeoutExample: { zh: "假突破示例", en: "Fakeout Example" },
  reactionBasedTitle: { zh: "反应式交易", en: "REACTION BASED TRADING" },
  reactionBasedDesc: {
    zh: "不需要提前猜测结构何时变化，只要观察价格反应即可。",
    en: "We do not need to predict where structure changes, just react to price.",
  },
  liquidityOrStructureTitle: { zh: "流动性还是结构变化", en: "LIQUIDITY OR STRUCTURE CHANGE" },
  liquidityOrStructureDesc: {
    zh: "当趋势中突然出现结构变化时，容易混淆。后续章节会讲清如何区分流动性与真实结构切换。",
    en: "A sudden shift during trend can be confusing. Advanced concepts explain how to separate liquidity from true structure change.",
  },
  labelLiquidityLowerHigh: { zh: "流动性与更低高点", en: "LIQUIDITY & LOWER HIGH" },
  labelBreakPreviousLow: { zh: "跌破前低", en: "BREAK OF PREVIOUS LOW" },
  labelConfirmLowerLow: { zh: "确认更低低点", en: "CONFIRMED LOWER LOWS" },
  labelBearContinuation: { zh: "空头结构延续", en: "BEARISH STRUCTURE CONTINUATION" },
};

const UNIT2_TS_TEXT = {
  breakoutsTitle: { zh: "突破", en: "BREAKOUTS" },
  breakoutsLeadTitle: { zh: "进入下一个区间", en: "INTO THE NEXT RANGE" },
  breakoutsDescA: {
    zh: "突破指的是蜡烛收盘在已建立区间的上方或下方，这通常代表有足够动能推动价格进入下一个区间。",
    en: "Breakouts refer to a candle close above or below an established range, which is usually a good indication of volume.",
  },
  breakoutsDescB: {
    zh: "突破可能是延续信号，也可能演变成流动性抓取或假突破。",
    en: "Breakouts can either confirm continuation in the prior direction, or lead to liquidity and fakeouts.",
  },
  breakoutsDescC: {
    zh: "请结合所有时间框架判断更可能发生的路径。",
    en: "Use all time frames to determine which outcome is more likely.",
  },

  fakeoutsTitle: { zh: "假突破", en: "FAKEOUTS" },
  fakeoutsLeadTitle: { zh: "错误方向", en: "THE WRONG WAY" },
  fakeoutsDescA: {
    zh: "假突破是指价格先向当前推动方向的反方向突破，随后收回到前一区间，并继续原方向。",
    en: "A fakeout is a breakout in the opposite direction of current pressure, followed by a close back into the previous range and continuation in the prior direction.",
  },
  fakeoutsDescB: {
    zh: "当价格在趋势中推进时，往往需要额外流动性来继续推进，假突破就是常见形式之一。",
    en: "When price is trending, it may require additional liquidity to continue. Fakeouts are a common form of that process.",
  },
  fakeoutsDescC: {
    zh: "务必记住价格推进方向，避免被假突破困在错误仓位。",
    en: "Remember the direction of travel so you do not get faked out into a losing position.",
  },

  onionsTitle: { zh: "夹心", en: "ONIONS" },
  onionsLeadTitle: { zh: "区间内交易", en: "TRADING THE RANGE" },
  onionsDescA: {
    zh: "在区间中交易时，需要先建立支撑与阻力（顺序不限），这就是夹心。",
    en: "When trading in a range, we need price to establish both support and resistance (in any order). We refer to this as an onion.",
  },
  onionsDescB: {
    zh: "当两端水平建立后，优先寻找顺着动能方向的区间回补。",
    en: "Once levels are set, we look for a simple range fill in the direction of momentum.",
  },
  onionsDescC: {
    zh: "也可以理解为: 等待更高低点形成，再交易支撑确认到更高高点（多头趋势）。",
    en: "Alternatively, wait for a higher low to form, then trade support confirmation into a higher high (in a bullish trend).",
  },

  advantageTitle: { zh: "优势点位", en: "ADVANTAGE POINTS" },
  advantageLeadTitle: { zh: "高概率价格行为", en: "HIGH PROBABILITY PRICE ACTION" },
  advantageDescA: {
    zh: "基于前序价格行为，我们能预判价格可能触及的区域。突破后，价格通常更容易回补下一个区间。",
    en: "Based on previous price action, we get clues on where price can tap next. After a breakout, price is likely to fill the next range.",
  },
  advantageDescB: {
    zh: "完整区间回补通常是整体止盈目标，因为价格触及该位置的概率较高。",
    en: "The full range fill is usually our full TP because there is a high probability that price reaches that level.",
  },
  advantageDescC: {
    zh: "我们也可以把前一根影线高点突破作为中间优势点，但更希望先看到下影线出现。",
    en: "A break of a previous wick high can be an intermediate advantage point, but we usually prefer seeing a bottom wick first.",
  },
  advantageDescD: {
    zh: "这个下影线提供更强确认: 形成下影后，重新突破高点通常会跟随推进行情。",
    en: "That bottom wick acts as stronger confirmation: after it forms, a rebreak of highs is usually followed by a push.",
  },
  previousAction: { zh: "前序价格行为", en: "previous price action" },
  overallTp: { zh: "整体止盈", en: "OVERALL TP" },
  advantagePoint: { zh: "优势点位 1", en: "ADVANTAGE POINT 1" },
  entryPoint: { zh: "入场点", en: "ENTRY POINT" },
  breakoutConfirmation: { zh: "突破确认", en: "BREAKOUT CONFIRMATION" },
};

const UNIT2_AC_TEXT = {
  readingTitle: { zh: "倒着读蜡烛", en: "READING CANDLES BACKWARDS" },
  whyTitle: { zh: "为什么要倒着读蜡烛？", en: "WHY DO WE READ CANDLES BACKWARDS?" },
  introA: {
    zh: "倒着读蜡烛，指的是把每一根 HTF 蜡烛拆分成更小时间框架的组成部分，从而在决策和理解价格行为时获得更完整信息。",
    en: "Reading candles backwards is a phrase we use to describe breaking down each individual HTF candle into its smaller components so that we can be more informed in our decision making and understanding of price action.",
  },
  introB: {
    zh: "刚开始，这个方法在日常分析中较难使用，但它是掌握技术分析与价格行为的关键能力。蜡烛会告诉你价格想做什么，我们的任务是从 HTF 到 LTF 拼出完整画面。",
    en: "At first, this is quite difficult to understand and use in your daily analysis, however, this is a key component of mastering technical analysis and price action. Candles tell you all the information about what price wants to do, and our job is to get a full picture using all the timeframes from HTF to LTF.",
  },
  pointA: {
    zh: "A 有时 HTF 看不清区间，但在 LTF 会非常清晰。",
    en: "A Sometimes ranges can't be seen on the HTF, but is very clear on the LTFs.",
  },
  pointB: {
    zh: "B HTF 上已建立的区间，内部通常会包含多个 LTF 区间。",
    en: "B Established range on the HTF will contain multiple ranges on the LTF.",
  },
  pointC: {
    zh: "C 前一根蜡烛的下影线。标准 1H 看涨蜡烛可拆成四根 15M，叙事会完全不同。该 1H 蜡烛内部，价格先抓流动性，为前一根无下影 15M 蜡烛补出下影线。",
    en: "C Bottom wicks for previous candles. A standard 1H bullish candle can be broken down into four 15M candles where its story can be told in a very different way. Within this 1H candle, price grabbed liquidity and created a bottom wick for a no bottom wick previous 15 minute candle.",
  },
  pointD: {
    zh: "D 流动性之后的突破。抓完流动性后，价格再次突破近期高点。此时我们更有信心其继续上行，但仍需突破收盘确认。",
    en: "D Breakout after liquidity. After grabbing liquidity, price once again breaks above recent highs. This time, we can be more confident that price will continue driving up, but we still need a breakout closure as confirmation.",
  },
  pointE: {
    zh: "E 30M 蜡烛为前一根蜡烛补出下影线。",
    en: "E 30M candle bottom wick for previous candle.",
  },
  pointF: {
    zh: "F HTF 图里的假突破通常只是一根影线，只有在 LTF 才能看到全貌。这里可清晰看到假突破形成，提供足够流动性后，价格再破高点并延续多头结构。",
    en: "F Fakeouts on HTF charts are just wicks, only on the LTFs can you see the full picture. Here you can clearly see a fakeout forming, which is enough liquidity for price to re-break the highs to continue its bullish structure.",
  },
};

const UNIT2_LQ_TEXT = {
  title: { zh: "流动性", en: "LIQUIDITY" },
  noticing: { zh: "识别市场模式", en: "NOTICING MARKET PATTERNS" },
  introA: {
    zh: "最初我们发现自己经常被假突破洗出。随着我们对假突破更有适应性，并在图表中耐心观察后，我们开始追问: 为什么价格会制造假突破？",
    en: "Initially, we noticed that we were getting faked out relatively often. We adapted to the fakeouts and as we started watching fakeouts happen whilst we were patient on the charts, we asked ourselves: Why does price create fakeouts?",
  },
  introB: {
    zh: "为了解答这个问题，我们开始更关注假突破发生前与发生后的行为变化。",
    en: "To answer this question, we paid more attention to what happens before and after fakeouts.",
  },
  beforeTitle: { zh: "假突破之前", en: "BEFORE A FAKEOUT" },
  beforeDesc: {
    zh: "价格通常处于区间内，方向不明，且成交量偏低。",
    en: "Price typically is ranging and has no direction. Often times, there is also less volume in the markets.",
  },
  afterTitle: { zh: "假突破之后", en: "AFTER A FAKEOUT" },
  afterDesc: {
    zh: "价格通常会提速，成交量抬升。有时市场需要更久才选出方向，但多数会落入两种路径。",
    en: "Price usually picks up more volume and is moving much quicker. It sometimes takes more time for price to choose its direction, but the fakeout usually turns into one of two scenarios:",
  },
  afterBulletA: {
    zh: "1. 延续并重新突破高点/低点",
    en: "1. Continuation and Rebreak of Highs/Lows",
  },
  afterBulletB: {
    zh: "2. 出现结构切换，在形成顶部/底部影线后反转",
    en: "2. Market structure shift and a reversal after a top/bottom wick is created",
  },
  summary: {
    zh: "我们围绕假突破的观察最终指向同一个结论: 价格会扫过高点/低点并制造更陡的下影线。这种扫流动性通常会短暂打破前结构点，并在形态上模仿历史价格行为。",
    en: "Our understanding of price action around the fakeout led us to understand that price sweeps highs/lows and creates steeper bottom wicks. This sweep usually breaks a previous structure point and mimics historic price action.",
  },
  ranging: { zh: "区间", en: "RANGING" },
  breakStructure: { zh: "结构破位", en: "BREAK OF STRUCTURE" },
  continuation: { zh: "延续", en: "CONTINUATION" },
  breakStructureDesc: {
    zh: "价格若要顺着 HTF 继续上行，常需先抓取流动性，再回到原方向。流动性可表现为陡峭影线，或在 LTF 中出现结构破位与假突破。",
    en: "For price to continue going up with the HTF, price will need to grab liquidity before continuing in its original direction. Liquidity usually exists as a steep wick, or on the LTF, a potential break of structure and fakeout.",
  },
  continuationDesc: {
    zh: "重新突破高点/低点通常是延续信号。配合流动性背景后，这类交易在统计上更容易走出来。",
    en: "Price rebreaking highs/lows is a good indication of continuation. With liquidity context, it typically increases the probability of this trade playing out.",
  },
  entriesTitle: { zh: "入场与流动性", en: "ENTRIES AND LIQUIDITY" },
  paWithout: { zh: "无流动性的价格行为", en: "PRICE ACTION WITHOUT LIQUIDITY" },
  riskShiftTitle: { zh: "结构切换风险", en: "RISK OF STRUCTURE SHIFT" },
  riskShiftDescA: {
    zh: "如果没有流动性补充，价格更容易出现反转并打破结构。",
    en: "Without liquidity, there is a higher chance that price will reverse and break structure.",
  },
  riskShiftDescB: {
    zh: "价格不会无限同向，回撤始终存在可能。",
    en: "Price never continues in the same direction infinitely and retracement is always a possibility.",
  },
  riskShiftDescC: {
    zh: "因此，市场结构是决定价格能否继续推进的关键前提。",
    en: "As such, market structure is very important and will largely determine whether or not price has what it needs to continue.",
  },
  htfView: { zh: "HTF 视图 1H", en: "HTF VIEW 1H" },
  ltfView: { zh: "LTF 视图 30M", en: "LTF VIEW 30M" },
  ltfReversal: {
    zh: "这里很可能是 HTF 的流动性抓取。在 LTF 里，它会看起来像反转与结构切换。",
    en: "There is a very high chance that this market reversal is a HTF liquidity grab. On the LTF, it will look like a market reversal and structure shift.",
  },
  paWith: { zh: "有流动性的价格行为", en: "PRICE ACTION WITH LIQUIDITY" },
  lowerRisk: { zh: "更低风险", en: "LOWER RISK" },
  lowerRiskDescA: {
    zh: "当价格抓取流动性时，在 LTF 常表现为假突破；在 HTF 上则表现为更陡的影线。",
    en: "As price grabs liquidity, on the LTF it looks like a fakeout. On the HTF price will have created a steeper wick.",
  },
  lowerRiskDescB: {
    zh: "由于价格已尝试向下推进，方向选择通常更明确，延续概率提升。",
    en: "Because price has already attempted to continue downwards, there is a much higher chance that price will have chosen its direction.",
  },
  leForming: { zh: "Le 蜡烛形成中", en: "A Le Candle Forming" },
  opportunity: {
    zh: "这就是更好的介入时机。若再叠加突破收盘等确认，价格延续概率会明显提高。",
    en: "This is where we can take our opportunity in the market. With further confirmations such as a breakout closure, the likelihood of continuation is very high.",
  },
  minorResistance: { zh: "小级别阻力", en: "Minor Resistance" },
};

const setupColumn: SetupType[] = ["breakout", "fakeout", "onion"];

function setupMark(active: boolean) {
  return active ? "✓" : "○";
}

function splitForTwoLines(text: string) {
  const punctuated = text
    .split(/[，,。]/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (punctuated.length >= 2) {
    return [punctuated[0], punctuated.slice(1).join("，")];
  }

  return [text];
}

function linkCandles(candles: Candle[]) {
  return candles.map((candle, index, source) => {
    const open = index === 0 ? candle.open : source[index - 1].close;
    const bodyTop = Math.min(open, candle.close);
    const bodyBottom = Math.max(open, candle.close);

    return {
      ...candle,
      open,
      high: Math.min(candle.high, bodyTop - 6),
      low: Math.max(candle.low, bodyBottom + 6),
    };
  });
}

function CandleStick({ candle }: { candle: Candle }) {
  const top = Math.min(candle.open, candle.close);
  const height = Math.max(Math.abs(candle.close - candle.open), 8);
  const palette =
    candle.tone === "black"
      ? { wick: "#101010", fill: "#050505", stroke: "#111111" }
      : candle.tone === "white"
        ? { wick: "#a1a1aa", fill: "#ededed", stroke: "#a1a1aa" }
        : candle.tone === "gray"
          ? { wick: "#7a7a7a", fill: "#808080", stroke: "#808080" }
          : {
              wick: candle.hollow ? "#a3e635" : "#4d7c0f",
              fill: candle.hollow ? "#ecfccb" : "#0b0f08",
              stroke: candle.hollow ? "#84cc16" : "#365314",
            };

  return (
    <g>
      <line x1={candle.x} y1={candle.high} x2={candle.x} y2={candle.low} stroke={palette.wick} strokeWidth={2.4} opacity={0.95} />
      <rect
        x={candle.x - 10}
        y={top}
        width={20}
        height={height}
        rx={5}
        fill={palette.fill}
        stroke={palette.stroke}
        strokeWidth={1.5}
      />
    </g>
  );
}

function Unit1IdentifyChart({ lang }: { lang: Lang }) {
  const left: Candle[] = [
    { x: 90, high: 44, low: 160, open: 70, close: 128 },
    { x: 118, high: 88, low: 192, open: 130, close: 172 },
    { x: 146, high: 96, low: 220, open: 176, close: 206 },
  ];

  const center: Candle[] = [
    { x: 440, high: 34, low: 160, open: 62, close: 160 },
    { x: 468, high: 90, low: 230, open: 96, close: 160, hollow: true },
    { x: 496, high: 74, low: 214, open: 96, close: 160 },
  ];

  const right: Candle[] = [
    { x: 780, high: 90, low: 184, open: 126, close: 184 },
    { x: 810, high: 108, low: 224, open: 124, close: 184, hollow: true },
    { x: 840, high: 16, low: 248, open: 126, close: 204 },
  ];

  return (
    <svg viewBox="0 0 980 280" className="mt-8 w-full">
      {[...left, ...center, ...right].map((candle, index) => (
        <CandleStick candle={candle} key={`identify-candle-${index}`} />
      ))}
      <text x="118" y="268" textAnchor="middle" className="fill-zinc-100 text-[14px] tracking-[0.12em]">
        {CYCLE_LABEL.drive[lang]}
      </text>
      <text x="468" y="268" textAnchor="middle" className="fill-zinc-100 text-[14px] tracking-[0.12em]">
        {CYCLE_LABEL.range[lang]}
      </text>
      <text x="810" y="268" textAnchor="middle" className="fill-zinc-100 text-[14px] tracking-[0.12em]">
        {CYCLE_LABEL.liquidity[lang]}
      </text>
    </svg>
  );
}

function Unit1PlanChart({ lang }: { lang: Lang }) {
  const candles: Candle[] = [
    { x: 360, high: 74, low: 214, open: 96, close: 160 },
    { x: 388, high: 88, low: 206, open: 120, close: 160, hollow: true },
    { x: 416, high: 106, low: 226, open: 120, close: 182 },
    { x: 444, high: 132, low: 258, open: 188, close: 214 },
    { x: 472, high: 120, low: 262, open: 212, close: 170, hollow: true },
    { x: 500, high: 92, low: 188, open: 98, close: 162, hollow: true },
    { x: 528, high: 90, low: 218, open: 94, close: 184 },
    { x: 556, high: 126, low: 266, open: 190, close: 246 },
    { x: 584, high: 136, low: 272, open: 224, close: 246, hollow: true },
    { x: 612, high: 132, low: 258, open: 228, close: 188, hollow: true },
  ];

  return (
    <svg viewBox="0 0 980 360" className="mt-8 w-full">
      <line x1="126" y1="96" x2="814" y2="96" stroke="#f4f4f5" strokeWidth="2.8" strokeDasharray="7 5" />
      <line x1="126" y1="216" x2="814" y2="216" stroke="#f4f4f5" strokeWidth="2.8" strokeDasharray="7 5" />

      {candles.map((candle, index) => (
        <CandleStick candle={candle} key={`plan-candle-${index}`} />
      ))}

      <circle cx="580" cy="246" r="70" fill="none" stroke="#d4d4d8" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.9" />
      <path d="M 676 292 Q 640 250 604 268" fill="none" stroke="#d4d4d8" strokeWidth="2.5" />
      <text x="644" y="316" className="fill-zinc-100 text-[14px] tracking-[0.03em]">{UI.waitForBreakout[lang]}</text>
    </svg>
  );
}

function Unit1PatienceChart({ lang }: { lang: Lang }) {
  const candles: Candle[] = [
    { x: 188, high: 72, low: 248, open: 86, close: 186 },
    { x: 218, high: 106, low: 248, open: 128, close: 186, hollow: true },
    { x: 248, high: 114, low: 268, open: 128, close: 216 },
    { x: 278, high: 182, low: 304, open: 216, close: 258 },
    { x: 308, high: 132, low: 314, open: 258, close: 186, hollow: true },
    { x: 338, high: 112, low: 218, open: 170, close: 134, hollow: true },
    { x: 368, high: 118, low: 248, open: 136, close: 230 },
    { x: 398, high: 182, low: 314, open: 232, close: 290 },
    { x: 428, high: 206, low: 334, open: 290, close: 252, hollow: true },
    { x: 458, high: 196, low: 324, open: 290, close: 252 },
    { x: 488, high: 182, low: 324, open: 286, close: 224, hollow: true },
    { x: 518, high: 132, low: 286, open: 218, close: 176, hollow: true },
    { x: 548, high: 136, low: 298, open: 178, close: 264 },
    { x: 578, high: 166, low: 304, open: 264, close: 226, hollow: true },
    { x: 608, high: 106, low: 204, open: 180, close: 228, hollow: true },
    { x: 638, high: 126, low: 248, open: 180, close: 134, hollow: true },
    { x: 668, high: 114, low: 248, open: 136, close: 188 },
    { x: 698, high: 118, low: 270, open: 136, close: 188, hollow: true },
    { x: 728, high: 122, low: 268, open: 140, close: 254 },
    { x: 758, high: 172, low: 304, open: 260, close: 326 },
  ];

  return (
    <svg viewBox="0 0 980 360" className="mt-8 w-full">
      <line x1="274" y1="100" x2="834" y2="100" stroke="#f4f4f5" strokeWidth="2.8" strokeDasharray="7 5" />
      <text x="555" y="88" textAnchor="middle" className="fill-zinc-100 text-[16px] italic tracking-[0.06em]">
        {UI.target[lang]}
      </text>

      {candles.map((candle, index) => (
        <CandleStick candle={candle} key={`patience-candle-${index}`} />
      ))}

      <text x="768" y="342" className="fill-zinc-100 text-[18px] tracking-[0.06em]">{UI.waitDots[lang]}</text>
    </svg>
  );
}

function Unit1ExecuteChart({ lang }: { lang: Lang }) {
  const candles: Candle[] = [
    { x: 180, high: 206, low: 336, open: 252, close: 286, hollow: true },
    { x: 210, high: 142, low: 326, open: 286, close: 326 },
    { x: 240, high: 206, low: 338, open: 316, close: 272, hollow: true },
    { x: 270, high: 190, low: 286, open: 272, close: 224, hollow: true },
    { x: 300, high: 154, low: 304, open: 222, close: 278 },
    { x: 330, high: 170, low: 330, open: 280, close: 224, hollow: true },
    { x: 360, high: 116, low: 260, open: 230, close: 168, hollow: true },
    { x: 390, high: 122, low: 236, open: 170, close: 228 },
    { x: 420, high: 108, low: 236, open: 228, close: 168, hollow: true },
    { x: 450, high: 132, low: 274, open: 170, close: 250 },
    { x: 480, high: 154, low: 312, open: 252, close: 326 },
    { x: 510, high: 206, low: 350, open: 286, close: 326, hollow: true },
    { x: 540, high: 104, low: 310, open: 310, close: 158, hollow: true },
    { x: 570, high: 62, low: 170, open: 90, close: 156, hollow: true },
    { x: 600, high: 48, low: 174, open: 92, close: 158 },
    { x: 630, high: 110, low: 236, open: 152, close: 210 },
    { x: 660, high: 152, low: 286, open: 216, close: 262 },
  ];

  return (
    <svg viewBox="0 0 980 370" className="mt-8 w-full">
      <line x1="76" y1="120" x2="906" y2="120" stroke="#f4f4f5" strokeWidth="2.8" strokeDasharray="7 5" />
      <text x="266" y="108" textAnchor="middle" className="fill-zinc-100 text-[16px] italic tracking-[0.06em]">
        {UI.target[lang]}
      </text>
      <text x="548" y="66" className="fill-zinc-100 text-[14px] tracking-[0.03em]">{UI.nowEnter[lang]}</text>

      {candles.map((candle, index) => (
        <CandleStick candle={candle} key={`execute-candle-${index}`} />
      ))}
    </svg>
  );
}

function Unit2AnatomyChart({ lang }: { lang: Lang }) {
  const isZh = lang === "zh";
  const candles: Candle[] = [
    { x: 470, high: 168, low: 314, open: 188, close: 270, hollow: true },
    { x: 508, high: 148, low: 348, open: 190, close: 286 },
  ];

  return (
    <svg viewBox="0 0 1180 420" className="mt-6 w-full">
      <defs>
        <marker id="arrow-tip" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#d9f99d" />
        </marker>
      </defs>

      {candles.map((candle, index) => (
        <CandleStick candle={candle} key={`u2-anatomy-${index}`} />
      ))}

      <line x1="260" y1="198" x2="430" y2="198" stroke="#d9f99d" markerEnd="url(#arrow-tip)" />
      <line x1="470" y1="300" x2="364" y2="300" stroke="#d9f99d" markerEnd="url(#arrow-tip)" />
      <line x1="676" y1="130" x2="540" y2="130" stroke="#d9f99d" markerEnd="url(#arrow-tip)" />
      <line x1="858" y1="250" x2="540" y2="250" stroke="#d9f99d" markerEnd="url(#arrow-tip)" />
      <line x1="656" y1="352" x2="540" y2="352" stroke="#d9f99d" markerEnd="url(#arrow-tip)" />

      <text x="24" y="170" className={`fill-zinc-100 font-semibold ${isZh ? "text-[20px]" : "text-[22px]"}`}>
        {UNIT2_TEXT.anatomyClosingTitle[lang]}
      </text>
      <text x="24" y="204" className={`fill-zinc-300 ${isZh ? "text-[16px]" : "text-[15px]"}`}>
        {UNIT2_TEXT.anatomyClosingDesc[lang]}
      </text>

      <text x="280" y="272" className={`fill-zinc-100 font-semibold ${isZh ? "text-[20px]" : "text-[22px]"}`}>
        {UNIT2_TEXT.anatomyOpeningTitle[lang]}
      </text>
      <text x="280" y="306" className={`fill-zinc-300 ${isZh ? "text-[16px]" : "text-[15px]"}`}>
        {UNIT2_TEXT.anatomyOpeningDesc[lang]}
      </text>

      <text x="696" y="102" className={`fill-zinc-100 font-semibold ${isZh ? "text-[20px]" : "text-[22px]"}`}>
        {UNIT2_TEXT.anatomyHighTitle[lang]}
      </text>
      <text x="696" y="136" className={`fill-zinc-300 ${isZh ? "text-[16px]" : "text-[15px]"}`}>
        {UNIT2_TEXT.anatomyHighDesc[lang]}
      </text>

      <text x="896" y="224" className={`fill-zinc-100 font-semibold ${isZh ? "text-[20px]" : "text-[22px]"}`}>
        {UNIT2_TEXT.anatomyBodyTitle[lang]}
      </text>
      <text x="896" y="258" className={`fill-zinc-300 ${isZh ? "text-[16px]" : "text-[15px]"}`}>
        {UNIT2_TEXT.anatomyBodyDesc[lang]}
      </text>

      <text x="696" y="328" className={`fill-zinc-100 font-semibold ${isZh ? "text-[20px]" : "text-[22px]"}`}>
        {UNIT2_TEXT.anatomyLowTitle[lang]}
      </text>
      <text x="696" y="362" className={`fill-zinc-300 ${isZh ? "text-[16px]" : "text-[15px]"}`}>
        {UNIT2_TEXT.anatomyLowDesc[lang]}
      </text>
    </svg>
  );
}

function Unit2WicksChart({ lang }: { lang: Lang }) {
  const isZh = lang === "zh";
  return (
    <div className="w-full">
      <svg viewBox="0 0 800 400" className="w-full rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 shadow-2xl">
        <defs>
          <marker id="arrow-tip-green" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 Z" fill="#bef264" />
          </marker>
          <linearGradient id="grad-wick" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#bef264" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#bef264" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* HTF Side */}
        <g transform="translate(60, 60)">
          <rect x="-20" y="-30" width="180" height="320" rx={12} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" />
          <text x="70" y="-10" textAnchor="middle" className="fill-zinc-500 text-xs font-bold uppercase tracking-widest">HTF (1H)</text>
          
          {/* Large HTF Candle */}
          <CandleStick candle={{ x: 70, high: 20, low: 260, open: 100, close: 180, hollow: true }} />
          
          {/* Wick Highlights */}
          <rect x="50" y="20" width="40" height="80" fill="url(#grad-wick)" className="animate-pulse" />
          <rect x="50" y="180" width="40" height="80" fill="url(#grad-wick)" className="animate-pulse" />
          
          <text x="100" y="60" className="fill-lime-400 text-[10px] font-bold italic">{isZh ? "上影线" : "Upper Wick"}</text>
          <text x="100" y="230" className="fill-lime-400 text-[10px] font-bold italic">{isZh ? "下影线" : "Lower Wick"}</text>
        </g>

        {/* Connection Lines */}
        <path d="M 220 100 L 340 100" fill="none" stroke="#bef264" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrow-tip-green)" opacity="0.5" />
        <path d="M 220 260 L 340 260" fill="none" stroke="#bef264" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrow-tip-green)" opacity="0.5" />

        {/* LTF Side - Upper Wick */}
        <g transform="translate(380, 40)">
          <rect x="-10" y="-20" width="380" height="150" rx={12} fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" />
          <text x="10" y="0" className="fill-zinc-400 text-[11px] font-bold uppercase tracking-wider">LTF (5M) - {isZh ? "影线内部是区间" : "Wick is a Range"}</text>
          
          <g transform="translate(20, 20)">
            <CandleStick candle={{ x: 30, high: 40, low: 90, open: 80, close: 50, hollow: true }} />
            <CandleStick candle={{ x: 65, high: 20, low: 70, open: 50, close: 30, hollow: true }} />
            <CandleStick candle={{ x: 100, high: 10, low: 60, open: 30, close: 45 }} />
            <CandleStick candle={{ x: 135, high: 25, low: 80, open: 45, close: 65 }} />
            <CandleStick candle={{ x: 170, high: 40, low: 100, open: 65, close: 85 }} />
            
            {/* Range Box */}
            <rect x="15" y="10" width="170" height="90" fill="none" stroke="#bef264" strokeWidth="1" strokeDasharray="2 2" opacity="0.3" />
            <text x="195" y="55" className="fill-zinc-500 text-[10px] italic">{isZh ? "价格在影线内创造结构" : "Price creating structure"}</text>
          </g>
        </g>

        {/* LTF Side - Lower Wick */}
        <g transform="translate(380, 220)">
          <rect x="-10" y="-20" width="380" height="150" rx={12} fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" />
          <text x="10" y="0" className="fill-zinc-400 text-[11px] font-bold uppercase tracking-wider">LTF (5M) - {isZh ? "下影线回撤拿流动性" : "Retracement for Liquidity"}</text>
          
          <g transform="translate(20, 20)">
            <CandleStick candle={{ x: 30, high: 10, low: 60, open: 20, close: 50 }} />
            <CandleStick candle={{ x: 65, high: 40, low: 90, open: 50, close: 80 }} />
            <CandleStick candle={{ x: 100, high: 60, low: 110, open: 80, close: 100 }} />
            <CandleStick candle={{ x: 135, high: 30, low: 110, open: 100, close: 40, hollow: true }} />
            <CandleStick candle={{ x: 170, high: 10, low: 70, open: 40, close: 20, hollow: true }} />
            
            {/* Range Box */}
            <rect x="15" y="10" width="170" height="100" fill="none" stroke="#bef264" strokeWidth="1" strokeDasharray="2 2" opacity="0.3" />
            <text x="195" y="60" className="fill-zinc-500 text-[10px] italic">{isZh ? "影线是更小周期的波动" : "Wick is LTF movement"}</text>
          </g>
        </g>
      </svg>
    </div>
  );
}

function Unit2NoWickChart({ lang }: { lang: Lang }) {
  const isZh = lang === "zh";
  return (
    <div className="w-full">
      <svg viewBox="0 0 800 550" className="w-full rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 shadow-2xl">
        {/* Scenario 1: Direct Continuation */}
        <g transform="translate(40, 40)">
          <rect x="-10" y="-20" width="720" height="220" rx={12} fill="rgba(190,242,100,0.03)" stroke="rgba(190,242,100,0.1)" />
          <text x="10" y="5" className="fill-lime-400 text-xs font-bold uppercase tracking-widest">{isZh ? "可能性 1: 直接延续" : "Possibility 1: Continuation"}</text>
          
          <g transform="translate(30, 40)">
            {/* Base Bearish */}
            <CandleStick candle={{ x: 30, high: 90, low: 140, open: 100, close: 130 }} />
            {/* Base Bullish (No Bottom Wick) */}
            <CandleStick candle={{ x: 65, high: 40, low: 130, open: 130, close: 60, hollow: true }} />
            {/* Continuation Bullish (Has Bottom Wick) */}
            <CandleStick candle={{ x: 100, high: 10, low: 75, open: 60, close: 20, hollow: true }} />
            
            <text x="140" y="75" className="fill-zinc-400 text-[11px] italic">{isZh ? "价格直接向上推进" : "Price drives straight up"}</text>
          </g>
        </g>

        {/* Scenario 2: Liquidity Grab & Reversal */}
        <g transform="translate(40, 280)">
          <rect x="-10" y="-20" width="720" height="220" rx={12} fill="rgba(253,224,71,0.03)" stroke="rgba(253,224,71,0.1)" />
          <text x="10" y="5" className="fill-yellow-400 text-xs font-bold uppercase tracking-widest">{isZh ? "可能性 2: 抓取流动性后反转" : "Possibility 2: Liquidity Grab & Reversal"}</text>
          
          <g transform="translate(30, 40)">
            {/* Base Bearish */}
            <CandleStick candle={{ x: 30, high: 90, low: 140, open: 100, close: 130 }} />
            {/* Base Bullish (No Bottom Wick) */}
            <CandleStick candle={{ x: 65, high: 40, low: 130, open: 130, close: 60, hollow: true }} />
            
            {/* Liquidity Grab Bearish Candle (Breaks all highs, then breaks no-wick body bottom) */}
            <CandleStick candle={{ x: 100, high: 20, low: 155, open: 60, close: 145 }} />
            
            <text x="140" y="65" className="fill-zinc-400 text-[11px] italic">{isZh ? "假突破抓取高点流动性" : "Fakeout grabs high liquidity"}</text>
            <text x="140" y="85" className="fill-zinc-400 text-[11px] italic">{isZh ? "随后跌破无影线K线底部" : "Then breaks below no-wick low"}</text>
          </g>
        </g>

        {/* Warning Note */}
        <text x="400" y="530" textAnchor="middle" className="fill-zinc-500 text-xs italic">{isZh ? "避免主观猜测，等待价格反应" : "Avoid subjective guessing, wait for reaction"}</text>
      </svg>
    </div>
  );
}

function Unit2BullTrendChart({ lang }: { lang: Lang }) {
  const candles = linkCandles([
    { x: 188, high: 174, low: 344, open: 312, close: 214, hollow: true },
    { x: 236, high: 186, low: 322, open: 214, close: 266 },
    { x: 284, high: 126, low: 308, open: 266, close: 118, hollow: true },
    { x: 332, high: 112, low: 228, open: 118, close: 154 },
    { x: 380, high: 146, low: 262, open: 154, close: 208 },
    { x: 428, high: 72, low: 262, open: 208, close: 88, hollow: true },
  ]);

  const highs = [
    { x: 188, y: 176 },
    { x: 284, y: 126 },
    { x: 428, y: 70 },
  ];

  const lows = [
    { x: 188, y: 344 },
    { x: 284, y: 308 },
    { x: 428, y: 260 },
  ];

  return (
    <svg viewBox="0 0 720 380" className="w-full max-w-[760px]">
      <line x1="44" y1="118" x2="616" y2="118" stroke="#d4d4d8" strokeDasharray="5 4" />
      <line x1="44" y1="210" x2="616" y2="210" stroke="#d4d4d8" strokeDasharray="5 4" />
      <line x1="44" y1="262" x2="616" y2="262" stroke="#d4d4d8" strokeDasharray="5 4" />
      <text x="48" y="108" className="fill-zinc-300 text-[12px]">
        {lang === "zh" ? "次级阻力" : "minor resistance"}
      </text>

      {candles.map((candle, index) => (
        <CandleStick candle={candle} key={`u2-bull-${index}`} />
      ))}

      {highs.map((point, index) => (
        <circle key={`u2-bull-h-${index}`} cx={point.x} cy={point.y} r="10" fill="none" stroke="#84cc16" strokeWidth="2" />
      ))}
      {lows.map((point, index) => (
        <circle key={`u2-bull-l-${index}`} cx={point.x} cy={point.y} r="10" fill="none" stroke="#ef4444" strokeWidth="2" />
      ))}
    </svg>
  );
}

function Unit2BullLiquidityChart({ lang }: { lang: Lang }) {
  const candles = linkCandles([
    { x: 198, high: 148, low: 292, open: 170, close: 246 },
    { x: 238, high: 156, low: 256, open: 246, close: 226, hollow: true },
    { x: 278, high: 110, low: 276, open: 226, close: 124, hollow: true },
    { x: 318, high: 120, low: 214, open: 124, close: 152 },
    { x: 358, high: 142, low: 236, open: 152, close: 202 },
    { x: 398, high: 80, low: 318, open: 202, close: 110, hollow: true },
  ]);

  return (
    <svg viewBox="0 0 720 340" className="w-full max-w-[760px]">
      <line x1="64" y1="214" x2="610" y2="214" stroke="#d4d4d8" strokeDasharray="5 4" />
      {candles.map((candle, index) => (
        <CandleStick candle={candle} key={`u2-bull-liq-${index}`} />
      ))}
      <circle cx="238" cy="214" r="9" fill="none" stroke="#ef4444" strokeWidth="2" />
      <circle cx="398" cy="306" r="24" fill="none" stroke="#d4d4d8" strokeDasharray="4 4" />
      <path d="M 520 308 Q 564 276 554 236 Q 538 198 492 210" fill="none" stroke="#d4d4d8" strokeWidth="2" />
      <text x="272" y="326" className="fill-zinc-100 text-[14px] font-semibold tracking-[0.04em]">
        {UNIT2_MS_TEXT.liquidityExample[lang]}
      </text>
    </svg>
  );
}

function Unit2BearTrendChart({ lang }: { lang: Lang }) {
  const candles = linkCandles([
    { x: 188, high: 58, low: 284, open: 88, close: 246 },
    { x: 238, high: 136, low: 270, open: 246, close: 168, hollow: true },
    { x: 288, high: 108, low: 356, open: 168, close: 314 },
    { x: 338, high: 216, low: 320, open: 314, close: 286, hollow: true },
    { x: 388, high: 188, low: 320, open: 286, close: 250, hollow: true },
    { x: 438, high: 160, low: 372, open: 250, close: 350 },
  ]);

  const highs = [
    { x: 188, y: 58 },
    { x: 288, y: 108 },
    { x: 438, y: 160 },
  ];

  const lows = [
    { x: 188, y: 284 },
    { x: 288, y: 356 },
    { x: 438, y: 372 },
  ];

  return (
    <svg viewBox="0 0 760 400" className="w-full max-w-[820px]">
      <line x1="40" y1="168" x2="640" y2="168" stroke="#d4d4d8" strokeDasharray="5 4" />
      <line x1="40" y1="248" x2="640" y2="248" stroke="#d4d4d8" strokeDasharray="5 4" />
      <line x1="40" y1="320" x2="640" y2="320" stroke="#d4d4d8" strokeDasharray="5 4" />
      <text x="514" y="160" className="fill-zinc-300 text-[12px]">
        {lang === "zh" ? "次级支撑" : "minor support"}
      </text>

      {candles.map((candle, index) => (
        <CandleStick candle={candle} key={`u2-bear-${index}`} />
      ))}

      {highs.map((point, index) => (
        <circle key={`u2-bear-h-${index}`} cx={point.x} cy={point.y} r="12" fill="none" stroke="#84cc16" strokeWidth="2" />
      ))}
      {lows.map((point, index) => (
        <circle key={`u2-bear-l-${index}`} cx={point.x} cy={point.y} r="12" fill="none" stroke="#ef4444" strokeWidth="2" />
      ))}
    </svg>
  );
}

function Unit2BearLiquidityChart({ lang }: { lang: Lang }) {
  const candles = linkCandles([
    { x: 214, high: 76, low: 212, open: 96, close: 192 },
    { x: 260, high: 160, low: 216, open: 192, close: 152, hollow: true },
    { x: 306, high: 132, low: 332, open: 152, close: 304 },
    { x: 352, high: 242, low: 342, open: 304, close: 286, hollow: true },
    { x: 398, high: 206, low: 304, open: 286, close: 242, hollow: true },
    { x: 444, high: 66, low: 372, open: 242, close: 334 },
  ]);

  return (
    <svg viewBox="0 0 760 360" className="w-full max-w-[820px]">
      {candles.map((candle, index) => (
        <CandleStick candle={candle} key={`u2-bear-liq-${index}`} />
      ))}
      <circle cx="214" cy="76" r="10" fill="none" stroke="#ef4444" strokeWidth="2" />
      <circle cx="444" cy="104" r="22" fill="none" stroke="#d4d4d8" strokeDasharray="4 4" />
      <path d="M 596 94 Q 554 42 500 76" fill="none" stroke="#d4d4d8" strokeWidth="2" />
      <text x="518" y="122" className="fill-zinc-100 text-[14px] font-semibold tracking-[0.04em]">
        {UNIT2_MS_TEXT.liquidityExample[lang]}
      </text>
    </svg>
  );
}

function Unit2RangesChart() {
  const candles = linkCandles([
    { x: 172, high: 126, low: 328, open: 152, close: 282 },
    { x: 222, high: 214, low: 376, open: 282, close: 224, hollow: true },
    { x: 272, high: 120, low: 350, open: 224, close: 162, hollow: true },
    { x: 322, high: 126, low: 226, open: 162, close: 188 },
    { x: 372, high: 178, low: 318, open: 188, close: 220 },
    { x: 422, high: 120, low: 340, open: 220, close: 176, hollow: true },
  ]);

  return (
    <svg viewBox="0 0 920 420" className="w-full">
      <line x1="32" y1="162" x2="496" y2="162" stroke="#d4d4d8" strokeDasharray="5 4" />
      <line x1="32" y1="284" x2="496" y2="284" stroke="#d4d4d8" strokeDasharray="5 4" />
      {candles.map((candle, index) => (
        <CandleStick candle={candle} key={`u2-range-${index}`} />
      ))}

      <line x1="778" y1="110" x2="892" y2="110" stroke="#d4d4d8" strokeDasharray="5 4" />
      <CandleStick candle={{ x: 810, high: 82, low: 176, open: 112, close: 154 }} />
      <CandleStick candle={{ x: 842, high: 82, low: 230, open: 154, close: 186 }} />

      <line x1="778" y1="374" x2="892" y2="374" stroke="#d4d4d8" strokeDasharray="5 4" />
      <CandleStick candle={{ x: 828, high: 252, low: 390, open: 300, close: 386 }} />
      <CandleStick candle={{ x: 860, high: 342, low: 412, open: 386, close: 346, hollow: true }} />
    </svg>
  );
}

function Unit2FakeoutChart({ lang }: { lang: Lang }) {
  const candles = linkCandles([
    { x: 184, high: 92, low: 286, open: 146, close: 242 },
    { x: 236, high: 174, low: 332, open: 242, close: 212, hollow: true },
    { x: 288, high: 86, low: 358, open: 212, close: 166, hollow: true },
    { x: 340, high: 126, low: 246, open: 166, close: 194 },
    { x: 392, high: 146, low: 278, open: 194, close: 214 },
    { x: 444, high: 98, low: 350, open: 214, close: 172, hollow: true },
  ]);

  return (
    <svg viewBox="0 0 760 390" className="w-full max-w-[760px]">
      <line x1="44" y1="138" x2="588" y2="138" stroke="#d4d4d8" strokeDasharray="5 4" />
      <line x1="44" y1="246" x2="588" y2="246" stroke="#d4d4d8" strokeDasharray="5 4" />
      {candles.map((candle, index) => (
        <CandleStick candle={candle} key={`u2-fakeout-${index}`} />
      ))}
      <text x="220" y="358" className="fill-zinc-100 text-[14px] font-semibold tracking-[0.04em]">
        {UNIT2_MS_TEXT.fakeoutExample[lang]}
      </text>
    </svg>
  );
}

function Unit2ChangeStructureChart({ lang }: { lang: Lang }) {
  const candles = linkCandles([
    { x: 150, high: 130, low: 350, open: 184, close: 312 },
    { x: 200, high: 78, low: 306, open: 312, close: 208, hollow: true },
    { x: 250, high: 96, low: 218, open: 208, close: 184, hollow: true },
    { x: 300, high: 54, low: 194, open: 184, close: 126, hollow: true },
    { x: 350, high: 52, low: 300, open: 126, close: 252 },
    { x: 400, high: 188, low: 338, open: 252, close: 286 },
    { x: 450, high: 176, low: 352, open: 286, close: 252, hollow: true },
    { x: 500, high: 176, low: 392, open: 252, close: 350 },
  ]);

  return (
    <svg viewBox="0 0 980 420" className="w-full max-w-[980px]">
      {candles.map((candle, index) => (
        <CandleStick candle={candle} key={`u2-change-${index}`} />
      ))}

      <line x1="462" y1="176" x2="694" y2="176" stroke="#d4d4d8" strokeDasharray="5 4" />
      <line x1="260" y1="224" x2="694" y2="224" stroke="#d4d4d8" strokeDasharray="5 4" />
      <line x1="412" y1="314" x2="694" y2="314" stroke="#d4d4d8" strokeDasharray="5 4" />
      <line x1="512" y1="354" x2="694" y2="354" stroke="#d4d4d8" strokeDasharray="5 4" />

      <text x="704" y="184" className="fill-zinc-100 text-[20px] font-semibold italic">
        {UNIT2_MS_TEXT.labelLiquidityLowerHigh[lang]}
      </text>
      <text x="704" y="232" className="fill-zinc-100 text-[20px] font-semibold italic">
        {UNIT2_MS_TEXT.labelBreakPreviousLow[lang]}
      </text>
      <text x="704" y="322" className="fill-zinc-100 text-[20px] font-semibold italic">
        {UNIT2_MS_TEXT.labelConfirmLowerLow[lang]}
      </text>
      <text x="704" y="362" className="fill-zinc-100 text-[20px] font-semibold italic">
        {UNIT2_MS_TEXT.labelBearContinuation[lang]}
      </text>
    </svg>
  );
}

function Unit2SetupBreakoutsChart() {
  const left = linkCandles([
    { x: 134, high: 148, low: 326, open: 276, close: 214, hollow: true },
    // Match the source shape: middle body is small, but still visibly a full candle body.
    { x: 184, high: 166, low: 290, open: 214, close: 250 },
    { x: 234, high: 62, low: 286, open: 250, close: 90, hollow: true },
  ]);

  const right = linkCandles([
    { x: 394, high: 96, low: 248, open: 120, close: 214 },
    { x: 444, high: 168, low: 240, open: 214, close: 196, hollow: true },
    { x: 494, high: 144, low: 388, open: 196, close: 326 },
  ]);

  return (
    <svg viewBox="0 0 620 420" className="w-full max-w-[620px]">
      <line x1="88" y1="188" x2="548" y2="188" stroke="#d4d4d8" strokeDasharray="5 4" />
      <line x1="88" y1="258" x2="548" y2="258" stroke="#d4d4d8" strokeDasharray="5 4" />
      {[...left, ...right].map((candle, index) => (
        <CandleStick candle={candle} key={`u2-ts-break-${index}`} />
      ))}
    </svg>
  );
}

function Unit2SetupFakeoutsChart() {
  const candles = linkCandles([
    { x: 206, high: 96, low: 280, open: 122, close: 242 },
    { x: 256, high: 220, low: 278, open: 242, close: 206, hollow: true },
    { x: 306, high: 102, low: 210, open: 206, close: 132, hollow: true },
    { x: 356, high: 86, low: 296, open: 132, close: 236 },
    { x: 406, high: 216, low: 368, open: 236, close: 308 },
  ]);

  return (
    <svg viewBox="0 0 620 400" className="w-full max-w-[620px]">
      <line x1="76" y1="172" x2="540" y2="172" stroke="#d4d4d8" strokeDasharray="5 4" />
      <line x1="76" y1="274" x2="540" y2="274" stroke="#d4d4d8" strokeDasharray="5 4" />
      {candles.map((candle, index) => (
        <CandleStick candle={candle} key={`u2-ts-fake-${index}`} />
      ))}
    </svg>
  );
}

function Unit2SetupOnionsChart() {
  const candles = linkCandles([
    { x: 168, high: 172, low: 356, open: 298, close: 212, hollow: true },
    { x: 218, high: 98, low: 290, open: 212, close: 118, hollow: true },
    { x: 268, high: 94, low: 236, open: 118, close: 182 },
    { x: 318, high: 148, low: 290, open: 182, close: 246 },
    { x: 368, high: 176, low: 286, open: 246, close: 214, hollow: true },
    { x: 418, high: 86, low: 242, open: 214, close: 114, hollow: true },
  ]);

  return (
    <svg viewBox="0 0 640 420" className="w-full max-w-[640px]">
      <line x1="84" y1="116" x2="592" y2="116" stroke="#d4d4d8" strokeDasharray="5 4" />
      <line x1="84" y1="280" x2="592" y2="280" stroke="#d4d4d8" strokeDasharray="5 4" />
      {candles.map((candle, index) => (
        <CandleStick candle={candle} key={`u2-ts-onion-${index}`} />
      ))}
    </svg>
  );
}

function Unit2SetupAdvantageChart({ lang }: { lang: Lang }) {
  const left = linkCandles([
    { x: 120, high: 210, low: 362, open: 288, close: 224, hollow: true },
    { x: 170, high: 118, low: 300, open: 224, close: 132, hollow: true },
    { x: 220, high: 116, low: 310, open: 132, close: 208 },
    { x: 270, high: 232, low: 280, open: 208, close: 186, hollow: true },
  ]);

  const right = linkCandles([
    { x: 424, high: 210, low: 360, open: 300, close: 252, hollow: true },
    { x: 474, high: 152, low: 282, open: 252, close: 206, hollow: true },
    { x: 524, high: 122, low: 242, open: 206, close: 132, hollow: true },
  ]);

  // Keep guide lines anchored to candle structure levels from the source diagram.
  const overallTpY = right[2].high;
  const advantagePointY = right[1].high;
  const entryPointY = right[2].open;
  const breakoutConfirmY = right[0].open;

  return (
    <svg viewBox="0 0 860 430" className="w-full max-w-[860px]">
      {[...left, ...right].map((candle, index) => (
        <CandleStick candle={candle} key={`u2-ts-adv-${index}`} />
      ))}

      <line x1="92" y1="214" x2="274" y2="214" stroke="#d4d4d8" strokeDasharray="5 4" />
      <line x1="90" y1="268" x2="274" y2="268" stroke="#d4d4d8" strokeDasharray="5 4" />
      <line x1="554" y1={overallTpY} x2="608" y2={overallTpY} stroke="#d4d4d8" strokeDasharray="5 4" />
      <line x1="554" y1={advantagePointY} x2="608" y2={advantagePointY} stroke="#d4d4d8" strokeDasharray="5 4" />
      <line x1="554" y1={entryPointY} x2="608" y2={entryPointY} stroke="#d4d4d8" strokeDasharray="5 4" />
      <line x1="554" y1={breakoutConfirmY} x2="608" y2={breakoutConfirmY} stroke="#d4d4d8" strokeDasharray="5 4" />

      <rect x="150" y="296" width="122" height="48" fill="#facc15" opacity="0.9" />
      <text x="212" y="318" textAnchor="middle" className="fill-zinc-900 text-[11px] italic">
        {UNIT2_TS_TEXT.previousAction[lang]}
      </text>

      <text x="622" y={overallTpY + 4} className="fill-zinc-100 text-[14px] font-semibold italic tracking-[0.03em]">
        {UNIT2_TS_TEXT.overallTp[lang]}
      </text>
      <text x="622" y={advantagePointY + 4} className="fill-zinc-100 text-[14px] font-semibold italic tracking-[0.03em]">
        {UNIT2_TS_TEXT.advantagePoint[lang]}
      </text>
      <text x="622" y={entryPointY + 4} className="fill-zinc-100 text-[14px] font-semibold italic tracking-[0.03em]">
        {UNIT2_TS_TEXT.entryPoint[lang]}
      </text>
      <text x="622" y={breakoutConfirmY + 4} className="fill-zinc-100 text-[14px] font-semibold italic tracking-[0.03em]">
        {UNIT2_TS_TEXT.breakoutConfirmation[lang]}
      </text>
    </svg>
  );
}

function Unit2LiquidityPatternChart({ lang }: { lang: Lang }) {
  const candles = linkCandles([
    { x: 420, high: 350, low: 468, open: 430, close: 396, hollow: true },
    { x: 460, high: 334, low: 426, open: 396, close: 376, hollow: true },
    { x: 500, high: 312, low: 482, open: 376, close: 420 },
    { x: 540, high: 274, low: 430, open: 420, close: 324, hollow: true },
    { x: 580, high: 262, low: 388, open: 324, close: 346 },
    { x: 620, high: 262, low: 382, open: 346, close: 294, hollow: true },
    { x: 660, high: 274, low: 392, open: 294, close: 358 },
    { x: 700, high: 302, low: 430, open: 358, close: 416 },
    { x: 740, high: 334, low: 456, open: 416, close: 402, hollow: true },
    { x: 780, high: 348, low: 412, open: 402, close: 372, hollow: true },
    { x: 820, high: 278, low: 396, open: 372, close: 292, hollow: true },
    { x: 860, high: 302, low: 466, open: 292, close: 430 },
    { x: 900, high: 286, low: 392, open: 430, close: 344, hollow: true },
    { x: 940, high: 248, low: 396, open: 344, close: 418 },
    { x: 980, high: 266, low: 566, open: 418, close: 520 },
    { x: 1020, high: 336, low: 554, open: 520, close: 382, hollow: true },
    { x: 1060, high: 188, low: 406, open: 382, close: 228, hollow: true },
  ]);

  return (
    <svg viewBox="0 0 1560 760" className="w-full">
      <rect x="360" y="216" width="860" height="260" fill="#a3e635" opacity="0.12" />
      <rect x="980" y="476" width="146" height="250" fill="#fde68a" opacity="0.2" />
      <rect x="1082" y="54" width="102" height="420" fill="#c4b5fd" opacity="0.18" />

      <line x1="340" y1="220" x2="1240" y2="220" stroke="#a1a1aa" strokeDasharray="6 5" />
      <line x1="340" y1="476" x2="1240" y2="476" stroke="#a1a1aa" strokeDasharray="6 5" />

      {candles.map((candle, index) => (
        <CandleStick candle={candle} key={`u2-lq-pattern-${index}`} />
      ))}

      <text x="30" y="270" className="fill-lime-200 text-[42px] font-semibold italic">{UNIT2_LQ_TEXT.ranging[lang]}</text>
      <text x="30" y="330" className="fill-zinc-100 text-[24px]">{lang === "zh" ? "假突破前价格多处于区间，" : "Price action before fakeout and"}</text>
      <text x="30" y="372" className="fill-zinc-100 text-[24px]">{lang === "zh" ? "波动慢、量能低。" : "liquidity tends to range with slower movement."}</text>

      <rect x="560" y="532" width="250" height="48" fill="#facc15" opacity="0.95" />
      <text x="572" y="565" className="fill-zinc-900 text-[44px] font-semibold italic tracking-[0.02em]">{UNIT2_LQ_TEXT.breakStructure[lang]}</text>
      <text x="560" y="618" className="fill-zinc-100 text-[24px]">{lang === "zh" ? "抓流动性后再延续原方向。" : "Liquidity grab before continuation in original direction."}</text>

      <rect x="1210" y="86" width="264" height="54" fill="#c4b5fd" opacity="0.3" />
      <text x="1222" y="124" className="fill-zinc-100 text-[46px] font-semibold italic">{UNIT2_LQ_TEXT.continuation[lang]}</text>
      <text x="1222" y="186" className="fill-zinc-100 text-[23px]">{lang === "zh" ? "再破高/低通常是延续信号。" : "Rebreak highs/lows indicates continuation."}</text>
      <text x="1222" y="224" className="fill-zinc-100 text-[23px]">{lang === "zh" ? "有流动性时胜率更高。" : "Liquidity context improves probability."}</text>
    </svg>
  );
}

function Unit2LiquidityWithoutHTFChart({ lang }: { lang: Lang }) {
  const candles = linkCandles([
    { x: 220, high: 312, low: 652, open: 562, close: 436, hollow: true },
    { x: 286, high: 198, low: 538, open: 436, close: 286, hollow: true },
    { x: 352, high: 162, low: 472, open: 286, close: 222, hollow: true },
    { x: 418, high: 176, low: 542, open: 222, close: 402 },
    { x: 484, high: 264, low: 640, open: 402, close: 554 },
  ]);

  return (
    <svg viewBox="0 0 720 720" className="w-full max-w-[720px]">
      <line x1="64" y1="230" x2="682" y2="230" stroke="#a1a1aa" strokeDasharray="6 5" />
      <line x1="64" y1="366" x2="682" y2="366" stroke="#a1a1aa" strokeDasharray="6 5" />
      <line x1="64" y1="500" x2="682" y2="500" stroke="#a1a1aa" strokeDasharray="6 5" />

      {candles.map((candle, index) => (
        <CandleStick candle={candle} key={`u2-lq-wo-htf-${index}`} />
      ))}

      <rect x="64" y="206" width="198" height="40" fill="#facc15" opacity="0.92" />
      <text x="76" y="235" className="fill-zinc-900 text-[34px] font-semibold italic">{UNIT2_LQ_TEXT.minorResistance[lang]}</text>
      <text x="64" y="706" className="fill-zinc-300 text-[30px] font-semibold tracking-[0.03em]">{UNIT2_LQ_TEXT.htfView[lang]}</text>
    </svg>
  );
}

function Unit2LiquidityWithoutLTFChart({ lang }: { lang: Lang }) {
  const candles = linkCandles([
    { x: 130, high: 470, low: 762, open: 676, close: 604, hollow: true },
    { x: 188, high: 354, low: 706, open: 604, close: 430, hollow: true },
    { x: 246, high: 334, low: 636, open: 430, close: 548 },
    { x: 304, high: 282, low: 622, open: 548, close: 354, hollow: true },
    { x: 362, high: 210, low: 546, open: 354, close: 266, hollow: true },
    { x: 420, high: 192, low: 618, open: 266, close: 338 },
    { x: 478, high: 206, low: 612, open: 338, close: 452 },
    { x: 536, high: 272, low: 662, open: 452, close: 608 },
    { x: 594, high: 366, low: 722, open: 608, close: 408, hollow: true },
    { x: 652, high: 324, low: 560, open: 408, close: 286, hollow: true },
  ]);

  return (
    <svg viewBox="0 0 860 820" className="w-full max-w-[860px]">
      <line x1="86" y1="184" x2="822" y2="184" stroke="#a1a1aa" strokeDasharray="6 5" />
      <line x1="86" y1="350" x2="822" y2="350" stroke="#a1a1aa" strokeDasharray="6 5" />
      <line x1="86" y1="516" x2="822" y2="516" stroke="#a1a1aa" strokeDasharray="6 5" />

      {candles.map((candle, index) => (
        <CandleStick candle={candle} key={`u2-lq-wo-ltf-${index}`} />
      ))}

      <rect x="86" y="150" width="224" height="42" fill="#facc15" opacity="0.92" />
      <text x="98" y="182" className="fill-zinc-900 text-[34px] font-semibold italic">{UNIT2_LQ_TEXT.minorResistance[lang]}</text>
      <text x="86" y="58" className="fill-zinc-300 text-[30px] font-semibold tracking-[0.03em]">{UNIT2_LQ_TEXT.ltfView[lang]}</text>
    </svg>
  );
}

function Unit2LiquidityWithHTFChart({ lang }: { lang: Lang }) {
  const candles = linkCandles([
    { x: 208, high: 408, low: 778, open: 686, close: 512, hollow: true },
    { x: 274, high: 252, low: 636, open: 512, close: 354, hollow: true },
    { x: 340, high: 188, low: 556, open: 354, close: 278, hollow: true },
    { x: 406, high: 126, low: 462, open: 278, close: 224, hollow: true },
    { x: 472, high: 142, low: 474, open: 224, close: 296 },
    { x: 538, high: 94, low: 502, open: 296, close: 176, hollow: true },
  ]);

  return (
    <svg viewBox="0 0 920 820" className="w-full max-w-[920px]">
      <line x1="72" y1="214" x2="892" y2="214" stroke="#a1a1aa" strokeDasharray="6 5" />
      <line x1="72" y1="392" x2="892" y2="392" stroke="#a1a1aa" strokeDasharray="6 5" />
      <line x1="72" y1="570" x2="892" y2="570" stroke="#a1a1aa" strokeDasharray="6 5" />

      {candles.map((candle, index) => (
        <CandleStick candle={candle} key={`u2-lq-w-htf-${index}`} />
      ))}

      <rect x="72" y="174" width="218" height="42" fill="#facc15" opacity="0.92" />
      <text x="84" y="206" className="fill-zinc-900 text-[34px] font-semibold italic">{UNIT2_LQ_TEXT.minorResistance[lang]}</text>

      <rect x="372" y="166" width="78" height="360" rx="20" fill="none" stroke="#3f3f46" strokeWidth="3" />
      <line x1="0" y1="82" x2="396" y2="82" stroke="#3f3f46" strokeWidth="2" />
      <text x="110" y="66" className="fill-zinc-100 text-[34px] font-semibold">{UNIT2_LQ_TEXT.leForming[lang]}</text>
      <text x="72" y="814" className="fill-zinc-300 text-[30px] font-semibold tracking-[0.03em]">{UNIT2_LQ_TEXT.htfView[lang]}</text>
    </svg>
  );
}

function Unit2LiquidityWithLTFChart({ lang }: { lang: Lang }) {
  const candles = linkCandles([
    { x: 126, high: 522, low: 802, open: 702, close: 654, hollow: true },
    { x: 182, high: 420, low: 712, open: 654, close: 472, hollow: true },
    { x: 238, high: 392, low: 622, open: 472, close: 564 },
    { x: 294, high: 286, low: 634, open: 564, close: 322, hollow: true },
    { x: 350, high: 300, low: 548, open: 322, close: 398 },
    { x: 406, high: 242, low: 586, open: 398, close: 266, hollow: true },
    { x: 462, high: 270, low: 744, open: 266, close: 604 },
    { x: 518, high: 334, low: 700, open: 604, close: 428, hollow: true },
    { x: 574, high: 386, low: 658, open: 428, close: 560 },
    { x: 630, high: 136, low: 506, open: 560, close: 244, hollow: true },
  ]);

  return (
    <svg viewBox="0 0 880 840" className="w-full max-w-[880px]">
      <line x1="74" y1="200" x2="846" y2="200" stroke="#a1a1aa" strokeDasharray="6 5" />
      <line x1="74" y1="380" x2="846" y2="380" stroke="#a1a1aa" strokeDasharray="6 5" />
      <line x1="74" y1="560" x2="846" y2="560" stroke="#a1a1aa" strokeDasharray="6 5" />

      {candles.map((candle, index) => (
        <CandleStick candle={candle} key={`u2-lq-w-ltf-${index}`} />
      ))}

      <rect x="74" y="158" width="218" height="42" fill="#facc15" opacity="0.92" />
      <text x="86" y="190" className="fill-zinc-900 text-[34px] font-semibold italic">{UNIT2_LQ_TEXT.minorResistance[lang]}</text>
      <text x="74" y="58" className="fill-zinc-300 text-[30px] font-semibold tracking-[0.03em]">{UNIT2_LQ_TEXT.ltfView[lang]}</text>
    </svg>
  );
}

const XAUUSD_IMAGE_SRC = "/images/xauusd-july.jpg";

function XauusdReferenceChart() {
  return (
    <div className="mt-4 w-full">
      <div className="relative aspect-[1.6/1] w-full overflow-hidden rounded-[42px] border border-white/25 bg-black">
        <img
          src={XAUUSD_IMAGE_SRC}
          alt="XAUUSD reference example"
          className="block h-full w-full scale-[0.9] object-contain object-center"
          referrerPolicy="no-referrer"
        />

        {/* Hide the timestamp line to match requested presentation. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[8%] bg-black" />
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>("zh");

  const isZh = lang === "zh";

  const setupStats = useMemo(() => {
    return (Object.keys(CYCLE_LABEL) as Cycle[]).map((cycle) => {
      const rows = UNIT0_ROWS.filter((row) => row.htf === cycle);
      return {
        cycle: CYCLE_LABEL[cycle][lang],
        breakout: rows.filter((row) => row.setups.breakout).length,
        fakeout: rows.filter((row) => row.setups.fakeout).length,
        onion: rows.filter((row) => row.setups.onion).length,
      };
    });
  }, [lang]);

  return (
    <div className="min-h-screen bg-[#040604] text-zinc-100">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(74,222,128,0.24),transparent_34%),radial-gradient(circle_at_84%_11%,rgba(132,204,22,0.18),transparent_30%),linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:100%_100%,100%_100%,44px_44px,44px_44px]" />

      <main className="relative mx-auto w-full max-w-[1240px] px-5 pb-24 pt-8 md:px-8">
        <header className="relative border-b border-lime-500/25 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-lime-300">{UI.brand[lang]}</p>
            <h1 className="mt-3 text-3xl font-semibold text-lime-200 md:text-5xl">{UI.title[lang]}</h1>
            <p className="mt-4 text-xs uppercase tracking-[0.24em] text-lime-400">{UI.subtitle[lang]}</p>
          </motion.div>

          <button
            onClick={() => setLang((prev) => (prev === "zh" ? "en" : "zh"))}
            className="absolute right-0 top-0 rounded-md border border-lime-500/70 bg-black/45 px-4 py-2 text-sm font-medium text-lime-100 transition hover:border-lime-300"
          >
            {UI.toggle[lang]}
          </button>
        </header>

        <section id="directory" className="mt-10">
          <h2 className="text-2xl font-semibold text-zinc-100">{UI.directory[lang]}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {CONTENTS.map((item, index) => (
              <motion.div
                key={item.unit}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.28, delay: index * 0.05 }}
                className="border-l border-lime-600/60 pl-4 text-sm text-zinc-300"
              >
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="block transition hover:text-lime-100"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-lime-300">{item.unit}</p>
                  <p className="mt-1 text-base">{item.title[lang]}</p>
                </a>

                {item.unit === "Unit 2" ? (
                  <div className="mt-3 space-y-2 border-l border-lime-500/30 pl-3">
                    {UNIT2_SUBCONTENTS.map((sub) => (
                      <a
                        key={sub.href}
                        href={sub.href}
                        className="block text-sm text-zinc-400 transition hover:text-lime-200"
                      >
                        {sub.title[lang]}
                      </a>
                    ))}
                  </div>
                ) : item.unit === "Unit 3" ? (
                  <div className="mt-3 space-y-2 border-l border-lime-500/30 pl-3">
                    {UNIT3_SUBCONTENTS.map((sub) => (
                      <a
                        key={sub.href}
                        href={sub.href}
                        className="block text-sm text-zinc-400 transition hover:text-lime-200"
                      >
                        {sub.title[lang]}
                      </a>
                    ))}
                  </div>
                ) : null}
              </motion.div>
            ))}
          </div>
        </section>

        <section id="unit0" className="mt-14 border-t border-lime-500/20 pt-10">
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
            <p className="text-xs uppercase tracking-[0.22em] text-lime-300">Unit 0</p>
            <h2 className="mt-2 text-3xl font-semibold text-zinc-100">{UI.mapTitle[lang]}</h2>
          </motion.div>

          <div className="mt-7 overflow-x-auto">
            <table className="min-w-[1160px] w-full border-separate border-spacing-y-3 text-sm">
              <colgroup>
                <col className="w-[160px]" />
                <col className="w-[160px]" />
                <col className="w-[160px]" />
                <col className="w-[230px]" />
                <col className="w-[210px]" />
                <col className="w-[250px]" />
              </colgroup>
              <thead>
                <tr>
                  {COLUMN_INFO.map((item) => (
                    <th key={item.title.en} className="px-2 pb-2 text-left align-top font-medium text-zinc-200">
                      <p className="text-sm text-lime-200">{item.title[lang]}</p>
                      <p className="mt-1 text-xs font-normal leading-relaxed text-zinc-400">{item.desc[lang]}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {UNIT0_ROWS.map((row, rowIndex) => {
                  const showDaily = rowIndex === 0;
                  const showHtf = rowIndex % 3 === 0;
                  return (
                    <motion.tr
                      key={`${row.htf}-${row.ltf}-${rowIndex}`}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.26, delay: rowIndex * 0.03 }}
                    >
                      {showDaily ? (
                        <td rowSpan={9} className="px-2 align-middle">
                          <div
                            className={`rounded-lg border border-lime-500/60 bg-black/35 px-4 py-3 text-center text-lime-200 ${
                              isZh ? "text-sm tracking-[0.04em]" : "text-xs uppercase tracking-[0.18em]"
                            }`}
                          >
                            {COLUMN_INFO[0].title[lang]}
                          </div>
                        </td>
                      ) : null}

                      {showHtf ? (
                        <td rowSpan={3} className="px-2 align-middle">
                          <div className="rounded-lg border border-zinc-500/60 bg-zinc-950/70 px-4 py-3 text-center text-sm tracking-[0.08em] text-zinc-200">
                            {CYCLE_LABEL[row.htf][lang]}
                          </div>
                        </td>
                      ) : null}

                      <td className="px-2">
                        <div className="rounded-lg border border-zinc-500/60 bg-zinc-950/70 px-4 py-3 text-center text-sm tracking-[0.08em] text-zinc-200">
                          {CYCLE_LABEL[row.ltf][lang]}
                        </div>
                      </td>

                      <td className="px-2">
                        <div
                          className={`rounded-lg border border-zinc-500/70 bg-zinc-900/65 px-4 py-3 text-center text-zinc-100 ${
                            isZh
                              ? "text-[15px] leading-relaxed tracking-[0.01em]"
                              : "text-xs uppercase tracking-[0.12em]"
                          }`}
                        >
                          {row.lookFor[lang]}
                        </div>
                      </td>

                      <td className="px-2">
                        <div className="rounded-lg border border-zinc-500/70 bg-zinc-900/65 px-4 py-3">
                          <div
                            className={`grid grid-cols-3 gap-3 text-center text-zinc-300 ${
                              isZh ? "text-[11px] tracking-[0.02em]" : "text-[10px] uppercase tracking-[0.08em]"
                            }`}
                          >
                            {setupColumn.map((setup) => (
                              <div key={setup}>
                                <p className="whitespace-nowrap">{SETUP_LABEL[setup][lang]}</p>
                                <p className="mt-1 text-base text-lime-200">{setupMark(row.setups[setup])}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>

                      <td className="px-2">
                        <div className="rounded-lg border border-zinc-500/70 bg-zinc-900/65 px-3 py-3 text-zinc-200">
                          {isZh ? (
                            <div className="space-y-1 text-[11px] leading-relaxed tracking-[0.01em]">
                              {splitForTwoLines(row.careful.zh).map((segment, index) => (
                                <p key={`${rowIndex}-careful-${index}`} className="whitespace-normal break-words">
                                  {segment}
                                </p>
                              ))}
                            </div>
                          ) : (
                            <p className="text-[10px] uppercase tracking-[0.06em] leading-relaxed whitespace-normal break-words">
                              {row.careful.en}
                            </p>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.38 }}
            className="mt-10"
          >
            <h3 className="text-xl font-semibold text-zinc-100">{UI.statsTitle[lang]}</h3>
            <div className="mt-4 h-[280px] border border-lime-500/25 bg-black/35 p-3">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <BarChart data={setupStats}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" vertical={false} />
                  <XAxis dataKey="cycle" axisLine={false} tickLine={false} tick={{ fill: "#d4d4d8", fontSize: 12 }} />
                  <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: "#a1a1aa", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(7, 11, 7, 0.95)",
                      border: "1px solid rgba(132,204,22,0.35)",
                      borderRadius: 8,
                    }}
                  />
                  <Bar dataKey="breakout" name="BREAKOUT" fill="#4ade80" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="fakeout" name="FAKEOUT" fill="#84cc16" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="onion" name="ONION" fill="#bef264" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </section>

        <section id="unit1" className="mt-16 border-t border-lime-500/20 pt-10">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
            <p className="text-xs uppercase tracking-[0.22em] text-lime-300">Unit 1</p>
            <h2 className="mt-2 text-3xl font-semibold text-zinc-100">{UI.unit1Title[lang]}</h2>
          </motion.div>

          <div className="mt-10 space-y-14 font-mono text-zinc-100">
            <motion.article initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }}>
              <p className="text-center text-lg uppercase tracking-[0.08em] text-lime-200 md:text-xl">{UI.planningWord[lang]}</p>
              <h3 className="mt-10 text-3xl font-bold tracking-[0.06em] md:text-4xl">{UI.identify[lang]}</h3>
              <p className="mt-4 max-w-5xl text-base leading-relaxed text-zinc-200 md:text-xl">
                {UNIT1_TEXT.identifyA[lang]}
              </p>
              <p className="mt-4 max-w-5xl text-base leading-relaxed text-zinc-200 md:text-xl">
                {UNIT1_TEXT.identifyB[lang]}
              </p>
              <Unit1IdentifyChart lang={lang} />
            </motion.article>

            <motion.article initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }}>
              <h3 className="text-3xl font-bold tracking-[0.06em] md:text-4xl">{UI.plan[lang]}</h3>
              <p className="mt-4 max-w-5xl text-base leading-relaxed text-zinc-200 md:text-xl">{UNIT1_TEXT.planA[lang]}</p>
              <p className="mt-4 max-w-5xl text-base leading-relaxed text-zinc-200 md:text-xl">{UNIT1_TEXT.planB[lang]}</p>
              <Unit1PlanChart lang={lang} />
            </motion.article>

            <motion.article initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }}>
              <h3 className="text-3xl font-bold tracking-[0.06em] md:text-4xl">{UI.patience[lang]}</h3>
              <p className="mt-4 max-w-5xl text-base leading-relaxed text-zinc-200 md:text-xl">{UNIT1_TEXT.patienceA[lang]}</p>
              <p className="mt-4 max-w-5xl text-base leading-relaxed text-zinc-200 md:text-xl">{UNIT1_TEXT.patienceB[lang]}</p>
              <Unit1PatienceChart lang={lang} />
            </motion.article>

            <motion.article initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }}>
              <h3 className="text-3xl font-bold tracking-[0.06em] md:text-4xl">{UI.execute[lang]}</h3>
              <p className="mt-4 max-w-5xl text-base leading-relaxed text-zinc-200 md:text-xl">{UNIT1_TEXT.executeA[lang]}</p>
              <p className="mt-4 max-w-5xl text-base leading-relaxed text-zinc-200 md:text-xl">{UNIT1_TEXT.executeB[lang]}</p>
              <Unit1ExecuteChart lang={lang} />
            </motion.article>
          </div>
        </section>

        <section id="unit2" className="mt-16 border-t border-lime-500/20 pt-10 font-mono">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
            <p className="text-center text-lg tracking-[0.08em] text-lime-200 md:text-xl">{UI.candleReview[lang]}</p>
            <h2 className="mt-8 text-3xl font-bold tracking-[0.05em] text-zinc-100 md:text-4xl">{UI.candleAnatomy[lang]}</h2>
          </motion.div>

          <motion.article
            id="unit2-candle-review"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="mt-6"
          >
            <Unit2AnatomyChart lang={lang} />
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="mt-14"
          >
            <h3 className="text-3xl font-bold tracking-[0.05em] text-zinc-100">{UI.candleWicks[lang]}</h3>
            <p className="mt-5 inline-block bg-yellow-300 px-2 py-1 text-lg italic text-black">{UNIT2_TEXT.bullishNote[lang]}</p>
            <div className="mt-8 flex flex-col gap-8">
              <div className="space-y-6 text-zinc-200">
                <div>
                  <p className="text-2xl font-semibold italic text-zinc-100">{UNIT2_TEXT.wickRangeTitle[lang]}</p>
                  <p className="mt-2 text-lg leading-relaxed">{UNIT2_TEXT.wickRangeDesc[lang]}</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold italic text-zinc-100">{UNIT2_TEXT.openingWickTitle[lang]}</p>
                  <p className="mt-2 text-lg leading-relaxed">{UNIT2_TEXT.openingWickDesc[lang]}</p>
                </div>
                <p className="text-3xl font-semibold leading-relaxed text-zinc-100">{UNIT2_TEXT.structureNote[lang]}</p>
              </div>
              <div className="w-full">
                <Unit2WicksChart lang={lang} />
              </div>
            </div>
            <p className="mt-6 inline-block bg-yellow-300 px-2 py-1 text-lg italic text-black">{UNIT2_TEXT.bearishNote[lang]}</p>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="mt-16"
          >
            <h3 className="text-3xl font-bold tracking-[0.05em] text-zinc-100">{UI.noWick[lang]}</h3>
            <div className="mt-7 flex flex-col gap-8">
              <div className="space-y-4 text-lg leading-relaxed text-zinc-200">
                <p>{UNIT2_TEXT.noWickLead[lang]}</p>
                <p>{UNIT2_TEXT.noWickBody[lang]}</p>
              </div>
              <div className="w-full">
                <Unit2NoWickChart lang={lang} />
              </div>
            </div>
            <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-center">
              <div className="lg:col-span-2">
                <p className="mb-3 text-center text-xl font-semibold text-zinc-100">{UI.xauExample[lang]}</p>
                <XauusdReferenceChart />
              </div>
              <div>
                <p className="text-2xl font-semibold italic text-zinc-100">{UNIT2_TEXT.signsTitle[lang]}</p>
                <p className="mt-2 text-lg leading-relaxed text-zinc-200">{UNIT2_TEXT.signsDesc[lang]}</p>
              </div>
            </div>
          </motion.article>

          <motion.article
            id="unit2-market-structure"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="mt-20 border-t border-lime-500/20 pt-10"
          >
            <p className="text-center text-lg tracking-[0.08em] text-lime-200 md:text-xl">{UI.marketStructure[lang]}</p>

            <h3 className="mt-10 text-2xl font-bold tracking-[0.04em] text-zinc-100 md:text-4xl">{UI.bullishTrend[lang]}</h3>
            <div className="mt-8 space-y-7 text-zinc-200">
              <div>
                <p className="text-xl font-semibold italic text-zinc-100 md:text-2xl">{UNIT2_MS_TEXT.breakoutContinuationsTitle[lang]}</p>
                <p className="mt-2 text-base leading-relaxed md:text-xl">{UNIT2_MS_TEXT.breakoutContinuationsDesc[lang]}</p>
              </div>

              <div className="mt-4 flex items-start gap-3">
                <span className="mt-1 inline-block h-5 w-5 rounded-full border-2 border-lime-400" />
                <div>
                  <p className="text-xl font-semibold italic text-zinc-100 md:text-2xl">{UNIT2_MS_TEXT.higherHighsTitle[lang]}</p>
                  <p className="mt-2 text-base leading-relaxed md:text-xl">{UNIT2_MS_TEXT.higherHighsDesc[lang]}</p>
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <Unit2BullTrendChart lang={lang} />
              </div>

              <div className="mt-2 flex items-start gap-3">
                <span className="mt-1 inline-block h-5 w-5 rounded-full border-2 border-red-500" />
                <div>
                  <p className="text-xl font-semibold italic text-zinc-100 md:text-2xl">{UNIT2_MS_TEXT.higherLowsTitle[lang]}</p>
                  <p className="mt-2 text-base leading-relaxed md:text-xl">{UNIT2_MS_TEXT.higherLowsDesc[lang]}</p>
                  <p className="mt-2 text-base leading-relaxed md:text-xl">{UNIT2_MS_TEXT.bullishLiquidityDesc[lang]}</p>
                </div>
              </div>

              <div className="flex justify-center">
                <Unit2BullLiquidityChart lang={lang} />
              </div>
            </div>

            <h3 className="mt-14 text-2xl font-bold tracking-[0.04em] text-zinc-100 md:text-4xl">{UI.bearishTrend[lang]}</h3>
            <div className="mt-8 space-y-7 text-zinc-200">
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-block h-5 w-5 rounded-full border-2 border-lime-400" />
                <div>
                  <p className="text-xl font-semibold italic text-zinc-100 md:text-2xl">{UNIT2_MS_TEXT.lowerHighsTitle[lang]}</p>
                  <p className="mt-2 text-base leading-relaxed md:text-xl">{UNIT2_MS_TEXT.lowerHighsDesc[lang]}</p>
                </div>
              </div>

              <div className="flex justify-center">
                <Unit2BearTrendChart lang={lang} />
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-1 inline-block h-5 w-5 rounded-full border-2 border-red-500" />
                <div>
                  <p className="text-xl font-semibold italic text-zinc-100 md:text-2xl">{UNIT2_MS_TEXT.lowerLowsTitle[lang]}</p>
                  <p className="mt-2 text-base leading-relaxed md:text-xl">{UNIT2_MS_TEXT.lowerLowsDesc[lang]}</p>
                </div>
              </div>

              <div>
                <p className="text-xl font-semibold italic text-zinc-100 md:text-2xl">{UNIT2_MS_TEXT.bearishLiquidityTitle[lang]}</p>
                <p className="mt-2 text-base leading-relaxed md:text-xl">{UNIT2_MS_TEXT.bearishLiquidityDesc[lang]}</p>
              </div>

              <div className="flex justify-center">
                <Unit2BearLiquidityChart lang={lang} />
              </div>
            </div>

            <h3 className="mt-14 text-2xl font-bold tracking-[0.04em] text-zinc-100 md:text-4xl">{UI.ranges[lang]}</h3>
            <div className="mt-8 space-y-7 text-zinc-200">
              <div>
                <p className="text-xl font-semibold italic text-zinc-100 md:text-2xl">{UNIT2_MS_TEXT.supportResistanceTitle[lang]}</p>
                <p className="mt-2 text-base leading-relaxed md:text-xl">{UNIT2_MS_TEXT.supportResistanceDesc[lang]}</p>
              </div>

              <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
                <Unit2RangesChart />
                <div className="space-y-6">
                  <div>
                    <p className="text-xl font-semibold italic text-zinc-100 md:text-2xl">{UNIT2_MS_TEXT.establishedResistanceTitle[lang]}</p>
                    <p className="mt-2 text-base leading-relaxed md:text-xl">{UNIT2_MS_TEXT.establishedResistanceDesc[lang]}</p>
                  </div>
                  <div>
                    <p className="text-xl font-semibold italic text-zinc-100 md:text-2xl">{UNIT2_MS_TEXT.establishedSupportTitle[lang]}</p>
                    <p className="mt-2 text-base leading-relaxed md:text-xl">{UNIT2_MS_TEXT.establishedSupportDesc[lang]}</p>
                  </div>
                </div>
              </div>

              <p className="text-base leading-relaxed md:text-xl">{UNIT2_MS_TEXT.fakeoutDesc[lang]}</p>
              <div className="flex justify-center">
                <Unit2FakeoutChart lang={lang} />
              </div>
            </div>

            <h3 className="mt-14 text-2xl font-bold tracking-[0.04em] text-zinc-100 md:text-4xl">{UI.changeStructure[lang]}</h3>
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
              <div className="space-y-7 text-zinc-200">
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-5 w-5 rounded-full border-2 border-red-500" />
                  <div>
                    <p className="text-xl font-semibold italic text-zinc-100 md:text-2xl">{UNIT2_MS_TEXT.reactionBasedTitle[lang]}</p>
                    <p className="mt-2 text-base leading-relaxed md:text-xl">{UNIT2_MS_TEXT.reactionBasedDesc[lang]}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xl font-semibold italic text-zinc-100 md:text-2xl">{UNIT2_MS_TEXT.liquidityOrStructureTitle[lang]}</p>
                  <p className="mt-2 text-base leading-relaxed md:text-xl">{UNIT2_MS_TEXT.liquidityOrStructureDesc[lang]}</p>
                </div>
              </div>

              <div className="flex justify-center lg:justify-end">
                <Unit2ChangeStructureChart lang={lang} />
              </div>
            </div>
          </motion.article>

          <motion.article
            id="unit2-trade-setups"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="mt-20 border-t border-lime-500/20 pt-10"
          >
            <h3 className="text-2xl font-bold tracking-[0.04em] text-zinc-100 md:text-4xl">{UI.tradeSetups[lang]}</h3>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div className="space-y-5 text-zinc-200">
                <p className="text-3xl font-bold tracking-[0.05em] text-zinc-100 md:text-5xl">{UNIT2_TS_TEXT.breakoutsTitle[lang]}</p>
                <p className="text-xl font-semibold italic text-zinc-100 md:text-2xl">{UNIT2_TS_TEXT.breakoutsLeadTitle[lang]}</p>
                <p className="text-base leading-relaxed md:text-xl">{UNIT2_TS_TEXT.breakoutsDescA[lang]}</p>
                <p className="text-base leading-relaxed md:text-xl">{UNIT2_TS_TEXT.breakoutsDescB[lang]}</p>
                <p className="text-base leading-relaxed md:text-xl">{UNIT2_TS_TEXT.breakoutsDescC[lang]}</p>
              </div>
              <div className="flex justify-center lg:justify-end">
                <Unit2SetupBreakoutsChart />
              </div>
            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div className="space-y-5 text-zinc-200">
                <p className="text-3xl font-bold tracking-[0.05em] text-zinc-100 md:text-5xl">{UNIT2_TS_TEXT.fakeoutsTitle[lang]}</p>
                <p className="text-xl font-semibold italic text-zinc-100 md:text-2xl">{UNIT2_TS_TEXT.fakeoutsLeadTitle[lang]}</p>
                <p className="text-base leading-relaxed md:text-xl">{UNIT2_TS_TEXT.fakeoutsDescA[lang]}</p>
                <p className="text-base leading-relaxed md:text-xl">{UNIT2_TS_TEXT.fakeoutsDescB[lang]}</p>
                <p className="text-base leading-relaxed md:text-xl">{UNIT2_TS_TEXT.fakeoutsDescC[lang]}</p>
              </div>
              <div className="flex justify-center lg:justify-end">
                <Unit2SetupFakeoutsChart />
              </div>
            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div className="space-y-5 text-zinc-200">
                <p className="text-3xl font-bold tracking-[0.05em] text-zinc-100 md:text-5xl">{UNIT2_TS_TEXT.onionsTitle[lang]}</p>
                <p className="text-xl font-semibold italic text-zinc-100 md:text-2xl">{UNIT2_TS_TEXT.onionsLeadTitle[lang]}</p>
                <p className="text-base leading-relaxed md:text-xl">{UNIT2_TS_TEXT.onionsDescA[lang]}</p>
                <p className="text-base leading-relaxed md:text-xl">{UNIT2_TS_TEXT.onionsDescB[lang]}</p>
                <p className="text-base leading-relaxed md:text-xl">{UNIT2_TS_TEXT.onionsDescC[lang]}</p>
              </div>
              <div className="flex justify-center lg:justify-end">
                <Unit2SetupOnionsChart />
              </div>
            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start">
              <div className="space-y-5 text-zinc-200">
                <p className="text-3xl font-bold tracking-[0.05em] text-zinc-100 md:text-5xl">{UNIT2_TS_TEXT.advantageTitle[lang]}</p>
                <p className="text-xl font-semibold italic text-zinc-100 md:text-2xl">{UNIT2_TS_TEXT.advantageLeadTitle[lang]}</p>
                <p className="text-base leading-relaxed md:text-xl">{UNIT2_TS_TEXT.advantageDescA[lang]}</p>
                <p className="text-base leading-relaxed md:text-xl">{UNIT2_TS_TEXT.advantageDescB[lang]}</p>
                <p className="text-base leading-relaxed md:text-xl">{UNIT2_TS_TEXT.advantageDescC[lang]}</p>
                <p className="text-base leading-relaxed md:text-xl">{UNIT2_TS_TEXT.advantageDescD[lang]}</p>
              </div>
              <div className="flex justify-center lg:justify-end">
                <Unit2SetupAdvantageChart lang={lang} />
              </div>
            </div>
          </motion.article>

          <motion.article
            id="unit2-advanced-concepts"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="mt-20 border-t border-lime-500/20 pt-10"
          >
            <h3 className="text-2xl font-bold tracking-[0.04em] text-zinc-100 md:text-4xl">{UI.advancedConcepts[lang]}</h3>

            <div className="mt-8 space-y-6 text-zinc-200">
              <p className="text-2xl font-bold tracking-[0.04em] text-zinc-100 md:text-3xl">{UNIT2_AC_TEXT.readingTitle[lang]}</p>
              <div>
                <p className="text-xl font-semibold italic text-zinc-100 md:text-2xl">{UNIT2_AC_TEXT.whyTitle[lang]}</p>
                <p className="mt-2 text-base leading-relaxed md:text-xl">{UNIT2_AC_TEXT.introA[lang]}</p>
              </div>
              <p className="text-base leading-relaxed md:text-xl">{UNIT2_AC_TEXT.introB[lang]}</p>
            </div>

            <div className="mt-10 overflow-hidden rounded-2xl border border-lime-500/25 bg-[#050705]/50 p-2 md:p-3">
              <img
                src="/images/unit2-advanced-concepts.png"
                alt={lang === "zh" ? "高级概念图示" : "Advanced concepts diagram"}
                className="h-auto w-full rounded-xl"
              />
            </div>

            <div className="mt-10 space-y-4 text-base leading-relaxed text-zinc-200 md:text-xl">
              <p>{UNIT2_AC_TEXT.pointA[lang]}</p>
              <p>{UNIT2_AC_TEXT.pointB[lang]}</p>
              <p>{UNIT2_AC_TEXT.pointC[lang]}</p>
              <p>{UNIT2_AC_TEXT.pointD[lang]}</p>
              <p>{UNIT2_AC_TEXT.pointE[lang]}</p>
              <p>{UNIT2_AC_TEXT.pointF[lang]}</p>
            </div>
          </motion.article>

          <motion.article
            id="unit2-liquidity"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="mt-20 border-t border-lime-500/20 pt-10"
          >
            <h3 className="text-2xl font-bold tracking-[0.04em] text-zinc-100 md:text-4xl">{UNIT2_LQ_TEXT.title[lang]}</h3>

            <div className="mt-8 space-y-5 text-zinc-200">
              <p className="text-2xl font-bold tracking-[0.04em] text-zinc-100 md:text-3xl">{UNIT2_LQ_TEXT.noticing[lang]}</p>
              <p className="text-base leading-relaxed md:text-xl">{UNIT2_LQ_TEXT.introA[lang]}</p>
              <p className="text-base leading-relaxed md:text-xl">{UNIT2_LQ_TEXT.introB[lang]}</p>

              <div className="grid gap-5 lg:grid-cols-2">
                <div className="rounded-xl border border-lime-500/30 bg-black/25 p-4">
                  <p className="text-lg font-semibold italic text-zinc-100 md:text-xl">{UNIT2_LQ_TEXT.beforeTitle[lang]}:</p>
                  <p className="mt-2 text-base leading-relaxed text-zinc-200 md:text-lg">{UNIT2_LQ_TEXT.beforeDesc[lang]}</p>
                </div>
                <div className="rounded-xl border border-lime-500/30 bg-black/25 p-4">
                  <p className="text-lg font-semibold italic text-zinc-100 md:text-xl">{UNIT2_LQ_TEXT.afterTitle[lang]}:</p>
                  <p className="mt-2 text-base leading-relaxed text-zinc-200 md:text-lg">{UNIT2_LQ_TEXT.afterDesc[lang]}</p>
                  <p className="mt-2 text-base leading-relaxed text-zinc-200 md:text-lg">{UNIT2_LQ_TEXT.afterBulletA[lang]}</p>
                  <p className="text-base leading-relaxed text-zinc-200 md:text-lg">{UNIT2_LQ_TEXT.afterBulletB[lang]}</p>
                </div>
              </div>

              <p className="text-base leading-relaxed md:text-xl">{UNIT2_LQ_TEXT.summary[lang]}</p>
            </div>

            <div className="mt-10 overflow-x-auto rounded-2xl border border-lime-500/25 bg-[#050705]/50 p-4 md:p-6">
              <div className="min-w-[980px]">
                <Unit2LiquidityPatternChart lang={lang} />
              </div>
            </div>

            <div className="mt-16">
              <p className="text-center text-2xl font-semibold tracking-[0.04em] text-zinc-100 md:text-4xl">{UNIT2_LQ_TEXT.entriesTitle[lang]}</p>

              <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
                <div className="space-y-5 text-zinc-200">
                  <p className="text-3xl font-bold tracking-[0.05em] text-zinc-100 md:text-5xl">{UNIT2_LQ_TEXT.paWithout[lang]}</p>
                  <p className="text-xl font-semibold italic text-zinc-100 md:text-2xl">{UNIT2_LQ_TEXT.riskShiftTitle[lang]}</p>
                  <p className="text-base leading-relaxed md:text-xl">{UNIT2_LQ_TEXT.riskShiftDescA[lang]}</p>
                  <p className="text-base leading-relaxed md:text-xl">{UNIT2_LQ_TEXT.riskShiftDescB[lang]}</p>
                  <p className="text-base leading-relaxed md:text-xl">{UNIT2_LQ_TEXT.riskShiftDescC[lang]}</p>
                </div>
                <div className="flex justify-center lg:justify-end">
                  <Unit2LiquidityWithoutHTFChart lang={lang} />
                </div>
              </div>

              <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
                <div>
                  <p className="text-base leading-relaxed text-zinc-200 md:text-[38px] md:leading-[1.45]">{UNIT2_LQ_TEXT.ltfReversal[lang]}</p>
                </div>
                <div className="flex justify-center lg:justify-end">
                  <Unit2LiquidityWithoutLTFChart lang={lang} />
                </div>
              </div>

              <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
                <div className="space-y-5 text-zinc-200">
                  <p className="text-3xl font-bold tracking-[0.05em] text-zinc-100 md:text-5xl">{UNIT2_LQ_TEXT.paWith[lang]}</p>
                  <p className="text-xl font-semibold italic text-zinc-100 md:text-2xl">{UNIT2_LQ_TEXT.lowerRisk[lang]}</p>
                  <p className="text-base leading-relaxed md:text-xl">{UNIT2_LQ_TEXT.lowerRiskDescA[lang]}</p>
                  <p className="text-base leading-relaxed md:text-xl">{UNIT2_LQ_TEXT.lowerRiskDescB[lang]}</p>
                </div>
                <div className="flex justify-center lg:justify-end">
                  <Unit2LiquidityWithHTFChart lang={lang} />
                </div>
              </div>

              <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
                <div>
                  <p className="text-base leading-relaxed text-zinc-200 md:text-[38px] md:leading-[1.45]">{UNIT2_LQ_TEXT.opportunity[lang]}</p>
                </div>
                <div className="flex justify-center lg:justify-end">
                  <Unit2LiquidityWithLTFChart lang={lang} />
                </div>
              </div>
            </div>
          </motion.article>
        </section>

        <section id="unit3" className="mt-16 border-t border-lime-500/20 pt-10">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
            <p className="text-xs uppercase tracking-[0.22em] text-lime-300">Unit 3</p>
            <h2 className="mt-2 text-3xl font-semibold text-zinc-100">{UI.unit3Title[lang]}</h2>
          </motion.div>

          <motion.article
            id="unit3-market-cycles"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="mt-12"
          >
            <h3 className="text-2xl font-bold tracking-[0.04em] text-zinc-100 md:text-4xl">{UI.marketCycles[lang]}</h3>
            <p className="mt-6 text-base leading-relaxed text-zinc-200 md:text-xl">
              {UNIT3_TEXT.overviewDesc[lang]}
            </p>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-start">
              <div className="space-y-8">
                {/* Drive Info */}
                <div className="rounded-xl border border-red-500/30 bg-black/25 p-5">
                  <p className="text-lg font-bold tracking-wider text-red-400 uppercase">{UNIT3_TEXT.driveTitle[lang]}</p>
                  <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                    {UNIT3_TEXT.drivePoints.map((p, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-red-500" />
                        {p[lang]}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Range Info */}
                <div className="rounded-xl border border-lime-500/30 bg-black/25 p-5">
                  <p className="text-lg font-bold tracking-wider text-lime-400 uppercase">{UNIT3_TEXT.rangeTitle[lang]}</p>
                  <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                    {UNIT3_TEXT.rangePoints.map((p, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-lime-500" />
                        {p[lang]}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Liquidity Info */}
                <div className="rounded-xl border border-blue-500/30 bg-black/25 p-5">
                  <p className="text-lg font-bold tracking-wider text-blue-400 uppercase">{UNIT3_TEXT.liquidityTitle[lang]}</p>
                  <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                    {UNIT3_TEXT.liquidityPoints.map((p, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-500" />
                        {p[lang]}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <Unit3OverviewChart lang={lang} />
                <div className="flex items-center justify-between px-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                  <span>{UI.ltfVsHtf[lang]}</span>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Drive Section */}
          <motion.article
            id="unit3-drive"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="mt-24 border-t border-lime-500/10 pt-16"
          >
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h3 className="text-xl font-bold uppercase tracking-widest text-red-400">{UI.huntingOpportunities[lang]}</h3>
                <p className="mt-4 text-base leading-relaxed text-zinc-200 md:text-lg">
                  {UNIT3_TEXT.driveHunting[lang]}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase tracking-widest text-zinc-400">{UI.whenToBePatient[lang]}</h3>
                <p className="mt-4 text-base leading-relaxed text-zinc-200 md:text-lg">
                  {UNIT3_TEXT.drivePatient[lang]}
                </p>
              </div>
            </div>

            <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-center">
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute -left-4 top-0 h-full w-1 bg-red-500/50" />
                  <p className="text-sm font-bold uppercase tracking-widest text-red-400">{UNIT3_TEXT.driveTitle[lang]}</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                    {UNIT3_TEXT.driveChartDesc[lang]}
                  </p>
                </div>
                <div className="flex items-center gap-4 rounded-lg bg-zinc-900/50 p-4 border border-white/5">
                   <HtfDriveChart />
                   <div className="space-y-2">
                     <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{UI.htfDrive[lang]}</p>
                     <p className="text-xs leading-relaxed text-zinc-400">{UNIT3_TEXT.driveHtfDesc[lang]}</p>
                   </div>
                </div>
              </div>
              <div className="relative">
                <Unit3DriveChart lang={lang} />
                <div className="absolute top-4 left-4 flex flex-col items-start gap-1">
                  <span className="bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-black uppercase">{UI.setupsToLookFor[lang]}</span>
                  <span className="text-[10px] text-zinc-400 uppercase">{UI.breakoutsFakeouts[lang]}</span>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Range Section */}
          <motion.article
            id="unit3-range"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="mt-24 border-t border-lime-500/10 pt-16"
          >
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h3 className="text-xl font-bold uppercase tracking-widest text-lime-400">{UI.huntingOpportunities[lang]}</h3>
                <p className="mt-4 text-base leading-relaxed text-zinc-200 md:text-lg">
                  {UNIT3_TEXT.rangeHunting[lang]}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase tracking-widest text-zinc-400">{UI.whenToBePatient[lang]}</h3>
                <p className="mt-4 text-base leading-relaxed text-zinc-200 md:text-lg">
                  {UNIT3_TEXT.rangePatient[lang]}
                </p>
              </div>
            </div>

            <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-center">
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute -left-4 top-0 h-full w-1 bg-lime-500/50" />
                  <p className="text-sm font-bold uppercase tracking-widest text-lime-400">{UNIT3_TEXT.rangeTitle[lang]}</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                    {UNIT3_TEXT.rangeChartDesc[lang]}
                  </p>
                </div>
                <div className="flex items-center gap-4 rounded-lg bg-zinc-900/50 p-4 border border-white/5">
                   <HtfRangeChart />
                   <div className="space-y-2">
                     <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{UI.htfRange[lang]}</p>
                     <p className="text-xs leading-relaxed text-zinc-400">{UNIT3_TEXT.rangeHtfDesc[lang]}</p>
                   </div>
                </div>
              </div>
              <div className="relative">
                <Unit3RangeChart lang={lang} />
                <div className="absolute top-[45%] right-[10%] flex flex-col items-end gap-1">
                  <span className="bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-black uppercase">{UI.setupsToLookFor[lang]}</span>
                  <span className="text-[10px] text-zinc-400 uppercase">{UI.breakoutsFakeouts[lang]}</span>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Liquidity Section */}
          <motion.article
            id="unit3-liquidity"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="mt-24 border-t border-lime-500/10 pt-16"
          >
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h3 className="text-xl font-bold uppercase tracking-widest text-blue-400">{UI.huntingOpportunities[lang]}</h3>
                <p className="mt-4 text-base leading-relaxed text-zinc-200 md:text-lg">
                  {UNIT3_TEXT.liquidityHunting[lang]}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase tracking-widest text-zinc-400">{UI.whenToBePatient[lang]}</h3>
                <p className="mt-4 text-base leading-relaxed text-zinc-200 md:text-lg">
                  {UNIT3_TEXT.liquidityPatient[lang]}
                </p>
              </div>
            </div>

            <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute -left-4 top-0 h-full w-1 bg-red-500/50" />
                    <p className="text-sm font-bold uppercase tracking-widest text-red-400">{UNIT3_TEXT.liquidityFakeoutTitle[lang]}</p>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                      {UNIT3_TEXT.liquidityFakeoutDesc[lang]}
                    </p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-4 top-0 h-full w-1 bg-blue-500/50" />
                    <p className="text-sm font-bold uppercase tracking-widest text-blue-400">{UNIT3_TEXT.liquidityContinuationTitle[lang]}</p>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                      {UNIT3_TEXT.liquidityContinuationDesc[lang]}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg bg-zinc-900/50 p-4 border border-white/5">
                   <HtfFakeoutChart />
                   <div className="space-y-2">
                     <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{UI.htfFakeout[lang]}</p>
                     <p className="text-xs leading-relaxed text-zinc-400">{UNIT3_TEXT.liquidityHtfDesc[lang]}</p>
                   </div>
                </div>
              </div>
              <div className="relative">
                <Unit3LiquidityChart lang={lang} />
              </div>
            </div>
          </motion.article>
        </section>

        {/* Unit 4: Execution */}
        <section id="unit4" className="mt-32 border-t border-white/5 pt-32">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-6xl"
          >
            <div className="flex items-center gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-lime-500/10 text-2xl font-black text-lime-400 shadow-[0_0_20px_rgba(132,204,22,0.1)]">
                04
              </div>
              <div>
                <h2 className="text-4xl font-black uppercase tracking-tighter text-white md:text-6xl">
                  {UNIT4_TEXT.unit4Title[lang]}
                </h2>
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.3em] text-lime-500/70">
                  {UNIT4_TEXT.executionStrategy[lang]}
                </p>
              </div>
            </div>

            {/* Part 1: Understanding Timeframes */}
            <div className="mt-24">
              <h3 className="text-2xl font-black uppercase tracking-widest text-white border-l-4 border-lime-500 pl-6">
                {UNIT4_TEXT.timeframesTitle[lang]}
              </h3>
              
              <div className="mt-12 grid gap-12 lg:grid-cols-2">
                <div className="space-y-8">
                  <div className="rounded-2xl bg-zinc-900/50 p-8 border border-white/5">
                    <h4 className="text-lg font-bold text-lime-400 uppercase tracking-wider">{UNIT4_TEXT.readingTfTitle[lang]}</h4>
                    <p className="mt-4 text-zinc-300 leading-relaxed">
                      {UNIT4_TEXT.readingTfDesc[lang]}
                    </p>
                    <div className="mt-6 p-4 bg-lime-500/5 rounded-lg border border-lime-500/10 italic text-sm text-zinc-400">
                      {UNIT4_TEXT.keyActivity[lang]}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-zinc-900/50 p-8 border border-white/5">
                    <h4 className="text-lg font-bold text-lime-400 uppercase tracking-wider">{UNIT4_TEXT.tfClarityTitle[lang]}</h4>
                    <p className="mt-4 text-zinc-300 leading-relaxed">
                      {UNIT4_TEXT.tfClarityDesc[lang]}
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="rounded-2xl bg-zinc-900/50 p-8 border border-white/5">
                    <h4 className="text-lg font-bold text-lime-400 uppercase tracking-wider">{UNIT4_TEXT.tfOfInterestTitle[lang]}</h4>
                    <p className="mt-4 text-zinc-300 leading-relaxed">
                      {UNIT4_TEXT.tfOfInterestDesc[lang]}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-zinc-900/50 p-8 border border-white/5">
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">{UNIT4_TEXT.exampleAlignmentTitle[lang]}</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <span className="w-16 font-mono text-lime-500">{UNIT4_TEXT.alignmentDaily[lang]}</span>
                        <span className="text-zinc-300">{UNIT4_TEXT.bullishBreakoutAbove[lang]}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="w-16 font-mono text-lime-500">{UNIT4_TEXT.alignment4H[lang]}</span>
                        <span className="text-zinc-300">{UNIT4_TEXT.bullishBreakoutAbove[lang]}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="w-16 font-mono text-red-500">{UNIT4_TEXT.alignment30M[lang]}</span>
                        <span className="text-zinc-300">{UNIT4_TEXT.bearishFakeout[lang]}</span>
                      </div>
                    </div>
                    <p className="mt-6 text-xs text-zinc-500 italic">
                      {UNIT4_TEXT.tfAlignmentExample[lang].split('\n').pop()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Part 2: Making Key Levels */}
            <div className="mt-32">
              <h3 className="text-2xl font-black uppercase tracking-widest text-white border-l-4 border-lime-500 pl-6">
                {UNIT4_TEXT.keyLevelsTitle[lang]}
              </h3>
              
              <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_2fr] lg:items-center">
                <div className="space-y-6">
                  <h4 className="text-xl font-bold text-white">{UNIT4_TEXT.whatLevelsTitle[lang]}</h4>
                  <p className="text-zinc-300 leading-relaxed">
                    {UNIT4_TEXT.whatLevelsDesc[lang]}
                  </p>
                  
                  <div className="grid gap-4 mt-8">
                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                      <span className="text-xs font-bold text-red-400 uppercase tracking-widest">{UNIT4_TEXT.majorLevelsTitle[lang]}</span>
                      <p className="mt-2 text-xs text-zinc-400 leading-relaxed">{UNIT4_TEXT.majorLevelsDesc[lang]}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-lime-500/5 border border-lime-500/20">
                      <span className="text-xs font-bold text-lime-400 uppercase tracking-widest">{UNIT4_TEXT.minorLevelsTitle[lang]}</span>
                      <p className="mt-2 text-xs text-zinc-400 leading-relaxed">{UNIT4_TEXT.minorLevelsDesc[lang]}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                      <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">{UNIT4_TEXT.unclearLevelsTitle[lang]}</span>
                      <p className="mt-2 text-xs text-zinc-400 leading-relaxed">{UNIT4_TEXT.unclearLevelsDesc[lang]}</p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <KeyLevelsChart lang={lang} />
                </div>
              </div>
            </div>

            {/* Part 3: Finding Trading Opportunities */}
            <div className="mt-32">
              <h3 className="text-2xl font-black uppercase tracking-widest text-white border-l-4 border-lime-500 pl-6">
                {UNIT4_TEXT.tradingPlanTitle[lang]}
              </h3>
              
              <div className="mt-12 grid gap-12 lg:grid-cols-[2fr_1fr] lg:items-center">
                <div className="relative">
                  <TradingPlanChart lang={lang} />
                </div>
                <div className="space-y-6">
                  <h4 className="text-xl font-bold text-white">{UNIT4_TEXT.examplePlanTitle[lang]}</h4>
                  <div className="space-y-4">
                    {UNIT4_TEXT.examplePlanPoints.map((p, i) => (
                      <div key={i} className="flex gap-4 p-4 rounded-xl bg-zinc-900/50 border border-white/5">
                        <span className="text-lime-500 font-bold">{i + 1}.</span>
                        <p className="text-sm text-zinc-300">{p[lang]}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-zinc-500 italic mt-4">
                    {UNIT4_TEXT.tradingPlanDesc[lang]}
                  </p>
                </div>
              </div>
            </div>

            {/* Part 4: Patience and Execution */}
            <div className="mt-32">
              <h3 className="text-2xl font-black uppercase tracking-widest text-white border-l-4 border-lime-500 pl-6">
                {UNIT4_TEXT.patienceTitle[lang]}
              </h3>
              
              <div className="mt-12 space-y-12">
                <div className="rounded-2xl bg-zinc-900/50 p-8 border border-white/5">
                  <h4 className="text-lg font-bold text-white uppercase tracking-wider">{UNIT4_TEXT.baseRangeTitle[lang]}</h4>
                  <p className="mt-4 text-zinc-300 leading-relaxed">
                    {UNIT4_TEXT.anythingCanHappenDesc[lang]}
                  </p>
                  <div className="mt-8">
                    <BaseRangeChart lang={lang} />
                  </div>
                </div>

                <div className="grid gap-12 lg:grid-cols-2">
                  <div className="rounded-2xl bg-zinc-900/50 p-8 border border-white/5">
                    <h4 className="text-lg font-bold text-lime-400 uppercase tracking-wider">{UNIT4_TEXT.possibilityATitle[lang]}</h4>
                    <p className="mt-4 text-zinc-300 leading-relaxed">
                      {UNIT4_TEXT.possibilityADesc[lang]}
                    </p>
                    <div className="mt-8">
                      <PossibilityChart type="A" lang={lang} />
                    </div>
                  </div>

                  <div className="rounded-2xl bg-zinc-900/50 p-8 border border-white/5">
                    <h4 className="text-lg font-bold text-red-400 uppercase tracking-wider">{UNIT4_TEXT.possibilityBTitle[lang]}</h4>
                    <p className="mt-4 text-zinc-300 leading-relaxed">
                      {UNIT4_TEXT.possibilityBDesc[lang]}
                    </p>
                    <div className="mt-8">
                      <PossibilityChart type="B" lang={lang} />
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-lime-500/10 border border-lime-500/20">
                  <p className="text-sm text-zinc-200 leading-relaxed italic">
                    {UNIT4_TEXT.crucialPatience[lang]}
                  </p>
                </div>
              </div>
            </div>

            {/* Part 5: Traffic and Advantage Levels */}
            <div className="mt-32">
              <h3 className="text-2xl font-black uppercase tracking-widest text-white border-l-4 border-lime-500 pl-6">
                {UNIT4_TEXT.trafficAdvantageTitle[lang]}
              </h3>
              
              <div className="mt-12">
                <TrafficLevelsChart lang={lang} />
              </div>
            </div>
          </motion.article>
        </section>
      </main>

      <button
        onClick={() => {
          document.getElementById("directory")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        className="fixed bottom-8 right-6 rounded-md border border-lime-400/70 bg-[#060906]/90 px-3 py-2 text-xs uppercase tracking-[0.12em] text-lime-100 shadow-[0_0_24px_rgba(74,222,128,0.2)] transition hover:border-lime-200"
      >
        {UI.returnToContents[lang]}
      </button>
    </div>
  );
}
