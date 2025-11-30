"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function CodeBlockEnhancer() {
  useEffect(() => {
    // コピーボタンの追加処理
    const addCopyButtons = () => {
      const preBlocks = document.querySelectorAll("pre");

      preBlocks.forEach((pre) => {
        // 既にボタンがある場合はスキップ
        if (pre.parentNode && (pre.parentNode as HTMLElement).classList.contains("relative")) {
          return;
        }

        // ラッパーを作成
        const wrapper = document.createElement("div");
        wrapper.className = "relative group my-6"; // my-6で上下の余白を追加
        
        // preをラッパーで囲む
        pre.parentNode?.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);

        // pre自体のスタイル調整（Prism.jsとの競合を避けるためクラスを追加）
        pre.classList.add("rounded-xl", "border", "border-gray-700", "shadow-lg");

        // コピーボタンを作成
        const button = document.createElement("button");
        button.className = "absolute top-3 right-3 bg-gray-700/80 hover:bg-gray-600 text-gray-300 hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 border border-gray-600 backdrop-blur-sm";
        button.innerText = "Copy";
        button.ariaLabel = "コードをコピー";

        // クリックイベント
        button.addEventListener("click", async () => {
          const code = pre.querySelector("code")?.innerText || pre.innerText;
          try {
            await navigator.clipboard.writeText(code);
            button.innerText = "Copied!";
            button.classList.add("text-green-400", "border-green-500/50", "bg-green-900/30");
            setTimeout(() => {
              button.innerText = "Copy";
              button.classList.remove("text-green-400", "border-green-500/50", "bg-green-900/30");
            }, 2000);
          } catch (err) {
            console.error("コピーに失敗しました", err);
            button.innerText = "Error";
          }
        });

        wrapper.appendChild(button);
      });
    };

    addCopyButtons();
  }, []);

  return (
    <>
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js" 
        strategy="lazyOnload"
      />
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js" 
        strategy="lazyOnload"
      />
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js" 
        strategy="lazyOnload"
      />
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-json.min.js" 
        strategy="lazyOnload"
      />
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-jsx.min.js" 
        strategy="lazyOnload"
      />
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-tsx.min.js" 
        strategy="lazyOnload"
      />
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-typescript.min.js" 
        strategy="lazyOnload"
      />
    </>
  );
}
