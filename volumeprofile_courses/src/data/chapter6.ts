import { SlideData } from './slides';

interface Candle {
  open: number;
  close: number;
  high: number;
  low: number;
}

interface Phase {
  count: number;
  drift: number;
  volatility: number;
  wick: number;
  cycle: number;
}

const round = (value: number, decimals = 2) => Number(value.toFixed(decimals));

function buildCandles(startPrice: number, phases: Phase[]) {
  const candles: Candle[] = [];
  let open = startPrice;
  let idx = 0;

  for (const phase of phases) {
    for (let i = 0; i < phase.count; i++) {
      const wave = Math.sin((idx + 1) * phase.cycle) * phase.volatility;
      const micro = Math.cos((idx + 5) * 0.31) * phase.volatility * 0.32;
      const close = round(open + phase.drift + wave + micro);
      const high = round(Math.max(open, close) + phase.wick * (0.65 + ((Math.sin(idx * 0.29) + 1) / 2) * 0.75));
      const low = round(Math.min(open, close) - phase.wick * (0.65 + ((Math.cos(idx * 0.27) + 1) / 2) * 0.75));
      candles.push({ open: round(open), close, high, low });
      open = close;
      idx += 1;
    }
  }

  return candles;
}

function buildProfileFromCandles(candles: Candle[], priceStep = 0.5) {
  const minPrice = Math.min(...candles.map((c) => c.low));
  const maxPrice = Math.max(...candles.map((c) => c.high));
  const minTick = Math.floor(minPrice / priceStep);
  const maxTick = Math.ceil(maxPrice / priceStep);
  const volumeMap = new Map<number, number>();

  for (const candle of candles) {
    const lowTick = Math.floor(candle.low / priceStep);
    const highTick = Math.ceil(candle.high / priceStep);
    const bodyLowTick = Math.floor(Math.min(candle.open, candle.close) / priceStep);
    const bodyHighTick = Math.ceil(Math.max(candle.open, candle.close) / priceStep);
    const closeTick = Math.round(candle.close / priceStep);

    for (let tick = lowTick; tick <= highTick; tick++) {
      let weight = 1;
      if (tick >= bodyLowTick && tick <= bodyHighTick) weight += 4;
      if (Math.abs(tick - closeTick) <= 1) weight += 1;
      volumeMap.set(tick, (volumeMap.get(tick) || 0) + weight);
    }
  }

  const profile: Array<{ price: number; volume: number }> = [];
  for (let tick = minTick; tick <= maxTick; tick++) {
    profile.push({ price: round(tick * priceStep), volume: volumeMap.get(tick) || 0 });
  }

  let pocIndex = 0;
  for (let i = 1; i < profile.length; i++) {
    if (profile[i].volume > profile[pocIndex].volume) pocIndex = i;
  }

  const totalVol = profile.reduce((sum, node) => sum + node.volume, 0);
  const targetVol = totalVol * 0.7;
  const valueArea = new Set<number>([pocIndex]);
  let areaVol = profile[pocIndex].volume;
  let up = pocIndex + 1;
  let down = pocIndex - 1;

  while (areaVol < targetVol && (up < profile.length || down >= 0)) {
    const upVol = up < profile.length ? profile[up].volume : -1;
    const downVol = down >= 0 ? profile[down].volume : -1;
    if (upVol >= downVol && upVol !== -1) {
      valueArea.add(up);
      areaVol += upVol;
      up++;
    } else if (downVol !== -1) {
      valueArea.add(down);
      areaVol += downVol;
      down--;
    } else {
      break;
    }
  }

  return profile
    .map((node, index) => ({
      ...node,
      isPOC: index === pocIndex,
      isVA: valueArea.has(index),
    }))
    .sort((a, b) => b.price - a.price);
}

const getPoc = (profile: Array<{ price: number; isPOC?: boolean }>) => profile.find((node) => node.isPOC)?.price ?? 0;
const getVaBounds = (profile: Array<{ price: number; isVA?: boolean }>) => {
  const values = profile.filter((node) => node.isVA).map((node) => node.price);
  return { vah: Math.max(...values), val: Math.min(...values) };
};

const mode1Candles = buildCandles(4518, [
  { count: 14, drift: 1.05, volatility: 1.7, wick: 0.9, cycle: 0.58 },
  { count: 10, drift: -1.35, volatility: 2.1, wick: 1.05, cycle: 0.66 },
  { count: 12, drift: 0.95, volatility: 1.6, wick: 0.85, cycle: 0.69 },
]);
const mode1Profile = buildProfileFromCandles(mode1Candles, 0.5);
const mode1Poc = getPoc(mode1Profile);

const mode2Candles = buildCandles(4542, [
  { count: 12, drift: -1.2, volatility: 1.8, wick: 0.9, cycle: 0.55 },
  { count: 8, drift: 2.4, volatility: 2.3, wick: 1.1, cycle: 0.62 },
  { count: 12, drift: -1.7, volatility: 2.2, wick: 1.0, cycle: 0.73 },
]);
const mode2Profile = buildProfileFromCandles(mode2Candles, 0.5);
const mode2Va = getVaBounds(mode2Profile);

const mode3Candles = buildCandles(4496, [
  { count: 10, drift: -0.95, volatility: 1.6, wick: 0.8, cycle: 0.53 },
  { count: 10, drift: 1.85, volatility: 2.0, wick: 0.95, cycle: 0.67 },
  { count: 13, drift: 0.9, volatility: 1.5, wick: 0.8, cycle: 0.76 },
]);
const mode3Profile = buildProfileFromCandles(mode3Candles, 0.5);
const mode3Poc = getPoc(mode3Profile);

const mode4Candles = buildCandles(4528, [
  { count: 10, drift: 1.15, volatility: 1.6, wick: 0.8, cycle: 0.56 },
  { count: 14, drift: -0.8, volatility: 1.9, wick: 1.0, cycle: 0.64 },
  { count: 11, drift: -1.1, volatility: 1.5, wick: 0.85, cycle: 0.71 },
]);
const mode4Profile = buildProfileFromCandles(mode4Candles, 0.5);
const mode4Va = getVaBounds(mode4Profile);

const mode5Candles = buildCandles(4472, [
  { count: 11, drift: 1.3, volatility: 1.8, wick: 0.9, cycle: 0.57 },
  { count: 9, drift: -0.65, volatility: 1.4, wick: 0.8, cycle: 0.66 },
  { count: 13, drift: 1.1, volatility: 1.7, wick: 0.95, cycle: 0.74 },
]);
const mode5Profile = buildProfileFromCandles(mode5Candles, 0.5);
const mode5Poc = getPoc(mode5Profile);

const mode6Candles = buildCandles(4510, [
  { count: 12, drift: 0.9, volatility: 1.6, wick: 0.8, cycle: 0.55 },
  { count: 11, drift: -1.75, volatility: 2.2, wick: 1.0, cycle: 0.67 },
  { count: 13, drift: -0.75, volatility: 1.6, wick: 0.85, cycle: 0.73 },
]);
const mode6Profile = buildProfileFromCandles(mode6Candles, 0.5);
const mode6Va = getVaBounds(mode6Profile);

export const chapter6Slides: SlideData[] = [
  {
    id: 'ch6-0-intro',
    title: { zh: '第六章：六种高概率融合模式', en: 'Chapter 6: Six High-Probability Confluence Patterns' },
    content: {
      zh: ['每个模式拆成两页：第一页讲执行参数，第二页讲底层逻辑。', '目标是让小白看完就知道哪里能做、哪里不能做。', '执行底线：至少 3 个证据，且 VP 与 PA 各至少 1 个。'],
      en: ['Each pattern is split into two pages: execution rules and logic breakdown.', 'Goal: beginners should know where to trade and where not to trade.', 'Minimum: 3 signals with at least one VP and one PA input.'],
    },
    script: {
      zh: '这一章我把每个融合模式都拆成两页。第一页你记规则，第二页你记原因。这样你不会只会背口诀，而是真的理解为什么这个交易成立。',
      en: 'In this chapter, every pattern is split into two pages. First page for execution rules, second page for reasoning. This keeps you from memorizing slogans and helps you understand why each trade works.',
    },
    chartType: 'title',
  },
  {
    id: 'ch6-1-hvn-demand-exec',
    title: { zh: '模式一：HVN + 需求区/供给区（执行页）', en: 'Pattern 1: HVN + Demand/Supply (Execution)' },
    content: {
      zh: ['关注区域：HVN 与需求区重叠部分。', '入场：价格进入重叠区后，等待 Pin Bar/吞没/BOS 确认。', '止损：需求区下沿或 HVN 下沿更远一侧 + 缓冲。目标：POC -> 对侧 VA -> 远端 HVN。'],
      en: ['Focus area: overlap between HVN and demand zone.', 'Entry: wait for Pin Bar, engulfing, or BOS after price reaches overlap.', 'Stop: beyond farther edge of demand or HVN plus buffer. Targets: POC -> opposite VA -> far HVN.'],
    },
    script: { zh: '先把范围画出来，再等待确认，不要进区就下单。这个模式的胜率来自重叠区和确认动作同时成立。', en: 'Map the zone first, then wait for confirmation. Do not auto-enter on first touch. Win rate comes from overlap plus trigger together.' },
    chartType: 'candle-profile',
    chartData: { candles: mode1Candles, profile: mode1Profile, highlights: [
      { type: 'zone', y1: mode1Poc + 2.2, y2: mode1Poc - 2.0, label: 'Confluence Demand Zone', color: '#60a5fa' },
      { type: 'line', y1: mode1Poc, label: 'POC / Fair Price Magnet', color: '#22c55e' },
      { type: 'line', y1: mode1Poc - 2.8, label: 'Stop Below Zone', color: '#ef4444' },
    ] },
  },
  {
    id: 'ch6-1b-hvn-demand-logic',
    title: { zh: '模式一：逻辑拆解页', en: 'Pattern 1: Logic Breakdown' },
    content: {
      zh: ['VP 的 HVN 说："历史上这里成交量巨大，市场有记忆。"', 'PA 的需求区说："机构曾在这里买入并推高价格。"', '两者指向同一件事：这个区域对大资金很重要，回测时更容易出现支撑。', '结论：只在重叠区边缘等确认，不在中间追单。'],
      en: ['VP says: "HVN marks heavy historical acceptance and market memory."', 'PA says: "Demand zone is where institutions previously bought and pushed price up."', 'Same message: this area matters to large players, so retests are more likely to hold.', 'Conclusion: wait at overlap edges with confirmation, do not chase mid-zone.'],
    },
    script: { zh: '你要把这页记成一句话，HVN是成交证据，需求区是行为证据。两者一致时，交易的可靠性会明显提高。', en: 'Remember this as one line: HVN is transaction evidence, demand zone is behavioral evidence. When they align, reliability rises sharply.' },
    chartType: 'candle-profile',
    chartData: { candles: mode1Candles, profile: mode1Profile, highlights: [
      { type: 'zone', y1: mode1Poc + 2.3, y2: mode1Poc - 2.1, label: 'HVN + Demand Overlap', color: '#60a5fa' },
      { type: 'line', y1: mode1Poc + 3.6, label: 'Wait for Bullish Trigger', color: '#f59e0b' },
      { type: 'line', y1: mode1Poc - 2.8, label: 'Invalidation', color: '#ef4444' },
    ] },
  },
  {
    id: 'ch6-2-lvn-fvg-exec',
    title: { zh: '模式二：LVN + FVG（执行页）', en: 'Pattern 2: LVN + FVG (Execution)' },
    content: {
      zh: ['执行A：已有顺势持仓时，把 LVN+FVG 当作加速通道。', '执行B：只在上沿/下沿找反应，不在区域中间开仓。', '中间区域只观察不交易，目标放在另一侧 HVN。'],
      en: ['Use A: if already in trend, treat LVN+FVG as acceleration corridor.', 'Use B: react only at upper or lower edge, never in the middle.', 'Middle zone is observation only. Place targets near opposite HVN.'],
    },
    script: { zh: '这是速度模式，不是支撑阻力模式。你在这页要建立的纪律就是，边缘做决策，中间不交易。', en: 'This is a speed pattern, not a support-resistance pattern. Your discipline is simple: decide at edges, do not trade the middle.' },
    chartType: 'candle-profile',
    chartData: { candles: mode2Candles, profile: mode2Profile, highlights: [
      { type: 'zone', y1: mode2Va.vah + 1.6, y2: mode2Va.val + 2.8, label: 'LVN / FVG Vacuum', color: '#ef4444' },
      { type: 'line', y1: mode2Va.vah + 1.8, label: 'Upper Edge Reaction', color: '#f59e0b' },
      { type: 'line', y1: mode2Va.val + 2.6, label: 'Lower Edge Reaction', color: '#22c55e' },
    ] },
  },
  {
    id: 'ch6-2b-lvn-fvg-logic',
    title: { zh: '模式二：逻辑拆解页', en: 'Pattern 2: Logic Breakdown' },
    content: {
      zh: ['VP 的 LVN 说："这里几乎没有成交，价格会快速穿过。"', 'PA 的 FVG 说："价格在这里留下了一个未被填补的缺口。"', '两者指向同一件事：这个区域缺乏双向交易。', '结论：价格进入后要么快速穿越，要么回填后快速离开，绝对不要在中间入场。'],
      en: ['VP says: "LVN means very little two-way trade, so price moves fast."', 'PA says: "FVG is an unfilled imbalance left by impulsive candles."', 'Same message: this area lacks balanced participation.', 'Conclusion: fast pass-through or fast fill-and-leave. Never enter in the middle.'],
    },
    script: { zh: '你给我的这段就是这个模式的核心，我完整保留在幻灯片里。小白只要牢牢记住“不要在中间开仓”，错误率会直接下降。', en: 'This is the exact core message, preserved on-slide. If beginners remember only one rule, it should be: never open in the middle of this zone.' },
    chartType: 'candle-profile',
    chartData: { candles: mode2Candles, profile: mode2Profile, highlights: [
      { type: 'zone', y1: mode2Va.vah + 1.7, y2: mode2Va.val + 2.6, label: 'Do Not Enter In Middle', color: '#ef4444' },
      { type: 'line', y1: mode2Va.vah + 1.9, label: 'Edge A', color: '#f59e0b' },
      { type: 'line', y1: mode2Va.val + 2.4, label: 'Edge B', color: '#22c55e' },
    ] },
  },
  {
    id: 'ch6-3-poc-ob-exec',
    title: { zh: '模式三：POC + 订单块（执行页）', en: 'Pattern 3: POC + Order Block (Execution)' },
    content: {
      zh: ['入场：POC 落在订单块内部，回测后出现吞没或结构反转再进场。', '止损：订单块边界外。', '目标：先看 POC 上下接受，再看 VA 边界与下个 HVN。'],
      en: ['Entry: POC inside order block, trigger on retest with engulfing or structure shift.', 'Stop: beyond order block boundary.', 'Targets: acceptance around POC first, then VA edge and next HVN.'],
    },
    script: { zh: '把 POC 当作订单块的重心。不是每个订单块都值得做，但被POC验证过的订单块优先级更高。', en: 'Treat POC as the center of gravity of the order block. Not every block is tradable, but POC-validated blocks deserve priority.' },
    chartType: 'candle-profile',
    chartData: { candles: mode3Candles, profile: mode3Profile, highlights: [
      { type: 'zone', y1: mode3Poc + 2.4, y2: mode3Poc - 1.8, label: 'Order Block Core', color: '#60a5fa' },
      { type: 'line', y1: mode3Poc, label: 'POC Pivot', color: '#22c55e' },
      { type: 'line', y1: mode3Poc - 2.6, label: 'Stop Outside OB', color: '#ef4444' },
    ] },
  },
  {
    id: 'ch6-3b-poc-ob-logic',
    title: { zh: '模式三：逻辑拆解页', en: 'Pattern 3: Logic Breakdown' },
    content: {
      zh: ['VP 的 POC 说："这是成交最密集的公允价。"', 'PA 的订单块说："这里是推动趋势的关键起点。"', '当 POC 落在订单块内：这个订单块从“形态好看”升级为“有真实成交背书”。', '结论：同类订单块里，优先执行被 POC 验证的那一个。'],
      en: ['VP says: "POC is the most traded fair value."', 'PA says: "Order block is the structural origin of impulse."', 'When POC sits inside OB, the setup is backed by real volume, not just shape.', 'Conclusion: among similar OBs, prioritize the POC-validated one.'],
    },
    script: { zh: '这页解决的是筛选问题。你会看到很多结构机会，但只有被成交密度确认的机会，才有更高的执行价值。', en: 'This page solves filtering. You will see many structural opportunities, but only those confirmed by volume concentration deserve higher execution priority.' },
    chartType: 'candle-profile',
    chartData: { candles: mode3Candles, profile: mode3Profile, highlights: [
      { type: 'zone', y1: mode3Poc + 2.2, y2: mode3Poc - 1.7, label: 'POC Inside OB', color: '#60a5fa' },
      { type: 'line', y1: mode3Poc + 4.8, label: 'Acceptance Above', color: '#f59e0b' },
      { type: 'line', y1: mode3Poc - 2.7, label: 'Invalidation', color: '#ef4444' },
    ] },
  },
  {
    id: 'ch6-4-vah-swing-exec',
    title: { zh: '模式四：VAH/VAL + Swing（执行页）', en: 'Pattern 4: VAH/VAL + Swing (Execution)' },
    content: {
      zh: ['做空场景：前日 VAH 与 Swing High 重叠。', '入场：回测失败 + 看跌确认K线。', '止损：Swing High 外侧；目标：POC 或 VAL，单边增强再看下个 HVN。'],
      en: ['Short setup: prior VAH overlaps swing high.', 'Entry: failed retest plus bearish confirmation candle.', 'Stop: beyond swing high; targets: POC or VAL, then next HVN if extension continues.'],
    },
    script: { zh: '这个模式适合做反打。重点是失败回测而不是第一次碰到就反手。', en: 'This pattern is ideal for reversal entries. Focus on failed retests, not first-touch reactions.' },
    chartType: 'candle-profile',
    chartData: { candles: mode4Candles, profile: mode4Profile, highlights: [
      { type: 'zone', y1: mode4Va.vah + 1.2, y2: mode4Va.vah - 1.1, label: 'Resistance Overlap', color: '#ef4444' },
      { type: 'line', y1: mode4Va.vah, label: 'VAH', color: '#f59e0b' },
      { type: 'line', y1: mode4Va.val + 0.8, label: 'Target POC / VAL', color: '#22c55e' },
    ] },
  },
  {
    id: 'ch6-4b-vah-swing-logic',
    title: { zh: '模式四：逻辑拆解页', en: 'Pattern 4: Logic Breakdown' },
    content: {
      zh: ['VP 的 VAH/VAL 说："这里是价值边界。"', 'PA 的 Swing High/Low 说："这里是结构转折点。"', '同一价位拥有双重身份，支撑阻力反应通常更强。', '结论：优先等“回测失败”后再入场，避免首次触碰抢跑。'],
      en: ['VP says: "VAH/VAL are value boundaries."', 'PA says: "Swing highs/lows are structural pivots."', 'One level has dual identity, so reaction strength often improves.', 'Conclusion: prefer failed-retest entries over first-touch front-run.'],
    },
    script: { zh: '你可以把这类位置看作关卡位。关卡位第一次到达容易假动作，失败回测才是更稳的触发。', en: 'Treat these levels as checkpoints. First touch often fakes out. Failed retest is usually the cleaner trigger.' },
    chartType: 'candle-profile',
    chartData: { candles: mode4Candles, profile: mode4Profile, highlights: [
      { type: 'zone', y1: mode4Va.vah + 1.1, y2: mode4Va.vah - 1.1, label: 'VAH + Swing Confluence', color: '#ef4444' },
      { type: 'line', y1: mode4Va.vah - 0.2, label: 'Failed Retest Trigger', color: '#f59e0b' },
      { type: 'line', y1: mode4Va.val + 0.8, label: 'Target Zone', color: '#22c55e' },
    ] },
  },
  {
    id: 'ch6-5-naked-liq-exec',
    title: { zh: '模式五：Naked POC + 流动性池（执行页）', en: 'Pattern 5: Naked POC + Liquidity Pool (Execution)' },
    content: {
      zh: ['用途：主要作为目标位，不是中间位逆势入场。', '当你有方向单时，把 Naked POC + 等高/等低作为高概率目标。', '接近目标时分批止盈，再看是否出现扫流动性后的反转。'],
      en: ['Primary use: target mapping, not blind countertrend entries in the middle.', 'For directional trades, use Naked POC plus equal highs/lows as high-probability objective.', 'Scale out near objective and watch post-liquidity reaction for full exit decision.'],
    },
    script: { zh: '这一套最适合优化止盈，而不是优化抄顶抄底。你把目标做对，盈亏比会更稳定。', en: 'This setup is best for improving exits, not for random top-bottom picking. Better target mapping stabilizes your risk-reward profile.' },
    chartType: 'candle-profile',
    chartData: { candles: mode5Candles, profile: mode5Profile, highlights: [
      { type: 'line', y1: mode5Poc + 4.2, label: 'Naked POC', color: '#22c55e' },
      { type: 'zone', y1: mode5Poc + 5.4, y2: mode5Poc + 3.5, label: 'Liquidity Pool', color: '#60a5fa' },
      { type: 'line', y1: mode5Poc + 6.2, label: 'Primary Objective', color: '#f59e0b' },
    ] },
  },
  {
    id: 'ch6-5b-naked-liq-logic',
    title: { zh: '模式五：逻辑拆解页', en: 'Pattern 5: Logic Breakdown' },
    content: {
      zh: ['VP 的 Naked POC 说："历史公允价尚未回测，存在磁吸任务。"', 'PA 的等高/等低说："止损流动性集中在外侧。"', '双引力同时存在：价格既会被公允价吸引，也会被流动性吸引。', '结论：把该区域优先当目标位，不在中间盲目逆势开仓。'],
      en: ['VP says: "Untested Naked POC is unfinished business and a magnet."', 'PA says: "Equal highs/lows cluster stop liquidity outside."', 'Dual pull exists: fair-value magnet plus liquidity magnet.', 'Conclusion: prioritize this area as target, not blind countertrend entry zone.'],
    },
    script: { zh: '这页的关键是角色定位。它更多是目标管理工具，而不是触发工具。', en: 'The key here is role definition. This is mostly a target-management tool, not a trigger tool.' },
    chartType: 'candle-profile',
    chartData: { candles: mode5Candles, profile: mode5Profile, highlights: [
      { type: 'line', y1: mode5Poc + 4.2, label: 'Magnet Price', color: '#22c55e' },
      { type: 'zone', y1: mode5Poc + 5.5, y2: mode5Poc + 3.6, label: 'Stop-Liquidity Cluster', color: '#60a5fa' },
      { type: 'line', y1: mode5Poc + 6.4, label: 'Target Completion', color: '#f59e0b' },
    ] },
  },
  {
    id: 'ch6-6-va-bos-exec',
    title: { zh: '模式六：VA 边界 + BOS/CHoCH（执行页）', en: 'Pattern 6: VA Boundary + BOS/CHoCH (Execution)' },
    content: {
      zh: ['先确认：跌破/突破 VA 边界并收盘确认。', '再执行：等待回测边界，出现顺方向确认K再入场。', '止损：结构失效位；目标：新发展POC与下一个 HVN。'],
      en: ['Confirm first: break through VA boundary with close validation.', 'Execute second: wait for retest and directional confirmation candle.', 'Stop: structure invalidation; targets: developing POC and next HVN.'],
    },
    script: { zh: '这类交易不能追第一根冲击K。先确认再回测，风险收益比会明显更健康。', en: 'Do not chase the first impulse candle here. Confirm first, retest second. Risk-reward improves significantly.' },
    chartType: 'candle-profile',
    chartData: { candles: mode6Candles, profile: mode6Profile, highlights: [
      { type: 'line', y1: mode6Va.val, label: 'VAL Boundary', color: '#f59e0b' },
      { type: 'line', y1: mode6Va.val - 2.6, label: 'BOS / CHoCH', color: '#ef4444' },
      { type: 'line', y1: mode6Va.val - 6.1, label: 'Target 1', color: '#22c55e' },
    ] },
  },
  {
    id: 'ch6-6b-va-bos-logic',
    title: { zh: '模式六：逻辑拆解页', en: 'Pattern 6: Logic Breakdown' },
    content: {
      zh: ['VP 的 VA 边界说："这里是价值共识的外沿。"', 'PA 的 BOS/CHoCH 说："结构方向发生了改变。"', '当 BOS 发生在 VA 边界附近：这是价值迁移，不是普通形态破位。', '结论：PA 决定时机，VP 决定位置与目标。'],
      en: ['VP says: "VA boundary is the edge of accepted value."', 'PA says: "BOS/CHoCH signals directional structure shift."', 'When BOS occurs near VA boundary, it is value migration, not random breakout.', 'Conclusion: PA decides timing, VP decides location and target path.'],
    },
    script: { zh: '这页把你从“看形态”升级到“看价值迁移”。这就是融合交易和普通形态交易的关键差别。', en: 'This page upgrades your lens from pattern watching to value migration. That is the key difference between integrated trading and plain pattern trading.' },
    chartType: 'candle-profile',
    chartData: { candles: mode6Candles, profile: mode6Profile, highlights: [
      { type: 'line', y1: mode6Va.val, label: 'Value Edge', color: '#f59e0b' },
      { type: 'line', y1: mode6Va.val - 2.5, label: 'Structure Shift Confirmed', color: '#ef4444' },
      { type: 'line', y1: mode6Va.val - 5.9, label: 'Next HVN Objective', color: '#22c55e' },
    ] },
  },
  {
    id: 'ch6-7-playbook',
    title: { zh: '第六章执行清单：六模式落地流程', en: 'Chapter 6 Playbook: Execution Workflow' },
    content: {
      zh: ['第一步归类：当前行情属于哪一种模式。', '第二步评分：至少 3 个证据，VP 与 PA 都要出现。', '第三步触发：只按确认执行，按结构止损，按 VP 路径止盈。'],
      en: ['Step 1 classify: identify which pattern is active.', 'Step 2 score: require at least three signals with both VP and PA present.', 'Step 3 trigger: execute only on confirmation, stop by structure, target by VP path.'],
    },
    script: {
      zh: '第六章到这里，你已经有了一套可复盘、可迭代、可训练的模式库。接下来你只需要在实盘里不断执行同一套流程，积累样本，然后优化细节。',
      en: 'By this point, you have a repeatable and trainable pattern library. The next step is to execute the same process in live markets, collect samples, and refine details.',
    },
    chartType: 'title',
  },
];
