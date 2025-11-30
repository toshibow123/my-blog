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
  { name: "免責事項", path: "/disclaimer" },
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
      <h1 className="text-3xl font-title mb-6 text-white">サイトマップ</h1>
      
      <div className="bg-gray-800 rounded-lg shadow-md p-8 space-y-8 border border-gray-700">
        {/* 主要ページ */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">主要ページ</h2>
          <ul className="space-y-2">
            {pages.map((page) => (
              <li key={page.path}>
                <Link
                  href={page.path}
                  className="text-slate-300 hover:text-slate-200 underline"
                  prefetch={true}
                >
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* カテゴリー */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">カテゴリー</h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.path}>
                <Link
                  href={category.path}
                  className="text-slate-300 hover:text-slate-200 underline"
                  prefetch={true}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* アーカイブ */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">アーカイブ</h2>
          <ul className="space-y-2">
            <li>
              <Link
                href="/archive/2025/10"
                className="text-slate-300 hover:text-slate-200 underline"
                prefetch={true}
              >
                2025年10月
              </Link>
            </li>
            <li>
              <Link
                href="/archive/2025/08"
                className="text-slate-300 hover:text-slate-200 underline"
                prefetch={true}
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

