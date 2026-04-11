"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, CalendarCheck, Bookmark, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { MonthlyTopPosts } from "@/app/bbs/components/monthly-top-posts";

export default function BBSLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navItems = [
    { name: "社区首页", href: "/bbs", icon: MessageSquare },
    { name: "打卡签到", href: "/bbs/checkin", icon: CalendarCheck },
    { name: "我的收藏", href: "/bbs/bookmarks", icon: Bookmark },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-[#00bfa5]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* BBS Header & Sub-nav */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 whitespace-nowrap px-1 py-2 border-b-2 font-medium transition-colors ${
                    isActive
                      ? "border-[#00bfa5] text-[#00bfa5]"
                      : "border-transparent text-slate-400 hover:text-white hover:border-slate-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {session?.user && (
            <div className="flex items-center gap-3">
              <Link href="/bbs/profile" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                {session.user.image ? (
                  <img src={session.user.image} alt="" className="w-6 h-6 rounded-full" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center">
                    <User className="w-3 h-3" />
                  </div>
                )}
                <span>社区档案</span>
              </Link>
            </div>
          )}
        </div>

        {/* Page Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area (3 columns wide on large screens) */}
          <div className="lg:col-span-3">
            {children}
          </div>

          {/* Sidebar Area (1 column wide) */}
          <div className="hidden lg:block space-y-6">
            {/* Action Card */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white mb-2">量化逻辑实验室</h3>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                在这里分享你的量化感悟、回测记录与算法策略。坚持打卡，见证你的代码成长轨迹。
              </p>
              <Link href="/bbs/post/new" className="block w-full">
                <button className="w-full bg-[#00bfa5] hover:bg-emerald-400 text-slate-950 font-bold h-10 rounded-lg transition-all flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  发布新帖
                </button>
              </Link>
            </div>

            {/* Monthly Top Posts */}
            <MonthlyTopPosts />
          </div>
        </div>

      </div>
    </div>
  );
}
