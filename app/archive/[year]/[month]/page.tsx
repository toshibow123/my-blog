import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/posts-markdown";
import AnimatedCard from "@/components/AnimatedCard";
import HoverCard from "@/components/HoverCard";
import Card3D from "@/components/Card3D";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string; month: string }>;
}): Promise<Metadata> {
  const { year, month } = await params;
  return {
    title: `${year}年${month}月 | アーカイブ | トシぼうのブログ`,
    description: `${year}年${month}月の記事一覧です。`,
  };
}

export default async function ArchivePage({
  params,
}: {
  params: Promise<{ year: string; month: string }>;
}) {
  const { year, month } = await params;
  const yearNum = parseInt(year);
  const monthNum = parseInt(month);

  if (isNaN(yearNum) || isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
    notFound();
  }

  // 記事の日付から該当月の記事をフィルタリング
  const allPosts = getPublishedPosts();
  const posts = allPosts.filter((post) => {
    // 日付文字列から年月を抽出（例: "2025年10月16日"）
    const dateMatch = post.date.match(/(\d{4})年(\d{1,2})月/);
    if (!dateMatch) return false;
    const postYear = parseInt(dateMatch[1]);
    const postMonth = parseInt(dateMatch[2]);
    return postYear === yearNum && postMonth === monthNum;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-white">
          {year}年{month}月のアーカイブ
        </h1>
        <p className="text-gray-400">
          {posts.length}件の記事が見つかりました
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="bg-gray-800 rounded-lg shadow-md p-8 text-center border border-gray-700">
          <p className="text-gray-400 mb-4">この期間の記事はありません。</p>
          <Link
            href="/"
            className="text-yellow-400 hover:text-yellow-300 font-semibold underline"
          >
            ホームに戻る
          </Link>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700">
          {posts.map((post, index) => (
            <AnimatedCard key={post.slug} delay={index * 0.1}>
              <Card3D>
                <HoverCard className="p-6 border-b border-gray-700 last:border-b-0">
                  <article>
                    <div className="flex items-start justify-between mb-2">
                      <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                        {post.category}
                      </span>
                      <span className="text-gray-400 text-sm">{post.date}</span>
                    </div>
                    <h2 className="text-xl font-bold mb-2 text-white">
                      <Link
                        href={`/posts/${post.slug}`}
                        className="hover:text-yellow-400 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
                        prefetch={true}
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-gray-300 mb-4 line-clamp-2">{post.excerpt}</p>
                    <Link
                      href={`/posts/${post.slug}`}
                      className="text-yellow-400 hover:text-yellow-300 font-semibold inline-flex items-center gap-1 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
                      prefetch={true}
                      aria-label={`${post.title}の続きを読む`}
                    >
                      続きを読む →
                    </Link>
                  </article>
                </HoverCard>
              </Card3D>
            </AnimatedCard>
          ))}
        </div>
      )}

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

