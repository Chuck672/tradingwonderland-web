"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User, Loader2, Save, Activity, CheckCircle2, MessageSquare } from "lucide-react";

type ProfileData = {
  nickname: string | null;
  signature: string | null;
  bbsRole: string;
  postCount: number;
  replyCount: number;
  totalCheckins: number;
  maxStreak: number;
  user: {
    name: string;
    email: string;
    image: string | null;
  };
};

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    nickname: "",
    signature: ""
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      fetchProfile();
    }
  }, [status, router]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/bbs/profile");
      const json = await res.json();
      
      if (json.success) {
        setProfile(json.data);
        setFormData({
          nickname: json.data.nickname || "",
          signature: json.data.signature || ""
        });
      } else {
        setError(json.message || "获取档案失败");
      }
    } catch (err) {
      setError("网络错误");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/bbs/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (json.success) {
        setSuccessMsg("保存成功！");
        setTimeout(() => setSuccessMsg(""), 3000);
        // Refresh local data
        setProfile(prev => prev ? { ...prev, ...formData } : null);
      } else {
        setError(json.message || "保存失败");
      }
    } catch (err) {
      setError("网络错误");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 text-[#00bfa5] animate-spin" />
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#00bfa5]/10 rounded-lg">
          <User className="w-5 h-5 text-[#00bfa5]" />
        </div>
        <h1 className="text-2xl font-bold text-white">社区档案</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Avatar & Stats */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 text-center">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-slate-800 mb-4 bg-slate-800 flex items-center justify-center">
              {profile.user.image ? (
                <img src={profile.user.image} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl text-slate-400 font-bold">{profile.user.name.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <h2 className="text-xl font-bold text-white mb-1">{profile.nickname || profile.user.name}</h2>
            <p className="text-sm text-slate-400 mb-3">{profile.user.email}</p>
            <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
              角色: {profile.bbsRole === 'vip' ? <span className="text-amber-400 ml-1">VIP会员</span> : <span className="ml-1">普通会员</span>}
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-slate-300 mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#00bfa5]" />
              社区活跃度
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-800/50">
                <span className="text-slate-400 text-sm flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />发帖数
                </span>
                <span className="text-white font-bold">{profile.postCount}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-800/50">
                <span className="text-slate-400 text-sm flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 opacity-70" />回帖数
                </span>
                <span className="text-white font-bold">{profile.replyCount}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-800/50">
                <span className="text-slate-400 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />总打卡天数
                </span>
                <span className="text-white font-bold">{profile.totalCheckins}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-500" />最高连续打卡
                </span>
                <span className="text-amber-400 font-bold">{profile.maxStreak}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Form */}
        <div className="md:col-span-2">
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 md:p-8">
            <h2 className="text-lg font-bold text-white mb-6">编辑个人资料</h2>
            
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">社区昵称</label>
                <input
                  type="text"
                  value={formData.nickname}
                  onChange={(e) => setFormData({...formData, nickname: e.target.value})}
                  placeholder="给自己起个响亮的研究代号"
                  maxLength={50}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-[#00bfa5] transition-colors"
                />
                <p className="text-xs text-slate-500 mt-2">留空则默认显示账号注册名称</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">个性签名</label>
                <textarea
                  value={formData.signature}
                  onChange={(e) => setFormData({...formData, signature: e.target.value})}
                  placeholder="写下你的量化座右铭..."
                  rows={4}
                  maxLength={200}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-[#00bfa5] transition-colors resize-none"
                />
                <div className="text-right mt-1">
                  <span className={`text-xs ${formData.signature.length >= 200 ? 'text-rose-500' : 'text-slate-500'}`}>
                    {formData.signature.length}/200
                  </span>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 text-sm">
                  {error}
                </div>
              )}

              {successMsg && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  {successMsg}
                </div>
              )}

              <div className="pt-4 border-t border-slate-800">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#00bfa5] hover:bg-emerald-400 text-slate-950 font-bold px-6 py-2.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  保存修改
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
