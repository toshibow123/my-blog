import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 静的エクスポートの設定（Xサーバー用）
  output: process.env.NEXT_PUBLIC_STATIC_EXPORT === "true" ? "export" : undefined,
  // セキュリティヘッダーの設定（静的エクスポート時は無効）
  async headers() {
    // 静的エクスポート時はヘッダー設定をスキップ
    if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "true") {
      return [];
    }
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://cdnjs.cloudflare.com", // GSAP、Next.js、Google Analytics、Prism.jsのため
              "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com", // Prism.jsのCSSのため
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://*.supabase.co", // Google Analytics、Supabaseのため
              "frame-ancestors 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
  // 本番環境でのソースマップを無効化（セキュリティ向上）
  productionBrowserSourceMaps: false,
};

export default nextConfig;
