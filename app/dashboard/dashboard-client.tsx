"use client";

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { users, mt5Accounts } from "@/lib/schema";
import { InferSelectModel } from "drizzle-orm";
import { useState } from "react";
import { saveMt5Account } from "@/app/actions/mt5";
import { changePassword } from "@/app/actions/auth";
import { Download, Edit2, Crown, CheckCircle2, AlertCircle, KeyRound } from "lucide-react";
import Link from "next/link";

type User = InferSelectModel<typeof users>;
type Mt5Account = InferSelectModel<typeof mt5Accounts>;

type UserWithAccounts = User & {
  mt5Accounts: Mt5Account[];
};

export default function DashboardClient({ user }: { user: UserWithAccounts }) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newAccount, setNewAccount] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Restore original logic while handling Drizzle's nullable types
  const membershipLevel = user.membershipLevel ?? 0;
  const isPremium = membershipLevel > 0 && (!user.vipUntil || new Date(user.vipUntil) > new Date());
  const hasAccount = user.mt5Accounts.length > 0;
  const currentAccount = hasAccount ? user.mt5Accounts[0] : null;

  const handleOpenModal = () => {
    if (currentAccount) {
      setNewAccount(currentAccount.accountId);
    } else {
      setNewAccount("");
    }
    setIsAddModalOpen(true);
  };

  const handleSaveAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hasAccount && !confirm(t("dashboard.confirm_edit_msg"))) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("accountId", newAccount);

    const result = await saveMt5Account(formData);
    if (result?.error) {
      setError(result.error);
    } else {
      setNewAccount("");
      setIsAddModalOpen(false);
    }
    setLoading(false);
  };

  const handleDownloadClick = (toolId: string) => {
    if (!isPremium) {
      alert(t("dashboard.alert_premium"));
      return;
    }
    if (!hasAccount || !currentAccount) {
      alert(t("dashboard.alert_no_account"));
      return;
    }
    setSelectedTool(toolId);
    setSelectedAccount(currentAccount.accountId);
    setIsDownloadModalOpen(true);
  };

  const handleConfirmDownload = async () => {
    if (!selectedAccount || !selectedTool) return;
    
    setLoading(true);
    try {
      let msg = t("dashboard.alert_download_success");
      msg = msg.replace("{tool}", selectedTool);
      msg = msg.replace("{email}", user.email || "");
      msg = msg.replace("{account}", selectedAccount);
      
      alert(msg);
      
      setIsDownloadModalOpen(false);
    } catch (err) {
      console.error(err);
      alert(t("dashboard.alert_download_fail"));
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
      setPasswordError(result.error);
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
    { id: "sessionVolumeProfile-pro", name: "Session Volume Profile Pro", desc: t("tools.t1.desc") },
    { id: "liquidity-sweeps", name: "Liquidity Sweeps Indicator", desc: "流动性猎杀追踪工具" }, 
    { id: "orderblock-finder", name: "OrderBlock Finder EA", desc: "机构订单块自动识别EA" },
  ];

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl space-y-10">
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
                  {t("dashboard.current_level")}: <span className={`font-bold ml-1 ${isPremium ? "text-[#00ff88]" : "text-white"}`}>{isPremium ? t("dashboard.premium_user") : t("dashboard.free_user")}</span>
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
                <div className="flex items-center gap-2 text-sm text-[#00ff88] bg-[#00ff88]/10 px-4 py-2.5 rounded-lg border border-[#00ff88]/20 whitespace-nowrap">
                  <CheckCircle2 size={16} />
                  <span>{t("dashboard.unlocked_all")}</span>
                </div>
              )}
              {!isPremium && (
                <Link href="/subscribe" className="w-full md:w-auto">
                  <Button className="w-full md:w-auto bg-[#00ff88] text-black hover:bg-[#00cc6a] px-8">
                    {t("dashboard.upgrade_btn")}
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>

        {/* MT5 Accounts Card */}
        <Card className="border-white/10 bg-[#0a0a0a]">
          <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-[#00ff88]/10 flex items-center justify-center text-[#00ff88] font-mono font-bold text-lg">
                MT5
              </div>
              <div>
                <h2 className="text-xl font-bold mb-1">{t("dashboard.mt5_account")}</h2>
                <p className="text-sm text-gray-400">{t("dashboard.mt5_desc")}</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 w-full md:w-auto">
              {!hasAccount || !currentAccount ? (
                <div className="text-gray-500 text-sm italic">
                  {t("dashboard.no_account")}
                </div>
              ) : (
                <div className="text-left md:text-right">
                  <p className="font-mono text-2xl font-bold text-white">{currentAccount.accountId}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {t("dashboard.bound_at")} {currentAccount.createdAt ? new Date(currentAccount.createdAt).toLocaleDateString() : "-"}
                  </p>
                </div>
              )}
              
              <Button
                onClick={handleOpenModal}
                variant="outline"
                className="w-full md:w-auto border-[#00ff88] text-[#00ff88] hover:bg-[#00ff88]/10 px-6"
              >
                <Edit2 size={16} className="mr-2" />
                {hasAccount ? t("dashboard.edit_account") : t("dashboard.add_account")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tools List */}
      <div className="space-y-6 pt-4">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold mb-2">{t("dashboard.tools_title")}</h2>
          <p className="text-gray-400">{t("dashboard.tools_desc")}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <div key={tool.id} className="p-5 rounded-xl border border-white/10 bg-black/40 flex flex-col justify-between hover:border-white/20 transition-colors">
              <div>
                <h3 className="font-bold text-lg mb-1">{tool.name}</h3>
                <p className="text-sm text-gray-400 mb-6">{tool.desc}</p>
              </div>
              <Button
                onClick={() => handleDownloadClick(tool.id)}
                className="w-full bg-white/10 hover:bg-[#00ff88] hover:text-black transition-colors"
              >
                <Download size={16} className="mr-2" />
                {t("dashboard.download_btn")}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Account Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-4">
              {hasAccount ? t("dashboard.modal_edit_title") : t("dashboard.modal_add_title")}
            </h2>
            <form onSubmit={handleSaveAccount} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">{t("dashboard.modal_account_label")}</label>
                <input
                  type="text"
                  value={newAccount}
                  onChange={(e) => setNewAccount(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-[#00ff88]"
                  placeholder={t("dashboard.modal_account_placeholder")}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => { setIsAddModalOpen(false); setError(null); }}
                  className="flex-1 border-white/20"
                >
                  {t("dashboard.cancel")}
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#00ff88] text-black hover:bg-[#00cc6a]"
                >
                  {loading ? t("dashboard.adding") : (hasAccount ? t("dashboard.confirm_edit") : t("dashboard.confirm_add"))}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Download Modal */}
      {isDownloadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-2">{t("dashboard.download_title")}</h2>
            <p className="text-gray-400 text-sm mb-6">
              {t("dashboard.download_desc")}
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">{t("dashboard.download_account_label")}</label>
                <div className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white font-mono">
                  {selectedAccount}
                </div>
              </div>
              
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 flex gap-3 text-yellow-500/90 text-sm">
                <AlertCircle className="shrink-0 mt-0.5" size={16} />
                <p>{t("dashboard.download_notice")}</p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDownloadModalOpen(false)}
                  className="flex-1 border-white/20"
                >
                  {t("dashboard.cancel")}
                </Button>
                <Button
                  onClick={handleConfirmDownload}
                  disabled={loading || !selectedAccount}
                  className="flex-1 bg-[#00ff88] text-black hover:bg-[#00cc6a]"
                >
                  {loading ? t("dashboard.processing") : t("dashboard.confirm_download")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
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
