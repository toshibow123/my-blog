import { getAllTags } from "@/lib/posts-markdown";
import Link from "next/link";

export default function PopularTags() {
  const allTags = getAllTags();
  // 人気タグ（記事数が多い順に最大8個）
  const popularTags = allTags.slice(0, 8);

  if (popularTags.length === 0) {
    return (
      <div className="p-4">
        <p className="text-gray-400 text-sm">タグがまだありません。</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-2 mb-2">
        {popularTags.map((tag) => (
          <Link
            key={tag.slug}
            href={`/tag/${tag.slug}`}
            className="bg-gradient-to-r from-gray-700/80 to-gray-700/60 hover:from-gray-600 hover:to-gray-600/80 text-white px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-400 backdrop-blur-sm hover:scale-105 hover:shadow-md"
            prefetch={true}
            title={`${tag.name}タグの記事（${tag.count}件）`}
          >
            {tag.name} <span className="text-gray-300 font-semibold">({tag.count})</span>
          </Link>
        ))}
      </div>
      {allTags.length > 8 && (
        <Link
          href="/tags"
          className="text-slate-300 hover:text-slate-200 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 rounded inline-block mt-2"
          prefetch={true}
        >
          タグ一覧へ →
        </Link>
      )}
    </div>
  );
}

