import Link from "next/link";
import type { Metadata } from "next";
import { getAllTags } from "@/lib/posts-markdown";

export const metadata: Metadata = {
  title: "タグ一覧 | トシぼうのブログ",
  description: "すべてのタグ一覧です。",
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-white">タグ一覧</h1>
      
      <div className="bg-gray-800 rounded-lg shadow-md p-8 border border-gray-700">
        {tags.length === 0 ? (
          <p className="text-gray-400 text-center">タグがまだありません。</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <Link
                key={tag.slug}
                href={`/tag/${tag.slug}`}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-yellow-500/50 border border-yellow-400"
                prefetch={true}
                title={`${tag.name}タグの記事（${tag.count}件）`}
              >
                {tag.name} <span className="text-gray-700">({tag.count})</span>
              </Link>
            ))}
          </div>
        )}
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

