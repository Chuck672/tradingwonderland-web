"use client";

import { useLanguage } from "./language-provider";
import { Instagram, MessageCircle, Send, Twitter, Youtube } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          {/* Social Media */}
          <div>
            <h3 className="text-[#00ff88] font-bold text-lg mb-4">{t("footer.social")}</h3>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="text-gray-400 hover:text-[#00ff88] transition-colors flex items-center gap-2 text-sm">
                <span className="bg-white/10 px-2 py-1 rounded-md">小红书</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#00ff88] transition-colors flex items-center gap-2 text-sm">
                <span className="bg-white/10 px-2 py-1 rounded-md">抖音</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#00ff88] transition-colors flex items-center gap-2 text-sm">
                <span className="bg-white/10 px-2 py-1 rounded-md">快手</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#00ff88] transition-colors flex items-center gap-2 text-sm">
                <span className="bg-white/10 px-2 py-1 rounded-md">bilibili</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#00ff88] transition-colors flex items-center gap-2 text-sm">
                <Twitter className="w-5 h-5" />
                <span>X</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#00ff88] transition-colors flex items-center gap-2 text-sm">
                <Youtube className="w-5 h-5" />
                <span>YouTube</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#00ff88] transition-colors flex items-center gap-2 text-sm">
                <Instagram className="w-5 h-5" />
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[#00ff88] font-bold text-lg mb-4">{t("footer.contact")}</h3>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="text-gray-400 hover:text-[#00ff88] transition-colors flex items-center gap-2 text-sm">
                <Send className="w-5 h-5" />
                <span>Telegram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#00ff88] transition-colors flex items-center gap-2 text-sm">
                <span className="bg-white/10 px-2 py-1 rounded-md">飞书</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#00ff88] transition-colors flex items-center gap-2 text-sm">
                <MessageCircle className="w-5 h-5" />
                <span>Discord</span>
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-white/10 pt-8">
          <h4 className="text-gray-300 font-semibold text-sm mb-2">{t("footer.disclaimer.title")}</h4>
          <p className="text-gray-500 text-xs leading-relaxed max-w-5xl">
            {t("footer.disclaimer.text")}
          </p>
        </div>
      </div>
    </footer>
  );
}
