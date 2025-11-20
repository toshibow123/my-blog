import Link from "next/link";

export const metadata = {
  title: "サイトマップ | トシぼうのブログ",
  description: "サイトマップページです。",
};

const pages = [
  { name: "ホーム", path: "/" },
  { name: "プロフィール", path: "/about" },
  { name: "お問い合わせ", path: "/contact" },
  { name: "プライバシーポリシー", path: "/privacy" },
  { name: "利用規約", path: "/terms" },
];

const categories = [
  { name: "プログラミング", path: "/category/programming" },
  { name: "移住", path: "/category/migration" },
  { name: "節約", path: "/category/saving" },
  { name: "筋トレ", path: "/category/fitness" },
  { name: "AI", path: "/category/ai" },
  { name: "資産形成", path: "/category/investment" },
  { name: "未分類", path: "/category/uncategorized" },
];

export default function SitemapPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">サイトマップ</h1>
      
      <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
        {/* 主要ページ */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">主要ページ</h2>
          <ul className="space-y-2">
            {pages.map((page) => (
              <li key={page.path}>
                <Link
                  href={page.path}
                  className="text-yellow-600 hover:text-yellow-700 underline"
                >
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* カテゴリー */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">カテゴリー</h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.path}>
                <Link
                  href={category.path}
                  className="text-yellow-600 hover:text-yellow-700 underline"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* アーカイブ */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">アーカイブ</h2>
          <ul className="space-y-2">
            <li>
              <Link
                href="/archive/2025/10"
                className="text-pink-600 hover:text-pink-700 underline"
              >
                2025年10月
              </Link>
            </li>
            <li>
              <Link
                href="/archive/2025/08"
                className="text-pink-600 hover:text-pink-700 underline"
              >
                2025年8月
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

