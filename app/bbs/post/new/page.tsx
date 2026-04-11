"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2, ArrowLeft, AlertCircle, Save } from "lucide-react";
import Link from "next/link";
import TiptapEditor from "@/app/bbs/components/tiptap-editor";

const CATEGORIES = [
  { id: 1, name: "技术分析", role: "vip" },
  { id: 2, name: "工具开发", role: "vip" },
  { id: 3, name: "答疑解惑", role: "vip" },
  { id: 4, name: "心得体会", role: "vip" },
  { id: 5, name: "社区通知", role: "member" },
];

export default function NewPostPage() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [images, setImages] = useState<string[]>([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Force session update when page loads to get latest membership status
  const [hasUpdated, setHasUpdated] = useState(false);
  useEffect(() => {
    if (status === "authenticated" && !hasUpdated) {
      console.log("[NewPostPage] Triggering session update...");
      update().then(() => {
        console.log("[NewPostPage] Session update complete.");
        setHasUpdated(true);
      });
    }
  }, [status, update, hasUpdated]);

  // Load draft on initial render
  useEffect(() => {
    if (status === "authenticated") {
      const savedDraft = localStorage.getItem(`bbs_draft_${session?.user?.id}`);
      if (savedDraft) {
        try {
          const draft = JSON.parse(savedDraft);
          if (draft.title) setTitle(draft.title);
          if (draft.content) setContent(draft.content);
          if (draft.categoryId) setCategoryId(draft.categoryId);
          setSaveStatus("saved");
        } catch (e) {
          console.error("Failed to parse draft", e);
        }
      }
    }
  }, [status, session?.user?.id]);

  // Auto save draft logic
  useEffect(() => {
    if (status !== "authenticated" || (!title && !content && !categoryId)) return;

    setSaveStatus("saving");
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    autoSaveTimeoutRef.current = setTimeout(() => {
      const draft = { title, content, categoryId, updatedAt: new Date().toISOString() };
      localStorage.setItem(`bbs_draft_${session?.user?.id}`, JSON.stringify(draft));
      setSaveStatus("saved");
    }, 1000); // 1秒防抖

    return () => {
      if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);
    };
  }, [title, content, categoryId, status, session?.user?.id]);

  // Only check after loading is complete
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 text-[#00bfa5] animate-spin" />
      </div>
    );
  }

  // Authentication & Permission check
  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  // Derive role simply for frontend UI hints (real validation happens on backend)
  const vipUntilDate = session?.user?.vipUntil ? new Date(session.user.vipUntil) : null;
  const isVipValid = vipUntilDate ? vipUntilDate > new Date() : false;
  const isVip = session?.user?.membershipLevel && session.user.membershipLevel > 0 && isVipValid;
  
  if (status === "authenticated" && !isVip) {
    return (
      <div className="bg-slate-900/40 border border-amber-500/20 rounded-xl p-8 text-center max-w-2xl mx-auto mt-8">
        <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">升级解锁发帖特权</h2>
        <p className="text-slate-400 mb-6">
          当前您的会员级别为普通会员，仅可浏览、回帖和打卡。
          升级为基础/高级订阅会员后，即可在各大专区发布您的专属回测心得与策略。
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/bbs">
            <button className="px-6 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors">
              返回社区
            </button>
          </Link>
          <Link href="/subscribe">
            <button className="px-6 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors">
              立即升级
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // HTML content will have empty tags even if user didn't type anything, so we need to check raw text or length roughly
    const isContentEmpty = content.replace(/<[^>]*>?/gm, '').trim().length === 0;

    if (!title.trim() || isContentEmpty || !categoryId) {
      setError("请填写所有必填项");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/bbs/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          categoryId,
          images: null, // TipTap handles inline images now
        }),
      });

      const data = await res.json();
      
      if (data.success) {
        // Clear draft on success
        localStorage.removeItem(`bbs_draft_${session?.user?.id}`);
        router.push(`/bbs/post/${data.data.id}`);
      } else {
        setError(data.message || data.error || "发布失败");
        setIsSubmitting(false);
      }
    } catch (err) {
      setError("发布时发生网络错误");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto min-h-[calc(100vh-8rem)]">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/bbs" className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-bold text-white">发布新帖</h1>
            {saveStatus === "saving" && (
              <span className="flex items-center gap-1 text-xs text-amber-500 bg-amber-500/10 px-2 py-1 rounded-full border border-amber-500/20">
                <Loader2 className="w-3 h-3 animate-spin" /> 保存中...
              </span>
            )}
            {saveStatus === "saved" && (
              <span className="flex items-center gap-1 text-xs text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                <Save className="w-3 h-3" /> 已存草稿
              </span>
            )}
          </div>
        </div>

        {/* Category selector moved to top right for cleaner UI */}
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full sm:w-auto bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00bfa5] transition-colors"
          required
        >
          <option value="" disabled>选择一个合适的版块...</option>
          {CATEGORIES.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg text-sm flex items-start gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Title Input - Large, clean, transparent */}
        <div className="relative">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            placeholder="输入标题"
            className="w-full bg-transparent border-0 border-b-2 border-slate-800 px-2 py-4 text-3xl md:text-4xl font-bold text-white placeholder:text-slate-600 focus:ring-0 focus:border-[#00bfa5] transition-colors"
            required
          />
        </div>

        {/* Rich Text Content */}
        <div className="min-h-[500px]">
          <TiptapEditor content={content} onChange={setContent} />
        </div>

        {/* Submit Button */}
        <div className="pt-8 pb-12 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !title.trim() || content.replace(/<[^>]*>?/gm, '').trim().length === 0 || !categoryId}
            className="px-8 py-3 bg-[#00bfa5] hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-lg shadow-lg shadow-emerald-500/20"
          >
            {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
            {isSubmitting ? '发布中...' : '确认发布'}
          </button>
        </div>
      </form>
    </div>
  );
}
