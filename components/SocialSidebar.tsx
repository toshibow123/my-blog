"use client";

import { useEffect, useState } from "react";

export default function SocialSidebar() {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4">
      {/* ソーシャルメディアアイコン */}
      <div className="bg-gray-800 border-l border-t border-b border-gray-700 rounded-l-lg p-3 space-y-3">
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
          aria-label="Twitter"
        >
          <span className="text-white text-xs font-bold">T</span>
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
          aria-label="Facebook"
        >
          <span className="text-white text-xs font-bold">F</span>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
          aria-label="Instagram"
        >
          <span className="text-white text-xs font-bold">I</span>
        </a>
      </div>

      {/* TOPボタン */}
      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 px-4 py-2 rounded-t-lg font-semibold transition-all shadow-lg hover:shadow-yellow-500/50 border-l border-t border-r border-gray-700"
          aria-label="ページトップに戻る"
        >
          TOP
        </button>
      )}
    </div>
  );
}

