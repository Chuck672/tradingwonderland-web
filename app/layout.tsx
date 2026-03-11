import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { LanguageProvider } from '@/components/language-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AuthProvider } from '@/components/auth-provider';

export const metadata: Metadata = {
  title: '绿洲交易社区 (Trading WonderLand)',
  description: '提供专业交易工具与策略库，用数据驱动每一次决策',
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
