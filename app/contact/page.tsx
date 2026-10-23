"use client";

import { ArrowLeft, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import Image from "next/image";

export default function ContactPage() {
  const [showWechat, setShowWechat] = useState(false);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto bg-[#0a0a0a] relative">
      <Link href="/subscribe" className="inline-flex items-center text-gray-400 hover:text-[#00ff88] transition-colors mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        返回购买页
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">联系社区助理</h1>
          <p className="text-gray-400">选择您常用的联系方式，助理将为您提供详细的订阅指引</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Telegram */}
          <a 
            href="https://t.me/TradingWLassistant" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-4 p-6 rounded-2xl bg-[#111111] border border-white/10 hover:border-[#00ff88]/50 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-[#0088cc]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6 text-[#0088cc]" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Telegram</h3>
              <p className="text-sm text-gray-400 mt-1">@TradingWLassistant</p>
            </div>
          </a>

          {/* Wechat Work */}
          <div 
            onClick={() => setShowWechat(true)}
            className="flex items-center gap-4 p-6 rounded-2xl bg-[#111111] border border-white/10 hover:border-[#00ff88]/50 transition-all group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-[#00ff88]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6 text-[#00ff88]" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">企业微信</h3>
              <p className="text-sm text-gray-400 mt-1">点击查看二维码</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Wechat Modal */}
      <AnimatePresence>
        {showWechat && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setShowWechat(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-sm w-full bg-[#111] rounded-2xl overflow-hidden border border-white/10 p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowWechat(false)}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 hover:bg-black text-white rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="relative w-full aspect-[1/2]">
                <Image 
                  src="/wechat.jpg" 
                  alt="企业微信二维码" 
                  fill 
                  className="object-contain rounded-xl"
                  priority
                />
              </div>
              <p className="text-center text-gray-400 text-sm mt-4 mb-2">扫描二维码添加助理企业微信</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}