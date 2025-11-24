"use client";

import Link from "next/link";
import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NewsletterForm from "@/components/NewsletterForm";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const categories = [
  { name: "プログラミング", icon: "💻", slug: "programming" },
  { name: "移住", icon: "🏠", slug: "migration" },
  { name: "節約", icon: "💰", slug: "saving" },
  { name: "筋トレ", icon: "💪", slug: "fitness" },
  { name: "AI", icon: "🤖", slug: "ai" },
  { name: "資産形成", icon: "📈", slug: "investment" },
  { name: "未分類", icon: "📦", slug: "uncategorized" },
];

interface SidebarProps {
  popularTags?: ReactNode;
  archiveList?: ReactNode;
  popularPosts?: ReactNode;
}

export default function Sidebar({ popularTags, archiveList, popularPosts }: SidebarProps) {
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sidebarRef.current) {
        const sections = sidebarRef.current.querySelectorAll("div");
        sections.forEach((section, index) => {
          gsap.fromTo(
            section,
            {
              opacity: 0,
              x: 30,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              delay: index * 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }
    }, sidebarRef);

    return () => ctx.revert();
  }, []);

  return (
    <aside ref={sidebarRef} className="w-full md:w-80 space-y-6">
      {/* 検索バー */}
      <div className="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-2xl shadow-xl p-4 overflow-hidden border border-gray-700/50 backdrop-blur-sm">
        <h2 className="bg-gradient-to-r from-blue-800 via-blue-900 to-slate-900 text-white px-4 py-2.5 rounded-t-lg font-title text-sm mb-3 shadow-lg">
          検索
        </h2>
        <form 
          className="flex gap-2 w-full" 
          role="search" 
          aria-label="サイト内検索"
          action="/search"
          method="get"
        >
          <label htmlFor="search-input" className="sr-only">
            検索キーワード
          </label>
          <input
            id="search-input"
            type="search"
            name="q"
            placeholder="キーワードを入力"
            className="flex-1 min-w-0 border border-gray-600 bg-gray-700 text-white rounded px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400"
            aria-label="検索キーワードを入力"
          />
          <button
            type="submit"
            className="flex-shrink-0 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded font-semibold transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-gray-800 whitespace-nowrap"
            aria-label="検索を実行"
          >
            検索
          </button>
        </form>
      </div>

      {/* カテゴリー */}
      <div className="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-700/50 backdrop-blur-sm">
        <h2 className="bg-gradient-to-r from-blue-800 via-blue-900 to-slate-900 text-white px-4 py-2.5 font-title text-sm shadow-lg">
          カテゴリー
        </h2>
        <div className="p-4">
          <div className="grid grid-cols-1 gap-2">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 text-white hover:text-slate-300"
                prefetch={true}
                aria-label={`${category.name}カテゴリーの記事一覧`}
              >
                <span className="text-2xl" aria-hidden="true">
                  {category.icon}
                </span>
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 人気記事 */}
      <div className="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-700/50 backdrop-blur-sm">
        <h2 className="bg-gradient-to-r from-blue-800 via-blue-900 to-slate-900 text-white px-4 py-2.5 font-title text-sm shadow-lg">
          人気記事
        </h2>
        {popularPosts || (
          <div className="p-4">
            <p className="text-gray-400 text-sm">記事を読み込み中...</p>
          </div>
        )}
      </div>

      {/* 人気タグ */}
      <div className="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-700/50 backdrop-blur-sm">
        <h2 className="bg-gradient-to-r from-blue-800 via-blue-900 to-slate-900 text-white px-4 py-2.5 font-title text-sm shadow-lg">
          人気タグ
        </h2>
        {popularTags || (
          <div className="p-4">
            <p className="text-gray-400 text-sm">タグを読み込み中...</p>
          </div>
        )}
      </div>

      {/* アーカイブ */}
      <div className="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-700/50 backdrop-blur-sm">
        <h2 className="bg-gradient-to-r from-blue-800 via-blue-900 to-slate-900 text-white px-4 py-2.5 font-title text-sm shadow-lg">
          アーカイブ
        </h2>
        {archiveList || (
          <div className="p-4">
            <p className="text-gray-400 text-sm">アーカイブを読み込み中...</p>
          </div>
        )}
      </div>

      {/* メールマガジン登録 */}
      <div className="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-700/50 backdrop-blur-sm">
        <h2 className="bg-gradient-to-r from-blue-800 via-blue-900 to-slate-900 text-white px-4 py-2.5 font-title text-sm shadow-lg">
          メールマガジン
        </h2>
        <div className="p-4">
          <p className="text-gray-300 text-sm mb-4">
            新着記事やおすすめコンテンツをお届けします。
          </p>
          <NewsletterForm />
        </div>
      </div>
    </aside>
  );
}
