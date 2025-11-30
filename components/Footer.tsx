import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white mt-12 border-t border-gray-800/50" role="contentinfo">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* サイト情報 */}
          <div>
            <h3 className="text-xl font-title mb-4 text-white">トシぼうのブログ</h3>
            <p className="text-gray-400 text-sm mb-4">
              節約しながらもマッチョをあきらめず、AIや資産形成も大好き。
              このブログが少しでも参考になればうれしいです！
            </p>
            <SocialLinks />
            <div className="mt-4">
              <a
                href="/feed.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-slate-300 transition-colors text-sm"
                aria-label="RSSフィード"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795.001 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z" />
                </svg>
                RSSフィード
              </a>
            </div>
          </div>

          {/* ナビゲーション */}
          <nav aria-label="フッターナビゲーション">
            <h3 className="text-xl font-title mb-4 text-white">ナビゲーション</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 rounded"
                  prefetch={true}
                >
                  ホーム
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 rounded"
                  prefetch={true}
                >
                  プロフィール
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 rounded"
                  prefetch={true}
                >
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </nav>

          {/* 必須ページ */}
          <nav aria-label="フッターリンク">
            <h3 className="text-xl font-title mb-4 text-white">その他</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 rounded"
                  prefetch={true}
                >
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 rounded"
                  prefetch={true}
                >
                  利用規約
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap"
                  className="text-gray-400 hover:text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 rounded"
                  prefetch={true}
                >
                  サイトマップ
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-gray-400 hover:text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 rounded"
                  prefetch={true}
                >
                  免責事項
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* コピーライト */}
        <div className="border-t border-gray-800/50 pt-6 text-center text-sm text-gray-400">
          <p>© {currentYear} トシぼうのブログ All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

