import type { Metadata } from "next";
import { Inter, Noto_Sans_JP, Noto_Serif_JP, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.toshiboh.com"),
  title: {
    default: "トシぼうのブログ",
    template: "%s | トシぼうのブログ",
  },
  description: "節約しながらもマッチョをあきらめず、AIや資産形成も大好き。アラフォーで北海道に移住したトシぼうのブログです。",
  keywords: ["ブログ", "節約", "筋トレ", "AI", "資産形成", "北海道", "移住", "プログラミング"],
  authors: [{ name: "トシぼう" }],
  creator: "トシぼう",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://www.toshiboh.com",
    siteName: "トシぼうのブログ",
    title: "トシぼうのブログ",
    description: "節約しながらもマッチョをあきらめず、AIや資産形成も大好き。",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "トシぼうのブログ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "トシぼうのブログ",
    description: "節約しながらもマッチョをあきらめず、AIや資産形成も大好き。",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Google Search Consoleの検証コードを追加する場合はここに
    // google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* Prism.js for Syntax Highlighting */}
        <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              name: "トシぼうのブログ",
              description: "節約しながらもマッチョをあきらめず、AIや資産形成も大好き。",
              url: "https://www.toshiboh.com",
              author: {
                "@type": "Person",
                name: "トシぼう",
              },
              publisher: {
                "@type": "Person",
                name: "トシぼう",
              },
            })
              .replace(/</g, "\\u003c")
              .replace(/>/g, "\\u003e")
              .replace(/&/g, "\\u0026"),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${notoSansJP.variable} ${notoSerifJP.variable} ${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-white font-sans`}
      >
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <ScrollToTop /> {/* 追加 */}
        </div>
      </body>
    </html>
  );
}
