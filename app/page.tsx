import Link from "next/link";
import AnimatedCard from "@/components/AnimatedCard";
import HoverCard from "@/components/HoverCard";
import Card3D from "@/components/Card3D";
import AnimatedText from "@/components/AnimatedText";
import { getPublishedPosts } from "@/lib/posts-markdown";
import PopularTags from "@/components/PopularTags";
import ArchiveList from "@/components/ArchiveList";
import PopularPosts from "@/components/PopularPosts";
import ProfileCard from "@/components/ProfileCard";
import NewsletterForm from "@/components/NewsletterForm";

const categories = [
  { name: "Programming", icon: "💻", slug: "programming" },
  { name: "Migration", icon: "🏠", slug: "migration" },
  { name: "Saving", icon: "💰", slug: "saving" },
  { name: "Fitness", icon: "💪", slug: "fitness" },
  { name: "AI", icon: "🤖", slug: "ai" },
  { name: "Investment", icon: "📈", slug: "investment" },
  { name: "Others", icon: "📦", slug: "uncategorized" },
];

export default function Home() {
  // Markdownファイルから記事を取得
  const publishedPosts = getPublishedPosts();
  
  // 注目記事（最新1件を大きく表示）
  const mainFeaturedPost = publishedPosts[0];
  // サブ注目記事（次の2件）
  const subFeaturedPosts = publishedPosts.slice(1, 3);
  // 新着記事（残り）
  const recentPosts = publishedPosts.slice(3);

  // 画像パスの正規化
  const getHeroImageUrl = (path: string | undefined) => {
    if (!path) return undefined;
    if (path.startsWith("http") || path.startsWith("/")) return path;
    return `/images/${path}`;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-min">
        
        {/* 1. プロフィールカード (左上) */}
        <div className="md:col-span-1 lg:col-span-1 row-span-2">
          <AnimatedCard delay={0}>
            <ProfileCard />
          </AnimatedCard>
        </div>

        {/* 2. メイン注目記事 (中央上・大) */}
        <div className="md:col-span-2 lg:col-span-2 row-span-2">
          {mainFeaturedPost ? (
            <AnimatedCard delay={0.1}>
              <Card3D className="h-full">
                <HoverCard 
                  className="h-full glass-effect overflow-hidden relative group bg-cover bg-center transition-all duration-700"
                  style={
                    // @ts-ignore: hero_image property might not be in type definition yet
                    mainFeaturedPost.hero_image 
                      // @ts-ignore
                      ? { backgroundImage: `url("${getHeroImageUrl(mainFeaturedPost.hero_image)}")` }
                      : {}
                  }
                >
                  <Link href={`/posts/${mainFeaturedPost.slug}`} className="block h-full p-8 flex flex-col justify-end relative z-10">
                     {/* オーバーレイ */}
                     <div className={`absolute inset-0 transition-all duration-500 ${
                       // @ts-ignore
                       mainFeaturedPost.hero_image 
                         ? "bg-black/40 group-hover:bg-black/30 group-hover:backdrop-blur-[2px]" // 画像あり
                         : "bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" // 画像なし
                     }`} />
                     
                     {/* グラデーションオーバーレイ（文字の可読性用） */}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90" />

                     <div className="relative z-20 transform transition-transform duration-500 group-hover:-translate-y-2">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="bg-white text-black px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                            NEW
                          </span>
                          <span className="text-gray-300 text-xs font-medium tracking-wider uppercase">{mainFeaturedPost.category}</span>
                        </div>
                        
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight tracking-tight drop-shadow-lg">
                          {mainFeaturedPost.title}
                        </h2>
                        
                        <p className="text-gray-200 mb-6 line-clamp-3 leading-relaxed text-lg font-light drop-shadow-md">
                          {mainFeaturedPost.excerpt}
                        </p>
                        
                        <div className="inline-flex items-center gap-2 text-white font-semibold group-hover:underline underline-offset-4">
                          Read Article
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </div>
                     </div>
                  </Link>
                </HoverCard>
              </Card3D>
            </AnimatedCard>
          ) : (
            <div className="h-full flex items-center justify-center glass-effect p-8 text-gray-400">
              No content available
            </div>
          )}
        </div>

        {/* 3. 検索＆カテゴリー (右上) */}
        <div className="md:col-span-1 lg:col-span-1 flex flex-col gap-6">
            {/* 検索 */}
            <AnimatedCard delay={0.2}>
              <div className="glass-effect p-4">
                <form action="/search" method="get" className="relative">
                    <input 
                        type="search" 
                        name="q"
                        placeholder="Search..." 
                        className="w-full bg-white/10 text-white border-none rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-gray-500"
                    />
                    <svg className="w-5 h-5 text-gray-500 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </form>
              </div>
            </AnimatedCard>

            {/* カテゴリーリスト */}
            <AnimatedCard delay={0.3}>
              <div className="glass-effect p-5">
                 <h3 className="font-bold text-gray-200 mb-4 text-sm uppercase tracking-wider opacity-70">
                    Categories
                 </h3>
                 <div className="grid grid-cols-2 gap-2">
                    {categories.map((cat) => (
                        <Link 
                            key={cat.slug} 
                            href={`/category/${cat.slug}`}
                            className="flex flex-col items-center justify-center p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-center group"
                        >
                            <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">{cat.icon}</span>
                            <span className="text-xs text-gray-300 font-medium">{cat.name}</span>
                        </Link>
                    ))}
                 </div>
              </div>
            </AnimatedCard>
        </div>

        {/* 4. サブ注目記事 (中段) */}
        {subFeaturedPosts.map((post, index) => (
            <div key={post.slug} className="md:col-span-1 lg:col-span-2">
                <AnimatedCard delay={0.4 + index * 0.1}>
                  <HoverCard 
                    className="h-full glass-effect p-6 hover:bg-white/5 transition-colors group relative overflow-hidden bg-cover bg-center"
                    style={
                      // @ts-ignore
                      post.hero_image 
                        // @ts-ignore
                        ? { backgroundImage: `url("${getHeroImageUrl(post.hero_image)}")` }
                        : {}
                    }
                  >
                     {/* オーバーレイ */}
                     <div className={`absolute inset-0 transition-all duration-500 ${
                       // @ts-ignore
                       post.hero_image 
                         ? "bg-black/60 group-hover:bg-black/50" 
                         : ""
                     }`} />
                     
                     <Link href={`/posts/${post.slug}`} className="flex flex-col h-full relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-300 bg-black/30 px-2 py-1 rounded">
                                {post.category}
                            </span>
                            <span className="text-gray-300 text-xs font-mono drop-shadow-md">• {post.date}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gray-200 transition-colors leading-tight drop-shadow-lg">
                            {post.title}
                        </h3>
                        <p className="text-gray-300 text-sm line-clamp-2 mb-4 flex-grow leading-relaxed font-light drop-shadow-md">
                            {post.excerpt}
                        </p>
                        <div className="text-white text-sm font-semibold flex items-center gap-1 group-hover:underline underline-offset-4">
                            Read More
                        </div>
                     </Link>
                  </HoverCard>
                </AnimatedCard>
            </div>
        ))}

        {/* 5. 人気タグ (中段右) */}
        <div className="md:col-span-1 lg:col-span-1">
            <AnimatedCard delay={0.6}>
                <div className="glass-effect p-6 h-full">
                    <h3 className="font-bold text-gray-200 mb-4 text-sm uppercase tracking-wider opacity-70">
                        Popular Tags
                    </h3>
                    <PopularTags />
                </div>
            </AnimatedCard>
        </div>
        
        {/* 6. メールマガジン (中段右) */}
        <div className="md:col-span-1 lg:col-span-1">
             <AnimatedCard delay={0.7}>
                <div className="glass-effect p-6 h-full bg-gradient-to-br from-blue-900/20 to-transparent">
                    <h3 className="font-bold text-white mb-2">Newsletter</h3>
                    <p className="text-xs text-gray-400 mb-4 font-light">Stay updated with our latest stories.</p>
                    <NewsletterForm />
                </div>
             </AnimatedCard>
        </div>

        {/* 7. 区切り（見出し） */}
        <div className="md:col-span-3 lg:col-span-4 mt-12 mb-6">
             <h2 className="text-4xl font-bold text-white tracking-tight">
                Latest Stories
             </h2>
        </div>

        {/* 8. 新着記事一覧 (下段) */}
        {recentPosts.map((post, index) => (
            <div key={post.slug} className="md:col-span-1 lg:col-span-1">
                <AnimatedCard delay={0.1 * index}>
                    <HoverCard className="h-full glass-effect hover:bg-white/5 transition-colors group">
                        <Link href={`/posts/${post.slug}`} className="block p-6 h-full flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                                    {post.category}
                                </span>
                                <span className="text-gray-600 text-xs font-mono">
                                    {post.date}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-100 mb-3 leading-snug group-hover:text-white transition-colors">
                                {post.title}
                            </h3>
                            <p className="text-gray-400 text-sm line-clamp-3 flex-grow leading-relaxed font-light">
                                {post.excerpt}
                            </p>
                        </Link>
                    </HoverCard>
                </AnimatedCard>
            </div>
        ))}

        {/* 9. 人気記事 & アーカイブ (最下段) */}
         <div className="md:col-span-1 lg:col-span-2">
            <div className="glass-effect p-8">
                <h3 className="font-bold text-white mb-6 text-xl">Popular Posts</h3>
                <PopularPosts />
            </div>
         </div>
         
         <div className="md:col-span-1 lg:col-span-2">
            <div className="glass-effect p-8">
                <h3 className="font-bold text-white mb-6 text-xl">Archives</h3>
                <ArchiveList />
            </div>
         </div>

      </div>
    </div>
  );
}
