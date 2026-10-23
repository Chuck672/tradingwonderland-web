import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { LanguageProvider } from '@/components/language-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AuthProvider } from '@/components/auth-provider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const metadata: Metadata = {
  metadataBase: new URL('https://quantlogiclab.com'),
  title: {
    default: 'QuantLogicLab — Quantitative research and MQL5 education',
    template: '%s | QuantLogicLab',
  },
  description: 'QuantLogicLab publishes quantitative research, MQL5 education, tick-data visualization tools, and a strategy research library. The material is for study and backtesting. It is not investment advice.',
  keywords: ['QuantLogicLab', '量化逻辑实验室', 'Quantitative Analysis', 'MQL5', 'Data Modeling', 'Algorithmic Logic', 'Tick Data Visualization'],
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
    title: 'QuantLogicLab',
    description: 'Quantitative research, MQL5 education, tick-data visualization, and a strategy research library. For study and backtesting, not investment advice.',
    type: 'website',
    locale: 'en_US',
    siteName: 'QuantLogicLab',
    url: 'https://quantlogiclab.com/',
    images: [
      {
        url: '/favicon.png',
        width: 512,
        height: 512,
        alt: 'QuantLogicLab',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'QuantLogicLab',
    description: 'Quantitative research, MQL5 education, tick-data visualization, and a strategy research library. For study and backtesting, not investment advice.',
    images: ['/favicon.png'],
  },
};

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "QuantLogicLab",
              "alternateName": "量化逻辑实验室",
              "url": "https://quantlogiclab.com/",
              "publisher": {
                "@type": "Organization",
                "name": "QuantLogicLab",
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
              "name": "QuantLogicLab",
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
        <AuthProvider session={session}>
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
