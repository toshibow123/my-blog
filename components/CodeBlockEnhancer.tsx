"use client";

import { useEffect } from "react";

export default function CodeBlockEnhancer() {
  useEffect(() => {
    // すべてのpreタグ（コードブロック）を取得
    const preBlocks = document.querySelectorAll("pre");

    preBlocks.forEach((pre) => {
      // 既にボタンがある場合はスキップ
      if (pre.parentNode && (pre.parentNode as HTMLElement).classList.contains("relative")) {
        return;
      }

      // ラッパーを作成
      const wrapper = document.createElement("div");
      wrapper.className = "relative group";
      
      // preをラッパーで囲む
      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      // コピーボタンを作成
      const button = document.createElement("button");
      button.className = "absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-gray-600";
      button.innerText = "Copy";
      button.ariaLabel = "コードをコピー";

      // クリックイベント
      button.addEventListener("click", async () => {
        const code = pre.querySelector("code")?.innerText || pre.innerText;
        try {
          await navigator.clipboard.writeText(code);
          button.innerText = "Copied!";
          button.classList.add("text-green-400", "border-green-500");
          setTimeout(() => {
            button.innerText = "Copy";
            button.classList.remove("text-green-400", "border-green-500");
          }, 2000);
        } catch (err) {
          console.error("コピーに失敗しました", err);
          button.innerText = "Error";
        }
      });

      wrapper.appendChild(button);
    });
  }, []);

  return null;
}

