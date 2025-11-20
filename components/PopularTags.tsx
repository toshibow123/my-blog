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
            className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-full text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
            prefetch={true}
            title={`${tag.name}タグの記事（${tag.count}件）`}
          >
            {tag.name} <span className="text-gray-400">({tag.count})</span>
          </Link>
        ))}
      </div>
      {allTags.length > 8 && (
        <Link
          href="/tags"
          className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded inline-block mt-2"
          prefetch={true}
        >
          タグ一覧へ →
        </Link>
      )}
    </div>
  );
}

