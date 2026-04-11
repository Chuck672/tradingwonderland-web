"use client";

import { useState, useEffect } from "react";
import { Trophy, Flame, Target, Loader2 } from "lucide-react";
import Link from "next/link";

type RankingItem = {
  rank: number;
  userId: string;
  name: string;
  image: string | null;
  role: string;
  score: number;
};

export function CheckinRanking() {
  const [type, setType] = useState<"streak" | "total">("streak");
  const [ranking, setRanking] = useState<RankingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRanking();
  }, [type]);

  const fetchRanking = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/bbs/ranking?type=${type}`);
      const json = await res.json();
      if (json.success) {
        setRanking(json.data);
      }
    } catch (err) {
      console.error("Failed to fetch ranking", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-[600px]">
      <div className="p-4 border-b border-slate-800 bg-slate-900/60 sticky top-0 z-10 flex flex-col gap-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400" />
          打卡排行榜 TOP 20
        </h3>
        
        {/* Toggle Tabs */}
        <div className="flex bg-slate-950 p-1 rounded-lg">
          <button
            onClick={() => setType("streak")}
            className={`flex-1 text-xs py-1.5 rounded-md font-medium transition-all ${
              type === "streak" 
                ? "bg-slate-800 text-[#00bfa5] shadow-sm" 
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            连续打卡
          </button>
          <button
            onClick={() => setType("total")}
            className={`flex-1 text-xs py-1.5 rounded-md font-medium transition-all ${
              type === "total" 
                ? "bg-slate-800 text-purple-400 shadow-sm" 
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            累计打卡
          </button>
        </div>
      </div>

      <div className="overflow-y-auto p-4 space-y-3 no-scrollbar flex-1">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="w-6 h-6 text-slate-500 animate-spin" />
          </div>
        ) : ranking.length === 0 ? (
          <div className="text-center py-10 text-slate-500 text-sm">
            暂无数据
          </div>
        ) : (
          ranking.map((item, idx) => (
            <div 
              key={item.userId} 
              className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                idx < 3 
                  ? "bg-slate-900/80 border-slate-700/50" 
                  : "bg-slate-950/30 border-transparent hover:border-slate-800"
              }`}
            >
              {/* Rank Badge */}
              <div className={`w-6 text-center font-bold text-sm ${
                idx === 0 ? "text-amber-400" :
                idx === 1 ? "text-slate-300" :
                idx === 2 ? "text-amber-700" :
                "text-slate-600"
              }`}>
                {idx + 1}
              </div>

              {/* Avatar */}
              <div className="shrink-0">
                {item.image ? (
                  <img src={item.image} alt="" className="w-8 h-8 rounded-full border border-slate-700" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 text-xs font-bold">
                    {item.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-200 truncate flex items-center gap-1.5">
                  <span className={item.role === 'vip' ? 'text-amber-400' : 'text-slate-300'}>
                    {item.name}
                  </span>
                  {item.role === 'vip' && (
                    <span className="text-[9px] px-1 rounded bg-amber-500/10 text-amber-500">PRO</span>
                  )}
                </div>
              </div>

              {/* Score */}
              <div className="text-right shrink-0 flex items-center gap-1.5">
                <span className="font-bold text-white">{item.score}</span>
                <span className="text-[10px] text-slate-500">天</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
