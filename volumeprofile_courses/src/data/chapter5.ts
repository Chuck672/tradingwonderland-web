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
      const micro = Math.cos((idx + 3) * 0.29) * phase.volatility * 0.35;
      const close = round(open + phase.drift + wave + micro);
      const high = round(Math.max(open, close) + phase.wick * (0.7 + ((Math.sin(idx * 0.31) + 1) / 2) * 0.7));
      const low = round(Math.min(open, close) - phase.wick * (0.7 + ((Math.cos(idx * 0.27) + 1) / 2) * 0.7));
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

const hvnDemandCandles = buildCandles(4518, [
  { count: 13, drift: -1.6, volatility: 2.3, wick: 1.1, cycle: 0.58 },
  { count: 10, drift: 1.1, volatility: 1.9, wick: 1, cycle: 0.71 },
  { count: 12, drift: 0.65, volatility: 1.5, wick: 0.9, cycle: 0.63 },
]);
const hvnDemandProfile = buildProfileFromCandles(hvnDemandCandles, 0.5);
const hvnDemandPoc = getPoc(hvnDemandProfile);

const lvnFvgCandles = buildCandles(4548, [
  { count: 11, drift: 1.35, volatility: 2.1, wick: 1, cycle: 0.51 },
  { count: 8, drift: -2.2, volatility: 2.5, wick: 1.2, cycle: 0.62 },
  { count: 12, drift: 1.55, volatility: 2.1, wick: 1, cycle: 0.69 },
]);
const lvnFvgProfile = buildProfileFromCandles(lvnFvgCandles, 0.5);
const lvnVa = getVaBounds(lvnFvgProfile);

const conflictCandles = buildCandles(4505, [
  { count: 10, drift: 1.25, volatility: 1.9, wick: 0.9, cycle: 0.57 },
  { count: 12, drift: -1.85, volatility: 2.3, wick: 1.1, cycle: 0.66 },
  { count: 10, drift: 0.25, volatility: 1.6, wick: 0.9, cycle: 0.72 },
]);
const conflictProfile = buildProfileFromCandles(conflictCandles, 0.5);
const conflictPoc = getPoc(conflictProfile);

const directionCandles = buildCandles(4388, [
  { count: 12, drift: 0.9, volatility: 1.7, wick: 0.9, cycle: 0.55 },
  { count: 10, drift: -0.5, volatility: 1.4, wick: 0.8, cycle: 0.64 },
  { count: 14, drift: 1.3, volatility: 1.8, wick: 0.9, cycle: 0.68 },
]);
const directionProfile = buildProfileFromCandles(directionCandles, 0.5);
const directionVa = getVaBounds(directionProfile);

const zoneCandles = buildCandles(4422, [
  { count: 14, drift: -1.15, volatility: 2.1, wick: 1, cycle: 0.59 },
  { count: 11, drift: 1.4, volatility: 1.8, wick: 0.9, cycle: 0.65 },
  { count: 12, drift: -0.25, volatility: 1.4, wick: 0.8, cycle: 0.73 },
]);
const zoneProfile = buildProfileFromCandles(zoneCandles, 0.5);
const zonePoc = getPoc(zoneProfile);
const zoneVa = getVaBounds(zoneProfile);

const triggerCandles = buildCandles(4460, [
  { count: 12, drift: -1.2, volatility: 1.9, wick: 0.95, cycle: 0.53 },
  { count: 9, drift: 1.6, volatility: 1.8, wick: 0.9, cycle: 0.67 },
  { count: 11, drift: 0.95, volatility: 1.5, wick: 0.8, cycle: 0.7 },
]);
const triggerProfile = buildProfileFromCandles(triggerCandles, 0.5);
const triggerPoc = getPoc(triggerProfile);

const managementCandles = buildCandles(4492, [
  { count: 10, drift: 1.5, volatility: 1.8, wick: 0.9, cycle: 0.57 },
  { count: 11, drift: -0.4, volatility: 1.4, wick: 0.8, cycle: 0.61 },
  { count: 13, drift: 1.15, volatility: 1.6, wick: 0.8, cycle: 0.74 },
]);
const managementProfile = buildProfileFromCandles(managementCandles, 0.5);
const managementPoc = getPoc(managementProfile);
const managementVa = getVaBounds(managementProfile);

export const chapter5Slides: SlideData[] = [
  {
    id: 'ch5-0-intro',
    title: {
      zh: '第五章：Volume Profile 与价格行为结合',
      en: 'Chapter 5: Volume Profile with Price Action',
    },
    content: {
      zh: [
        '本章目标：从“两个工具”升级为“一个执行系统”。',
        '核心原则：VP 负责选位置，PA 负责触发。',
        '最终产出：方向判断、区域筛选、入场触发、持仓管理四层闭环。',
      ],
      en: [
        'Objective: move from two tools to one execution system.',
        'Core principle: VP selects location, PA triggers execution.',
        'Outcome: a four-layer loop for direction, zone, trigger, and management.',
      ],
    },
    script: {
      zh: '这一章我们不再讨论工具叠加，而是建立一套执行系统。很多交易者失败不是因为不会看图，而是没有流程。Volume Profile 给你的是价值地图，Price Action 给你的是实时确认。把两者串起来后，交易就从主观猜测变成可复盘的决策链。接下来我们会把这个系统拆到可以直接执行的层级。',
      en: 'In this chapter, we stop stacking indicators and build an execution system. Most failures are not chart-reading issues, but process issues. Volume Profile gives the value map, while Price Action gives real-time confirmation. Once combined, trading becomes a repeatable decision chain instead of subjective guessing. We now break the framework down into actionable layers.',
    },
    chartType: 'title',
  },
  {
    id: 'ch5-1-mindset-shift',
    title: {
      zh: '1.1 思维模式转变：单一工具 vs 融合系统',
      en: '1.1 Mindset Shift: Single Tool vs Integrated System',
    },
    content: {
      zh: [
        '错误流程：看到 VP 或 PA 单一信号就直接入场。',
        '标准流程：VP 定义关注区 -> PA 等待确认 -> 执行并管理。',
        '关键原则：VP 不触发交易，PA 不负责选位置。',
      ],
      en: [
        'Wrong flow: enter as soon as either VP or PA signals.',
        'Correct flow: VP defines zones, PA confirms, then execute and manage.',
        'Principle: VP does not trigger trades, PA does not select locations.',
      ],
    },
    script: {
      zh: '你之前可能经历过两种常见亏损。一种是 VP 到位就提前入场，结果价格还在走扩展；另一种是 PA 形态漂亮，但发生在没有意义的价格。融合系统就是为了解决这两类错误。先由 VP 缩小战场，再用 PA 决定扣扳机的时刻。位置和时机分工明确，交易质量会明显提升。',
      en: 'You likely experienced two common losses. One: entering early just because VP reached a level while price still expands. Two: taking a beautiful PA pattern at a meaningless location. The integrated system fixes both. VP narrows the battlefield first, then PA decides the exact trigger timing. Clear role separation significantly improves trade quality.',
    },
    chartType: 'title',
  },
  {
    id: 'ch5-2-confluence-definition',
    title: {
      zh: '1.2 汇合（Confluence）：独立证据在同一区域同向',
      en: '1.2 Confluence: Independent Evidence Aligned in One Zone',
    },
    content: {
      zh: [
        '定义：多个独立信号在同一价格区域指向同一方向。',
        'VP 证人：POC、VAH/VAL、HVN/LVN、Naked POC、形态、价值迁移。',
        'PA 证人：结构 HH-HL/LH-LL、供需区、OB、FVG、BOS/CHoCH、K线形态。',
      ],
      en: [
        'Definition: multiple independent signals align at one price zone and one direction.',
        'VP witnesses: POC, VAH/VAL, HVN/LVN, Naked POC, profile shape, value migration.',
        'PA witnesses: HH-HL/LH-LL, supply-demand, OB, FVG, BOS/CHoCH, candle patterns.',
      ],
    },
    script: {
      zh: '汇合是第五章最核心的概念。你可以把每个信号想象成法庭证人。单个证人会出错，但五个互不相关的证人同时指向同一事实时，可信度会显著上升。实战中我们不追求“神指标”，而是追求独立证据的一致性。只有证据足够独立，汇合才有价值。',
      en: 'Confluence is the central concept of this chapter. Think of each signal as a witness in court. A single witness can be wrong, but confidence rises sharply when five independent witnesses point to the same fact. In practice, we do not chase a magic indicator. We seek agreement among independent evidence streams. Independence is what makes confluence meaningful.',
    },
    chartType: 'title',
  },
  {
    id: 'ch5-3-confluence-grading',
    title: {
      zh: '1.3 汇合强度分级与仓位建议',
      en: '1.3 Confluence Grading and Position Sizing',
    },
    content: {
      zh: [
        'S级：5个以上信号重叠 -> 高信心，可放大仓位。',
        'A级：4个信号重叠 -> 标准仓位执行。',
        'B级：3个信号重叠 -> 轻仓，要求更强 PA 确认。',
        'C/D级：2个或单一信号 -> 不交易。最低标准是3个信号，且至少1个来自VP、1个来自PA。',
      ],
      en: [
        'S grade: 5+ overlaps, high confidence, larger size allowed.',
        'A grade: 4 overlaps, execute with standard size.',
        'B grade: 3 overlaps, reduced size and stronger PA confirmation needed.',
        'C/D grade: 2 or 1 signal only, skip trade. Minimum is 3 signals with at least one VP and one PA.',
      ],
    },
    script: {
      zh: '分级的目的不是追求完美，而是统一执行。你会发现最大的回撤通常来自低等级交易。我们把仓位和等级绑定，就能把主观冲动硬性约束在系统内。记住最低门槛：三个独立信号，其中至少一个 VP、一个 PA。如果做不到，宁可空仓。',
      en: 'The grading system is not about perfection, it is about consistency. The largest drawdowns usually come from low-grade setups. By linking position size to confluence grade, subjective impulses are constrained by rules. Keep the minimum threshold: three independent signals, with at least one VP and one PA input. If not present, stay flat.',
    },
    chartType: 'title',
  },
  {
    id: 'ch5-4-language-mapping',
    title: {
      zh: '1.4 同一故事的两种语言：VP 与 PA 对应关系',
      en: '1.4 Two Languages of the Same Story: VP and PA Mapping',
    },
    content: {
      zh: [
        'HVN <-> 供需区：都在描述机构大量建仓与防守区域。',
        'LVN <-> FVG：都在描述快速穿越、缺乏双向成交的失衡区。',
        'POC <-> 订单块核心；VAH/VAL <-> 区间边缘；价值迁移 <-> 结构方向。',
      ],
      en: [
        'HVN <-> supply-demand: both describe heavy institutional inventory zones.',
        'LVN <-> FVG: both describe fast-travel imbalance zones with weak two-way trade.',
        'POC <-> OB core; VAH/VAL <-> range edges; value migration <-> structure direction.',
      ],
    },
    script: {
      zh: '你不需要把 VP 和 PA 当成两套互相竞争的方法。它们其实在描述同一市场现象，只是一个用成交分布语言，一个用结构行为语言。当两种语言讲的是同一句话，交易就有了更高确定性；当两者冲突，就要让实时结构来做最终裁决。',
      en: 'You do not need to treat VP and PA as competing systems. They describe the same market behavior in two languages: distribution and structure. When both languages say the same thing, certainty rises. When they conflict, real-time structure should make the final decision.',
    },
    chartType: 'title',
  },
  {
    id: 'ch5-5-hvn-demand-case',
    title: {
      zh: '案例A：HVN 与需求区重叠',
      en: 'Case A: HVN Overlapping with Demand Zone',
    },
    content: {
      zh: [
        'VP 视角：该区域是明显 HVN，历史接受度高。',
        'PA 视角：回踩需求区后出现拒绝并抬高低点。',
        '结论：这是高质量支撑汇合区，优先寻找做多触发。',
      ],
      en: [
        'VP view: this area is a clear HVN with strong historical acceptance.',
        'PA view: price retests demand, rejects, and forms higher lows.',
        'Conclusion: high-quality support confluence, prioritize long triggers.',
      ],
    },
    chartType: 'candle-profile',
    chartData: {
      candles: hvnDemandCandles,
      profile: hvnDemandProfile,
      highlights: [
        { type: 'line', y1: hvnDemandPoc, label: 'POC / Fair Price Magnet', color: '#22c55e' },
        { type: 'zone', y1: hvnDemandPoc + 2.2, y2: hvnDemandPoc - 2.2, label: 'Confluence Demand Zone', color: '#60a5fa' },
        { type: 'line', y1: hvnDemandPoc + 5.2, label: 'Higher-Low Confirmation', color: '#f59e0b' },
      ],
      title: 'HVN + Demand creates a defended support pocket',
    },
    script: {
      zh: '这个案例是典型的同向汇合。Volume Profile 显示该区域是高成交节点，说明市场曾经在这里高度接受。Price Action 同时给出需求区回踩后的拒绝动作，低点逐步抬高。两者一致时，我们不需要追高，而是等待回踩确认后入场。这样做的好处是止损更短，胜率更高。',
      en: 'This is a textbook same-direction confluence. Volume Profile marks the area as HVN, showing prior acceptance. Price Action confirms demand defense with rejection and rising swing lows. When both align, no need to chase highs. Wait for pullback confirmation and execute. This improves reward-to-risk by tightening invalidation while keeping directional odds high.',
    },
  },
  {
    id: 'ch5-6-lvn-fvg-case',
    title: {
      zh: '案例B：LVN 与 FVG 重叠',
      en: 'Case B: LVN Overlapping with FVG',
    },
    content: {
      zh: [
        'VP 视角：LVN 表示成交真空，价格通常快速通过。',
        'PA 视角：FVG 未回补时，价格有回填冲动。',
        '结论：不要在真空中间入场，优先交易边缘反应。',
      ],
      en: [
        'VP view: LVN is a volume vacuum where price travels quickly.',
        'PA view: unfilled FVG tends to attract partial fills.',
        'Conclusion: avoid entries in the middle of the vacuum, trade reactions at the edges.',
      ],
    },
    chartType: 'candle-profile',
    chartData: {
      candles: lvnFvgCandles,
      profile: lvnFvgProfile,
      highlights: [
        { type: 'zone', y1: lvnVa.vah + 1.8, y2: lvnVa.vah - 1.8, label: 'LVN / FVG Vacuum', color: '#ef4444' },
        { type: 'line', y1: lvnVa.vah + 3.6, label: 'Upper Edge Reaction', color: '#f59e0b' },
        { type: 'line', y1: lvnVa.vah - 3.6, label: 'Lower Edge Reaction', color: '#22c55e' },
      ],
      title: 'LVN and FVG both describe imbalance travel',
    },
    script: {
      zh: '这类区域最大的误区是“看见就进”。LVN 和 FVG 都代表失衡，价格在中间通常不会给你舒适回撤。正确做法是把它当成高速通道，等待上下边缘的行为确认，比如边缘假突破、吞没反转，再决定方向。中间区域只观察，不执行。',
      en: 'The main mistake here is entering too early inside the zone. Both LVN and FVG represent imbalance, so price often moves fast with poor pullbacks in the middle. Treat it as a high-speed corridor. Wait for edge behavior such as failed breakout or engulfing reversal, then execute. Observe the middle, trade the edges.',
    },
  },
  {
    id: 'ch5-7-conflict-resolution',
    title: {
      zh: '案例C：VP 与 PA 矛盾时如何决策',
      en: 'Case C: Decision Rule When VP and PA Conflict',
    },
    content: {
      zh: [
        '情境：VP 给出 HVN 支撑，但 PA 出现向下 BOS 与 Lower High。',
        '判断：该 HVN 可能过期，历史参考不能压过实时结构。',
        '执行：优先服从 PA；只有回到 HVN 后出现新确认才重新评估多单。',
      ],
      en: [
        'Scenario: VP shows HVN support, but PA prints bearish BOS and lower high.',
        'Interpretation: the HVN may be stale; historical reference cannot override live structure.',
        'Execution: follow PA first, reassess longs only if fresh confirmation appears back at HVN.',
      ],
    },
    chartType: 'candle-profile',
    chartData: {
      candles: conflictCandles,
      profile: conflictProfile,
      highlights: [
        { type: 'line', y1: conflictPoc, label: 'POC / Fair Price Magnet', color: '#22c55e' },
        { type: 'zone', y1: conflictPoc + 2.5, y2: conflictPoc - 2.5, label: 'Legacy HVN Zone', color: '#60a5fa' },
        { type: 'line', y1: conflictPoc - 4.2, label: 'Structure Breakdown', color: '#ef4444' },
      ],
      title: 'When conflict appears, live PA has priority over historical VP',
    },
    script: {
      zh: '这是最有价值的判断场景。很多人会执着于历史 HVN，不愿意承认结构已经坏掉。你要记住，VP 是历史记忆，PA 是当下行为。历史可以给方向提示，但实时结构决定是否执行。所以当两者冲突，优先相信 PA。只有市场重新在 HVN 形成接受，才恢复多头预期。',
      en: 'This is one of the highest-value decision contexts. Many traders cling to old HVN support and ignore structural damage. Remember: VP is historical memory, PA is current behavior. History can guide, but live structure decides execution. When conflict exists, PA has priority. Bullish bias can return only if acceptance is rebuilt at the HVN.',
    },
  },
  {
    id: 'ch5-8-framework',
    title: {
      zh: '1.5 融合分析层级架构：四层执行系统',
      en: '1.5 Layered Framework: Four-Level Execution System',
    },
    content: {
      zh: [
        '第一层方向：VP 价值迁移 + Profile 形态；PA 结构方向。',
        '第二层区域：VP 的 POC/VA/HVN/LVN 与 PA 的供需/OB/FVG 重叠。',
        '第三层触发：区域内等待蜡烛形态、BOS、拒绝确认。',
        '第四层管理：跟踪 POC 迁移、结构完整性、分批止盈止损。',
      ],
      en: [
        'Layer 1 Direction: VP value migration and profile shape with PA structure trend.',
        'Layer 2 Zones: overlap VP levels with PA zones such as supply-demand, OB, and FVG.',
        'Layer 3 Trigger: wait for candlestick rejection, BOS, or confirmation in-zone.',
        'Layer 4 Management: track POC migration, structure integrity, and scale exits.',
      ],
    },
    script: {
      zh: '四层架构的意义在于把“看对方向却做错交易”这个问题拆开。你先解决方向，再解决区域，再解决触发，最后管理仓位。每一层都有输入和输出，不允许跳步骤。这样你不需要依赖情绪和直觉，也能在不同市场环境下保持一致执行。',
      en: 'The four-layer model solves a common issue: being right on direction but wrong on execution. First decide direction, then zone, then trigger, then position management. Each layer has defined inputs and outputs, and steps cannot be skipped. This keeps execution consistent across changing market conditions without emotional improvisation.',
    },
    chartType: 'title',
  },
  {
    id: 'ch5-9-layer1-direction',
    title: {
      zh: '第二层到实图：先做方向过滤',
      en: 'From Framework to Chart: Start with Direction Filter',
    },
    content: {
      zh: [
        'VP：观察价值区与 POC 是否持续上移或下移。',
        'PA：确认 HH-HL 或 LH-LL 结构是否一致。',
        '输出：只保留顺方向机会，逆向只做极端反转。',
      ],
      en: [
        'VP: check whether Value Area and POC keep migrating up or down.',
        'PA: confirm HH-HL or LH-LL structure alignment.',
        'Output: keep only with-trend opportunities, fade only at extremes.',
      ],
    },
    chartType: 'candle-profile',
    chartData: {
      candles: directionCandles,
      profile: directionProfile,
      highlights: [
        { type: 'line', y1: directionVa.vah, label: 'VAH Trend Acceptance', color: '#22c55e' },
        { type: 'line', y1: directionVa.val, label: 'VAL Pullback Floor', color: '#60a5fa' },
        { type: 'zone', y1: directionVa.vah + 2.4, y2: directionVa.val - 2.4, label: 'Direction Filter Window', color: '#f59e0b' },
      ],
      title: 'Direction first: only trade the side that value is migrating toward',
    },
    script: {
      zh: '先做方向过滤，可以减少一半以上的低质量交易。这个图里价值区整体上移，同时价格结构维持高低点抬升，所以主策略是逢回踩做多。即便短线有回落，也只把它当作回调而非反转。方向先定，后面区域和触发才有意义。',
      en: 'Direction filtering removes more than half of low-quality trades. In this chart, value migrates upward and structure keeps printing higher lows and highs, so the primary playbook is buy pullbacks. Even if short-term dips appear, treat them as pullbacks, not reversals. Set direction first; zone and trigger only make sense after that.',
    },
  },
  {
    id: 'ch5-10-layer2-zones',
    title: {
      zh: '第二层：区域筛选与汇合区标注',
      en: 'Layer 2: Zone Selection and Confluence Tagging',
    },
    content: {
      zh: [
        'VP 区域：POC、VAH/VAL、HVN、LVN、Naked POC。',
        'PA 区域：供需区、订单块、FVG、等高等低与关键 swing。',
        '输出：只标注“至少3信号”的区域，其他区域删除。',
      ],
      en: [
        'VP zones: POC, VAH/VAL, HVN, LVN, and Naked POC.',
        'PA zones: supply-demand, order blocks, FVG, equal highs/lows, key swings.',
        'Output: keep only zones with at least 3 overlaps, delete the rest.',
      ],
    },
    chartType: 'candle-profile',
    chartData: {
      candles: zoneCandles,
      profile: zoneProfile,
      highlights: [
        { type: 'line', y1: zonePoc, label: 'POC / Fair Price Magnet', color: '#22c55e' },
        { type: 'zone', y1: zoneVa.vah + 1.5, y2: zoneVa.vah - 1.2, label: 'Confluence Zone A', color: '#ef4444' },
        { type: 'zone', y1: zoneVa.val + 1.2, y2: zoneVa.val - 1.5, label: 'Confluence Zone B', color: '#60a5fa' },
      ],
      title: 'Zone selection: mark overlap clusters, ignore standalone levels',
    },
    script: {
      zh: '这一步最重要的动作不是“增加区域”，而是“删除区域”。图上任何只有一个证据的价位，都不配进入执行清单。你只保留三证据以上的汇合区，然后等待价格进入。这样做会让交易次数下降，但质量明显提升。',
      en: 'The key action here is not adding zones, but removing zones. Any level with only one evidence source should be excluded from execution. Keep only confluence clusters with three or more signals and wait for price to enter. Trade frequency drops, but quality rises significantly.',
    },
  },
  {
    id: 'ch5-11-layer3-trigger',
    title: {
      zh: '第三层：入场触发必须来自 PA 确认',
      en: 'Layer 3: Entry Trigger Must Come from PA Confirmation',
    },
    content: {
      zh: [
        'VP 只定义“在哪里等”，不定义“何时按下买卖键”。',
        '触发条件：Pin Bar、吞没、Inside Break、BOS/CHoCH。',
        '执行纪律：区域到了但无确认，继续等待。',
      ],
      en: [
        'VP defines where to wait, not when to execute.',
        'Trigger options: pin bar, engulfing, inside break, BOS or CHoCH.',
        'Discipline: if zone is reached but no trigger appears, keep waiting.',
      ],
    },
    chartType: 'candle-profile',
    chartData: {
      candles: triggerCandles,
      profile: triggerProfile,
      highlights: [
        { type: 'line', y1: triggerPoc, label: 'POC / Fair Price Magnet', color: '#22c55e' },
        { type: 'zone', y1: triggerPoc + 2.4, y2: triggerPoc - 2.4, label: 'Trigger Confirmation Zone', color: '#f59e0b' },
        { type: 'line', y1: triggerPoc - 4.8, label: 'Structure Invalidation', color: '#ef4444' },
      ],
      title: 'No trigger, no trade: wait for PA confirmation inside VP zone',
    },
    script: {
      zh: '很多人知道区域，却还是亏损，原因就是没有触发条件。真正的执行点必须来自实时行为，比如拒绝针、吞没、结构突破。没有这些确认，你的交易本质上仍是猜测。系统交易的区别就在这里: 区域是必要条件，触发是充分条件。',
      en: 'Many traders identify zones correctly but still lose because they lack trigger conditions. Actual execution must come from live behavior such as rejection wicks, engulfing bars, or structure breaks. Without that, the trade is still a guess. In a system approach, zone is a necessary condition, and trigger is the sufficient condition.',
    },
  },
  {
    id: 'ch5-12-layer4-management',
    title: {
      zh: '第四层：持仓管理由 VP + PA 共同完成',
      en: 'Layer 4: Trade Management by VP and PA Together',
    },
    content: {
      zh: [
        'VP 管理：跟踪发展中 POC 迁移，按 HVN/LVN 阶梯止盈。',
        'PA 管理：监控结构是否仍完整，出现反向破坏及时减仓。',
        '执行结果：不是猜顶猜底，而是让市场驱动离场。',
      ],
      en: [
        'VP management: track developing POC migration, scale out at HVN/LVN ladders.',
        'PA management: monitor structure integrity and reduce risk on opposite break.',
        'Outcome: exits are market-driven instead of top-and-bottom prediction.',
      ],
    },
    chartType: 'candle-profile',
    chartData: {
      candles: managementCandles,
      profile: managementProfile,
      highlights: [
        { type: 'line', y1: managementPoc, label: 'POC Trail', color: '#22c55e' },
        { type: 'line', y1: managementVa.vah + 2.5, label: 'Take Profit Ladder', color: '#f59e0b' },
        { type: 'line', y1: managementVa.val - 2.5, label: 'Risk Cut Boundary', color: '#ef4444' },
      ],
      title: 'Manage by structure and value migration, not by emotion',
    },
    script: {
      zh: '进场只是开始，真正拉开差距的是管理。你的优势来自把盈利仓位留给顺势扩展，把错误仓位快速砍掉。POC 上移代表市场接受更高价格，你可以继续持有并分批止盈；若结构破坏且跌回关键边界，就要主动降低风险。把离场规则写进系统，长期稳定性才会出现。',
      en: 'Entry is only the beginning. Management is where long-term edge is built. Keep winners aligned with expansion and cut invalid positions quickly. When POC migrates higher, the market accepts higher value and supports hold-plus-scale logic. If structure fails and price breaks key boundaries, reduce risk immediately. Codified exit rules are essential for consistency.',
    },
  },
  {
    id: 'ch5-13-checklist',
    title: {
      zh: '第五章结论：融合执行清单',
      en: 'Chapter 5 Wrap-Up: Integrated Execution Checklist',
    },
    content: {
      zh: [
        '1. 方向：价值迁移与结构方向是否一致？',
        '2. 区域：是否存在至少3个独立汇合证据？',
        '3. 触发：是否出现 PA 明确确认？',
        '4. 管理：止损、减仓、目标是否由 VP+PA 联合定义？',
      ],
      en: [
        '1. Direction: are value migration and structure aligned?',
        '2. Zone: are there at least 3 independent confluence signals?',
        '3. Trigger: is there clear PA confirmation?',
        '4. Management: are stop, scale, and targets jointly defined by VP and PA?',
      ],
    },
    script: {
      zh: '第五章的核心不是记住更多术语，而是建立可执行流程。每一笔交易都按同一张清单走完四层: 方向、区域、触发、管理。只要你坚持这个流程，交易质量会越来越稳定，情绪化操作会明显减少。下一章我们可以基于这套框架继续构建完整的交易计划模板。',
      en: 'The core of Chapter 5 is not memorizing more terms, but building an executable process. Every trade should pass the same four layers: direction, zone, trigger, and management. If you keep this workflow consistent, trade quality stabilizes and emotional decisions drop sharply. In the next chapter, we can turn this framework into a full trading plan template.',
    },
    chartType: 'title',
  },
];
