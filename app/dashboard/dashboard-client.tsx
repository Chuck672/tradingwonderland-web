"use client";

import { fillTemplate, translateError, useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { users } from "@/lib/schema";
import { InferSelectModel } from "drizzle-orm";
import { useState } from "react";
import { changePassword } from "@/app/actions/auth";
import { Download, Edit2, Crown, CheckCircle2, AlertCircle, KeyRound } from "lucide-react";
import Link from "next/link";
import ActivationRedeem from "./components/activation-redeem";
import { RefreshSession } from "@/components/refresh-session";
import { canDownloadDesktop } from "@/lib/license";

type User = InferSelectModel<typeof users>;
type LicenseCode = { code: string; planId: string | null; membershipLevel: number };

export default function DashboardClient({
  user,
  licenses,
  downloadNotice,
}: {
  user: User;
  licenses: LicenseCode[];
  downloadNotice: "unconfigured" | "forbidden" | null;
}) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Restore original logic while handling Drizzle's nullable types
  const membershipLevel = user.membershipLevel ?? 0;
  const isPremium = membershipLevel > 0 && (!user.vipUntil || new Date(user.vipUntil) > new Date());

  const handleDownloadClick = async (toolId: string, toolLevel: number) => {
    // 再次双重检查权限
    if (membershipLevel < toolLevel || (user.vipUntil && new Date(user.vipUntil) < new Date())) {
      alert(fillTemplate(t("dashboard.alert_need_level"), { level: toolLevel === 2 ? "ULTRA" : "PRO" }));
      return;
    }
    
    setLoading(true);
    try {
      // 通过 fetch 请求我们的私密下载接口
      const res = await fetch(`/api/tools/download?toolId=${toolId}`, {
        method: 'GET',
      });

      if (!res.ok) {
        // 如果后端拦截（未登录、等级不够、文件不存在等），解析错误信息并抛出
        const data = await res.json().catch(() => ({}));
        const code = typeof data?.code === "string" ? data.code : "server";
        alert(translateError(t, "api.err", code));
        return;
      }

      // 尝试从 Response Header 的 Content-Disposition 中提取真实文件名
      const contentDisposition = res.headers.get('Content-Disposition');
      let filename = `${toolId}.ex5`;
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
        if (filenameMatch && filenameMatch.length === 2) {
          filename = filenameMatch[1];
        }
      }

      // 将下载的文件流转换为 Blob，并模拟点击 <a> 标签触发浏览器原生下载
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      
      // 释放内存并移除临时标签
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (err: any) {
      console.error(err);
      alert(t("dashboard.download_fail_support"));
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError(t("dashboard.password_not_match"));
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError(t("dashboard.password_too_short"));
      return;
    }

    setPasswordLoading(true);
    setPasswordError(null);

    const formData = new FormData();
    formData.append("currentPassword", currentPassword);
    formData.append("newPassword", newPassword);

    const result = await changePassword(formData);
    
    if (result?.error) {
      setPasswordError(translateError(t, "auth.err", result.error));
    } else {
      alert(t("dashboard.password_success"));
      setIsPasswordModalOpen(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    setPasswordLoading(false);
  };

  const tools = [
    { id: "SVP5_pro", name: t("tools.t1.title"), desc: t("tools.t1.desc"), level: 1 },
    { id: "inRangeVP", name: t("tools.t2.title"), desc: t("tools.t2.desc"), level: 1 },
    { id: "scalpTradingPanel", name: t("tools.t3.title"), desc: t("tools.t3.desc"), level: 1 },
    { id: "strengthBubble_pro", name: t("tools.t4.title"), desc: t("tools.t4.desc"), level: 1 },
    { id: "Trend_Panel9_pro", name: t("tools.t5.title"), desc: t("tools.t5.desc"), level: 1 },
    { id: "microOrderFlow", name: t("tools.t6.title"), desc: t("tools.t6.desc"), level: 1 },
  ];

  const desktopReady = canDownloadDesktop(membershipLevel, user.vipUntil);

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl space-y-10">
      <RefreshSession />
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">{t("dashboard.welcome")}, {user.name || user.email?.split("@")[0]}</h1>
          <p className="text-gray-400">{t("dashboard.subtitle")}</p>
        </div>
        <Button
          variant="outline"
          onClick={() => setIsPasswordModalOpen(true)}
          className="border-white/10 text-gray-300 hover:text-white hover:bg-white/5"
        >
          <KeyRound size={16} className="mr-2" />
          {t("dashboard.change_password")}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Membership Card */}
        <Card className="border-white/10 bg-[#0a0a0a]">
          <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center">
                <Crown className={isPremium ? "text-[#00ff88] w-7 h-7" : "text-gray-500 w-7 h-7"} />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-1">{t("dashboard.membership")}</h2>
                <p className="text-sm text-gray-400">
                  {t("dashboard.level_label")}: <span className={`font-bold ml-1 ${membershipLevel === 2 ? "text-purple-400" : isPremium ? "text-[#00ff88]" : "text-white"}`}>
                    {!isPremium ? t("dashboard.free_member") : membershipLevel === 2 ? t("dashboard.ultra_member") : t("dashboard.pro_member")}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
              {isPremium && user.vipUntil && (
                <div className="text-left md:text-right mr-4">
                  <p className="text-sm text-gray-400">{t("dashboard.expire_time")}</p>
                  <p className="text-white font-medium">{new Date(user.vipUntil).toLocaleDateString()}</p>
                </div>
              )}
              {isPremium && (
                <div className={`flex items-center gap-2 text-sm px-4 py-2.5 rounded-lg border whitespace-nowrap ${
                  membershipLevel === 2 
                    ? "text-purple-400 bg-purple-500/10 border-purple-500/20" 
                    : "text-[#00ff88] bg-[#00ff88]/10 border-[#00ff88]/20"
                }`}>
                  <CheckCircle2 size={16} />
                  <span>{membershipLevel === 2 ? t("dashboard.unlocked_top") : t("dashboard.unlocked_advanced")}</span>
                </div>
              )}
              {!isPremium && (
                <Link href="/subscribe?plan=349" className="w-full md:w-auto">
                  <Button className="w-full md:w-auto bg-[#00ff88] text-black hover:bg-[#00cc6a] px-8">
                    {t("dashboard.upgrade_btn")}
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>

        {/* License codes issued or redeemed for this account */}
        <Card className="border-white/10 bg-[#0a0a0a]">
          <CardHeader>
            <CardTitle>{t("dashboard.license_title")}</CardTitle>
            <CardDescription>{t("dashboard.license_body")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {downloadNotice === "unconfigured" ? (
              <p className="text-sm text-amber-300" role="alert">{t("dashboard.download_notice_unconfigured")}</p>
            ) : null}
            {downloadNotice === "forbidden" ? (
              <p className="text-sm text-amber-300" role="alert">{t("dashboard.download_notice_forbidden")}</p>
            ) : null}
            {licenses.length === 0 ? (
              <p className="text-sm text-gray-400">{t("dashboard.license_empty")}</p>
            ) : (
              <ul className="space-y-3">
                {licenses.map((license) => (
                  <li key={license.code} className="rounded-xl border border-white/10 bg-black/40 px-4 py-3">
                    <p className="font-mono text-white tracking-wide break-all">{license.code}</p>
                    <p className="text-xs text-gray-500 mt-2">{t("dashboard.license_applied")}</p>
                  </li>
                ))}
              </ul>
            )}
            {desktopReady ? (
              <div className="space-y-2">
                <Button asChild className="bg-[#00ff88] text-black hover:bg-[#00cc6a]">
                  <a href="/api/download/pitradingagent">
                    <Download size={16} className="mr-2" />
                    {t("dashboard.download_agent")}
                  </a>
                </Button>
                <p className="text-xs text-gray-500">{t("dashboard.download_agent_hint")}</p>
              </div>
            ) : (
              <p className="text-sm text-gray-400">{t("dashboard.download_agent_locked")}</p>
            )}
          </CardContent>
        </Card>

        {/* Activation Redeem Card */}
        <ActivationRedeem />
      </div>

      {/* Tools List */}
      <div className="space-y-6 pt-4">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold mb-2">{t("dashboard.tools_title")}</h2>
          <p className="text-gray-400">{t("dashboard.tools_sync")}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => {
            // Check if user has sufficient level to download this tool
            const isToolPremium = membershipLevel >= tool.level && (!user.vipUntil || new Date(user.vipUntil) > new Date());
            
            return (
              <div key={tool.id} className="p-5 rounded-xl border border-white/10 bg-black/40 flex flex-col justify-between hover:border-white/20 transition-colors relative overflow-hidden">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-lg">{tool.name}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tool.level === 2 ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30'}`}>
                      {tool.level === 2 ? 'ULTRA' : 'PRO'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-6">{tool.desc}</p>
                </div>
                <Button
                  onClick={() => handleDownloadClick(tool.id, tool.level)}
                  disabled={!isToolPremium}
                  className={`w-full transition-colors ${
                    isToolPremium 
                      ? "bg-white/10 hover:bg-[#00ff88] hover:text-black" 
                      : "bg-white/5 text-gray-500 cursor-not-allowed hover:bg-white/5"
                  }`}
                >
                  <Download size={16} className="mr-2" />
                  {isToolPremium ? t("dashboard.download_btn") : fillTemplate(t("dashboard.need_level"), { level: tool.level === 2 ? "ULTRA" : "PRO" })}
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-2">{t("dashboard.change_password")}</h2>
            <p className="text-gray-400 text-sm mb-6">
              {t("dashboard.change_password_desc")}
            </p>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">{t("dashboard.current_password")}</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-[#00ff88]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">{t("dashboard.new_password")}</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-[#00ff88]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">{t("dashboard.confirm_password")}</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-[#00ff88]"
                  required
                />
              </div>
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsPasswordModalOpen(false);
                    setPasswordError(null);
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                  className="flex-1 border-white/20"
                >
                  {t("dashboard.cancel")}
                </Button>
                <Button
                  type="submit"
                  disabled={passwordLoading}
                  className="flex-1 bg-[#00ff88] text-black hover:bg-[#00cc6a]"
                >
                  {passwordLoading ? t("dashboard.saving") : t("dashboard.save_password")}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
