import { getPublishedPosts } from "@/lib/posts-markdown";
import Link from "next/link";

export default function ArchiveList() {
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
    })
    .slice(0, 5); // 最新5件を表示

  if (archives.length === 0) {
    return (
      <div className="p-4">
        <p className="text-gray-400 text-sm">アーカイブがまだありません。</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <ul className="space-y-2">
        {archives.map((archive) => (
          <li key={`${archive.year}-${archive.month}`}>
            <Link
              href={`/archive/${archive.year}/${parseInt(archive.month)}`}
              className="text-gray-300 hover:text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 rounded flex items-center justify-between"
              prefetch={true}
            >
              <span>{archive.year}年{parseInt(archive.month)}月</span>
              <span className="bg-gray-700 text-slate-300 px-2 py-0.5 rounded-full text-xs font-semibold">
                {archive.count}件
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {Object.keys(archiveMap).length > 5 && (
        <Link
          href="/archive"
          className="text-slate-300 hover:text-slate-200 text-sm font-semibold mt-2 inline-block transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 rounded"
          prefetch={true}
        >
          アーカイブ一覧へ →
        </Link>
      )}
    </div>
  );
}

