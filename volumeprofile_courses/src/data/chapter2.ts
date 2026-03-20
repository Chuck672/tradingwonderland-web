import { SlideData } from './slides';

export interface Candle {
  open: number;
  close: number;
  high: number;
  low: number;
}

// Helper to precisely build continuous candles
function buildCandles(startPrice: number, moves: [number, number, number][]): Candle[] {
  // move: [closeOffset, highOffset, lowOffset] relative to open and close body
  let currentOpen = startPrice;
  return moves.map(m => {
    const close = currentOpen + m[0];
    const high = Math.max(currentOpen, close) + m[1];
    const low = Math.min(currentOpen, close) - m[2];
    const c = { open: currentOpen, close, high, low };
    currentOpen = close; // Continuous price action
    return c;
  });
}

// Helper to generate a logical Volume Profile strictly from Candlestick data
function buildProfileFromCandles(candles: Candle[], priceStep: number = 1) {
  const minPrice = Math.floor(Math.min(...candles.map(c => c.low)));
  const maxPrice = Math.ceil(Math.max(...candles.map(c => c.high)));
  
  const profileMap = new Map<number, number>();
  
  for (const c of candles) {
    const top = Math.ceil(c.high);
    const bottom = Math.floor(c.low);
    const bodyTop = Math.ceil(Math.max(c.open, c.close));
    const bodyBottom = Math.floor(Math.min(c.open, c.close));
    
    for (let p = bottom; p <= top; p += priceStep) {
      let vol = 1; // Wick volume weight
      if (p >= bodyBottom && p <= bodyTop) {
        vol = 3; // Body volume weight is thicker
      }
      profileMap.set(p, (profileMap.get(p) || 0) + vol);
    }
  }
  
  const profile = [];
  for (let p = minPrice; p <= maxPrice; p += priceStep) {
    profile.push({ price: p, volume: profileMap.get(p) || 0 });
  }
  
  // Calculate POC
  let maxVol = 0;
  let pocPrice = minPrice;
  profile.forEach(p => {
    if (p.volume > maxVol) {
      maxVol = p.volume;
      pocPrice = p.price;
    }
  });
  
  // Calculate Value Area (70%)
  const totalVolume = profile.reduce((sum, p) => sum + p.volume, 0);
  const targetVA = totalVolume * 0.7;
  
  let currentVA = maxVol;
  let upIdx = profile.findIndex(p => p.price === pocPrice) + 1;
  let downIdx = profile.findIndex(p => p.price === pocPrice) - 1;
  
  const inVaPrices = new Set<number>();
  inVaPrices.add(pocPrice);
  
  while (currentVA < targetVA && (upIdx < profile.length || downIdx >= 0)) {
    const upVol = upIdx < profile.length ? profile[upIdx].volume : -1;
    const downVol = downIdx >= 0 ? profile[downIdx].volume : -1;
    
    if (upVol >= downVol && upVol !== -1) {
      currentVA += upVol;
      inVaPrices.add(profile[upIdx].price);
      upIdx++;
    } else if (downVol !== -1) {
      currentVA += downVol;
      inVaPrices.add(profile[downIdx].price);
      downIdx--;
    } else {
      break;
    }
  }
  
  return profile.map(p => ({
    ...p,
    isPOC: p.price === pocPrice,
    isVA: inVaPrices.has(p.price)
  })).sort((a, b) => b.price - a.price);
}

// ----------------- Data Sets -----------------

// 1. POC & VA: Heavy consolidation
const pocVaCandles = buildCandles(90, [
  [3, 1, 1], [-2, 1, 2], [1, 2, 1], [2, 1, 2], [-3, 1, 1],
  [2, 1, 2], [-1, 2, 1], [3, 1, 2], [-4, 2, 1], [1, 1, 2],
  [2, 1, 1], [-1, 2, 1], [0, 2, 2], [1, 1, 2], [-2, 1, 1]
]);
const pocVaProfile = buildProfileFromCandles(pocVaCandles);

// 2. HVN: Two areas of dense overlapping candles
const hvnCandles = buildCandles(70, [
  [3, 1, 1], [4, 1, 2], // Move up
  [1, 2, 1], [-2, 1, 1], [2, 1, 2], [-1, 2, 1], [0, 1, 1], [1, 1, 2], [-2, 1, 1], // Lower HVN
  [5, 1, 1], [4, 2, 1], // Break out
  [1, 2, 1], [-2, 1, 2], [1, 1, 1], [0, 2, 2], [-1, 1, 1] // Upper HVN
]);
const hvnProfile = buildProfileFromCandles(hvnCandles);

// 3. LVN: Top balance, fast drop, bottom balance
const lvnCandles = buildCandles(95, [
  [1, 1, 1], [-2, 1, 2], [1, 1, 1], [0, 1, 1], // Top balance
  [-6, 1, 1], [-7, 0, 1], [-5, 1, 0], // Violent drop (LVN)
  [1, 1, 2], [0, 2, 1], [-1, 1, 1], [2, 1, 2] // Bottom balance
]);
const lvnProfile = buildProfileFromCandles(lvnCandles);

// 4. TPO & IB
const tpoCandles = buildCandles(80, [
  [2, 1, 1], [1, 2, 1], [3, 1, 2], [-1, 1, 1], [2, 1, 2],
  [1, 2, 1], [2, 1, 1], [-2, 1, 1], [3, 1, 2], [1, 1, 1]
]);
const tpoProfile = buildProfileFromCandles(tpoCandles);

// 5. Single Prints: Extreme drop leaving zero overlap
const singlePrintCandles = buildCandles(95, [
  [-1, 1, 1], [2, 1, 2], [-2, 1, 1], // Top chop
  [-8, 0, 0], [-10, 0, 0], [-6, 1, 0], // Emotional drop (Single Prints)
  [2, 1, 1], [-1, 1, 2], [1, 2, 1] // Bottom chop
]);
const singlePrintProfile = buildProfileFromCandles(singlePrintCandles);

// 6. Poor High: Hits the exact same level repeatedly with no upper wicks
const poorHighCandles = buildCandles(80, [
  [3, 1, 1], [4, 2, 1], [5, 1, 2], [5, 1, 1], // Uptrend
  [3, 0, 1],  // close:100, high:100 (Exact hit)
  [-1, 1, 2], // close:99
  [1, 0, 1],  // close:100, high:100 (Exact hit again)
  [-2, 2, 1], // close:98
  [2, 0, 1],  // close:100, high:100 (Exact hit again)
  [-3, 1, 2]  // drift down
]);
const poorHighProfile = buildProfileFromCandles(poorHighCandles);

// 7. Excess: Huge spike and immediate rejection
const excessCandles = buildCandles(80, [
  [2, 1, 1], [3, 1, 2], [2, 1, 1], 
  [-2, 12, 1], // Huge upper wick (Excess), body closes lower
  [-4, 1, 2], [-3, 1, 1], [-2, 2, 1] // Rejection
]);
const excessProfile = buildProfileFromCandles(excessCandles);

// 8. D-Shape: Perfect bell curve consolidation
const dShapeCandles = buildCandles(90, [
  [2, 1, 1], [-4, 1, 2], [3, 2, 1], [1, 1, 2], [-2, 1, 1],
  [-1, 1, 2], [3, 1, 1], [-3, 2, 1], [2, 1, 2], [1, 1, 1],
  [-2, 1, 1], [-1, 2, 1], [1, 1, 1]
]);
const dShapeProfile = buildProfileFromCandles(dShapeCandles);

// 9. P-Shape: Thin bottom, fat top
const pShapeCandles = buildCandles(70, [
  [5, 1, 1], [6, 1, 0], [5, 2, 1], // Fast uptrend
  [1, 2, 1], [-2, 1, 2], [3, 1, 1], [-1, 1, 2], [0, 2, 1], [-2, 1, 1], [1, 1, 1], [2, 1, 2], [-1, 1, 1] // Top consolidate
]);
const pShapeProfile = buildProfileFromCandles(pShapeCandles);

// 10. b-Shape: Fat bottom, thin top
const bShapeCandles = buildCandles(100, [
  [-5, 1, 1], [-6, 0, 1], [-5, 1, 2], // Fast downtrend
  [-1, 1, 2], [2, 1, 1], [-3, 2, 1], [1, 1, 2], [0, 1, 1], [2, 1, 2], [-1, 2, 1], [-2, 1, 1], [1, 1, 2] // Bottom consolidate
]);
const bShapeProfile = buildProfileFromCandles(bShapeCandles);

// 11. Double Distribution (Trend Day)
const bDoubleCandles = buildCandles(100, [
  [1, 1, 2], [-2, 1, 1], [1, 2, 1], [-1, 1, 2], // Upper balance
  [-6, 1, 1], [-5, 0, 1], // Breakout (LVN)
  [-1, 1, 2], [2, 1, 1], [-2, 1, 2], [1, 2, 1], [0, 1, 1] // Lower balance
]);
const bDoubleProfile = buildProfileFromCandles(bDoubleCandles);


export const chapter2Slides: SlideData[] = [
  {
    id: 'ch2-0-term-summary',
    title: {
      en: 'Core Term Summary Before Chapter 2',
      zh: '第二章开始前：核心术语总览'
    },
    chartType: 'term-summary',
    script: {
      en: "Before we go term by term, lock this summary table into your memory. POC is the single most traded price and often acts like a magnet. Value Area is the 70 percent accepted range, bounded by VAH and VAL. HVN marks accepted price where movement tends to slow, while LVN is a low-liquidity corridor where price can move fast. Naked POC is an untouched historical control point, often revisited by the market as unfinished business.",
      zh: "在逐个术语展开之前，先把这张总览表记住。POC 是成交量最大的价格，常常带有磁吸效应。VA 是约70%成交量形成的公允区间，上边界是 VAH，下边界是 VAL。HVN 代表被市场接受的密集成交区，价格容易减速；LVN 是低流动性通道，价格容易快速穿越。Naked POC 是历史上尚未回测的控制点，通常会被市场回访，属于典型的未完成任务。"
    }
  },
  {
    id: 'ch2-1-poc-va',
    title: {
      en: '1. POC & Value Area (VA)',
      zh: '1. POC (控制点) 与 价值区间 (VA)'
    },
    chartType: 'candle-profile',
    chartData: {
      candles: pocVaCandles,
      profile: pocVaProfile,
      highlights: [
        { type: 'line', y1: pocVaProfile.find(p=>p.isPOC)?.price || 90, label: 'POC (Point of Control)', color: '#22c55e' }
      ],
      title: 'Consolidation defines the Fair Value'
    },
    script: {
      en: "Let's dive into the core terminology, starting with the most important ones: POC and Value Area. Look at the chart. On the left, you see candlesticks chopping sideways continuously. This means buyers and sellers agree on price. On the right, notice how the Volume Profile exactly reflects this density. The longest horizontal line is the Point of Control, or POC. It's the exact price level with the highest traded volume. The blue shaded zone is the Value Area, representing 70% of the total volume. The top is VAH, the bottom is VAL. This is where the 'fair value' of the asset currently lies.",
      zh: "让我们深入了解核心术语，从最重要的两个开始：POC和价值区间。请看图表，左侧的连续蜡烛图在横盘震荡，这意味着买卖双方对当前价格达成了共识。在右侧，注意分布图是如何精确反映这种密集度的！最长的那根水平线就是控制点，简称 POC。它是成交量最大的绝对价格水平。蓝色的阴影区域是价值区间 (Value Area)，包含了总成交量的70%。上沿叫VAH，下沿叫VAL。这里就是当前资产的‘公允价值’所在。"
    }
  },
  {
    id: 'ch2-2-hvn',
    title: {
      en: '2. High Volume Node (HVN)',
      zh: '2. 高成交量节点 (HVN)'
    },
    chartType: 'candle-profile',
    chartData: {
      candles: hvnCandles,
      profile: hvnProfile,
      highlights: [
        { type: 'zone', y1: 90, y2: 85, label: 'HVN (Upper Balance)', color: '#a855f7' },
        { type: 'zone', y1: 76, y2: 70, label: 'HVN (Lower Balance)', color: '#a855f7' }
      ],
      title: 'HVNs act as market magnets'
    },
    script: {
      en: "Next is the High Volume Node, or HVN. Think of HVNs as mountains on the profile. They represent areas where the market spent a lot of time and executed a massive amount of orders. Look at the candlestick side: you can clearly see two distinct blocks of dense consolidation. The profile bulges exactly where these overlaps occur. Why are they important? Because HVNs act like magnets. When price approaches an old HVN, it tends to get sucked into it and slow down, as the market perceives this area as a historically fair and accepted price level.",
      zh: "接下来是高成交量节点，简称 HVN。你可以把 HVN 想象成分布图上的山峰。它们代表市场在这里停留了很长时间，并执行了巨量的订单。看左侧真实的蜡烛走势：你能清晰地看到两块明显的密集盘整区。分布图正是在这些蜡烛重叠的地方鼓了起来。为什么它们很重要？因为 HVN 就像磁铁。当价格接近旧的 HVN 时，往往会被吸进去并减速，因为市场潜意识里认为这是一个历史上被广泛接受的公允价格区域。"
    }
  },
  {
    id: 'ch2-3-lvn',
    title: {
      en: '3. Low Volume Node (LVN)',
      zh: '3. 低成交量节点 (LVN)'
    },
    chartType: 'candle-profile',
    chartData: {
      candles: lvnCandles,
      profile: lvnProfile,
      highlights: [
        { type: 'zone', y1: 90, y2: 80, label: 'LVN (Rejection / Vacuum)', color: '#ef4444' }
      ],
      title: 'LVNs represent aggressive price discovery'
    },
    script: {
      en: "Conversely, we have the Low Volume Node, or LVN. These are the valleys or dips in the profile. Look at the massive red bearish candles dropping quickly in the middle. When price moves that continuously and fast, no volume can build up. This logically creates an LVN on the right. Trading meaning? LVNs are vacuums. They represent unfair value. When price returns to an LVN, it usually gets aggressively rejected, or it slices through it extremely fast because there is zero liquidity to stop the move.",
      zh: "相反地，我们有低成交量节点，简称 LVN。它们是分布图上的山谷或凹陷处。看图中中间那段连续快速下跌的巨大阴线。当价格移动如此连续且迅速时，成交量根本无法累积，这就在右侧顺理成章地形成了一个凹陷的 LVN。交易含义是什么？LVN 就是真空区。它们代表不公平的价值。当价格回到 LVN 时，通常会被剧烈拒绝，或者极快地穿透它，因为这里没有任何流动性可以阻挡价格。"
    }
  },
  {
    id: 'ch2-4-tpo-ib',
    title: {
      en: '4. TPO & Initial Balance (IB)',
      zh: '4. TPO 与 初始平衡区 (IB)'
    },
    chartType: 'candle-profile',
    chartData: {
      candles: tpoCandles,
      profile: tpoProfile,
      highlights: [
        { type: 'zone', y1: 85, y2: 80, label: 'Initial Balance (First 60 mins)', color: '#eab308' }
      ],
      title: 'The foundation of the trading day'
    },
    script: {
      en: "Now let's talk about TPO, Time Price Opportunity, and the Initial Balance, or IB. TPO is simply a unit of time, usually 30 minutes. Every 30 minutes, volume builds. The 'Initial Balance' is formed by the high and low of the first two TPO periods—typically the first 60 minutes of the cash session. As you can see highlighted in yellow, the continuous price action in the first hour sets the baseline. A narrow IB usually leads to a trend day, while a wide IB leads to a choppy range day.",
      zh: "现在我们来谈谈 TPO（时间价格机会）和初始平衡区（简称 IB）。TPO 本质上是一个时间单位，通常为30分钟。‘初始平衡区’是由前两个 TPO 周期的最高点和最低点构成的，通常也就是开盘后的第一个小时。正如黄色高亮所示，首个小时的连续价格行为设定了当天的基准线。狭窄的 IB 通常会引出趋势日，而宽阔的 IB 往往预示着震荡日。"
    }
  },
  {
    id: 'ch2-5-single-prints',
    title: {
      en: '5. Single Prints',
      zh: '5. 单次打印区域 (Single Prints)'
    },
    chartType: 'candle-profile',
    chartData: {
      candles: singlePrintCandles,
      profile: singlePrintProfile,
      highlights: [
        { type: 'zone', y1: 90, y2: 74, label: 'Single Prints (Imbalance Gap)', color: '#f97316' }
      ],
      title: 'Emotional gaps leaving a thin profile'
    },
    script: {
      en: "Single Prints are fascinating. Look at the massive continuous drop in the candlestick chart with almost zero wicks overlapping. It left a huge structural gap in the profile where essentially no volume was traded. These are Single Prints. They happen during highly emotional, news-driven, or algorithm-triggered events. Trading meaning? Single prints represent structural weakness. The market moved too fast and left an 'imbalance'. The market often returns to fill these gaps later to repair the auction process.",
      zh: "单次打印区域 (Single Prints) 非常迷人。请看蜡烛图中的剧烈且连续的暴跌，中间的蜡烛影线几乎没有任何重叠！它在分布图上留下了一个巨大的结构性空洞。这就是 Single Prints。它们通常发生在极度情绪化、新闻驱动或极端行情中。交易含义？单次打印代表着结构性的脆弱。市场走得太快，留下了‘不平衡’。市场常常会在日后回踩并填补这些空洞，以修复整个拍卖过程。"
    }
  },
  {
    id: 'ch2-6-poor-high-low',
    title: {
      en: '6. Poor High / Poor Low',
      zh: '6. 弱高点 / 弱低点 (Poor High/Low)'
    },
    chartType: 'candle-profile',
    chartData: {
      candles: poorHighCandles,
      profile: poorHighProfile,
      highlights: [
        { type: 'line', y1: 100, label: 'Poor High (Flat Top)', color: '#ef4444' },
        { type: 'arrow', y1: 100, x: 5, label: 'No Wicks Above', color: '#ef4444' }
      ],
      title: 'Unfinished auction business'
    },
    script: {
      en: "Observe the continuous price action hitting the exact same top level multiple times. Notice how there are no upper wicks probing higher? And look at the profile logically generated from this: it's cut off completely flat at the top. This is a Poor High. In a healthy market auction, price discovers the top by throwing a wick and getting rejected, tapering the profile. A flat top means buyers and sellers just abruptly stopped trading there. It's an unfinished auction, meaning it is highly vulnerable and likely to be broken in the future.",
      zh: "观察这里的连续价格走势，多次触及完全相同的顶部水平。注意到没有向上刺探的上影线了吗？再看看由此合乎逻辑地生成的分布图：它的顶部被极其生硬地切平了。这就是弱高点 (Poor High)。在一个健康的拍卖市场中，价格会通过向上刺探并被拒绝来寻找顶部，分布图会呈现渐进式的收敛。平头意味着买卖双方只是碰巧同时在那里停止了交易。这是一个未完成的拍卖，意味着它非常脆弱，未来极大概率会被突破。"
    }
  },
  {
    id: 'ch2-7-excess',
    title: {
      en: '7. Excess (Tails)',
      zh: '7. 过度延伸 (Excess)'
    },
    chartType: 'candle-profile',
    chartData: {
      candles: excessCandles,
      profile: excessProfile,
      highlights: [
        { type: 'zone', y1: 100, y2: 88, label: 'Excess Tail', color: '#10b981' },
        { type: 'arrow', y1: 98, x: 3, label: 'Strong Rejection Wick', color: '#10b981' }
      ],
      title: 'The hallmark of a completed auction'
    },
    script: {
      en: "In contrast to a Poor High, let's look at Excess. See that massive candlestick wick shooting up and immediately crashing back down in a continuous flow? On the generated profile, this creates a beautiful, long, tapering tail. This is Excess. It is the hallmark of a completed auction. It means price probed too far into unfair valuation, and long-term aggressive sellers stepped in to forcefully reject it. A profile with good excess means the extremes are secure. It's a highly reliable structural turning point.",
      zh: "与弱高点形成鲜明对比的是，我们来看看过度延伸 (Excess)。看到那根巨大的向上拉升后瞬间在连续走势中砸回的极长上影线了吗？在生成的分布图上，这形成了一条漂亮、修长且逐渐收敛的尾巴。这就是 Excess。它是拍卖过程彻底完成的标志。它意味着价格探得太深，进入了不合理的估值区，从而引发了长线做空资金的强力拒绝。一个有良好 Excess 的分布图意味着边界非常安全。它是极其可靠的结构性转折点。"
    }
  },
  {
    id: 'ch2-8-d-shape',
    title: {
      en: '8. Profile Shapes: D-Shape',
      zh: '8. 分布形态：D形分布 (D-Shape)'
    },
    chartType: 'candle-profile',
    chartData: {
      candles: dShapeCandles,
      profile: dShapeProfile,
      highlights: [
        { type: 'line', y1: dShapeProfile.find(p=>p.isPOC)?.price || 90, label: 'Balanced Market (Normal Day)', color: '#a3e635' }
      ],
      title: 'Perfect balance and agreement'
    },
    script: {
      en: "Profiles come in four main shapes. The first is the D-Shape, which looks like a perfect bell curve. The continuous candlestick chart shows a clear range-bound chop overlapping heavily in the middle. The POC is dead in the center. The transaction meaning is simple: perfect balance. Both buyers and sellers agree on the fair value of the asset. Institutional players are quietly accumulating or distributing. As a trader, in a D-shape, you buy the VAL and sell the VAH.",
      zh: "成交量分布有四种主要形态。第一种是 D形分布，它看起来像一个完美的钟形曲线。连续的蜡烛图显示出清晰的区间震荡，并在中部发生了重度重叠。POC 稳稳地落在正中央。交易含义很简单：完美的平衡。买卖双方对资产的公允价值达成了高度共识。机构资金正在悄悄地吸筹或派发。作为交易员，在D形震荡日，你的策略就是买入下沿，卖出上沿。"
    }
  },
  {
    id: 'ch2-9-p-shape',
    title: {
      en: '9. Profile Shapes: P-Shape',
      zh: '9. 分布形态：P形分布 (P-Shape)'
    },
    chartType: 'candle-profile',
    chartData: {
      candles: pShapeCandles,
      profile: pShapeProfile,
      highlights: [
        { type: 'zone', y1: 95, y2: 85, label: 'Heavy Volume at Top', color: '#38bdf8' }
      ],
      title: 'Short Covering / Bullish Trend'
    },
    script: {
      en: "Next is the P-Shape. It has a thin stem at the bottom and a fat bulge at the top. Look at the continuous candles: a massive rally from the bottom followed by high consolidation. This typically represents Short Covering. The fast uptrend left a thin profile (the stem), and once the shorts were squeezed out, the market found balance at higher prices. P-shapes are generally bullish. The thin stem acts as strong support. If price drops back into the stem, buyers usually defend it aggressively.",
      zh: "接下来是 P形分布。它底部细长，顶部圆润。看这组连续蜡烛图：从底部发起的一波猛烈拉升，随后在高位密集盘整。这通常代表空头回补 (Short Covering)。快速的上涨留下了单薄的分布区域（也就是P的下半部分），当空头被挤压出局后，市场在更高的价格找到了平衡。P形通常偏向看涨。下方单薄的区域会形成强力支撑。如果价格跌回单薄区，买方通常会猛烈防守。"
    }
  },
  {
    id: 'ch2-10-b-shape',
    title: {
      en: '10. Profile Shapes: b-Shape',
      zh: '10. 分布形态：b形分布 (b-Shape)'
    },
    chartType: 'candle-profile',
    chartData: {
      candles: bShapeCandles,
      profile: bShapeProfile,
      highlights: [
        { type: 'zone', y1: 85, y2: 75, label: 'Heavy Volume at Bottom', color: '#f43f5e' }
      ],
      title: 'Long Liquidation / Bearish Trend'
    },
    script: {
      en: "The inverse is the lowercase b-Shape. Fat at the bottom, thin at the top. The candlesticks show a harsh continuous drop followed by low-level consolidation. This represents Long Liquidation. Over-leveraged buyers were forced to sell, creating the thin vacuum stem, and the market found a new balance at lower prices. The b-shape is inherently bearish. The thin stem above is now resistance. Any weak bounce up into the thin area will likely be met with new institutional selling.",
      zh: "反之则是小写 b形分布。底部臃肿，顶部单薄。蜡烛图显示连续且惨烈的下跌后在低位盘整。这代表多头清仓 (Long Liquidation)。过度杠杆的买家被迫平仓（形成了单薄的真空上半段），市场在更低的价格找到了新平衡。b形本质上是看跌的。上方单薄的区域现在变成了阻力。任何向单薄区域的无力反弹，都很可能遭遇机构的新一轮砸盘。"
    }
  },
  {
    id: 'ch2-11-double-dist',
    title: {
      en: '11. Double Distribution (Trend Day)',
      zh: '11. 双峰分布 (Double Distribution)'
    },
    chartType: 'candle-profile',
    chartData: {
      candles: bDoubleCandles,
      profile: bDoubleProfile,
      highlights: [
        { type: 'zone', y1: 105, y2: 98, label: 'Upper Balance', color: '#8b5cf6' },
        { type: 'zone', y1: 85, y2: 78, label: 'Lower Balance', color: '#8b5cf6' },
        { type: 'zone', y1: 96, y2: 87, label: 'LVN (Separating Breakout)', color: '#ef4444' }
      ],
      title: 'Two acceptance areas separated by rejection'
    },
    script: {
      en: "Finally, the Double Distribution, often seen on Trend Days. It looks like a capital B. The chart shows early continuous consolidation, a violent breakout, and a new consolidation zone. The profile correctly builds two fat HVN nodes separated by a very thin LVN vacuum. The market traded in one fair value zone, fundamentally changed its mind, sprinted through the middle, and accepted a new value. The LVN in the middle acts as the absolute line in the sand.",
      zh: "最后是双峰分布，通常出现在趋势日。它长得像大写的字母 B。图表显示早盘连续盘整、暴力向下突破，以及新的盘整区。分布图如实地生成了两个臃肿的 HVN 节点，中间被单薄的 LVN 真空隔开。这意味着市场在一个公允区域交易后，彻底改变了主意，急速冲破中场，并接受了新的价值区。中间的这个 LVN 就是绝对的底线（Line in the sand）。"
    }
  }
];
