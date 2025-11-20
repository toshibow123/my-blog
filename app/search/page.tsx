"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { allPosts } from "@/lib/posts";
import AnimatedCard from "@/components/AnimatedCard";
import HoverCard from "@/components/HoverCard";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState(allPosts);

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      const filtered = allPosts.filter((post) => {
        const searchLower = query.toLowerCase();
        return (
          post.title.toLowerCase().includes(searchLower) ||
          post.excerpt.toLowerCase().includes(searchLower) ||
          post.content?.toLowerCase().includes(searchLower) ||
          post.category.toLowerCase().includes(searchLower) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchLower))
        );
      });
      setResults(filtered);
    } else {
      setResults(allPosts);
    }
  }, [query]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchValue = formData.get("search") as string;
    if (searchValue) {
      window.location.href = `/search?q=${encodeURIComponent(searchValue)}`;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">検索結果</h1>
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-2xl">
          <input
            type="search"
            name="search"
            defaultValue={searchQuery}
            placeholder="キーワードを入力"
            className="flex-1 border border-gray-300 rounded px-4 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 px-6 py-2 rounded font-semibold transition-all shadow-md hover:shadow-yellow-500/50"
          >
            検索
          </button>
        </form>
        {query && (
          <p className="mt-4 text-gray-600">
            「{query}」の検索結果: {results.length}件
          </p>
        )}
      </div>

      {results.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 mb-4">検索結果が見つかりませんでした。</p>
          <Link
            href="/"
            className="text-yellow-600 hover:text-yellow-700 font-semibold underline"
          >
            ホームに戻る
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {results.map((post, index) => (
            <AnimatedCard key={post.id} delay={index * 0.1}>
              <HoverCard className="p-6 border-b last:border-b-0">
                <article>
                  <div className="flex items-start justify-between mb-2">
                    <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm">{post.date}</span>
                  </div>
                  <h2 className="text-xl font-bold mb-2 text-gray-900">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="hover:text-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
                      prefetch={true}
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-700 mb-4 line-clamp-2">{post.excerpt}</p>
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => {
                        const tagSlug = tag.toLowerCase();
                        return (
                          <Link
                            key={tag}
                            href={`/tag/${tagSlug}`}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm transition-colors"
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
                    className="text-yellow-600 hover:text-yellow-700 font-semibold inline-flex items-center gap-1 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
                    prefetch={true}
                    aria-label={`${post.title}の続きを読む`}
                  >
                    続きを読む →
                  </Link>
                </article>
              </HoverCard>
            </AnimatedCard>
          ))}
        </div>
      )}
    </div>
  );
}

