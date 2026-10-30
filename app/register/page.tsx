"use client";

import { translateError, useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { registerUser } from "@/app/actions/auth";
import { safeCallbackPath } from "@/lib/return-path";

export default function RegisterPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    const callbackUrl = safeCallbackPath(new URLSearchParams(window.location.search).get("callbackUrl"));
    try {
      await signIn("google", { callbackUrl });
    } catch (err: any) {
      console.error("Google login error:", err);
      setError(t("login.err.google_fail"));
      setLoading(false);
    }
  };

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return setError(t("login.err.empty"));
    
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      
      const result = await registerUser(formData);

      if (result?.error) {
        setError(translateError(t, "auth.err", result.error));
        setLoading(false);
      } else {
        // Auto-login after successful registration
        const loginResult = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (loginResult?.error) {
          const callbackUrl = safeCallbackPath(new URLSearchParams(window.location.search).get("callbackUrl"));
          router.push(callbackUrl === "/dashboard" ? "/login" : `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
        } else {
          const callbackUrl = safeCallbackPath(new URLSearchParams(window.location.search).get("callbackUrl"));
          router.push(callbackUrl);
          router.refresh();
        }
      }
    } catch (err: any) {
      console.error("Email register error:", err);
      setError(t("login.err.reg_fail"));
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-10">
      <Card className="max-w-md w-full border border-white/10 rounded-2xl p-6 bg-[#0a0a0a]">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl mb-2">{t("login.register")}</CardTitle>
          <CardDescription className="text-base text-gray-400">
            {t("login.register_desc")}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleEmailRegister} className="space-y-4">
            <div className="space-y-2">
              <input
                type="text"
                placeholder={t("login.name_placeholder")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-[#00ff88] transition-colors"
              />
            </div>
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
            <div className="space-y-2">
              <input
                type="password"
                placeholder={t("login.password_placeholder")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-[#00ff88] transition-colors"
                required
                minLength={6}
              />
            </div>
            
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            
            <div className="pt-2">
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full text-base py-5 bg-[#00ff88] text-black hover:bg-[#00cc6a]"
              >
                {loading ? t("login.processing") : t("login.register")}
              </Button>
            </div>
          </form>

          <div className="mt-4 text-center text-sm text-gray-400">
            {t("login.have_account")}{" "}
            <Link
              href="/login"
              className="text-[#00ff88] hover:underline"
              onClick={(event) => {
                const callbackUrl = safeCallbackPath(new URLSearchParams(window.location.search).get("callbackUrl"));
                if (callbackUrl === "/dashboard") return;
                event.preventDefault();
                window.location.assign(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
              }}
            >
              {t("login.signin")}
            </Link>
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0a0a0a] px-2 text-gray-400">{t("login.or_continue")}</span>
            </div>
          </div>

          <Button 
            onClick={handleGoogleLogin} 
            disabled={loading}
            variant="outline"
            className="w-full text-base py-6 bg-white text-black hover:bg-gray-200 border-none"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            {t("login.google")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
