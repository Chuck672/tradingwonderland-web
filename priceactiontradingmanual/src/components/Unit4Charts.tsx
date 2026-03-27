import React from "react";
import { cn } from "@/utils/cn";
import { UNIT4_TEXT } from "../App";

interface CandleProps {
  open: number;
  close: number;
  high: number;
  low: number;
  className?: string;
  tone?: "black" | "white" | "gray";
}

const Candle: React.FC<CandleProps> = ({ open, close, high, low, className, tone = "black" }) => {
  const isBullish = close > open;
  const top = Math.max(open, close);
  const bottom = Math.min(open, close);
  const bodyHeight = Math.max(top - bottom, 1.5);

  const colors = tone === "white" 
    ? { body: "bg-zinc-100", border: "border-zinc-300", wick: "bg-zinc-300" }
    : tone === "black"
    ? { body: "bg-zinc-800", border: "border-zinc-600", wick: "bg-zinc-600" }
    : tone === "gray"
    ? { body: "bg-zinc-500", border: "border-zinc-600", wick: "bg-zinc-600" }
    : isBullish
      ? { body: "bg-[#84cc16]", border: "border-[#a3e635]/20", wick: "bg-[#84cc16]" }
      : { body: "bg-[#ef4444]", border: "border-[#f87171]/20", wick: "bg-[#ef4444]" };

  return (
    <div className={cn("relative flex flex-col items-center w-2.5 h-full group", className)}>
      <div
        className={cn("absolute w-[1px] opacity-60", colors.wick)}
        style={{
          top: `${100 - high}%`,
          height: `${high - low}%`,
        }}
      />
      <div
        className={cn(
          "absolute w-full border rounded-[1px] shadow-[0_0_4px_rgba(0,0,0,0.2)]",
          colors.body,
          colors.border
        )}
        style={{
          top: `${100 - top}%`,
          height: `${bodyHeight}%`,
        }}
      />
    </div>
  );
};

export const KeyLevelsChart: React.FC<{ lang: "zh" | "en" }> = ({ lang: _lang }) => {
  const candles = [
    { open: 60, close: 50, high: 65, low: 45, tone: "black" },
    { open: 50, close: 65, high: 70, low: 45, tone: "white" },
    { open: 65, close: 85, high: 90, low: 60, tone: "white" }, // Red circle top
    { open: 85, close: 75, high: 88, low: 70, tone: "black" },
    { open: 75, close: 60, high: 80, low: 55, tone: "black" },
    { open: 60, close: 40, high: 65, low: 35, tone: "black" },
    { open: 40, close: 15, high: 45, low: 10, tone: "black" }, // Red circle bottom
    { open: 15, close: 35, high: 40, low: 10, tone: "white" },
    { open: 35, close: 50, high: 55, low: 30, tone: "white" },
    { open: 50, close: 45, high: 60, low: 40, tone: "black" }, // Green circle bottom
    { open: 45, close: 55, high: 60, low: 40, tone: "white" },
    { open: 55, close: 45, high: 65, low: 40, tone: "black" },
    { open: 45, close: 60, high: 65, low: 40, tone: "white" }, // Green circle bottom
    { open: 60, close: 50, high: 70, low: 45, tone: "black" },
    { open: 50, close: 40, high: 55, low: 35, tone: "black" },
    { open: 40, close: 15, high: 45, low: 10, tone: "black" }, // Red circle bottom
    { open: 15, close: 35, high: 40, low: 10, tone: "white" },
    { open: 35, close: 55, high: 60, low: 30, tone: "white" },
    { open: 55, close: 70, high: 75, low: 50, tone: "white" }, // Blue circle top
    { open: 70, close: 60, high: 75, low: 55, tone: "black" },
    { open: 60, close: 75, high: 80, low: 55, tone: "white" },
    { open: 75, close: 65, high: 85, low: 60, tone: "black" }, // Green circle top
    { open: 65, close: 85, high: 90, low: 60, tone: "white" }, // Red circle top
    { open: 85, close: 75, high: 95, low: 70, tone: "black" },
  ];

  return (
    <div className="relative w-full h-[500px] bg-[#050705]/50 rounded-2xl border border-lime-500/20 flex flex-col items-center justify-center p-12 overflow-hidden shadow-inner">
      <div className="relative flex gap-1.5 items-end h-64">
        {candles.map((c, i) => (
          <Candle key={i} {...c as any} className="w-3" />
        ))}

        {/* Major Levels (Red) */}
        <div className="absolute top-[10%] left-[-20px] w-[calc(100%+40px)] h-[1px] border-t border-dashed border-red-500/50" />
        <div className="absolute bottom-[10%] left-[-20px] w-[calc(100%+40px)] h-[1px] border-t border-dashed border-red-500/50" />
        
        {/* Unclear Level (Blue) */}
        <div className="absolute top-[25%] left-[-20px] w-[calc(100%+40px)] h-[1px] border-t border-dotted border-blue-500/50" />
        
        {/* Minor Level (Green) */}
        <div className="absolute bottom-[40%] left-[-20px] w-[calc(100%+40px)] h-[1px] border-t border-dotted border-lime-500/50" />

      </div>
    </div>
  );
};

export const TradingPlanChart: React.FC<{ lang: "zh" | "en" }> = ({ lang }) => {
  const candles = [
    { open: 35, close: 40, high: 45, low: 30, tone: "white" },
    { open: 40, close: 30, high: 45, low: 25, tone: "black" },
    { open: 30, close: 45, high: 50, low: 25, tone: "white" },
    { open: 45, close: 35, high: 60, low: 30, tone: "black" },
    { open: 35, close: 30, high: 40, low: 25, tone: "black" },
    { open: 30, close: 20, high: 35, low: 15, tone: "black" },
    { open: 20, close: 15, high: 25, low: 10, tone: "black" },
    { open: 15, close: 30, high: 35, low: 10, tone: "white" },
    { open: 30, close: 25, high: 40, low: 20, tone: "black" },
    { open: 25, close: 30, high: 35, low: 20, tone: "white" },
    { open: 30, close: 25, high: 40, low: 20, tone: "black" },
    { open: 25, close: 20, high: 30, low: 15, tone: "black" },
    { open: 20, close: 35, high: 40, low: 15, tone: "white" },
    { open: 35, close: 30, high: 40, low: 25, tone: "black" },
    { open: 30, close: 40, high: 45, low: 25, tone: "white" },
    { open: 40, close: 30, high: 45, low: 25, tone: "black" },
    { open: 30, close: 45, high: 50, low: 25, tone: "white" },
    { open: 45, close: 35, high: 55, low: 30, tone: "black" },
    // 1. BREAKOUT (Liquidity Grab)
    { open: 35, close: 70, high: 75, low: 5, tone: "white" },
    // 2. BREAKOUT CONTINUATION
    { open: 70, close: 85, high: 86, low: 60, tone: "white" },
    { open: 85, close: 80, high: 90, low: 75, tone: "black" },
    { open: 80, close: 70, high: 85, low: 65, tone: "black" },
    { open: 70, close: 80, high: 85, low: 65, tone: "white" },
    // 3. RANGE 2 BREAKOUT
    { open: 80, close: 95, high: 100, low: 75, tone: "white" },
  ];

  return (
    <div className="relative w-full h-[750px] bg-[#050705]/50 rounded-2xl border border-lime-500/20 flex flex-col items-center justify-center p-12 overflow-hidden shadow-inner">
      <div className="relative flex gap-1.5 items-end h-64">
        {candles.map((c, i) => (
          <Candle key={i} {...c as any} className="w-3" />
        ))}

        {/* Range 1 Lines */}
        <div className="absolute top-[30%] left-[-20px] w-[calc(100%+40px)] h-[1px] border-t border-dashed border-zinc-500/40" />
        <div className="absolute bottom-[25%] left-[-20px] w-[calc(100%+40px)] h-[1px] border-t border-dashed border-zinc-500/40" />
        
        {/* Range 2 Lines */}
        <div className="absolute top-[15%] right-[-10px] w-[90px] h-[1px] border-t border-dashed border-zinc-500/60" />
        <div className="absolute top-[30%] right-[-10px] w-[90px] h-[1px] border-t border-dashed border-zinc-500/60" />

        {/* Range 1 Label */}
        <div className="absolute left-[-40px] top-[30%] bottom-[25%] flex flex-col items-center justify-center">
          <div className="w-[1px] h-full bg-zinc-500/40 relative">
            <div className="absolute top-0 left-[-3px] w-2 h-2 border-t border-l border-zinc-500/40 rotate-45" />
            <div className="absolute bottom-0 left-[-3px] w-2 h-2 border-b border-r border-zinc-500/40 rotate-45" />
          </div>
          <span className="absolute left-[-60px] text-[10px] italic text-zinc-500 whitespace-nowrap">Range 1</span>
        </div>

        {/* Range 2 Label */}
        <div className="absolute right-[-25px] top-[15%] bottom-[70%] flex flex-col items-center justify-center">
          <div className="w-[1px] h-full bg-zinc-500/60 relative">
            <div className="absolute top-0 left-[-3px] w-2 h-2 border-t border-l border-zinc-500/60 rotate-45" />
            <div className="absolute bottom-0 left-[-3px] w-2 h-2 border-b border-r border-zinc-500/60 rotate-45" />
          </div>
          <span className="absolute right-[-50px] text-[10px] italic text-zinc-500 whitespace-nowrap">Range 2</span>
        </div>

        {/* Step 1 Annotation - Index 18 */}
        <div className="absolute bottom-[-60px] left-[318px] flex flex-col items-center">
          <div className="w-6 h-24 border-2 border-blue-400/40 rounded-md mb-1" />
          <span className="text-2xl font-black text-white">1.</span>
        </div>

        {/* Step 2 Annotation - Index 19 */}
        <div className="absolute top-[-10px] left-[336px] flex flex-col items-center">
          <span className="text-2xl font-black text-white">2.</span>
          <div className="w-6 h-16 border-2 border-blue-400/40 rounded-md mt-1 flex items-start justify-center">
             <div className="w-3 h-3 border-2 border-red-500 rounded-full -mt-1.5 bg-[#050705]" />
          </div>
        </div>

        {/* Step 3 Annotation - Index 23 */}
        <div className="absolute top-[-60px] left-[408px] flex flex-col items-center">
          <span className="text-2xl font-black text-white">3.</span>
          <div className="w-6 h-20 border-2 border-blue-400/40 rounded-md mt-1" />
        </div>

        {/* Connecting Lines */}
        <div className="absolute bottom-[-100px] left-[330px] w-[1px] h-[100px] bg-blue-400/20" />
        <div className="absolute top-[-100px] left-[348px] w-[1px] h-[100px] bg-blue-400/20" />
        <div className="absolute top-[-140px] left-[420px] w-[1px] h-[80px] bg-blue-400/20" />

        {/* Text Boxes */}
        {/* Box 1: BREAKOUT */}
        <div className="absolute bottom-[-240px] left-[200px] w-72 p-4 bg-zinc-900/90 border border-blue-500/30 rounded-xl backdrop-blur-md z-20">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-500 px-2 py-0.5 text-[10px] font-black text-white rounded uppercase">{UNIT4_TEXT.breakoutTitle[lang]}</span>
          </div>
          <p className="text-[11px] text-zinc-300 leading-relaxed">
            {UNIT4_TEXT.breakoutDesc[lang]}
          </p>
        </div>

        {/* Box 2: BREAKOUT CONTINUATION */}
        <div className="absolute top-[-240px] left-[-150px] w-72 p-4 bg-zinc-900/90 border border-blue-500/30 rounded-xl backdrop-blur-md z-20">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-500 px-2 py-0.5 text-[10px] font-black text-white rounded uppercase">{UNIT4_TEXT.breakoutContTitle[lang]}</span>
          </div>
          <p className="text-[11px] text-zinc-300 leading-relaxed">
            {UNIT4_TEXT.breakoutContDesc[lang]}
          </p>
        </div>

        {/* Box 3: RANGE 2 BREAKOUT */}
        <div className="absolute top-[-200px] right-[-180px] w-72 p-4 bg-zinc-900/90 border border-blue-500/30 rounded-xl backdrop-blur-md z-20">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-500 px-2 py-0.5 text-[10px] font-black text-white rounded uppercase">{UNIT4_TEXT.range2BreakTitle[lang]}</span>
          </div>
          <p className="text-[11px] text-zinc-300 leading-relaxed">
            {UNIT4_TEXT.range2BreakDesc[lang]}
          </p>
        </div>
      </div>
    </div>
  );
};

export const BaseRangeChart: React.FC<{ lang: "zh" | "en" }> = ({ lang }) => {
  const baseCandles = [
    { open: 70, close: 80, high: 85, low: 65, tone: "white" },
    { open: 80, close: 65, high: 82, low: 60, tone: "black" },
    { open: 65, close: 70, high: 75, low: 60, tone: "white" },
    { open: 70, close: 60, high: 72, low: 55, tone: "black" },
    { open: 60, close: 65, high: 70, low: 55, tone: "white" },
    { open: 65, close: 55, high: 68, low: 50, tone: "black" },
    { open: 55, close: 65, high: 70, low: 50, tone: "white" },
    { open: 65, close: 75, high: 80, low: 60, tone: "white" },
    { open: 75, close: 70, high: 85, low: 65, tone: "black" },
    { open: 70, close: 85, high: 100, low: 65, tone: "white" },
  ];

  return (
    <div className="relative w-full h-80 bg-[#050705]/50 rounded-2xl border border-lime-500/20 flex flex-col items-center justify-center p-8 overflow-hidden shadow-inner">
      <div className="absolute top-4 left-4">
        <span className="px-2 py-1 bg-zinc-800 border border-zinc-700 text-[10px] font-black text-white uppercase tracking-widest rounded">
          {UNIT4_TEXT.baseRangeTitle[lang]}
        </span>
      </div>
      
      <div className="flex gap-2 items-end h-48">
        {baseCandles.map((c, i) => (
          <Candle key={i} {...c as any} className="w-5" />
        ))}
      </div>
      
      {/* Range Lines */}
      <div className="absolute top-[25%] left-0 w-full h-[1px] border-t border-dashed border-zinc-500/50" />
      <div className="absolute bottom-[25%] left-0 w-full h-[1px] border-t border-dashed border-zinc-500/50" />
      
      <div className="absolute left-[5%] top-[25%] bottom-[25%] w-[1px] border-l border-zinc-500/30 flex items-center justify-center">
        <div className="absolute top-0 left-[-3px] w-2 h-2 border-t border-l border-zinc-500/60 -rotate-45" />
        <div className="absolute bottom-0 left-[-3px] w-2 h-2 border-b border-l border-zinc-500/60 rotate-45" />
        <span className="absolute left-2 text-[10px] italic text-zinc-500 whitespace-nowrap">Range 1</span>
      </div>
    </div>
  );
};

export const PossibilityChart: React.FC<{ type: "A" | "B"; lang: "zh" | "en" }> = ({ type, lang }) => {
  const baseCandles = [
    { open: 70, close: 80, high: 85, low: 65, tone: "white" },
    { open: 80, close: 65, high: 82, low: 60, tone: "black" },
    { open: 65, close: 70, high: 75, low: 60, tone: "white" },
    { open: 70, close: 60, high: 72, low: 55, tone: "black" },
    { open: 60, close: 65, high: 70, low: 55, tone: "white" },
    { open: 65, close: 55, high: 68, low: 50, tone: "black" },
    { open: 55, close: 65, high: 70, low: 50, tone: "white" },
    { open: 65, close: 75, high: 80, low: 60, tone: "white" },
    { open: 75, close: 70, high: 85, low: 65, tone: "black" },
    { open: 70, close: 85, high: 100, low: 65, tone: "white" },
  ];

  const extraA = [
    { open: 85, close: 95, high: 100, low: 80, tone: "white" },
    { open: 95, close: 90, high: 105, low: 85, tone: "black" },
    { open: 90, close: 105, high: 110, low: 85, tone: "white" },
    { open: 105, close: 115, high: 120, low: 100, tone: "white" },
  ];

  const extraB = [
    { open: 85, close: 75, high: 90, low: 70, tone: "black" },
    { open: 75, close: 65, high: 80, low: 60, tone: "black" },
    { open: 65, close: 70, high: 75, low: 60, tone: "white" },
    { open: 70, close: 55, high: 72, low: 50, tone: "black" },
    { open: 55, close: 40, high: 60, low: 35, tone: "black" },
  ];

  const candles = [...baseCandles, ...(type === "A" ? extraA : extraB)];

  return (
    <div className="relative w-full h-80 bg-[#050705]/50 rounded-2xl border border-lime-500/20 flex flex-col items-center justify-center p-8 overflow-hidden shadow-inner">
      <div className="absolute top-4 left-4">
        <span className="px-2 py-1 bg-zinc-800 border border-zinc-700 text-[10px] font-black text-white uppercase tracking-widest rounded">
          {type === "A" ? UNIT4_TEXT.possibilityATitle[lang] : UNIT4_TEXT.possibilityBTitle[lang]}
        </span>
      </div>
      
      <div className="flex gap-1.5 items-end h-48">
        {candles.map((c, i) => (
          <Candle key={i} {...c as any} className="w-4" />
        ))}
      </div>
      
      {/* Range Lines */}
      <div className="absolute top-[25%] left-0 w-full h-[1px] border-t border-dashed border-zinc-500/50" />
      <div className="absolute bottom-[25%] left-0 w-full h-[1px] border-t border-dashed border-zinc-500/50" />
      
      {type === "A" ? (
        <div className="absolute top-[15%] right-[5%] flex flex-col items-center">
          <div className="w-5 h-5 border-2 border-blue-500 rounded-full mb-1" />
          <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">{UNIT4_TEXT.trueBreakoutTitle[lang]}</span>
        </div>
      ) : (
        <div className="absolute top-[15%] right-[25%] flex flex-col items-center">
          <div className="w-5 h-5 border-2 border-red-500 rounded-full mb-1" />
          <span className="text-[9px] font-black text-red-400 uppercase tracking-widest">{UNIT4_TEXT.liquidityGrabTitle[lang]}</span>
        </div>
      )}
    </div>
  );
};

export const TrafficLevelsChart: React.FC<{ lang: "zh" | "en" }> = ({ lang }) => {
  const historicalCandles = [
    { open: 60, close: 50, high: 65, low: 45, tone: "black" },
    { open: 50, close: 40, high: 55, low: 35, tone: "black" },
    { open: 40, close: 45, high: 50, low: 35, tone: "white" },
    { open: 45, close: 55, high: 60, low: 40, tone: "white" },
    { open: 55, close: 65, high: 70, low: 50, tone: "white" },
    { open: 65, close: 55, high: 68, low: 50, tone: "black" },
    { open: 55, close: 20, high: 60, low: 10, tone: "black" }, // Level 1 (long wick)
    { open: 20, close: 60, high: 65, low: 15, tone: "white" },
    { open: 60, close: 80, high: 85, low: 55, tone: "white" }, // Level 2
    { open: 80, close: 95, high: 100, low: 75, tone: "white" }, // Level 3
    { open: 95, close: 85, high: 105, low: 80, tone: "black" },
  ];

  const currentCandles = [
    { open: 35, close: 45, high: 50, low: 30, tone: "white" },
    { open: 45, close: 40, high: 55, low: 35, tone: "black" },
    { open: 40, close: 55, high: 60, low: 35, tone: "white" },
    { open: 55, close: 65, high: 70, low: 50, tone: "white" },
    { open: 65, close: 50, high: 68, low: 45, tone: "black" },
    { open: 50, close: 45, high: 55, low: 40, tone: "black" },
    { open: 45, close: 60, high: 65, low: 40, tone: "white" },
    { open: 60, close: 85, high: 90, low: 55, tone: "white" }, // Level 4 (peak)
    { open: 85, close: 70, high: 88, low: 65, tone: "black" },
    { open: 70, close: 60, high: 75, low: 55, tone: "black" },
    { open: 60, close: 65, high: 70, low: 55, tone: "white" },
    { open: 65, close: 55, high: 70, low: 50, tone: "black" },
    { open: 55, close: 65, high: 70, low: 50, tone: "white" },
    { open: 65, close: 55, high: 70, low: 50, tone: "black" },
    { open: 55, close: 20, high: 60, low: 10, tone: "white", highlight: true }, // Level 5/6 (long wick)
    { open: 20, close: 70, high: 75, low: 15, tone: "white" },
    { open: 70, close: 95, high: 100, low: 65, tone: "white" }, // Level 7
    { open: 95, close: 85, high: 105, low: 80, tone: "black" },
  ];

  return (
    <div className="space-y-8">
      <div className="relative w-full h-[500px] bg-[#050705]/50 rounded-2xl border border-lime-500/20 p-12 overflow-hidden shadow-inner flex flex-col">
        {/* Titles */}
        <div className="absolute top-6 left-0 w-full flex justify-around px-12">
          <span className="text-sm font-black text-white uppercase tracking-widest bg-zinc-800/80 px-3 py-1 rounded border border-zinc-700">
            {UNIT4_TEXT.historicalPriceTitle[lang]}
          </span>
          <span className="text-sm font-black text-white uppercase tracking-widest bg-zinc-800/80 px-3 py-1 rounded border border-zinc-700">
            {UNIT4_TEXT.currentPriceTitle[lang]}
          </span>
        </div>

        {/* Chart Area */}
        <div className="relative flex-1 flex items-end justify-between px-12 pt-16">
          {/* Historical Data Section */}
          <div className="flex gap-2 items-end h-[300px]">
            {historicalCandles.map((c, i) => (
              <Candle key={`hist-${i}`} {...c as any} className="w-5" />
            ))}
          </div>

          {/* Current Data Section */}
          <div className="flex gap-2 items-end h-[300px]">
            {currentCandles.map((c, i) => (
              <div key={`curr-wrap-${i}`} className="relative h-full">
                {c.highlight && (
                  <div className="absolute inset-x-[-4px] top-[-20px] bottom-[-20px] bg-blue-400/10 border-x border-blue-400/30 rounded-sm z-0" />
                )}
                <Candle {...c as any} className="w-5 relative z-10" />
              </div>
            ))}
          </div>

          {/* Horizontal Levels */}
          {/* Top Level */}
          <div className="absolute top-[10%] left-0 w-full h-[1px] border-t border-dashed border-zinc-500/40 z-0">
            <span className="absolute right-4 top-[-15px] text-[9px] italic text-zinc-500">candle expectation</span>
          </div>
          {/* Middle High Level */}
          <div className="absolute top-[35%] left-0 w-full h-[1px] border-t border-dashed border-zinc-500/40 z-0" />
          {/* Middle Low Level */}
          <div className="absolute top-[65%] left-0 w-full h-[1px] border-t border-dashed border-zinc-500/40 z-0" />
          {/* Bottom Level */}
          <div className="absolute top-[90%] left-0 w-full h-[1px] border-t border-dashed border-zinc-500/40 z-0" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { title: UNIT4_TEXT.historicLiquidityTitle[lang], desc: UNIT4_TEXT.historicLiquidityDesc[lang] },
          { title: UNIT4_TEXT.historicBreakoutTitle[lang], desc: UNIT4_TEXT.historicBreakoutDesc[lang] },
          { title: UNIT4_TEXT.historicRangeFillTitle[lang], desc: UNIT4_TEXT.historicRangeFillDesc[lang] },
          { title: UNIT4_TEXT.currentStruggleTitle[lang], desc: UNIT4_TEXT.currentStruggleDesc[lang] },
          { title: UNIT4_TEXT.currentLiquidityTitle[lang], desc: UNIT4_TEXT.currentLiquidityDesc[lang] },
          { title: UNIT4_TEXT.imperfectPriceTitle[lang], desc: UNIT4_TEXT.imperfectPriceDesc[lang] },
        ].map((box, i) => (
          <div key={i} className="p-4 bg-zinc-900/80 border border-lime-500/20 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-lime-500 px-1.5 py-0.5 text-[9px] font-black text-black uppercase">{box.title}</span>
            </div>
            <p className="text-[10px] text-zinc-300 leading-relaxed">
              {box.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
