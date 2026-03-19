import { Module, ChartData } from './types';
import * as charts from './data/charts';

export const c = (time: number, o: number, h: number, l: number, cl: number, v: number = 100): ChartData => ({
  time, open: o, high: h, low: l, close: cl, volume: v
});

// --- CHART DATA FOR SLIDES ---
// All chart data moved to ./data/charts.ts

export const courseData: Module[] = [
  {
    id: 'm1',
    title: {
      zh: 'Module 1: Market Structure 3.0',
      en: 'Module 1: Market Structure 3.0'
    },
    slides: [
      {
        id: 'm1-s1',
        title: {
          zh: 'Module 1 — 市场结构 3.0\n超越几何形状：识别机构控制权',
          en: 'Module 1 — Market Structure 3.0\nBeyond Geometry: Identifying Institutional Control'
        },
        diagram: 'control-shift',
        bullets: {
          zh: [
            '机构视角：结构不是“高低点”，而是“订单流控制权”',
            '核心逻辑：识别价格扩张（Expansion）与流动性回收（Retracement）',
            '从“画趋势线”升级到“识别市场状态与结构控制权”'
          ],
          en: [
            'Institutional Lens: Structure is Order Flow Control, not just Swing Points',
            'Core Logic: Distinguishing Price Expansion from Liquidity Re-stocking',
            'Upgrade from "line drawing" to "Market State & Control Identification"'
          ]
        },
        script: {
          zh: '听好，这一模块的目标不是教你更多画线技巧，那是垃圾分析师干的活。我要推翻你们脑子里深植的旧习惯！\n\n大多数散户把市场结构理解为高点低点的几何连接，在图表上画各种斜线。但机构真正关心的是：谁在控制价格？推动是否有效？回撤是否被承接？结构是否正在转移？\n\n如果你只能看到形状，而看不到背后的控制权，你永远无法理解为什么教科书上的趋势经常失效。不要再当机构的提款机了！',
          en: 'Listen up, the goal of this module is NOT to give you more line-drawing tricks. That\'s what garbage analysts do. I am here to obliterate your ingrained habits!\n\nMost retail traders understand market structure as a geometric connection of highs and lows. But institutions only care about: Who is controlling price? Is the impulse valid? Are pullbacks being absorbed? Is structural control shifting?\n\nIf you only see shapes and miss the underlying control, you will never understand why textbook trends fail. Stop being the institution\'s ATM!'
        }
      },
      {
        id: 'm1-s2',
        title: {
          zh: '先打破旧认知：大多数人画错了“重点”',
          en: 'Break the Old Mindset: You\'re Focusing on the Wrong Things'
        },
        diagram: 'retail-trap',
        bullets: {
          zh: [
            '把趋势简化成 高低点抬升 = 上涨，反之 = 下跌',
            '过度依赖“最近几个拐点”的外观，忽略了推动质量',
            '把“图上像趋势”误当成“交易上可延续的趋势”',
            '结果：在末端追趋势、在震荡中误判趋势、在假突破中被扫损'
          ],
          en: [
            'Simplifying trend to HH/HL = Up, LL/LH = Down',
            'Over-relying on the "look" of recent swings, ignoring impulse quality',
            'Mistaking a "chart that looks like a trend" for a "tradeable trend"',
            'Result: Buying the top, misjudging chop, getting swept on fakeouts'
          ]
        },
        script: {
          zh: '错的不是高低点抬升这个概念本身，而是你们把它简化成了一台只会机械分类的破机器！\n\n市场结构的真正问题不只是有没有创新高，而是：创新高的时候有没有强力推移？回撤是浅而有序，还是疯狂砸盘？突破后到底有没有被市场真正的接受？\n\n很多人在末端追多，以为是趋势延续，结果直接被挂在山顶。记住这句话：散户画的是图形，专业交易员读的是控制权。',
          en: 'The error isn\'t HH/HL itself; it\'s that you\'ve reduced it to a mechanical sorting machine!\n\nThe real question of market structure isn\'t just "did it make a new high?". It\'s: Did the new high have Displacement? Was the pullback shallow and orderly, or an aggressive dump? After the breakout, was there actual market Acceptance?\n\nYou buy the top thinking it\'s a trend continuation. Remember this: Retail traders draw pictures, professional traders read control.'
        }
      },
      {
        id: 'm1-s3',
        title: {
          zh: '传统“趋势定义法”的 4 个致命缺陷',
          en: '4 Fatal Flaws of Traditional Trend Definitions'
        },
        diagram: 'fatal-flaws',
        bullets: {
          zh: [
            '1. 事后性太强：很多结构只有走完后才看起来清楚',
            '2. 忽略环境：将震荡、趋势、转换期用同一套画法',
            '3. 忽略力度差异：把所有高低点当成同等重要',
            '4. 忽略失败结构：不知道什么是“看起来延续，实则衰竭”'
          ],
          en: [
            '1. Too Retrospective: Structures only look clear after the fact',
            '2. Ignores Context: Using the same logic for range, trend, and transition',
            '3. Ignores Momentum: Treating all highs/lows as equally important',
            '4. Ignores Failures: Blind to "looks like continuation but is exhaustion"'
          ]
        },
        script: {
          zh: '传统教科书最致命的弱点就是：永远都是事后诸葛亮！\n\n它只会问高低点是不是越来越高，但从来不问：这个抬高的低点是主力主动承接，还是无量下跌后的死猫跳？新高是有效的价格扩张，还是只是为了清扫流动性？\n\n不要把所有的拐点一视同仁。结构绝对不是静态的骨架，它是价格如何移动、如何被接受、如何失效的一部活生生的连续剧。',
          en: 'The most fatal flaw of traditional textbooks is hindsight bias!\n\nIt only asks "are the highs getting higher?", but NEVER asks: Is this higher low active institutional absorption, or a dead cat bounce after low-volume dumping? Is the new high true expansion, or just a Liquidity Sweep?\n\nStop treating all swings equally. Structure is NOT a static skeleton. It is a live, breathing process of how price moves, gets accepted, or fails.'
        }
      },
      {
        id: 'm1-s4',
        title: {
          zh: 'Market Structure 3.0：机构足迹公式',
          en: 'Market Structure 3.0: The Institutional Footprint Formula'
        },
        diagram: 'structure-formula',
        bullets: {
          zh: [
            '强力推移 (Displacement)：机构入场的唯一铁证',
            '受控回撤 (Controlled Pullback)：流动性的重新注入',
            '价格接受 (Acceptance)：新价格区间的合法化',
            '核心公式：结构 = 推动 + 回撤 + 接受/拒绝 + 控制权归属'
          ],
          en: [
            'Displacement: The only smoking gun of institutional entry',
            'Controlled Pullback: The re-stocking of liquidity',
            'Acceptance: The validation of a new price tier',
            'Core Formula: Structure = Impulse + Pullback + Acceptance/Rejection + Control'
          ]
        },
        script: {
          zh: '这是你整个交易生涯需要洗牌的时刻。\n\n以后看图，不要像个白痴一样先问是不是上升趋势。你要问自己这四个极其刻薄的问题：最近的推动是不是有效？有没有留下巨大的失衡缺口？回撤有没有破坏多头节奏？突破后有没有延续性？\n\n如果突破后立刻被拒绝，那叫恶意扫损。多空哪一边在失去控制？搞懂这个，你才能在这个市场里活下来。',
          en: 'This is the moment your entire trading career gets a hard reset.\n\nFrom now on, don\'t look at a chart and ask like an idiot, "is this an uptrend?". Ask yourself these four ruthless questions: Was the recent impulse valid? Did it leave a massive FVG? Did the pullback destroy the bullish rhythm? Did the breakout have follow-through?\n\nIf a breakout is immediately rejected, that\'s Manipulation. Which side is losing control? Understand this, and you might actually survive in this market.'
        }
      },
      {
        id: 'm1-s5',
        title: {
          zh: '机构眼里的 4 种结构状态',
          en: 'The 4 Structural States in Institutional Eyes'
        },
        diagram: 'four-states',
        bullets: {
          zh: [
            '1. 扩张趋势 — 市场在推进',
            '2. 受控回撤趋势 — 市场在消化',
            '3. 控制权转移期 — 市场在转向',
            '4. 双向拍卖区间 — 市场在平衡'
          ],
          en: [
            '1. Expansion Trend — Market is advancing',
            '2. Controlled Pullback Trend — Market is digesting',
            '3. Transition / Distribution Shift — Market is shifting',
            '4. Range / Two-Way Auction — Market is balanced'
          ]
        },
        script: {
          zh: '忘掉上涨、下跌、震荡这种幼儿园词汇。机构真正在看的是这四种状态。\n\n这四种状态反映的是更本质的东西：市场到底是在推进、消化、转向，还是在平衡？\n\n很多散户最容易亏钱的地方在哪里？就是把控制权转移期错画成延续，或者把区间边缘的猎杀当成了趋势突破。今天，我会带你一个一个把它们扒光。',
          en: 'Forget kindergarten terms like "up, down, sideways." Institutions track these 4 specific states.\n\nThese 4 states reflect the underlying reality: Is the market advancing, digesting, shifting, or balanced?\n\nWhere do retail traders bleed the most money? They mislabel a Transition as continuation, or they mistake a liquidity sweep at the edge of a Range for a massive breakout. Today, we strip them down one by one.'
        }
      },
      {
        id: 'm1-s6',
        title: {
          zh: '结构一：真正的扩张趋势',
          en: 'Structure 1: Expansion Trend'
        },
        diagram: 'expansion-trend',
        bullets: {
          zh: [
            '明显的强力推移，留下失衡缺口',
            '突破后迅速延续，不给散户上车机会',
            '回撤极浅、短，各段推动之间重叠少',
            '这不是简单的上涨，而是市场主动接受更高价格'
          ],
          en: [
            'Clear Displacement, leaving FVGs',
            'Immediate follow-through after breakout, no retail entries',
            'Extremely shallow, short pullbacks, minimal overlap',
            'Not just "going up", but the market actively "accepting higher prices"'
          ]
        },
        script: {
          zh: '听好，散户眼里的趋势就是一根线，而机构眼里的扩张趋势是一次彻底的价值重估！它伴随着极强的推动力，突破后根本不给你们这些穷鬼上车的机会。回撤？回撤极浅！这不是简单的价格上涨，而是整个市场在主动、贪婪地接受更高的定价！下一页我会给你看实盘长什么样。',
          en: 'Listen, retail sees a trend as a line, institutions see an Expansion Trend as a total revaluation! It comes with violent Displacement, and after a breakout, it gives you broke folks zero chance to board. Pullbacks? Extremely shallow! This isn\'t just price going up, it\'s the market actively and greedily accepting higher pricing! Next slide, I\'ll show you the real chart.'
        }
      },
      {
        id: 'm1-s6a',
        title: {
          zh: '结构一：扩张趋势实盘图解',
          en: 'Structure 1: Expansion Trend (Chart)'
        },
        bullets: { zh: [], en: [] },
        chartData: charts.expansionData,
        annotations: charts.expansionAnn,
        script: {
          zh: '看好了，这就是教科书级别的扩张猎杀！看到第一段推动波了吗？伴随着绝对的强力推移，留下失衡缺口。回撤只有一点点，极其短促！一旦突破前高，立刻出现趋势延续，把价格牢牢钉在高位，完全不跌回。如果你看到每次创新高都立刻被打回，那绝对不是强趋势，那是机构在派发！',
          en: 'Look closely, THIS is a textbook Expansion hunt! See that first Impulse? Accompanied by absolute Displacement, leaving an FVG. The pullback is extremely shallow and brief! Once it breaks the old high, immediate Continuation locks the price up high, with zero retracement. If you see price breaking highs only to immediately dump back, that is NOT a strong trend, that\'s institutional distribution!'
        }
      },
      {
        id: 'm1-s7',
        title: {
          zh: '结构二：受控回撤趋势',
          en: 'Structure 2: Controlled Pullback Trend'
        },
        diagram: 'controlled-pullback',
        bullets: {
          zh: [
            '推动后进入有序的深度回撤',
            '回撤较深，但节奏可控，下跌Ｋ线偏碎',
            '过程中没有出现明显反向强力推移',
            '到达关键结构区 (如订单块) 后，重新恢复原方向控制'
          ],
          en: [
            'Impulse followed by Orderly Retracement',
            'Deeper pullback, but controlled rhythm, choppy candles',
            'No clear counter-trend Displacement during the pullback',
            'Hits key structural areas (OB/FVG) and regains original control'
          ]
        },
        script: {
          zh: '第二种结构，深度受控回撤。这是机构的高级洗盘手法。趋势不是一条直线，当推动段走完，市场会进入深度回撤。但记住，健康的回撤是有序的，你可以看到大量重叠的碎步阴线，却绝对看不到强力的空头爆发！到了关键区域例如订单块，机构会重新接管。',
          en: 'Second structure, Controlled Pullback Trend. This is an advanced institutional shakeout. Trends aren\'t straight lines. After an impulse, the market enters a deep retracement. But remember, a healthy pullback is orderly! You\'ll see choppy, overlapping candles, but NEVER aggressive counter-trend Displacement! Once it hits a key zone (OB or FVG), institutions take back control.'
        }
      },
      {
        id: 'm1-s7a',
        title: {
          zh: '结构二：受控回撤实盘图解',
          en: 'Structure 2: Controlled Pullback (Chart)'
        },
        bullets: { zh: [], en: [] },
        chartData: charts.pullbackData,
        annotations: charts.pullbackAnn,
        script: {
          zh: '看这张图，散户最喜欢在这个阶段大喊反转，简直可笑。注意看这个深度回撤。虽然它跌得很深，但内部全是非常碎的Ｋ线，重叠极多，没有任何一根强力的空头砸盘。这种受控的深度回撤根本不是反转，这是机构在慢慢洗盘，把价格压回他们最初建仓的订单块。一旦回到订单块，马上强力承接，原趋势直接恢复。深回撤不危险，无序的暴涨暴跌才他妈危险！',
          en: 'Look at this chart. Retail loves to scream \'Reversal!\' here. It\'s pathetic. Notice this deep pullback. Even though it retraces heavily, the internal candles are choppy, highly overlapping, with ZERO aggressive bearish Displacement. This controlled deep pullback is NOT a reversal. It\'s institutions slowly shaking out weak hands and dragging price back to their original Order Block. Once it taps the OB, instant absorption, and the primary trend resumes. Deep pullbacks aren\'t dangerous; chaotic dumps are!'
        }
      },
      {
        id: 'm1-s8',
        title: {
          zh: '结构三：致命的控制权转移',
          en: 'Structure 3: Transition (The Fatal Control Shift)'
        },
        diagram: 'transition-phase',
        bullets: {
          zh: [
            '市场最危险的阶段：看起来还像趋势，其实控制权正在转移',
            '推动变短，回撤变深，突破缺乏延续性',
            '出现假突破诱多，随后被迅速打回',
            '顺势波段质量暴跌，逆势反击力量飙升引发结构破坏'
          ],
          en: [
            'The deadliest phase: Looks like a trend, but control is shifting',
            'Impulse shortens, pullbacks deepen, breakouts lack continuation',
            'Fake breakouts (Sweeps) induce longs, immediately rejected',
            'Trend leg quality drops, counter-leg quality surges (CHOCH)'
          ]
        },
        script: {
          zh: '第三种结构，控制权转移！这是所有散户破产的直接原因。当一段趋势走到末端，表面上还在创新高或新低，但内部结构已经烂透了。推动段越来越短，回撤越来越深，突破后全是假突破。顺势的力量在疯狂流失，而逆势的力量正在苏醒。一旦出现结构破坏，旧趋势就彻底死亡！',
          en: 'Third structure, Transition, the shift of control! This is the direct cause of retail bankruptcy. When a trend nears its end, it might superficially make new highs or lows, but the internal structure is rotting. Impulses shrink, pullbacks deepen, breakouts turn into Sweeps. The trend\'s power is bleeding out, while counter-trend power awakens. Once CHOCH occurs, the old trend is officially dead!'
        }
      },
      {
        id: 'm1-s8a',
        title: {
          zh: '结构三：控制权转移实盘图解',
          en: 'Structure 3: Transition (Chart)'
        },
        bullets: { zh: [], en: [] },
        chartData: charts.transitionData,
        annotations: charts.transitionAnn,
        script: {
          zh: '这张图就是你们的墓地！表面上还在创新高，但仔细看：推动段越来越短，回撤越来越深。图上那个假突破，破位后连两根Ｋ线都撑不住，直接一根大阴线把你扫死！这叫失去延续性。控制权已经开始转移了！随后出现的强力破位，正式宣告旧趋势死亡。高级交易员早就空仓看戏了，而你还在傻乎乎地逢低买入！',
          en: 'This chart is your graveyard! On the surface, it\'s making new highs. But look closer: impulses are shrinking, pullbacks are deepening. That \'Weak Breakout\' can\'t even hold for two candles before a massive red candle sweeps you out! That is a Loss of Follow-through. Control is shifting! The subsequent aggressive break (CHOCH) officially declares the old trend dead. Pro traders stepped aside long ago, while you are still stupidly \'buying the dip\'!'
        }
      },
      {
        id: 'm1-s9',
        title: {
          zh: '结构四：双向拍卖的杀戮场',
          en: 'Structure 4: Range (The Two-Way Auction Slaughterhouse)'
        },
        diagram: 'range-auction',
        bullets: {
          zh: [
            '不是没有趋势，而是市场暂时接受双向拍卖',
            '价格在上下边界间反复轮转，中心区域重叠度极高',
            '边缘位置专门用来清扫止损流动性',
            '突破极容易失败，随后迅速回归价值中枢'
          ],
          en: [
            'Not "no trend", but temporary acceptance of Two-Way Auction',
            'Price rotates between boundaries, extreme overlap in the center',
            'Edges are designed strictly to hunt stops (Sweep High/Low)',
            'Breakouts frequently fail, returning rapidly to Value'
          ]
        },
        script: {
          zh: '最后一种，区间震荡。这不是没有趋势，而是多空双方暂时达成了平衡，进行双向拍卖。在这个杀戮场里，价格在上下边界之间来回抽插。中间区域是绞肉机，边缘位置专门用来打你们的止损！如果你在区间里追涨杀跌，你的账户熬不过一个月。',
          en: 'The last one, Range. This isn\'t \'no trend\', it\'s a temporary balance where bulls and bears conduct a Two-Way Auction. In this slaughterhouse, price chops back and forth between boundaries. The middle is a meat grinder, and the edges are designed purely to hunt your stops! If you chase breakouts in a range, your account won\'t last a month.'
        }
      },
      {
        id: 'm1-s9a',
        title: {
          zh: '结构四：区间震荡实盘图解',
          en: 'Structure 4: Range (Chart)'
        },
        bullets: { zh: [], en: [] },
        chartData: charts.rangeData,
        annotations: charts.rangeAnn,
        script: {
          zh: '看清这个绞肉机！很多蠢货在里面追涨杀跌，把每一次边缘突破都当成大趋势启动。区间不是噪音，它是双向平衡。机构的剧本永远是：先诱导突破，扫掉上下边界的止损，然后迅速回到区间内部继续震荡。在区间里，边界的假突破狙击才是唯一的胜率点，中间地带就是死。你要么反向狙击，要么管住你的手！',
          en: 'Look clearly at this meat grinder! Idiots buy highs and sell lows in here, treating every edge breakout as a macro trend start. A Range is not noise; it\'s two-way balance. The institutional playbook is always: Induce a breakout, sweep stops at the edges (Sweep High/Low), and instantly Return to Value to chop you up. In a range, fading the edge fakeouts is the ONLY high-probability play. You either snipe the fakeouts, or sit on your hands!'
        }
      },
      {
        id: 'm1-s10',
        title: {
          zh: '结构之间如何切换？(真正的交易优势)',
          en: 'How Structures Shift (Your True Edge)'
        },
        diagram: 'state-flow',
        bullets: {
          zh: [
            '扩张趋势 → 受控回撤趋势',
            '受控回撤趋势 → 控制权转移',
            '控制权转移 → 区间震荡 (或者直接反转)',
            '每次转换时必问：原结构优势是否减弱？突破是否被拒绝？'
          ],
          en: [
            'Expansion Trend → Controlled Pullback Trend',
            'Controlled Pullback Trend → Transition',
            'Transition → Range (or straight Reversal)',
            'Always ask: Is the primary structure weakening? Are breakouts rejected?'
          ]
        },
        script: {
          zh: '真正的能力根本不是给走完的图表贴标签，而是读懂变化！\n\n当你看到推动越来越短，回撤越来越深，假突破越来越多，你就该像嗅到血腥味的鲨鱼一样警觉。这说明市场正在从扩张期转入过渡期。\n\n交易的本质就是识别结构正在切换。如果你的脑子还是单线程的认定现在是上涨趋势，你连死都不知道怎么死的。',
          en: 'Your true capability isn\'t slapping labels on a finished chart; it\'s reading the SHIFT!\n\nWhen you see impulses shrinking, pullbacks deepening, and fakeouts multiplying, you need to be as alert as a shark smelling blood. It means the market is shifting from Expansion to Transition.\n\nThe essence of trading is identifying "structural shifts." If your brain is stuck in single-thread "this is an uptrend" mode, you won\'t even know what killed you.'
        }
      },
      {
        id: 'm1-s11',
        title: {
          zh: '零售交易者最常见的 5 种送死行为',
          en: 'Top 5 Suicidal Habits of Retail Traders'
        },
        diagram: 'retail-mistakes',
        bullets: {
          zh: [
            '1. 把区间边缘突破当成新趋势启动去追',
            '2. 把健康回撤当成趋势结束，反向做单',
            '3. 把末端动能衰竭当成强延续去接盘',
            '4. 把控制权转移期错当成“逢低买入绝佳机会”',
            '5. 只看拐点形状，完全不看内部的推移力度'
          ],
          en: [
            '1. Chasing range-edge breakouts as new macro trends',
            '2. Treating healthy pullbacks as trend reversals',
            '3. Buying the top of an Exhaustion run thinking it\'s continuation',
            '4. Treating a Transition as an "ultimate buy-the-dip opportunity"',
            '5. Trading swing shapes while ignoring internal Displacement'
          ]
        },
        script: {
          zh: '我实盘带过上百个新人，他们亏钱的姿势惊人的一致。\n\n最致命的一点：突破看起来最诱人、散户情绪最高昂的时候，往往是最危险的流动性清扫！趋势后期的最后一冲，那根巨大的阳线，正是机构把筹码砸给追高散户的派发大阳线！\n\n深回撤不一定是坏事，只要没有反向的强力推移。你们亏钱，全是因为你们只看图形，不看资金的博弈！',
          en: 'I\'ve mentored hundreds of rookies in live trading, and the way they lose money is astonishingly identical.\n\nThe deadliest trap: When a breakout looks the most tempting and retail euphoria is at its peak, it is almost ALWAYS a liquidity sweep! That massive final green candle in a trend (Exhaustion) is the exact moment institutions dump their bags onto FOMO buyers!\n\nA deep pullback isn\'t necessarily bad, as long as there is no counter-trend Displacement. You lose money because you trade shapes instead of capital warfare!'
        }
      },
      {
        id: 'm1-s12',
        title: {
          zh: '机构级清单：画结构前的 6 个拷问',
          en: 'Institutional Checklist: 6 Interrogations Before Drawing Structure'
        },
        diagram: 'checklist',
        bullets: {
          zh: [
            '1. 最近一段推动是否具有绝对的强力推移？',
            '2. 回撤是有序的，还是反方向的主动攻击？',
            '3. 突破关键拐点后，市场是接受还是拒绝？',
            '4. 价格在新区域停留了吗？',
            '5. 顺势波段在变强，还是在变弱？',
            '6. 当前更像扩张、消化、转移，还是平衡？'
          ],
          en: [
            '1. Does the recent impulse have absolute Displacement?',
            '2. Is the retracement orderly, or an active counter-attack?',
            '3. Upon breaking a key swing, is it Acceptance or Rejection (Sweep)?',
            '4. Is price holding in the new territory?',
            '5. Is the trend leg gaining or losing momentum?',
            '6. Are we Expanding, Digesting, Shifting, or Balancing?'
          ]
        },
        script: {
          zh: '把这页截图打印下来，贴在你的显示器旁边！\n\n下次你想画趋势线、想敲击鼠标入场之前，先他妈回答这六个问题。\n\n如果你连这六个问题都回答不清楚，说明你根本没看懂当下的结构。先判断市场状态，再定义结构；先定义结构，再决定你的交易模型。连战场环境都没看清就敢开枪，你不死谁死？',
          en: 'Screenshot this, print it out, and tape it to your monitor!\n\nNext time you want to draw a trendline or click that buy button, answer these 6 f**king questions first.\n\nIf you can\'t answer them clearly, it means you have zero clue what the current structure is. Judge the market state first, define structure second, and choose your setup last. Firing your gun without knowing the battlefield—you deserve to get wiped out.'
        }
      },
      {
        id: 'm1-s13',
        title: {
          zh: 'Module 1 核心结论',
          en: 'Module 1 Core Conclusions'
        },
        diagram: 'core-conclusion-m1',
        bullets: {
          zh: [
            '市场结构不是几何图形，而是控制权的残忍分配',
            '高低点只是表象，背后的动能爆发才是真理',
            '机构真正关心的是四种状态：扩张、回撤、转移、平衡',
            '顶级交易员的优势：识别结构转换，而不是预测顶底'
          ],
          en: [
            'Market structure isn\'t geometry; it\'s the ruthless distribution of control',
            'HH/HL are just symptoms; underlying Displacement is the truth',
            'Institutions track 4 states: Expansion, Pullback, Transition, Balance',
            'A top trader\'s edge: Identifying structural shifts, not picking tops/bottoms'
          ]
        },
        script: {
          zh: '我们总结一下。\n\n从今天起，把你的思维从形态思维彻底升级为状态思维。不要再像个傻子一样问我大佬这是不是上升趋势。你要问：这个市场现在处于哪种结构状态？多空谁在控制价格？我该在哪里埋伏那些爆仓的散户？\n\n只有这样，你才算真正跨入了机构交易的门槛。下一个模块，我们将深入订单块的终极真相。',
          en: 'Let\'s wrap this up.\n\nFrom today on, completely upgrade your brain from "Pattern Thinking" to "State Thinking." Stop asking me like an idiot, "bro, is this an uptrend?" You need to ask: "What structural state is the market in right now? Who controls the price? Where can I set a trap for liquidating retail traders?"\n\nOnly then have you truly crossed the threshold into institutional trading. In the next module, we dive into the ultimate truth of Order Blocks.'
        }
      }
    ]
  },
  {
    id: 'm2',
    title: { zh: 'Module 2: Order Block 的终极真相', en: 'Module 2: The Ultimate Truth of Order Blocks' },
    slides: [
      {
        id: 'm2-s1',
        title: {
          zh: 'Module 2 — Order Block 的终极真相\n高级 OB、Mitigation、Breaker 与 Vacuum',
          en: 'Module 2 — The Ultimate Truth of Order Blocks\nAdvanced OB, Mitigation, Breaker & Vacuum'
        },
        diagram: 'ob-title',
        bullets: {
          zh: [
            '绝大多数人不是不会找 OB，而是把任何“最后一根反向K线”都叫做 OB',
            '图上到处都是框，没有筛选能力，回踩任何 OB 都想进场',
            '从“画矩形”升级到“识别失衡起点与回补逻辑”'
          ],
          en: [
            'Most people don\'t know how to find OBs; they just label every "last opposite candle" as one.',
            'Charts full of boxes, no filtering ability, trying to trade every tap.',
            'Upgrade from "drawing rectangles" to "identifying imbalance origins & mitigation logic."'
          ]
        },
        script: {
          zh: '欢迎来到第二模块。这一章一开始我就要把你们从社交媒体那种垃圾的订单块教学里拉出来！市面上 80% 的 OB 教学，本质上只是在给价格拐点涂颜色。真正的高级问题绝不是“这是不是最后一根阴线”，而是：为什么这个区域之后发生了强力砸盘？为什么价格回来会有反应？高级交易者不是在找更多区块，而是在找最有记忆效应的区块。',
          en: 'Welcome to Module 2. I\'m pulling you right out of that garbage social media Order Block education! 80% of OB tutorials out there are essentially just "coloring in price swings". The real advanced question is NEVER "is this the last red candle?". It is: Why did aggressive displacement happen after this zone? Why does price react when it returns? Pro traders aren\'t looking for MORE blocks; they are looking for blocks with MEMORY.'
        }
      },
      {
        id: 'm2-s2',
        title: {
          zh: '为什么大多数人学了 OB 反而更容易亏钱',
          en: 'Why Most Lose MORE Money After Learning OBs'
        },
        diagram: 'fake-vs-real-ob',
        bullets: {
          zh: [
            '把任何拐点前的最后一根反向K线都画成 OB',
            '完全忽略动能推移 (Displacement) 的质量',
            '不看结构位置，不区分“反应区”与“有记忆效应的区块”',
            '结果：图上画满框，频繁被扫损，事后强行解释'
          ],
          en: [
            'Drawing every swing\'s last opposite candle as an OB.',
            'Completely ignoring the quality of Displacement.',
            'Ignoring structural context, failing to separate "reaction zones" from "memory blocks".',
            'Result: Charts full of boxes, getting stopped out constantly, making hindsight excuses.'
          ]
        },
        script: {
          zh: '你们有没有发现，自从学了订单块，你们的图表就像个垃圾场一样画满了框，亏的钱反而更多了？问题不在于订单块无效，而在于你们根本没有在交易真正的 OB！你们完全不看推动的质量，只要是个拐点就画个框，失败了就安慰自己说是清扫流动性。如果一个区块越多，你的决策越差，那就说明你的筛选标准根本就是错的！',
          en: 'Have you noticed that since learning Order Blocks, your charts look like a junkyard of boxes, and you bleed even more money? The problem isn\'t that OBs don\'t work; it\'s that you aren\'t trading REAL OBs! You ignore impulse quality completely. You draw a box at every swing, and when it fails, you cope by calling it a "liquidity sweep." If more blocks mean worse decisions, your filtering standard is trash!'
        }
      },
      {
        id: 'm2-s3',
        title: {
          zh: 'Order Block 的本质到底是什么？',
          en: 'What is the TRUE Essence of an Order Block?'
        },
        diagram: 'ob-essence',
        bullets: {
          zh: [
            'OB 不是形状定义，而是“失衡起点 + 未完成交易记忆”',
            '一段有效强力推移 (Displacement) 之前的最后平衡区域',
            '市场从该区域开始重新定价，留下未充分成交或被动对手盘',
            '结论：没有强力推移支撑的区块，大概率只是矩形，不是交易优势'
          ],
          en: [
            'OB is not a shape; it\'s "Imbalance Origin + Unfilled Order Memory".',
            'The final area of balance before a valid Displacement.',
            'Where the market begins repricing, leaving passive counterparties behind.',
            'Conclusion: A block without strong displacement is just a rectangle, not an edge.'
          ]
        },
        script: {
          zh: '必须把你们脑子里那种靠蜡烛形态定义的思维彻底切掉！高级视角下，订单块是什么？它是一次疯狂的失衡移动之前的最后成交区。市场从这里开始重新定价，它留下了未充分成交的缺口。记住这句话：它之所以重要，绝对不是因为它是最后一根什么颜色的线，而是因为它后面发生了毁天灭地的单边推移！如果没有强推移，它就是个破长方形！',
          en: 'You must completely sever that candle-pattern definition from your brain! From an advanced perspective, what is an Order Block? It\'s the final transaction zone before a manic, imbalanced move. The market starts repricing from here, leaving unfilled gaps. Remember this: it\'s NOT important because it\'s the "last candle of a certain color", it\'s important because apocalyptic single-sided displacement happened AFTER it! Without displacement, it\'s just a stupid rectangle!'
        }
      },
      {
        id: 'm2-s4',
        title: {
          zh: '高质量 OB 的 4 个硬性条件',
          en: '4 Hard Conditions for a High-Quality OB'
        },
        diagram: 'ob-criteria',
        bullets: {
          zh: [
            '1. 结构位置极佳：位于关键高低点、扫流动性后、或结构转换点',
            '2. 离开时有明显强推移：不是慢悠悠，而是有主动砸盘/抢筹',
            '3. 后续验证其控制权：离开后真正夺回控制权，而非短暂反弹',
            '4. 回访时具备明确逻辑：回踩发生在延续或风险处理框架内'
          ],
          en: [
            '1. Prime Location: At key swings, after a sweep, or at a CHOCH.',
            '2. Clear Displacement leaving it: Active aggressive pushing, not slow drifting.',
            '3. Validates Control: Truly takes over market control, not a fake bounce.',
            '4. Logical Return: Revisit happens within continuation or mitigation context.'
          ]
        },
        script: {
          zh: '很多人的区块画出来根本没有语境。以后找区块，如果这四个条件不满足，看都不要看！第一，它是不是在关键位置吸了流动性？第二，它离开的时候是不是带着强推移？第三，它有没有导致真正的结构破坏？第四，价格回来测试的时候，符合逻辑吗？如果没有强离开，先不要急着叫它订单块。',
          en: 'Most of the blocks you draw have zero context. From now on, if these 4 conditions aren\'t met, don\'t even look at it! First, did it sweep liquidity at a key level? Second, did it leave with aggressive displacement? Third, did it cause a real structural shift? Fourth, when price returns, does it make logical sense? If there\'s no strong departure, don\'t you dare call it an Order Block yet.'
        }
      },
      {
        id: 'm2-s5',
        title: {
          zh: '高级 OB：什么才算真正可交易的区块',
          en: 'Advanced OB: What is a TRULY Tradeable Block'
        },
        diagram: 'high-quality-ob',
        bullets: {
          zh: [
            '扫掉前高/前低之后产生的反转起点',
            '产生结构破坏 (CHOCH) 并留下明确失衡缺口之前',
            '离开后形成冲量 (Impulse)，绝对不是杂乱震荡',
            '常见误区：只看 K 线，不看前面有没有吸取流动性'
          ],
          en: [
            'The reversal origin right after sweeping a prior high/low.',
            'Before causing CHOCH and leaving a clear FVG.',
            'Forms a massive Impulse upon leaving, absolutely no choppy mess.',
            'Common Trap: Only looking at the candle, ignoring if it swept liquidity prior.'
          ]
        },
        script: {
          zh: '这就是真正可交易的高级订单块！它最好是出现在低点被扫损后，主力吸足了筹码，然后向上强力推移，直接把空头结构打爆！这种带着血腥味的区块，才是我们要狙击的地方。如果你画的那个区块前面连个流动性都没扫过，离开的时候也软绵绵的，那你进去就是给别人当流动性燃料的！',
          en: 'THIS is a truly tradeable advanced Order Block! The best ones occur right after a low is swept. The smart money loads up, then violently displaces upwards, completely shattering the bearish structure! These blood-soaked blocks are where we snipe. If your block didn\'t sweep any liquidity prior, and left like a weakling, entering there just makes YOU the liquidity fuel for someone else!'
        }
      },
      {
        id: 'm2-s6',
        title: {
          zh: '高级 OB 实盘图解',
          en: 'Advanced OB (Chart)'
        },
        bullets: { zh: [], en: [] },
        chartData: charts.obData,
        annotations: charts.obAnn,
        script: {
          zh: '看这张图，绝对的教科书级！价格先向下深深地刺穿前低，清扫卖方流动性，这就是诱空！随后快速收回，爆发出极强的多头推移，直接形成结构破坏 (CHOCH)！留下巨大的失衡缺口。那个清扫流动性后形成的最后下跌K线，才是真正的高级看多订单块！随后价格精准回踩，延续暴涨。你看懂它的威力了吗？',
          en: 'Look at this chart, absolute textbook! Price first spikes deep below the prior low, sweeping sell-side liquidity. It\'s a bear trap! Then it rapidly reclaims, exploding with massive bullish displacement, directly causing a Market Structure Shift! It leaves a huge FVG. That final down candle formed after the sweep is the REAL Advanced Bullish OB! Price then taps it perfectly and skyrockets. Do you see its lethal power now?'
        }
      },
      {
        id: 'm2-s7',
        title: {
          zh: 'Mitigation Block 的真正含义',
          en: 'The TRUE Meaning of Mitigation Block'
        },
        diagram: 'mitigation-concept',
        bullets: {
          zh: [
            '不是单纯的回踩，而是“市场回来处理未完成的风险”',
            '价格在强推移后回到失衡起点，补成交、减风险、平衡仓位',
            '先前移动太快导致大量成交未完成，回来填补是对冲需要',
            'Mitigation 不是自动代表趋势延续，而是风险处理过程'
          ],
          en: [
            'Not just a simple retest; it\'s "the market returning to handle unfinished risk".',
            'Price returns to the imbalance origin to fill orders, offload risk, and balance books.',
            'The initial move was too fast, leaving unfilled orders. Returning is a hedging necessity.',
            'Mitigation does NOT automatically mean trend continuation; it\'s risk processing.'
          ]
        },
        script: {
          zh: '把 Mitigation 这个词刻在脑子里！很多蠢货以为只要价格回到区块，就一定会继续原趋势。大错特错！Mitigation 的本质，是主力先前的动作太猛太快，留下了大量没有成交的风险敞口。他们让价格回来，是为了填补缺口、平掉对冲仓位、处理风险！回来之后到底是继续砸盘，还是直接失守？这才是你要观察的，而不是无脑接飞刀！',
          en: 'Burn the word Mitigation into your brain! Idiots think if price returns to a block, it MUST continue the trend. Dead wrong! The essence of Mitigation is that the smart money\'s previous move was too violent, leaving massive unfilled risk exposure. They let price return to fill gaps, close hedge positions, and process risk! Will they dump it again after returning, or will the block fail? THAT is what you observe, instead of blindly catching falling knives!'
        }
      },
      {
        id: 'm2-s8',
        title: {
          zh: '如何区分“普通回踩”与“真正的 Mitigation”',
          en: 'Distinguishing "Normal Retest" vs "True Mitigation"'
        },
        diagram: 'mitigation-vs-retest',
        bullets: {
          zh: [
            '真正的 Mitigation：前面有明确失衡移动，回访有明确目的',
            '进入区块后出现明显的吸收或拒绝反应，说明市场记得这里',
            '普通回踩：前面没有强推移，回踩毫无结构意义',
            '进入区块内来回穿透，没有清晰防守，像切豆腐一样被切开'
          ],
          en: [
            'True Mitigation: Preceded by clear imbalance, return is highly purposeful.',
            'Clear absorption/rejection inside the block; the market remembers this zone.',
            'Normal Retest: No prior displacement, retest lacks structural meaning.',
            'Price chops right through the block like a hot knife through butter, zero defense.'
          ]
        },
        script: {
          zh: '不是所有的回调都叫 Mitigation！如果价格慢悠悠地跌回一个根本没有强力推移的破区块，然后在里面像切豆腐一样来回扫，那根本不是主力在处理风险，那是散户在里面绞肉！真正的 Mitigation 回访是有极强目的性的，一碰到核心区，马上出现极强的拒绝或吸收反应。你要找的是那种市场依然存有记忆的区域！',
          en: 'Not every pullback is a Mitigation! If price lazily drifts into a weak block with zero prior displacement, and chops through it like tofu, that isn\'t smart money processing risk. That\'s retail traders getting minced! A TRUE Mitigation return is highly purposeful. The moment it taps the core zone, violent rejection or absorption appears. You must hunt for zones where the market actually retains MEMORY!'
        }
      },
      {
        id: 'm2-s9',
        title: {
          zh: 'Mitigation Block 实盘图解',
          en: 'Mitigation Block (Chart)'
        },
        bullets: { zh: [], en: [] },
        chartData: charts.mitigationData,
        annotations: charts.mitigationAnn,
        script: {
          zh: '盯紧这段走势。前期一波极度强势的空头砸盘，中间留下了巨大的失衡缺口！随后价格慢悠悠地反弹，重返这块看跌区块。这就是经典的 Mitigation 回访！主力拉高不是为了反转，而是因为他们之前砸得太狠，高位还有空头单没建完。一进入区块，立刻遭遇疯狂卖压，趋势再度向下崩塌！这就是回来处理遗留风险的残酷过程。',
          en: 'Watch this action closely. A prior ultra-aggressive bearish dump leaves a massive inefficiency gap! Then price slowly drifts back up, returning to this Bearish Block. This is a classic Mitigation return! Smart money isn\'t pushing it up to reverse; they dumped it so hard earlier that they still have unfilled shorts high up. The second it enters the block, insane selling pressure hits, and the trend collapses again! This is the ruthless process of handling legacy risk.'
        }
      },
      {
        id: 'm2-s10',
        title: {
          zh: 'Breaker Block：失效后的控制权翻转',
          en: 'Breaker Block: Control Flip After Failure'
        },
        diagram: 'breaker-concept',
        bullets: {
          zh: [
            '不是长得不一样的 OB，而是“失效防守区”的角色转换',
            '原本被市场当作防守区的区块失效被打穿',
            '原先防守的一方被死死套牢，控制权完成翻转',
            '价格重返该区域时，被套盘割肉/新顺势盘涌入，形成高价值反向区'
          ],
          en: [
            'Not just a "different looking OB"; it\'s the role reversal of a failed defense zone.',
            'A block previously used as a defense line is brutally breached.',
            'The defending side gets trapped instantly, control fully flips.',
            'When price returns, trapped traders puking and new momentum traders create a high-value inverse zone.'
          ]
        },
        script: {
          zh: '现在讲 Breaker，破坏块！它绝对不是什么新的形态，它是失效后的血腥反转！原本多头死死守住的订单块，被空头一脚踹穿。你要明白背后的逻辑：那些在里面做多的人，全他妈被套牢了！一旦价格反弹回这个失效区，被套的多头急于保本割肉，空头趁机加仓，旧支撑瞬间变成最致命的新阻力！Breaker 的力量，就来自于散户的错误仓位！',
          en: 'Now we talk Breaker Blocks! It\'s NOT a new pattern; it\'s a blood-soaked reversal after failure! A bullish Order Block defended desperately by buyers gets kicked wide open by bears. Understand the logic: everyone who bought there is completely f**king TRAPPED! When price bounces back to this failed zone, trapped longs puke their bags at breakeven, and bears stack heavy. Old support instantly becomes the deadliest new resistance! The power of a Breaker comes purely from retail\'s wrong positioning!'
        }
      },
      {
        id: 'm2-s11',
        title: {
          zh: 'Breaker 实盘识别的 3 个关键步骤',
          en: '3 Key Steps to Identify a Breaker on Chart'
        },
        diagram: 'breaker-concept',
        bullets: {
          zh: [
            '1. 先有防守：识别一个原本有效的订单块',
            '2. 再有失守：该区域被明确的强推移打穿 (明确破位)',
            '3. 最后反向利用：回访时伴随结构转换，出现反方向的强延续',
            '高质量特征：失守绝对不能是轻微刺穿，必须是控制权的暴力粉碎'
          ],
          en: [
            '1. First, Defense: Identify an originally valid Order Block.',
            '2. Then, Defeat: The zone is cleanly breached by strong displacement.',
            '3. Finally, Exploitation: Return triggers a structural shift and strong opposite continuation.',
            'High-Quality Trait: The breach cannot be a slight poke; it MUST be a violent smashing of control.'
          ]
        },
        script: {
          zh: '怎么找高质量的 Breaker？三步走：先防守、再失守、后利用！如果一个区块只是被毛刺扫了一下，那叫假突破，根本不是 Breaker！高质量的 Breaker 必须是被暴力砸穿，控制权彻底粉碎。回访的时候，伴随着结构的转换，你甚至能听见那些被套牢的蠢货割肉的声音。谁错了，比长什么样更重要！',
          en: 'How to find a high-quality Breaker? Three steps: Defend, Defeat, Exploit! If a block is just poked by a wick, that\'s a fakeout, NOT a Breaker! A high-quality Breaker MUST be violently smashed through, completely obliterating control. Upon the return, accompanied by a structural shift, you can practically hear the trapped idiots crying as they cut their losses. WHO was wrong is far more important than what it looks like!'
        }
      },
      {
        id: 'm2-s12',
        title: {
          zh: 'Breaker Block 实盘图解',
          en: 'Breaker Block (Chart)'
        },
        bullets: { zh: [], en: [] },
        chartData: charts.breakerData,
        annotations: charts.breakerAnn,
        script: {
          zh: '看懂这个陷阱！前面有一个明显的看多订单块，多头在里面尝试反击，买盘大量涌入。结果下一秒，一根大阴线直接暴力下破，防守彻底失败！那群抄底的人全被活埋。随后价格反弹重回这个失效的蓝色区块，这就是在给套牢盘逃命的机会。被套多头平仓产生卖压，加上空头新开仓，看跌 Breaker 完美生效，行情直接断崖式暴跌！',
          en: 'Understand this trap! Earlier, there was a clear Bullish OB. Bulls tried to fight back, buying pressure swarmed in. The very next second, a massive red candle violently breaks it down—defense utterly fails! Everyone who bought the dip is buried alive. Price then bounces back into this breached blue zone, offering trapped longs a chance to escape. Trapped longs closing creates sell pressure, shorts stack on top, the Bearish Breaker activates perfectly, and price completely waterfalls!'
        }
      },
      {
        id: 'm2-s13',
        title: {
          zh: 'Vacuum Block：实盘极重要但没人教的真空区',
          en: 'Vacuum Block: Vital but Untaught Price Vacuum'
        },
        diagram: 'vacuum-concept',
        bullets: {
          zh: [
            '价格在局部区域极速穿越，几乎没有成交，留下“成交稀薄”的真空带',
            '与 OB 逻辑不同：OB 是位移起点，Vacuum 是位移中段的真空',
            '没有被市场“充分接受”的价格区域，缺乏防守厚度',
            '后续回访时，经常出现闪电般的快速回补或再度极速穿越'
          ],
          en: [
            'Price traverses a local zone so fast that virtually no trades occur, leaving a "thin" vacuum.',
            'Differs from OB: OB is the origin of displacement, Vacuum is the void in the middle.',
            'An area never "fully accepted" by the market, lacking defensive thickness.',
            'Upon return, it often triggers lightning-fast fills or another rapid traversal.'
          ]
        },
        script: {
          zh: '这是一个极其硬核的概念：真空块！普通讲师根本不懂。它和订单块完全不同，订单块是动能的起点，而 Vacuum 是价格因为极度疯狂而快速抽空的“途径地带”。因为走得太快，这个区域根本没有足够的单子成交，它极其脆弱！当价格以后再回到这里时，由于没有任何防守厚度，往往会像闪电一样快速穿透，或者极速填补后瞬间反转！',
          en: 'This is an extremely hardcore concept: Vacuum Block! Basic gurus have no clue. It is completely different from an OB. An OB is the origin of momentum, while a Vacuum is the "transit zone" that price sucked through during extreme mania. Because it moved so fast, barely any orders filled there; it is incredibly fragile! When price returns later, due to zero defensive thickness, it will either flash-crash through it, or fill it and instantly reverse!'
        }
      },
      {
        id: 'm2-s14',
        title: {
          zh: 'Vacuum Block 实盘图解',
          en: 'Vacuum Block (Chart)'
        },
        bullets: { zh: [], en: [] },
        chartData: charts.vacuumData,
        annotations: charts.vacuumAnn,
        script: {
          zh: '看中间这段极速下跌，价格在两三根K线内跨越了巨大的空间，根本没有停顿！这就形成了一个宽阔的真空带。这种区域因为没有经过双向拍卖的验证，内部像一张纸一样薄。注意看后面的走势，当价格重新回到这个真空带时，它根本不需要像测试订单块那样磨蹭，直接一根大阳线以同样极快的速度穿越回去！真空就是用来被快速填补的！',
          en: 'Look at this rapid drop in the middle. Price covers massive ground in just 2-3 candles with zero pause! This creates a wide Vacuum Zone. Because this area was never validated by two-way auctioning, its internals are as thin as paper. Notice the later action: when price revisits this vacuum, it doesn\'t grind around like it\'s testing an OB. It just rips right back through with a massive green candle at the exact same insane speed! Vacuums exist to be rapidly filled!'
        }
      },
      {
        id: 'm2-s15',
        title: {
          zh: '实盘操作：先找位移，不要先画框',
          en: 'Live Execution: Find Displacement First, Draw Boxes Later'
        },
        diagram: 'checklist',
        bullets: {
          zh: [
            '顺序绝对不能错：先发生明显的结构事件 (Sweep/CHOCH)',
            '再确认：离开时的动能是否足够强劲 (Displacement)',
            '回头定位：在位移起点附近找到真正有效的区块',
            '一句话原则：先证明“这里重要”，再去定义“它是什么 block”'
          ],
          en: [
            'The order is non-negotiable: Wait for a structural event first (Sweep/CHOCH).',
            'Confirm: Is the momentum leaving it genuinely powerful (Displacement)?',
            'Backtrack: Locate the valid block near the origin of the displacement.',
            'Golden Rule: Prove "this zone matters" first, then define "what block it is".'
          ]
        },
        script: {
          zh: '散户最蠢的做法是什么？打开图表，看到阴线阳线就满屏幕画框，然后祈祷价格撞上去。错！真正的机构玩家，一定是先看到市场发生了一起恶性事件，比如一次清扫流动性，或者一次结构崩塌。我们先确认了离开的动能极其恐怖，然后再回头去废墟里找那个发动袭击的起点区块！先有推移，后有区块，记不住这个，你趁早退市！',
          en: 'What is the dumbest thing retail does? They open a chart, see red/green candles, draw boxes everywhere, and pray price hits them. WRONG! Real institutional players wait to see a malicious event first—a liquidity sweep or a structural collapse. We confirm the leaving momentum is absolutely terrifying, and THEN we look back into the rubble to find the origin block that launched the attack! Displacement FIRST, Block SECOND. If you can\'t remember this, quit trading now!'
        }
      },
      {
        id: 'm2-s16',
        title: {
          zh: 'Module 2 核心结论：不要再做画框工',
          en: 'Module 2 Conclusions: Stop Being a Box Painter'
        },
        diagram: 'block-matrix',
        bullets: {
          zh: [
            '高级 OB 是位移起点，必须结合结构与流动性',
            'Mitigation 是风险处理与对冲，不是无脑延续',
            'Breaker 的力量来自多空角色的翻转与被套者的鲜血',
            'Vacuum 是未被验证的成交真空，注定被快速穿越'
          ],
          en: [
            'Advanced OB is the displacement origin, requiring structure + liquidity context.',
            'Mitigation is risk processing & hedging, not mindless continuation.',
            'Breaker power derives from flipped roles and the blood of trapped traders.',
            'Vacuum is unvalidated, thin action, destined to be rapidly traversed.'
          ]
        },
        script: {
          zh: '本章结束。从今天起，收起你那套只要拐点就画框的把戏。高级交易者绝不在图上画更多的区块，而是在极少的区块里，读出最血腥的筹码博弈逻辑！看清这是起点、还是修补、还是绞肉机。只有抛弃对形状的迷信，关注失衡背后的控制权，你才能看懂订单块真正的杀伤力！',
          en: 'Module 2 concluded. From today onwards, drop your pathetic habit of drawing a box at every swing. Advanced traders NEVER draw more blocks; they read the most bloodthirsty order-flow logic within the fewest blocks possible! Identify whether it\'s an Origin, a Mitigation, or a Meat Grinder. Only by discarding your fetish for shapes and focusing on the control behind the imbalance, will you finally understand the true lethality of Order Blocks!'
        }
      }
    ]
  },
  {
    id: 'm3',
    title: { zh: 'Module 3: Liquidity 思维', en: 'Module 3: Liquidity Mindset' },
    slides: [
      {
        id: 'm3-s1',
        title: { zh: 'Module 3 — Liquidity 思维\n机构到底在哪个位置收流动性？', en: 'Module 3 — Liquidity\nWhere Do Institutions Sweep Liquidity?' },
        diagram: 'liquidity-magnet',
        bullets: {
          zh: ['不再只看“哪里会反转”，而是先看“价格最可能先去哪里拿单”', '2025 年最新 6 种高概率流动性池识别法'],
          en: ['Stop guessing "where it reverses", start asking "where will it hunt for orders first?"', '2025\'s 6 Highest-Probability Liquidity Pools']
        },
        script: {
          zh: '市场绝对不是先决定方向，再顺便路过某些位置的！很多时候，市场恰恰是为了获取某些位置的流动性，才刻意制造了方向的假象。别他妈再问我这里会不会涨、会不会跌！高级玩家只关心一个问题：在这波行情真正启动前，主力必须先去哪里杀猪拿单？',
          en: 'The market absolutely does NOT decide a direction first and just happen to pass by certain levels! Most of the time, the market manufactures the illusion of a direction specifically to grab liquidity at certain levels. Stop f**king asking me if it will go up or down here! Advanced players only care about one thing: Before the real move starts, where must the smart money go to slaughter the pigs and fill their orders?'
        }
      },
      {
        id: 'm3-s2',
        title: { zh: '先纠正一个误区：Liquidity 不是神秘理论', en: 'Correcting a Myth: Liquidity is NOT a Conspiracy' },
        diagram: 'liquidity-reality',
        bullets: {
          zh: [
            '大资金无法像散户一样“一键全部成交”',
            '价格移动不仅是表达方向，更是在寻找可成交的对手盘',
            '所谓“扫流动性”，本质上是：触发止损、吸引追价、获得对手盘'
          ],
          en: [
            'Big money cannot "one-click execute" everything like retail does.',
            'Price movement isn\'t just direction; it is the active search for counterparties.',
            'A "Liquidity Sweep" is simply: triggering stops, attracting chasers, securing counterparties.'
          ]
        },
        script: {
          zh: '把流动性从你们脑子里的玄学和阴谋论中拉出来！机构不是在监控你的账户恶意扫你那一百块的止损，他们只是需要足够庞大的对手盘来完成建仓！散户的止损单、突破追涨单、被动挂单，恰好构成了机构极度渴求的流动性血包。你不懂这个，你就是那个血包！',
          en: 'Drag liquidity out of your mystical conspiracy theories! Institutions aren\'t monitoring your account to maliciously hunt your $100 stop loss; they simply need massive counterparty volume to build their positions! Retail stop losses, breakout chasers, and passive limits happen to form the exact liquidity bloodbags institutions desperately crave. If you don\'t understand this, YOU are the bloodbag!'
        }
      },
      {
        id: 'm3-s3',
        title: { zh: '高级 Liquidity 思维的核心问题', en: 'Core Questions of Advanced Liquidity Thinking' },
        diagram: 'liquidity-core',
        bullets: {
          zh: [
            '不要先问“会不会反转”，先问“市场最可能先拿哪里的单”',
            '1. 最近的显性流动性池在哪里？',
            '2. 市场当前更需要“扫上方”还是“扫下方”？',
            '3. 收完流动性后，是反转、延续，还是派发？'
          ],
          en: [
            'Stop asking "will it reverse?", ask "where will it grab orders first?"',
            '1. Where is the nearest obvious liquidity pool?',
            '2. Does the market currently need to sweep above or below?',
            '3. After sweeping, is it Reversal, Continuation, or Distribution?'
          ]
        },
        script: {
          zh: '这就是全章的灵魂逻辑！很多蠢货过早地下注方向，却完全忽略了市场在启动前必然会去执行一次“流动性清扫”。你要把“这里好像是支撑阻力”的散户思维，直接升级成“在真正爆拉之前，这根K线最可能先插去哪里吸血？”记住这句话：价格总是先去寻找流动性，然后才暴露出它的真实意图！',
          en: 'This is the soul logic of this entire module! Idiots bet on direction way too early, completely ignoring that the market WILL execute a liquidity sweep before taking off. You must upgrade your retail "this looks like support/resistance" mindset into "before the real pump, where is this candle most likely to spike down to suck blood?" Memorize this: Price always seeks liquidity FIRST, then reveals its true intent!'
        }
      },
      {
        id: 'm3-s4',
        title: { zh: '流动性池不是只有 Equal Highs/Lows', en: 'Liquidity Pools Are NOT Just Equal Highs/Lows' },
        diagram: 'liquidity-pool-types',
        bullets: {
          zh: [
            '市面上常教的等高低点只是冰山一角，实盘中有 6 类高概率池：',
            '1. Equal Highs / Equal Lows 型 (等高/低点)',
            '2. Stop Hunt / Swing Extreme 型 (极值假突破)',
            '3. FVG 诱导型 (失衡缺口引流)',
            '4. Old High / Old Low 磁吸型 (历史锚点)',
            '5. Session High/Low 型 (时段极值)',
            '6. Crowded Structure 型 (拥挤趋势线)'
          ],
          en: [
            'Equal highs/lows taught online are just the tip of the iceberg. 6 High-Prob Pools:',
            '1. Equal Highs / Equal Lows',
            '2. Stop Hunt / Swing Extreme',
            '3. FVG Inducement (Trap)',
            '4. Old High / Old Low Magnet',
            '5. Session High/Low',
            '6. Crowded Structure / Trendlines'
          ]
        },
        script: {
          zh: '你们是不是以为学会了画两个平齐的高点就懂流动性了？太天真了！市面上大多数教的东西在实战中根本不够用。很多最恐怖的绞肉机行情，根本不会给你教科书般的等高低点！今天我直接给你 2025 年实盘里最常见的 6 类高概率流动性池，让你看清主力真正的屠刀藏在哪里！',
          en: 'Did you think learning to draw two even highs means you understand liquidity? So naive! Most of what is taught out there is useless in live trading. The most terrifying meat-grinder markets will NEVER give you textbook equal highs! Today I\'m giving you the 6 most common high-probability liquidity pools in 2025 live markets, so you can see exactly where the smart money hides its butcher knife!'
        }
      },
      {
        id: 'm3-s5',
        title: { zh: '类型 1：Equal Highs / Equal Lows (等高低点)', en: 'Type 1: Equal Highs / Equal Lows' },
        diagram: 'equal-highs-concept',
        bullets: {
          zh: [
            '当价格多次接近同一高点，市场会自然聚集突破追单与止损单',
            '图形可见度极高，散户预期高度一致，天然成为主力的提款机',
            '等高低点本身绝对不是做单信号',
            '真正的优势在于：扫完之后是被拒绝(反转)，还是被接受(延续)？'
          ],
          en: [
            'Multiple taps of the same high naturally accumulate breakout chasers and stop losses.',
            'Highly visible, highly uniform retail expectation makes it a natural ATM for smart money.',
            'Equal Highs/Lows are absolutely NOT an entry signal themselves.',
            'The real edge: After the sweep, is price rejected (reversal) or accepted (continuation)?'
          ]
        },
        script: {
          zh: '这是最经典，也是你们死得最多的一种流动性池！三个相近的高点摆在那里，散户眼里那是坚不可摧的“强阻力”，但在机构眼里，那就是挂满了多头突破单和空头止损单的圣诞树！初学者以为“扫了就一定会反转”。错！高级交易员根本不在乎它扫没扫，我们只看扫完那一瞬间，市场是立刻把价格按死在水下，还是踩着散户的尸体继续往上冲！',
          en: 'This is the most classic, and the one where you die the most! Three roughly equal highs sit there; retail sees an "impenetrable strong resistance", but institutions see a Christmas tree decorated with long breakout orders and short stop losses! Beginners think "if it sweeps, it must reverse." WRONG! Advanced traders don\'t care that it swept; we watch the split-second AFTER the sweep. Does the market immediately drown the price, or does it step on retail corpses to continue higher?'
        }
      },
      {
        id: 'm3-s6',
        title: { zh: 'Equal Highs 流动性池实盘图解', en: 'Equal Highs Pool (Chart)' },
        bullets: { zh: [], en: [] },
        chartData: charts.m3EqualHighsData,
        annotations: charts.m3EqualHighsAnn,
        script: {
          zh: '看屏幕！图上这两个极其平齐的高点，简直像是在大声呼喊“快来做空我”！第三次上冲时，价格微微刺破了黄线，所有散户的空头止损被瞬间打爆，突破追多的跟风盘疯狂涌入！结果呢？下一根K线直接一记闷棍砸下来，这就是极度恶劣的扫损加拒绝！不要在突破时高潮，信号永远来自扫损后的空头砸盘！',
          en: 'Look at the screen! These two perfectly equal highs on the chart are practically screaming "short me"! On the third push, price barely pierces the yellow line, instantly blowing out all retail short stops while breakout chasers FOMO in! And the result? The very next candle delivers a brutal club to the head. This is an absolutely malicious sweep and rejection! Stop getting high on breakouts; the signal always comes from the bearish displacement AFTER the sweep!'
        }
      },
      {
        id: 'm3-s7',
        title: { zh: '类型 2：Stop Hunt / Swing Extreme (极值假突破)', en: 'Type 2: Stop Hunt / Swing Extreme' },
        diagram: 'stop-hunt-concept',
        bullets: {
          zh: [
            '价格定点刺穿一个明显的前期波段高点或低点',
            '不需要一片等高低点，只需要一个足够明显的局部极值',
            '触发前期仓位止损，吸引算法流动性',
            'Stop hunt 不是为了故意骗你，而是市场在关键位置寻找高密度成交'
          ],
          en: [
            'Price surgically pierces a clear prior swing high or swing low.',
            'Doesn\'t need a cluster of equal highs; a single obvious local extreme is enough.',
            'Triggers legacy stop losses and attracts algorithmic liquidity.',
            'Stop hunts aren\'t "trying to trick you"; the market is just finding dense liquidity.'
          ]
        },
        script: {
          zh: '并不是非要等高低点才会发生假突破！很多时候，市场只需要一个足够显眼的前期波段低点，就足够完成一波收割了。机构精准地下刺这个极值，把那些把止损设在“支撑位下方一两跳”的聪明散户全部洗掉！记住，主力不是在针对你，你还没那个资格。他们只是在用你的止损单，作为他们庞大反向仓位的燃料！',
          en: 'You don\'t ALWAYS need equal highs/lows for a fakeout! Often, the market just needs ONE glaringly obvious prior swing low to execute a harvest. Institutions surgically spike this extreme, washing out all the "smart" retail traders who placed their stops "a couple ticks below support"! Remember, smart money isn\'t targeting you personally; you aren\'t worth it. They are simply using your stop orders as fuel for their massive reversal positions!'
        }
      },
      {
        id: 'm3-s8',
        title: { zh: 'Swing Low Stop Hunt 实盘图解', en: 'Swing Low Stop Hunt (Chart)' },
        bullets: { zh: [], en: [] },
        chartData: charts.m3StopHuntData,
        annotations: charts.m3StopHuntAnn,
        script: {
          zh: '这张图就是典型的极值扫损！看到这个前期波段低点了吗？价格阴跌下来，瞬间刺穿红线，散户绝望爆仓。但仅仅在一根K线内，价格迅速收回并爆发出了强烈的看多推移！这叫什么？这就叫 Reclaim (重新夺回控制权)！在极值位置被刺破后迅速收回，这就是最高胜率的买点，而你们却在这里割肉！',
          en: 'This chart is a textbook extreme sweep! See this prior swing low? Price bleeds down, instantly pierces the red line, and retail capitulates in despair. But within a single candle, price reclaims the level and explodes with violent bullish displacement! What is this called? RECLAIM! A quick pierce and immediate recovery at an extreme is the highest win-rate buy signal in existence, yet you guys are busy cutting losses right here!'
        }
      },
      {
        id: 'm3-s9',
        title: { zh: '类型 3：FVG 诱导型 (失衡缺口引流)', en: 'Type 3: FVG Inducement (Trap)' },
        diagram: 'fvg-trap-concept',
        bullets: {
          zh: [
            '最容易被忽视的绞肉机：“看似是回补机会，实则是引流容器”',
            '明显的失衡缺口 (FVG) 会吸引大量“死磕 FVG”的散户提前入场',
            '这些提前布局者的止损，反而构成了新的流动性池',
            '价格进入 FVG 诱导多头后，继续深插扫掉止损，才真正发动'
          ],
          en: [
            'The most overlooked meat-grinder: "Looks like an entry, is actually a trap container."',
            'Obvious FVGs attract massive amounts of retail FVG-traders entering early.',
            'The stop losses of these early entrants become the NEW liquidity pool.',
            'Price enters FVG to induce longs, dumps deeper to sweep them, THEN takes off.'
          ]
        },
        script: {
          zh: '现在市面上到处都在教 FVG 失衡缺口，导致 FVG 本身也成了主力的诱导工具！不要看到缺口就无脑冲进去接盘。某些极其显眼的 FVG，其实是用来“养猪”的！主力故意留个缺口，等价格回来时，吸引你们这群学了点皮毛的人疯狂做多。然后一根大阴线直接贯穿缺口，扫掉你们放在缺口下方的止损，最后才真正拉升！',
          en: 'Every guru is teaching FVGs now, which means FVGs have become institutional traps! Do not blindly bid every gap you see. Some blatantly obvious FVGs are designed to fatten the pigs! Smart money deliberately leaves a gap, waits for price to return, and induces all you half-educated traders to go long. Then, a massive red candle nukes right through the gap, sweeping the stops you placed below it, and ONLY THEN does it actually pump!'
        }
      },
      {
        id: 'm3-s10',
        title: { zh: 'FVG 诱导深扫实盘图解', en: 'FVG Inducement Trap (Chart)' },
        bullets: { zh: [], en: [] },
        chartData: charts.m3FvgTrapData,
        annotations: charts.m3FvgTrapAnn,
        script: {
          zh: '好好看看你们是怎么死在所谓“聪明钱概念”里的！前面一波拉升留下了一个巨大、完美的看多 FVG。价格一跌进去，做多买盘就迫不及待地涌入。但行情根本没有涨！反而继续阴跌，直接杀穿了缺口底部，扫清了所有低点的真实流动性！把那些提前埋伏的所谓SMC交易员全部干爆之后，市场才真正展开了暴涨！',
          en: 'Take a good look at how you die trading "Smart Money Concepts"! The prior pump leaves a massive, textbook bullish FVG. The moment price enters it, eager long volume floods in. But it doesn\'t pump! Instead, it continues to bleed, completely smashing through the bottom of the gap to clear the TRUE liquidity at the lows! Only after obliterating all those early "SMC traders" does the market finally unleash the real rally!'
        }
      },
      {
        id: 'm3-s11',
        title: { zh: '类型 4：Old High / Old Low (历史锚点磁吸)', en: 'Type 4: Old High / Old Low Magnet' },
        diagram: 'old-high-magnet',
        bullets: {
          zh: [
            '历史极值不仅是技术位置，更是市场全体参与者的“预期锚点”',
            '价格经常被像磁铁一样吸回这些位置，用于清理旧仓位或测试接受度',
            '旧高旧低不要只当成“到了就必反”的静态阻力支撑',
            '高级视角：旧高旧低通常是路径的目标，而不是行情的终点'
          ],
          en: [
            'Historical extremes aren\'t just technical levels; they are global "expectation anchors".',
            'Price is magnetically drawn back here to clear legacy positions or test acceptance.',
            'Do NOT treat Old Highs/Lows as static "must-reverse" support/resistance.',
            'Advanced View: Old Highs/Lows are usually path targets, not the final destination.'
          ]
        },
        script: {
          zh: '旧高旧低，也就是几天前、甚至几周前留下的高低点。普通人拿它画支撑阻力，指望着价格碰到了就原地反转。蠢透了！在机构眼里，这种历史极值就是一个巨大的磁铁！当价格失去方向时，它最倾向于去测试这些带有重磅历史记忆的位置。去那里干嘛？不仅是为了扫损，更是为了测试市场在新价格下是否能被接受！',
          en: 'Old highs and old lows—extremes from days or weeks ago. Retail draws S/R lines on them, praying price hits and reverses on a dime. Idiotic! To institutions, these historical extremes are gigantic magnets! When price lacks clear direction, it heavily favors testing these levels loaded with historical memory. Why go there? Not just to sweep stops, but to test if the market will ACCEPT the new pricing paradigm!'
        }
      },
      {
        id: 'm3-s12',
        title: { zh: '类型 5：Session High/Low (时段极值扫损)', en: 'Type 5: Session High/Low Sweep' },
        diagram: 'session-sweep-concept',
        bullets: {
          zh: [
            '时间窗口本身就是流动性的聚集器！',
            '亚洲盘、伦敦盘、纽约开盘形成的高低点，天然积累算法与日内机构挂单',
            '高概率剧本：伦敦盘假破亚洲盘低点，纽约盘再反转',
            '抛开几何形态，把时间和价格叠加，才是日内交易的核武器'
          ],
          en: [
            'Time windows themselves are massive liquidity aggregators!',
            'Highs/Lows of Asia, London, or NY Open naturally stack algo and intraday orders.',
            'High-Prob Script: London fakes out the Asia Low, NY reverses it entirely.',
            'Forget just geometric shapes; stacking TIME and PRICE is the nuke for intraday trading.'
          ]
        },
        script: {
          zh: '日内交易员把耳朵竖起来！真正的日内杀戮，是按照时间表准时进行的！亚洲盘那慢吞吞的震荡，就是在蓄水、在堆积流动性！等到伦敦盘开盘，一刀捅穿亚洲盘的低点，把日内做多的散户全部杀光，拿到足够的低位筹码，然后在纽约盘直接发动一波单边暴涨！这就叫时段扫损！看不懂时间轴的流动性，你日内就是被来回抽耳光！',
          en: 'Intraday traders, listen up! The real intraday slaughter runs precisely on a schedule! The slow, grinding chop of the Asian session is just pooling water, stacking liquidity! When London opens, it violently stabs through the Asian low, slaughtering all intraday longs, securing enough cheap accumulation, and then the NY session launches a unilateral pump! That is a Session Sweep! If you can\'t read time-based liquidity, you\'re just getting slapped back and forth all day!'
        }
      },
      {
        id: 'm3-s13',
        title: { zh: 'Session Sweep 实盘图解', en: 'Session Sweep (Chart)' },
        bullets: { zh: [], en: [] },
        chartData: charts.m3SessionData,
        annotations: charts.m3SessionAnn,
        script: {
          zh: '看看这张极其血腥的日内图！前面这个蓝色的窄幅区间，就是大量散户在里面磨洋工的亚洲盘。到了伦敦时段，主力毫无征兆地发动了一次极其残暴的下砸，直接刺穿亚洲盘的最低点！所有的早盘多头全部爆仓。然而扫完流动性后，市场不但没有继续暴跌，反而掉头疯狂拉升，开启了一天的真正趋势！主力用你的血，祭了他们的旗！',
          en: 'Look at this absolutely bloody intraday chart! This narrow blue range at the start is the Asian session where retail traders waste their time chopping around. Come London, smart money launches an unprovoked, savage dump that pierces straight through the Asian low! All early longs get liquidated. Yet after securing that liquidity, instead of crashing further, the market U-turns into an insane rally, triggering the true trend of the day! Smart money used your blood to bless their flag!'
        }
      },
      {
        id: 'm3-s14',
        title: { zh: '类型 6：拥挤结构 (当所有人看到同一条线)', en: 'Type 6: Crowded Structure (Trendlines)' },
        diagram: 'crowded-trendline',
        bullets: {
          zh: [
            '当足够多的人在图上画出同一条趋势线时，它就成了最致命的流动性池',
            '完美的上升趋势线/通道，必定会吸引海量的同质化止损单',
            '跌破趋势线触发追空与多头止损后，迅速收回 (Squeeze)',
            '线条的价值不在于它的几何支撑力，而在于它暴露了大众仓位的位置'
          ],
          en: [
            'When everyone draws the exact same trendline, it becomes the deadliest liquidity pool.',
            'A perfect ascending trendline/channel absolutely guarantees a massive stack of uniform stops.',
            'Breaking the line triggers shorts and long stops, followed by a violent squeeze back up.',
            'A line\'s value isn\'t geometric support; it\'s that it exposes exactly where retail is positioned.'
          ]
        },
        script: {
          zh: '我再说一次：去他妈的趋势线！当全世界所有的初级分析师都在你们的群里分享同一根斜线时，这条线就是死亡通知书！主力看到这条线，看到的不是支撑，而是挂在线下方那数以万计的止损单！他们只需轻轻一推，跌破趋势线，空头大军狂欢入场，多头崩溃割肉。就在所有人以为趋势反转时，一波暴力轧空直接把空头拉爆！',
          en: 'I will say it again: F**K the trendline! When every junior analyst in your discord is sharing the exact same diagonal line, that line is a death warrant! Smart money doesn\'t see support; they see tens of thousands of stop losses sitting right below it! They just give it a little nudge, it breaks the trendline, the short army celebrates, longs puke. Just when everyone thinks the trend reversed, a violent short squeeze detonates every bear in the room!'
        }
      },
      {
        id: 'm3-s15',
        title: { zh: 'Liquidity Event 之后的 3 种生死路径', en: '3 Paths After a Liquidity Event' },
        diagram: 'sweep-paths',
        bullets: {
          zh: [
            '记住核心原则：扫流动性本身不是信号，扫完之后的行为才是！',
            '1. Sweep and Reverse (扫损反转)：拿完流动性后快速反向推移离开',
            '2. Sweep and Continue (扫损延续)：扫完后获得市场接受，按原方向继续推进',
            '3. Sweep and Distribute (扫损派发)：扫完后进入双向绞肉机震荡'
          ],
          en: [
            'Core Rule: The sweep itself is NOT the signal; the behavior AFTER the sweep is!',
            '1. Sweep & Reverse: Grabs liquidity, then violently displaces in the opposite direction.',
            '2. Sweep & Continue: Grabs liquidity, gains market acceptance, and pushes trend further.',
            '3. Sweep & Distribute: Grabs liquidity, then enters a two-way chop zone.'
          ]
        },
        script: {
          zh: '很多人学了一点皮毛，一看到假突破就急着反手做单。愚蠢！扫流动性本身绝不是最终的做单信号，扫完之后市场怎么对待这个新价格，才是定生死的关键！是拿完单子立刻反向砸盘？还是把这个扫损位当成踏板继续上冲？你必须等一等，看看后面有没有结构破坏和强力推移！地图优先，信号其次！',
          en: 'Many learn a tiny bit and immediately reverse their position the second they see a sweep. Stupidity! A liquidity sweep itself is NEVER the final entry signal. How the market treats the price AFTER the sweep is what dictates life and death! Do they grab orders and instantly dump it the other way? Or do they use that sweep as a springboard to push even higher? You MUST wait to see if structural shifts and displacement follow! Map first, signal second!'
        }
      },
      {
        id: 'm3-s16',
        title: { zh: 'Module 3 核心结论：切换到路径思维', en: 'Module 3 Conclusions: Shift to Path Thinking' },
        diagram: 'liquidity-summary',
        bullets: {
          zh: [
            '市场必须先获取流动性，然后才会暴露真实意图',
            '识别 6 种隐藏在图表中的高概率流动性池，不再迷信几何线条',
            '重点观察流动性被清扫后的：接受度、拒绝力度以及结构变化',
            '真假扫损的区别在于速度与后续动能'
          ],
          en: [
            'The market MUST acquire liquidity before it ever exposes its true intent.',
            'Identify the 6 high-prob pools hidden in charts; stop worshipping geometric lines.',
            'Focus heavily on what happens post-sweep: Acceptance, Rejection, and Structure Shifts.',
            'The difference between a true and fake sweep lies in speed and follow-through momentum.'
          ]
        },
        script: {
          zh: '从今天起，彻底洗掉“这里是不是阻力支撑”的废材思维！你要像一匹华尔街的饿狼一样，盯着图表问：“这根肥美多汁的流动性香肠挂在哪里？”不要在价格到达流动性池之前下注，让散户去当探路石。你要做的是等价格残忍地处理完这些止损后，跟着主力真正的意图扣动扳机！',
          en: 'Starting today, completely wash away the useless "is this support or resistance" mindset! You need to stare at the chart like a starved Wall Street wolf and ask: "Where is the fat, juicy sausage of liquidity hanging?" Never place a bet before price reaches the liquidity pool; let retail be the cannon fodder. Your job is to wait until price ruthlessly processes those stops, and then pull the trigger alongside the smart money\'s true intent!'
        }
      }
    ]
  },
  {
    id: 'm4',
    title: { zh: 'Module 4: Fair Value Gap 进阶', en: 'Module 4: FVG Advanced' },
    slides: [
      {
        id: 'm4-s1',
        title: {
          zh: 'Module 4 — Fair Value Gap 进阶\nFVG 不是用来无脑接飞刀的',
          en: 'Module 4 — Fair Value Gap Advanced\nFVG Is Not For Blindly Catching Knives'
        },
        bullets: {
          zh: [
            '从“等回补进场”升级到“读取市场效率、诱导陷阱与角色翻转”',
            '如果你把 FVG 只当成一个入场框，你会错过它 70% 的价值'
          ],
          en: [
            'Upgrade from "waiting for retrace" to "reading efficiency, traps & inversion"',
            'If you only use FVG as an entry box, you miss 70% of its value'
          ]
        },
        script: {
          zh: '欢迎来到第四模块。如果你还在把 FVG 当成无脑接飞刀的入场框，那你就是这个市场的流动性血包！市面上的教程只会教你“看到缺口就等回补”，简直愚蠢透顶。在这个模块，我们要把 FVG 拆解成四种极度嗜血的真实用途。我要教你的，不是怎么画缺口，而是怎么通过缺口读出主力的屠杀意图！',
          en: 'Welcome to Module 4. If you are still using FVG as a brainless box to catch falling knives, you are nothing but a liquidity bloodbag! The tutorials out there only teach you "wait for a retrace into the gap"—pure stupidity. In this module, we will deconstruct FVG into 4 ruthlessly realistic applications. I am not teaching you how to draw a gap; I am teaching you how to read the smart money\'s slaughtering intent through it!'
        }
      },
      {
        id: 'm4-s2',
        title: { zh: '为什么散户画的 FVG 一碰就碎', en: 'Why Retail FVGs Fail Instantly' },
        diagram: 'fvg-anatomy',
        bullets: {
          zh: [
            'FVG 的本质：强力推移 (Displacement) 导致的极度失衡与重定价',
            '没有动能支持的缺口，只是一堆随机K线的缝隙',
            '不看结构位置，不区分延续型、诱导型与翻转型的 FVG 必定失败'
          ],
          en: [
            'The Essence of FVG: Severe imbalance and repricing caused by Displacement.',
            'A gap without momentum support is just a random space between candles.',
            'Ignoring context and failing to distinguish Continuation, Inducement, and Inversion FVGs will guarantee failure.'
          ]
        },
        script: {
          zh: '你们以为找到三根K线没有重叠的部分就是 FVG 了？错！FVG 本身不是起因，而是结果！它是由于主力发了疯一样地单边砸盘或抢筹，导致市场根本来不及进行双边撮合，留下了极度失衡的真空带！如果你画的 FVG 前面没有那种让人窒息的动能爆发，那它就是垃圾，一碰就会被砸穿！',
          en: 'You think finding three candles with no overlap equals an FVG? Wrong! FVG is not the cause, it is the result! It is the aftermath of smart money dumping or accumulating so violently that the market had zero time to pair bidirectional orders, leaving a severely imbalanced vacuum! If the FVG you drew doesn\'t stem from explosive, suffocating momentum, it\'s trash and will be smashed instantly upon touch!'
        }
      },
      {
        id: 'm4-s3',
        title: { zh: 'FVG 的 4 种机构级真实用途', en: 'The 4 Institutional Purposes of FVG' },
        diagram: 'fvg-four-purposes',
        bullets: {
          zh: [
            '1. 延续型入场区：健康趋势中的回补与接盘',
            '2. 效率阅读工具：通过缺口填补的深浅，读取市场动能强弱',
            '3. 诱导陷阱 (Trap)：太明显的教科书级 FVG，往往是引流坑',
            '4. 角色翻转 (Inversion)：失守后的 FVG 反向利用，控制权切换'
          ],
          en: [
            '1. Continuation Entry: Retrace and execution in a healthy trend.',
            '2. Efficiency Read: Gaging momentum strength via how deeply the gap is filled.',
            '3. Inducement Trap: Overly obvious textbook FVGs are often bait.',
            '4. FVG Inversion: Reverse utilization of a failed gap, signaling control shift.'
          ]
        },
        script: {
          zh: '顶级交易员看 FVG 绝对不会只问“能不能在这里开仓？”我们问的是：“这块缺口在当前的绞肉局里扮演什么角色？”它是用来顺势上车的？还是主力故意做给你看，用来诱杀你的陷阱？或者是防守失败后，用来反向追杀的翻转位？接下来，我们把这四种用法挨个扒光！',
          en: 'Top-tier traders looking at an FVG NEVER just ask "can I open a trade here?". We ask: "What role does this gap play in the current meatgrinder?" Is it for a trend continuation? Or is it a textbook trap deliberately painted by smart money to induce you? Or is it a failed defense zone turning into a reverse slaughter setup? Next, we strip these four purposes down completely!'
        }
      },
      {
        id: 'm4-s4',
        title: { zh: '用途 1：延续型回补入场', en: 'Purpose 1: Continuation Entry' },
        bullets: {
          zh: [
            '这是最基础的用法，前提是：顺大级别结构方向',
            '形成它的那一波推移必须极其暴力',
            '回补动作必须是“被动、缓慢”的，没有强烈的反向动能',
            '接触 FVG 后，必须出现快速的拒绝或强力反弹'
          ],
          en: [
            'The most basic use, but demands strict alignment with higher timeframe structure.',
            'The impulsive leg that formed it MUST be extremely violent.',
            'The retrace into it must be passive and slow, with no aggressive counter-momentum.',
            'Upon tapping the FVG, there must be a rapid rejection or strong bounce.'
          ]
        },
        script: {
          zh: '延续型 FVG 是唯一可以顺势开仓的缺口。但是听好！前提是大级别的结构必须明确支持你！当价格跌回缺口时，千万不要看到一根针就直接跳进去！你要观察：它回调的时候是不是软弱无力？碰到缺口时，是不是像触电一样立刻被买盘托起？如果是，扣动扳机！',
          en: 'Continuation FVG is the only gap you use for trend entries. But listen carefully! The higher timeframe structure MUST explicitly support you! When price drops back into the gap, do not just jump in blindly upon seeing a wick! Observe: is the pullback weak and passive? When it taps the gap, does it bounce immediately like touching a live wire? If yes, pull the trigger!'
        }
      },
      {
        id: 'm4-s5',
        title: { zh: '实盘图解：延续型 FVG', en: 'Chart: Continuation FVG' },
        chartData: charts.m4ContData,
        annotations: charts.m4ContAnn,
        bullets: { zh: [], en: [] },
        script: {
          zh: '看着这张图！多头主力一记重拳，暴力拉升，直接撕开了一个巨大的失衡缺口。随后散户开始恐高抛售，价格慢悠悠地滑落进这片绿色真空带。这叫健康回补！一接触到核心区域，买盘瞬间接管，留下拒绝的长下影线，随后一根大阳线再度拔地而起。这就是顺势的延续，干脆利落！',
          en: 'Look at this chart! Bullish smart money delivers a heavy uppercut, violently pushing price up and ripping open a massive inefficiency gap. Retail then panic-sells, letting price slowly drift down into this green vacuum. This is a healthy retrace! The second it taps the core zone, buy orders instantly take over, leaving a rejection wick, followed by another massive green candle exploding upwards. That is trend continuation, clean and lethal!'
        }
      },
      {
        id: 'm4-s6',
        title: { zh: '用途 2：效率阅读工具 (读强弱)', en: 'Purpose 2: Efficiency Read (Momentum)' },
        diagram: 'fvg-checklist',
        bullets: {
          zh: [
            '缺口不是非得用来做单，它是行情的测谎仪',
            '极强趋势特征：连续留下多个 FVG，且每次回撤只触碰浅层就爆拉',
            '衰竭特征：缺口被深度填补，回踩后没有创出有力的新高',
            '缺口的保留程度，直接暴露了机构抢筹/派发的迫切性'
          ],
          en: [
            'Gaps aren\'t just for entering; they are the market\'s polygraph.',
            'Extreme Trend: Leaves consecutive FVGs, pullbacks barely tap them before rocketing.',
            'Exhaustion: Gaps filled too deeply, zero follow-through high after the retest.',
            'Gap preservation directly exposes the urgency of institutional accumulation/distribution.'
          ]
        },
        script: {
          zh: '别满脑子只想着找入场点！高级交易员把 FVG 当成动能的测谎仪。如果一波上涨极其饥渴，它会连续踩出多个缺口，而且每次回调根本连缺口底部都摸不到，浅尝辄止就继续狂飙。这叫迫切性！如果你发现缺口被反复深度插入，反弹像死狗一样无力，那就说明多头已经弹尽粮绝了！',
          en: 'Stop obsessing solely over entries! Elite traders use FVG as a momentum polygraph. If an uptrend is violently starved for liquidity, it will leave consecutive gaps, and pullbacks won\'t even touch the bottom of them—shallow taps and boom, it rockets again. That is URGENCY! If you see a gap being penetrated deeply repeatedly, and the bounce is as weak as a dead dog, the bulls have run out of ammo!'
        }
      },
      {
        id: 'm4-s7',
        title: { zh: '实盘图解：通过 FVG 读强弱', en: 'Chart: Reading Strength via FVG' },
        chartData: charts.m4StrengthData,
        annotations: charts.m4StrengthAnn,
        bullets: { zh: [], en: [] },
        script: {
          zh: '仔细看！这波上涨根本不给你任何上车的机会。连续撕开两个巨大的看多缺口！你们那些整天挂单在缺口最下方等完美回踩的人，连汤都喝不到！为什么？因为主力抢筹已经进入了疯狗模式！回调仅仅只是极其微弱地蹭了一下第二个缺口的上边缘，立刻原地爆炸！当你读懂了这种迫切性，你就不会死板地去等深调了！',
          en: 'Watch closely! This rally gives you absolutely zero chance to get on board nicely. It rips open two massive bullish gaps back-to-back! Those of you who blindly set limit orders at the very bottom of the gap waiting for a "perfect retest" won\'t even get scraps! Why? Because institutional accumulation is in rabid dog mode! The pullback barely scrapes the top edge of the second gap before exploding again! When you can read this urgency, you stop rigidly waiting for deep pullbacks!'
        }
      },
      {
        id: 'm4-s8',
        title: { zh: '用途 3：流动性诱导陷阱 (Trap)', en: 'Purpose 3: Inducement Trap' },
        diagram: 'fvg-trap-logic',
        bullets: {
          zh: [
            '当一个 FVG 长得太完美、太明显时，它通常是诱饵',
            '特征 1：下方/上方有未被清扫的明显流动性池 (止损池)',
            '特征 2：价格刚进 FVG 给你点甜头，随后一根大阴线/大阳线将你扫死',
            '记住：如果市场有更大块的肥肉没吃，它绝不会在此停下'
          ],
          en: [
            'When an FVG looks too perfect and obvious, it\'s usually bait.',
            'Trait 1: Obvious un-swept liquidity pools (stop losses) residing just below/above it.',
            'Trait 2: Price enters the FVG, gives you a fake bounce, then a massive candle slaughters you.',
            'Rule: If the market has a juicier piece of meat untaken, it will NEVER stop here.'
          ]
        },
        script: {
          zh: '这一页价值百万！当教科书上最完美的那种 FVG 出现时，你最好捂紧钱包。如果这个缺口的下方，还挂着一大片显而易见的散户止损池，机构绝对不可能这么好心让你在缺口接盘起飞！他们会先在缺口给你一点小反弹的甜头，骗你重仓做多，然后突然一刀向下捅穿，把你们连人带缺口全部绞碎，拿到下面那片真正的流动性后，才会真正起飞！',
          en: 'This page is worth millions! When the most textbook, perfect-looking FVG appears, you better guard your wallet. If right below this gap sits a massive, obvious retail stop-loss pool, institutions are NEVER kind enough to let you buy the gap and ride to the moon! They will give you a tiny bounce in the gap to trick you into going heavy long, and then violently stab downward, shredding you and the gap, grabbing the REAL liquidity below before taking off!'
        }
      },
      {
        id: 'm4-s9',
        title: { zh: '实盘图解：FVG 诱导陷阱', en: 'Chart: The FVG Trap' },
        chartData: charts.m4TrapData,
        annotations: charts.m4TrapAnn,
        bullets: { zh: [], en: [] },
        script: {
          zh: '欣赏这场屠杀！前面拉出一根极其霸道的大阳线，留下的缺口简直漂亮得让人流口水。价格一踩进去，立刻反弹。无数散户在群里欢呼“回补确认，全仓冲！”。结果呢？下一根红线直接如同断头台一般砸下来！无情贯穿缺口，把所有多头的止损全部扫光。扫完流动性之后，一根暴力阳线正式宣告真正方向。你们就是主力的踏脚石！',
          en: 'Witness the slaughter! A massive, domineering green candle is printed, leaving a gap so beautiful you drool. Price taps it, instantly bounces. Countless retail traders cheer "retest confirmed, all in!". The result? The very next red candle drops like a guillotine! It ruthlessly pierces the gap, wiping out every single long stop. Once that liquidity is harvested, a violent green candle officially dictates the true direction. YOU are the smart money\'s stepping stone!'
        }
      },
      {
        id: 'm4-s10',
        title: { zh: '用途 4：FVG Inversion (核心大杀器)', en: 'Purpose 4: FVG Inversion (The Nuke)' },
        diagram: 'fvg-inversion-logic',
        bullets: {
          zh: [
            '2025年机构最爱打法：教科书结构失效后的残忍反杀',
            '当原本该防守的 FVG 被明确打穿，且在另一侧站稳 (Acceptance)',
            '这个缺口立刻发生了“角色翻转”：前期的支撑变成了最硬的阻力',
            '它的力量来源于：前期按教科书做多的人被死死套牢，被迫割肉反向推动'
          ],
          en: [
            '2025 Institutional Favorite: Ruthless reversal utilizing failed textbook structures.',
            'When an FVG meant to defend gets explicitly breached and accepted on the other side.',
            'The gap instantly undergoes "Role Inversion": prior support becomes the hardest resistance.',
            'Its power comes from: textbook traders being trapped and forced to puke, driving the new move.'
          ]
        },
        script: {
          zh: '这是现在胜率最高、杀伤力最大的战法——FVG Inversion！当全网都在教 FVG 回补的时候，真正的猎手专等这种教科书级别的缺口失效！当价格无视这个多头缺口，直接砸穿并在下方站稳时，防守彻底崩溃。这时候，原来做多的人全部变成了待宰的羔羊。当价格反弹重回这个缺口下方时，它已经变成了见血封喉的阻力位！',
          en: 'This is currently the highest win-rate, most lethal tactic: FVG Inversion! While the entire internet teaches buying FVG retraces, the true predators wait for these textbook gaps to fail! When price ignores a bullish gap, smashing through and gaining acceptance below, defense collapses entirely. Now, all the prior longs become lambs for the slaughter. When price bounces back to the underside of this gap, it has mutated into a blood-drawing resistance level!'
        }
      },
      {
        id: 'm4-s11',
        title: { zh: '实盘图解：FVG Inversion 杀戮现场', en: 'Chart: FVG Inversion Slaughter' },
        chartData: charts.m4InversionData,
        annotations: charts.m4InversionAnn,
        bullets: { zh: [], en: [] },
        script: {
          zh: '看懂这张图，你的交易将升华一个层级！前面留下了多头缺口，理应是极好的支撑。但是价格跌入缺口后，完全没有任何抵抗，直接切豆腐一样切了下去，这叫 Acceptance Below (下方接受)！结构彻底破坏。多头已经全线被套。此时价格反抽，刚刚好顶到原来那个缺口的下边缘。被套的多头恐慌止损，叠加空头凶狠砸盘，随后就是瀑布般的暴跌！',
          en: 'Master this chart, and your trading will transcend! A bullish gap is left prior, supposedly excellent support. But price drops in and meets ZERO resistance, slicing through like hot knife through butter. That is Acceptance Below! Structure is utterly destroyed. Longs are trapped en masse. Price then bounces, tapping the exact bottom edge of that previous gap. Panicking trapped longs puke their stops, combined with ferocious short sellers, triggering a waterfall plunge!'
        }
      },
      {
        id: 'm4-s12',
        title: { zh: 'FVG Inversion 与 Breaker 的区别', en: 'FVG Inversion vs Breaker Block' },
        diagram: 'inversion-vs-breaker',
        bullets: {
          zh: [
            'Breaker 翻转的是“实体区块”(Order Block 的防守失败)',
            'Inversion 翻转的是“效率真空”(FVG 动能失效)',
            '相同点：两者都是依赖“被套牢的散户资金”作为后续推动的燃料',
            '实盘操作：将 Breaker 与 Inversion 结合使用，是核弹级的进场共振'
          ],
          en: [
            'Breaker inverts a "solid block" (Order Block defense failure).',
            'Inversion inverts an "efficiency vacuum" (FVG momentum failure).',
            'Similarity: Both rely entirely on "trapped retail liquidity" as fuel for the resulting move.',
            'Execution: Combining a Breaker with an Inversion is a nuclear-grade confluence entry.'
          ]
        },
        script: {
          zh: '不要把 Inversion 和 Breaker 搞混了！虽然它们都是角色翻转，但 Breaker 是实体订单块被干穿，而 Inversion 是失衡的真空带被干穿。它们的内核一模一样，都是因为有一大批散户看错了方向被套在里面，必须割肉！如果你的图表上，一个 Breaker 刚好和一个 Inversion 缺口重叠，那你还在等什么？直接全副武装轰炸它！',
          en: 'Do not confuse Inversion with a Breaker! Though both are role reversals, a Breaker is when a solid Order Block gets decimated, while an Inversion is when an imbalanced vacuum gets decimated. Their core is identical: a massive herd of retail traders got trapped on the wrong side and are forced to puke! If you have a chart where a Breaker aligns perfectly with an FVG Inversion, what the hell are you waiting for? Arm all warheads and obliterate it!'
        }
      },
      {
        id: 'm4-s13',
        title: { zh: 'Module 4 核心结论：撕碎静态思维', en: 'Module 4 Conclusions: Tear Up Static Thinking' },
        diagram: 'fvg-checklist',
        bullets: {
          zh: [
            '不要再图上画满缺口：只保留有结构破坏、带极强推移的 FVG',
            '每次看到 FVG，先问自己：它是顺势回补，还是引诱我接盘的陷阱？',
            '缺口下方有明显的未清扫流动性，坚决不做多！',
            '拥抱 FVG Inversion：教科书支撑失效的那一刻，才是你拔刀的绝佳时机'
          ],
          en: [
            'Stop littering your chart with gaps: only keep FVGs attached to CHOCH and explosive displacement.',
            'Every time you see an FVG, ask: Is this continuation, or a trap inducing me to be exit liquidity?',
            'If obvious un-swept liquidity sits below the gap, NEVER long it!',
            'Embrace FVG Inversion: the exact moment a textbook support fails is when you draw your sword.'
          ]
        },
        script: {
          zh: '这一章结束，把你们脑子里那些机械的“回踩做单”思维全部撕碎！记住，FVG 是一把双刃剑，读不懂它的语境，它就是绞肉机。你要学会筛选，屏蔽掉那些没有推移力量的垃圾缝隙。去寻找那些强迫性抢筹留下的真空，去识破主力故意摆出来的诱饵，最重要的是，去猎杀那些教科书失效后带来的 Inversion 翻转暴利！',
          en: 'As this module concludes, tear up that mechanical "retest and enter" mindset! Remember, an FVG is a double-edged sword; if you can\'t read its context, it\'s a meatgrinder. You must filter out garbage gaps lacking displacement power. Hunt for vacuums left by urgent accumulation, see right through smart money bait, and most importantly, slaughter the market with those massive Inversion profits when textbook plays fail!'
        }
      }
    ]
  },
  {
    id: 'm5',
    title: { zh: 'Module 5: Imbalance & Void', en: 'Module 5: Imbalance & Void' },
    slides: [
      {
        id: 'm5-s1',
        title: { zh: 'Module 5 — Imbalance & Void', en: 'Module 5 — Imbalance & Void' },
        diagram: 'disp-vs-exh',
        bullets: {
          zh: [
            '用 3 秒法判断当前是真突破还是假突破',
            '机构内部叫法：Displacement (推移) vs Exhaustion (衰竭)'
          ],
          en: [
            'Use the 3-Second Rule to identify true vs fake breakouts',
            'Institutional terms: Displacement vs Exhaustion'
          ]
        },
        script: {
          zh: '图表上最危险的时刻，往往不是市场死气沉沉的时候，而是它突然动得非常漂亮的时候！\n\n大多数散户看到大阳线就高潮，看到突破就疯狂追单。但他们永远不知道自己是在追一波真正的推移 (Displacement)，还是在为主力的最后一波出货接盘 (Exhaustion)！\n\n这一章，我要教你极其残忍的 3 秒法，一眼看穿这根大K线到底是行情的起点，还是埋葬你的终点！',
          en: 'The most dangerous moment on a chart isn\'t when it\'s dead quiet, it\'s when it suddenly moves beautifully!\n\nMost retail traders climax at the sight of a massive green candle and fomo into breakouts. But they never know if they are chasing a true Displacement, or just providing exit liquidity for the smart money\'s final Exhaustion push!\n\nIn this module, I will teach you the ruthless 3-Second Rule. One glance to know if this giant candle is the beginning of a move, or the grave that buries you!'
        }
      },
      {
        id: 'm5-s2',
        title: { zh: '为什么你们分不清真假突破？', en: 'Why You Can\'t Tell True from Fake Breakouts' },
        diagram: 'breakout-trap',
        bullets: {
          zh: [
            '致命错误：看到大实体 K 线就默认是强势',
            '致命错误：看到突破前高/前低就闭眼追',
            '忽略了这段突破是“发起段”还是“末端冲刺”',
            '只看破位瞬间，不看突破后的生存状态 (Acceptance)'
          ],
          en: [
            'Fatal Error: Assuming large body candles equal strength.',
            'Fatal Error: Blindly chasing breaks of prior highs/lows.',
            'Ignoring if the move is an "initiating leg" or "terminal sprint".',
            'Only looking at the break, ignoring post-break Acceptance.'
          ]
        },
        script: {
          zh: '你们之所以整天被假突破来回扇耳光，是因为你们只看“有没有破位”，从来不看“破位的质量”！\n\n一根巨大的绿柱子打破了前高，看起来强得一塌糊涂对吧？但这波涨势前面已经跑了十万八千里，这只是最后的情绪释放！突破不是一个事件，它是一个必须被验证的过程。如果突破后没有在新价格区间存活下来，那它就是个彻头彻尾的骗局！',
          en: 'The reason you get slapped around by fakeouts all day is because you only look at "did it break", NEVER "the quality of the break"!\n\nA giant green pillar smashes a prior high, looks incredibly strong right? But the rally has already run a marathon before this—this is just the final emotional release! A breakout is not an event, it is a process that MUST be validated. If it fails to survive in the new price territory, it is an absolute scam!'
        }
      },
      {
        id: 'm5-s3',
        title: { zh: '四个核心黑话的真正定义', en: 'The Four Core Institutional Terms' },
        diagram: 'four-terms',
        bullets: {
          zh: [
            'Imbalance (失衡)：价格快速移动留下的局部成交断层',
            'Void (真空)：更大范围的价格真空带，通常是极速穿越',
            'Displacement (推移)：带有控制权转移、接受变化和延续潜力的有效移动',
            'Exhaustion (衰竭)：末端冲刺，看起来极其爆裂，实则是流动性清扫'
          ],
          en: [
            'Imbalance: Localized execution gap left by rapid price movement.',
            'Void: A massive price vacuum zone, usually a lightning-fast traversal.',
            'Displacement: Valid movement with control shift, acceptance, and continuation potential.',
            'Exhaustion: Terminal sprint. Looks explosive, but is actually a liquidity sweep.'
          ]
        },
        script: {
          zh: '把这四个词刻在你的脑子里！前两个词 (Imbalance 和 Void) 是凶案现场留下的血迹，是你能在图表上看到的痕迹。后两个词 (Displacement 和 Exhaustion) 是你对凶手动机的定性！\n\n大阳线不叫推移！大阳线可能只是衰竭！推移代表主力在重新定价，而衰竭代表情绪的最后喷发。如果你把衰竭当成推移去追，你就是那个接盘的白痴！',
          en: 'Burn these four words into your skull! The first two (Imbalance and Void) are the bloodstains at the crime scene—traces you can see on the chart. The last two (Displacement and Exhaustion) are your verdicts on the killer\'s motive!\n\nA giant green candle is NOT Displacement! A giant green candle might just be Exhaustion! Displacement means smart money is repricing; Exhaustion means a final eruption of emotion. If you chase Exhaustion thinking it\'s Displacement, YOU are the idiot holding the bag!'
        }
      },
      {
        id: 'm5-s4',
        title: { zh: '真正的 Displacement (推移)', en: 'True Displacement' },
        diagram: 'disp-anatomy',
        bullets: {
          zh: [
            '绝不是单纯涨得快，而是“市场在重新定价并愿意接受新价格”',
            '特征：突破关键结构后绝不轻易收回',
            '特征：回撤非常浅，直接被强力承接',
            '特征：伴随明确的 Imbalance 且该缺口被严密防守'
          ],
          en: [
            'Not just moving fast, but "the market repricing and accepting new prices".',
            'Trait: After breaking key structure, it ruthlessly refuses to retrace deeply.',
            'Trait: Pullbacks are shallow and immediately absorbed.',
            'Trait: Leaves clear Imbalance, and that gap is heavily defended.'
          ]
        },
        script: {
          zh: '什么是真正的推移？推移是主力用真金白银砸出来的定价权！\n\n当真正的推移发生时，它打破结构后会像钉子一样死死钉在新高之上。它留下的缺口根本不会给你舒舒服服上车的机会，稍微跌一点点就会被饥渴的买盘瞬间抢光！这说明什么？说明市场已经彻底抛弃了旧价格，开始在新的领地安营扎寨！',
          en: 'What is true Displacement? Displacement is pricing power smashed in with hard institutional cash!\n\nWhen true displacement occurs, it breaks structure and nails itself above the new high like a spike. The gaps it leaves won\'t give you a comfortable entry; any slight dip is instantly devoured by starved buyers! What does this mean? It means the market has utterly abandoned the old price and is setting up camp in new territory!'
        }
      },
      {
        id: 'm5-s5',
        title: { zh: '致命的 Exhaustion (衰竭)', en: 'Fatal Exhaustion' },
        diagram: 'exh-anatomy',
        bullets: {
          zh: [
            '不是行情不动，而是“最后一冲看起来最强，实则最接近死亡”',
            '特征：出现在行情的后半段，远离价值中枢后突然疯涨',
            '特征：突破非常华丽，但紧接着立刻被砸回原点',
            '特征：只是一次性情绪释放，毫无后续延续 (Follow-through)'
          ],
          en: [
            'Not a stagnant market, but "the final sprint that looks strongest, but is closest to death".',
            'Trait: Occurs late in a move, randomly spiking after already over-extended.',
            'Trait: The breakout is spectacular, but immediately slammed back to origin.',
            'Trait: A one-time emotional release with ZERO follow-through.'
          ]
        },
        script: {
          zh: '散户最喜欢死在哪里？死在衰竭的巅峰！\n\n市场在经历漫长跋涉后，突然爆拉出一根让所有人群情激奋的大阳线，直接干碎了前高。这时候各种分析师开始狂吹牛市来了！但你们注意看，它根本站不稳！刚刺破高点，下一秒就像断线的风筝一样垂直坠落，把留下的缺口填得干干净净。这根本不是进攻，这是诱拐你们进场接盘的屠宰刀！',
          en: 'Where do retail traders love to die the most? At the absolute peak of Exhaustion!\n\nAfter a long grueling run, the market suddenly explodes with a massive green candle that makes the crowd go wild, smashing prior highs. Analysts scream "Bull run!". But watch closely: it CANNOT hold! The second it pierces the high, it plummets vertically like a cut kite, completely filling any gap it left. That wasn\'t an attack; that was a slaughterhouse blade inducing you to hold the bag!'
        }
      },
      {
        id: 'm5-s6',
        title: { zh: '3 秒法：第一步看位置', en: '3-Second Rule: Step 1 - Location' },
        diagram: 'location-check',
        bullets: {
          zh: [
            '第 1 秒必须确认：这段爆发是“发起端”还是“终点站”？',
            '推移的高发地：清扫完流动性之后、区间刚脱离、结构刚破坏',
            '衰竭的高发地：长趋势的末端、旧高旧低的门前、极其远离均线',
            '原则：发起段的加速是启动，终点段的加速是入棺'
          ],
          en: [
            'Second 1: Is this explosion at the "starting line" or the "terminal station"?',
            'High-prob Displacement: After a liquidity sweep, fresh range breakout, fresh CHOCH.',
            'High-prob Exhaustion: End of long trends, right at old highs/lows, extremely overextended.',
            'Rule: Acceleration at the start is ignition; at the end, it\'s a coffin.'
          ]
        },
        script: {
          zh: '当一根巨阳线拔地而起，给你 3 秒钟，你怎么判断？第一秒，立刻给我看位置！\n\n再漂亮的K线，如果在错误的位置，就是毒药！如果这根巨阳线是在刚刚向下把多头止损全扫光之后爆发的，那是极品推移！但如果它是在已经涨了三个星期、马上要碰到历史高点时突然拉出来的，你给我管住手！那是主力在制造 FOMO 让你们接盘！',
          en: 'When a massive green pillar erupts, you have 3 seconds. How do you judge? SECOND ONE: Check the location immediately!\n\nA beautiful candle in the wrong location is pure poison! If this giant candle explodes right after sweeping all long stop-losses below, that is god-tier Displacement! But if it prints after rallying for three weeks, right as it hits an all-time high... tie your hands down! That is smart money manufacturing FOMO so you buy their bags!'
        }
      },
      {
        id: 'm5-s7',
        title: { zh: '3 秒法：第二步看接受', en: '3-Second Rule: Step 2 - Acceptance' },
        diagram: 'acceptance-check',
        bullets: {
          zh: [
            '第 2 秒必须确认：突破之后，市场是站稳脚跟，还是立刻逃跑？',
            '推移特征：突破后停留在新区域，回踩极浅，反向抵抗像纸一样薄',
            '衰竭特征：只破不留！刺穿高点后立刻一根大阴线反包砸回',
            '原则：突破不是重点，突破后的“生存能力”才是重点'
          ],
          en: [
            'Second 2: Post-breakout, does the market hold its ground, or flee instantly?',
            'Displacement: Hovers in new territory, ultra-shallow pullback, paper-thin counter-resistance.',
            'Exhaustion: Breaks but doesn\'t stay! Pierces the high and instantly gets engulfed back down.',
            'Rule: The breakout is irrelevant; the post-breakout "survivability" is everything.'
          ]
        },
        script: {
          zh: '第二秒，死死盯着突破后的反应！我不在乎它破位的时候气势有多猛，我在乎的是它破了之后敢不敢待在那里！\n\n真正的推移，就像军队攻下城池，会立刻就地驻扎，根本不给敌人反扑的机会。如果它一冲破城门，结果遇到一点点阻力就吓得屁滚尿流，立刻跌回原点，你告诉我这是强势？这就是一次假动作！没有 Acceptance (接受)，所有的突破都是耍流氓！',
          en: 'Second two, stare dead at the post-breakout reaction! I don\'t care how aggressive the break looked, I care if it has the guts to STAY THERE!\n\nTrue displacement is like an army breaching a fortress—they immediately set up camp and give the enemy zero chance to counter-attack. If it breaches the gates but instantly pisses its pants at the first sign of resistance and falls back to origin, you call that strength? That\'s a fakeout! Without Acceptance, every breakout is a fraud!'
        }
      },
      {
        id: 'm5-s8',
        title: { zh: '3 秒法：第三步看延续', en: '3-Second Rule: Step 3 - Follow-Through' },
        diagram: 'follow-through-check',
        bullets: {
          zh: [
            '第 3 秒必须确认：这波移动有没有“第二段”，还是一发就萎了？',
            '推移特征：缺口被完美保留，很快出现第二段跟进拉升',
            '衰竭特征：动能瞬间蒸发，同向缺口立刻被反向吞没填平',
            '原则：真正强悍的推移，永远经得起回看'
          ],
          en: [
            'Second 3: Does this move have a "second leg", or did it go flaccid after one shot?',
            'Displacement: Gap is perfectly preserved, second continuation leg appears rapidly.',
            'Exhaustion: Momentum instantly evaporates, directional gaps are immediately engulfed and filled.',
            'Rule: A truly violent displacement always stands the test of hindsight.'
          ]
        },
        script: {
          zh: '第三秒，看它有没有后手！真正的强力推移绝对不可能只有一发子弹。它砸出缺口后，稍微喘口气，马上就会跟上更加凶狠的第二段拉升 (Follow-through)！\n\n如果它刚猛冲了一波，下一根K线立刻开始萎缩，然后反向力量毫无阻碍地把它留下的缺口全部填满，那就宣告了行情的死刑！记住，没有延续性的加速，就是坟场！',
          en: 'Second three, look for the follow-through! A true, violent displacement NEVER fires just one bullet. It leaves a gap, takes a micro-breath, and immediately follows up with an even more vicious second leg!\n\nIf it surges once, and the very next candle shrivels up, allowing counter-force to effortlessly fill the gap it just created, that is a death sentence for the move! Remember, acceleration without continuation is a graveyard!'
        }
      },
      {
        id: 'm5-s9',
        title: { zh: '实盘图解：完美的 Displacement', en: 'Chart: Flawless Displacement' },
        chartData: charts.m5DispData,
        annotations: charts.m5DispAnn,
        bullets: { zh: [], en: [] },
        script: {
          zh: '这才是你们应该追的突破！看这张图！市场先是向下狠狠扎穿，清扫掉底部的多头止损。随后主力拿足了筹码，一根暴力阳线拔地而起，直接干碎了局部结构！缺口清清楚楚地留在那里。回踩时，连缺口中心都没碰到就被瞬间托起，紧接着就是单边暴涨！先有流动性清扫，再有强势推移和极浅的接受，这才是教科书级别的抢钱局！',
          en: 'THIS is the breakout you should chase! Look at this chart! The market violently stabs down first, sweeping all long stops at the bottom. Fully loaded, smart money prints a violent green candle that absolutely shatters local structure! A clear gap is left behind. On the retest, it doesn\'t even reach the gap\'s center before being instantly buoyed up, followed by a one-way moonshot! Liquidity sweep first, then aggressive displacement, then shallow acceptance. This is a textbook heist!'
        }
      },
      {
        id: 'm5-s10',
        title: { zh: '实盘图解：丑陋的 Exhaustion', en: 'Chart: Ugly Exhaustion' },
        chartData: charts.m5ExhData,
        annotations: charts.m5ExhAnn,
        bullets: { zh: [], en: [] },
        script: {
          zh: '看看这张图上死掉的韭菜！行情已经爬了很久，眼看着就要突破旧的高点。突然，一根极其华丽的大阳线冲破了前高！所有的突破流交易员都在尖叫买入。结果呢？仅仅只爽了那一瞬间！下一根K线直接毫无抵抗地被砸了回来，立刻吞没了它所谓的“强势缺口”。这不叫突破，这叫主力利用前高把筹码精准倒给了你们这群FOMO的白痴！',
          en: 'Look at the slaughtered retail traders on this chart! The market has been crawling up for ages, eyeing that old high. Suddenly, a spectacularly beautiful green candle smashes the high! Every breakout trader screams and buys. The result? Pure joy for exactly one second! The very next candle gets slammed back down with ZERO resistance, instantly engulfing the so-called "strength gap". That wasn\'t a breakout; that was smart money using the high to perfectly dump their bags on you FOMO idiots!'
        }
      },
      {
        id: 'm5-s11',
        title: { zh: 'Void (真空带) 的双刃剑', en: 'The Double-Edged Sword of Voids' },
        diagram: 'void-concept',
        bullets: {
          zh: [
            'Void 是比 Imbalance 更大、更极端的连续无阻力位移',
            '起点的 Void (极品推移)：说明行情极其饥渴，回踩极浅',
            '终点的 Void (死亡衰竭)：说明只剩最后的无脑市价单在冲，马上将被全部填满',
            '千万不要看到巨大的 Void 就恐高，关键看它发生在哪一段！'
          ],
          en: [
            'A Void is a larger, more extreme continuous frictionless displacement than an Imbalance.',
            'Origin Void (God-tier): Shows extreme urgency, pullbacks will be incredibly shallow.',
            'Terminal Void (Death): Shows only mindless market orders are left pushing, will be instantly filled.',
            'Never fear a massive Void; the key is WHERE in the cycle it happens!'
          ]
        },
        script: {
          zh: '当图表上出现巨大断层的 Void 真空带时，普通人会觉得“涨/跌太多了，肯定要深调”。大错特错！\n\n如果你在结构的起点看到真空带，这是极度饥渴的抢筹信号，它根本不会给你深调的机会！但如果这个真空带是连续上涨后的加速冲刺，那它就是主力故意抽干流动性制造的死亡陷阱。同样是真空，起点的是金矿，终点的是火葬场！',
          en: 'When a massive Void (price vacuum) appears on the chart, amateurs think "it moved too much, must retrace deeply". Dead wrong!\n\nIf you see a vacuum at the origin of a structure, it is a signal of extreme accumulation urgency—it will NEVER give you a deep pullback! But if that vacuum happens as a final sprint after a long rally, it is a death trap manufactured by smart money pulling liquidity. The exact same vacuum: at the origin it\'s a goldmine, at the terminal it\'s a crematorium!'
        }
      },
      {
        id: 'm5-s12',
        title: { zh: '实盘图解：推移型真空 (起爆点)', en: 'Chart: Displacement Void (Ignition)' },
        chartData: charts.m5VoidDispData,
        annotations: charts.m5VoidDispAnn,
        bullets: { zh: [], en: [] },
        script: {
          zh: '这是一种狂暴的统治力！主力根本不打算和任何人讨价还价，直接一飞冲天，留下一个恐怖的真空带。散户挂着底部的单子天天盼着深调。你看它调了吗？它仅仅在真空带最边缘蹭了一下，留下一根长长的拒绝下影线，立刻继续疯长！这就是我说的，起点的真空代表绝对控制权，你敢等深调，你就只能看它绝尘而去！',
          en: 'This is savage dominance! Smart money has zero intention of negotiating; they launch it straight to the moon, leaving a terrifying vacuum zone. Retail places orders at the bottom praying for a deep retrace. Did it retrace? It barely brushed the very edge of the void, left a massive rejection wick, and instantly resumed its psychotic rally! This is what I mean: an origin vacuum is absolute control. If you wait for a deep retrace, you\'ll just watch it disappear into the horizon!'
        }
      },
      {
        id: 'm5-s13',
        title: { zh: '实盘图解：衰竭型真空 (埋骨地)', en: 'Chart: Exhaustion Void (Graveyard)' },
        chartData: charts.m5VoidExhData,
        annotations: charts.m5VoidExhAnn,
        bullets: { zh: [], en: [] },
        script: {
          zh: '感受一下什么叫绝望！在长期上涨的末端，价格突然像疯狗一样拔高，拉出了这辈子最大的一根阳线真空。追高的散户眼都红了。结果下一秒，瀑布！没有一丝丝抵抗，这根所谓的无敌大阳线被瞬间全部吞没填平。这就是衰竭！这根K线里全都是爆仓单和无脑追价单的枯骨。记住，经不起回补的巨阳线，都是垃圾！',
          en: 'Feel the despair! At the tail end of a long uptrend, price suddenly spikes like a rabid dog, printing the biggest green vacuum of its life. FOMO retail traders are seeing red. The very next second: Waterfall! With absolutely zero resistance, this supposedly invincible green candle gets instantly engulfed and filled. That is Exhaustion! That candle is made entirely of the bones of liquidated shorts and mindless market buyers. Remember, a giant candle that can\'t withstand a retest is pure garbage!'
        }
      },
      {
        id: 'm5-s14',
        title: { zh: 'Module 5 核心结论：撕下假面具', en: 'Module 5 Conclusions: Tear Off the Mask' },
        diagram: 'disp-vs-exh-summary',
        bullets: {
          zh: [
            '永远不要被图表上的瞬间爆发骗了，用 3 秒法过滤！',
            '第一秒问位置：是起点还是终点？',
            '第二秒问接受：突破后是站稳还是秒怂？',
            '第三秒问延续：有没有凶狠的第二段跟进？',
            '真正值得你拔刀的，是清扫流动性后、带真空缺口且严密防守的真推移！'
          ],
          en: [
            'Never get fooled by momentary chart explosions. Filter with the 3-Second Rule!',
            'Sec 1 (Location): Is it the start or the end?',
            'Sec 2 (Acceptance): Does it hold the break or instantly piss its pants?',
            'Sec 3 (Follow-through): Is there a vicious second leg?',
            'The only move worth drawing your sword for is a true displacement after a sweep, defended fiercely!'
          ]
        },
        script: {
          zh: '这一章结束，我希望你们的眼睛变成X光机！以后再看到大阳线大阴线突破，不要像狗看到骨头一样扑上去。停下来，用 3 秒钟拷问它：你是在起跑，还是在赴死？你敢不敢在突破口站稳？如果你是个一碰就碎的衰竭假动作，对不起，老子反手就把你做空到破产！控制住你的手，只做真正的 Displacement！',
          en: 'As this module wraps, I want your eyes to become X-ray machines! From now on, when you see giant candles breaking out, do not lunge at it like a dog at a bone. STOP, and interrogate it for 3 seconds: Are you starting a race, or running to your death? Do you have the guts to hold the breach? If you are a fragile, fake exhaustion move, I will short you into bankruptcy! Control your hands, only trade true Displacement!'
        }
      }
    ]
  },
  {
    id: 'm6',
    title: { zh: 'Module 6: Induction Phase', en: 'Module 6: Induction Phase' },
    slides: [
      {
        id: 'm6-s1',
        title: { zh: 'Module 6 — Induction Phase（归纳阶段）', en: 'Module 6 — Induction Phase' },
        diagram: 'induction-title',
        bullets: {
          zh: [
            '机构建仓必经的 3 个阶段，99%散户在第 2 阶段被干掉',
            '真正的趋势启动前，市场通常先完成一轮“诱导—吸流动性—控制权切换”'
          ],
          en: [
            'The 3 mandatory stages of institutional accumulation. 99% of retail dies in Stage 2.',
            'Before the real trend begins, the market completes an "Induction—Liquidity Sweep—Control Shift" cycle.'
          ]
        },
        script: {
          zh: '听好了，机构不是在你看到机会的那一刻才开始做事的。真正的大行情，往往在你看见第一个漂亮形态之前，甚至就在设计你的预期。这根本不是机会，这是给你量身定制的坟墓。',
          en: 'Listen up, institutions don\'t start working when you see the opportunity. The real massive move is designing your expectations long before you see the first textbook setup.'
        }
      },
      {
        id: 'm6-s2',
        title: { zh: '什么是 Induction Phase', en: 'What is the Induction Phase' },
        diagram: 'induction-definition',
        bullets: {
          zh: [
            '不是趋势本身，而是趋势启动前的“条件塑造过程”',
            '市场在真正单边推进前，先通过结构、假动作、陷阱',
            '把足够多的参与者“归纳”到某个错误预期中',
            '同时完成所需的对手盘获取和仓位准备',
            '核心结论：真正的大 move，不是从“确认”开始，而是从“诱导别人确认错方向”开始'
          ],
          en: [
            'Not the trend itself, but the "condition shaping process" before it begins.',
            'Using fakeouts, traps, and fake structures before the real push.',
            'Inducing enough participants into a wrong narrative.',
            'Acquiring necessary counter-party liquidity for their core positions.',
            'Conclusion: Real moves don\'t start with confirmation; they start by inducing others to confirm the WRONG direction.'
          ]
        },
        script: {
          zh: 'Induction（归纳）不是一个神棍名词。它是流动性、陷阱、失败形态的终极总称。大资金在真正推价前，必须把你“归纳”到一个错误的剧本里。让你觉得自己是对的，然后心甘情愿地把筹码交出来。',
          en: 'Induction is not a mystical term. It is the ultimate term for liquidity, traps, and failed setups. Before pushing the price, big money must induce you into a wrong narrative. Make you feel you are right, so you willingly hand over your bags.'
        }
      },
      {
        id: 'm6-s3',
        title: { zh: '为什么大多数散户总死在启动前', en: 'Why Retail Always Dies Before the Launch' },
        diagram: 'retail-death',
        bullets: {
          zh: [
            '因为他们把“准备阶段”误认为“已经启动”',
            '看到教科书级别的形态就急着重仓进场',
            '把归纳阶段的 诱导 FVG / 假突破 / 假结构破坏 当成真机会',
            '完全忽略了市场其实仍在“收单、换手、洗仓”'
          ],
          en: [
            'Because they mistake the "preparation phase" for the "launch".',
            'Fomoing into textbook setups immediately.',
            'Treating Inducement FVGs / Fakeouts / Fake CHOCHs as true opportunities.',
            'Completely ignoring that the market is still in "accumulation and wash-out mode".'
          ]
        },
        script: {
          zh: '你们很多人为什么明明方向最后是对的，结果还是爆仓？因为你们参与的是诱导段、洗仓段！市场杀的不是方向看错的白痴，市场先杀的是“方向也许对，但时机太早”的自作聪明的散户。',
          en: 'Why do you blow up even when your direction is eventually right? Because you participate in the inducement and wash-out phases! The market doesn\'t just kill idiots with the wrong direction; it first slaughters the "smart" money that gets the direction right but the timing way too early.'
        }
      },
      {
        id: 'm6-s4',
        title: { zh: 'Induction Phase 的 3 个典型阶段', en: 'The 3 Typical Stages of Induction' },
        diagram: 'induction-3-stages',
        bullets: {
          zh: [
            'Stage 1 — Setup Creation (环境塑造 / 预期铺垫)',
            'Stage 2 — Inducement & Sweep (诱导与清算)',
            'Stage 3 — Commitment Move (真实承诺性推动)',
            '第 1 阶段让你“看见机会”，第 2 阶段让你“死在机会里”，第 3 阶段才是机构真正发力的时候'
          ],
          en: [
            'Stage 1 — Setup Creation (Building the Narrative)',
            'Stage 2 — Inducement & Sweep (Trapping & Purging)',
            'Stage 3 — Commitment Move (The Real Expansion)',
            'Stage 1 makes you see the opportunity. Stage 2 kills you in it. Stage 3 is when institutions actually move the price.'
          ]
        },
        script: {
          zh: '把这三个阶段刻在脑子里。第一阶段搭戏台，第二阶段杀猪，第三阶段收网走人。如果你分不清现在是第几阶段，你就永远是第二阶段的祭品！',
          en: 'Carve these three stages into your brain. Stage 1 builds the stage, Stage 2 slaughters the pigs, and Stage 3 executes the move. If you can\'t tell which stage we are in, you are destined to be the sacrifice in Stage 2!'
        }
      },
      {
        id: 'm6-s5',
        title: { zh: 'Stage 1：环境塑造 / 预期铺垫', en: 'Stage 1: Setup Creation' },
        diagram: 'stage1-setup',
        bullets: {
          zh: [
            '先把一个“人人看得懂的交易故事”搭出来',
            '形成明显结构，画出完美支撑/阻力，留下极其显眼的 FVG',
            '给市场参与者一个“看起来非常合理”的方向预期',
            '机构首先需要的不是推价格，而是让大众在某个剧本上形成一致性共识'
          ],
          en: [
            'Build a "trading story everyone understands" first.',
            'Form obvious structures, perfect support/resistance, and extremely visible FVGs.',
            'Give participants a "highly logical" directional expectation.',
            'Institutions don\'t need to push price yet; they need the masses to form a consensus on a script.'
          ]
        },
        script: {
          zh: '这是一个极度反常识的阶段。一个形态越漂亮，越不代表它马上能赚钱！因为它极有可能只是被机构“故意画出来”给大众看的舞台。他们需要你们在这个位置建立多头或空头共识，只有你们上车了，他们才有猎物。',
          en: 'This is extremely counter-intuitive. The more beautiful a setup is, the less likely it will make you money immediately! It is highly likely deliberately painted for the public. They need you to build a consensus here; only when you board the train do they have prey.'
        }
      },
      {
        id: 'm6-s6',
        title: { zh: '实盘图解：Stage 1 漂亮的教科书陷阱', en: 'Chart: Stage 1 Beautiful Textbook Trap' },
        chartData: charts.m6Stage1Data,
        annotations: charts.m6Stage1Ann,
        bullets: { zh: [], en: [] },
        script: {
          zh: '看这张图，多干净的趋势线，多明显的看涨缺口！简直就是教科书里的送分题！散户在这里看得热血沸腾，多头共识无比纯粹。但你要知道，只要更大的深层流动性还没被清扫，这全是他妈的演给你看的假戏！',
          en: 'Look at this chart, what a clean trendline and extremely visible FVG! It\'s a textbook freebie! Retail is getting excited here, the bullish consensus is pure. But you must know: as long as the deeper macro liquidity hasn\'t been swept, this is all a f**king staged play!'
        }
      },
      {
        id: 'm6-s7',
        title: { zh: 'Stage 2：诱导与清算 (99%死于此)', en: 'Stage 2: Inducement & Sweep (99% Die Here)' },
        diagram: 'stage2-inducement',
        bullets: {
          zh: [
            '市场先让一批人按刚才铺垫的 textbook 逻辑入场尝点甜头',
            '然后通过深度回撤 (Deeper Pullback)、恶意扫损 (Stop Hunt)、假突破 (Fake Breakout)',
            '把这些错误仓位全部洗出来，把所有的流动性拿到手',
            '真正危险的不是假信号，而是“看起来有足够理由相信的半真信号”'
          ],
          en: [
            'Market lets early players taste profit based on the Stage 1 textbook logic.',
            'Then uses Deeper Pullbacks, Stop Hunts, and Fake Breakouts.',
            'Washes out all these wrong positions to grab all the liquidity.',
            'The real danger isn\'t a fake signal; it\'s a "half-true signal with enough reasons to believe it".'
          ]
        },
        script: {
          zh: '这就是全篇最核心的地方！第二阶段杀的绝对不是什么都不懂的新手，杀的就是你们这些自以为学了几天机构订单块、觉得这次“绝对看懂了”的老散户。这里出来的信号，长得就像差一点点就对的极品形态，然后一波把你带走！',
          en: 'This is the core of the entire chapter! Stage 2 doesn\'t kill clueless beginners; it slaughters you veteran retailers who think you mastered Order Blocks. The signals here look like absolute perfection, just to rip your face off!'
        }
      },
      {
        id: 'm6-s8',
        title: { zh: 'Stage 2 的 6 种致命表现形式', en: '6 Fatal Forms of Stage 2' },
        diagram: 'stage2-forms',
        bullets: {
          zh: [
            '1. 明显 FVG 回补后给你个小反弹，然后继续深砸',
            '2. 订单块 (OB) 首次触碰有反应，第二次直接被无情贯穿',
            '3. 经典的 Equal Highs / Lows 假突破',
            '4. 趋势线下破扫损后，极速收回',
            '5. 局部出现 CHOCH (结构破坏)，但完全没有后续推移跟进',
            '6. 看似是强力推移 (Displacement)，实则是衰竭冲刺 (Exhaustion)'
          ],
          en: [
            '1. Obvious FVG gives a small bounce, then dumps deeper.',
            '2. Order Block reacts on first tap, then ruthlessly pierced on the second.',
            '3. Classic Equal Highs/Lows fakeout.',
            '4. Trendline breakdown stop-hunt, then rapid reclaim.',
            '5. Local CHOCH appears but has ZERO follow-through.',
            '6. Looks like violent Displacement, but is actually an Exhaustion spike.'
          ]
        },
        script: {
          zh: '你之前学过的所有形态，都可能在第二阶段被“先利用、再兑现”。不是 FVG 错了，也不是 OB 失效了，而是你必须知道，它们有时候只是主力归纳绞肉机链条上的一个诱饵环节。',
          en: 'All the setups you learned before can be utilized and then destroyed in Stage 2. It\'s not that FVGs are wrong or OBs fail; you must know they are sometimes just a bait link in the smart money inducement meat grinder.'
        }
      },
      {
        id: 'm6-s9',
        title: { zh: '实盘图解：Stage 2 诱导与无情清算', en: 'Chart: Stage 2 Trap & Ruthless Purge' },
        chartData: charts.m6Stage2Data,
        annotations: charts.m6Stage2Ann,
        bullets: { zh: [], en: [] },
        script: {
          zh: '仔细看！价格摸到缺口，给你一个小反弹，散户全仓杀入喊着“回补起飞”。下一根 K 线直接如同断头台一样砸穿前低！把你们的止损全部吃光，完成底部的清算。这时候你们在群里骂娘，但这就是机构的屠宰场，拿到你们的血筹后，真正的暴涨才刚刚开始！',
          en: 'Look closely! Price taps the gap, gives a small bounce, retail goes all-in shouting "to the moon." The next candle acts like a guillotine, smashing through the previous low to eat all your stops! You are cursing in chat rooms, but this is the institutional slaughterhouse. Once they get your blood-soaked chips, the true moonshot begins!'
        }
      },
      {
        id: 'm6-s10',
        title: { zh: 'Stage 3：真实承诺性推动', en: 'Stage 3: Commitment Move' },
        diagram: 'stage3-commitment',
        bullets: {
          zh: [
            '主要流动性已被彻底清理，错误的早鸟仓位已被洗光',
            '机构终于不再测试和画门，而是真正、干净地推进价格',
            '出现真正的 Displacement (推移)，突破后绝不回头',
            'FVG、OB 的回踩变得极度有效且极浅',
            '核心结论：Stage 3 不再需要反复证明自己！'
          ],
          en: [
            'Major liquidity has been completely purged, early bird positions washed out.',
            'Institutions stop testing and chopping, and cleanly push the price.',
            'True Displacement appears, never looking back after the break.',
            'FVG/OB retests become incredibly shallow and highly effective.',
            'Conclusion: Stage 3 no longer needs to repeatedly prove itself!'
          ]
        },
        script: {
          zh: '洗盘结束了，筹码拿够了。真正的爆发不需要再犹犹豫豫、来回扎针。真正的大级别推动，结构推进极其干净，回踩极度有效，像热刀切黄油一样切开上方的所有阻力。你只有熬过前面的诱导，活到这个时候，才能吃上大肉！',
          en: 'The wash-out is over, and the chips are gathered. The real breakout doesn\'t need to hesitate and sweep back and forth. The structure pushes are clean, retests are perfect, slicing through all upper resistance like a hot knife through butter. You only eat the big meat if you survive the inducement and make it here!'
        }
      },
      {
        id: 'm6-s11',
        title: { zh: '实盘图解：Stage 3 终极承诺推动', en: 'Chart: Stage 3 Ultimate Commitment' },
        chartData: charts.m6Stage3Data,
        annotations: charts.m6Stage3Ann,
        bullets: { zh: [], en: [] },
        script: {
          zh: '看懂了吗？下方深层流动性扫干净后，立刻夺回结构（Reclaim），伴随巨大的强力推移，一骑绝尘。没有任何拖泥带水，留下的缺口仅仅浅浅碰了一下就继续爆拉，完全不给空头解套的机会。这才是真正值得你重仓干的时刻！',
          en: 'Do you see it? After sweeping the deep liquidity at the bottom, it immediately reclaims the structure with massive displacement, leaving everyone behind. No hesitation. The gap left behind is barely tapped before rocketing again, giving zero chance for shorts to escape. THIS is the moment worth going heavy!'
        }
      },
      {
        id: 'm6-s12',
        title: { zh: '区分 Stage 2 和 Stage 3 的绝杀技巧', en: 'The Ultimate Trick to Separate Stage 2 & 3' },
        diagram: 'stage2-vs-3',
        bullets: {
          zh: [
            '高手赚的钱，不是看懂 Stage 1，而是分清 2 和 3！',
            '【Stage 2 特征】：结构反复画门，频繁双向扫损，似乎有很多入场机会但一进去就死，推移极不持久。',
            '【Stage 3 特征】：核心大级别的流动性池已经被干破，方向极其单边顺畅，机会数量减少但胜率极高。',
            '不要急着在第一拨信号上表态！'
          ],
          en: [
            'Pros don\'t make money recognizing Stage 1; they make it separating 2 and 3!',
            '【Stage 2 Traits】: Choppy structure, frequent 2-way sweeps, lots of fake entries, zero displacement follow-through.',
            '【Stage 3 Traits】: Core macro liquidity pools are already destroyed, direction is smooth and 1-way, fewer setups but ultra-high win rate.',
            'Do NOT commit on the very first signal!'
          ]
        },
        script: {
          zh: '记住，如果图表上两边还在疯狂画门、反复扎针，那就说明第二阶段还在洗！主力还没吃饱！直到一侧的深层止损被彻底扫干净，并且出现不再回头的强力推移，才是真正的第三阶段。让子弹飞一会儿！',
          en: 'Remember, if the chart is still violently sweeping both sides and wicking everywhere, it\'s still Stage 2 washing out! Smart money isn\'t full yet! Only when a deep liquidity pool is completely purged and followed by clean, point-of-no-return displacement, is it Stage 3. Let the bullets fly for a bit!'
        }
      },
      {
        id: 'm6-s13',
        title: { zh: 'Induction Phase 的完整拼图', en: 'The Complete Induction Puzzle' },
        diagram: 'induction-puzzle',
        bullets: {
          zh: [
            '把前 5 个模块的武器全部串起来：',
            'Structure：先搭一个人人看得懂的教科书结构',
            'Liquidity：把散户止损和追价集中到可收割的池子里',
            'OB / FVG：提供虚假的诱导锚点',
            'Disp vs Exh：在关键阶段制造“像真启动”的末端加速',
            '结论：真正的 Move 永远出现在全面清理之后！'
          ],
          en: [
            'Connecting the weapons from the first 5 modules:',
            'Structure: Build a textbook structure everyone understands.',
            'Liquidity: Concentrate retail stops and breakout orders into harvestable pools.',
            'OB / FVG: Provide fake inducement anchors.',
            'Disp vs Exh: Create fake "ignition" acceleration to trap momentum traders.',
            'Conclusion: The real Move ALWAYS happens after the grand purge!'
          ]
        },
        script: {
          zh: '这就是整个交易体系的闭环！结构造势、流动性蓄水、缺口诱导、虚假动能爆发。机构打的是一套组合拳。如果你还是像以前一样，孤立地盯着一根K线或者一个缺口做单，你活不过今晚！',
          en: 'This is the closed loop of the entire system! Structure builds momentum, liquidity stores fuel, gaps induce, and fake momentum exhausts. Institutions fight with a combo. If you still stare at an isolated candle or gap to trade, you won\'t survive the night!'
        }
      },
      {
        id: 'm6-s14',
        title: { zh: '实盘判断：我现在看到的是哪一阶段？', en: 'Live Judgment: Which Stage am I looking at?' },
        diagram: 'stage-check',
        bullets: {
          zh: [
            '拷问 1：Setup 是不是很干净？市场故事很顺？(可能是 Stage 1 铺垫)',
            '拷问 2：刚刚有没有发生双向扫损？突破是不是立刻被砸回？(绝对是 Stage 2 洗仓)',
            '拷问 3：大级别的流动性池扫干净了吗？推移有延续吗？(进入 Stage 3 承诺期)',
            '原则：先让市场把流动性处理干净，再做方向表达！'
          ],
          en: [
            'Check 1: Is the setup too clean? Story too smooth? (Probably Stage 1 Setup)',
            'Check 2: Are both sides getting swept? Breakouts instantly failing? (Definitely Stage 2 Wash-out)',
            'Check 3: Is the macro pool purged? Does displacement have follow-through? (Entering Stage 3)',
            'Rule: Let the market clean up liquidity FIRST, then express your direction!'
          ]
        },
        script: {
          zh: '每次你想按鼠标之前，先对着这个清单拷问自己：大级别的池子扫了吗？现在是不是太顺了？如果是，立刻把手从鼠标上拿开！高手不是能抓住每一个机会，而是能避开所有的杀猪盘！',
          en: 'Before you click the mouse, interrogate yourself with this list: Is the macro pool swept? Is it looking too easy right now? If yes, take your hands off the mouse immediately! Masters don\'t catch every move; they avoid every slaughterhouse!'
        }
      },
      {
        id: 'm6-s15',
        title: { zh: '散户在归纳阶段的 5 种死法', en: '5 Ways Retail Dies in the Induction Phase' },
        diagram: 'retail-deaths',
        bullets: {
          zh: [
            '1. 在 Stage 1 看到 setup 就重仓预判进场',
            '2. 在 Stage 2 第一次小信号出现时过早确认',
            '3. 被 Stop Hunt 打掉后，情绪崩溃立刻反手追单',
            '4. 把所有的流动性清算，都误解为大级别的趋势反转',
            '5. 没耐心等到 Stage 3 的干净推移，就不停地在震荡里试错耗干本金'
          ],
          en: [
            '1. Going heavy on the very first Stage 1 setup.',
            '2. Confirming too early on the first minor Stage 2 signal.',
            '3. Emotionally reversing right after getting stop-hunted.',
            '4. Misinterpreting every liquidity purge as a macro trend reversal.',
            '5. Bleeding out capital by overtrading the chop, instead of waiting for Stage 3.'
          ]
        },
        script: {
          zh: '看看这5种死法，哪一种不是在报你的身份证号？被庄家扫损后气急败坏，立刻反手做空，结果正好碰上第三阶段的主升浪起爆，一波把你连根拔起！别再做这种蠢事了。',
          en: 'Look at these 5 deaths, aren\'t they describing you perfectly? Getting stop-hunted by the MM, getting furious, emotionally reversing to short... just to meet the Stage 3 main expansion wave that wipes you completely out! Stop doing this stupid shit.'
        }
      },
      {
        id: 'm6-s16',
        title: { zh: '本章核心结论：不要抢跑！', en: 'Core Conclusion: Do NOT Front-run!' },
        diagram: 'core-conclusion-m6',
        bullets: {
          zh: [
            'Setup 出现，绝对不代表市场准备好了！',
            '第一个漂亮的信号，先默认它是诱导陷阱。',
            '市场最像机会的时候，往往只是它最需要你当对手盘接盘的时候。',
            '真正高级的交易，不是比谁进得更早，而是等市场从“诱导”完全过渡到“承诺”再拔刀！'
          ],
          en: [
            'A Setup appearing does NOT mean the market is ready!',
            'Assume the first beautiful signal is an inducement trap.',
            'When the market looks most like an opportunity, it usually just needs you as exit liquidity.',
            'High-level trading isn\'t about entering earliest; it\'s waiting for Induction to fully transition into Commitment before drawing your sword!'
          ]
        },
        script: {
          zh: '这一章结束！不要去抢跑！市场不会直接给你真正的单边，它通常会先给你一个“看起来像起飞”的毒苹果。洗仓没完成前，再美的形态都是绞肉机。管住手，等死尸遍地的时候，我们再进场！',
          en: 'Module done! Do not front-run! The market won\'t hand you a true one-way trend directly; it usually hands you a poisoned apple that "looks like a moonshot". Before the wash-out is complete, every beautiful setup is a meat grinder. Hold your hands, wait until the corpses pile up, THEN we enter!'
        }
      }
    ]
  },
  {
    id: 'm7',
    title: { zh: 'Module 7: The "Real" Wyckoff', en: 'Module 7: The "Real" Wyckoff' },
    slides: [
      {
        id: 'm7-s1',
        title: { zh: 'Module 7 — The "Real" Wyckoff', en: 'Module 7 — The "Real" Wyckoff' },
        diagram: 'wyckoff-modern-overview',
        bullets: {
          zh: [
            'Wyckoff 不是古典图谱背诵，而是现代流动性与控制权切换框架',
            '从“认图”升级到读懂：吸收、诱导、测试与承诺',
            '掌握 2024–2025 年最新复合型陷阱（变形 Spring/Upthrust）'
          ],
          en: [
            'Wyckoff is not a classic pattern to memorize, it\'s a modern framework for liquidity and control shifts.',
            'Upgrade from "pattern recognition" to reading: Absorption, Inducement, Test, and Commitment.',
            'Master the newest complex traps of 2024-2025 (Mutated Spring/Upthrust).'
          ]
        },
        script: {
          zh: '大多数人不是没学过威科夫，而是把威科夫学成了迷信！看到弹簧效应就想做多，看到上冲回落就急着做空。你们在背图谱，而主力在看着你们背的图谱给你们下套！这一章，我要把你们从“图形背诵班”里拽出来，拉回血淋淋的实盘绞肉机里。真正的威科夫不是认图，而是读懂市场如何在区间内完成仓位转移！',
          en: 'Most people haven\'t "not learned" Wyckoff, they learned it as a superstition! Seeing a Spring means instantly going long, seeing an Upthrust means rushing to short. You are memorizing patterns, while the market makers are setting traps based on the patterns you memorized! In this chapter, I\'m dragging you out of the "pattern memorization class" and throwing you back into the bloody real-world meat grinder. The real Wyckoff is about reading how positions transfer inside a range!'
        }
      },
      {
        id: 'm7-s2',
        title: { zh: '为什么大多数人学错了 Wyckoff', en: 'Why Most People Learned Wyckoff Wrong' },
        diagram: 'retail-deaths',
        bullets: {
          zh: [
            '把 Wyckoff 当固定图谱，而不是动态过程',
            '死记名词：SC、AR、ST、Spring，却不理解行为本质',
            '忽略流动性、推移 (Displacement) 以及接受/拒绝',
            '一看见边界被破就直接交易，成了最大的燃料',
            '完全不知道现代市场到处都是“多段式、延迟确认型”陷阱'
          ],
          en: [
            'Treating Wyckoff as static patterns instead of a dynamic process.',
            'Memorizing jargon (SC, AR, ST, Spring) without understanding the underlying behavior.',
            'Ignoring liquidity, displacement, and acceptance/rejection.',
            'Trading the exact moment a boundary breaks, instantly becoming fuel.',
            'Unaware that modern markets are full of multi-stage, delayed-confirmation traps.'
          ]
        },
        script: {
          zh: '看看你们常犯的错：每天在图上标什么 SC、AR、ST，画得比清明上河图还漂亮，结果一做就亏！为什么？因为你把它当成了固定公式！你根本不看有没有空头被吸收，有没有真正的多头推移！在这个算法横行的年代，你只要敢在边界无脑挂单，主力有一百种复合陷阱让你死无全尸！记住：威科夫不是用来认图的，是用来读懂谁在被套的！',
          en: 'Look at the mistakes you make: labeling SC, AR, ST on the chart every day, drawing it prettier than a masterpiece, and losing money every time! Why? Because you treat it as a fixed formula! You don\'t even check if shorts are absorbed or if there\'s true bullish displacement! In this era of algos, if you blindly place limit orders at boundaries, the market makers have a hundred complex traps to obliterate you!'
        }
      },
      {
        id: 'm7-s3',
        title: { zh: '现代版 Wyckoff 的核心定义', en: 'Core Definition of Modern Wyckoff' },
        diagram: 'wyckoff-absorption',
        bullets: {
          zh: [
            '市场进入一个平衡区 (Containment)',
            '主导方开始在边界附近吸收对手盘 (Absorption)',
            '通过扫损、假突破清理最后流动性 (Manipulation)',
            '控制权切换后，进入不回头的单边推移 (Commitment)',
            '抛弃低位必涨/高位必跌的错觉，只看谁的流动性被耗尽'
          ],
          en: [
            'The market enters a zone of balance (Containment).',
            'The dominant side starts absorbing counter-parties near boundaries (Absorption).',
            'Using stop runs and fakeouts to clear the final liquidity (Manipulation).',
            'After control shifts, entering a one-way irreversible push (Commitment).',
            'Ditch the illusion of "low means buy/high means sell", only look at whose liquidity is exhausted.'
          ]
        },
        script: {
          zh: '让我给你们重新翻译一下威科夫：它其实就是在讲一个故事——市场先进入平衡，然后大资金开始在边界吸血，接着用假突破把你们最后一点止损全部吃干抹净，最后直接发动不回头的单边暴力推移！吸筹不是因为价格在低位所以涨，而是因为向下的卖盘全被吃光了，连砸盘的动能都枯竭了！这才是底层的供需密码！',
          en: 'Let me translate Wyckoff for you again: it\'s telling a story. The market enters equilibrium, big money sucks blood at the edges, uses fakeouts to eat your final stops, and finally launches a violent one-way push! Accumulation doesn\'t go up because it\'s "low", it goes up because all downward selling pressure is eaten, and bearish momentum is completely drained! This is the true supply/demand code!'
        }
      },
      {
        id: 'm7-s4',
        title: { zh: '现代版 Wyckoff 4 阶段总览', en: 'Modern Wyckoff 4 Phases Overview' },
        diagram: 'wyckoff-4-phases',
        bullets: {
          zh: [
            'Phase 1 — 收容 (Containment)：建立平衡边界',
            'Phase 2 — 吸收 (Absorption)：换手与压力测试',
            'Phase 3 — 操控 (Manipulation)：致命诱导与清算',
            'Phase 4 — 承诺 (Commitment)：单边突破与重定价'
          ],
          en: [
            'Phase 1 — Containment: Establishing balance boundaries.',
            'Phase 2 — Absorption: Position transfer and pressure testing.',
            'Phase 3 — Manipulation: Fatal inducement and liquidation.',
            'Phase 4 — Commitment: One-way breakout and repricing.'
          ]
        },
        script: {
          zh: '忘掉那些古典教材里的 ABCDE 五个阶段，实盘中你只需要盯紧这四个动作：第一步，收容波动建立区间；第二步，在区间里疯狂吸收对手盘；第三步，刺破边界进行终极清算，制造假象；第四步，主力露出獠牙，打出承诺性的单边推移！真正能让你赚大钱的，绝对不是区间震荡，而是你能不能在第三步没死，并抓住了第四步的启动！',
          en: 'Forget the classic A-B-C-D-E phases. In live trading, you just need to watch these 4 steps: 1. Containment builds the range. 2. Insane absorption inside the range. 3. Piercing boundaries for the ultimate purge. 4. Fangs out, commitment push! What makes you rich isn\'t trading the chop, it\'s surviving step 3 and catching the ignition of step 4!'
        }
      },
      {
        id: 'm7-s5',
        title: { zh: 'Phase 1: 收容 (Containment)', en: 'Phase 1: Containment' },
        diagram: 'structure-formula',
        bullets: {
          zh: [
            '出现明显的停止行为 (Stopping Action)',
            '价格不再顺畅单边推进，开始围绕中枢来回',
            '初步形成可见的上边界与下边界',
            '核心本质：这不是反转确认，而是市场在寻找新平衡',
            '高级视角：单边推移后新低/新高的延续性断崖式下降'
          ],
          en: [
            'Obvious Stopping Action appears.',
            'Price stops smooth one-way pushing, starting to oscillate around a median.',
            'Initial upper and lower boundaries become visible.',
            'Core essence: This is NOT a reversal confirmation, the market is just finding balance.',
            'Advanced view: The follow-through of new highs/lows drops off a cliff.'
          ]
        },
        script: {
          zh: '第一阶段叫收容。一波暴跌之后，突然砸不动了，出现了暴力反弹，然后开始在上下边界里画门。听好，这不叫反转！这只是空头力竭，市场开始寻找新的对手盘了。如果你在收容阶段就急着去猜大底大顶，你就是在送死。这个阶段你要做的，就是画好边界，然后冷眼旁观！',
          en: 'Phase 1 is Containment. After a massive dump, it suddenly can\'t drop further, bounces violently, and starts ping-ponging. Listen: this is NOT a reversal! It\'s just bears running out of gas and the market looking for new counter-parties. If you rush to guess the macro top/bottom here, you are asking for death. Just draw your boundaries and watch coldly.'
        }
      },
      {
        id: 'm7-s6',
        title: { zh: 'Phase 2: 吸收 (Absorption)', en: 'Phase 2: Absorption' },
        diagram: 'wyckoff-absorption-detail',
        bullets: {
          zh: [
            '价格反复测试区间边界，某一侧攻击越来越“费力”',
            '累积型：下探频繁但新低质量极差，低位被快速收回',
            '派发型：上冲频繁但新高质量极差，买盘一出就被砸',
            '区间内部不断留下吸收对手盘的痕迹',
            '边界外流动性被多次消耗，为最终突破掏空阻力'
          ],
          en: [
            'Price repeatedly tests boundaries, attacks on one side become "exhausting".',
            'Accumulation: Frequent dips but terrible new low quality, quickly reclaimed.',
            'Distribution: Frequent spikes but terrible new high quality, immediately sold.',
            'Footprints of absorbing counter-parties are left inside the range.',
            'Liquidity outside boundaries gets consumed, hollowing out resistance.'
          ]
        },
        script: {
          zh: '第二阶段是吸收。在这个绞肉机里，你看的是震荡，我看的是谁的血槽空了！如果每次砸破前低，瞬间就被买盘抽回，阴线实体越来越小，这就是在吸筹！空头的子弹被接盘侠照单全收！记住，吸收的本质不是价格不跌，而是向下攻击越来越没有效率！',
          en: 'Phase 2 is Absorption. In this meat grinder, you see chop, I see whose HP bar is emptying! If every dip below the low is instantly bought up, and bearish bodies get smaller, that\'s accumulation! Bear bullets are fully absorbed. Remember: the essence of absorption isn\'t "price not dropping", it\'s that downward attacks lose all efficiency!'
        }
      },
      {
        id: 'm7-s7',
        title: { zh: 'Phase 3: 操控 (Manipulation)', en: 'Phase 3: Manipulation' },
        diagram: 'wyckoff-complex-trap-logic',
        bullets: {
          zh: [
            '市场突然以看似极强的动能突破区间边界',
            '引爆止损、吸引突破追价、归纳预判者入场',
            '核心任务：清理边界流动性、完成终极仓位转移',
            '测试另一侧是否真正 ready',
            'Phase 3 的意义在于：市场用什么方式拿到了最后一批燃料'
          ],
          en: [
            'Market suddenly breaks boundaries with seemingly extreme momentum.',
            'Triggers stops, attracts breakout chasers, induces early predictors.',
            'Core mission: Purge boundary liquidity, complete ultimate position transfer.',
            'Tests if the other side is truly ready.',
            'The meaning of Phase 3: How the market secured its final batch of fuel.'
          ]
        },
        script: {
          zh: '最血腥的第三阶段来了——操控！也就是你们常说的弹簧效应和上冲回落。主力突然一根大阴线砸破支撑，全世界都在喊破位做空！散户疯狂交出带血的筹码，主力张开血盆大口全盘吃下！这一步根本不是为了跌，而是为了把最后一批死多头扫地出门，同时把追空的白痴骗进来关门打狗！',
          en: 'The bloodiest stage arrives: Manipulation! The famous Spring and Upthrust. Suddenly a massive red candle smashes support, the whole world screams breakdown! Retail hands over bloody chips, smart money eats it all. This move isn\'t meant to dump; it\'s meant to flush the last stubborn bulls and trap the idiot bears before locking the door!'
        }
      },
      {
        id: 'm7-s8',
        title: { zh: 'Phase 4: 承诺 (Commitment)', en: 'Phase 4: Commitment' },
        diagram: 'wyckoff-modern-overview',
        bullets: {
          zh: [
            '操控结束后，出现极其干净的夺回 (Clean Reclaim)',
            '极强的动能推移 (Displacement) 与延续性',
            '原区间边界的角色瞬间发生反转 (Support <-> Resistance)',
            '顺势的失衡缺口 (FVG) 和订单块 (OB) 效力暴增',
            '真正的机会不在操控那一下，而在证明不回区间的时候'
          ],
          en: [
            'After manipulation, an extremely clean reclaim occurs.',
            'Extreme displacement and follow-through.',
            'The old boundary\'s role instantly flips (Support <-> Resistance).',
            'Pro-trend FVGs and OBs become extremely effective.',
            'The true opportunity isn\'t the manipulation spike itself, but when it proves it won\'t return to the range.'
          ]
        },
        script: {
          zh: '这就是终局：承诺性推动！当主力吃饱喝足，一根擎天柱阳线直接贯穿整个区间，根本不给空头任何喘息的机会！回踩？最多只给你一个浅到令人发指的回踩！所有的缺口全部得到捍卫，价格一骑绝尘。顶尖的交易员，永远是在确认主力给出这种绝不回头 的承诺后，重仓出击！',
          en: 'This is the endgame: Commitment Move! When big money is full, a god-candle pierces the entire range, giving bears zero chance to breathe! Pullback? It only gives you an disgustingly shallow pullback! All gaps are defended, price takes off. Top traders always strike heavy AFTER confirming this "no-turning-back" commitment!'
        }
      },
      {
        id: 'm7-s9',
        title: { zh: '经典实战：Accumulation -> Spring -> Markup', en: 'Classic Case: Accumulation -> Spring -> Markup' },
        chartData: charts.m7ClassicSpringData,
        annotations: charts.m7ClassicSpringAnn,
        bullets: { zh: [], en: [] },
        script: {
          zh: '睁大眼睛看看这张实盘图！这就是最经典的底部弹簧。价格在低位烂缠了那么久，突然向下刺穿支撑，底部的止损单像烟花一样连环爆炸！散户绝望割肉，但你看看下一根 K 线！直接暴力收回中枢，这就是最强的多头夺回（Reclaim）！随后中轴被彻底碾碎，单边狂飙开始。记住：不是跌破本身值钱，而是跌破后被暴力收回的动作最值钱！',
          en: 'Open your eyes to this live chart! The most classic bottom Spring. Chopping for ages, then suddenly piercing support. Stops explode like fireworks! Retail cuts losses in despair, but look at the very next candle! Violently reclaims the range. That is the ultimate Reclaim! The midline gets crushed, one-way rally begins. Remember: the breakdown isn\'t valuable, the violent reclaim AFTER the breakdown is where the money is!'
        }
      },
      {
        id: 'm7-s10',
        title: { zh: 'Spring / Upthrust 的真伪鉴定', en: 'Validating Spring / Upthrust' },
        diagram: 'wyckoff-validation',
        bullets: {
          zh: [
            '高质量 Spring：下破扫损 -> 明显拒绝/收回 -> 控制权上移',
            '无效 Spring：下破后无法收回中枢，或收回后立刻再次失守',
            '高质量 Upthrust：上破前高 -> 迅速失去接受 -> 卖压极强延续',
            '无效 Upthrust：上破后在高位高位盘整并被接受 (假突破变真突破)'
          ],
          en: [
            'High-quality Spring: Sweep low -> clear rejection/reclaim -> upward control shift.',
            'Invalid Spring: Fails to reclaim the range, or immediately loses it again.',
            'High-quality Upthrust: Sweep high -> rapid loss of acceptance -> heavy sell continuation.',
            'Invalid Upthrust: Consolidates high and is accepted (fakeout becomes real breakout).'
          ]
        },
        script: {
          zh: '别一看到破位又弹了一点点就喊弹簧！一个真正极品弹簧，不仅要破位杀人，还得在杀完人之后迅速夺回阵地！如果破位后像死狗一样趴在下面起不来，那就是真暴跌！同样，如果你看到价格上破前高，虽然回落了一点，但随后死死咬住高位不放，这时候你敢去摸顶，绝对被大阳线一波带走！看接受度，别死记形态！',
          en: 'Stop calling every tiny bounce after a breakdown a Spring! A god-tier Spring must kill, and then instantly reclaim the territory! If it breaks down and lies there like a dead dog, that\'s a real crash! Likewise, if you see an Upthrust that hovers high and refuses to drop... if you try to short the top there, you\'ll get wiped by a massive green candle! Read acceptance, don\'t memorize shapes!'
        }
      },
      {
        id: 'm7-s11',
        title: { zh: '2024-2025：复合陷阱的崛起', en: '2024-2025: The Rise of Complex Traps' },
        diagram: 'wyckoff-complex-trap-logic',
        bullets: {
          zh: [
            '散户越来越熟悉经典 Wyckoff，主力必须升级玩法',
            '算法流动性机制让边界处理更加碎片化',
            '机构不再满足于单次清算，多阶段清算收割效率更高',
            '现在更常见：下破 -> 收回 -> 再下破 -> 深度绝望 -> 最终启动'
          ],
          en: [
            'Retail is familiar with classic Wyckoff; institutions MUST upgrade.',
            'Algo liquidity mechanisms fragment boundary handling.',
            'Institutions are no longer satisfied with single purges; multi-stage is more efficient.',
            'Now standard: Breakdown -> Reclaim -> Deeper breakdown -> Absolute Despair -> Real Launch.'
          ]
        },
        script: {
          zh: '时代变了！现在是 2025 年！如果你还在等那种一次性刺破然后立刻起飞的完美形态，你不是踏空就是被洗死！现在的量化算法极度下流，它们知道你们把止损放在哪，它们会刺破一次给你希望，再刺破第二次让你绝望！不把你榨干，车绝对不开！复合陷阱，才是当前市场的底色！',
          en: 'Times have changed! It\'s 2025! If you\'re still waiting for a perfect one-time sweep before a moonshot, you\'ll either miss out or get chopped to pieces! Modern algos are filthy. They know your stops. They pierce once to give hope, pierce twice to give despair! Until you are drained, the train won\'t leave! Complex traps are the new baseline!'
        }
      },
      {
        id: 'm7-s12',
        title: { zh: '实战变形 1：Double Spring (双重弹簧)', en: 'Variant 1: Double Spring' },
        chartData: charts.m7DoubleSpringData,
        annotations: charts.m7DoubleSpringAnn,
        bullets: { zh: [], en: [] },
        script: {
          zh: '看看这张极其恶心的双重弹簧图！第一次下破，收回，散户欢呼雀跃冲进去做多。结果呢？根本没有单边推移！行情像软脚虾一样横盘，接着突然再给你一记重锤！比第一次砸得更深！那些提早抄底的聪明人全被这第二刀送上了西天。只有在这第二次深度清扫、并且彻底夺回控制权之后，真正的狂暴拉升才正式开始！',
          en: 'Look at this disgusting double spring chart! First breakdown, reclaimed. Retail cheers and goes long. Result? No displacement at all! It chops like wet noodles, then suddenly drops the hammer AGAIN! Deeper than the first! All the smart early-buyers get sent to hell. Only after this SECOND deep sweep and complete reclaim does the actual parabolic rally begin!'
        }
      },
      {
        id: 'm7-s13',
        title: { zh: '实战变形 2：Upthrust 附带高位假接受', en: 'Variant 2: Upthrust with Fake Acceptance' },
        chartData: charts.m7FakeUpthrustData,
        annotations: charts.m7FakeUpthrustAnn,
        bullets: { zh: [], en: [] },
        script: {
          zh: '这招简直阴毒到了极点！价格突破区间上沿，按理说是上冲回落对吧？不，主力偏偏在高位给你收了几根十字星，营造出一种“突破有效，正在高位站稳”的假象！突破流交易者一看，哇，高位接受了，满仓干多！结果下一秒，一根天量大阴线直接砸回区间内部！所有在高位追多的人瞬间变成被关门打狗的燃料，随后行情直接瀑布！',
          en: 'This is pure evil! Price breaks the range high. It should just reject, right? No, big money prints dojis at the highs, creating the illusion of "successful breakout, holding support"! Breakout traders scream "Acceptance!" and go full margin long. Next second, an apocalyptic red candle smashes back into the range. All high-buyers become trapped fuel, and the waterfall dump begins!'
        }
      },
      {
        id: 'm7-s14',
        title: { zh: '实战变形 3：Spring + FVG 诱导猎杀', en: 'Variant 3: Spring + FVG Failure' },
        chartData: charts.m7SpringFvgData,
        annotations: charts.m7SpringFvgAnn,
        bullets: { zh: [], en: [] },
        script: {
          zh: '这是把威科夫和缺口理论结合的终极绞肉机！跌破低点形成弹簧，反弹的时候故意给你留下一个极其漂亮的看涨 FVG！你以为这是上车机会？大错特错！当价格回踩缺口，吸引你们这批理智多头进场后，主力反手再砸一根大阴线，直接贯穿缺口，把你们全杀光！洗干净之后，再原地上天！',
          en: 'This is the ultimate meat grinder combining Wyckoff and FVG theory! Sweeps the low for a spring, bounces, and intentionally leaves a beautiful bullish FVG! You think it\'s a safe entry? Dead wrong! When price retraces to fill the FVG, luring the "smart" longs, smart money drops a massive red candle right through it, killing everyone! Once washed clean, it rockets to the moon!'
        }
      },
      {
        id: 'm7-s15',
        title: { zh: 'Spring / Upthrust 的 3 种执行模型', en: '3 Execution Models for Spring / Upthrust' },
        diagram: 'wyckoff-decision-tree',
        bullets: {
          zh: [
            '1. 激进型：在边界扫损瞬间直接左侧接飞刀 (盈亏比极高，极易被二次清算)',
            '2. 标准型：等价格明确回到区间内部 (Reclaim) 后右侧入场',
            '3. 保守型：只做 Phase 4 的回踩，等彻底脱离区间再做',
            '机构原则：不要交易边界被碰到，要交易边界被利用后控制权的切换'
          ],
          en: [
            '1. Aggressive: Catching the knife at the exact boundary sweep (High RR, high risk of double-sweep).',
            '2. Standard: Entering right-side ONLY after price explicitly reclaims the range.',
            '3. Conservative: Trading Phase 4 pullbacks, waiting for full range departure.',
            'Rule: Do not trade boundaries being touched; trade the control shift AFTER boundaries are exploited.'
          ]
        },
        script: {
          zh: '别再瞎做了，这里给你三把刀！想赌命的激进派，直接在边界刺穿的瞬间接飞刀，盈亏比爆表，但极容易被双重陷阱砍死。标准做法是：必须等这根 K 线实打实地收回区间内部，确认洗盘结束再进！而真正稳健的老手，根本不在乎底部那点利润，他们只等第四阶段确认爆发，吃最肥最安全的中段！',
          en: 'Stop guessing! Here are 3 weapons: Aggressive gamblers catch the knife at the exact sweep—godly RR, but easily chopped by double traps. Standard is waiting for a confirmed reclaim inside the range. But true veterans don\'t care about the exact bottom; they wait for Phase 4 explosion and eat the safest, fattest meat in the middle!'
        }
      },
      {
        id: 'm7-s16',
        title: { zh: '现代 Wyckoff 终极决策树', en: 'Modern Wyckoff Decision Tree' },
        diagram: 'wyckoff-decision-tree',
        bullets: {
          zh: [
            '1. 是否存在明确的平衡收容区？',
            '2. 边界突破是否清理了显性流动性？',
            '3. 是否快速回到区间内部并发生接受度切换？',
            '4. 是否出现动能推移 (Displacement) 与延续？',
            '最终拷问：这是 Phase 3 的诱导，还是已进入 Phase 4 的承诺？'
          ],
          en: [
            '1. Is there a clear balance containment zone?',
            '2. Did the breakout clear obvious liquidity?',
            '3. Did it quickly return to the range and shift acceptance?',
            '4. Is there actual displacement and follow-through?',
            'Final question: Is this Phase 3 Inducement, or Phase 4 Commitment?'
          ]
        },
        script: {
          zh: '做单之前，把这张决策树给我刻在脑子里！先问自己，这里有明显的平衡区吗？刚刚的破位把谁给埋了？破位之后是像钉子一样钉在外面，还是像触电一样缩了回来？如果没有推移，如果没有破坏结构，一切都是耍流氓！不满足这几个条件，管它长得多像教材，全部当成陷阱处理！',
          en: 'Engrave this decision tree in your brain! Ask yourself: Is there a balance zone? Who just got buried by the breakout? Did it stick outside like a nail, or recoil like touching fire? If there is no displacement, no structure shift, it\'s all bullshit! If these aren\'t met, I don\'t care if it looks like a textbook, treat it as a trap!'
        }
      },
      {
        id: 'm7-s17',
        title: { zh: 'Module 7 核心结论', en: 'Module 7 Core Conclusion' },
        diagram: 'wyckoff-modern-overview',
        bullets: {
          zh: [
            '现代 Wyckoff 本质：平衡 -> 吸收 -> 操控 -> 承诺',
            'Spring / Upthrust 不是图形，而是流动性清理与控制权转移',
            '2024-2025 实盘常态：复合型、多段式陷阱',
            '最高级的交易方式不是押注极值，而是等待承诺性推动',
            'Wyckoff 的真正价值：帮你看懂市场何时结束操控，开始承诺'
          ],
          en: [
            'Modern Wyckoff: Balance -> Absorption -> Manipulation -> Commitment.',
            'Spring/Upthrust are not shapes, they are liquidity purges and control transfers.',
            '2024-2025 reality: Complex, multi-stage traps.',
            'High-level trading isn\'t betting on extremes; it\'s waiting for commitment.',
            'Wyckoff\'s true value: Seeing exactly when manipulation ends and commitment begins.'
          ]
        },
        script: {
          zh: '总结一下！真正的威科夫，绝不是教你画图认形态的破烂教科书，它是一套极度严密的资金行为心理学！从平衡到吸收，从操控屠杀到最终承诺，一步都不能少！在这个变态的现代市场里，别去迷信那个最低点，真正能让你活下来并暴富的，是学会看懂主力何时杀完了人，何时开始兑现承诺！',
          en: 'To summarize! Real Wyckoff isn\'t a garbage textbook for drawing shapes; it\'s a rigorous psychology of capital behavior! From balance to absorption, slaughter to commitment, no step is skipped! In this twisted modern market, stop worshipping the exact bottom. What keeps you alive and makes you rich is seeing exactly when smart money finishes killing, and starts delivering the promise!'
        }
      }
    ]
  },
  {
    id: 'm8',
    title: { zh: 'Module 8: Confluence of Evidence', en: 'Module 8: Confluence of Evidence' },
    slides: [
      {
        id: 'm8-s1',
        title: { zh: 'Module 8 — Confluence of Evidence', en: 'Module 8 — Confluence of Evidence' },
        diagram: 'm8-confluence-layers',
        bullets: {
          zh: [
            '单根 K 线骗线级别的多维度确认法',
            '不要再因为一根 Pin bar、一块 FVG 就下注',
            '真正的专业交易靠证据堆叠，不靠图形冲动',
            '最低 5 重证据叠加才动手 (5/8 规则)'
          ],
          en: [
            'Multi-dimensional confirmation to defeat single-candle traps.',
            'Stop betting your account on a single Pin Bar or FVG.',
            'True professional trading relies on evidence stacking, not impulse.',
            'Minimum 5 layers of evidence before execution (5/8 Rule).'
          ]
        },
        script: {
          zh: '市场上最便宜的东西，就是一根看起来很漂亮的 K 线。市场上最贵的错误，就是你只因为它漂亮就下了满仓！\n\n大多数散户永远在追求所谓的高胜率“神仙形态”，但真正的顶尖操盘手根本不在乎形态。我们只在乎：在这个时间、这个结构、这个流动性背景下，所有的证据是不是都指向同一个方向？如果不能形成多维度的共振 (Confluence)，就算图表上画出一朵花，老子也绝对不开一枪！',
          en: 'The cheapest thing in the market is a beautiful looking candlestick. The most expensive mistake is going full margin just because it looked pretty!\n\nMost retail traders chase \"holy grail\" patterns. Top institutional traders couldn\'t care less about patterns. We only care: At this time, in this structure, with this liquidity context, does all the evidence point in the exact same direction? Without multi-dimensional confluence, I wouldn\'t fire a single bullet even if the chart drew a masterpiece!'
        }
      },
      {
        id: 'm8-s2',
        title: { zh: '为什么单根 K 线最容易骗线？', en: 'Why Single Candles Trap Retail' },
        diagram: 'm8-single-candle-trap',
        bullets: {
          zh: [
            '单根 K 线信息量极低，无法独立说明语境',
            '它无法告诉你：控制权是否切换？流动性是否已经拿到？',
            '同样一根看涨吞没/锤子线，在不同位置意义完全相反',
            '结论：单根 K 线不是交易理由，它只是提醒你“该找证据了”'
          ],
          en: [
            'A single candle holds near-zero information; it provides no context.',
            'It cannot tell you: Has control shifted? Was liquidity taken?',
            'The exact same Bullish Engulfing or Pin Bar means completely opposite things at different locations.',
            'Conclusion: A candle is NOT a reason to trade; it is merely an alert to \"start gathering evidence\".'
          ]
        },
        script: {
          zh: '这就是为什么你们学了那么多K线战法，最后还是亏成了狗！\n\n你看到一根带有长长下影线的完美 Pin Bar，你觉得主力在护盘，直接做多。结果下一秒大阴线直接把你活埋！为什么？因为你这根完美的 K 线出现在震荡区间的正中央！它既没有清扫之前的止损池，也没有高周期的叙事支撑。单根 K 线就像犯罪现场的一个脚印，它只是提示你这里有情况，它绝对不是定罪的证据！',
          en: 'This is why you studied candlestick bibles and still bleed money like a stuck pig!\n\nYou see a perfect Pin Bar with a massive lower wick, you think smart money is defending, so you long. Next second, a giant red candle buries you alive! Why? Because your \"perfect\" candle appeared dead in the middle of a chop zone! It didn\'t sweep any prior stops, nor did it have higher timeframe backing. A single candle is like a footprint at a crime scene—it alerts you, but it is NEVER enough evidence to convict!'
        }
      },
      {
        id: 'm8-s3',
        title: { zh: '什么叫真正的 Confluence (共振)？', en: 'What is True Confluence?' },
        diagram: 'm8-confluence-layers',
        bullets: {
          zh: [
            '伪共振：同一区域画了趋势线、黄金分割、OB 和 FVG (只是位置重叠)',
            '真共振：多个“互相独立”的维度说的是同一个故事',
            '维度包括：结构、流动性、阶段、位移质量、接受/拒绝、执行区、时间',
            '真正的共振，是“行为逻辑”的叠加，而不是画线工具的叠加'
          ],
          en: [
            'Fake Confluence: Drawing a trendline, fib, OB, and FVG at the same spot (just spatial overlap).',
            'True Confluence: Multiple "mutually independent" dimensions telling the EXACT same story.',
            'Dimensions: Structure, Liquidity, Phase, Displacement, Acceptance, Execution, Timing.',
            'True confluence is stacking "behavioral logic", not stacking drawing tools.'
          ]
        },
        script: {
          zh: '不要把你们图上画得乱七八糟的指标叫作共振！你在同一个位置画了黄金分割 0.618，画了一根趋势线，又画了一个矩形，这不叫证据叠加！这叫同一类证据的重复画图！\n\n真正的共振是什么？是日线级别的流动性刚刚被清扫完毕 (环境)，15分钟图上出现暴力推移 (动能)，回踩时精准在伦敦盘开盘时段 (时间)，并且市场死死守住了新价格区 (接受)！这才是互相独立的逻辑闭环！',
          en: 'Stop calling your chart cluttered with 15 indicators \"confluence\"! You drew a 0.618 fib, a trendline, and a box at the exact same price level. That isn\'t evidence stacking! That\'s just drawing the same spatial evidence three times!\n\nWhat is true confluence? It\'s when Daily liquidity was just swept (Environment), the 15-minute chart shows violent displacement (Momentum), the pullback aligns perfectly with the London open (Timing), and the market fiercely defends the new price zone (Acceptance)! That is a mutually independent, bulletproof logical loop!'
        }
      },
      {
        id: 'm8-s4',
        title: { zh: '专业交易者的 8 维证据体系', en: 'The 8-Dimension Evidence System' },
        diagram: 'm8-checklist',
        bullets: {
          zh: [
            '1. 高级别叙事 (HTF Narrative)',
            '2. 结构位置 (Market Structure)',
            '3. 流动性背景 (Liquidity Context)',
            '4. 当前阶段 (Phase/State)',
            '5. 位移质量 (Displacement vs Exhaustion)',
            '6. 接受/拒绝行为 (Acceptance/Rejection)',
            '7. 执行区 (Execution Zone - OB/FVG)',
            '8. 时间/时段优势 (Timing/Session)'
          ],
          en: [
            '1. HTF Narrative',
            '2. Market Structure Location',
            '3. Liquidity Context',
            '4. Phase / Market State',
            '5. Displacement vs Exhaustion',
            '6. Acceptance / Rejection',
            '7. Execution Zone (OB/FVG)',
            '8. Timing / Session Edge'
          ]
        },
        script: {
          zh: '这是你从今天起必须刻在骨子里的 8 维打分系统！\n\n不要在看到某个订单块的时候脑子一热就冲进去。立刻强迫自己对着这 8 个维度挨个拷问：高级别在干什么？流动性清干净了吗？推移是真的吗？时间对吗？只有当你像一个冷血的法官一样，审问完所有这 8 个细节，你才有资格谈论入场！',
          en: 'This is the 8-dimension scoring system you must engrave into your bones from today onward!\n\nDo not just rush in hot-headed because you saw an Order Block. Force yourself to instantly interrogate these 8 dimensions: What is the HTF doing? Is liquidity purged? Is the displacement real? Is the timing right? Only when you interrogate these details like a cold-blooded judge do you earn the right to execute a trade!'
        }
      },
      {
        id: 'm8-s5',
        title: { zh: '实盘图解：极品 6/8 多头共振', en: 'Chart: Flawless 6/8 Bullish Confluence' },
        chartData: charts.m8HighBullData,
        annotations: charts.m8HighBullAnn,
        bullets: { zh: [], en: [] },
        script: {
          zh: '看这张图！为什么敢在这里重仓按下去？因为这不是瞎猜底！\n\n1. 大级别旧低止损池被清扫 (流动性)。2. 随后强势夺回局部结构 (结构)。3. 一根巨大阳线留下缺口 (位移)。4. 回踩 FVG 没跌破 (执行区与接受)。5. 纽约盘开盘发力 (时间)。这根小小的阳线起爆点，背后站着至少 6 重铁一般的证据支撑！这就是机构眼里的必杀局！',
          en: 'Look at this chart! Why do we dare load the boat here? Because this isn\'t guessing a bottom!\n\n1. HTF old low stop pool is swept (Liquidity). 2. Aggressive reclaim of local structure (Structure). 3. Massive green candle leaves a gap (Displacement). 4. FVG retest holds firm (Execution & Acceptance). 5. NY session opens and fires (Timing). That tiny bullish trigger candle is backed by at least 6 layers of ironclad evidence! This is an institutional kill-shot!'
        }
      },
      {
        id: 'm8-s6',
        title: { zh: '实盘图解：垃圾 2/8 陷阱 (致命单 K 线)', en: 'Chart: Garbage 2/8 Trap (Lethal 1-Candle)' },
        chartData: charts.m8LowPinData,
        annotations: charts.m8LowPinAnn,
        bullets: { zh: [], en: [] },
        script: {
          zh: '再看看这张墓地一样的图！图中间出现了一根非常“标准”的长下影线看涨 Pin Bar。多少散户看到这个瞬间就兴奋了？\n\n但你拿证据系统一扫：它不在关键结构上；前面没有任何流动性清扫；没有任何前期推移留下的缺口保护；更不在有效交易时段！得分：2/8。这种只有图形没有任何逻辑背景的 K 线，纯粹是主力挂在悬崖边上的鱼饵，下一秒大阴线直接把你们的账户干爆！',
          en: 'Now look at this graveyard! Dead in the middle of nowhere appears a very \"standard\" bullish Pin Bar with a long lower wick. How many retail traders get instantly aroused by this?\n\nBut scan it with the evidence system: It\'s not on key structure. No prior liquidity sweep. No prior displacement gap protecting it. Not even in an active session! Score: 2/8. A candle with a shape but zero logical context is just bait hung over a cliff by smart money. Next second, a giant red candle vaporizes your account!'
        }
      },
      {
        id: 'm8-s7',
        title: { zh: '实盘图解：极品 7/8 空头共振', en: 'Chart: Flawless 7/8 Bearish Confluence' },
        chartData: charts.m8HighBearData,
        annotations: charts.m8HighBearAnn,
        bullets: { zh: [], en: [] },
        script: {
          zh: '这是终极空头杀阵！价格上破旧高，把追高盘全部骗进来后 (流动性)。高位立刻失去接受，一根大阴线像断头台一样砸下 (位移与拒绝)。顺带留下了致命的 FVG Inversion 阻力区 (执行区)。所有看多的人在这一刻全部被套牢！当价格回测这个区域时，配合伦敦/纽约时段的交接点 (时间)。7 重证据共振，你要做的就是闭着眼睛扣动扳机，享受瀑布！',
          en: 'This is the ultimate bearish kill array! Price sweeps the old high, sucking in all breakout chasers (Liquidity). It instantly loses acceptance at the high, dropping a red guillotine candle (Displacement & Rejection). It leaves behind a lethal FVG Inversion resistance (Execution Zone). All longs are trapped! When price retests this zone, perfectly aligning with the London/NY handoff (Timing). 7 layers of confluence. All you do is close your eyes, pull the trigger, and enjoy the waterfall!'
        }
      },
      {
        id: 'm8-s8',
        title: { zh: '执行底线：5/8 规则 (The 5/8 Rule)', en: 'The Execution Baseline: 5/8 Rule' },
        diagram: 'm8-checklist',
        bullets: {
          zh: [
            '这是专业交易员的铁律：没有 5 个以上的证据独立支持，绝不开枪',
            '0-4 项证据：垃圾局，看戏 (不准做)',
            '5 项证据：勉强及格，轻仓试探 (B 级 Setup)',
            '6 项证据：胜率极大，标准仓位 (A- 级 Setup)',
            '7-8 项证据：重仓猎杀局 (A+ 级 Setup)'
          ],
          en: [
            'The iron law of professionals: Without 5+ independent evidence layers, NEVER fire.',
            '0-4 layers: Garbage setup. Grab popcorn (NO TRADE).',
            '5 layers: Barely passes. Light size (B-Tier Setup).',
            '6 layers: High win rate. Standard size (A- Tier Setup).',
            '7-8 layers: Heavy kill-shot (A+ Tier Setup).'
          ]
        },
        script: {
          zh: '这就是把主观交易变成机器般冷血执行的核心秘密！\n\n从今天起，别凭感觉做单！对着打分卡一项一项勾选。不到 5 分，哪怕图表看起来再性感，你也必须把手绑在椅子上！如果能达到 6 分以上，那就不要有任何犹豫，严格按风控按下核按钮！用铁一样的纪律，把你的账户从随机赌博的赌场里拉出来！',
          en: 'This is the core secret to turning discretionary trading into machine-like, cold-blooded execution!\n\nFrom today on, no more trading on "feel"! Check the scorecard box by box. If it doesn\'t hit 5 points, I don\'t care how sexy the chart looks, tie your hands to the chair! If it hits 6 or above, hesitate for exactly zero seconds, follow your risk management, and press the nuclear button! Use iron discipline to drag your account out of the random gambling casino!'
        }
      },
      {
        id: 'm8-s9',
        title: { zh: '实盘操作流程：先打分，再找扳机', en: 'Execution Flow: Grade First, Trigger Last' },
        diagram: 'm8-decision-flow',
        bullets: {
          zh: [
            '大部分烂交易死在第一步，大部分好交易赢在最后一步等待',
            '顺序：先看大级别叙事和流动性目标',
            '再等控制权切换 (Displacement / Acceptance)',
            '在执行区 (FVG/OB) 用时间轴核对打分',
            '原则：先有交易理由，再有入场扳机；绝不能反过来！'
          ],
          en: [
            'Most trash trades die on step 1, most great trades win on the final wait.',
            'Order: First map HTF narrative and liquidity targets.',
            'Wait for control shift (Displacement / Acceptance).',
            'Grade in the execution zone (FVG/OB) against the session time.',
            'Rule: The trade reason comes FIRST, the trigger candle comes LAST. Never reverse this!'
          ]
        },
        script: {
          zh: '最后总结你们散户最愚蠢的习惯：你们总是先看到一根 K 线（扳机），然后疯狂给自己找理由，画各种线来证明自己可以做多。这是本末倒置！\n\n专业杀手永远是先用 8 维证据系统锁定了一块即将发生屠杀的死亡地带，静静地趴在那里，最后那一根 K 线，只是猎物踩上地雷时听到的一声脆响！把思维反过来，你就是收割者！',
          en: 'Let me summarize your dumbest retail habit: You always see a candle FIRST (the trigger), and then frantically look for reasons, drawing random lines to justify going long. That is entirely backwards!\n\nA professional assassin uses the 8-dimension system to lock onto a kill zone well in advance. They lie there silently. That final candlestick is just the crisp click of the prey stepping on the landmine! Reverse your thinking, and you become the reaper!'
        }
      }
    ]
  },
  {
    id: 'm9',
    title: { zh: 'Module 9: Execution Framework', en: 'Module 9: Execution Framework' },
    slides: [
      {
        id: 'm9-s1',
        title: { zh: 'Module 9 — 机构 3 种最狠的入场模型', en: 'Module 9 — 3 Most Lethal Institutional Entry Models' },
        diagram: 'm9-overview',
        bullets: {
          zh: [
            '不是“哪里看起来能做”，而是“在哪种状态下，哪种模型拥有最优非对称性”',
            'Model 1: Manipulation Entry (假突破入场)',
            'Model 2: Confirmation Entry (OB + FVG + Displacement 组合)',
            'Model 3: Turtle Soup +2 (2025 年改良版)',
            '把前面 1-8 模块全部落到真正执行层'
          ],
          en: [
            'Not "where it looks tradable", but "which state gives which model the best asymmetry"',
            'Model 1: Manipulation Entry (Fake Breakout)',
            'Model 2: Confirmation Entry (OB + FVG + Displacement)',
            'Model 3: Turtle Soup +2 (2025 Improved Version)',
            'Translating Modules 1-8 into true execution'
          ]
        },
        script: {
          zh: '这一章解决的是大多数交易者最痛的一个问题：你可能已经会看结构、会看流动性、会看 FVG，但真正到要点“买入 / 卖出”的那一刻，还是容易乱。这一章我们不讲虚的，只讲执行！',
          en: 'This chapter solves the biggest pain point for most traders: You might know structure, liquidity, and FVGs, but when it\'s time to actually click "buy/sell", you still freeze or mess up. We are dropping the theory and focusing purely on execution!'
        }
      },
      {
        id: 'm9-s2',
        title: { zh: '散户执行阶段的 4 大致命死法', en: '4 Lethal Execution Mistakes of Retail Traders' },
        diagram: 'm9-mistakes',
        bullets: {
          zh: [
            '1. 抢跑 (FOMO)：没等控制权转移就提前挂单',
            '2. 追尾 (Chasing)：在位移耗尽 (Exhaustion) 时追涨杀跌',
            '3. 迷信图形：在错误的流动性环境里做“标准形态”',
            '4. 止损乱放：按固定点数止损，而不是按逻辑失效点止损'
          ],
          en: [
            '1. Front-running (FOMO): Entering before control shifts.',
            '2. Chasing: Buying/selling into exhaustion after the move.',
            '3. Pattern Worship: Trading "textbook patterns" in the wrong liquidity context.',
            '4. Arbitrary Stops: Using fixed pip stops instead of logical invalidation points.'
          ]
        },
        script: {
          zh: '在讲模型之前，先看看你们是怎么死的！第一种，看到价格靠近支撑就提前挂单，结果被一波带走。第二种，看到大阳线怕错过，直接追在天花板。第三种，在震荡区中间做完美的 Pin Bar。第四种，止损永远设 20 个点，刚好被扫掉然后看着行情起飞。戒掉这四个毛病，你才能活下来！',
          en: 'Before we discuss models, let\'s see how you die! First, front-running support and getting swept. Second, chasing giant green candles right into the ceiling. Third, trading a perfect Pin Bar in the middle of chop. Fourth, using a fixed 20-pip stop that gets hunted right before the real move. Cure these four diseases to survive!'
        }
      },
      {
        id: 'm9-s3',
        title: { zh: '三大入场模型全景图', en: 'The 3 Entry Models Overview' },
        diagram: 'm9-overview',
        bullets: {
          zh: [
            'Model 1: Manipulation Entry (假突破) - 极速反转，V型收回',
            'Model 2: Confirmation Entry (确认) - 扫荡 -> 破坏 -> 缺口 -> 回踩',
            'Model 3: Turtle Soup +2 (改良海龟汤) - 扫荡 -> 双重拒绝',
            '所有模型的核心：必须先有流动性清扫 (Liquidity Sweep)！'
          ],
          en: [
            'Model 1: Manipulation Entry (Fakeout) - Extreme reversal, V-shape reclaim.',
            'Model 2: Confirmation Entry - Sweep -> CHOCH -> FVG -> Retest.',
            'Model 3: Turtle Soup +2 - Sweep -> Double Rejection.',
            'Core to ALL models: A Liquidity Sweep MUST happen first!'
          ]
        },
        script: {
          zh: '这是我们今天要讲的三大杀器！记住一个铁律：没有任何一个模型是在没有清扫流动性的情况下触发的！不扫止损，绝不入场！',
          en: 'These are the three lethal weapons we will cover today! Remember one iron rule: NONE of these models trigger without a prior liquidity sweep! No stop hunt, no entry!'
        }
      },
      {
        id: 'm9-s4',
        title: { zh: 'Model 1: Manipulation Entry (本质)', en: 'Model 1: Manipulation Entry (Essence)' },
        diagram: 'm9-manipulation-entry',
        bullets: {
          zh: [
            '本质：利用散户的突破跟随盘和止损盘，建立反向头寸',
            '视觉特征：一根长长的针尖 (Wick) 刺穿关键位，随后立刻反向吞没',
            '心理学：让追突破的人瞬间绝望，让设止损的人瞬间拍大腿'
          ],
          en: [
            'Essence: Using retail breakout chasers and stop-losses to build counter-positions.',
            'Visual: A long wick piercing a key level, followed instantly by a reverse engulfing.',
            'Psychology: Making breakout traders instantly despair, and stop-loss traders instantly regret.'
          ]
        },
        script: {
          zh: '假突破入场的本质是什么？就是吃人！主力故意把价格推破关键阻力，让散户以为要起飞了，疯狂追多。等散户的买单全部成交，主力立刻反手砸盘，形成一根长长的上影线。这就是最血腥的财富转移！',
          en: 'What is the essence of Manipulation Entry? It\'s cannibalism! Smart money deliberately pushes price past key resistance, making retail think it\'s mooning. Once retail buy orders are filled, smart money instantly dumps, leaving a massive upper wick. This is the bloodiest wealth transfer!'
        }
      },
      {
        id: 'm9-s5',
        title: { zh: 'Model 1: 什么时候能做？(前提条件)', en: 'Model 1: Prerequisites' },
        diagram: 'm9-manipulation-entry',
        bullets: {
          zh: [
            '1. 必须有极其明显的流动性池 (如：平齐高低点 EQH/EQL)',
            '2. 必须在关键时间节点 (如：伦敦开盘、纽约开盘、新闻发布)',
            '3. 价格必须处于震荡区间边缘，或逆着大级别趋势的局部高低点'
          ],
          en: [
            '1. Must have an extremely obvious liquidity pool (e.g., EQH/EQL).',
            '2. Must be at a key time window (London Open, NY Open, News).',
            '3. Price must be at range edges, or counter-trend local extremes.'
          ]
        },
        script: {
          zh: '不是随便一个假突破都能做！前提条件极其苛刻：第一，必须有明显的止损池，没有诱饵主力不会动手。第二，必须在活跃时段，亚洲盘半夜的假突破往往是真没动能。第三，最好在震荡区间的边缘！',
          en: 'You can\'t trade just any fakeout! The prerequisites are strict: First, an obvious stop pool must exist; without bait, smart money won\'t act. Second, it must be during active sessions; midnight Asian fakeouts are often just dead momentum. Third, ideally at the edges of a ranging market!'
        }
      },
      {
        id: 'm9-s6',
        title: { zh: 'Model 1: 触发逻辑 (Trigger)', en: 'Model 1: Trigger Logic' },
        diagram: 'm9-manipulation-entry',
        bullets: {
          zh: [
            '第一步：价格刺穿关键位 (Sweep)',
            '第二步：立刻以大实体 K 线反向收回关键位之内 (Reclaim)',
            '扳机：收回关键位的那根 K 线闭合的瞬间，直接市价入场 (Market Execution)'
          ],
          en: [
            'Step 1: Price pierces the key level (Sweep).',
            'Step 2: Instantly reclaims inside the key level with a full-bodied candle (Reclaim).',
            'Trigger: The exact moment the reclaiming candle closes, enter at market (Market Execution).'
          ]
        },
        script: {
          zh: '触发逻辑非常暴力：扫荡，然后立刻收回！记住，收回的这根 K 线必须是坚决的、大实体的。当这根 K 线在关键位内部闭合的一瞬间，不要犹豫，直接市价敲进去！',
          en: 'The trigger logic is violent: Sweep, then instantly reclaim! Remember, the reclaiming candle must be decisive and full-bodied. The exact second this candle closes back inside the key level, do not hesitate—hit the market order!'
        }
      },
      {
        id: 'm9-s7',
        title: { zh: 'Model 1: 止损与失效逻辑', en: 'Model 1: Stop Loss & Invalidation' },
        diagram: 'm9-manipulation-entry',
        bullets: {
          zh: [
            '止损位：放在扫荡针尖的极值点外 + 1-2 Ticks (极窄止损)',
            '失效逻辑 (Invalidation)：如果扫荡后，价格在关键位外部停留超过 3-4 根 K 线，或者出现连续的同向 FVG，说明这不是假突破，而是“接受 (Acceptance)”！'
          ],
          en: [
            'Stop Loss: Just outside the extreme wick of the sweep + 1-2 Ticks (Ultra-tight stop).',
            'Invalidation: If price stays outside the key level for > 3-4 candles, or prints consecutive same-direction FVGs, it\'s NOT a fakeout. It\'s "Acceptance"!'
          ]
        },
        script: {
          zh: '这个模型的魅力在于极高的盈亏比！止损就放在针尖外面一点点。如果价格再次打掉针尖，说明我们的判断全错，认赔出局。最关键的失效逻辑：如果扫出去之后，价格在外面磨磨唧唧不回来，甚至开始搭平台，立刻撤销所有反向计划，这是真突破！',
          en: 'The beauty of this model is the insane Risk/Reward! Place the stop just outside the wick. If price takes out the wick again, our entire premise is wrong—take the small loss. The critical invalidation: If price sweeps and then lingers outside, building a base, cancel all reversal plans immediately. That is a real breakout!'
        }
      },
      {
        id: 'm9-s8',
        title: { zh: 'Model 1: 最佳适用场景', en: 'Model 1: Best Scenarios' },
        diagram: 'm9-model-selection',
        bullets: {
          zh: [
            '最强场景：亚洲盘形成明显区间，伦敦盘开盘向下假突破扫掉亚盘低点，随后 V 型反转向上。',
            '优势：盈亏比极高 (经常能抓到日内绝对高低点)',
            '劣势：需要极强的盘感和果断的执行力，容易被连续扫荡'
          ],
          en: [
            'Best Scenario: Asian session forms a range, London Open fakes down to sweep Asian Lows, then V-shape reverses up.',
            'Pros: Extreme R:R (often catches the absolute daily High/Low).',
            'Cons: Requires sharp screen-time and decisive execution; prone to consecutive sweeps.'
          ]
        },
        script: {
          zh: '最经典的剧本就是“亚洲盘震荡，伦敦盘扫荡，纽约盘延续”。伦敦开盘那一瞬间的向下插针，就是你用 Model 1 扣动扳机的最佳时刻！',
          en: 'The most classic script is "Asian Consolidation, London Manipulation, NY Continuation." That downward wick the exact moment London opens is your perfect moment to pull the trigger with Model 1!'
        }
      },
      {
        id: 'm9-s9',
        title: { zh: 'Model 2: Confirmation Entry (本质)', en: 'Model 2: Confirmation Entry (Essence)' },
        diagram: 'm9-confirmation-entry',
        bullets: {
          zh: [
            '本质：不见兔子不撒鹰。让市场先证明自己，我们再跟随。',
            '视觉特征：结构破坏 (CHOCH) + 动能缺口 (FVG) 的完美组合',
            '心理学：放弃买在最低点/卖在最高点的执念，换取极高的确定性'
          ],
          en: [
            'Essence: Don\'t shoot until you see the whites of their eyes. Let the market prove itself first.',
            'Visual: The perfect combo of Structure Shift (CHOCH) + Momentum Gap (FVG).',
            'Psychology: Giving up the obsession of catching the exact top/bottom in exchange for extreme certainty.'
          ]
        },
        script: {
          zh: '第二种模型：确认入场。这是机构用得最多、最稳健的模型。它的本质是“让子弹先飞一会儿”。我们不猜底，我们等主力把底砸出来，并且强势拉升证明了自己之后，我们再上车！',
          en: 'Model 2: Confirmation Entry. This is the most robust and heavily used institutional model. Its essence is "let the market show its hand." We don\'t guess bottoms; we wait for smart money to carve the bottom, aggressively push up to prove it, and THEN we get on board!'
        }
      },
      {
        id: 'm9-s10',
        title: { zh: 'Model 2: 完整的 4 步条件', en: 'Model 2: The 4-Step Conditions' },
        diagram: 'm9-confirmation-entry',
        bullets: {
          zh: [
            '1. Sweep (扫荡)：必须先清扫大级别的流动性池',
            '2. CHOCH (破坏)：必须强力突破最近的结构高/低点 (控制权转移)',
            '3. Displacement (位移)：突破时必须是大实体 K 线，并留下 FVG',
            '4. Retest (回踩)：价格温和回撤至 FVG 或 OB 区域'
          ],
          en: [
            '1. Sweep: Must first purge a HTF liquidity pool.',
            '2. CHOCH: Must aggressively break the most recent structural H/L (Control Shift).',
            '3. Displacement: The break must be full-bodied candles, leaving an FVG.',
            '4. Retest: Price mildly retraces into the FVG or OB zone.'
          ]
        },
        script: {
          zh: '这四步，缺一不可！没有扫荡的 CHOCH 是假动作；没有 FVG 的 CHOCH 是动能不足；没有温和回踩的入场是追涨杀跌。必须像机器一样核对这四个条件！',
          en: 'These four steps are non-negotiable! A CHOCH without a sweep is a fakeout; a CHOCH without an FVG lacks momentum; entering without a mild retest is just chasing. You must verify these four conditions like a machine!'
        }
      },
      {
        id: 'm9-s11',
        title: { zh: 'Model 2: 执行流程 (Execution Flow)', en: 'Model 2: Execution Flow' },
        diagram: 'm9-confirmation-entry',
        bullets: {
          zh: [
            '挂单逻辑：在 FVG 的边缘 (或 OB 的开盘价) 提前挂 Limit 单',
            '确认细节：回踩的过程必须是“缩量、小实体”的 K 线 (说明是获利盘回吐，不是反向攻击)',
            '时间过滤：回踩最好发生在活跃交易时段的重叠区'
          ],
          en: [
            'Order Logic: Place a Limit order at the edge of the FVG (or OB open price).',
            'Confirmation Detail: The retest MUST be low-volume, small-bodied candles (indicating profit-taking, not a counter-attack).',
            'Time Filter: The retest ideally happens during active session overlaps.'
          ]
        },
        script: {
          zh: '当出现 FVG 后，你就可以安心地在 FVG 边缘挂单了。但要注意，回踩的姿势很重要！如果是一根巨大的阴线直接砸向你的多头 FVG，立刻撤单！我们要看到的是小碎步一样的温和回踩。',
          en: 'Once the FVG forms, you can confidently place your limit order at its edge. But pay attention to the posture of the retest! If a giant red candle smashes directly into your bullish FVG, cancel the order immediately! We want to see a mild, small-stepping retracement.'
        }
      },
      {
        id: 'm9-s12',
        title: { zh: 'Model 2: 止损、目标与失效', en: 'Model 2: Stop, Target & Invalidation' },
        diagram: 'm9-confirmation-entry',
        bullets: {
          zh: [
            '止损位：放在 CHOCH 起点 (极值点) 的外部',
            '第一目标：对侧的内部流动性 (最近的 FVG 或旧高低点)',
            '失效逻辑：回踩时直接以大实体 K 线贯穿 FVG 并收盘在 FVG 之外 (动能延续失败)'
          ],
          en: [
            'Stop Loss: Outside the origin of the CHOCH (the extreme point).',
            'First Target: Opposing internal liquidity (nearest FVG or old H/L).',
            'Invalidation: The retest pierces the FVG with a full-bodied candle and closes outside it (Momentum continuation failure).'
          ]
        },
        script: {
          zh: '确认模型的止损相对较宽，放在整个反转结构的最低点下方，这样能避免被噪音扫掉。如果价格不仅填补了 FVG，还大实体收在了 FVG 下方，说明多头根本没有防守，模型失效！',
          en: 'The stop loss for the Confirmation model is relatively wider, placed below the absolute low of the reversal structure to avoid noise. If price not only fills the FVG but closes a full body below it, it means bulls aren\'t defending at all—model invalidated!'
        }
      },
      {
        id: 'm9-s13',
        title: { zh: '为什么传统的“海龟汤”不够用了？', en: 'Why Traditional "Turtle Soup" Fails Now' },
        diagram: 'm9-turtle-soup',
        bullets: {
          zh: [
            '传统海龟汤：只要跌破前低，立刻盲目做多',
            '现代市场问题：算法极其狡猾，经常出现“扫了又扫” (Secondary Sweep)',
            '散户痛点：做早了被二次扫荡打止损，做晚了错过行情'
          ],
          en: [
            'Traditional TS: Blindly long the exact moment it breaks a prior low.',
            'Modern Market Issue: Algorithms are ruthless, frequently executing "Secondary Sweeps".',
            'Retail Pain: Enter too early and get stopped by the second sweep; enter too late and miss the move.'
          ]
        },
        script: {
          zh: 'ICT 早年提出的海龟汤非常经典，但现在的算法早就进化了！你以为跌破前低就是底？主力经常会再往下砸一次，把你止损打掉再拉升。这就是为什么我们要用 2025 年的改良版！',
          en: 'ICT\'s original Turtle Soup was classic, but algorithms have evolved! You think breaking the prior low is the bottom? Smart money will often smash it down one more time, hunting your stop before rallying. This is why we use the 2025 improved version!'
        }
      },
      {
        id: 'm9-s14',
        title: { zh: 'Model 3: Turtle Soup +2 (定义)', en: 'Model 3: Turtle Soup +2 (Definition)' },
        diagram: 'm9-turtle-soup',
        bullets: {
          zh: [
            '核心升级：不猜单次扫荡，等待“双重拒绝 (Double Rejection)”',
            '条件 1：大级别扫荡关键流动性',
            '条件 2：小级别出现第一次拒绝 (留下长影线或小 FVG)',
            '条件 3：价格二次下探，但未能跌破第一次拒绝的极值，随后强力拉升'
          ],
          en: [
            'Core Upgrade: Stop guessing single sweeps; wait for "Double Rejection".',
            'Condition 1: HTF sweeps key liquidity.',
            'Condition 2: LTF shows a first rejection (long wick or small FVG).',
            'Condition 3: Price probes down a second time but FAILS to break the extreme of the first rejection, then rallies hard.'
          ]
        },
        script: {
          zh: 'Turtle Soup +2 的精髓在于“+2”：我们要看两次测试！第一次测试是扫大级别的止损，第二次测试是确认主力真的在护盘。只有当第二次下探失败时，我们才入场！',
          en: 'The essence of Turtle Soup +2 is the "+2": We want to see TWO tests! The first test sweeps the HTF stops; the second test confirms smart money is actually defending. We only enter when the second probe fails!'
        }
      },
      {
        id: 'm9-s15',
        title: { zh: 'Model 3: 执行与止损', en: 'Model 3: Execution & Stop Loss' },
        diagram: 'm9-turtle-soup',
        bullets: {
          zh: [
            '入场点：第二次下探被拒绝，并突破第一次拒绝的“颈线”时市价追入',
            '止损点：严格放在第二次下探的极值点外',
            '优势：完美避开主力的“二次扫荡”陷阱，胜率极高'
          ],
          en: [
            'Entry: When the second probe is rejected and breaks the "neckline" of the first rejection, enter at market.',
            'Stop Loss: Strictly outside the extreme of the second probe.',
            'Pros: Perfectly avoids the smart money "secondary sweep" trap; extremely high win rate.'
          ]
        },
        script: {
          zh: '这个模型的入场稍微晚一点点，但换来的是极高的胜率！当价格突破两次拒绝之间的颈线时，就是空头彻底绝望的时刻，直接市价买入！止损就放在第二次低点的下方。',
          en: 'This model enters slightly later, but trades that for an insanely high win rate! When price breaks the neckline between the two rejections, it\'s the moment bears completely despair—buy at market! Stop loss goes right below the second low.'
        }
      },
      {
        id: 'm9-s16',
        title: { zh: '三种模型如何选择？(环境决定武器)', en: 'How to Choose? (Environment Dictates Weapon)' },
        diagram: 'm9-model-selection',
        bullets: {
          zh: [
            '震荡市 / 亚盘：优先 Model 1 (Manipulation)，快进快出，吃区间边缘',
            '趋势市 / 伦敦盘：优先 Model 2 (Confirmation)，顺势回踩，吃大波段',
            '关键新闻发布 / 纽约盘初：优先 Model 3 (Turtle Soup +2)，防二次上下乱扫'
          ],
          en: [
            'Ranging / Asian Session: Prioritize Model 1 (Manipulation). In and out fast, eat the range edges.',
            'Trending / London Session: Prioritize Model 2 (Confirmation). Trend pullback, catch the big swing.',
            'Major News / NY Open: Prioritize Model 3 (Turtle Soup +2). Protect against volatile secondary sweeps.'
          ]
        },
        script: {
          zh: '不要拿着锤子看什么都是钉子！震荡市用假突破，趋势市用确认回踩，遇到非农这种大新闻或者纽约刚开盘群魔乱舞的时候，用改良海龟汤防身！',
          en: 'Don\'t be a guy with a hammer seeing everything as a nail! Use Manipulation in ranges, Confirmation in trends, and when NFP hits or NY opens with crazy volatility, use Improved Turtle Soup to protect yourself!'
        }
      },
      {
        id: 'm9-s17',
        title: { zh: '三大模型一页通 (One-Page Cheat Sheet)', en: 'The 3 Models One-Page Cheat Sheet' },
        diagram: 'm9-overview',
        bullets: {
          zh: [
            'Model 1: 扫荡 -> V型收回 -> 极窄止损 -> 极高盈亏比',
            'Model 2: 扫荡 -> CHOCH -> FVG 回踩 -> 结构止损 -> 极高胜率',
            'Model 3: 扫荡 -> 双重拒绝 -> 颈线突破 -> 极强防守'
          ],
          en: [
            'Model 1: Sweep -> V-Reclaim -> Ultra-tight Stop -> Extreme R:R.',
            'Model 2: Sweep -> CHOCH -> FVG Retest -> Structural Stop -> Extreme Win Rate.',
            'Model 3: Sweep -> Double Rejection -> Neckline Break -> Extreme Defense.'
          ]
        },
        script: {
          zh: '把这一页截图打印出来贴在屏幕旁边！每次想按鼠标的时候，问问自己：我现在到底在执行哪一个模型？如果哪个都不符合，就把手从鼠标上拿开！',
          en: 'Screenshot this page, print it, and tape it next to your monitor! Every time you want to click the mouse, ask yourself: Which exact model am I executing right now? If it doesn\'t fit any, take your hand off the mouse!'
        }
      },
      {
        id: 'm9-s18',
        title: { zh: 'Module 9 核心结论', en: 'Module 9 Core Conclusion' },
        diagram: 'm9-overview',
        bullets: {
          zh: [
            '执行力不是靠胆量，而是靠清晰的模型边界',
            '没有流动性清扫，所有的入场模型都不成立',
            '接受错过 (FOMO)：宁愿错过模糊的行情，绝不执行模型外的交易',
            '专业交易员只做自己看得懂、能定义、能复现的 Setup'
          ],
          en: [
            'Execution isn\'t about guts; it\'s about clear model boundaries.',
            'Without a liquidity sweep, NO entry model is valid.',
            'Accept missing out (FOMO): Better to miss a blurry move than execute outside the model.',
            'Professionals ONLY trade setups they can understand, define, and replicate.'
          ]
        },
        script: {
          zh: '总结一下！执行力差，根本原因是你不知道自己到底在等什么！有了这三个模型，你的交易就变成了流水线作业：看环境 -> 选模型 -> 等条件 -> 扣扳机。不符合模型？那就去睡觉！这才是专业交易！',
          en: 'To summarize! Poor execution stems from not knowing exactly what you are waiting for! With these three models, your trading becomes an assembly line: Read environment -> Pick model -> Wait for conditions -> Pull trigger. Doesn\'t fit the model? Go to sleep! That is professional trading!'
        }
      }
    ]
  },
  { 
    id: 'm10', 
    title: { zh: 'Module 10: 风险与仓位管理', en: 'Module 10: Risk & Trade Management' }, 
    slides: [
      {
        id: 'm10-s1',
        title: { zh: 'Module 10 — Risk & Trade Management\n机构真实风控（不是 1% 那种笑话）', en: 'Module 10 — Risk & Trade Management\nInstitutional Risk (Not the 1% Joke)' },
        diagram: 'm10-overview',
        bullets: {
          zh: [
            '动态止损、仓位分批、利润搬砖法：把分析变成可活下来的系统',
            '零售交易者把风控理解成“亏少一点”',
            '专业交易者把风控理解成“让正确的交易活下来，让错误的交易尽快失去资格”'
          ],
          en: [
            'Dynamic Stops, Scaling, Profit Extraction: Turn analysis into a survivable system',
            'Retail traders see risk management as "losing less"',
            'Professionals see it as "letting right trades survive and killing wrong ones quickly"'
          ]
        },
        script: { zh: `欢迎来到第10模块。前面9个模块我们讲了结构、流动性、入场模型，但如果你没有这一章的知识，前面的技术分析再好，你依然会亏钱。专业交易员和散户最大的区别，不在于谁看图更准，而在于谁的风控系统更完善。今天我们讲真正的机构风控：动态止损、仓位分批和利润搬砖。`, en: '' }
      },
      {
        id: 'm10-s2',
        title: { zh: '为什么“每单 1%”不是完整风控', en: 'Why "1% Per Trade" is NOT Complete Risk Management' },
        diagram: 'm10-mistakes',
        bullets: {
          zh: [
            '1% 只回答“最多亏多少”，但没有回答：',
            '为什么这里该止损？是技术性失效，还是只是噪音？',
            '为什么这笔交易值得冒这个风险？',
            '什么时候该减仓、锁利、留 runner？',
            '同样 1%，A+ setup 和 B setup 为什么不该一视同仁？',
            '风控是：失效定义 + 仓位表达 + 持仓管理 + 利润提取'
          ],
          en: [
            '1% only answers "max loss", but doesn\'t answer:',
            'Why stop here? Is it technical invalidation or just noise?',
            'Why is this trade worth the risk?',
            'When to trim, lock profits, or leave a runner?',
            'Why treat A+ and B setups the same with 1%?',
            'Risk is: Invalidation + Position Expression + Management + Extraction'
          ]
        },
        script: { zh: `很多散户把风控简单理解为'每单亏1%'。这只是一个数字，它没有告诉你为什么在这里止损，为什么这笔交易值得做，以及浮盈后该怎么办。真正的风控是一个完整的系统，包含失效定义、仓位表达、持仓管理和利润提取。`, en: '' }
      },
      {
        id: 'm10-s3',
        title: { zh: '专业风控的 4 大组成部分', en: 'The 4 Pillars of Professional Risk Management' },
        diagram: 'm10-four-pillars',
        bullets: {
          zh: [
            '1. Invalidation Risk（失效风险）：我的交易逻辑在哪个位置真正被证明错了？',
            '2. Position Risk（仓位风险）：用多大仓位表达这个观点？',
            '3. Management Risk（管理风险）：持仓中如何调整、保护、再评估？',
            '4. Extraction Risk（利润提取风险）：怎么把浮盈变成已实现收益，而不是吐回去？'
          ],
          en: [
            '1. Invalidation Risk: Where is my thesis actually proven wrong?',
            '2. Position Risk: What size expresses this view?',
            '3. Management Risk: How to adjust, protect, and re-evaluate while in the trade?',
            '4. Extraction Risk: How to turn paper profits into realized gains without giving them back?'
          ]
        },
        script: { zh: `专业风控由四大支柱构成。第一，失效风险：你的逻辑在哪里被证明是错的？第二，仓位风险：用多大仓位来表达这个观点？第三，管理风险：持仓过程中如何根据新信息调整？第四，提取风险：怎么把账面浮盈变成落袋为安的现金？`, en: '' }
      },
      
      {
        id: 'm10-s3a',
        title: { zh: 'R乘数的力量 (The Power of R-Multiple)', en: 'The Power of R-Multiple' },
        diagram: 'm10-r-multiple',
        bullets: {
          zh: [
            '把风险标准化：无论账户大小，单笔最大风险永远定义为 1R',
            '止损 = -1R，盈利 = +2R 或 +3R',
            '把交易从“情绪化的金钱博弈”变成“标准化的概率游戏”',
            '不要用绝对金额思考，用 R 思考'
          ],
          en: [
            'Standardize risk: Regardless of account size, max risk per trade is 1R',
            'Stop Loss = -1R, Target = +2R or +3R',
            'Turns trading from "emotional money gambling" to a "standardized probability game"',
            'Think in R, not in absolute dollars'
          ]
        },
        script: { zh: `在进入具体操作前，我们先统一语言：R乘数。不管你的账户是1千还是10万，我们都把单笔最大风险定义为 1R。止损就是负 1R，盈利就是正 2R 或 3R。这样你的交易就变成了标准化的概率游戏，而不是情绪化的金钱博弈。`, en: '' }
      },
      {
        id: 'm10-s3b',
        title: { zh: '仓位计算公式 (Position Sizing Formula)', en: 'Position Sizing Formula' },
        diagram: 'm10-position-sizing',
        bullets: {
          zh: [
            '如何保证每次亏损都是准确的 1R？使用仓位计算公式',
            '公式：仓位大小 = (账户余额 × 风险比例) / (止损点数 × 每点价值)',
            '止损空间小（如 20 pips），仓位可以大；止损空间大（如 40 pips），仓位必须小',
            '永远先确定止损位置，再反推仓位大小'
          ],
          en: [
            'How to ensure every loss is exactly 1R? Use the sizing formula',
            'Formula: Lot Size = (Balance × Risk%) / (Stop Pips × Pip Value)',
            'Tight stop (20 pips) = Larger size; Wide stop (40 pips) = Smaller size',
            'ALWAYS determine stop placement first, then calculate size'
          ]
        },
        script: { zh: `怎么保证每次亏损都是准确的 1R？你需要使用仓位计算公式。如果止损空间小，你可以下大一点的仓位；如果止损空间大，你必须缩小仓位。永远是先确定止损位置，再反推仓位大小，而不是凭感觉下单。`, en: '' }
      },
      {
        id: 'm10-s3c',
        title: { zh: '非对称性：胜率与盈亏比 (Asymmetry)', en: 'Asymmetry: Win Rate vs R:R' },
        diagram: 'm10-asymmetry',
        bullets: {
          zh: [
            '为什么追求高盈亏比？因为非对称性优势',
            '1:1 盈亏比需要 50% 胜率才能保本',
            '1:3 盈亏比只需要 25% 胜率就能保本',
            '高盈亏比允许你“错很多次”，只要对一次就能覆盖亏损',
            '这就是为什么专业交易员宁愿错过，也不做盈亏比差的交易'
          ],
          en: [
            'Why aim for high R:R? The power of asymmetry',
            '1:1 R:R requires 50% win rate just to breakeven',
            '1:3 R:R requires only 25% win rate to breakeven',
            'High R:R allows you to be "wrong often" and still be profitable',
            'This is why pros skip bad R:R setups rather than forcing a trade'
          ]
        },
        script: { zh: `为什么我们要追求高盈亏比？因为这是非对称性的力量。如果你每笔交易能赚 3R，你只需要 25% 的胜率就能保本。这意味着你可以错很多次，只要对一次就能赚回来。这就是为什么我们宁愿错过，也不做 1比1 的交易。`, en: '' }
      },
      {
        id: 'm10-s3d',
        title: { zh: '回撤应对机制 (Drawdown Protocol)', en: 'Drawdown Protocol' },
        diagram: 'm10-drawdown',
        bullets: {
          zh: [
            '面对连续亏损，专业的做法是动态缩减风险',
            '例如：正常风险 1%；回撤达 5% 时，风险降至 0.5%；回撤达 10% 时，风险降至 0.25%',
            '效果：在数学上几乎不可能爆仓，强迫你在状态差时减少破坏',
            '活着，是交易的第一法则'
          ],
          en: [
            'When facing a losing streak, pros dynamically reduce risk',
            'Example: Normal risk 1%; At -5% DD, risk drops to 0.5%; At -10% DD, risk drops to 0.25%',
            'Effect: Mathematically impossible to blow the account; limits damage during bad streaks',
            'Survival is the first rule of trading'
          ]
        },
        script: { zh: `面对连续亏损怎么办？专业的做法是动态调整风险。比如回撤达到 5% 时，把每单风险从 1% 降到 0.5%。回撤 10% 时降到 0.25%。这样在数学上，你几乎不可能爆仓。活着，是交易的第一法则。`, en: '' }
      },
      {
        id: 'm10-s4',
        title: { zh: '真正的止损：不是固定点数，而是结构失效', en: 'True Stop Loss: Structural Invalidation, Not Fixed Pips' },
        diagram: 'm10-stop-loss',
        bullets: {
          zh: [
            '止损不是为了少亏，而是为了在“交易逻辑失效”时退出',
            '止损应该放在：你的交易 thesis 被证明错误的位置',
            '而不是“我能承受多少点”的位置，也不是“别人说 10 点就够”的位置',
            '好止损 = 正常噪音能活，真正失效会死',
            '烂止损 = 噪音都活不了，失效时却又舍不得认错'
          ],
          en: [
            'Stops aren\'t to lose less, but to exit when the "trade thesis is invalid"',
            'Stops belong where your thesis is proven wrong',
            'Not where "you can afford" or "someone said 10 pips is enough"',
            'Good Stop = Survives noise, dies on true invalidation',
            'Bad Stop = Dies to noise, refuses to admit wrong on invalidation'
          ]
        },
        script: { zh: `接下来讲第一支柱：止损。真正的止损，绝对不是固定设置 10个点或20个点。止损应该放在'你的交易逻辑被证明错误'的位置。好的止损，能扛过正常的市场噪音，但一旦逻辑失效，它会果断带你离场。`, en: '' }
      },
      {
        id: 'm10-s5',
        title: { zh: '3 类止损：先分清你到底在保护什么', en: '3 Types of Stops: Know What You Are Protecting' },
        diagram: 'm10-stop-types',
        bullets: {
          zh: [
            '1. 技术止损：放在最近执行结构之外 (如 FVG/OB 下方、sweep extreme 外)',
            '2. 结构止损：放在 market structure 关键失效位之外 (如 reclaim 再失守、range 边界重新被吞没)',
            '3. Thesis 止损：放在“整个交易叙事失效”的位置 (如押注 manipulation 完成，结果市场重新接受突破方向)',
            'Scalping 常用技术止损；Swing 更依赖结构与 thesis 止损'
          ],
          en: [
            '1. Technical Stop: Outside recent execution structure (below FVG/OB, outside sweep extreme)',
            '2. Structural Stop: Outside key market structure invalidation (reclaim lost, range boundary engulfed)',
            '3. Thesis Stop: Where the "entire narrative fails" (e.g., manipulation fails and market accepts breakout)',
            'Scalping uses Technical; Swing relies on Structural & Thesis stops'
          ]
        },
        script: { zh: `止损分为三类。技术止损放在执行结构（比如 FVG 或 OB）之外；结构止损放在关键的市场结构失效位；逻辑止损则是整个交易叙事被证伪的地方。做短线多用技术止损，做波段多用结构和逻辑止损。`, en: '' }
      },
      {
        id: 'm10-s6',
        title: { zh: '动态止损：什么时候该收，什么时候不该动', en: 'Dynamic Stops: When to Trail and When to Hold' },
        diagram: 'm10-dynamic-stop',
        bullets: {
          zh: [
            '动态止损不是“有浮盈就赶紧保本”，而是“市场已经给出新的失效信息”才调整',
            '可以移动：市场已完成明确结构推进、新的高/低点被确认、原 thesis 已部分兑现',
            '不该乱动：仅仅因为浮盈一点点想保本、市场还在正常 pullback 范围内、你只是情绪不舒服',
            '止损的移动，必须基于“信息更新”，不能基于“情绪波动”'
          ],
          en: [
            'Dynamic stops aren\'t "breakeven ASAP", but adjusting when "market gives new invalidation info"',
            'When to move: Clear structural progression, new H/L confirmed, thesis partially fulfilled',
            'When NOT to move: Just want breakeven on small profit, normal pullback, emotional discomfort',
            'Stop movement MUST be based on "information update", not "emotional swings"'
          ]
        },
        script: { zh: `入场后，止损不是死板的。我们需要动态止损。但请记住，移动止损的唯一理由是'市场给出了新的结构信息'，比如突破了前高前低。绝对不能因为你害怕利润回吐，或者仅仅为了'保本'而盲目移动止损。`, en: '' }
      },
      {
        id: 'm10-s7',
        title: { zh: '动态止损 4 法', en: '4 Methods of Dynamic Trailing' },
        diagram: 'm10-trailing-methods',
        bullets: {
          zh: [
            '1. 结构跟踪止损：跟随新形成的 HL/LH、reclaim/loss 位置移动 (适合 trend continuation)',
            '2. 执行区更新止损：新的 FVG/OB 成立后，把止损移到新无效位之外 (适合 confirmation entry)',
            '3. 目标完成后减仓+缩风险：第一流动性目标完成后，把剩余仓位止损收紧 (适合 reversal 到 target)',
            '4. 时间型止损收缩：预期 move 应该快速走，但长时间不走，可主动收紧 (适合 intraday model)'
          ],
          en: [
            '1. Structural Trailing: Trail behind new HL/LH, reclaim/loss (Trend continuation)',
            '2. Execution Zone Update: Move stop outside new FVG/OB invalidation (Confirmation entry)',
            '3. Target Hit + Risk Reduction: Tighten stop on runner after first liquidity target (Reversal to target)',
            '4. Time-Based Tightening: Expected fast move stalls, actively tighten (Intraday models)'
          ]
        },
        script: { zh: `这里有四种实用的动态止损方法。第一是跟随新形成的 HL 或 LH 移动；第二是随着新的执行区成立而更新；第三是到达第一目标位后收紧剩余仓位的止损；第四是时间型收缩，如果预期该爆发的行情迟迟不动，主动收紧风险。`, en: '' }
      },
      {
        id: 'm10-s8',
        title: { zh: '什么时候直接保本，什么时候绝对不能保本', en: 'When to Breakeven vs When NEVER to Breakeven' },
        diagram: 'm10-breakeven',
        bullets: {
          zh: [
            '保本不是美德，很多时候它只是让你系统性错过大盈亏比',
            '适合保本：第一关键目标已完成、市场完成一次明确 displacement、关键风险事件前',
            '不适合保本：刚进场不久还在正常波动、你的 entry model 本来就允许 deeper retest、结构尚未形成新的保护点',
            '“保本太早”其实是系统性亏损来源'
          ],
          en: [
            'Breakeven isn\'t a virtue; it often systematically robs you of big R:R',
            'Good for BE: First key target hit, clear displacement completed, before key risk events',
            'Bad for BE: Just entered/normal volatility, model allows deeper retest, no new structural protection',
            '"Premature Breakeven" is a source of systematic losses'
          ]
        },
        script: { zh: `关于'保本'，很多新手喜欢一有浮盈就推保本，这其实是系统性亏损的来源，因为你会被正常的波动扫出局，然后错过大行情。只有在完成第一目标、或者市场出现明确的 displacement 之后，才适合推保本。`, en: '' }
      },
      {
        id: 'm10-s9',
        title: { zh: '仓位分批：真正专业的持仓表达方式', en: 'Scaling: The Professional Way to Express Conviction' },
        diagram: 'm10-scaling',
        bullets: {
          zh: [
            '仓位不是只有“有”或“没有”，仓位应该表达你的确定性层级',
            '允许你先试探，再确认',
            '允许你在不同证据层级下注不同权重',
            '允许你同时兼顾：初始位置优势、确认后的加仓、风险控制、心理稳定',
            '分批仓位不是犹豫，是把不确定性拆开管理'
          ],
          en: [
            'Positions aren\'t binary; they should express your level of certainty',
            'Allows you to probe first, then confirm',
            'Allows different weights for different evidence levels',
            'Balances: Initial location edge, confirmation add-ons, risk control, psychology',
            'Scaling isn\'t hesitation; it\'s unbundling uncertainty'
          ]
        },
        script: { zh: `第二支柱：仓位分批。仓位不应该是 0 或 100，它应该表达你的确定性层级。分批建仓允许你先用小仓位试探，等市场给出确认信号后再加仓。这不是犹豫，而是把不确定性拆解开来，分步管理。`, en: '' }
      },
      {
        id: 'm10-s10',
        title: { zh: '最实用的 3 种分批建仓方式', en: '3 Practical Scaling-In Models' },
        diagram: 'm10-scaling-models',
        bullets: {
          zh: [
            '1. Probe → Confirm → Press：先小仓试探，看到 reclaim/displacement 后加，进入 commitment move 后再加 (适合 manipulation/reversal)',
            '2. Core + Add-on：先建立核心仓位，回踩高质量 execution zone 时加仓 (适合顺势 continuation)',
            '3. Two-Layer Entry：第一层在 zone edge，第二层在 deeper fill / midpoint / confirmation (适合 OB/FVG 精细化执行)'
          ],
          en: [
            '1. Probe → Confirm → Press: Small probe, add on reclaim/disp, press on commitment (Manipulation/Reversal)',
            '2. Core + Add-on: Build core, add on high-quality execution zone retests (Trend continuation)',
            '3. Two-Layer Entry: Layer 1 at zone edge, Layer 2 at deeper fill/midpoint/confirmation (OB/FVG refinement)'
          ]
        },
        script: { zh: `最实用的三种分批建仓模型：第一种是试探-确认-重仓，非常适合做反转或扫损模型；第二种是核心仓位加顺势加仓，适合趋势延续；第三种是双层入场，在订单块的边缘进一层，深回踩再进一层，用来优化均价。`, en: '' }
      },
      {
        id: 'm10-s11',
        title: { zh: '分批加仓和“补亏损”不是一回事', en: 'Scaling In vs "Averaging Down a Loser"' },
        diagram: 'm10-scaling-vs-averaging',
        bullets: {
          zh: [
            '加仓的前提，是 thesis 更强了；不是你被套了',
            '可以加仓：新证据出现、displacement 后回踩有效、reclaim 后 acceptance 更强、风险已被部分锁定',
            '绝对不能加仓：因为亏损想摊低成本、因为“不甘心”、市场没有提供新确认、原 thesis 已经变弱甚至失效'
          ],
          en: [
            'Add ONLY when the thesis gets stronger, not when you are trapped',
            'When to add: New evidence, valid retest after disp, stronger acceptance after reclaim, risk partially locked',
            'NEVER add: To average down cost, out of stubbornness, no new confirmation, thesis weakening/invalidated'
          ]
        },
        script: { zh: `这里必须强调：分批加仓和散户的'死扛补仓'有本质区别。加仓的前提是你的交易逻辑变得更强了，市场给了新的确认；而补亏损是因为你被套牢了，不甘心认输。永远不要在逻辑变弱时加仓！`, en: '' }
      },
      {
        id: 'm10-s12',
        title: { zh: '利润搬砖法：把浮盈变成现金流', en: 'Profit Extraction: Turning Paper Profits into Cash Flow' },
        diagram: 'm10-profit-extraction',
        bullets: {
          zh: [
            '不是一次性平仓，而是把市场给的利润一块一块搬回账户',
            '市场不会总给你完美顶部/底部',
            '一次性全平常常：提前下车，或吐回大量浮盈',
            '目标：先实现部分盈利，降低持仓心理压力，给 runner 留空间，在不牺牲系统稳定性的前提下，吃到大波段'
          ],
          en: [
            'Not an all-at-once exit, but moving profits from the market to your account piece by piece',
            'The market rarely gives you the perfect top/bottom',
            'All-or-nothing exits often lead to: leaving early, or giving back massive paper profits',
            'Goal: Realize partials, reduce psychology pressure, leave room for runners, catch big swings without sacrificing stability'
          ]
        },
        script: { zh: `第三支柱：利润提取，也就是利润搬砖法。市场很少会给你完美的逃顶或抄底机会。一次性全平，要么下车太早，要么眼睁睁看着巨额浮盈化为乌有。专业的做法是，像搬砖一样，把市场的钱分批搬进自己的账户。`, en: '' }
      },
      {
        id: 'm10-s13',
        title: { zh: '最实用的利润搬砖 3 段法', en: 'The 3-Stage Profit Extraction Method' },
        diagram: 'm10-extraction-stages',
        bullets: {
          zh: [
            '第 1 段：First Paycheck (平 30%-50%) - 到达第一个高概率 target (最近 liquidity pool / 1R-2R)。目的：把纸面利润变成已实现利润',
            '第 2 段：Structure Lock (平 20%-40%) - 市场完成关键结构推进后。目的：锁定核心盈利',
            '第 3 段：Runner (留 10%-30%) - 给扩展目标，用结构跟踪或 execution zone 更新来管理。目的：抓住少数大行情'
          ],
          en: [
            'Stage 1: First Paycheck (30-50%) - At first high-prob target (recent liquidity / 1-2R). Goal: Realize paper profits',
            'Stage 2: Structure Lock (20-40%) - After key structural progression. Goal: Lock core profits',
            'Stage 3: Runner (10-30%) - For extended targets, managed via structural trailing. Goal: Catch the big outliers'
          ]
        },
        script: { zh: `利润搬砖三段法：第一段叫 First Paycheck，在最近的高概率目标位平掉 30%到50%，把纸面富贵变成真金白银；第二段在结构推进后锁定核心利润；第三段留 10%到30% 的 Runner 仓位，去博弈尾部的大行情。`, en: '' }
      },
      {
        id: 'm10-s14',
        title: { zh: '利润搬砖的目标怎么定', en: 'How to Set Profit Extraction Targets' },
        diagram: 'm10-extraction-targets',
        bullets: {
          zh: [
            '不是看到浮盈就搬砖，而是在“市场最可能给出反应”的地方搬砖',
            '目标优先级：最近显性 liquidity pool > 区间对侧边界 > HTF old high/low > measured move > session target',
            '高级原则：第一段搬砖优先保守；第二段搬砖看结构进展；Runner 交给市场决定，而不是交给幻想决定'
          ],
          en: [
            'Don\'t extract just because you see green; extract where "market is most likely to react"',
            'Target Priority: Recent obvious liquidity > Opposite range boundary > HTF old H/L > Measured move > Session target',
            'Pro Principles: 1st extraction is conservative; 2nd depends on structure; Runner is decided by the market, not fantasy'
          ]
        },
        script: { zh: `搬砖的目标怎么定？不要一看到绿色浮盈就平仓，要在'市场最可能发生反应'的地方平仓。比如最近的流动性池、区间的对侧边界、或者更高时间级别的高低点。第一目标保守一点，Runner 目标可以激进一点。`, en: '' }
      },
      {
        id: 'm10-s15',
        title: { zh: '交易管理：4 个管理决策点', en: 'Trade Management: 4 Decision Points' },
        diagram: 'm10-management-decisions',
        bullets: {
          zh: [
            '持仓之后，你真正要做的不是盯盘，而是做 4 个管理决策：',
            '1. Trade is working? 市场是否按预期推进？',
            '2. Risk can be reduced? 是否有新信息支持收紧风险？',
            '3. Profit should be extracted? 是否到达高概率反应区？',
            '4. Thesis still valid? 原交易逻辑是否还成立？'
          ],
          en: [
            'After entering, don\'t just stare at the chart. Make 4 decisions:',
            '1. Trade is working? Is the market progressing as expected?',
            '2. Risk can be reduced? Is there new info to tighten risk?',
            '3. Profit should be extracted? Reached a high-prob reaction zone?',
            '4. Thesis still valid? Is the original logic still intact?'
          ]
        },
        script: { zh: `持仓过程中的管理，其实就是不断问自己四个问题：交易还在按预期推进吗？有新信息支持我减小风险吗？到高概率反应区该提取利润了吗？我最初的交易逻辑还成立吗？`, en: '' }
      },
      {
        id: 'm10-s16',
        title: { zh: '什么是“交易在工作中”', en: 'What Does "Trade is Working" Mean?' },
        diagram: 'm10-trade-working',
        bullets: {
          zh: [
            '好的交易通常不会让你太怀疑它自己',
            '在工作中：入场后较快表现出预期方向、pullback 质量健康、displacement 保持、关键结构没有立刻失守',
            '不在工作中：长时间卡住、反复穿越执行区、该走不走、displacement 很快被吞没、结构变差',
            '不是所有亏损都该等止损；有些交易在止损之前，就已经失去“继续持有的资格”'
          ],
          en: [
            'Good trades rarely make you doubt them too much',
            'Working: Moves in expected direction quickly, healthy pullbacks, disp holds, key structure intact',
            'Not Working: Stuck for long, chops through execution zone, fails to move, disp engulfed quickly',
            'Not all losses should hit the stop; some trades lose the "right to be held" before the stop is hit'
          ]
        },
        script: { zh: `什么是'交易在工作中'？好的交易通常很快就会证明自己，会有健康的 pullback 和持续的 displacement。如果一笔交易长时间卡住，反复穿越你的入场区，那它就已经不在'工作状态'了。`, en: '' }
      },
      {
        id: 'm10-s17',
        title: { zh: '主动退出：什么时候该在止损前先走', en: 'Active Exit: When to Leave Before the Stop' },
        diagram: 'm10-active-exit',
        bullets: {
          zh: [
            '有些交易虽然还没打止损，但已经不值得继续持有',
            '可主动退出：thesis 核心假设失效、时间型失效(该走不走)、反向 displacement 出现、关键 acceptance 失去',
            '注意：主动退出不是情绪化砍单，而是基于新的市场信息做再评估'
          ],
          en: [
            'Some trades aren\'t worth holding even if the stop isn\'t hit yet',
            'When to exit: Core thesis fails, Time-based failure (stalls), Opposite displacement appears, Key acceptance lost',
            'Note: Active exit is NOT emotional cutting; it is re-evaluation based on NEW market info'
          ]
        },
        script: { zh: `这就引出了'主动离场'。不是所有的亏损都必须等到打止损。如果核心逻辑已经失效，或者时间上该走不走，出现了反向的强劲动能，你应该在打止损前主动离场。这不是情绪化砍单，而是基于新信息的理性决策。`, en: '' }
      },
      {
        id: 'm10-s18',
        title: { zh: 'A / B / C setup 风险分级', en: 'A / B / C Setup Risk Grading' },
        diagram: 'm10-risk-grading',
        bullets: {
          zh: [
            '不是每一笔交易都配拿同样的风险权重',
            'A+ setup: 6/8 或 7/8 以上证据叠加 (HTF + liquidity + displacement + timing 共振) -> 标准或略高风险',
            'B setup: 5/8 左右，逻辑可做，但非最优 -> 中等或轻仓',
            'C setup: 证据不足 -> 只适合观察，通常不做',
            '风险不是平均分配给每一单，风险应该分配给最有优势的机会'
          ],
          en: [
            'Not every trade deserves the same risk weight',
            'A+ Setup: 6/8+ evidence confluence (HTF+Liq+Disp+Timing) -> Standard or slightly higher risk',
            'B Setup: ~5/8 evidence, logical but not optimal -> Medium or light size',
            'C Setup: Lacking evidence -> Observe only, usually no trade',
            'Risk isn\'t distributed equally; it\'s allocated to the highest edge opportunities'
          ]
        },
        script: { zh: `最后，我们要对交易机会进行风险分级。A+ 级别的 Setup，各种条件共振，值得你用标准的 1R 甚至略高的风险去博弈；B 级 Setup 缺少一些确认，只能用半仓；C 级直接放弃。把子弹留给最好的猎物。`, en: '' }
      },
      {
        id: 'm10-s19',
        title: { zh: 'Module 10 核心结论', en: 'Module 10 Core Conclusion' },
        diagram: 'm10-overview',
        bullets: {
          zh: [
            '风控不是“每单 1%”这么简单，它包含：失效定义、仓位表达、动态止损、利润提取',
            '止损应基于结构失效，而不是情绪舒适度',
            '动态止损必须基于新信息，而不是害怕回吐',
            '分批建仓可以表达确定性层级，利润搬砖法能把浮盈稳定变成已实现收益',
            '风控的目标不是“不亏”，而是让亏损可控，让盈利可扩张',
            '交易里真正的高级，不是看图更玄，而是把亏损设计得很专业，把盈利提取得很系统'
          ],
          en: [
            'Risk isn\'t just "1%"; it\'s Invalidation, Sizing, Dynamic Stops, and Extraction',
            'Stops are based on structural invalidation, not emotional comfort',
            'Dynamic stops require new info, not fear of giving back profits',
            'Scaling expresses certainty; Profit extraction turns paper gains into realized cash',
            'The goal isn\'t "no losses", but controlled losses and expandable profits',
            'True mastery isn\'t complex charting; it\'s professional loss design and systematic profit extraction'
          ]
        },
        script: { zh: `总结一下第10模块：风控是一个完整的系统。止损基于结构，移动止损基于新信息，仓位分批表达确定性，利润搬砖法锁定收益。交易的高级境界，就是把亏损设计得极其专业，把盈利提取得极其系统。我们下一章，交易心理学见！`, en: '' }
      }
    ]
  },
  { 
    id: 'm11', 
    title: { zh: 'Module 11: Psychological Sequence', en: 'Module 11: Psychological Sequence' }, 
    slides: [
      {
        id: 'm11-s1',
        title: {
          zh: 'Module 11 — Psychological Sequence\\n机构在每轮行情中故意制造的 5 个散户情绪阶段',
          en: 'Module 11 — Psychological Sequence\\nThe 5 Emotional Stages Institutions Intentionally Create'
        },
        diagram: 'm11-intro',
        bullets: {
          zh: [
            '真正的市场操控，不只是扫流动性，更是设计情绪路径',
            '不是先有情绪再有价格，而是价格路径本身就在制造情绪',
            '市场不是随机让散户情绪失控',
            '市场往往是在“最需要流动性的时候”，故意把情绪推到最极端'
          ],
          en: [
            'True market manipulation is not just sweeping liquidity, but designing emotional paths',
            'Price paths create emotions, not the other way around',
            'The market does not randomly make retail traders lose control',
            'The market intentionally pushes emotions to extremes exactly when it needs liquidity the most'
          ]
        },
        script: {
          zh: '欢迎来到模块11。市场不是随机让散户情绪失控，市场往往是在“最需要流动性的时候”，故意把情绪推到最极端。这句话能一下把“心理学”拉回交易逻辑。真正的市场操控，不只是扫流动性，更是设计情绪路径。',
          en: "Welcome to Module 11. The market doesn't randomly make retail traders lose control of their emotions. It intentionally pushes emotions to the extreme exactly when it needs liquidity the most. This module shifts our focus from just price action to participant behavior."
        }
      },
      {
        id: 'm11-s2',
        title: {
          zh: '为什么要学情绪序列？\\n专业交易者不只看图形，还看“下一波情绪最可能在哪里被触发”',
          en: 'Why Study Emotional Sequences?\\nProfessionals look for where the next wave of emotion will be triggered'
        },
        diagram: 'm11-concept',
        bullets: {
          zh: [
            '情绪是可预测的，群体反应是可利用的',
            '大部分止损、追价、扛单、爆仓，都不是随机发生',
            '它们常常在固定类型的位置集中出现',
            '爆仓往往是结构性事件，不是个体不幸',
            '流动性从来不只是订单的堆积，它更是人群情绪在图表上的集体落点'
          ],
          en: [
            'Emotions are predictable, crowd reactions are exploitable',
            'Most stop-outs, chasing, holding losing trades, and liquidations don\'t happen randomly',
            'They cluster at specific locations',
            'Liquidations are structural events, not individual misfortunes',
            'Liquidity is never just an accumulation of orders; it\'s the collective footprint of crowd emotion on the chart'
          ]
        },
        script: {
          zh: '为什么要学情绪序列？因为大部分止损、追价、扛单、爆仓，都不是随机发生，它们常常在固定类型的位置集中出现。这意味着情绪是可预测的，群体反应是可利用的。流动性从来不只是订单的堆积，它更是人群情绪在图表上的集体落点。我们要把“心理”这件事专业化、交易化。',
          en: "Why study emotional sequences? Because most stop-outs, chasing, holding losing trades, and liquidations don't happen randomly. They cluster at specific locations. Liquidity is never just an accumulation of orders; it's the collective footprint of crowd emotion on the chart."
        }
      },
      {
        id: 'm11-s3',
        title: {
          zh: '情绪序列和价格序列是一体的\\n价格怎么走，决定情绪怎么演化；情绪怎么演化，又反过来决定流动性怎么堆积',
          en: 'Emotional Sequence and Price Sequence are One\\nPrice movement creates expectations, which build liquidity'
        },
        diagram: 'm11-chain',
        bullets: {
          zh: [
            '情绪与流动性的转化链条',
            '价格推动 → 形成预期 → 预期一致 → 仓位集中',
            '仓位集中 → 流动性堆积 → 更容易被利用',
            '被利用后 → 情绪崩塌或 FOMO 爆发 → 推动下一段 move'
          ],
          en: [
            'The Conversion Chain of Emotion and Liquidity',
            'Price movement → Forms expectations → Uniform expectations → Concentrated positioning',
            'Concentrated positioning → Liquidity builds up → Easier to exploit',
            'Exploitation → Emotional collapse or FOMO → Fuels the next move'
          ]
        },
        script: {
          zh: '价格怎么走，决定情绪怎么演化；情绪怎么演化，又反过来决定流动性怎么堆积。价格推动形成预期，预期一致导致仓位集中，进而形成流动性堆积。被利用后，情绪崩塌或FOMO爆发，从而推动下一段行情。这是连接前面所有模块和本章的桥梁。',
          en: "Price sequence and emotional sequence are one. Price movement creates expectations. Uniform expectations lead to concentrated positioning. Concentrated positioning builds liquidity. Built liquidity is easily exploited. Exploitation leads to emotional collapse or FOMO, which in turn fuels the next move."
        }
      },
      {
        id: 'm11-s4',
        title: {
          zh: '五个情绪阶段总览\\n每一轮高质量行情里，最常被制造出来的 5 个散户情绪阶段',
          en: 'Overview of the 5 Emotional Stages\\nThe 5 stages most commonly engineered in high-quality moves'
        },
        diagram: 'm11-emotion-cycle',
        bullets: {
          zh: [
            '机构最常利用的 5 个散户情绪阶段',
            '1. Curiosity & Recognition（注意 / 识别阶段）',
            '2. Belief & Commitment（相信 / 建仓阶段）',
            '3. Stress & Rationalization（压力 / 扛单合理化阶段）',
            '4. Panic & Capitulation（恐慌 / 认输爆仓阶段）',
            '5. Revenge & Misread Reversal（报复 / 错误反手阶段）',
            '市场最擅长的，不是让你看不懂，而是让你一步一步“越看越懂”，直到你重仓死在最差位置'
          ],
          en: [
            'The 5 Retail Emotional Stages Most Exploited by Institutions',
            '1. Curiosity & Recognition',
            '2. Belief & Commitment',
            '3. Stress & Rationalization',
            '4. Panic & Capitulation',
            '5. Revenge & Misread Reversal',
            'The market\'s greatest trick isn\'t being incomprehensible; it\'s making you feel like you understand it more and more, right up until you go heavily into a position at the worst possible spot'
          ]
        },
        script: {
          zh: '每一轮高质量行情里，最常被制造出来的 5 个散户情绪阶段：注意、相信、压力、恐慌、报复。市场最擅长的，不是让你看不懂，而是让你一步一步“越看越懂”，直到你重仓死在最差位置。这五个阶段构成了完整的流动性收割循环。',
          en: "Here are the 5 emotional stages retail traders go through: Curiosity, Belief, Stress, Panic, and Revenge. The market's greatest trick isn't being incomprehensible; it's making you feel like you understand it more and more, right up until you go heavily into a position at the worst possible spot."
        }
      },
      {
        id: 'm11-s5',
        title: {
          zh: 'Stage 1: Curiosity & Recognition\\n注意 / 识别阶段：市场先让你“看到一个很合理的故事”',
          en: 'Stage 1: Curiosity & Recognition\\nThe market first makes you "see a very reasonable story"'
        },
        diagram: 'm11-stage1',
        bullets: {
          zh: [
            '散户在想什么？',
            '“这里是不是一个不错的 setup？”',
            '“趋势好像很清楚”，“这个 OB / FVG / 支撑位挺漂亮”',
            '“如果回踩这里，应该可以做吧？”',
            '市场在做什么？',
            '搭建可识别结构，创造 textbook narrative',
            '让更多人看到同一个方向，积累潜在的参与者（未来的流动性）'
          ],
          en: [
            'What are retail traders thinking?',
            '"Is this a good setup?"',
            '"The trend looks clear", "This OB / FVG / Support looks nice"',
            '"If it pulls back here, I should take it, right?"',
            'What is the market doing?',
            'Building recognizable structures, creating textbook narratives',
            'Making more people see the same direction, accumulating potential participants (future liquidity)'
          ]
        },
        script: {
          zh: '第一阶段，注意与识别。散户开始注意到一个看似完美的setup，比如一个漂亮的支撑位或FVG。市场此时正在搭建可识别结构，创造教科书般的叙事，目的是让更多人看到同一个方向，积累潜在的参与者，也就是未来的流动性。',
          en: "Stage 1: Curiosity & Recognition. Retail traders start noticing a seemingly perfect setup, like a nice support level or FVG. The market is building recognizable structures and creating textbook narratives to make more people see the same direction, accumulating potential participants—future liquidity."
        }
      },
      {
        id: 'm11-s6',
        title: {
          zh: 'Stage 2: Belief & Commitment\\n相信 / 建仓阶段：给你一点甜头，让你确认“我是对的”',
          en: 'Stage 2: Belief & Commitment\\nGiving you a little taste to confirm "I am right"'
        },
        diagram: 'm11-stage2',
        bullets: {
          zh: [
            '散户在想什么？',
            '“进场了！果然涨了！”',
            '“加仓！不能错过这波大行情。”',
            '“止损设在结构下方，很安全。”',
            '市场在做什么？',
            '提供初步的顺向移动 (Initial Reaction)',
            '确认散户的偏见，诱导他们投入真实的资金和止损订单',
            '在结构点外侧（上方/下方）形成密集的 Stop Loss 资金池'
          ],
          en: [
            'What are retail traders thinking?',
            '"I\'m in! It\'s going up as expected!"',
            '"Adding to my position! Can\'t miss this big move."',
            '"Stop loss placed below structure, very safe."',
            'What is the market doing?',
            'Providing an initial favorable move (Initial Reaction)',
            'Confirming retail bias, inducing them to commit real capital and stop-loss orders',
            'Forming dense Stop Loss pools outside structural points (above/below)'
          ]
        },
        script: {
          zh: '第二阶段，相信与建仓。散户进场后，市场会给一点初步的顺向移动，让散户觉得“我是对的”，甚至加仓。止损被安全地设在结构下方。市场这样做的目的是确认散户的偏见，诱导他们投入真实的资金，并在结构点外侧形成密集的止损资金池。',
          en: "Stage 2: Belief & Commitment. After retail enters, the market provides an initial favorable move, making them feel 'I am right' and prompting them to add to their positions. Stops are safely placed below structure. The market's goal is to confirm their bias, induce real capital commitment, and form dense stop-loss pools outside structural points."
        }
      },
      {
        id: 'm11-s7',
        title: {
          zh: 'Stage 3: Stress & Rationalization\\n压力 / 扛单合理化阶段：行情停滞或反向，开始自我欺骗',
          en: 'Stage 3: Stress & Rationalization\\nTrend stalls or reverses, self-deception begins'
        },
        diagram: 'm11-stage3',
        bullets: {
          zh: [
            '散户在想什么？',
            '“只是正常回调，大趋势还在。”',
            '“还没扫到我的止损，再等等。”',
            '“可能只是洗盘，不能被洗下车。”',
            '市场在做什么？',
            '价格开始缓慢或突然反向，逼近散户的止损区',
            '制造不确定性，测试持有者的信念',
            '将那些“不坚定的筹码”提前洗出，同时让“死扛的筹码”越陷越深'
          ],
          en: [
            'What are retail traders thinking?',
            '"Just a normal pullback, the macro trend is still intact."',
            '"Hasn\'t hit my stop yet, wait a bit longer."',
            '"Probably just a shakeout, can\'t get shaken out."',
            'What is the market doing?',
            'Price starts slowly or suddenly reversing, approaching retail stop-loss zones',
            'Creating uncertainty, testing holders\' conviction',
            'Washing out "weak hands" early, while making "diamond hands" sink deeper'
          ]
        },
        script: {
          zh: '第三阶段，压力与合理化。行情开始停滞或反向，逼近止损区。散户开始自我欺骗，认为这只是正常回调或洗盘。市场此时在制造不确定性，测试持有者的信念，洗出不坚定的筹码，同时让死扛的筹码越陷越深。',
          en: "Stage 3: Stress & Rationalization. The trend stalls or reverses, approaching stop-loss zones. Retail traders start rationalizing, thinking it's just a normal pullback or shakeout. The market is creating uncertainty, testing conviction, washing out weak hands, and making stubborn holders sink deeper."
        }
      },
      {
        id: 'm11-s8',
        title: {
          zh: 'Stage 4: Panic & Capitulation\\n恐慌 / 认输爆仓阶段：流动性被无情收割',
          en: 'Stage 4: Panic & Capitulation\\nLiquidity is ruthlessly harvested'
        },
        diagram: 'm11-stage4',
        bullets: {
          zh: [
            '散户在想什么？',
            '“完了，破位了！”',
            '“止损被打掉了 / 爆仓了。”',
            '“这市场太恶心了，我认输。”',
            '市场在做什么？',
            '价格加速刺穿关键结构（Sweep）',
            '触发大量 Stop Loss 订单（市价单），为机构的真实方向提供充足的对手盘',
            '完成流动性获取（Liquidity Grab）'
          ],
          en: [
            'What are retail traders thinking?',
            '"It\'s over, support broke!"',
            '"Stop loss hit / Liquidated."',
            '"This market is disgusting, I give up."',
            'What is the market doing?',
            'Price accelerates through key structures (Sweep)',
            'Triggering massive Stop Loss orders (market orders), providing ample counter-party liquidity for the institution\'s true direction',
            'Completing the Liquidity Grab'
          ]
        },
        script: {
          zh: '第四阶段，恐慌与认输。价格加速刺穿关键结构，触发大量止损单或爆仓。散户绝望认输。市场此时正在完成流动性获取，散户的止损市价单为机构的真实方向提供了充足的对手盘。',
          en: "Stage 4: Panic & Capitulation. Price accelerates through key structures, triggering massive stop-loss orders or liquidations. Retail traders despair and give up. The market is completing its liquidity grab; retail stop-market orders provide ample counter-party liquidity for the institution's true direction."
        }
      },
      {
        id: 'm11-s9',
        title: {
          zh: 'Stage 5: Revenge & Misread Reversal\\n报复 / 错误反手阶段：成为下一段行情的燃料',
          en: 'Stage 5: Revenge & Misread Reversal\\nBecoming fuel for the next move'
        },
        diagram: 'm11-stage5',
        bullets: {
          zh: [
            '散户在想什么？',
            '“既然跌破了，那肯定是空头趋势了，追空！”',
            '“我要把刚才亏的赚回来。”',
            '市场在做什么？',
            '机构在拿到流动性后，迅速向真实方向反转（Displacement）',
            '散户在最低点追空，再次被套',
            '散户的新止损（空头止损）又成了推动价格上涨的燃料'
          ],
          en: [
            'What are retail traders thinking?',
            '"Since it broke down, it must be a bearish trend, short it!"',
            '"I need to make back what I just lost."',
            'What is the market doing?',
            'After grabbing liquidity, institutions rapidly reverse in the true direction (Displacement)',
            'Retail shorts at the absolute low, getting trapped again',
            'Retail\'s new stop losses (short stops) become fuel to push the price higher'
          ]
        },
        script: {
          zh: '第五阶段，报复与错误反手。散户在止损后，看到价格突破，误以为趋势反转，于是追空，试图回本。但机构在拿到流动性后迅速反转。散户在最低点追空再次被套，他们的新止损又成了推动价格上涨的燃料。',
          en: "Stage 5: Revenge & Misread Reversal. After getting stopped out, retail sees the breakdown and assumes a trend reversal, shorting to make their money back. But institutions, having grabbed liquidity, rapidly reverse. Retail gets trapped shorting the low, and their new stop losses become fuel for the upward move."
        }
      },
      {
        id: 'm11-s10',
        title: {
          zh: 'Case Study 1: 亚盘诱导与伦/纽盘收割\\n(Asia Session Inducement & London/NY Sweep)',
          en: 'Case Study 1: Asia Session Inducement & London/NY Sweep'
        },
        diagram: 'm11-case1',
        bullets: {
          zh: [
            'Stage 1 (Curiosity): 亚盘缓慢上涨，形成明显的支撑趋势线。',
            'Stage 2 (Belief): 散户在趋势线做多，止损放在亚盘低点（Asia Low）下方。',
            'Stage 3 (Stress): 伦敦盘开盘，价格开始下跌，逼近趋势线。',
            'Stage 4 (Panic): 价格加速跌破趋势线和 Asia Low，扫掉多头止损。',
            'Stage 5 (Revenge): 散户看到破位开始追空，纽约盘迅速反转向上，空头被套。'
          ],
          en: [
            'Stage 1 (Curiosity): Asia session slowly grinds up, forming a clear support trendline.',
            'Stage 2 (Belief): Retail buys the trendline, placing stops below Asia Low.',
            'Stage 3 (Stress): London open, price starts dropping, approaching the trendline.',
            'Stage 4 (Panic): Price accelerates below the trendline and Asia Low, sweeping long stops.',
            'Stage 5 (Revenge): Retail sees the breakdown and chases shorts. NY session rapidly reverses upwards, trapping shorts.'
          ]
        },
        script: {
          zh: '案例1：亚盘诱导与伦纽盘收割。亚盘缓慢上涨形成趋势线（Stage 1 & 2），散户做多。伦敦盘开盘下跌（Stage 3），随后加速跌破亚盘低点扫损（Stage 4）。散户追空，纽约盘迅速反转向上，空头被套（Stage 5）。这是一个经典的时间维度的情绪序列。',
          en: "Case Study 1: Asia Inducement & London/NY Sweep. Asia grinds up forming a trendline (Stages 1 & 2), retail buys. London opens and drops (Stage 3), then accelerates below Asia Low to sweep stops (Stage 4). Retail chases shorts, and NY rapidly reverses up, trapping them (Stage 5). A classic time-based emotional sequence."
        }
      },
      {
        id: 'm11-s11',
        title: {
          zh: 'Case Study 2: 假突破与 BPR 陷阱\\n(Fake Breakout & BPR Trap)',
          en: 'Case Study 2: Fake Breakout & BPR Trap'
        },
        diagram: 'm11-case2',
        bullets: {
          zh: [
            'Stage 1 & 2: 价格在一个区间震荡，突然向上突破区间高点，散户追多。',
            'Stage 3: 突破后没有延续，价格停滞。',
            'Stage 4: 一根大阴线砸回区间内，多头止损被扫。',
            'Stage 5: 散户认为突破失败，反手做空。但价格回踩刚才形成的大阴线（BPR）后，再次向上突破，空头爆仓。'
          ],
          en: [
            'Stage 1 & 2: Price ranges, then suddenly breaks above the range high. Retail chases longs.',
            'Stage 3: No continuation after the breakout, price stalls.',
            'Stage 4: A large bearish candle dumps back into the range, sweeping long stops.',
            'Stage 5: Retail assumes failed breakout and flips short. But price retraces to the large bearish candle (BPR) and breaks out upwards again, liquidating shorts.'
          ]
        },
        script: {
          zh: '案例2：假突破与BPR陷阱。价格突破区间高点，散户追多（Stage 1 & 2）。突破停滞（Stage 3），随后大阴线砸回区间扫损（Stage 4）。散户反手做空，但价格回踩BPR后再次向上突破，空头爆仓（Stage 5）。',
          en: "Case Study 2: Fake Breakout & BPR Trap. Price breaks range high, retail chases longs (Stages 1 & 2). Breakout stalls (Stage 3), then a large bearish candle dumps back in, sweeping stops (Stage 4). Retail flips short, but price retraces to the BPR and breaks out upwards again, liquidating shorts (Stage 5)."
        }
      },
      {
        id: 'm11-s12',
        title: {
          zh: '如何利用情绪序列交易？\\n从“受害者”变成“捕猎者”',
          en: 'How to Trade the Emotional Sequence?\\nFrom "Victim" to "Predator"'
        },
        diagram: 'm11-predator',
        bullets: {
          zh: [
            '不要在 Stage 1 & 2 (形成期) 过早入场，那是给机构提供流动性。',
            '耐心等待 Stage 4 (Panic) 的发生，即 Liquidity Sweep。',
            '在 Stage 5 (Revenge) 机构反转时，寻找 LTF 的 MSS 和 FVG 进场。',
            '你的入场点，应该是散户最绝望的止损点，或者是他们错误反手的起点。'
          ],
          en: [
            'Do not enter too early in Stages 1 & 2 (Formation); you are providing liquidity to institutions.',
            'Patiently wait for Stage 4 (Panic) to occur, i.e., the Liquidity Sweep.',
            'Enter during Stage 5 (Revenge) when institutions reverse, looking for LTF MSS and FVG.',
            'Your entry point should be retail\'s most desperate stop-loss point, or the start of their misread reversal.'
          ]
        },
        script: {
          zh: '如何利用情绪序列？不要在形成期过早入场，那是给机构提供流动性。耐心等待恐慌阶段的流动性扫取。在机构反转时，寻找低时间级别的结构转变和FVG进场。你的入场点，应该是散户最绝望的止损点，或者是他们错误反手的起点。',
          en: "How to trade this? Don't enter early in Stages 1 & 2; you're just providing liquidity. Wait patiently for Stage 4 (Panic) and the liquidity sweep. Enter during Stage 5 when institutions reverse, looking for LTF MSS and FVG. Your entry point should be retail's most desperate stop-loss point, or where they wrongly flip their bias."
        }
      },
      {
        id: 'm11-s13',
        title: {
          zh: '情绪序列与 Wyckoff 的结合\\n(Emotional Sequence & Wyckoff)',
          en: 'Emotional Sequence & Wyckoff'
        },
        diagram: 'm11-wyckoff',
        bullets: {
          zh: [
            'Stage 1 & 2 (Curiosity & Belief) = Wyckoff 的 Phase A & B (建立交易区间，诱导方向)。',
            'Stage 3 (Stress) = Phase C 的前奏。',
            'Stage 4 (Panic) = Phase C 的 Spring / Upthrust (扫取流动性，终极恐慌)。',
            'Stage 5 (Revenge) = Phase D & E (真正的趋势爆发，散户踏空或做反)。'
          ],
          en: [
            'Stage 1 & 2 (Curiosity & Belief) = Wyckoff Phase A & B (Establishing TR, inducing direction).',
            'Stage 3 (Stress) = Prelude to Phase C.',
            'Stage 4 (Panic) = Wyckoff Phase C Spring / Upthrust (Liquidity sweep, ultimate panic).',
            'Stage 5 (Revenge) = Wyckoff Phase D & E (True trend breakout, retail misses out or trades against it).'
          ]
        },
        script: {
          zh: '情绪序列与威科夫理论完美契合。阶段1和2对应威科夫的阶段A和B，建立区间并诱导方向。阶段3是阶段C的前奏。阶段4的恐慌就是阶段C的Spring或Upthrust，扫取流动性。阶段5的报复对应阶段D和E，真正的趋势爆发，散户踏空或做反。',
          en: "The emotional sequence aligns perfectly with Wyckoff. Stages 1 & 2 correspond to Wyckoff Phases A & B, establishing the range and inducing bias. Stage 3 is the prelude to Phase C. Stage 4 (Panic) is the Phase C Spring or Upthrust, sweeping liquidity. Stage 5 corresponds to Phases D & E, the true trend breakout where retail misses out or trades against it."
        }
      },
      {
        id: 'm11-s14',
        title: {
          zh: '情绪序列与 SMC 的结合\\n(Emotional Sequence & SMC)',
          en: 'Emotional Sequence & SMC'
        },
        diagram: 'm11-smc',
        bullets: {
          zh: [
            'Stage 1 & 2 = Inducement (诱导) / Engineering Liquidity (构建流动性)。',
            'Stage 4 = Liquidity Sweep (扫取流动性) / Mitigation (缓解)。',
            'Stage 5 = Market Structure Shift (MSS) / Displacement (破坏) / FVG 形成。',
            'SMC 的核心，就是等待 Stage 4 完成，在 Stage 5 进场。'
          ],
          en: [
            'Stage 1 & 2 = Inducement / Engineering Liquidity.',
            'Stage 4 = Liquidity Sweep / Mitigation.',
            'Stage 5 = Market Structure Shift (MSS) / Displacement / FVG formation.',
            'The core of SMC is waiting for Stage 4 to complete and entering during Stage 5.'
          ]
        },
        script: {
          zh: '情绪序列与SMC也是相通的。阶段1和2就是Inducement（诱导）或构建流动性。阶段4就是Liquidity Sweep（扫取流动性）。阶段5就是MSS、Displacement和FVG的形成。SMC的核心，就是等待阶段4完成，在阶段5进场。',
          en: "The emotional sequence also maps to SMC. Stages 1 & 2 are Inducement and Engineering Liquidity. Stage 4 is the Liquidity Sweep. Stage 5 is the Market Structure Shift, Displacement, and FVG formation. The core of SMC is waiting for Stage 4 to complete and entering during Stage 5."
        }
      },
      {
        id: 'm11-s15',
        title: {
          zh: '实战检查清单 (Checklist)\\n在扣动扳机前，问自己这几个问题',
          en: 'Practical Checklist\\nAsk yourself these questions before pulling the trigger'
        },
        diagram: 'm11-checklist',
        bullets: {
          zh: [
            '1. 现在的行情处于情绪序列的哪一个阶段？',
            '2. 散户的止损池（Liquidity Pool）在哪里？',
            '3. 市场是否已经完成了 Stage 4 (Panic / Sweep)？',
            '4. 我现在的入场，是在给机构提供流动性，还是在跟随机构利用流动性？',
            '5. 如果我在这里做多，谁在卖给我？（他们是被迫止损的空头吗？）'
          ],
          en: [
            '1. Which emotional stage is the current market in?',
            '2. Where is the retail Liquidity Pool?',
            '3. Has the market completed Stage 4 (Panic / Sweep)?',
            '4. Is my entry providing liquidity to institutions, or following them in exploiting it?',
            '5. If I go long here, who is selling to me? (Are they forced short stop-outs?)'
          ]
        },
        script: {
          zh: '实战检查清单：在扣动扳机前，问自己：现在处于哪个情绪阶段？散户的止损池在哪里？市场是否已经完成了扫取？我现在的入场，是在给机构提供流动性，还是在跟随机构？如果我做多，谁在卖给我？',
          en: "Practical Checklist: Before pulling the trigger, ask yourself: Which emotional stage are we in? Where is the retail liquidity pool? Has Stage 4 (Sweep) completed? Is my entry providing liquidity, or following institutions? If I go long, who is selling to me?"
        }
      },
      {
        id: 'm11-s16',
        title: {
          zh: '总结：高级交易者的视角\\n(Summary: The Advanced Trader\'s Perspective)',
          en: 'Summary: The Advanced Trader\'s Perspective'
        },
        diagram: 'm11-summary',
        bullets: {
          zh: [
            '不要只看 K 线的红绿，要看 K 线背后的人性。',
            '流动性是市场的燃料，而情绪是制造燃料的机器。',
            '理解了情绪序列，你就能提前预判流动性扫取的位置。',
            '做交易，就是做“少数派”：在别人贪婪时等待，在别人恐慌时进场，在别人报复时获利。'
          ],
          en: [
            'Don\'t just look at red and green candles; look at the human nature behind them.',
            'Liquidity is the market\'s fuel, and emotion is the machine that creates it.',
            'Understanding the emotional sequence allows you to anticipate liquidity sweeps.',
            'Trading is about being the "minority": wait when others are greedy, enter when others panic, profit when others seek revenge.'
          ]
        },
        script: {
          zh: '总结一下，高级交易者不只看K线，更看背后的人性。流动性是燃料，情绪是制造燃料的机器。理解了情绪序列，你就能提前预判流动性扫取的位置。做交易，就是做少数派：在别人贪婪时等待，在别人恐慌时进场，在别人报复时获利。',
          en: "To summarize, advanced traders look beyond candles to the human nature behind them. Liquidity is fuel, emotion creates it. Understanding this sequence lets you anticipate sweeps. Trading is being the minority: wait during greed, enter during panic, profit during revenge."
        }
      }
    ]
  }
];
