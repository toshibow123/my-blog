"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Post } from "@/lib/posts-markdown";

type SortOption = "date-desc" | "date-asc" | "title-asc" | "title-desc";
type ViewMode = "topics" | "cards";

interface LearningClientProps {
  posts: Post[];
}

interface TopicData {
  count: number;
  posts: Post[];
  explanation: string | null;
}

export default function LearningClient({ posts: allPosts }: LearningClientProps) {
  const [sortBy, setSortBy] = useState<SortOption>("date-desc");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<ViewMode>("topics");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // カテゴリーとタグの一覧を取得
  const categories = useMemo(() => {
    const cats = new Set(allPosts.map((p) => p.categorySlug));
    return Array.from(cats).map((slug) => {
      const post = allPosts.find((p) => p.categorySlug === slug);
      return { name: post?.category || slug, slug };
    });
  }, [allPosts]);

  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    allPosts.forEach((post) => {
      post.tags.forEach((tag) => {
        if (tag !== "今日の学び") tagSet.add(tag);
      });
    });
    return Array.from(tagSet).sort((a, b) => a.localeCompare(b, "ja"));
  }, [allPosts]);

  // トピック一覧を取得（解説付き）
  const topicsMap = useMemo(() => {
    const map = new Map<string, TopicData>();
    allPosts.forEach((post) => {
      if (post.topics && Array.isArray(post.topics)) {
        post.topics.forEach((topic) => {
          const existing = map.get(topic);
          const explanation = post.topicExplanations?.[topic] || null;
          
          if (existing) {
            existing.count++;
            if (!existing.posts.find((p) => p.slug === post.slug)) {
              existing.posts.push(post);
            }
            // 解説がまだない場合、新しい記事の解説を採用
            if (!existing.explanation && explanation) {
              existing.explanation = explanation;
            }
          } else {
            map.set(topic, {
              count: 1,
              posts: [post],
              explanation: explanation,
            });
          }
        });
      }
    });
    return map;
  }, [allPosts]);

  const sortedTopics = useMemo(() => {
    return Array.from(topicsMap.entries())
      .sort((a, b) => {
        // カウント順、次に50音順
        if (b[1].count !== a[1].count) {
          return b[1].count - a[1].count;
        }
        return a[0].localeCompare(b[0], "ja");
      });
  }, [topicsMap]);

  // 日付をパースする関数
  const parseDate = (dateStr: string): number => {
    const match = dateStr.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
    if (match) {
      const year = parseInt(match[1], 10);
      const month = parseInt(match[2], 10) - 1;
      const day = parseInt(match[3], 10);
      return new Date(year, month, day).getTime();
    }
    return 0;
  };

  // タイトルから「【Tech】【今日の学び】」などの冠を除去
  const getCleanTitle = (title: string): string => {
    return title.replace(/【.*?】/g, "").trim();
  };

  // フィルタリングとソート
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = allPosts;

    // カテゴリーフィルタ
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.categorySlug === selectedCategory);
    }

    // タグフィルタ
    if (selectedTag !== "all") {
      filtered = filtered.filter((p) =>
        p.tags.some((tag) => tag === selectedTag)
      );
    }

    // 検索フィルタ
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.excerpt.toLowerCase().includes(query) ||
          p.content.toLowerCase().includes(query) ||
          p.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          (p.topics && p.topics.some((topic) => topic.toLowerCase().includes(query)))
      );
    }

    // ソート
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return parseDate(b.date) - parseDate(a.date);
        case "date-asc":
          return parseDate(a.date) - parseDate(b.date);
        case "title-asc":
          return getCleanTitle(a.title).localeCompare(
            getCleanTitle(b.title),
            "ja"
          );
        case "title-desc":
          return getCleanTitle(b.title).localeCompare(
            getCleanTitle(a.title),
            "ja"
          );
        default:
          return 0;
      }
    });

    return sorted;
  }, [allPosts, sortBy, selectedCategory, selectedTag, searchQuery]);

  // 選択されたトピックのデータ
  const selectedTopicData = selectedTopic ? topicsMap.get(selectedTopic) : null;

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* ヘッダー */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">
          今日の学び
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed">
          開発現場で学んだ用語や概念を解説する辞書ページです。
          <br />
          各トピックをクリックすると、詳しい解説と関連記事を表示します。
        </p>
        <div className="mt-4 text-sm text-gray-500">
          全 {allPosts.length} 件の学び | {topicsMap.size} 個のトピック
        </div>
      </div>

      {/* 表示モード切り替え */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => {
            setViewMode("topics");
            setSelectedTopic(null);
          }}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            viewMode === "topics"
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-400 hover:bg-gray-700"
          }`}
        >
          用語解説
        </button>
        <button
          onClick={() => setViewMode("cards")}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            viewMode === "cards"
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-400 hover:bg-gray-700"
          }`}
        >
          記事一覧
        </button>
      </div>

      {viewMode === "topics" ? (
        /* トピック別表示（解説中心） */
        <div>
          {selectedTopic && selectedTopicData ? (
            /* 選択されたトピックの詳細表示 */
            <div className="mb-8">
              <button
                onClick={() => setSelectedTopic(null)}
                className="mb-6 text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                一覧に戻る
              </button>

              <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700/50">
                <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-blue-400">#</span>
                  {selectedTopic}
                </h2>

                {/* 解説 */}
                {selectedTopicData.explanation ? (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-4">解説</h3>
                    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
                      <p className="text-gray-300 leading-relaxed text-lg">
                        {selectedTopicData.explanation}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mb-8">
                    <div className="bg-yellow-900/20 border border-yellow-800/50 rounded-xl p-4 mb-4">
                      <p className="text-yellow-300 text-sm">
                        ⚠️ このトピックの解説はまだ追加されていません。
                      </p>
                    </div>
                  </div>
                )}

                {/* 関連記事 */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    関連記事 ({selectedTopicData.posts.length}件)
                  </h3>
                  <div className="space-y-3">
                    {selectedTopicData.posts.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/posts/${post.slug}`}
                        className="block group bg-gray-900/50 hover:bg-gray-900 rounded-xl p-4 border border-gray-700/50 hover:border-gray-600 transition-all"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors flex-1">
                            {getCleanTitle(post.title)}
                          </h4>
                          <span className="text-xs text-gray-500 font-mono ml-4">
                            {post.date}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 line-clamp-2">
                          {post.excerpt}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* トピック一覧 */
            <div>
              <div className="bg-gray-800/50 rounded-2xl p-6 mb-8 border border-gray-700/50">
                <h2 className="text-xl font-bold text-white mb-4">学んだ用語・概念一覧</h2>
                <p className="text-sm text-gray-400 mb-6">
                  クリックすると、その用語の解説と関連記事を表示します。
                </p>
                <div className="flex flex-wrap gap-3">
                  {sortedTopics.map(([topic, data]) => (
                    <button
                      key={topic}
                      onClick={() => setSelectedTopic(topic)}
                      className="group relative bg-gray-900 hover:bg-gray-800 px-4 py-3 rounded-lg border border-gray-700 hover:border-blue-500 transition-all text-left"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">{topic}</span>
                        <span className="ml-3 text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded-full">
                          {data.count}
                        </span>
                      </div>
                      {data.explanation && (
                        <p className="text-xs text-gray-400 mt-2 line-clamp-1">
                          {data.explanation}
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* 記事カード表示 */
        <>
          {/* フィルター・ソート・検索 */}
          <div className="bg-gray-800/50 rounded-2xl p-6 mb-8 border border-gray-700/50 space-y-4">
            {/* 検索バー */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-2">
                検索
              </label>
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="タイトル、内容、タグ、トピックで検索..."
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* ソート */}
              <div>
                <label htmlFor="sort" className="block text-sm font-medium text-gray-300 mb-2">
                  並び順
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="date-desc">日付（新しい順）</option>
                  <option value="date-asc">日付（古い順）</option>
                  <option value="title-asc">タイトル（50音順）</option>
                  <option value="title-desc">タイトル（50音逆順）</option>
                </select>
              </div>

              {/* カテゴリーフィルタ */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                  カテゴリー
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">すべて</option>
                  {categories.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* タグフィルタ */}
              <div>
                <label htmlFor="tag" className="block text-sm font-medium text-gray-300 mb-2">
                  タグ
                </label>
                <select
                  id="tag"
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">すべて</option>
                  {tags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 結果数 */}
            <div className="text-sm text-gray-400 pt-2 border-t border-gray-700">
              {filteredAndSortedPosts.length} 件表示中
            </div>
          </div>

          {/* 記事一覧 */}
          {filteredAndSortedPosts.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg">該当する記事が見つかりませんでした。</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="group bg-gray-800/50 hover:bg-gray-800 rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs text-gray-500 font-mono">
                      {post.date}
                    </span>
                    <span className="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded-full border border-blue-800/50">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {getCleanTitle(post.title)}
                  </h2>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  {/* 学んだトピック */}
                  {post.topics && post.topics.length > 0 && (
                    <div className="mb-3 pb-3 border-b border-gray-700">
                      <div className="text-xs text-gray-500 mb-2">学んだこと:</div>
                      <div className="flex flex-wrap gap-2">
                        {post.topics.slice(0, 4).map((topic) => (
                          <span
                            key={topic}
                            className="text-xs bg-blue-900/20 text-blue-300 px-2 py-1 rounded border border-blue-800/30"
                          >
                            {topic}
                          </span>
                        ))}
                        {post.topics.length > 4 && (
                          <span className="text-xs text-gray-500">
                            +{post.topics.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* タグ */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags
                      .filter((tag) => tag !== "今日の学び")
                      .slice(0, 3)
                      .map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded border border-gray-600/50"
                        >
                          #{tag}
                        </span>
                      ))}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
