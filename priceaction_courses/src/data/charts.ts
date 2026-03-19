import { ChartAnnotation } from '../types';
import { c } from './common';

export const obData = [
  c(1, 105, 110, 102, 108),
  c(2, 108, 109, 98, 100), // Sell-side liquidity sweep
  c(3, 100, 112, 99, 110), // Bullish displacement, MS shift
  c(4, 110, 115, 108, 113), 
  c(5, 113, 114, 103, 104), // Retest OB (which is around candle 2)
  c(6, 104, 118, 103, 116), // Continuation
  c(7, 116, 122, 115, 120),
];
export const obAnn: ChartAnnotation[] = [
  { type: 'sweep', x1: 1, x2: 3, y1: 98, y2: 98, color: '#ef4444' },
  { type: 'text', x1: 2, y1: 95, text: 'Sell-side Sweep' },
  { type: 'choch', x1: 1, x2: 4, y1: 110, y2: 110, color: '#eab308' },
  { type: 'text', x1: 3, y1: 113, text: 'Market Structure Shift' },
  { type: 'ob', x1: 2, x2: 6, y1: 98, y2: 104, color: 'rgba(59,130,246,0.2)' },
  { type: 'text', x1: 4, y1: 95, text: 'Bullish OB' },
  { type: 'fvg', x1: 2, x2: 4, y1: 100, y2: 108, color: 'rgba(234,179,8,0.2)' },
  { type: 'text', x1: 5, y1: 100, text: 'Retest & Continuation' }
];

export const mitigationData = [
  c(1, 115, 120, 114, 118),
  c(2, 118, 119, 110, 112), // Start of bearish displacement
  c(3, 112, 113, 100, 102), // Strong dump, leaves FVG
  c(4, 102, 105, 98, 100),
  c(5, 100, 108, 99, 106), // Return to block (candle 2 area)
  c(6, 106, 115, 105, 111), // Mitigation tap into FVG/OB
  c(7, 111, 112, 102, 104), // Renewed selling
  c(8, 104, 106, 95, 96),
];
export const mitigationAnn: ChartAnnotation[] = [
  { type: 'ob', x1: 1, x2: 7, y1: 112, y2: 119, color: 'rgba(239,68,68,0.2)' },
  { type: 'text', x1: 2, y1: 121, text: 'Bearish Block' },
  { type: 'fvg', x1: 2, x2: 4, y1: 105, y2: 110, color: 'rgba(234,179,8,0.2)' },
  { type: 'text', x1: 3, y1: 107, text: 'Inefficiency (FVG)' },
  { type: 'text', x1: 6, y1: 117, text: 'Mitigation Return' },
  { type: 'text', x1: 7, y1: 99, text: 'Renewed Selling' }
];

export const breakerData = [
  c(1, 100, 105, 98, 104),
  c(2, 104, 112, 102, 110), // Bullish OB formed here
  c(3, 110, 111, 108, 109), 
  c(4, 109, 115, 108, 114), 
  c(5, 114, 115, 105, 106), // Taps OB
  c(6, 106, 112, 105, 110), // Bounce from OB (Trapped Longs)
  c(7, 110, 111, 95, 98),   // Failure of defense, breakdown
  c(8, 98, 108, 96, 105),   // Return to breached OB
  c(9, 105, 106, 92, 94),   // Bearish continuation
];
export const breakerAnn: ChartAnnotation[] = [
  { type: 'ob', x1: 2, x2: 9, y1: 102, y2: 108, color: 'rgba(59,130,246,0.1)' },
  { type: 'text', x1: 2, y1: 100, text: 'Prior Bullish OB' },
  { type: 'text', x1: 6, y1: 114, text: 'Defense (Trapped Longs)' },
  { type: 'bos', x1: 6, x2: 8, y1: 102, y2: 102, color: '#ef4444' },
  { type: 'text', x1: 7, y1: 93, text: 'Failure of Defense' },
  { type: 'ob', x1: 7, x2: 10, y1: 102, y2: 108, color: 'rgba(239,68,68,0.3)' },
  { type: 'text', x1: 8, y1: 110, text: 'Bearish Breaker Retest' }
];

export const vacuumData = [
  c(1, 120, 125, 118, 122),
  c(2, 122, 123, 105, 108), // Fast single traversal
  c(3, 108, 110, 102, 104),
  c(4, 104, 106, 100, 102),
  c(5, 102, 115, 101, 114), // Quick revisit
  c(6, 114, 124, 112, 122), // Sharp reaction / fast traversal up
  c(7, 122, 125, 120, 124)
];
export const vacuumAnn: ChartAnnotation[] = [
  { type: 'fvg', x1: 1, x2: 6, y1: 108, y2: 122, color: 'rgba(168,85,247,0.15)' },
  { type: 'text', x1: 2, y1: 115, text: 'Price Vacuum (Thin Acceptance)' },
  { type: 'text', x1: 5, y1: 108, text: 'Quick Revisit' },
  { type: 'text', x1: 6, y1: 126, text: 'Fast Traversal / Sharp Reaction' }
];

export const expansionData = [
  c(1, 100, 105, 99, 104),
  c(2, 104, 112, 102, 110), // Impulse 1
  c(3, 110, 111, 106, 107), // Shallow pullback
  c(4, 107, 109, 105, 108), 
  c(5, 108, 118, 108, 116), // Continuation leg, acceptance
  c(6, 116, 122, 115, 120),
  c(7, 120, 121, 117, 118)
];
export const expansionAnn: ChartAnnotation[] = [
  { type: 'text', x1: 2, y1: 114, text: 'Impulse 1' },
  { type: 'fvg', x1: 2, x2: 4, y1: 104, y2: 106, color: 'rgba(234,179,8,0.2)' },
  { type: 'text', x1: 3, y1: 104, text: 'Shallow Pullback' },
  { type: 'bos', x1: 2, x2: 6, y1: 112, y2: 112, color: '#3b82f6' },
  { type: 'text', x1: 5, y1: 124, text: 'Acceptance' },
  { type: 'text', x1: 6, y1: 126, text: 'Continuation' }
];

export const pullbackData = [
  c(1, 100, 110, 99, 108), // Primary impulse
  c(2, 108, 115, 107, 114), 
  c(3, 114, 116, 112, 113), 
  c(4, 113, 114, 109, 110), // start pullback
  c(5, 110, 111, 106, 107), 
  c(6, 107, 108, 103, 104), // deep, no aggressive displacement, small candles
  c(7, 104, 105, 101, 102), // hits OB from candle 1
  c(8, 102, 112, 101, 110), // Reclaim
  c(9, 110, 120, 109, 118), // Continuation
];
export const pullbackAnn: ChartAnnotation[] = [
  { type: 'text', x1: 2, y1: 118, text: 'Primary Impulse' },
  { type: 'text', x1: 5, y1: 114, text: 'Controlled Retracement' },
  { type: 'ob', x1: 1, x2: 8, y1: 99, y2: 104, color: 'rgba(59,130,246,0.15)' },
  { type: 'text', x1: 7, y1: 97, text: 'Bullish OB' },
  { type: 'text', x1: 8, y1: 114, text: 'Reclaim & Continuation' },
];

export const transitionData = [
  c(1, 100, 110, 99, 108), 
  c(2, 108, 115, 105, 114), 
  c(3, 114, 115, 108, 110), 
  c(4, 110, 118, 109, 117), // new high
  c(5, 117, 119, 112, 113), // weak breakout, immediately rejected
  c(6, 113, 115, 106, 107), // deeper pullback
  c(7, 107, 112, 105, 110), // attempt to go higher
  c(8, 110, 113, 108, 109), // fails
  c(9, 109, 110, 100, 102), // structure breaks (CHOCH)
];
export const transitionAnn: ChartAnnotation[] = [
  { type: 'text', x1: 5, y1: 121, text: 'Sweep / Fakeout' },
  { type: 'sweep', x1: 4, x2: 6, y1: 118, y2: 118, color: '#ef4444' },
  { type: 'text', x1: 6, y1: 117, text: 'Loss of follow-through' },
  { type: 'text', x1: 6, y1: 104, text: 'Deeper Pullback' },
  { type: 'choch', x1: 6, x2: 9, y1: 106, y2: 106, color: '#eab308' },
  { type: 'text', x1: 8, y1: 104, text: 'Control shift (CHOCH)' },
];

export const rangeData = [
  c(1, 105, 115, 102, 112), 
  c(2, 112, 116, 108, 109), 
  c(3, 109, 110, 101, 103), 
  c(4, 103, 105, 98, 104), // Sweep low
  c(5, 104, 113, 103, 111), // Return to value
  c(6, 111, 114, 109, 110), 
  c(7, 110, 118, 108, 115), // Sweep high
  c(8, 115, 116, 105, 107), // Return to value
  c(9, 107, 109, 102, 104)
];
export const rangeAnn: ChartAnnotation[] = [
  { type: 'trend', x1: 1, x2: 9, y1: 115, y2: 115, color: '#9ca3af' }, 
  { type: 'trend', x1: 1, x2: 9, y1: 102, y2: 102, color: '#9ca3af' }, 
  { type: 'text', x1: 2, y1: 118, text: 'Range High' },
  { type: 'text', x1: 2, y1: 99, text: 'Range Low' },
  { type: 'sweep', x1: 3, x2: 5, y1: 101, y2: 101, color: '#ef4444' },
  { type: 'text', x1: 4, y1: 96, text: 'Sweep Low' },
  { type: 'sweep', x1: 6, x2: 8, y1: 115, y2: 115, color: '#ef4444' },
  { type: 'text', x1: 7, y1: 120, text: 'Sweep High' },
  { type: 'text', x1: 5, y1: 107, text: 'Return to value' },
];

export const m3EqualHighsData = [
  c(1, 100, 110, 98, 105),
  c(2, 105, 115, 102, 112), // High 1
  c(3, 112, 113, 106, 108),
  c(4, 108, 116, 105, 110), // High 2 (Equal)
  c(5, 110, 112, 102, 105),
  c(6, 105, 120, 104, 118), // Sweep up
  c(7, 118, 119, 108, 110), // Rejection, displacement down
  c(8, 110, 112, 100, 102), // Continuation lower
  c(9, 102, 104, 95, 96),
];
export const m3EqualHighsAnn: ChartAnnotation[] = [
  { type: 'trend', x1: 1, x2: 9, y1: 115.5, y2: 115.5, color: '#eab308' },
  { type: 'text', x1: 3, y1: 118, text: 'Equal Highs (Buy Stops)' },
  { type: 'sweep', x1: 5, x2: 7, y1: 119, y2: 119, color: '#ef4444' },
  { type: 'text', x1: 6, y1: 122, text: 'Liquidity Sweep' },
  { type: 'text', x1: 7, y1: 106, text: 'Rejection & Displacement Lower' }
];

export const m3StopHuntData = [
  c(1, 120, 122, 110, 115),
  c(2, 115, 118, 105, 108), // Swing Low
  c(3, 108, 112, 106, 110),
  c(4, 110, 115, 108, 112),
  c(5, 112, 114, 102, 105), // Stop hunt (sweeps candle 2)
  c(6, 105, 118, 104, 116), // Reclaim and bullish shift
  c(7, 116, 122, 115, 120),
  c(8, 120, 125, 118, 124),
];
export const m3StopHuntAnn: ChartAnnotation[] = [
  { type: 'trend', x1: 1, x2: 4, y1: 105, y2: 105, color: '#ef4444' },
  { type: 'text', x1: 2, y1: 103, text: 'Prior Swing Low' },
  { type: 'sweep', x1: 4, x2: 6, y1: 102, y2: 102, color: '#ef4444' },
  { type: 'text', x1: 5, y1: 100, text: 'Stop Hunt below swing low' },
  { type: 'bos', x1: 4, x2: 7, y1: 115, y2: 115, color: '#22c55e' },
  { type: 'text', x1: 6, y1: 117, text: 'Reclaim / Local Shift' }
];

export const m3FvgTrapData = [
  c(1, 100, 105, 98, 104),
  c(2, 104, 115, 103, 114), // Bullish thrust
  c(3, 114, 116, 110, 112), // Leaves FVG
  c(4, 112, 114, 108, 109), // Enters FVG (Retail buys)
  c(5, 109, 110, 100, 102), // Deep sweep taking real liquidity
  c(6, 102, 118, 101, 116), // Real move starts
  c(7, 116, 122, 115, 120),
];
export const m3FvgTrapAnn: ChartAnnotation[] = [
  { type: 'fvg', x1: 1, x2: 4, y1: 105, y2: 110, color: 'rgba(234,179,8,0.2)' },
  { type: 'text', x1: 2, y1: 107, text: 'Obvious FVG' },
  { type: 'text', x1: 4, y1: 116, text: 'Induced Longs Trapped' },
  { type: 'sweep', x1: 4, x2: 6, y1: 100, y2: 100, color: '#ef4444' },
  { type: 'text', x1: 5, y1: 98, text: 'Deeper Sweep' },
  { type: 'text', x1: 6, y1: 110, text: 'Real Bullish Reaction' }
];

export const m3SessionData = [
  c(1, 105, 108, 104, 106), // Asia
  c(2, 106, 107, 103, 105), // Asia
  c(3, 105, 109, 104, 108), // Asia High
  c(4, 108, 110, 105, 106), // Asia
  c(5, 106, 107, 98, 100),  // London open: dump sweeps Asia low
  c(6, 100, 115, 99, 112),  // Reverse up
  c(7, 112, 120, 110, 118), // NY cont
  c(8, 118, 122, 116, 120),
];
export const m3SessionAnn: ChartAnnotation[] = [
  { type: 'ob', x1: 1, x2: 4, y1: 103, y2: 109, color: 'rgba(59,130,246,0.1)' },
  { type: 'text', x1: 2, y1: 111, text: 'Asia Range' },
  { type: 'trend', x1: 1, x2: 5, y1: 103, y2: 103, color: '#ef4444' },
  { type: 'text', x1: 3, y1: 101, text: 'Asia Low Liquidity' },
  { type: 'sweep', x1: 4, x2: 6, y1: 98, y2: 98, color: '#ef4444' },
  { type: 'text', x1: 5, y1: 96, text: 'London Session Sweep' },
  { type: 'text', x1: 6, y1: 108, text: 'Reversal post-sweep' }
];

export const m5DispData = [
  c(1, 105, 108, 102, 104),
  c(2, 104, 106, 98, 100),   // Sweep sell-side
  c(3, 100, 115, 99, 114),   // True Displacement up, breaks local structure
  c(4, 114, 118, 110, 116),  // Leaves imbalance
  c(5, 116, 117, 112, 115),  // Shallow pullback / acceptance
  c(6, 115, 125, 114, 124),  // Continuation
  c(7, 124, 128, 122, 126),
];
export const m5DispAnn: ChartAnnotation[] = [
  { type: 'sweep', x1: 1, x2: 3, y1: 98, y2: 98, color: '#ef4444' },
  { type: 'text', x1: 2, y1: 95, text: 'Liquidity Sweep' },
  { type: 'bos', x1: 2, x2: 4, y1: 108, y2: 108, color: '#22c55e' },
  { type: 'text', x1: 3, y1: 110, text: 'Structure Break' },
  { type: 'fvg', x1: 2, x2: 5, y1: 106, y2: 110, color: 'rgba(34,197,94,0.2)' },
  { type: 'text', x1: 4, y1: 108, text: 'Imbalance Left Behind' },
  { type: 'text', x1: 6, y1: 118, text: 'Acceptance & Continuation' },
];

export const m5ExhData = [
  c(1, 100, 110, 98, 108),
  c(2, 108, 115, 106, 114),
  c(3, 114, 116, 110, 112), // Old high around 116
  c(4, 112, 114, 108, 110),
  c(5, 110, 125, 109, 124), // Emotional late-stage breakout
  c(6, 124, 125, 115, 116), // Immediate rejection, fails to hold
  c(7, 116, 118, 105, 106), // Imbalance reclaimed, reversal
  c(8, 106, 108, 95, 98),
];
export const m5ExhAnn: ChartAnnotation[] = [
  { type: 'trend', x1: 1, x2: 8, y1: 116, y2: 116, color: '#eab308' },
  { type: 'text', x1: 3, y1: 118, text: 'Old High Liquidity' },
  { type: 'text', x1: 5, y1: 127, text: 'Late-stage Acceleration (Exhaustion)' },
  { type: 'sweep', x1: 4, x2: 6, y1: 125, y2: 125, color: '#ef4444' },
  { type: 'text', x1: 6, y1: 122, text: 'Weak Acceptance' },
  { type: 'text', x1: 7, y1: 110, text: 'Imbalance Reclaimed / Reversal' },
];

export const m5VoidDispData = [
  c(1, 100, 105, 99, 104),
  c(2, 104, 125, 103, 124), // Massive void up
  c(3, 124, 126, 118, 120), // Shallow refill
  c(4, 120, 122, 118, 121), // Rejection tail holding void edge
  c(5, 121, 135, 120, 134), // Continuation
];
export const m5VoidDispAnn: ChartAnnotation[] = [
  { type: 'fvg', x1: 1, x2: 5, y1: 105, y2: 118, color: 'rgba(34,197,94,0.15)' },
  { type: 'text', x1: 2, y1: 112, text: 'Void Zone (Urgent Repricing)' },
  { type: 'text', x1: 4, y1: 116, text: 'Shallow Refill' },
  { type: 'text', x1: 5, y1: 128, text: 'Continuation' },
];

export const m5VoidExhData = [
  c(1, 100, 110, 99, 108),
  c(2, 108, 115, 107, 114),
  c(3, 114, 130, 113, 128), // Terminal sprint void
  c(4, 128, 129, 120, 122), // Immediate bleed
  c(5, 122, 124, 110, 112), // Void completely filled
  c(6, 112, 114, 100, 102), // Dead
];
export const m5VoidExhAnn: ChartAnnotation[] = [
  { type: 'fvg', x1: 2, x2: 5, y1: 115, y2: 120, color: 'rgba(239,68,68,0.1)' },
  { type: 'text', x1: 3, y1: 132, text: 'Terminal Void (Emotional Extension)' },
  { type: 'text', x1: 4, y1: 125, text: 'Immediate Bleed' },
  { type: 'text', x1: 5, y1: 116, text: 'Full Refill (Exhaustion Confirmed)' },
];

export const m8HighBullData = [
  c(1, 105, 110, 103, 108),
  c(2, 108, 109, 98, 100), // HTF Liquidity Taken
  c(3, 100, 115, 99, 114), // Reclaim + Displacement
  c(4, 114, 115, 108, 109), // FVG Retest
  c(5, 109, 120, 108, 118), // NY Session Continuation
  c(6, 118, 125, 117, 123)
];
export const m8HighBullAnn: ChartAnnotation[] = [
  { type: 'sweep', x1: 1, x2: 3, y1: 98, y2: 98, color: '#ef4444' },
  { type: 'text', x1: 2, y1: 95, text: 'HTF Liquidity Taken' },
  { type: 'bos', x1: 2, x2: 4, y1: 110, y2: 110, color: '#22c55e' },
  { type: 'text', x1: 3, y1: 116, text: 'Structure Reclaim' },
  { type: 'fvg', x1: 2, x2: 4, y1: 108, y2: 114, color: 'rgba(34,197,94,0.15)' },
  { type: 'text', x1: 4, y1: 106, text: 'FVG Retest' },
  { type: 'text', x1: 5, y1: 122, text: 'NY Session Continuation' }
];

export const m8LowPinData = [
  c(1, 100, 115, 98, 114),
  c(2, 114, 118, 110, 112),
  c(3, 112, 114, 105, 106),
  c(4, 106, 113, 104, 112), // Bullish Pin bar in the middle of nowhere
  c(5, 112, 113, 98, 99), // No follow-through, dumps
  c(6, 99, 100, 92, 94)
];
export const m8LowPinAnn: ChartAnnotation[] = [
  { type: 'text', x1: 3, y1: 103, text: 'Mid-range location' },
  { type: 'text', x1: 4, y1: 115, text: 'Isolated Pin Bar (Trap)' },
  { type: 'text', x1: 5, y1: 105, text: 'No Liquidity Event' },
  { type: 'text', x1: 5, y1: 96, text: 'Zero Follow-through' }
];

export const m8HighBearData = [
  c(1, 120, 125, 118, 122),
  c(2, 122, 130, 120, 129), // Buy side sweep at old high
  c(3, 129, 131, 122, 123), // Failed acceptance, displacement lower
  c(4, 123, 124, 112, 114), // Bearish continuation
  c(5, 114, 120, 113, 119), // Inversion/FVG retest
  c(6, 119, 120, 105, 106), // London/NY Session Drop
  c(7, 106, 108, 98, 100)
];
export const m8HighBearAnn: ChartAnnotation[] = [
  { type: 'trend', x1: 1, x2: 4, y1: 125, y2: 125, color: '#eab308' },
  { type: 'text', x1: 2, y1: 132, text: 'Liquidity Taken (HTF Context)' },
  { type: 'sweep', x1: 2, x2: 4, y1: 122, y2: 122, color: '#ef4444' },
  { type: 'text', x1: 3, y1: 126, text: 'Failed Acceptance / Displacement Lower' },
  { type: 'fvg', x1: 3, x2: 5, y1: 114, y2: 122, color: 'rgba(239,68,68,0.15)' },
  { type: 'text', x1: 5, y1: 122, text: 'Inversion Retest' },
  { type: 'text', x1: 6, y1: 110, text: 'Session Continuation' }
];

export const m6Stage1Data = [
  c(1, 100, 105, 98, 104),
  c(2, 104, 108, 103, 107),
  c(3, 107, 112, 106, 110), // Leaves FVG
  c(4, 110, 115, 109, 114),
  c(5, 114, 115, 111, 112),
  c(6, 112, 114, 110, 113)
];
export const m6Stage1Ann: ChartAnnotation[] = [
  { type: 'trend', x1: 1, x2: 6, y1: 98, y2: 110, color: '#3b82f6' },
  { type: 'text', x1: 3, y1: 96, text: 'Clean Trendline (Retail Support)' },
  { type: 'fvg', x1: 2, x2: 4, y1: 108, y2: 110, color: 'rgba(34,197,94,0.2)' },
  { type: 'text', x1: 4, y1: 106, text: 'Visible Bullish FVG' },
  { type: 'text', x1: 5, y1: 118, text: 'Expectation Building...' }
];

export const m6Stage2Data = [
  c(1, 100, 105, 98, 104),
  c(2, 104, 112, 103, 110), // Bullish move leaves FVG
  c(3, 110, 112, 106, 108), 
  c(4, 108, 110, 105, 109), // Inducement - touches FVG, small bounce
  c(5, 109, 110, 95, 97),   // Deep sweep below candle 1
  c(6, 97, 115, 96, 114),   // True expansion starts
  c(7, 114, 120, 112, 118)
];
export const m6Stage2Ann: ChartAnnotation[] = [
  { type: 'fvg', x1: 1, x2: 4, y1: 105, y2: 108, color: 'rgba(34,197,94,0.15)' },
  { type: 'text', x1: 3, y1: 114, text: 'Initial Reaction (Induced Longs)' },
  { type: 'sweep', x1: 1, x2: 5, y1: 98, y2: 98, color: '#ef4444' },
  { type: 'text', x1: 4, y1: 95, text: 'Stop Run / Liquidity Sweep' },
  { type: 'text', x1: 6, y1: 116, text: 'True Expansion Begins' }
];

export const m6Stage3Data = [
  c(1, 110, 112, 95, 97),   // Sweep candle
  c(2, 97, 108, 96, 106),   // Reclaim
  c(3, 106, 120, 105, 118), // Real displacement
  c(4, 118, 122, 115, 121), // FVG shallow tap
  c(5, 121, 130, 120, 128), // Continuation
  c(6, 128, 135, 127, 134)
];
export const m6Stage3Ann: ChartAnnotation[] = [
  { type: 'text', x1: 1, y1: 93, text: 'Liquidity Cleared' },
  { type: 'choch', x1: 1, x2: 3, y1: 112, y2: 112, color: '#22c55e' },
  { type: 'text', x1: 2, y1: 114, text: 'Structure Reclaim' },
  { type: 'text', x1: 3, y1: 122, text: 'Real Displacement (Commitment)' },
  { type: 'text', x1: 5, y1: 132, text: 'Smooth Continuation' }
];

export const m4ContData = [
  c(1, 100, 105, 98, 104),
  c(2, 104, 118, 102, 116), // Strong displacement up
  c(3, 116, 120, 112, 118), // Leaves FVG between candle 1 high (105) and candle 3 low (112)
  c(4, 118, 119, 110, 111), // Pullback into FVG
  c(5, 111, 112, 108, 110), // Taps deeper into FVG, rejection tail
  c(6, 110, 122, 109, 120), // Continuation up
  c(7, 120, 128, 118, 125)
];
export const m4ContAnn: ChartAnnotation[] = [
  { type: 'fvg', x1: 2, x2: 5, y1: 105, y2: 112, color: 'rgba(34,197,94,0.2)' },
  { type: 'text', x1: 3, y1: 108, text: 'Bullish FVG' },
  { type: 'text', x1: 5, y1: 105, text: 'Retrace & Rejection' },
  { type: 'text', x1: 6, y1: 115, text: 'Continuation' }
];

export const m4StrengthData = [
  c(1, 100, 108, 99, 107),
  c(2, 107, 115, 106, 114),
  c(3, 114, 122, 112, 120), // FVG1: 108 to 112
  c(4, 120, 128, 118, 127), // FVG2: 115 to 118
  c(5, 127, 129, 124, 125), // Shallow touch
  c(6, 125, 135, 124, 134), // Explodes
];
export const m4StrengthAnn: ChartAnnotation[] = [
  { type: 'fvg', x1: 2, x2: 4, y1: 108, y2: 112, color: 'rgba(34,197,94,0.15)' },
  { type: 'fvg', x1: 3, x2: 5, y1: 115, y2: 118, color: 'rgba(34,197,94,0.15)' },
  { type: 'text', x1: 4, y1: 110, text: 'Consecutive FVGs (Urgency)' },
  { type: 'text', x1: 5, y1: 121, text: 'Shallow Mitigation' }
];

export const m4TrapData = [
  c(1, 100, 104, 98, 102),
  c(2, 102, 118, 101, 116), // Massive obvious candle
  c(3, 116, 119, 112, 115), // Leaves giant FVG 104-112
  c(4, 115, 116, 108, 110), // Drops into FVG
  c(5, 110, 114, 107, 113), // Bounces (Retail buys the FVG)
  c(6, 113, 114, 95, 96),   // Violently drops, sweeping lows
  c(7, 96, 110, 94, 108),   // Reversal AFTER sweep
];
export const m4TrapAnn: ChartAnnotation[] = [
  { type: 'fvg', x1: 2, x2: 5, y1: 104, y2: 112, color: 'rgba(234,179,8,0.2)' },
  { type: 'text', x1: 3, y1: 108, text: 'Obvious Textbook FVG' },
  { type: 'text', x1: 5, y1: 116, text: 'Induced Longs' },
  { type: 'sweep', x1: 5, x2: 7, y1: 98, y2: 98, color: '#ef4444' },
  { type: 'text', x1: 6, y1: 93, text: 'Deeper Liquidity Run' },
  { type: 'text', x1: 7, y1: 103, text: 'True Bullish Move' }
];

export const m4InversionData = [
  c(1, 100, 105, 98, 103),
  c(2, 103, 115, 102, 113), // Bullish thrust
  c(3, 113, 116, 110, 112), // FVG left: 105-110
  c(4, 112, 113, 106, 108), // Enters FVG
  c(5, 108, 109, 98, 100),  // Fails FVG completely (Acceptance below)
  c(6, 100, 107, 99, 106),  // Returns to underside of FVG
  c(7, 106, 107, 92, 94),   // Rejects and dumps
];
export const m4InversionAnn: ChartAnnotation[] = [
  { type: 'fvg', x1: 2, x2: 4, y1: 105, y2: 110, color: 'rgba(34,197,94,0.2)' },
  { type: 'text', x1: 2, y1: 103, text: 'Prior Bullish FVG' },
  { type: 'bos', x1: 4, x2: 6, y1: 105, y2: 105, color: '#ef4444' },
  { type: 'text', x1: 5, y1: 96, text: 'Failure & Acceptance Below' },
  { type: 'fvg', x1: 4, x2: 7, y1: 105, y2: 110, color: 'rgba(239,68,68,0.3)' },
  { type: 'text', x1: 6, y1: 112, text: 'Bearish Inversion Retest' }
];

export const m7ClassicSpringData = [
  c(1, 105, 110, 102, 104),
  c(2, 104, 109, 101, 108),
  c(3, 108, 112, 103, 106),
  c(4, 106, 110, 104, 105), // Range established (101 - 112)
  c(5, 105, 106, 92, 95),   // Spring! Sweep low
  c(6, 95, 110, 94, 108),   // Clean Reclaim
  c(7, 108, 115, 106, 114), // Commitment Move
  c(8, 114, 122, 112, 120), // Markup
];
export const m7ClassicSpringAnn: ChartAnnotation[] = [
  { type: 'trend', x1: 1, x2: 8, y1: 101, y2: 101, color: '#f59e0b' },
  { type: 'text', x1: 2, y1: 99, text: 'Range Low / Liquidity' },
  { type: 'sweep', x1: 4, x2: 6, y1: 92, y2: 92, color: '#ef4444' },
  { type: 'text', x1: 5, y1: 89, text: 'Spring (Sweep)' },
  { type: 'text', x1: 6, y1: 112, text: 'Clean Reclaim' },
  { type: 'text', x1: 8, y1: 124, text: 'Commitment Move' },
];

export const m7DoubleSpringData = [
  c(1, 100, 105, 98, 99),
  c(2, 99, 102, 93, 95),   // 1st Spring
  c(3, 95, 98, 94, 97),    // Weak bounce
  c(4, 97, 100, 96, 98),
  c(5, 98, 98, 85, 87),    // 2nd Deeper Spring
  c(6, 87, 102, 86, 100),  // Massive Reclaim
  c(7, 100, 110, 98, 108), // Real Displacement
  c(8, 108, 118, 107, 116),
];
export const m7DoubleSpringAnn: ChartAnnotation[] = [
  { type: 'trend', x1: 1, x2: 8, y1: 98, y2: 98, color: '#f59e0b' },
  { type: 'text', x1: 2, y1: 96, text: 'Range Low' },
  { type: 'sweep', x1: 1, x2: 3, y1: 93, y2: 93, color: '#ef4444' },
  { type: 'text', x1: 2, y1: 91, text: '1st Spring (Retail Longs)' },
  { type: 'sweep', x1: 4, x2: 6, y1: 85, y2: 85, color: '#ef4444' },
  { type: 'text', x1: 5, y1: 82, text: '2nd Deeper Sweep (Massacre)' },
  { type: 'text', x1: 7, y1: 112, text: 'Real Displacement' },
];

export const m7FakeUpthrustData = [
  c(1, 140, 145, 138, 144),
  c(2, 144, 148, 142, 146), // Range High ~146
  c(3, 146, 155, 144, 153), // Breakout
  c(4, 153, 156, 152, 154), // Fake Acceptance (Doji)
  c(5, 154, 157, 153, 155), // Fake Acceptance
  c(6, 155, 156, 136, 138), // Devastating Breakdown
  c(7, 138, 140, 125, 128), // Markdown
];
export const m7FakeUpthrustAnn: ChartAnnotation[] = [
  { type: 'trend', x1: 1, x2: 7, y1: 148, y2: 148, color: '#f59e0b' },
  { type: 'text', x1: 2, y1: 150, text: 'Range High / Resistance' },
  { type: 'fvg', x1: 3, x2: 6, y1: 152, y2: 157, color: 'rgba(59,130,246,0.2)' },
  { type: 'text', x1: 4, y1: 159, text: 'Fake Acceptance (Breakout Trap)' },
  { type: 'bos', x1: 5, x2: 7, y1: 138, y2: 138, color: '#ef4444' },
  { type: 'text', x1: 6, y1: 134, text: 'Bearish Displacement' },
];

export const m7SpringFvgData = [
  c(1, 120, 122, 110, 112),
  c(2, 112, 112, 98, 102),  // Initial Low
  c(3, 102, 125, 101, 122), // Bounce leaving FVG
  c(4, 122, 130, 118, 128),
  c(5, 128, 128, 112, 115), // Retrace into FVG (Retail buys)
  c(6, 115, 116, 92, 94),   // Final sweep lower
  c(7, 94, 135, 92, 130),   // Real Markup
  c(8, 130, 140, 125, 138),
];
export const m7SpringFvgAnn: ChartAnnotation[] = [
  { type: 'trend', x1: 1, x2: 8, y1: 98, y2: 98, color: '#f59e0b' },
  { type: 'text', x1: 2, y1: 96, text: 'Initial Low' },
  { type: 'fvg', x1: 2, x2: 5, y1: 112, y2: 120, color: 'rgba(59,130,246,0.2)' },
  { type: 'text', x1: 4, y1: 122, text: 'Bullish FVG (Inducement)' },
  { type: 'sweep', x1: 5, x2: 7, y1: 92, y2: 92, color: '#ef4444' },
  { type: 'text', x1: 6, y1: 89, text: 'Final Sweep of FVG Buyers' },
  { type: 'text', x1: 7, y1: 137, text: 'Real Commitment Move' },
];
