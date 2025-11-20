"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import AnimatedText from "./AnimatedText";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // タイトルの派手なアニメーション
      if (titleRef.current) {
        // 最初に大きく表示して縮小
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: -50, scale: 1.5, rotation: -5 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            rotation: 0,
            duration: 1.2, 
            ease: "elastic.out(1, 0.5)" 
          }
        );

        // グラデーションアニメーション（無限ループ）
        gsap.to(titleRef.current, {
          backgroundPosition: "200% 0",
          duration: 3,
          repeat: -1,
          ease: "none",
        });

        // ホバー時のアニメーション
        titleRef.current.addEventListener("mouseenter", () => {
          gsap.to(titleRef.current, {
            scale: 1.05,
            y: -5,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        titleRef.current.addEventListener("mouseleave", () => {
          gsap.to(titleRef.current, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      }

      // 説明文のアニメーション
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: -20 },
        { opacity: 0.9, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out" }
      );

      // ナビゲーションボタンのアニメーション
      if (navRef.current) {
        const buttons = navRef.current.querySelectorAll("a");
        gsap.fromTo(
          buttons,
          { opacity: 0, y: 20, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: 0.4,
            stagger: 0.1,
            ease: "back.out(1.7)",
          }
        );
      }

      // 星のアニメーション
      if (starsRef.current) {
        const stars = starsRef.current.querySelectorAll("div");
        stars.forEach((star, index) => {
          gsap.to(star, {
            opacity: 1,
            scale: 1.5,
            duration: 2 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            delay: index * 0.2,
            ease: "sine.inOut",
          });
          gsap.set(star, { opacity: 0.3, scale: 1 });
        });
      }
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={headerRef}
      className="relative bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-950 text-white overflow-hidden"
      role="banner"
    >
      {/* 星のような背景効果 */}
      <div ref={starsRef} className="absolute inset-0 opacity-30">
        <div className="absolute w-1 h-1 bg-yellow-300 rounded-full top-10 left-10"></div>
        <div className="absolute w-1 h-1 bg-yellow-200 rounded-full top-20 left-32"></div>
        <div className="absolute w-1 h-1 bg-yellow-300 rounded-full top-32 left-64"></div>
        <div className="absolute w-1 h-1 bg-yellow-200 rounded-full top-16 left-96"></div>
        <div className="absolute w-1 h-1 bg-yellow-300 rounded-full top-24 right-32"></div>
        <div className="absolute w-1 h-1 bg-yellow-200 rounded-full top-40 right-64"></div>
        <div className="absolute w-1 h-1 bg-yellow-300 rounded-full top-12 right-96"></div>
        <div className="absolute w-1 h-1 bg-yellow-200 rounded-full top-28 right-20"></div>
        <div className="absolute w-1 h-1 bg-yellow-300 rounded-full top-48 left-48"></div>
        <div className="absolute w-1 h-1 bg-yellow-200 rounded-full top-36 right-48"></div>
        <div className="absolute w-1 h-1 bg-yellow-300 rounded-full bottom-20 left-24"></div>
        <div className="absolute w-1 h-1 bg-yellow-200 rounded-full bottom-32 right-24"></div>
      </div>
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col items-center text-center space-y-4">
          <div ref={titleRef} className="relative inline-block">
            <Link
              href="/"
              className="block relative"
              aria-label="トシぼうのブログ ホーム"
            >
              <AnimatedText
                text="トシぼうのブログ"
                as="h1"
                className="text-4xl md:text-6xl font-black relative z-10 cursor-pointer"
                style={{
                  background: "linear-gradient(90deg, #fbbf24, #f59e0b, #eab308, #fbbf24)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "0 0 30px rgba(251, 191, 36, 0.5), 0 0 60px rgba(251, 191, 36, 0.3)",
                  filter: "drop-shadow(0 0 10px rgba(251, 191, 36, 0.5))",
                }}
              />
              {/* 光るエフェクト */}
              <div 
                className="absolute inset-0 blur-xl opacity-50"
                style={{
                  background: "linear-gradient(90deg, #fbbf24, #f59e0b, #eab308, #fbbf24)",
                  backgroundSize: "200% 100%",
                  zIndex: 0,
                }}
              />
            </Link>
          </div>
          <p ref={descRef} className="text-lg md:text-xl opacity-90">
            節約しながらもマッチョをあきらめず、AIや資産形成も大好き。
          </p>
          <nav
            ref={navRef}
            aria-label="メインナビゲーション"
            className="flex gap-4 mt-4"
          >
            <Link
              href="/"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 px-6 py-2 rounded-full font-semibold transition-all shadow-lg hover:shadow-yellow-500/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-indigo-900"
              prefetch={true}
            >
              記事一覧
            </Link>
            <Link
              href="/about"
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 px-6 py-2 rounded-full font-semibold transition-all shadow-lg hover:shadow-yellow-400/50 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-purple-900"
              prefetch={true}
            >
              プロフィール
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
