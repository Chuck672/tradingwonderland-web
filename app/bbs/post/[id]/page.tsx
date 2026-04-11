"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowLeft, Clock, Eye, MessageSquare, Pin, ShieldAlert, Trash2, Loader2, Send, Heart, Bookmark } from "lucide-react";
import { formatRelativeTime } from "@/lib/bbs/utils";
import { LikeButton } from "@/app/bbs/components/like-button";
import { BookmarkButton } from "@/app/bbs/components/bookmark-button";
import { MentionInput } from "@/app/bbs/components/mention-input";

type Post = {
  id: number;
  title: string;
  content: string;
  images: string[] | null;
  viewCount: number;
  createdAt: string;
  replyCount: number;
  likeCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  category: { name: string; slug: string };
  author: { id: string; name: string; image: string | null; role: string };
};

type Reply = {
  id: number;
  content: string;
  createdAt: string;
  likeCount: number;
  isLiked: boolean;
  author: { id: string; name: string; image: string | null; role: string };
};

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const postId = params.id as string;

  const [post, setPost] = useState<Post | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [replyContent, setReplyContent] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [replyError, setReplyError] = useState("");

  // Fetch real user BBS role to accurately render admin buttons
  const [userBbsRole, setUserBbsRole] = useState<string>("guest");

  const hasIncrementedRef = useRef(false);

  useEffect(() => {
    fetchPostData();
    
    // Prevent double-firing in React Strict Mode
    if (!hasIncrementedRef.current) {
      incrementViewCount();
      hasIncrementedRef.current = true;
    }
  }, [postId]);

  useEffect(() => {
    if (session?.user) {
      fetch("/api/bbs/profile")
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data?.bbsRole) {
            setUserBbsRole(data.data.bbsRole);
          }
        })
        .catch(console.error);
    }
  }, [session]);

  const incrementViewCount = async () => {
    try {
      await fetch(`/api/bbs/posts/${postId}/view`, { method: "POST" });
    } catch (err) {
      console.error("Failed to increment view count", err);
    }
  };

  const fetchPostData = async () => {
    try {
      setLoading(true);
      setError("");
      
      // Fetch post and replies in parallel to avoid waterfall delay
      const [postRes, repliesRes] = await Promise.all([
        fetch(`/api/bbs/posts/${postId}`),
        fetch(`/api/bbs/posts/${postId}/replies`)
      ]);
      
      const postJson = await postRes.json();
      
      if (!postJson.success) {
        setError(postJson.message || "帖子不存在或已被删除");
        setLoading(false);
        return;
      }
      setPost(postJson.data);

      const repliesJson = await repliesRes.json();
      if (repliesJson.success) {
        setReplies(repliesJson.data);
      }
    } catch (err) {
      setError("网络错误，无法加载帖子");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async () => {
    if (!confirm("确定要删除这篇帖子吗？此操作不可恢复。")) return;
    
    try {
      const res = await fetch(`/api/bbs/posts/${postId}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        router.push("/bbs");
      } else {
        alert(json.message || "删除失败");
      }
    } catch (err) {
      alert("网络错误");
    }
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      router.push("/login");
      return;
    }

    if (!replyContent.trim()) return;

    setIsReplying(true);
    setReplyError("");

    try {
      const res = await fetch(`/api/bbs/posts/${postId}/replies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: replyContent }),
      });

      const json = await res.json();
      if (json.success) {
        setReplyContent("");
        // Re-fetch replies to show the new one
        const repliesRes = await fetch(`/api/bbs/posts/${postId}/replies`);
        const repliesJson = await repliesRes.json();
        if (repliesJson.success) setReplies(repliesJson.data);
      } else {
        setReplyError(json.message || "回复失败，可能没有权限");
      }
    } catch (err) {
      setReplyError("网络错误");
    } finally {
      setIsReplying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <Loader2 className="w-8 h-8 text-[#00bfa5] animate-spin" />
        <p className="text-slate-400">正在加载帖子内容...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="text-center py-20 bg-slate-900/40 border border-slate-800 rounded-xl">
        <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto mb-4 opacity-80" />
        <h3 className="text-lg font-medium text-slate-200 mb-2">{error}</h3>
        <Link href="/bbs">
          <button className="px-6 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors">
            返回社区首页
          </button>
        </Link>
      </div>
    );
  }

  // Determine if current user can delete the post
  const isAuthor = session?.user?.id === post.author.id;

  const canManagePost = userBbsRole === "admin" || userBbsRole === "moderator";

  const handleTogglePin = async () => {
    if (!confirm((post as any).isPinned ? "确定要取消置顶吗？" : "确定要置顶这篇帖子吗？")) return;
    
    try {
      const res = await fetch(`/api/bbs/posts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPinned: !(post as any).isPinned }),
      });
      const json = await res.json();
      if (json.success) {
        setPost({ ...post, isPinned: !(post as any).isPinned } as any);
      } else {
        alert(json.message || "操作失败");
      }
    } catch (err) {
      alert("网络错误");
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link href="/bbs" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> 返回列表
      </Link>

      {/* Main Post Card */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden">
        {/* Post Header */}
        <div className="p-6 border-b border-slate-800/50">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2.5 py-1 rounded text-xs font-medium bg-slate-800 text-slate-300">
              {post.category.name}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              {post.author.image ? (
                <img src={post.author.image} alt="" className="w-10 h-10 rounded-full border border-slate-700" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold">
                  {post.author.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${post.author.role === 'vip' ? 'text-amber-400' : 'text-slate-200'}`}>
                    {post.author.name}
                  </span>
                  {post.author.role === 'vip' && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 font-bold">PRO</span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {formatRelativeTime(post.createdAt)}</span>
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {post.viewCount} 阅读</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Admin Actions */}
              {canManagePost && (
                <div className="flex items-center gap-1 border-r border-slate-700/50 pr-4 mr-1">
                  <button 
                    onClick={handleTogglePin}
                    className={`p-2 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium ${
                      (post as any).isPinned
                        ? 'text-amber-500 bg-amber-500/10 hover:bg-amber-500/20'
                        : 'text-slate-500 hover:text-amber-500 hover:bg-amber-500/10'
                    }`}
                    title={(post as any).isPinned ? "取消置顶" : "置顶帖子"}
                  >
                    <Pin className="w-4 h-4" />
                    <span className="hidden sm:inline">{(post as any).isPinned ? "已置顶" : "置顶"}</span>
                  </button>
                </div>
              )}

              <div className="flex items-center gap-1">
                <LikeButton 
                  initialLikeCount={post.likeCount} 
                  initialIsLiked={post.isLiked} 
                  postId={post.id} 
                  iconSize={20}
                  className="p-2 text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                />
                
                <BookmarkButton
                  initialIsBookmarked={post.isBookmarked}
                  postId={post.id}
                  iconSize={20}
                />
              </div>
                
              {(isAuthor || canManagePost) && (
                <button 
                  onClick={handleDeletePost}
                  className="p-2 text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                  title={isAuthor ? "删除我的帖子" : "管理：删除违规帖子"}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="p-6 md:p-8">
          <div 
            className="prose prose-invert prose-emerald max-w-none text-slate-300"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Legacy Images Grid (for backward compatibility with old posts) */}
          {post.images && post.images.length > 0 && (
            <div className={`mt-8 grid gap-4 ${post.images.length === 1 ? 'grid-cols-1 md:w-2/3' : 'grid-cols-2 md:grid-cols-3'}`}>
              {post.images.map((img, idx) => (
                <a href={img} target="_blank" rel="noopener noreferrer" key={idx} className="block rounded-lg overflow-hidden border border-slate-800 hover:border-slate-600 transition-colors">
                  <img src={img} alt={`Post attachment ${idx + 1}`} className="w-full h-auto object-cover aspect-video" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Replies Section */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden" id="replies">
        <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#00bfa5]" />
          <h3 className="text-lg font-bold text-white">全部回复 ({replies.length})</h3>
        </div>

        {/* Reply List */}
        <div className="divide-y divide-slate-800/50">
          {replies.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">
              还没有人回复，快来抢沙发吧！
            </div>
          ) : (
            replies.map((reply, idx) => (
              <div key={reply.id} className="p-6 hover:bg-slate-800/20 transition-colors">
                <div className="flex gap-4">
                  {/* Avatar */}
                  <div className="shrink-0">
                    {reply.author.image ? (
                      <img src={reply.author.image} alt="" className="w-8 h-8 rounded-full border border-slate-700" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 text-sm font-bold">
                        {reply.author.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${reply.author.role === 'vip' ? 'text-amber-400' : 'text-slate-300'}`}>
                          {reply.author.name}
                        </span>
                        {reply.author.id === post.author.id && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#00bfa5]/10 text-[#00bfa5] font-medium border border-[#00bfa5]/20">楼主</span>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-slate-500 flex items-center gap-2">
                          <span>#{idx + 1}</span>
                          {formatRelativeTime(reply.createdAt)}
                        </span>
                      </div>
                    </div>
                    <div className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed mt-2">
                      {reply.content}
                    </div>
                    <div className="mt-3 flex justify-end">
                      <LikeButton 
                        initialLikeCount={reply.likeCount} 
                        initialIsLiked={reply.isLiked} 
                        replyId={reply.id} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Reply Input Form */}
        <div className="p-6 bg-slate-900/60 border-t border-slate-800">
          {session ? (
            <form onSubmit={handleReplySubmit} className="space-y-3">
              {replyError && <div className="text-sm text-rose-400">{replyError}</div>}
              <MentionInput 
                value={replyContent}
                onChange={setReplyContent}
                placeholder="写下你的看法... (输入 @ 可提醒其他用户)"
                disabled={isReplying}
              />
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">{replyContent.length}/2000</span>
                <button
                  type="submit"
                  disabled={isReplying || !replyContent.trim()}
                  className="px-6 py-2 bg-slate-800 hover:bg-[#00bfa5] hover:text-slate-950 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
                >
                  {isReplying ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  发表回复
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 border border-dashed border-slate-700 rounded-lg bg-slate-950/50">
              <p className="text-slate-400 mb-3 text-sm">登录后即可参与讨论</p>
              <Link href="/login">
                <button className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors text-sm">
                  前往登录
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
