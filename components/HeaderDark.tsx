"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function HeaderDark() {
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (navRef.current) {
        const links = navRef.current.querySelectorAll("a");
        gsap.fromTo(
          links,
          { opacity: 0, y: -10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.2,
            ease: "power2.out",
          }
        );
      }
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={headerRef}
      className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95"
      role="banner"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* 左側: ロゴ・タイトル */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-2xl font-bold text-white hover:opacity-80 transition-opacity"
              prefetch={true}
            >
              トシぼうのブログ
            </Link>
            <span className="text-xs text-gray-400 hidden md:inline">オフィシャルサイト</span>
          </div>

          {/* 右側: ナビゲーション */}
          <nav
            ref={navRef}
            aria-label="メインナビゲーション"
            className="flex items-center gap-6"
          >
            <Link
              href="/"
              className="text-white hover:text-yellow-400 transition-colors text-sm font-medium"
              prefetch={true}
            >
              <span className="block">HOME</span>
              <span className="text-xs text-gray-400">ホーム</span>
            </Link>
            <Link
              href="/posts"
              className="text-white hover:text-yellow-400 transition-colors text-sm font-medium"
              prefetch={true}
            >
              <span className="block">NEWS</span>
              <span className="text-xs text-gray-400">記事一覧</span>
            </Link>
            <Link
              href="/about"
              className="text-white hover:text-yellow-400 transition-colors text-sm font-medium"
              prefetch={true}
            >
              <span className="block">ABOUT</span>
              <span className="text-xs text-gray-400">プロフィール</span>
            </Link>
            <Link
              href="/contact"
              className="text-white hover:text-yellow-400 transition-colors text-sm font-medium"
              prefetch={true}
            >
              <span className="block">CONTACT</span>
              <span className="text-xs text-gray-400">お問い合わせ</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

