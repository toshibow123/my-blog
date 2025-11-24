import Link from "next/link";
import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/posts-markdown";
import AnimatedCard from "@/components/AnimatedCard";
import HoverCard from "@/components/HoverCard";
import Card3D from "@/components/Card3D";

export const metadata: Metadata = {
  title: "記事一覧 | トシぼうのブログ",
  description: "すべての記事一覧です。",
};

export default function PostsPage() {
  // Markdownファイルから記事を取得
  const publishedPosts = getPublishedPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-title mb-2 text-white">記事一覧</h1>
        <p className="text-gray-400">
          {publishedPosts.length}件の記事があります
        </p>
      </div>

      <div className="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50 backdrop-blur-sm">
        {publishedPosts.length > 0 ? (
          publishedPosts.map((post, index) => (
            <AnimatedCard key={post.slug} delay={index * 0.1}>
              <Card3D>
                <HoverCard className="p-6 border-b border-gray-700/30 last:border-b-0 hover:bg-gray-700/20 transition-colors">
                  <article>
                    <div className="flex items-start justify-between mb-3">
                      <span className="bg-slate-700 text-slate-200 px-4 py-1.5 rounded-full text-xs font-semibold border border-slate-600">
                        {post.category}
                      </span>
                      <span className="text-gray-400 text-xs font-medium">{post.date}</span>
                    </div>
                    <h2 className="text-xl font-title mb-3 text-white leading-tight">
                      <Link
                        href={`/posts/${post.slug}`}
                        className="hover:text-slate-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-400 rounded"
                        prefetch={true}
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-gray-300 mb-4 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => {
                          const tagSlug = tag.toLowerCase();
                          return (
                            <Link
                              key={tag}
                              href={`/tag/${tagSlug}`}
                              className="bg-gray-700/80 hover:bg-gray-600 text-gray-200 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm"
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
                      className="group text-slate-300 hover:text-slate-200 font-semibold inline-flex items-center gap-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-400 rounded px-3 py-1.5 hover:bg-slate-700/50 rounded-lg"
                      prefetch={true}
                      aria-label={`${post.title}の続きを読む`}
                    >
                      続きを読む
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </article>
                </HoverCard>
              </Card3D>
            </AnimatedCard>
          ))
        ) : (
          <div className="p-6 text-center text-gray-400">
            記事がまだありません。管理者ページから記事を作成してください。
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

