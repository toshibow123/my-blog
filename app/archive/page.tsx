import Link from "next/link";
import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/posts-markdown";

export const metadata: Metadata = {
  title: "アーカイブ | トシぼうのブログ",
  description: "記事のアーカイブ一覧です。",
};

export default function ArchiveIndexPage() {
  const posts = getPublishedPosts();
  
  // 年月ごとに記事をグループ化
  const archiveMap: Record<string, number> = {};
  posts.forEach((post) => {
    const dateMatch = post.date.match(/(\d{4})年(\d{1,2})月/);
    if (dateMatch) {
      const year = dateMatch[1];
      const month = dateMatch[2].padStart(2, "0");
      const key = `${year}-${month}`;
      archiveMap[key] = (archiveMap[key] || 0) + 1;
    }
  });

  const archives = Object.entries(archiveMap)
    .map(([key, count]) => {
      const [year, month] = key.split("-");
      return { year, month, count };
    })
    .sort((a, b) => {
      if (a.year !== b.year) return parseInt(b.year) - parseInt(a.year);
      return parseInt(b.month) - parseInt(a.month);
    });

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-white">アーカイブ</h1>
      
      <div className="bg-gray-800 rounded-lg shadow-md p-8 border border-gray-700">
        <div className="space-y-4">
          {archives.map((archive) => (
            <Link
              key={`${archive.year}-${archive.month}`}
              href={`/archive/${archive.year}/${parseInt(archive.month)}`}
              className="flex items-center justify-between p-4 hover:bg-gray-700 rounded-lg transition-colors border border-gray-600 hover:border-yellow-400"
              prefetch={true}
            >
              <span className="text-lg font-semibold text-white">
                {archive.year}年{parseInt(archive.month)}月
              </span>
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                {archive.count}件
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="text-yellow-400 hover:text-yellow-300 font-semibold underline"
        >
          ← ホームに戻る
        </Link>
      </div>
    </div>
  );
}

