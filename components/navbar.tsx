"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "./language-provider";
import { Button } from "./ui/button";
import { Globe, Menu, X, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const toggleLanguage = () => {
    setLanguage(language === "zh" ? "en" : "zh");
  };

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    return `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? "text-[#00ff88]" : "text-gray-300 hover:text-[#00ff88]"
    }`;
  };

  const getMobileLinkClass = (path: string) => {
    const isActive = pathname === path;
    return `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
      isActive ? "text-[#00ff88] bg-white/5" : "text-gray-300 hover:text-[#00ff88] hover:bg-white/5"
    }`;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-[#00ff88] font-bold text-xl tracking-tight">
              {t("nav.logo")}
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/" className={getLinkClass("/")}>
                {t("nav.home")}
              </Link>
              <Link href="/resources" className={getLinkClass("/resources")}>
                {t("nav.resources")}
              </Link>
              <Link href="/tools" className={getLinkClass("/tools")}>
                {t("nav.tools")}
              </Link>
              <Link href="/bbs" className={getLinkClass("/bbs")}>
                {t("nav.community")}
              </Link>
              <Link href="/subscribe" className={getLinkClass("/subscribe")}>
                {t("nav.subscribe")}
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="text-gray-300 hover:text-[#00ff88] p-2 rounded-full transition-colors flex items-center space-x-1"
            >
              <Globe className="w-5 h-5" />
              <span className="text-sm font-medium uppercase">{language}</span>
            </button>
            <div className="hidden md:flex items-center space-x-3">
              {status === "loading" ? (
                <div className="w-20 h-9 bg-white/5 animate-pulse rounded-md"></div>
              ) : session ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="ghost" className="text-gray-300 hover:text-[#00ff88] hover:bg-white/5">
                      <UserIcon className="w-4 h-4 mr-2" />
                      {t("nav.dashboard")}
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
                  >
                    退出
                  </Button>
                </>
              ) : (
                <Link href="/login">
                  <Button variant="outline" className="border-[#00ff88] text-[#00ff88] hover:bg-[#00ff88] hover:text-black">
                    {t("nav.login")}
                  </Button>
                </Link>
              )}
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-[#00ff88] p-2 rounded-md focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-b border-white/10 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="/" 
              className={getMobileLinkClass("/")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("nav.home")}
            </Link>
            <Link 
              href="/resources" 
              className={getMobileLinkClass("/resources")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("nav.resources")}
            </Link>
            <Link 
              href="/tools" 
              className={getMobileLinkClass("/tools")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("nav.tools")}
            </Link>
            <Link 
              href="/bbs" 
              className={getMobileLinkClass("/bbs")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("nav.community")}
            </Link>
            <Link 
              href="/subscribe" 
              className={getMobileLinkClass("/subscribe")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("nav.subscribe")}
            </Link>
            <div className="pt-4 pb-2 space-y-2">
              {session ? (
                <>
                  <Link 
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button variant="outline" className="w-full border-[#00ff88] text-[#00ff88] hover:bg-[#00ff88] hover:text-black mb-2">
                      <UserIcon className="w-4 h-4 mr-2" />
                      {t("nav.dashboard")}
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    onClick={() => { setIsMobileMenuOpen(false); signOut({ callbackUrl: '/' }); }}
                    className="w-full border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
                  >
                    退出
                  </Button>
                </>
              ) : (
                <Link 
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="outline" className="w-full border-[#00ff88] text-[#00ff88] hover:bg-[#00ff88] hover:text-black">
                    {t("nav.login")}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

