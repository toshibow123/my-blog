import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import AnimatedCard from "@/components/AnimatedCard";
import HoverCard from "@/components/HoverCard";
import Card3D from "@/components/Card3D";
import AnimatedText from "@/components/AnimatedText";
import { getPublishedPosts } from "@/lib/posts-markdown";
import PopularTags from "@/components/PopularTags";
import ArchiveList from "@/components/ArchiveList";
import PopularPosts from "@/components/PopularPosts";
import ProfileCard from "@/components/ProfileCard";

export default function Home() {
  // Markdownファイルから記事を取得
  const publishedPosts = getPublishedPosts();
  
  // 注目記事（最新2件）
  const featuredPosts = publishedPosts.slice(0, 2);

  // 新着記事（残り）
  const recentPosts = publishedPosts.slice(2);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* メインコンテンツ */}
        <main className="flex-1">
          {/* 注目記事 */}
          <AnimatedCard>
            <section className="mb-8">
              <AnimatedText
                text="注目記事"
                as="h2"
                className="text-2xl font-title mb-4 text-white"
              />
              <div className="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50 backdrop-blur-sm">
                {featuredPosts.length > 0 ? (
                  featuredPosts.map((post, index) => (
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
                            <h3 className="text-xl font-title mb-3 text-white leading-tight">
                              <Link
                                href={`/posts/${post.slug}`}
                                className="hover:text-slate-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-400 rounded"
                                prefetch={true}
                              >
                                {post.title}
                              </Link>
                            </h3>
                            <p className="text-gray-300 mb-4 line-clamp-2 leading-relaxed">{post.excerpt}</p>
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
            </section>
          </AnimatedCard>

          {/* 新着記事 */}
          <AnimatedCard delay={0.2}>
            <section className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <AnimatedText
                  text="新着記事"
                  as="h2"
                  className="text-2xl font-title text-white"
                  delay={0.2}
                />
                <Link
                  href="/posts"
                  className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-full font-semibold transition-all shadow-md hover:shadow-lg inline-flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                  prefetch={true}
                >
                  すべての記事を見る →
                </Link>
              </div>
              <div className="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50 backdrop-blur-sm">
                {recentPosts.length > 0 ? (
                  recentPosts.map((post, index) => (
                    <AnimatedCard key={post.slug} delay={index * 0.1}>
                      <Card3D>
                        <HoverCard className="p-5 border-b border-gray-700/30 last:border-b-0 hover:bg-gray-700/20 transition-colors">
                          <article>
                            <div className="flex items-center justify-between mb-3">
                              <span className="bg-gray-700/80 text-gray-200 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                                {post.category}
                              </span>
                              <span className="text-gray-400 text-xs font-medium">{post.date}</span>
                            </div>
                            <h3 className="text-lg font-title text-white leading-tight">
                              <Link
                                href={`/posts/${post.slug}`}
                                className="hover:text-slate-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-400 rounded"
                                prefetch={true}
                              >
                                {post.title}
                              </Link>
                            </h3>
                          </article>
                        </HoverCard>
                      </Card3D>
                    </AnimatedCard>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-400">
                    記事がまだありません。
                  </div>
                )}
              </div>
            </section>
          </AnimatedCard>
        </main>

        {/* サイドバー */}
        <aside className="w-full lg:w-80 space-y-6">
          {/* プロフィールカード */}
          <ProfileCard />
          
          {/* サイドバーコンテンツ */}
          <Sidebar 
            popularTags={<PopularTags />} 
            archiveList={<ArchiveList />}
            popularPosts={<PopularPosts />}
          />
        </aside>
      </div>
    </div>
  );
}
