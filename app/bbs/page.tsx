"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Pin, MessageSquare, Clock, Eye, ShieldAlert, Heart, Search, X, ArrowDownWideNarrow } from "lucide-react";
import { formatRelativeTime } from "@/lib/bbs/utils";

// Types
type Category = {
  id: number;
  name: string;
  slug: string;
};

type Post = {
  id: number;
  title: string;
  content: string;
  viewCount: number;
  isPinned: boolean;
  createdAt: string;
  replyCount: number;
  category: Category;
  author: {
    id: string;
    name: string;
    image: string | null;
    role: string;
  };
};

export default function BBSHomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "likes" | "replies" | "views">("latest");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // Categories definition
  const categories = [
    { id: null, name: "全部", color: "bg-slate-800 text-white border-slate-700" },
    { id: 1, name: "技术分析", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    { id: 2, name: "工具开发", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    { id: 3, name: "答疑解惑", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
    { id: 4, name: "心得体会", color: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
    { id: 5, name: "社区通知", color: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
  ];

  // Handle click outside for sort dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [activeCategory, sortBy]);

  const fetchPosts = async (query: string = searchQuery) => {
    try {
      setLoading(true);
      setError("");
      
      let url = `/api/bbs/posts?sortBy=${sortBy}&`;
      if (activeCategory) {
        url += `categoryId=${activeCategory}&`;
      }
      if (query.trim()) {
        url += `q=${encodeURIComponent(query.trim())}`;
      }
      
      const res = await fetch(url);
      const json = await res.json();
      
      if (json.success) {
        setPosts(json.data);
      } else {
        setError(json.message || "获取帖子失败");
      }
    } catch (err) {
      setError("网络错误");
    } finally {
      setLoading(false);
    }
  };

  const getCategoryStyle = (categoryId: number) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat?.color || "bg-slate-800 text-slate-300 border-slate-700";
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPosts(searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery("");
    fetchPosts("");
  };

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">社区大厅</h1>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1 sm:w-64">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索帖子..."
              className="w-full bg-slate-900/60 border border-slate-700 rounded-lg pl-10 pr-10 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-[#00bfa5]/50 focus:ring-1 focus:ring-[#00bfa5]/50 transition-all"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button 
                type="button" 
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>

          <button 
            onClick={handleSearchSubmit}
            className="hidden sm:block px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg transition-colors border border-slate-700 text-sm"
          >
            搜索
          </button>
        </div>
      </div>

      {/* Mobile Create Post Button (visible only on small screens) */}
      <div className="lg:hidden">
        <Link href="/bbs/post/new" className="block w-full">
          <button className="w-full py-3 bg-[#00bfa5] hover:bg-[#00bfa5]/90 text-slate-950 font-bold rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2">
            <span>发布新帖</span>
          </button>
        </Link>
      </div>

      {/* Category Filter and Sort */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id || 'all'}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-[#00bfa5] text-slate-950 shadow-[0_0_10px_rgba(0,191,165,0.3)]"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="relative" ref={sortDropdownRef}>
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
          >
            <ArrowDownWideNarrow className="w-4 h-4" />
            {sortBy === "latest" && "按时间"}
            {sortBy === "likes" && "点赞最多"}
            {sortBy === "replies" && "回复最多"}
            {sortBy === "views" && "查看最多"}
          </button>

          {isSortOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-slate-900 border border-slate-800 rounded-lg shadow-xl overflow-hidden z-20">
              {[
                { id: "latest", label: "按时间 (默认)", icon: Clock },
                { id: "likes", label: "点赞最多", icon: Heart },
                { id: "replies", label: "回复最多", icon: MessageSquare },
                { id: "views", label: "查看最多", icon: Eye },
              ].map((option) => {
                const Icon = option.icon;
                const isActive = sortBy === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => {
                      setSortBy(option.id as any);
                      setIsSortOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors ${
                      isActive 
                        ? "bg-[#00bfa5]/10 text-[#00bfa5] font-medium" 
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {option.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-4">
        {loading ? (
            // Skeletons
          [1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 animate-pulse">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="h-5 bg-slate-800 rounded w-3/4" />
                  <div className="h-4 bg-slate-800 rounded w-1/2" />
                  <div className="flex gap-2 pt-2">
                    <div className="h-4 bg-slate-800 rounded w-16" />
                    <div className="h-4 bg-slate-800 rounded w-16" />
                  </div>
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
            <MessageSquare className="w-12 h-12 text-slate-700 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-300 mb-1">暂无帖子</h3>
            <p className="text-slate-500 text-sm">这个版块还没有人发帖，来做第一个发言的人吧！</p>
          </div>
        ) : (
          posts.map((post) => (
            <Link href={`/bbs/post/${post.id}`} key={post.id} prefetch={false} className="block group">
              <div className="bg-slate-900/40 border border-slate-800 hover:border-slate-700 rounded-xl p-5 transition-all hover:bg-slate-800/40">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="shrink-0 mt-1">
                    {post.author.image ? (
                      <img src={post.author.image} alt={post.author.name} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 text-slate-400 font-medium">
                        {post.author.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      {post.isPinned && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          <Pin className="w-3 h-3" />
                          置顶
                        </span>
                      )}
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

                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <span className={post.author.role === 'vip' ? 'text-amber-400' : 'text-slate-300'}>
                          {post.author.name}
                        </span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {formatRelativeTime(post.createdAt)}
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
                        <Heart className={`w-3.5 h-3.5 ${(post as any).isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                        {(post as any).likeCount || 0}
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
