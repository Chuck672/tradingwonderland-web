import { SlideData } from './slides';

interface Candle {
  open: number;
  close: number;
  high: number;
  low: number;
}

function buildCandles(startPrice: number, moves: [number, number, number][]): Candle[] {
  let currentOpen = startPrice;
  return moves.map(([closeOffset, highOffset, lowOffset]) => {
    const close = currentOpen + closeOffset;
    const high = Math.max(currentOpen, close) + highOffset;
    const low = Math.min(currentOpen, close) - lowOffset;
    const candle = { open: currentOpen, close, high, low };
    currentOpen = close;
    return candle;
  });
}

function buildProfileFromCandles(candles: Candle[], priceStep: number = 1) {
  const minPrice = Math.floor(Math.min(...candles.map((c) => c.low)));
  const maxPrice = Math.ceil(Math.max(...candles.map((c) => c.high)));

  const profileMap = new Map<number, number>();

  for (const candle of candles) {
    const top = Math.ceil(candle.high);
    const bottom = Math.floor(candle.low);
    const bodyTop = Math.ceil(Math.max(candle.open, candle.close));
    const bodyBottom = Math.floor(Math.min(candle.open, candle.close));

    for (let price = bottom; price <= top; price += priceStep) {
      const volume = price >= bodyBottom && price <= bodyTop ? 3 : 1;
      profileMap.set(price, (profileMap.get(price) || 0) + volume);
    }
  }

  const profile = [] as Array<{ price: number; volume: number }>;
  for (let price = minPrice; price <= maxPrice; price += priceStep) {
    profile.push({ price, volume: profileMap.get(price) || 0 });
  }

  let maxVol = 0;
  let pocPrice = minPrice;
  profile.forEach((node) => {
    if (node.volume > maxVol) {
      maxVol = node.volume;
      pocPrice = node.price;
    }
  });

  const totalVolume = profile.reduce((sum, node) => sum + node.volume, 0);
  const targetVa = totalVolume * 0.7;

  let currentVaVolume = maxVol;
  let upIdx = profile.findIndex((node) => node.price === pocPrice) + 1;
  let downIdx = profile.findIndex((node) => node.price === pocPrice) - 1;
  const valueAreaPrices = new Set<number>([pocPrice]);

  while (currentVaVolume < targetVa && (upIdx < profile.length || downIdx >= 0)) {
    const upVol = upIdx < profile.length ? profile[upIdx].volume : -1;
    const downVol = downIdx >= 0 ? profile[downIdx].volume : -1;

    if (upVol >= downVol && upVol !== -1) {
      currentVaVolume += upVol;
      valueAreaPrices.add(profile[upIdx].price);
      upIdx++;
    } else if (downVol !== -1) {
      currentVaVolume += downVol;
      valueAreaPrices.add(profile[downIdx].price);
      downIdx--;
    } else {
      break;
    }
  }

  return profile
    .map((node) => ({
      ...node,
      isPOC: node.price === pocPrice,
      isVA: valueAreaPrices.has(node.price),
    }))
    .sort((a, b) => b.price - a.price);
}

function getVaBounds(profile: Array<{ price: number; isVA?: boolean }>) {
  const vaPrices = profile.filter((node) => node.isVA).map((node) => node.price);
  return {
    vah: Math.max(...vaPrices),
    val: Math.min(...vaPrices),
  };
}

const balanceVsImbalanceCandles = buildCandles(100, [
  [1, 1, 1],
  [-1, 1, 1],
  [2, 1, 1],
  [-2, 1, 1],
  [1, 1, 1],
  [-1, 1, 1],
  [4, 1, 0],
  [3, 1, 0],
  [2, 1, 1],
  [-1, 1, 1],
  [3, 1, 0],
]);
const balanceVsImbalanceProfile = buildProfileFromCandles(balanceVsImbalanceCandles);

const supportResistanceCandles = buildCandles(95, [
  [3, 1, 1],
  [2, 1, 1],
  [-1, 1, 2],
  [1, 1, 1],
  [-2, 1, 1],
  [4, 1, 1],
  [-3, 1, 1],
  [2, 1, 2],
  [-4, 1, 1],
  [1, 1, 2],
  [3, 1, 1],
]);
const supportResistanceProfile = buildProfileFromCandles(supportResistanceCandles);
const supportResistancePoc = supportResistanceProfile.find((node) => node.isPOC)?.price ?? 100;

const trendHealthCandles = buildCandles(100, [
  [3, 1, 1],
  [-1, 1, 1],
  [4, 1, 1],
  [-2, 1, 1],
  [5, 1, 1],
  [-2, 1, 2],
  [4, 1, 1],
  [-1, 1, 1],
  [3, 1, 1],
  [-2, 1, 2],
]);
const trendHealthProfile = buildProfileFromCandles(trendHealthCandles);

const priceVsVaCandles = buildCandles(100, [
  [1, 1, 1],
  [-1, 1, 1],
  [2, 1, 1],
  [-2, 1, 1],
  [1, 1, 1],
  [-1, 1, 1],
  [4, 1, 0],
  [2, 1, 1],
  [-3, 1, 1],
  [-2, 1, 1],
  [1, 1, 1],
]);
const priceVsVaProfile = buildProfileFromCandles(priceVsVaCandles);
const priceVsVaPoc = priceVsVaProfile.find((node) => node.isPOC)?.price ?? 101;
const priceVsVaBounds = getVaBounds(priceVsVaProfile);

const openDriveCandles = buildCandles(100, [
  [4, 1, 0],
  [3, 1, 0],
  [2, 1, 0],
  [2, 1, 1],
  [-1, 1, 1],
  [3, 1, 0],
]);
const openDriveProfile = buildProfileFromCandles(openDriveCandles);

const openTestDriveCandles = buildCandles(100, [
  [-2, 1, 1],
  [-1, 1, 1],
  [4, 1, 0],
  [3, 1, 0],
  [2, 1, 1],
  [1, 1, 1],
]);
const openTestDriveProfile = buildProfileFromCandles(openTestDriveCandles);

const openRejectionReverseCandles = buildCandles(108, [
  [1, 1, 1],
  [-4, 1, 1],
  [-3, 1, 1],
  [-2, 1, 1],
  [-1, 1, 1],
  [1, 1, 2],
]);
const openRejectionReverseProfile = buildProfileFromCandles(openRejectionReverseCandles);

const openAuctionCandles = buildCandles(100, [
  [1, 1, 1],
  [-1, 1, 1],
  [0, 1, 1],
  [2, 1, 1],
  [-2, 1, 1],
  [1, 1, 1],
  [-1, 1, 1],
  [0, 1, 1],
]);
const openAuctionProfile = buildProfileFromCandles(openAuctionCandles);

const multiTimeframeCandles = buildCandles(102, [
  [2, 1, 1],
  [-1, 1, 1],
  [1, 1, 1],
  [-2, 1, 1],
  [3, 1, 1],
  [-1, 1, 2],
  [2, 1, 1],
  [-3, 1, 1],
  [1, 1, 1],
  [2, 1, 1],
]);
const multiTimeframeProfile = buildProfileFromCandles(multiTimeframeCandles);

const alignmentCandles = buildCandles(104, [
  [1, 1, 1],
  [-1, 1, 1],
  [2, 1, 1],
  [-1, 1, 1],
  [3, 1, 0],
  [2, 1, 1],
  [-1, 1, 1],
  [2, 1, 0],
]);
const alignmentProfile = buildProfileFromCandles(alignmentCandles);

export const chapter3Slides: SlideData[] = [
  {
    id: 'ch3-0-intro',
    title: {
      zh: '第三章：如何阅读和分析 Volume Profile',
      en: 'Chapter 3: How to Read and Analyze Volume Profile',
    },
    content: {
      zh: [
        '目标一：先判断市场结构，再决定交易方向。',
        '目标二：把 POC、VA、HVN、LVN 转换成可执行的入场和风控。',
        '目标三：把开盘行为和多周期叠加进同一套决策流程。',
      ],
      en: [
        'Goal 1: Diagnose market structure first, then choose direction.',
        'Goal 2: Convert POC, VA, HVN, and LVN into executable entries and risk control.',
        'Goal 3: Integrate opening behavior and multi-timeframe context into one workflow.',
      ],
    },
    script: {
      zh: '第三章我们进入真正的读图阶段。你需要建立一个固定流程：先看市场是平衡还是失衡，再看关键价值区和控制点的位置，最后结合开盘类型与更大周期背景决定当天的交易框架。这样做的价值是，你不再依赖主观感觉，而是用结构化证据来交易。',
      en: 'In Chapter 3, we move into practical reading and decision-making. Build a fixed process: first identify balance versus imbalance, then locate value and control levels, and finally combine opening type with higher timeframe context. This turns your execution from intuition-driven to structure-driven.',
    },
    chartType: 'title',
  },
  {
    id: 'ch3-1-balance-imbalance',
    title: {
      zh: '1. 平衡与失衡：先看结构，再谈方向',
      en: '1. Balance vs Imbalance: Structure Before Direction',
    },
    chartType: 'candle-profile',
    chartData: {
      candles: balanceVsImbalanceCandles,
      profile: balanceVsImbalanceProfile,
      highlights: [
        { type: 'zone', y1: 103, y2: 99, label: 'Balance: D-Shape Acceptance', color: '#60a5fa' },
        { type: 'zone', y1: 113, y2: 106, label: 'Imbalance Expansion', color: '#ef4444' },
      ],
      title: 'From rotational trade to directional auction',
    },
    script: {
      zh: '判断平衡与失衡是读图第一步。图中前半段蜡烛在同一价格带反复重叠，右侧形成圆润分布，这是典型平衡，策略以高抛低吸为主。随后价格脱离价值区并单边推进，分布上沿开始拉长，这就是失衡。失衡阶段的核心不是抄顶抄底，而是等待回踩后顺着主动一方跟进。',
      en: 'Balance versus imbalance is your first diagnostic step. In the first half of the chart, candles overlap in one price band and the profile is rounded, which is classic balance and favors rotational trading. Then price leaves value and pushes one-sided, while the profile stretches upward. That is imbalance. In imbalance, avoid fading the move. Wait for pullbacks and align with the active side.',
    },
  },
  {
    id: 'ch3-2-support-resistance',
    title: {
      zh: '2. 真正的支撑阻力：来自成交量堆积，不是来自想象',
      en: '2. Real Support and Resistance Come from Traded Volume',
    },
    chartType: 'candle-profile',
    chartData: {
      candles: supportResistanceCandles,
      profile: supportResistanceProfile,
      highlights: [
        { type: 'line', y1: supportResistancePoc, label: 'POC / Fair Price Magnet', color: '#22c55e' },
        { type: 'zone', y1: supportResistancePoc + 4, y2: supportResistancePoc + 2, label: 'LVN Pocket', color: '#ef4444' },
      ],
      title: 'Support and resistance are inventory zones',
    },
    script: {
      zh: 'Volume Profile 里，支撑阻力是库存区，不是随便画的线。POC 和主要 HVN 往往是双向交易最充分的位置，所以价格回到这里容易减速和反复。LVN 则相反，是成交真空，通常要么被快速穿透，要么被迅速拒绝。实战里你可以把入场逻辑简化为两类：在 HVN 附近找确认反转，在 LVN 附近找加速突破。',
      en: 'In Volume Profile, support and resistance are inventory zones, not arbitrary lines. POC and major HVNs are where two-way trade was most accepted, so price tends to slow and rotate there. LVNs are the opposite: low acceptance and low liquidity. Price usually slices through fast or gets sharply rejected. Practical execution is simple: look for confirmation reversals near HVN and continuation acceleration around LVN.',
    },
  },
  {
    id: 'ch3-3-trend-health',
    title: {
      zh: '3. 趋势健康度：看回撤质量与价值迁移',
      en: '3. Trend Health: Pullback Quality and Value Migration',
    },
    chartType: 'candle-profile',
    chartData: {
      candles: trendHealthCandles,
      profile: trendHealthProfile,
      highlights: [
        { type: 'zone', y1: 110, y2: 106, label: 'New Acceptance Zone', color: '#22c55e' },
        { type: 'zone', y1: 104, y2: 101, label: 'Old Acceptance Zone', color: '#60a5fa' },
      ],
      title: 'Healthy trend = shallow pullbacks + higher acceptance',
    },
    script: {
      zh: '趋势健康不只看涨跌幅，而是看价值是否持续上移。健康上升趋势有两个共性：第一，回撤通常浅且快，难以跌回旧价值区深处。第二，新的成交密集区不断抬高，说明市场愿意在更高价成交。若你看到价格创新高，但分布重心不再上移，甚至回落到旧 POC 下方，往往代表趋势进入衰竭阶段。',
      en: 'Trend health is not just about distance. It is about value migration. A healthy uptrend has two features: pullbacks are shallow and quickly defended, and new acceptance zones keep forming at higher prices. If price prints higher highs but the profile center stops moving up, or drops back under prior POC, trend quality is deteriorating and exhaustion risk is rising.',
    },
  },
  {
    id: 'ch3-4-price-vs-poc-va',
    title: {
      zh: '4. 价格与 POC/VA 位置关系：一张表读懂当天偏向',
      en: '4. Price Relative to POC/VA: A Fast Intraday Bias Map',
    },
    chartType: 'candle-profile',
    chartData: {
      candles: priceVsVaCandles,
      profile: priceVsVaProfile,
      highlights: [
        { type: 'line', y1: priceVsVaPoc, label: 'POC', color: '#22c55e' },
        { type: 'line', y1: priceVsVaBounds.vah, label: 'VAH', color: '#60a5fa' },
        { type: 'line', y1: priceVsVaBounds.val, label: 'VAL', color: '#60a5fa' },
      ],
      title: 'Location matters more than prediction',
    },
    script: {
      zh: '你可以用位置关系快速定义偏向。价格在 VA 内：先按震荡处理。价格站上 VAH 并被市场接受：偏多，优先做回踩多。价格跌破 VAL 并持续在下方成交：偏空，优先做反抽空。价格频繁回到 POC：说明市场还在找平衡，不适合追单。把这种位置判定放在每次交易前，你会少很多情绪化操作。',
      en: 'Use location to define bias quickly. If price is inside value, treat it as rotational. If price accepts above VAH, bias shifts bullish and pullback longs have priority. If price accepts below VAL, bias shifts bearish and rallies become short opportunities. If price repeatedly returns to POC, the auction is still balancing and momentum trades have lower quality.',
    },
  },
  {
    id: 'ch3-5-open-drive',
    title: {
      zh: '5. 开盘类型一：Open Drive',
      en: '5. Opening Type 1: Open Drive',
    },
    chartType: 'candle-profile',
    chartData: {
      candles: openDriveCandles,
      profile: openDriveProfile,
      highlights: [
        { type: 'arrow', y1: 100, x: 0, label: 'Open', color: '#f59e0b' },
        { type: 'zone', y1: 114, y2: 108, label: 'One-way Initiative', color: '#22c55e' },
      ],
      title: 'Open Drive: immediate initiative with no meaningful retrace',
    },
    script: {
      zh: 'Open Drive 的特征是开盘后几乎没有回头，主动买盘或卖盘直接推动单边。你在图里会看到连续实体推进、回撤很浅，分布也偏向一侧拉伸。交易重点是不要在这种结构里逆势猜顶底，而是等待第一个可控回踩，用最小风险跟随主方向。',
      en: 'Open Drive means immediate initiative after the open with little meaningful pullback. You see consecutive directional candles and one-sided profile extension. The key is not to fade it. Let the first controlled pullback form, then participate with the dominant side and tight structural risk.',
    },
  },
  {
    id: 'ch3-6-open-test-drive',
    title: {
      zh: '6. 开盘类型二：Open Test Drive',
      en: '6. Opening Type 2: Open Test Drive',
    },
    chartType: 'candle-profile',
    chartData: {
      candles: openTestDriveCandles,
      profile: openTestDriveProfile,
      highlights: [
        { type: 'zone', y1: 100, y2: 97, label: 'Opening Test', color: '#f59e0b' },
        { type: 'zone', y1: 108, y2: 104, label: 'Drive Phase', color: '#22c55e' },
      ],
      title: 'Test first, then directional commitment',
    },
    script: {
      zh: 'Open Test Drive 先测试，再发力。市场开盘先向一侧试探流动性，确认对手盘不足后，立刻反向发起真正推进。这个结构的优势是风险更清晰，因为测试低点或高点通常就是无效点。你可以把试探段当成信息采样，把驱动段当成主要盈利段。',
      en: 'Open Test Drive starts with a probe, then commits directionally. The market tests one side for liquidity, fails to find continuation there, and quickly drives the opposite way. This structure offers clear risk definition because the test extreme is often your invalidation. Treat the test as information gathering and the drive as the monetization phase.',
    },
  },
  {
    id: 'ch3-7-open-rejection-reverse',
    title: {
      zh: '7. 开盘类型三：Open Rejection Reverse',
      en: '7. Opening Type 3: Open Rejection Reverse',
    },
    chartType: 'candle-profile',
    chartData: {
      candles: openRejectionReverseCandles,
      profile: openRejectionReverseProfile,
      highlights: [
        { type: 'zone', y1: 110, y2: 108, label: 'Failed Opening Area', color: '#ef4444' },
        { type: 'zone', y1: 103, y2: 99, label: 'Reversal Acceptance', color: '#22c55e' },
      ],
      title: 'Rejection at the open and full directional flip',
    },
    script: {
      zh: 'Open Rejection Reverse 是很多人容易做错的形态。开盘看起来很强，但很快被完全否定，价格回到关键价值区并继续反向扩张。关键证据不是第一根大阳或大阴，而是随后是否出现持续接受。只要开盘方向没有被市场接受，就要敢于转向。',
      en: 'Open Rejection Reverse is where many traders get trapped. The open looks strong in one direction, but that move is quickly rejected, and price rotates back through key value before expanding the other way. The decisive evidence is not the first big candle. It is whether follow-through acceptance appears. If opening direction is not accepted, flip your bias.',
    },
  },
  {
    id: 'ch3-8-open-auction',
    title: {
      zh: '8. 开盘类型四：Open Auction',
      en: '8. Opening Type 4: Open Auction',
    },
    chartType: 'candle-profile',
    chartData: {
      candles: openAuctionCandles,
      profile: openAuctionProfile,
      highlights: [
        { type: 'zone', y1: 102, y2: 98, label: 'Opening Rotation', color: '#60a5fa' },
      ],
      title: 'Open Auction: two-way trade seeking fair value',
    },
    script: {
      zh: 'Open Auction 的核心是双向轮动找价值。开盘后多空反复交手，价格来回穿越 POC，分布逐步变厚。这个环境下最忌讳追涨杀跌。更好的做法是等待边界形成后做区间策略，或者耐心等到失衡真正出现再切换为趋势策略。',
      en: 'Open Auction is two-way rotation in search of value. Price crosses POC repeatedly and the profile thickens around the center. This is the worst environment for chasing momentum. Better execution is range logic at established edges, or patience until true imbalance emerges and then switching to trend logic.',
    },
  },
  {
    id: 'ch3-9-multi-timeframe',
    title: {
      zh: '9. 多周期叠加：日内、周、月 Profile 同屏解读',
      en: '9. Multi-Timeframe Overlay: Daily, Weekly, Monthly Together',
    },
    chartType: 'candle-profile',
    chartData: {
      candles: multiTimeframeCandles,
      profile: multiTimeframeProfile,
      highlights: [
        { type: 'zone', y1: 110, y2: 98, label: 'Monthly Value Area', color: '#a855f7' },
        { type: 'zone', y1: 106, y2: 101, label: 'Weekly Value Area', color: '#60a5fa' },
        { type: 'line', y1: 103, label: 'Daily POC', color: '#22c55e' },
      ],
      title: 'Higher timeframe value frames lower timeframe execution',
    },
    script: {
      zh: '多周期叠加的原则是：大周期定边界，小周期定节奏。月度 Profile 决定你在估值上处于高位还是低位，周度 Profile 决定本周主战场，日内 Profile 决定具体触发点。方向冲突时，优先服从更大周期；方向一致时，日内信号的胜率和持仓信心都会明显提高。',
      en: 'The overlay principle is simple: higher timeframe defines location, lower timeframe defines timing. Monthly profile sets broad valuation, weekly profile defines this week’s battlefield, and intraday profile gives execution triggers. When signals conflict, defer to higher timeframe. When they align, intraday setups gain both quality and conviction.',
    },
  },
  {
    id: 'ch3-10-alignment-workflow',
    title: {
      zh: '10. 实战流程：三层对齐后再出手',
      en: '10. Execution Workflow: Trade Only After Three-Layer Alignment',
    },
    chartType: 'candle-profile',
    chartData: {
      candles: alignmentCandles,
      profile: alignmentProfile,
      highlights: [
        { type: 'zone', y1: 109, y2: 106, label: 'Weekly Acceptance Lift', color: '#60a5fa' },
        { type: 'line', y1: 106, label: 'Monthly POC', color: '#a855f7' },
        { type: 'line', y1: 109, label: 'Intraday POC Migration', color: '#22c55e' },
      ],
      title: 'Context alignment -> trigger -> risk-defined execution',
    },
    script: {
      zh: '最后给你一个可直接执行的流程。第一步看月周位置，确认你是在价值上沿还是下沿。第二步看当天开盘类型，判断今天更像趋势日还是震荡日。第三步只在关键区等触发，例如回踩新 POC、重回 VA、或穿越 LVN 后回测。把这三层对齐之后再交易，你会明显减少低质量出手。',
      en: 'Here is a direct execution workflow. Step one: read monthly and weekly location to know if you are at value extremes or near fair value. Step two: classify the opening type to define day structure. Step three: take only level-based triggers such as pullback to new POC, re-entry into value, or post-break LVN retest. Trade after all three layers align, and low-quality trades drop sharply.',
    },
  },
];
