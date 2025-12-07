"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import AnimatedText from "./AnimatedText";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // タイトルのフェードイン
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 20, scale: 0.95 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 1.5, 
            ease: "power3.out" 
          }
        );
      }

      // ナビゲーションのアニメーション
      if (navRef.current) {
        gsap.fromTo(
          navRef.current,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.5,
            ease: "power3.out",
          }
        );
      }
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={headerRef}
      className="relative w-full h-[50vh] md:h-[60vh] flex flex-col items-center justify-center overflow-hidden bg-black"
      role="banner"
    >
      {/* 背景の抽象的な光（Apple風） */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] bg-blue-900/30 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }}></div>
         <div className="absolute bottom-[-20%] right-[20%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }}></div>
      </div>

      {/* ナビゲーション（上部に固定風） */}
      <nav
        ref={navRef}
        className="absolute top-6 z-50"
        aria-label="メインナビゲーション"
      >
        <div className="glass-effect px-6 py-3 flex gap-6 items-center">
             <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Home</Link>
             <Link href="/about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Profile</Link>
             <Link href="/posts" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Articles</Link>
             <Link href="/learning" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">今日の学び</Link>
             <Link href="/contact" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Contact</Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div ref={titleRef} className="space-y-6">
           {/* メインコピー：タイポグラフィの暴力 */}
           <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight">
             <span className="block text-white">Think Simple.</span>
             <span className="apple-text block">Build Future.</span>
           </h1>
           
           {/* サブコピー */}
           <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide">
             見習いエンジニアの成長記録。<br className="hidden md:inline" /> 
             コードと筋肉と、日々の気づきをここに。
           </p>
        </div>
      </div>
      
      {/* スクロールダウンインジケーター */}
      <div className="absolute bottom-8 animate-bounce text-gray-500">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
      </div>
    </header>
  );
}
