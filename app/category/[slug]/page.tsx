import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostsByCategory, getAllCategories } from "@/lib/posts-markdown";
import AnimatedCard from "@/components/AnimatedCard";
import HoverCard from "@/components/HoverCard";
import Card3D from "@/components/Card3D";

export function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const categories = getAllCategories();
  const category = categories.find((c) => c.slug === slug);
  const categoryName = category?.name || slug;

  return {
    title: `${categoryName} | カテゴリー | トシぼうのブログ`,
    description: `${categoryName}カテゴリーの記事一覧です。`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categories = getAllCategories();
  const category = categories.find((c) => c.slug === slug);
  const categoryName = category?.name;

  if (!categoryName) {
    notFound();
  }

  const posts = getPostsByCategory(slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-white">
          {categoryName} カテゴリー
        </h1>
        <p className="text-gray-400">
          {posts.length}件の記事が見つかりました
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="bg-gray-800 rounded-lg shadow-md p-8 text-center border border-gray-700">
          <p className="text-gray-400 mb-4">このカテゴリーにはまだ記事がありません。</p>
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
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => {
                          const tagSlug = tag.toLowerCase();
                          return (
                            <Link
                              key={tag}
                              href={`/tag/${tagSlug}`}
                              className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-full text-sm transition-colors"
                              prefetch={true}
                            >
                              {tag}
                            </Link>
                          );
                        })}
                      </div>
                    )}
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
