"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MessageSquare, Clock, Eye, ShieldAlert, Heart, Bookmark as BookmarkIcon, Loader2 } from "lucide-react";
import { formatRelativeTime } from "@/lib/bbs/utils";

type Post = {
  id: number;
  title: string;
  content: string;
  viewCount: number;
  replyCount: number;
  likeCount: number;
  isLiked: boolean;
  createdAt: string;
  bookmarkedAt: string;
  category: { id: number; name: string; slug: string };
  author: { id: string; name: string; image: string | null; role: string };
};

export default function BookmarksPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      fetchBookmarks();
    }
  }, [status, router]);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/bbs/bookmarks/list");
      const json = await res.json();
      
      if (json.success) {
        setPosts(json.data);
      } else {
        setError(json.message || "获取收藏失败");
      }
    } catch (err) {
      setError("网络错误");
    } finally {
      setLoading(false);
    }
  };

  const getCategoryStyle = (categoryId: number) => {
    const colors: Record<number, string> = {
      1: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      2: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      3: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      4: "bg-rose-500/10 text-rose-400 border-rose-500/20",
      5: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    };
    return colors[categoryId] || "bg-slate-800 text-slate-300 border-slate-700";
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 text-[#00bfa5] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-amber-500/10 rounded-lg">
          <BookmarkIcon className="w-5 h-5 text-amber-500" />
        </div>
        <h1 className="text-2xl font-bold text-white">我的收藏</h1>
        <span className="text-slate-500 text-sm ml-2">共 {posts.length} 篇</span>
      </div>

      <div className="space-y-4">
        {loading ? (
          [1, 2, 3].map((i) => (
            <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 animate-pulse">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="h-5 bg-slate-800 rounded w-3/4" />
                  <div className="h-4 bg-slate-800 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))
        ) : error ? (
          <div className="text-center py-12 text-rose-400 bg-rose-500/10 rounded-xl border border-rose-500/20">
            <ShieldAlert className="w-8 h-8 mx-auto mb-2 opacity-80" />
            <p>{error}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 border border-slate-800 rounded-xl">
            <BookmarkIcon className="w-12 h-12 text-slate-700 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-300 mb-1">暂无收藏</h3>
            <p className="text-slate-500 text-sm mb-6">你还没有收藏任何帖子</p>
            <Link href="/bbs">
              <button className="px-6 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors">
                去社区逛逛
              </button>
            </Link>
          </div>
        ) : (
          posts.map((post) => (
            <Link href={`/bbs/post/${post.id}`} key={post.id} className="block group">
              <div className="bg-slate-900/40 border border-slate-800 hover:border-slate-700 rounded-xl p-5 transition-all hover:bg-slate-800/40">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 mt-1">
                    {post.author.image ? (
                      <img src={post.author.image} alt={post.author.name} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 text-slate-400 font-medium">
                        {post.author.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getCategoryStyle(post.category.id)}`}>
                        {post.category.name}
                      </span>
                      <h2 className="text-lg font-semibold text-slate-200 group-hover:text-[#00bfa5] transition-colors truncate">
                        {post.title}
                      </h2>
                    </div>

                    <p className="text-sm text-slate-400 line-clamp-2 mb-3">
                      {post.content}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <span className={post.author.role === 'vip' ? 'text-amber-400' : 'text-slate-300'}>
                          {post.author.name}
                        </span>
                      </span>
                      <span className="flex items-center gap-1" title="发布时间">
                        <Clock className="w-3.5 h-3.5" />
                        {formatRelativeTime(post.createdAt)}
                      </span>
                      <span className="flex items-center gap-1 text-amber-500/70" title="收藏时间">
                        <BookmarkIcon className="w-3.5 h-3.5" />
                        {formatRelativeTime(post.bookmarkedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        {post.viewCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5" />
                        {post.replyCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className={`w-3.5 h-3.5 ${post.isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                        {post.likeCount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
