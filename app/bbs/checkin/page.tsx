"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Trophy, Flame, Target, Loader2, Clock, CalendarCheck } from "lucide-react";
import Link from "next/link";
import { CheckinRanking } from "@/app/bbs/components/checkin-ranking";

type CheckinData = {
  hasCheckedInToday: boolean;
  currentStreak: number;
  totalCheckins: number;
  maxStreak: number;
  recentCheckins: Array<{
    date: string;
    note: string | null;
    streakDays: number;
  }>;
};

export default function CheckinPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [data, setData] = useState<CheckinData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      fetchCheckinData();
    }
  }, [status]);

  const fetchCheckinData = async () => {
    try {
      const res = await fetch("/api/bbs/checkin");
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      } else {
        setError("加载打卡数据失败");
      }
    } catch (err) {
      setError("网络错误");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/bbs/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note }),
      });
      const json = await res.json();
      
      if (json.success) {
        // Refresh data to show new checkin
        await fetchCheckinData();
        setNote("");
      } else {
        setError(json.message || "打卡失败");
      }
    } catch (err) {
      setError("网络错误");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to generate the current month's calendar grid
  const renderCalendar = () => {
    if (!data) return null;

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    
    // First day of month
    const firstDay = new Date(year, month, 1);
    const startingDayOfWeek = firstDay.getDay(); // 0 is Sunday
    
    // Last day of month
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();

    const checkinDates = new Set(data.recentCheckins.map(c => c.date));

    const grid = [];
    
    // Empty cells for days before the 1st
    for (let i = 0; i < startingDayOfWeek; i++) {
      grid.push(<div key={`empty-${i}`} className="w-8 h-8 rounded bg-slate-900/50 border border-slate-800/50" />);
    }

    // Days of the month
    for (let day = 1; day <= totalDays; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isCheckedIn = checkinDates.has(dateStr);
      const isToday = day === today.getDate();

      grid.push(
        <div 
          key={day} 
          title={dateStr}
          className={`w-8 h-8 rounded flex items-center justify-center text-xs font-medium border transition-colors ${
            isCheckedIn 
              ? "bg-[#00bfa5]/20 text-[#00bfa5] border-[#00bfa5]/30 shadow-[0_0_10px_rgba(0,191,165,0.1)]" 
              : isToday
                ? "bg-slate-800 text-white border-slate-600"
                : "bg-slate-900/80 text-slate-500 border-slate-800"
          }`}
        >
          {day}
        </div>
      );
    }

    return (
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <CalendarCheck className="w-4 h-4 text-slate-400" />
            {year}年 {month + 1}月
          </h3>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-medium text-slate-500">
          <div>日</div><div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {grid}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-[#00bfa5] animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Flame className="w-32 h-32 text-[#00bfa5]" />
          </div>
          <p className="text-sm text-slate-400 mb-2 font-medium flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#00bfa5]" />
            当前连续打卡
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-white">{data?.currentStreak || 0}</span>
            <span className="text-slate-500 text-sm">天</span>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6">
          <p className="text-sm text-slate-400 mb-2 font-medium flex items-center gap-2">
            <Target className="w-4 h-4 text-purple-400" />
            累计打卡
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-white">{data?.totalCheckins || 0}</span>
            <span className="text-slate-500 text-sm">天</span>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6">
          <p className="text-sm text-slate-400 mb-2 font-medium flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            历史最高连续
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-white">{data?.maxStreak || 0}</span>
            <span className="text-slate-500 text-sm">天</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Checkin Form & Calendar */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 md:p-8 flex flex-col h-full lg:col-span-1">
          {data?.hasCheckedInToday ? (
            <div className="bg-[#00bfa5]/10 border border-[#00bfa5]/20 rounded-xl p-8 text-center mb-8">
              <div className="w-16 h-16 bg-[#00bfa5]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarCheck className="w-8 h-8 text-[#00bfa5]" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">今日已打卡</h2>
              <p className="text-slate-400 text-sm">量化在于长期的坚持与复盘，明天继续保持！</p>
            </div>
          ) : (
            <form onSubmit={handleCheckin} className="mb-8 space-y-4">
              <h2 className="text-lg font-bold text-white mb-4">记录今日量化感悟</h2>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="写下今天的量化总结或回测感悟（选填）..."
                rows={4}
                maxLength={500}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00bfa5] transition-colors resize-y"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#00bfa5] hover:bg-emerald-400 text-slate-950 font-bold h-12 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <CalendarCheck className="w-5 h-5" />}
                {isSubmitting ? "打卡中..." : "立即打卡"}
              </button>
            </form>
          )}

          <div className="mt-auto border-t border-slate-800/50 pt-4">
            {renderCalendar()}
          </div>
        </div>

        {/* Recent Checkins List */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden h-[600px] flex flex-col lg:col-span-1">
          <div className="p-4 border-b border-slate-800 bg-slate-900/60 sticky top-0">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              最近 30 天记录
            </h3>
          </div>
          <div className="overflow-y-auto p-4 space-y-4 no-scrollbar">
            {!data?.recentCheckins || data.recentCheckins.length === 0 ? (
              <div className="text-center py-10 text-slate-500 text-sm">
                还没有打卡记录，今天就开始吧！
              </div>
            ) : (
              data.recentCheckins.map((record, idx) => (
                <div key={idx} className="bg-slate-950/50 border border-slate-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-300">{record.date}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      连续 {record.streakDays} 天
                    </span>
                  </div>
                  {record.note ? (
                    <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-wrap">
                      {record.note}
                    </p>
                  ) : (
                    <p className="text-sm text-slate-600 italic">
                      未填写感悟
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Checkin Ranking */}
        <div className="lg:col-span-1">
          <CheckinRanking />
        </div>
      </div>
    </div>
  );
}
