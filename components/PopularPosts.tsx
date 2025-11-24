import Link from "next/link";
import { getPublishedPosts } from "@/lib/posts-markdown";

export default function PopularPosts() {
  // 最新の5記事を人気記事として表示（将来的にアクセス数などでソート可能）
  const popularPosts = getPublishedPosts().slice(0, 5);

  if (popularPosts.length === 0) {
    return (
      <div className="p-4">
        <p className="text-gray-400 text-sm">記事がありません</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      {popularPosts.map((post, index) => (
        <Link
          key={post.slug}
          href={`/posts/${post.slug}`}
          className="block p-3 bg-gradient-to-r from-gray-700/80 to-gray-700/60 hover:from-gray-600 hover:to-gray-600/80 rounded-xl transition-all duration-300 border border-gray-600/50 hover:border-slate-400/50 group backdrop-blur-sm hover:shadow-lg hover:shadow-slate-500/10"
          prefetch={true}
        >
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-slate-700 text-slate-200 rounded-full flex items-center justify-center text-xs font-bold shadow-md border border-slate-600">
              {index + 1}
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2 group-hover:text-slate-300 transition-colors">
                {post.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="bg-gray-600 px-2 py-0.5 rounded text-gray-300">
                  {post.category}
                </span>
                <span>{post.date}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

