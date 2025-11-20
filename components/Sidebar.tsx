"use client";

import Link from "next/link";
import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
}

export default function Sidebar({ popularTags, archiveList }: SidebarProps) {
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
      <div className="bg-gray-800 rounded-lg shadow-md p-4 overflow-hidden border border-gray-700">
        <h2 className="bg-gradient-to-r from-indigo-800 via-purple-800 to-indigo-900 text-white px-4 py-2 rounded-t-lg font-semibold mb-3 shadow-lg">
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
            className="flex-1 min-w-0 border border-gray-600 bg-gray-700 text-white rounded px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            aria-label="検索キーワードを入力"
          />
          <button
            type="submit"
            className="flex-shrink-0 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 px-4 py-2 rounded font-semibold transition-all shadow-md hover:shadow-yellow-500/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-800 whitespace-nowrap"
            aria-label="検索を実行"
          >
            検索
          </button>
        </form>
      </div>

      {/* カテゴリー */}
      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700">
        <h2 className="bg-gradient-to-r from-indigo-800 via-purple-800 to-indigo-900 text-white px-4 py-2 font-semibold shadow-lg">
          カテゴリー
        </h2>
        <div className="p-4">
          <div className="grid grid-cols-1 gap-2">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white hover:text-yellow-400"
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

      {/* 人気タグ */}
      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700">
        <h2 className="bg-gradient-to-r from-indigo-800 via-purple-800 to-indigo-900 text-white px-4 py-2 font-semibold shadow-lg">
          人気タグ
        </h2>
        {popularTags || (
          <div className="p-4">
            <p className="text-gray-400 text-sm">タグを読み込み中...</p>
          </div>
        )}
      </div>

      {/* アーカイブ */}
      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700">
        <h2 className="bg-gradient-to-r from-indigo-800 via-purple-800 to-indigo-900 text-white px-4 py-2 font-semibold shadow-lg">
          アーカイブ
        </h2>
        {archiveList || (
          <div className="p-4">
            <p className="text-gray-400 text-sm">アーカイブを読み込み中...</p>
          </div>
        )}
      </div>
    </aside>
  );
}
