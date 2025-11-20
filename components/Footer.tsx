import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-12" role="contentinfo">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* サイト情報 */}
          <div>
            <h3 className="text-xl font-bold mb-4">トシぼうのブログ</h3>
            <p className="text-gray-400 text-sm">
              節約しながらもマッチョをあきらめず、AIや資産形成も大好き。
              このブログが少しでも参考になればうれしいです！
            </p>
          </div>

          {/* ナビゲーション */}
          <nav aria-label="フッターナビゲーション">
            <h3 className="text-xl font-bold mb-4">ナビゲーション</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
                  prefetch={true}
                >
                  ホーム
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
                  prefetch={true}
                >
                  プロフィール
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
                  prefetch={true}
                >
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </nav>

          {/* 必須ページ */}
          <nav aria-label="フッターリンク">
            <h3 className="text-xl font-bold mb-4">その他</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
                  prefetch={true}
                >
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
                  prefetch={true}
                >
                  利用規約
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap"
                  className="text-gray-400 hover:text-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
                  prefetch={true}
                >
                  サイトマップ
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* コピーライト */}
        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
          <p>© {currentYear} トシぼうのブログ All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

