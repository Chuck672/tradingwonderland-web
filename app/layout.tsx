import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { LanguageProvider } from '@/components/language-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AuthProvider } from '@/components/auth-provider';

export const metadata: Metadata = {
  title: {
    default: '绿洲交易社区 (Trading WonderLand) - 专业外汇交易课程与AI量化工具',
    template: '%s | 绿洲交易社区 (Trading WonderLand)',
  },
  description: '提供专业外汇交易学习课程、MT5交易高级指标、AI量化工具、订单流分析与策略库。帮助交易者建立完善的交易系统，用数据驱动每一次决策。',
  keywords: ['交易学习', '外汇交易课程', '交易工具', '交易高级指标', 'AI量化工具', '订单流', 'Trading Learning', 'Forex Trading Course', 'Trading Tools', 'Order Flow', 'Quantitative Trading'],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: '绿洲交易社区 (Trading WonderLand)',
    description: '提供专业外汇交易学习课程、MT5交易高级指标、AI量化工具、订单流分析与策略库。',
    type: 'website',
    locale: 'zh_CN',
    siteName: 'Trading WonderLand',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="antialiased flex flex-col min-h-screen">
        <AuthProvider>
          <LanguageProvider>
            <Navbar />
            <main className="pt-16 flex-grow">
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
