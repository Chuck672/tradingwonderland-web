import React from "react";
import { cn } from "@/utils/cn";
import { UI, UNIT3_TEXT } from "../App";

interface CandleProps {
  open: number;
  close: number;
  high: number;
  low: number;
  isGray?: boolean;
  className?: string;
}

const Candle: React.FC<CandleProps> = ({ open, close, high, low, className }) => {
  const isBullish = close > open;
  const top = Math.max(open, close);
  const bottom = Math.min(open, close);
  const bodyHeight = Math.max(top - bottom, 1.5);

  // Unified with site style: Lime for bullish, Red for bearish
  const colors = isBullish
    ? { body: "bg-[#84cc16]", border: "border-[#a3e635]/20", wick: "bg-[#84cc16]" }
    : { body: "bg-[#ef4444]", border: "border-[#f87171]/20", wick: "bg-[#ef4444]" };

  return (
    <div className={cn("relative flex flex-col items-center w-3 h-full group", className)}>
      {/* Wick */}
      <div
        className={cn("absolute w-[1px] transition-opacity duration-300 opacity-60", colors.wick)}
        style={{
          top: `${100 - high}%`,
          height: `${high - low}%`,
        }}
      />
      {/* Body */}
      <div
        className={cn(
          "absolute w-full border rounded-[1px] transition-all duration-300 shadow-[0_0_8px_rgba(0,0,0,0.3)] opacity-100",
          colors.body,
          colors.border,
          "group-hover:scale-110 group-hover:shadow-[0_0_12px_rgba(132,204,22,0.2)]"
        )}
        style={{
          top: `${100 - top}%`,
          height: `${bodyHeight}%`,
        }}
      />
    </div>
  );
};

export const Unit3OverviewChart: React.FC<{ lang: 'zh' | 'en' }> = ({ lang }) => {
  const candles = [
    // Drive
    { open: 85, close: 75, high: 90, low: 70 },
    { open: 75, close: 80, high: 85, low: 70 },
    { open: 80, close: 65, high: 85, low: 60 },
    { open: 65, close: 50, high: 70, low: 45 },
    { open: 50, close: 35, high: 55, low: 30 },
    // Transition
    { open: 35, close: 45, high: 50, low: 30 },
    { open: 45, close: 40, high: 55, low: 35 },
    { open: 40, close: 35, high: 45, low: 30 },
    // Range
    { open: 35, close: 55, high: 60, low: 30 },
    { open: 55, close: 45, high: 65, low: 40 },
    { open: 45, close: 50, high: 55, low: 40 },
    { open: 50, close: 40, high: 60, low: 35 },
    { open: 40, close: 35, high: 45, low: 25 },
    { open: 35, close: 45, high: 50, low: 30 },
    { open: 45, close: 40, high: 55, low: 35 },
    { open: 40, close: 50, high: 55, low: 35 },
    { open: 50, close: 45, high: 60, low: 40 },
    { open: 45, close: 40, high: 50, low: 35 },
    // Transition
    { open: 40, close: 55, high: 60, low: 35 },
    { open: 55, close: 65, high: 70, low: 50 },
    // Liquidity
    { open: 65, close: 90, high: 95, low: 60 },
    { open: 90, close: 60, high: 95, low: 55 },
    { open: 60, close: 45, high: 65, low: 40 },
    { open: 45, close: 30, high: 50, low: 25 },
    { open: 30, close: 35, high: 40, low: 25 },
    { open: 35, close: 25, high: 40, low: 20 },
  ];

  return (
    <div className="relative w-full h-80 bg-[#050705]/50 rounded-2xl border border-lime-500/20 flex items-center justify-center p-8 overflow-hidden shadow-inner">
      <div className="flex gap-1.5 items-end h-full">
        {candles.map((c, i) => (
          <Candle key={i} {...c} />
        ))}
      </div>

      {/* Boxes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Drive Box */}
        <div className="absolute top-[10%] left-[15%] w-[15%] h-[70%] border border-red-500/50 rounded-lg">
          <span className="absolute -top-6 left-0 text-[10px] font-bold text-red-400 uppercase tracking-widest">{UNIT3_TEXT.driveTitle[lang]}</span>
        </div>
        {/* Range Box */}
        <div className="absolute top-[40%] left-[31%] w-[33%] h-[55%] border border-lime-500/50 rounded-lg">
          <span className="absolute -top-6 left-0 text-[10px] font-bold text-lime-400 uppercase tracking-widest">{UNIT3_TEXT.rangeTitle[lang]}</span>
        </div>
        {/* Liquidity Box */}
        <div className="absolute top-[10%] left-[65%] w-[20%] h-[75%] border border-blue-500/50 rounded-lg">
          <span className="absolute -top-6 left-0 text-[10px] font-bold text-blue-400 uppercase tracking-widest">{UNIT3_TEXT.liquidityTitle[lang]}</span>
        </div>
      </div>
    </div>
  );
};

export const Unit3DriveChart: React.FC<{ lang: 'zh' | 'en' }> = ({ lang }) => {
  const candles = [
    { open: 85, close: 75, high: 90, low: 70 },
    { open: 75, close: 80, high: 85, low: 70 },
    { open: 80, close: 65, high: 85, low: 60 },
    { open: 65, close: 50, high: 70, low: 45 },
    { open: 50, close: 35, high: 55, low: 30 },
    // Grayed out
    { open: 35, close: 45, high: 50, low: 30, isGray: true },
    { open: 45, close: 40, high: 55, low: 35, isGray: true },
    { open: 40, close: 35, high: 45, low: 30, isGray: true },
    { open: 35, close: 55, high: 60, low: 30, isGray: true },
    { open: 55, close: 45, high: 65, low: 40, isGray: true },
    { open: 45, close: 50, high: 55, low: 40, isGray: true },
    { open: 50, close: 40, high: 60, low: 35, isGray: true },
    { open: 40, close: 35, high: 45, low: 25, isGray: true },
    { open: 35, close: 45, high: 50, low: 30, isGray: true },
    { open: 45, close: 40, high: 55, low: 35, isGray: true },
    { open: 40, close: 50, high: 55, low: 35, isGray: true },
    { open: 50, close: 45, high: 60, low: 40, isGray: true },
    { open: 45, close: 40, high: 50, low: 35, isGray: true },
  ];

  return (
    <div className="relative w-full h-80 bg-[#050705]/50 rounded-2xl border border-lime-500/20 flex items-center justify-center p-8 overflow-hidden shadow-inner">
      <div className="flex gap-1.5 items-end h-full">
        {candles.map((c, i) => (
          <Candle key={i} {...c} />
        ))}
      </div>
      <div className="absolute top-[10%] left-[26%] w-[15%] h-[70%] border border-red-500/50 rounded-lg pointer-events-none">
        <span className="absolute -top-6 left-0 text-[10px] font-bold text-red-400 uppercase tracking-widest">{UNIT3_TEXT.driveTitle[lang]}</span>
      </div>
    </div>
  );
};

export const Unit3RangeChart: React.FC<{ lang: 'zh' | 'en' }> = ({ lang }) => {
  const candles = [
    // Grayed out
    { open: 85, close: 75, high: 90, low: 70, isGray: true },
    { open: 75, close: 80, high: 85, low: 70, isGray: true },
    { open: 80, close: 65, high: 85, low: 60, isGray: true },
    { open: 65, close: 50, high: 70, low: 45, isGray: true },
    { open: 50, close: 35, high: 55, low: 30, isGray: true },
    { open: 35, close: 45, high: 50, low: 30, isGray: true },
    { open: 45, close: 40, high: 55, low: 35, isGray: true },
    { open: 40, close: 35, high: 45, low: 30, isGray: true },
    // Range
    { open: 35, close: 55, high: 60, low: 30 },
    { open: 55, close: 45, high: 65, low: 40 },
    { open: 45, close: 50, high: 55, low: 40 },
    { open: 50, close: 40, high: 60, low: 35 },
    { open: 40, close: 35, high: 45, low: 25 },
    { open: 35, close: 45, high: 50, low: 30 },
    { open: 45, close: 40, high: 55, low: 35 },
    { open: 40, close: 50, high: 55, low: 35 },
    { open: 50, close: 45, high: 60, low: 40 },
    { open: 45, close: 40, high: 50, low: 35 },
    // Grayed out
    { open: 40, close: 55, high: 60, low: 35, isGray: true },
    { open: 55, close: 65, high: 70, low: 50, isGray: true },
  ];

  return (
    <div className="relative w-full h-80 bg-[#050705]/50 rounded-2xl border border-lime-500/20 flex items-center justify-center p-8 overflow-hidden shadow-inner">
      <div className="flex gap-1.5 items-end h-full">
        {candles.map((c, i) => (
          <Candle key={i} {...c} />
        ))}
      </div>
      <div className="absolute top-[40%] left-[38%] w-[45%] h-[55%] border border-lime-500/50 rounded-lg pointer-events-none">
        <span className="absolute -top-6 left-0 text-[10px] font-bold text-lime-400 uppercase tracking-widest">{UNIT3_TEXT.rangeTitle[lang]}</span>
      </div>
    </div>
  );
};

export const Unit3LiquidityChart: React.FC<{ lang: 'zh' | 'en' }> = ({ lang }) => {
  const candles = [
    // Grayed out
    { open: 85, close: 75, high: 90, low: 70, isGray: true },
    { open: 75, close: 80, high: 85, low: 70, isGray: true },
    { open: 80, close: 65, high: 85, low: 60, isGray: true },
    { open: 65, close: 50, high: 70, low: 45, isGray: true },
    { open: 50, close: 35, high: 55, low: 30, isGray: true },
    { open: 35, close: 45, high: 50, low: 30, isGray: true },
    { open: 45, close: 40, high: 55, low: 35, isGray: true },
    { open: 40, close: 35, high: 45, low: 30, isGray: true },
    { open: 35, close: 55, high: 60, low: 30, isGray: true },
    { open: 55, close: 45, high: 65, low: 40, isGray: true },
    { open: 45, close: 50, high: 55, low: 40, isGray: true },
    { open: 50, close: 40, high: 60, low: 35, isGray: true },
    { open: 40, close: 35, high: 45, low: 25, isGray: true },
    { open: 35, close: 45, high: 50, low: 30, isGray: true },
    { open: 45, close: 40, high: 55, low: 35, isGray: true },
    { open: 40, close: 50, high: 55, low: 35, isGray: true },
    { open: 50, close: 45, high: 60, low: 40, isGray: true },
    { open: 45, close: 40, high: 50, low: 35, isGray: true },
    { open: 40, close: 55, high: 60, low: 35, isGray: true },
    { open: 55, close: 65, high: 70, low: 50, isGray: true },
    // Liquidity
    { open: 65, close: 90, high: 95, low: 60 },
    { open: 90, close: 60, high: 95, low: 55 },
    { open: 60, close: 45, high: 65, low: 40 },
    { open: 45, close: 30, high: 50, low: 25 },
    { open: 30, close: 35, high: 40, low: 25 },
    { open: 35, close: 25, high: 40, low: 20 },
  ];

  return (
    <div className="relative w-full min-h-[450px] bg-[#050705]/50 rounded-2xl border border-lime-500/20 flex flex-col lg:flex-row items-center justify-center p-8 gap-12 overflow-hidden shadow-inner">
      {/* Chart Area */}
      <div className="relative flex gap-1.5 items-end h-64 shrink-0">
        {candles.map((c, i) => (
          <Candle key={i} {...c} />
        ))}
        
        {/* Fakeout Box */}
        <div className="absolute top-[-5%] right-[72px] w-[42px] h-[65%] border border-red-500/60 rounded-lg pointer-events-none shadow-[0_0_15px_rgba(239,68,68,0.2)]" />
        
        {/* Continuation Box */}
        <div className="absolute top-[45%] right-[-10px] w-[78px] h-[50%] border border-blue-500/60 rounded-lg pointer-events-none shadow-[0_0_15px_rgba(59,130,246,0.2)]" />
        
        {/* Labels near boxes */}
        <div className="absolute top-[-15%] right-[72px] flex flex-col items-start">
           <span className="bg-white/10 px-1.5 py-0.5 text-[9px] font-bold text-zinc-400 uppercase leading-none rounded-sm mb-1">{UI.setupsToLookFor[lang]}</span>
           <span className="text-[9px] text-zinc-500 uppercase leading-none">{UI.breakoutsFakeouts[lang]}</span>
        </div>
        <div className="absolute bottom-[-15%] right-[-10px] flex flex-col items-start">
           <span className="bg-white/10 px-1.5 py-0.5 text-[9px] font-bold text-zinc-400 uppercase leading-none rounded-sm mb-1">{UI.setupsToLookFor[lang]}</span>
           <span className="text-[9px] text-zinc-500 uppercase leading-none">{UI.breakoutsFakeouts[lang]}</span>
        </div>
      </div>

      {/* Description Area */}
      <div className="flex flex-col gap-8 max-w-lg">
        {/* Fakeout Text */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
            <h4 className="text-sm font-bold text-red-400 uppercase tracking-wider">{UNIT3_TEXT.liquidityFakeoutTitle[lang]}</h4>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed italic">
            {UNIT3_TEXT.liquidityFakeoutDesc[lang]}
          </p>
        </div>

        {/* Continuation Text */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider">{UNIT3_TEXT.liquidityContinuationTitle[lang]}</h4>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed italic">
            {UNIT3_TEXT.liquidityContinuationDesc[lang]}
          </p>
        </div>
      </div>
    </div>
  );
};

export const HtfDriveChart: React.FC = () => {
  const candles = [
    { open: 85, close: 75, high: 90, low: 70 },
    { open: 75, close: 60, high: 80, low: 55 },
    { open: 60, close: 40, high: 65, low: 35 },
  ];
  return (
    <div className="w-24 h-48 bg-[#050705]/80 rounded-xl border border-lime-500/20 flex items-center justify-center p-4 shadow-lg">
      <div className="flex gap-1 items-end h-full">
        {candles.map((c, i) => (
          <Candle key={i} {...c} className="w-3" />
        ))}
      </div>
    </div>
  );
};

export const HtfRangeChart: React.FC = () => {
  const candles = [
    { open: 40, close: 60, high: 80, low: 30 },
    { open: 60, close: 40, high: 80, low: 30 },
  ];
  return (
    <div className="w-24 h-48 bg-[#050705]/80 rounded-xl border border-lime-500/20 flex items-center justify-center p-4 shadow-lg">
      <div className="flex gap-1 items-end h-full">
        {candles.map((c, i) => (
          <Candle key={i} {...c} className="w-3" />
        ))}
      </div>
    </div>
  );
};

export const HtfFakeoutChart: React.FC = () => {
  const candles = [
    { open: 40, close: 50, high: 55, low: 35 },
    { open: 50, close: 40, high: 90, low: 35 },
    { open: 40, close: 20, high: 45, low: 15 },
  ];
  return (
    <div className="w-24 h-48 bg-[#050705]/80 rounded-xl border border-lime-500/20 flex items-center justify-center p-4 shadow-lg">
      <div className="flex gap-1 items-end h-full">
        {candles.map((c, i) => (
          <Candle key={i} {...c} className="w-3" />
        ))}
      </div>
    </div>
  );
};
