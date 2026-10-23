"use client";

import { translateError, useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { resetPassword } from "@/app/actions/auth";

export default function ForgotPasswordPage() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return setError(t("forgot.err.empty"));
    
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append("email", email);
      
      const result = await resetPassword(formData);
      
      if (result?.error) {
        setError(translateError(t, "auth.err", result.error));
      } else {
        setSuccess(true);
      }
    } catch (err: any) {
      console.error("Reset password error:", err);
      setError(t("forgot.err.fail"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-10">
      <Card className="max-w-md w-full border border-white/10 rounded-2xl p-6 bg-[#0a0a0a]">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl mb-2">{t("forgot.title")}</CardTitle>
          <CardDescription className="text-base text-gray-400">
            {t("forgot.desc")}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {success ? (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-[#00ff88]/10 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-[#00ff88]" />
                </div>
              </div>
              <p className="text-gray-300">{t("forgot.success_msg")}</p>
              <Link href="/login" className="block w-full">
                <Button className="w-full text-base py-5 bg-[#00ff88] text-black hover:bg-[#00cc6a]">
                  {t("forgot.back_to_login")}
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder={t("login.email_placeholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-[#00ff88] transition-colors"
                  required
                />
              </div>
              
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              
              <div className="pt-2">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full text-base py-5 bg-[#00ff88] text-black hover:bg-[#00cc6a]"
                >
                  {loading ? t("login.processing") : t("forgot.submit")}
                </Button>
              </div>
            </form>
          )}

          {!success && (
            <div className="mt-6 text-center">
              <Link href="/login" className="inline-flex items-center text-sm text-gray-400 hover:text-[#00ff88] transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("forgot.back_to_login")}
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
