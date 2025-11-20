import Link from "next/link";
import { allPosts } from "@/lib/posts";
import AnimatedCard from "@/components/AnimatedCard";
import HoverCard from "@/components/HoverCard";

// ダークテーマのモダンなレイアウト（参考サイト風）
export default function HomeDark() {
  const featuredPost = allPosts[0];
  const recentPosts = allPosts.slice(1, 4);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* メインコンテンツエリア */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* 左側: ヒーロー画像エリア（2/3幅） */}
        <div className="lg:w-2/3 relative bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="h-full flex items-center justify-center p-8 lg:p-16">
            <div className="max-w-2xl">
              <AnimatedCard>
                <div className="space-y-6">
                  <h1 className="text-5xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 bg-clip-text text-transparent">
                    {featuredPost.title}
                  </h1>
                  <p className="text-xl text-gray-300 leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 pt-4">
                    <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      {featuredPost.category}
                    </span>
                    <span className="text-gray-400 text-sm">{featuredPost.date}</span>
                  </div>
                  <Link
                    href={`/posts/${featuredPost.slug}`}
                    className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-yellow-500/50 mt-6"
                    prefetch={true}
                  >
                    続きを読む →
                  </Link>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </div>

        {/* 右側: ニュース・記事一覧エリア（1/3幅、ダークグレー背景） */}
        <div className="lg:w-1/3 bg-gray-800 border-l border-gray-700 overflow-y-auto">
          <div className="p-6 lg:p-8 space-y-8">
            {/* NEWSセクション */}
            <section>
              <div className="relative mb-6">
                <h2 className="text-6xl font-bold text-white opacity-20 absolute -top-2 -left-2">
                  NEWS
                </h2>
                <h2 className="text-4xl font-bold text-white relative z-10">NEWS</h2>
              </div>
              <div className="space-y-4">
                {recentPosts.map((post, index) => (
                  <AnimatedCard key={post.id} delay={index * 0.1}>
                    <HoverCard>
                      <Link
                        href={`/posts/${post.slug}`}
                        className="block p-4 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors border border-gray-600 hover:border-yellow-500/50"
                        prefetch={true}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs text-gray-400">{post.date}</span>
                              <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs font-semibold">
                                NEW!
                              </span>
                            </div>
                            <h3 className="text-white font-semibold mb-1 line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-gray-400 text-sm line-clamp-1">{post.excerpt}</p>
                          </div>
                          <span className="text-yellow-400">→</span>
                        </div>
                      </Link>
                    </HoverCard>
                  </AnimatedCard>
                ))}
              </div>
              <Link
                href="/posts"
                className="block text-center text-yellow-400 hover:text-yellow-300 font-semibold mt-4 transition-colors"
                prefetch={true}
              >
                MORE →
              </Link>
            </section>

            {/* CALENDARセクション */}
            <section>
              <div className="relative mb-6">
                <h2 className="text-6xl font-bold text-white opacity-20 absolute -top-2 -left-2">
                  CALENDAR
                </h2>
                <h2 className="text-4xl font-bold text-white relative z-10">CALENDAR</h2>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                <p className="text-gray-300 text-sm">
                  最新の投稿スケジュールやイベント情報をお知らせします。
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

