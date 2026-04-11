"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Key, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function ActivationRedeem() {
  const { update } = useSession();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 自动转大写并去除非字母数字
    let val = e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, "");
    
    // 如果用户粘贴的是不带横杠的连续字符，尝试自动加横杠 (TWL-XXXX-XXXX-XXXX)
    if (!val.includes("-") && val.length > 3) {
      if (val.startsWith("TWL")) {
        val = "TWL-" + val.slice(3).match(/.{1,4}/g)?.join("-") || val;
      }
    }
    
    setCode(val.slice(0, 19)); // 最大长度限制 (TWL-1234-5678-ABCD = 19 chars)
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || code.length < 15) {
      setError("请输入完整的激活码");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/user/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess("激活成功！" + (data.message ? " " + data.message : ""));
        setCode("");
        // 强制刷新 NextAuth 会话
        await update();
        // 强制触发 Server Component 重新获取数据（比如 dashboard-client 的 user 属性）
        router.refresh();
        // 弹出自定义成功弹窗
        setShowModal(true);
      } else {
        setError(data.message || "激活失败");
      }
    } catch (err) {
      setError("网络请求异常，请检查网络或稍后重试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
      {/* 装饰背景 */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#00bfa5]/5 blur-3xl rounded-full pointer-events-none" />

      <div className="flex items-start gap-4 mb-6 relative">
        <div className="p-3 bg-emerald-500/10 rounded-lg text-[#00bfa5]">
          <Key className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-1">兑换激活码 (CD-Key)</h3>
          <p className="text-sm text-slate-400">
            输入客服提供的激活码，立即解锁 PRO / ULTRA 专属权益。
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 relative">
        <div>
          <div className="relative flex items-center">
            <input
              type="text"
              value={code}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="TWL-XXXX-XXXX-XXXX"
              className={`w-full bg-slate-950 border ${
                error ? "border-rose-500/50 focus:border-rose-500" : "border-slate-700 focus:border-[#00bfa5]"
              } rounded-lg px-4 py-3.5 text-white font-mono tracking-wider focus:outline-none transition-colors disabled:opacity-50`}
            />
            <button
              type="submit"
              disabled={isLoading || code.length < 15}
              className="absolute right-2 px-6 py-2 bg-[#00bfa5] hover:bg-[#00bfa5]/90 text-slate-950 font-bold rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "立即激活"
              )}
            </button>
          </div>
          {error && (
            <p className="text-rose-400 text-sm mt-2 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {error}
            </p>
          )}
          {success && (
            <p className="text-emerald-400 text-sm mt-2 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              {success}
            </p>
          )}
        </div>
        <p className="text-xs text-slate-500">
          * 激活码由系统生成，每个激活码仅可使用一次。激活后您的会员有效期将更新为全新的时长。
        </p>
      </form>

      {/* 成功自定义弹窗 */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-[#111] border border-[#00bfa5]/30 rounded-2xl p-8 w-full max-w-sm shadow-2xl shadow-[#00bfa5]/10 text-center animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-[#00bfa5]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#00bfa5]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">兑换成功</h2>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              {success}
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full py-3 bg-[#00bfa5] hover:bg-[#00bfa5]/90 text-slate-950 font-bold rounded-xl transition-colors"
            >
              好的，去查看权益
            </button>
          </div>
        </div>
      )}
    </div>
  );
}