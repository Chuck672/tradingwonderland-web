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

function round(value: number, decimals = 2) {
  return Number(value.toFixed(decimals));
}

function buildCandles(startPrice: number, phases: Phase[]): Candle[] {
  const candles: Candle[] = [];
  let currentOpen = startPrice;
  let globalIndex = 0;

  for (const phase of phases) {
    for (let i = 0; i < phase.count; i++) {
      const wave = Math.sin((globalIndex + 1) * phase.cycle) * phase.volatility;
      const micro = Math.cos((globalIndex + 3) * 0.37) * phase.volatility * 0.35;
      const close = round(currentOpen + phase.drift + wave + micro);
      const bodyTop = Math.max(currentOpen, close);
      const bodyBottom = Math.min(currentOpen, close);

      const highWickFactor = 0.55 + ((Math.sin((globalIndex + 1) * 0.41) + 1) / 2) * 0.9;
      const lowWickFactor = 0.55 + ((Math.cos((globalIndex + 1) * 0.29) + 1) / 2) * 0.9;
      const high = round(bodyTop + phase.wick * highWickFactor);
      const low = round(bodyBottom - phase.wick * lowWickFactor);

      candles.push({
        open: round(currentOpen),
        close,
        high,
        low,
      });

      currentOpen = close;
      globalIndex++;
    }
  }

  return candles;
}

function buildProfileFromCandles(candles: Candle[], priceStep = 0.5) {
  const minPrice = Math.min(...candles.map((c) => c.low));
  const maxPrice = Math.max(...candles.map((c) => c.high));
  const minTick = Math.floor(minPrice / priceStep);
  const maxTick = Math.ceil(maxPrice / priceStep);

  const profileMap = new Map<number, number>();

  for (const candle of candles) {
    const highTick = Math.ceil(candle.high / priceStep);
    const lowTick = Math.floor(candle.low / priceStep);
    const bodyHigh = Math.max(candle.open, candle.close);
    const bodyLow = Math.min(candle.open, candle.close);
    const bodyHighTick = Math.ceil(bodyHigh / priceStep);
    const bodyLowTick = Math.floor(bodyLow / priceStep);
    const closeTick = Math.round(candle.close / priceStep);

    for (let tick = lowTick; tick <= highTick; tick++) {
      let weight = 1;
      if (tick >= bodyLowTick && tick <= bodyHighTick) weight += 4;
      if (Math.abs(tick - closeTick) <= 1) weight += 1;
      profileMap.set(tick, (profileMap.get(tick) || 0) + weight);
    }
  }

  const profile: Array<{ price: number; volume: number }> = [];
  for (let tick = minTick; tick <= maxTick; tick++) {
    profile.push({
      price: round(tick * priceStep, 2),
      volume: profileMap.get(tick) || 0,
    });
  }

  let pocIndex = 0;
  for (let i = 1; i < profile.length; i++) {
    if (profile[i].volume > profile[pocIndex].volume) pocIndex = i;
  }

  const total = profile.reduce((sum, node) => sum + node.volume, 0);
  const target = total * 0.7;
  let areaVolume = profile[pocIndex].volume;
  let up = pocIndex + 1;
  let down = pocIndex - 1;
  const valueTicks = new Set<number>([pocIndex]);

  while (areaVolume < target && (up < profile.length || down >= 0)) {
    const upVol = up < profile.length ? profile[up].volume : -1;
    const downVol = down >= 0 ? profile[down].volume : -1;

    if (upVol >= downVol && upVol !== -1) {
      areaVolume += upVol;
      valueTicks.add(up);
      up++;
    } else if (downVol !== -1) {
      areaVolume += downVol;
      valueTicks.add(down);
      down--;
    } else {
      break;
    }
  }

  return profile
    .map((node, index) => ({
      ...node,
      isPOC: index === pocIndex,
      isVA: valueTicks.has(index),
    }))
    .sort((a, b) => b.price - a.price);
}

function getPoc(profile: Array<{ price: number; isPOC?: boolean }>) {
  return profile.find((node) => node.isPOC)?.price ?? profile[Math.floor(profile.length / 2)]?.price ?? 0;
}

function getVaBounds(profile: Array<{ price: number; isVA?: boolean }>) {
  const prices = profile.filter((node) => node.isVA).map((node) => node.price);
  return {
    vah: Math.max(...prices),
    val: Math.min(...prices),
  };
}

function getCandleRange(candles: Candle[]) {
  return {
    high: Math.max(...candles.map((c) => c.high)),
    low: Math.min(...candles.map((c) => c.low)),
  };
}

function levelInRange(level: number, range: { high: number; low: number }) {
  return level >= range.low && level <= range.high;
}

function normalizeLevels(entry: number, stop: number, target: number, side: 'long' | 'short') {
  if (side === 'long') {
    const fixedStop = stop < entry ? stop : entry - 2.5;
    const fixedTarget = target > entry ? target : entry + 4.5;
    return { entry, stop: fixedStop, target: fixedTarget };
  }

  const fixedStop = stop > entry ? stop : entry + 2.5;
  const fixedTarget = target < entry ? target : entry - 4.5;
  return { entry, stop: fixedStop, target: fixedTarget };
}

function findEntryCandle(candles: Candle[], entry: number, side: 'long' | 'short', preferFromRatio = 0.35) {
  const start = Math.floor(candles.length * preferFromRatio);

  const strictCandidates = candles
    .map((candle, index) => ({ candle, index }))
    .filter(({ candle, index }) => {
      if (index < start) return false;
      const touched = candle.low <= entry && candle.high >= entry;
      if (!touched) return false;
      if (side === 'long') return candle.close >= entry;
      return candle.close <= entry;
    });

  if (strictCandidates.length > 0) {
    return strictCandidates.reduce((best, current) => {
      const bestScore = Math.abs(best.candle.close - entry);
      const currentScore = Math.abs(current.candle.close - entry);
      return currentScore < bestScore ? current : best;
    }).index;
  }

  const softCandidates = candles
    .map((candle, index) => ({ candle, index }))
    .filter(({ candle, index }) => index >= start && candle.low <= entry && candle.high >= entry);

  if (softCandidates.length > 0) {
    return softCandidates.reduce((best, current) => {
      const bestScore = Math.abs((best.candle.high + best.candle.low) / 2 - entry);
      const currentScore = Math.abs((current.candle.high + current.candle.low) / 2 - entry);
      return currentScore < bestScore ? current : best;
    }).index;
  }

  return candles.reduce(
    (bestIndex, candle, index) => {
      const belowDistance = Math.max(0, candle.low - entry);
      const aboveDistance = Math.max(0, entry - candle.high);
      const distanceToRange = belowDistance + aboveDistance;
      const bestCandle = candles[bestIndex];
      const bestBelow = Math.max(0, bestCandle.low - entry);
      const bestAbove = Math.max(0, entry - bestCandle.high);
      const bestDistance = bestBelow + bestAbove;
      return distanceToRange < bestDistance ? index : bestIndex;
    },
    start,
  );
}

const vaRotationCandles = buildCandles(4200, [
  { count: 14, drift: 0.2, volatility: 2.6, wick: 1.2, cycle: 0.7 },
  { count: 16, drift: -0.1, volatility: 2.1, wick: 1.1, cycle: 0.63 },
  { count: 12, drift: 0.15, volatility: 1.8, wick: 1.0, cycle: 0.81 },
]);
const vaRotationProfile = buildProfileFromCandles(vaRotationCandles, 0.5);
const vaRotationBounds = getVaBounds(vaRotationProfile);

const pocMagnetCandles = buildCandles(4060, [
  { count: 12, drift: 0.65, volatility: 2.2, wick: 1.1, cycle: 0.55 },
  { count: 10, drift: -0.8, volatility: 2.4, wick: 1.2, cycle: 0.76 },
  { count: 12, drift: 0.3, volatility: 1.7, wick: 1.1, cycle: 0.68 },
  { count: 10, drift: -0.2, volatility: 1.5, wick: 1.0, cycle: 0.59 },
]);
const pocMagnetProfile = buildProfileFromCandles(pocMagnetCandles, 0.5);
const pocMagnetPoc = getPoc(pocMagnetProfile);

const lvnBreakoutCandles = buildCandles(3980, [
  { count: 18, drift: 0.1, volatility: 1.9, wick: 1.1, cycle: 0.64 },
  { count: 8, drift: 2.1, volatility: 2.3, wick: 0.9, cycle: 0.72 },
  { count: 16, drift: 1.2, volatility: 2.0, wick: 1.1, cycle: 0.61 },
]);
const lvnBreakoutProfile = buildProfileFromCandles(lvnBreakoutCandles, 0.5);
const lvnBreakoutBounds = getVaBounds(lvnBreakoutProfile);

const nakedPocCandles = buildCandles(4120, [
  { count: 14, drift: 0.1, volatility: 1.8, wick: 1.2, cycle: 0.7 },
  { count: 12, drift: 1.6, volatility: 2.1, wick: 1.0, cycle: 0.64 },
  { count: 14, drift: -0.3, volatility: 1.9, wick: 1.2, cycle: 0.57 },
  { count: 10, drift: -1.1, volatility: 2.2, wick: 1.1, cycle: 0.69 },
]);
const nakedPocProfile = buildProfileFromCandles(nakedPocCandles, 0.5);
const nakedPocLevel = getPoc(nakedPocProfile);

const openVsPrevVaCandles = buildCandles(4150, [
  { count: 10, drift: 1.5, volatility: 2.0, wick: 1.0, cycle: 0.66 },
  { count: 12, drift: -0.9, volatility: 2.2, wick: 1.1, cycle: 0.77 },
  { count: 14, drift: -0.4, volatility: 1.7, wick: 1.1, cycle: 0.54 },
  { count: 8, drift: 1.1, volatility: 1.9, wick: 0.9, cycle: 0.61 },
]);
const openVsPrevVaProfile = buildProfileFromCandles(openVsPrevVaCandles, 0.5);
const openVsPrevVaBounds = getVaBounds(openVsPrevVaProfile);
const openVsPrevVaPoc = getPoc(openVsPrevVaProfile);

const profileShapeCandles = buildCandles(4025, [
  { count: 10, drift: 1.8, volatility: 2.2, wick: 0.9, cycle: 0.58 },
  { count: 14, drift: 0.2, volatility: 1.6, wick: 1.0, cycle: 0.62 },
  { count: 8, drift: -2.4, volatility: 2.5, wick: 1.2, cycle: 0.67 },
  { count: 12, drift: -0.3, volatility: 1.7, wick: 1.1, cycle: 0.75 },
]);
const profileShapeProfile = buildProfileFromCandles(profileShapeCandles, 0.5);

const confluenceCandles = buildCandles(4080, [
  { count: 14, drift: 0.35, volatility: 1.9, wick: 1.0, cycle: 0.66 },
  { count: 12, drift: 1.1, volatility: 2.1, wick: 1.0, cycle: 0.62 },
  { count: 14, drift: -0.2, volatility: 1.5, wick: 1.0, cycle: 0.54 },
  { count: 12, drift: 0.8, volatility: 1.8, wick: 0.9, cycle: 0.59 },
]);
const confluenceProfile = buildProfileFromCandles(confluenceCandles, 0.5);
const confluencePoc = getPoc(confluenceProfile);
const confluenceBounds = getVaBounds(confluenceProfile);

const vaRotationRange = getCandleRange(vaRotationCandles);
const vaRotationSetup = normalizeLevels(vaRotationBounds.vah - 0.6, vaRotationBounds.vah + 2.0, getPoc(vaRotationProfile), 'short');
const vaRotationEntry = vaRotationSetup.entry;
const vaRotationStop = vaRotationSetup.stop;
const vaRotationTarget = vaRotationSetup.target;
const vaRotationEntryCandle = findEntryCandle(vaRotationCandles, vaRotationEntry, 'short', 0.45);

const pocMagnetRange = getCandleRange(pocMagnetCandles);
const pocMagnetSetup = normalizeLevels(pocMagnetPoc + 6.8, pocMagnetPoc + 10.4, pocMagnetPoc, 'short');
const pocMagnetEntry = pocMagnetSetup.entry;
const pocMagnetStop = pocMagnetSetup.stop;
const pocMagnetTarget = pocMagnetSetup.target;
const pocMagnetEntryCandle = findEntryCandle(pocMagnetCandles, pocMagnetEntry, 'short', 0.45);

const lvnBreakoutRange = getCandleRange(lvnBreakoutCandles);
const lvnBreakoutSetup = normalizeLevels(lvnBreakoutBounds.vah + 1.2, lvnBreakoutBounds.vah - 2.3, lvnBreakoutBounds.vah + 8.4, 'long');
const lvnBreakoutEntry = lvnBreakoutSetup.entry;
const lvnBreakoutStop = lvnBreakoutSetup.stop;
const lvnBreakoutTarget = lvnBreakoutSetup.target;
const lvnBreakoutEntryCandle = findEntryCandle(lvnBreakoutCandles, lvnBreakoutEntry, 'long', 0.45);

const nakedPocRange = getCandleRange(nakedPocCandles);
const nakedPocSetup = normalizeLevels(nakedPocLevel + 0.6, nakedPocLevel - 3.1, nakedPocLevel + 5.5, 'long');
const nakedPocEntry = nakedPocSetup.entry;
const nakedPocStop = nakedPocSetup.stop;
const nakedPocTarget = nakedPocSetup.target;
const nakedPocEntryCandle = findEntryCandle(nakedPocCandles, nakedPocEntry, 'long', 0.5);

const openVsPrevVaRange = getCandleRange(openVsPrevVaCandles);
const openVsPrevVaSetup = normalizeLevels(
  openVsPrevVaBounds.vah + 1.0,
  openVsPrevVaBounds.vah + 3.2,
  openVsPrevVaPoc,
  'short',
);
const openVsPrevVaEntry = openVsPrevVaSetup.entry;
const openVsPrevVaStop = openVsPrevVaSetup.stop;
const openVsPrevVaTarget = openVsPrevVaSetup.target;
const openVsPrevVaEntryCandle = findEntryCandle(openVsPrevVaCandles, openVsPrevVaEntry, 'short', 0.45);

const profileShapePoc = getPoc(profileShapeProfile);
const profileShapeRange = getCandleRange(profileShapeCandles);
const profileShapeSetup = normalizeLevels(profileShapePoc - 1.8, profileShapePoc + 3.2, profileShapePoc - 8.0, 'short');
const profileShapeEntry = profileShapeSetup.entry;
const profileShapeStop = profileShapeSetup.stop;
const profileShapeTarget = profileShapeSetup.target;
const profileShapeEntryCandle = findEntryCandle(profileShapeCandles, profileShapeEntry, 'short', 0.45);

export const chapter4Slides: SlideData[] = [
  {
    id: 'ch4-0-intro',
    title: {
      zh: '第四章：交易策略与实战应用',
      en: 'Chapter 4: Trading Strategies and Live Application',
    },
    content: {
      zh: [
        '本章目标：把 Volume Profile 术语变成可执行交易规则。',
        '每个策略都包含入场、止损、目标位、适用环境和场景图示。',
        '图示提升为高密度蜡烛与更细精度分布，便于观察细节。',
      ],
      en: [
        'Objective: Convert Volume Profile concepts into executable trading rules.',
        'Each strategy includes entry, stop, targets, environment, and chart scenario.',
        'Visuals now use denser candles and finer profile precision for better context.',
      ],
    },
    script: {
      zh: '第四章完全聚焦实战。你不需要记更多名词，而是要把前面学过的 POC、价值区、节点结构，转换成固定流程。每个策略我都会给出核心逻辑、具体入场条件、止损方法、目标位设置、适用环境和图示场景，这样你可以直接拿去做复盘和盘前计划。',
      en: 'Chapter 4 is fully execution-focused. You do not need more terminology. You need a repeatable process that turns POC, value area, and node structure into decisions. Each strategy includes core logic, specific entry rules, stop placement, target planning, suitable market environment, and a visual scenario you can apply in replay and pre-market planning.',
    },
    chartType: 'title',
  },
  {
    id: 'ch4-1-va-rotation',
    title: {
      zh: '策略1：价值区回归交易（Value Area Rotation）',
      en: 'Strategy 1: Value Area Rotation',
    },
    content: {
      zh: [
        '核心逻辑：平衡市场中，价格偏离价值区后常回归。',
        '入场：触及 VAH 或 VAL 后出现反转结构，再进场。',
        '止损：放在当次假突破极值外 1 到 1.5 倍波动单位。',
        '目标：第一目标 POC，第二目标对侧边界。',
        '环境与场景：D 形分布、开盘轮动，非趋势日效果最好。',
      ],
      en: [
        'Core logic: In balance, price often rotates back after value extremes.',
        'Entry: Wait for rejection at VAH or VAL, then enter on reversal structure.',
        'Stop: Place beyond the failed extreme by 1 to 1.5 volatility units.',
        'Targets: First target at POC, second target at opposite value edge.',
        'Environment: Best in D-shape sessions and rotational opens.',
      ],
    },
    chartType: 'candle-profile',
    chartData: {
      candles: vaRotationCandles,
      profile: vaRotationProfile,
      highlights: [
        { type: 'line', y1: vaRotationBounds.vah, label: 'VAH Sell Zone', color: '#60a5fa' },
        { type: 'line', y1: vaRotationBounds.val, label: 'VAL Buy Zone', color: '#60a5fa' },
        { type: 'zone', y1: vaRotationBounds.vah - 1.5, y2: vaRotationBounds.val + 1.5, label: 'Rotation Core', color: '#22c55e' },
      ],
      title: 'Fade edges, target fair value center',
    },
    script: {
      zh: '价值区回归是日内最稳定的策略之一，但前提是市场处于平衡。执行时先确认当日分布近似 D 形，然后只在价值区边缘做反向。比如价格刺破上沿却无法持续成交，出现回落结构后做空，止损放在假突破高点之外，第一目标看 POC，第二目标看价值区下沿。关键是等待确认，不要在第一次触碰时盲目逆势。',
      en: 'Value area rotation is one of the most stable intraday tactics, but only in balance conditions. Confirm a D-like profile first, then fade only at value edges. For example, if price probes above VAH but fails to gain acceptance, short after reversal structure forms. Place stop beyond the failed high, target POC first, then the opposite value edge. The edge comes from confirmation, not from blind first-touch fading.',
    },
  },
  {
    id: 'ch4-1-va-rotation-visual',
    title: {
      zh: '策略1图示页',
      en: 'Strategy 1 Visual',
    },
    visualOnly: true,
    chartType: 'candle-profile',
    chartData: {
      candles: vaRotationCandles,
      profile: vaRotationProfile,
      highlights: [
        { type: 'line', y1: vaRotationEntry, x: vaRotationEntryCandle, label: 'Entry (Short)', color: '#f59e0b' },
        { type: 'line', y1: vaRotationStop, x: vaRotationEntryCandle, label: 'Stop Loss', color: '#ef4444' },
        ...(levelInRange(vaRotationTarget, vaRotationRange)
          ? [{ type: 'line' as const, y1: vaRotationTarget, x: vaRotationEntryCandle, label: 'Take Profit 1', color: '#22c55e' }]
          : []),
      ],
    },
    script: {
      zh: '这一页只看执行标记。橙线是做空入场位，触发条件是上沿假突破后重新回落。红线是止损位，必须放在假突破高点之外。绿线是第一止盈位，先减仓锁定收益。若走势继续轮转，再看对侧价值边界作为第二目标。',
      en: 'This page is execution only. Orange marks the short entry after failed acceptance above value. Red marks the stop beyond the failed high. Green marks the first take-profit level where you scale out. If rotation continues, the opposite value edge becomes the secondary objective.',
    },
  },
  {
    id: 'ch4-2-poc-magnet',
    title: {
      zh: '策略2：POC 磁吸效应交易',
      en: 'Strategy 2: POC Magnet Trade',
    },
    content: {
      zh: [
        '核心逻辑：远离公允价后，若无新增成交支持，价格易回吸至 POC。',
        '入场：价格脱离后出现动能衰减并重回微观结构内。',
        '止损：放在最近冲刺波段极值之外。',
        '目标：主目标 POC；若成交继续堆积，可延伸到对侧 VA。',
        '环境与场景：消息冲高回落、冲低回收、午盘修复段。',
      ],
      en: [
        'Core logic: When price extends without acceptance, it is pulled back to POC.',
        'Entry: Enter after momentum decay and structure re-entry from extension.',
        'Stop: Place beyond the latest expansion extreme.',
        'Targets: Primary target at POC, extension target at opposite value edge.',
        'Environment: News spikes, failed breakdowns, and mid-session repair phases.',
      ],
    },
    chartType: 'candle-profile',
    chartData: {
      candles: pocMagnetCandles,
      profile: pocMagnetProfile,
      highlights: [
        { type: 'line', y1: pocMagnetPoc, label: 'POC Magnet', color: '#22c55e' },
        { type: 'zone', y1: pocMagnetPoc + 10, y2: pocMagnetPoc + 6, label: 'Overextension', color: '#ef4444' },
      ],
      title: 'Distance from fair price creates mean-reversion pressure',
    },
    script: {
      zh: 'POC 磁吸策略本质是公允价回归。先看价格是否显著偏离控制点，再看偏离区有没有形成新的成交密集。如果没有，就说明市场还没有接受这个新价格，回归概率高。入场不建议追第一根反向线，而是等价格回到短周期结构内部再跟进。该策略胜率不错，但要避免在强趋势日连续逆势执行。',
      en: 'The POC magnet setup is fair-price reversion. First assess whether price is materially displaced from control. Then verify if that displacement has built new acceptance. If not, reversion probability increases. Avoid jumping on the first opposing candle. Wait until price re-enters local structure and then execute. This setup has strong hit rate, but avoid repeating it against persistent trend days.',
    },
  },
  {
    id: 'ch4-2-poc-magnet-visual',
    title: {
      zh: '策略2图示页',
      en: 'Strategy 2 Visual',
    },
    visualOnly: true,
    chartType: 'candle-profile',
    chartData: {
      candles: pocMagnetCandles,
      profile: pocMagnetProfile,
      highlights: [
        { type: 'line', y1: pocMagnetEntry, x: pocMagnetEntryCandle, label: 'Entry (Short)', color: '#f59e0b' },
        { type: 'line', y1: pocMagnetStop, x: pocMagnetEntryCandle, label: 'Stop Loss', color: '#ef4444' },
        ...(levelInRange(pocMagnetTarget, pocMagnetRange)
          ? [{ type: 'line' as const, y1: pocMagnetTarget, x: pocMagnetEntryCandle, label: 'Take Profit 1', color: '#22c55e' }]
          : []),
      ],
    },
    script: {
      zh: '这一页是 POC 磁吸的执行图。价格远离公允价后，橙线给出反向入场触发。红线止损放在冲刺极值外，避免被噪音扫掉。绿线是回归目标，通常先看 POC。若到达后量能衰减，建议先锁定大部分仓位。',
      en: 'This is the execution map for the POC magnet setup. After displacement from fair price, orange marks the reversal entry trigger. Red marks the stop beyond the expansion extreme. Green marks the reversion target, usually at POC. If momentum fades there, lock in most of the position.',
    },
  },
  {
    id: 'ch4-3-lvn-breakout',
    title: {
      zh: '策略3：LVN 突破加速交易',
      en: 'Strategy 3: LVN Breakout Acceleration',
    },
    content: {
      zh: [
        '核心逻辑：LVN 是低接受区，价格穿越后常快速寻找到下一个高流动区。',
        '入场：突破 LVN 后回测不破，二次启动时顺势进场。',
        '止损：放在回测低点或突破失败点外。',
        '目标：下一个 HVN、前高前低、或固定风险回报比。',
        '环境与场景：失衡扩张、趋势日、关键数据发布后。',
      ],
      en: [
        'Core logic: LVN is low acceptance. Breaks often accelerate toward next HVN.',
        'Entry: Enter on successful retest after LVN break and re-acceleration.',
        'Stop: Place beyond retest failure or breakout invalidation point.',
        'Targets: Next HVN, prior swing level, or predefined R-multiple objective.',
        'Environment: Imbalance expansions, trend sessions, post-data volatility.',
      ],
    },
    chartType: 'candle-profile',
    chartData: {
      candles: lvnBreakoutCandles,
      profile: lvnBreakoutProfile,
      highlights: [
        { type: 'zone', y1: lvnBreakoutBounds.vah + 2, y2: lvnBreakoutBounds.vah - 1, label: 'LVN Passage', color: '#ef4444' },
        { type: 'zone', y1: lvnBreakoutBounds.vah + 9, y2: lvnBreakoutBounds.vah + 5, label: 'Next HVN Target', color: '#22c55e' },
      ],
      title: 'Break low acceptance, ride initiative flow',
    },
    script: {
      zh: 'LVN 交易不是简单追突破，而是做突破后的确认。价格第一次冲过低成交区时速度很快，但也容易假突破。高质量做法是等回测，确认该区域由阻力转为支撑，再在二次推进时入场。目标优先看下一段成交密集区，因为价格通常会被那里吸引并减速。',
      en: 'LVN trading is not blind breakout chasing. It is breakout confirmation. Price can slice through low-acceptance zones quickly, but first breaks can fail. Higher-quality execution waits for retest. If the zone flips from resistance to support, enter on second push. Target the next high-volume cluster where price is likely to decelerate.',
    },
  },
  {
    id: 'ch4-3-lvn-breakout-visual',
    title: {
      zh: '策略3图示页',
      en: 'Strategy 3 Visual',
    },
    visualOnly: true,
    chartType: 'candle-profile',
    chartData: {
      candles: lvnBreakoutCandles,
      profile: lvnBreakoutProfile,
      highlights: [
        { type: 'line', y1: lvnBreakoutEntry, x: lvnBreakoutEntryCandle, label: 'Entry (Long)', color: '#f59e0b' },
        { type: 'line', y1: lvnBreakoutStop, x: lvnBreakoutEntryCandle, label: 'Stop Loss', color: '#ef4444' },
        ...(levelInRange(lvnBreakoutTarget, lvnBreakoutRange)
          ? [{ type: 'line' as const, y1: lvnBreakoutTarget, x: lvnBreakoutEntryCandle, label: 'Take Profit 1', color: '#22c55e' }]
          : []),
      ],
    },
    script: {
      zh: '这一页展示 LVN 突破的三线执行。橙线为做多入场，必须是突破后回测站稳再二次启动。红线止损放在回测低点外，保证失效就离场。绿线是首个止盈位，通常对应下一个高成交量节点。',
      en: 'This page shows the three-line execution for LVN breakout. Orange is long entry only after successful retest and second push. Red is stop below the retest low, so invalidation means immediate exit. Green is the first take-profit, typically the next high-volume node.',
    },
  },
  {
    id: 'ch4-4-naked-poc',
    title: {
      zh: '策略4：裸 POC 回访交易（Naked POC）',
      en: 'Strategy 4: Naked POC Revisit',
    },
    content: {
      zh: [
        '核心逻辑：历史未回测的控制点，后续常成为高概率反应位。',
        '入场：首次回访裸 POC 时，观察订单反应后执行。',
        '止损：放在裸 POC 失守后的小结构外。',
        '目标：先看当日 POC 或当日价值区边界。',
        '环境与场景：隔夜缺口后、趋势回调段、周内二次测试。',
      ],
      en: [
        'Core logic: Untested historical POC often reacts on first revisit.',
        'Entry: Execute only on first revisit with visible order-flow response.',
        'Stop: Place beyond local structure if naked POC fails to hold.',
        'Targets: Current-day POC first, then intraday value edge extension.',
        'Environment: Gap sessions, trend pullbacks, and weekly retest structures.',
      ],
    },
    chartType: 'candle-profile',
    chartData: {
      candles: nakedPocCandles,
      profile: nakedPocProfile,
      highlights: [
        { type: 'line', y1: nakedPocLevel, label: 'Naked POC', color: '#f59e0b' },
        { type: 'zone', y1: nakedPocLevel + 2.5, y2: nakedPocLevel - 2.5, label: 'First Touch Reaction Zone', color: '#22c55e' },
      ],
      title: 'Untested fair value level often draws first-touch response',
    },
    script: {
      zh: '裸 POC 的核心是历史库存再平衡。一个控制点如果离开后长期没有回测，说明有大量历史仓位未完成换手。价格再次触及时，常出现明显反应。执行时只做首次回访，若第一反应失败就要快速撤退，避免把高概率策略拖成低质量死扛。',
      en: 'Naked POC setups are inventory rebalance trades. If a prior control level remains untested for a long period, unfinished business often exists there. On revisit, price frequently reacts. Focus on first touch only. If first reaction fails, exit quickly. Do not turn a high-probability tactical idea into a low-quality hold-and-hope position.',
    },
  },
  {
    id: 'ch4-4-naked-poc-visual',
    title: {
      zh: '策略4图示页',
      en: 'Strategy 4 Visual',
    },
    visualOnly: true,
    chartType: 'candle-profile',
    chartData: {
      candles: nakedPocCandles,
      profile: nakedPocProfile,
      highlights: [
        { type: 'line', y1: nakedPocEntry, x: nakedPocEntryCandle, label: 'Entry (Long)', color: '#f59e0b' },
        { type: 'line', y1: nakedPocStop, x: nakedPocEntryCandle, label: 'Stop Loss', color: '#ef4444' },
        ...(levelInRange(nakedPocTarget, nakedPocRange)
          ? [{ type: 'line' as const, y1: nakedPocTarget, x: nakedPocEntryCandle, label: 'Take Profit 1', color: '#22c55e' }]
          : []),
      ],
    },
    script: {
      zh: '这一页只看裸 POC 的执行位。橙线是首次回访后的做多入场，红线是结构失效止损。绿线是第一止盈位，原则是先兑现一部分，再观察是否有足够成交支持继续持有。',
      en: 'This page focuses on naked POC execution levels. Orange is long entry on the first validated revisit. Red is structural stop on failure. Green is first take-profit. Scale out first, then hold the rest only if acceptance continues.',
    },
  },
  {
    id: 'ch4-5-open-prev-va',
    title: {
      zh: '策略5：开盘与前日价值区关系交易',
      en: 'Strategy 5: Open Relative to Prior Day Value Area',
    },
    content: {
      zh: [
        '核心逻辑：开盘位置决定当日优先剧本。',
        '入场：开在前日 VA 外并被接受，顺势做延续。开在外侧但迅速回到 VA 内，做回归。',
        '止损：参考开盘结构极值与前日边界外。',
        '目标：延续时看外侧推进；回归时看前日 POC。',
        '环境与场景：日内交易最实用的开盘框架。',
      ],
      en: [
        'Core logic: Opening location defines the day’s primary scenario.',
        'Entry: Open outside prior value and hold for continuation; re-enter value for reversion.',
        'Stop: Use opening structure extremes and prior value boundary invalidation.',
        'Targets: Continuation seeks expansion; reversion seeks prior POC.',
        'Environment: One of the most practical day-trading opening frameworks.',
      ],
    },
    chartType: 'candle-profile',
    chartData: {
      candles: openVsPrevVaCandles,
      profile: openVsPrevVaProfile,
      highlights: [
        { type: 'line', y1: openVsPrevVaBounds.vah, label: 'Prior VAH', color: '#60a5fa' },
        { type: 'line', y1: openVsPrevVaBounds.val, label: 'Prior VAL', color: '#60a5fa' },
        { type: 'line', y1: openVsPrevVaPoc, label: 'Prior POC', color: '#22c55e' },
      ],
      title: 'Opening location defines continuation or reversion path',
    },
    script: {
      zh: '这个策略把复杂盘面简化为两个问题。第一，开盘在前日价值区内还是外。第二，开盘后市场接受还是拒绝当前位置。只要你把这两件事看清楚，当天交易偏向会非常明确。接受外侧就做延续，拒绝外侧并回归价值区就做回归。',
      en: 'This strategy reduces complexity to two questions. First, does the market open inside or outside prior value. Second, does it accept or reject that location after the open. Once these are clear, daily bias becomes objective. Acceptance outside value favors continuation. Rejection and re-entry into value favors reversion.',
    },
  },
  {
    id: 'ch4-5-open-prev-va-visual',
    title: {
      zh: '策略5图示页',
      en: 'Strategy 5 Visual',
    },
    visualOnly: true,
    chartType: 'candle-profile',
    chartData: {
      candles: openVsPrevVaCandles,
      profile: openVsPrevVaProfile,
      highlights: [
        { type: 'line', y1: openVsPrevVaEntry, x: openVsPrevVaEntryCandle, label: 'Entry (Short)', color: '#f59e0b' },
        { type: 'line', y1: openVsPrevVaStop, x: openVsPrevVaEntryCandle, label: 'Stop Loss', color: '#ef4444' },
        ...(levelInRange(openVsPrevVaTarget, openVsPrevVaRange)
          ? [{ type: 'line' as const, y1: openVsPrevVaTarget, x: openVsPrevVaEntryCandle, label: 'Take Profit 1', color: '#22c55e' }]
          : []),
      ],
    },
    script: {
      zh: '这一页对应开盘与前日价值区关系交易的做空版本。橙线是做空入场位，红线是开盘结构失效止损。绿线是第一止盈位，目标放在前一日 POC。',
      en: 'This page shows the short version of the open-versus-prior-value setup. Orange marks the short entry, red marks structural invalidation stop, and green marks take-profit at prior-day POC.',
    },
  },
  {
    id: 'ch4-6-profile-shape',
    title: {
      zh: '策略6：P 形与 b 形轮廓交易',
      en: 'Strategy 6: P-Shape and b-Shape Profile Trade',
    },
    content: {
      zh: [
        '核心逻辑：P 形常见于空头回补，b 形常见于多头踩踏。',
        '入场：观察分布重心和二次测试结果决定顺势或反向。',
        '止损：放在形态失效位之外，避免在轮动中反复受损。',
        '目标：顺势看尾部延伸，反向看回归控制点。',
        '环境与场景：单边后修复日、消息冲击后的结构日。',
      ],
      en: [
        'Core logic: P-shape often signals short covering; b-shape often signals long liquidation.',
        'Entry: Use distribution center and retest outcome for directional choice.',
        'Stop: Place beyond structural invalidation to avoid rotational chop damage.',
        'Targets: Trend follow seeks tail extension; fade seeks return to control.',
        'Environment: Post-impulse repair sessions and news-shock structural days.',
      ],
    },
    chartType: 'candle-profile',
    chartData: {
      candles: profileShapeCandles,
      profile: profileShapeProfile,
      highlights: [
        { type: 'zone', y1: profileShapePoc + 9, y2: profileShapePoc + 4, label: 'P-shape Lift Zone', color: '#22c55e' },
        { type: 'zone', y1: profileShapePoc - 4, y2: profileShapePoc - 10, label: 'b-shape Liquidation Zone', color: '#ef4444' },
      ],
      title: 'Profile geometry reveals who is trapped and who is in control',
    },
    script: {
      zh: '轮廓形态能直接反映仓位痛点。P 形通常意味着上方是回补推动，若回踩不破可延续；b 形通常意味着下方是止损踩踏，若反抽受阻可继续走弱。不要只看形状本身，要结合价格是否重新接受价值区，这一步决定你做顺势还是做回归。',
      en: 'Profile shape exposes positioning stress. P-shape often reflects short-covering pressure and can continue if pullbacks hold. b-shape often reflects long liquidation and can continue lower if rallies fail. Do not trade shape in isolation. Confirm whether price is accepted back into value. That determines continuation versus reversion execution.',
    },
  },
  {
    id: 'ch4-6-profile-shape-visual',
    title: {
      zh: '策略6图示页',
      en: 'Strategy 6 Visual',
    },
    visualOnly: true,
    chartType: 'candle-profile',
    chartData: {
      candles: profileShapeCandles,
      profile: profileShapeProfile,
      highlights: [
        { type: 'line', y1: profileShapeEntry, x: profileShapeEntryCandle, label: 'Entry (Short)', color: '#f59e0b' },
        { type: 'line', y1: profileShapeStop, x: profileShapeEntryCandle, label: 'Stop Loss', color: '#ef4444' },
        ...(levelInRange(profileShapeTarget, profileShapeRange)
          ? [{ type: 'line' as const, y1: profileShapeTarget, x: profileShapeEntryCandle, label: 'Take Profit 1', color: '#22c55e' }]
          : []),
      ],
    },
    script: {
      zh: '这一页是 P 形与 b 形策略的执行图。橙线代表做空入场位，建立在反抽失败基础上。红线是形态失效止损，必须严格执行。绿线是第一止盈位，先兑现后再判断是否有继续下探空间。',
      en: 'This page is the execution map for the P-shape and b-shape strategy. Orange marks short entry on failed rebound. Red is strict structural invalidation stop. Green is first take-profit where partial realization is recommended before deciding on further downside extension.',
    },
  },
  {
    id: 'ch4-7-confluence-playbook',
    title: {
      zh: '策略组合：六种策略如何协同执行',
      en: 'Playbook: How to Combine the Six Strategies',
    },
    content: {
      zh: [
        '步骤一：先判定环境，平衡优先回归，失衡优先突破。',
        '步骤二：用开盘类型确定当日主要剧本。',
        '步骤三：在关键位只选一种触发，避免同区多次试错。',
        '步骤四：风险固定化，单笔止损金额恒定。',
        '步骤五：复盘记录策略类别与执行偏差。',
      ],
      en: [
        'Step 1: Classify environment. Balance favors rotation, imbalance favors breakout.',
        'Step 2: Use opening type to select primary day scenario.',
        'Step 3: Use one trigger per level to avoid repeated low-quality attempts.',
        'Step 4: Keep risk fixed with constant monetary stop per trade.',
        'Step 5: Journal strategy type and execution deviation after each session.',
      ],
    },
    chartType: 'candle-profile',
    chartData: {
      candles: confluenceCandles,
      profile: confluenceProfile,
      highlights: [
        { type: 'line', y1: confluencePoc, label: 'Execution Pivot', color: '#22c55e' },
        { type: 'line', y1: confluenceBounds.vah, label: 'Upper Risk Boundary', color: '#60a5fa' },
        { type: 'line', y1: confluenceBounds.val, label: 'Lower Risk Boundary', color: '#60a5fa' },
      ],
      title: 'Context -> setup -> trigger -> risk -> review',
    },
    script: {
      zh: '把六个策略串起来，你会得到一个非常稳的交易系统。先判定环境，再选择策略，不要反过来。执行时在关键位只打一枪，错了就撤，避免情绪化连续加仓。风险管理上，最实用的是固定每笔亏损额度，这样你的权益曲线会更平滑，也更容易做长期迭代。',
      en: 'When combined, these six setups form a robust framework. Diagnose environment first, then choose strategy, not the other way around. At each key level, take one high-quality attempt. If invalidated, exit. Avoid emotional re-entry loops. For risk management, fixed monetary risk per trade is practical and keeps your equity curve more stable for long-term iteration.',
    },
  },
];
