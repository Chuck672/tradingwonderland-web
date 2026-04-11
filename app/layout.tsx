import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { LanguageProvider } from '@/components/language-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AuthProvider } from '@/components/auth-provider';

export const metadata: Metadata = {
  title: {
    default: '量化逻辑实验室 (QuantLogicLab) - 专注量化数据分析与 MQL5 编程教学',
    template: '%s | 量化逻辑实验室 (QuantLogicLab)',
  },
  description: '量化逻辑实验室 (QuantLogicLab) 提供时间序列数据建模、MQL5 编程教学、原始 Tick 数据可视化工具与量化分析策略库。专注于金融数据工程与算法逻辑开发，不提供投资建议。',
  keywords: ['QuantLogicLab', '量化逻辑实验室', '数据建模', 'MQL5编程', '时间序列分析', '算法逻辑', 'Quantitative Analysis', 'Data Modeling', 'Algorithmic Logic', 'Tick Data Visualization'],
  alternates: {
    canonical: "https://quantlogiclab.com",
    languages: {
      "zh-CN": "https://quantlogiclab.com/",
      "zh-HK": "https://quantlogiclab.com/",
      "zh-TW": "https://quantlogiclab.com/",
      "zh-Hant": "https://quantlogiclab.com/",
      "en": "https://quantlogiclab.com/",
      "x-default": "https://quantlogiclab.com/"
    }
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
    shortcut: '/favicon.png',
  },
  openGraph: {
    title: '量化逻辑实验室 (QuantLogicLab)',
    description: '提供时间序列数据建模、MQL5 编程教学、原始 Tick 数据可视化工具与量化分析策略库。',
    type: 'website',
    locale: 'zh_CN',
    siteName: '量化逻辑实验室 (QuantLogicLab)',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="zh-CN">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "量化逻辑实验室",
              "alternateName": "QuantLogicLab",
              "url": "https://quantlogiclab.com/",
              "publisher": {
                "@type": "Organization",
                "name": "量化逻辑实验室 (QuantLogicLab)",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://quantlogiclab.com/favicon.png"
                }
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "量化逻辑实验室 (QuantLogicLab)",
              "url": "https://quantlogiclab.com/",
              "logo": "https://quantlogiclab.com/favicon.png",
              "sameAs": [
                "https://www.youtube.com/@quantlogiclab",
                "https://twitter.com/quantlogiclab"
              ]
            })
          }}
        />
      </head>
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
