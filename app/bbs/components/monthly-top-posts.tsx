"use client";

import { useState, useEffect } from "react";
import { Flame, Heart, Loader2 } from "lucide-react";
import Link from "next/link";

type TopPost = {
  id: number;
  title: string;
  authorName: string;
  likeCount: number;
};

export function MonthlyTopPosts() {
  const [posts, setPosts] = useState<TopPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopPosts = async () => {
      try {
        const res = await fetch("/api/bbs/posts/top");
        const json = await res.json();
        if (json.success) {
          setPosts(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch top posts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopPosts();
  }, []);

  if (loading) {
    return (
      <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
          <Flame className="w-5 h-5 text-rose-500" />
          <h3 className="font-semibold text-white">本月热帖 TOP 10</h3>
        </div>
        <div className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 text-slate-500 animate-spin" />
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return null; // Don't show if no posts
  }

  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
        <Flame className="w-5 h-5 text-rose-500" />
        <h3 className="font-semibold text-white">本月热帖 TOP 10</h3>
      </div>
      
      <div className="space-y-4">
        {posts.map((post, idx) => (
          <Link 
            href={`/bbs/post/${post.id}`} 
            key={post.id}
            prefetch={false}
            className="flex items-start gap-3 group"
          >
            <span className={`text-sm font-bold mt-0.5 ${
              idx === 0 ? "text-rose-500" :
              idx === 1 ? "text-amber-500" :
              idx === 2 ? "text-amber-300" :
              "text-slate-600"
            }`}>
              {idx + 1}
            </span>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm text-slate-300 group-hover:text-[#00bfa5] transition-colors truncate mb-1">
                {post.title}
              </h4>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="truncate">{post.authorName}</span>
                <span className="flex items-center gap-1 shrink-0">
                  <Heart className="w-3 h-3 text-rose-500/70" />
                  {post.likeCount}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
