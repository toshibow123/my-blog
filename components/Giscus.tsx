"use client";

import { useEffect, useRef, useState } from "react";

interface GiscusProps {
  repo?: string;
  repoId?: string;
  category?: string;
  categoryId?: string;
  mapping?: string;
  reactionsEnabled?: string;
  emitMetadata?: string;
  inputPosition?: string;
  lang?: string;
}

export default function Giscus({
  repo = process.env.NEXT_PUBLIC_GISCUS_REPO || "",
  repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID || "",
  category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY || "Announcements",
  categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || "",
  mapping = "pathname",
  reactionsEnabled = "1",
  emitMetadata = "0",
  inputPosition = "bottom",
  lang = "ja",
}: GiscusProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isGiscusLoaded = useRef(false);
  const theme = "dark"; // 常にダークモード

  useEffect(() => {
    if (!repo || !repoId) {
      console.warn("Giscus: repo または repoId が設定されていません");
      return;
    }

    // 既存のスクリプトを削除
    if (containerRef.current) {
      const existingScript = containerRef.current.querySelector("script");
      if (existingScript) {
        containerRef.current.removeChild(existingScript);
        isGiscusLoaded.current = false;
      }
    }

    if (isGiscusLoaded.current) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", repo);
    script.setAttribute("data-repo-id", repoId);
    script.setAttribute("data-category", category);
    script.setAttribute("data-category-id", categoryId);
    script.setAttribute("data-mapping", mapping);
    script.setAttribute("data-reactions-enabled", reactionsEnabled);
    script.setAttribute("data-emit-metadata", emitMetadata);
    script.setAttribute("data-input-position", inputPosition);
    script.setAttribute("data-theme", theme);
    script.setAttribute("data-lang", lang);
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    if (containerRef.current) {
      containerRef.current.appendChild(script);
      isGiscusLoaded.current = true;
    }

    return () => {
      if (containerRef.current && containerRef.current.contains(script)) {
        containerRef.current.removeChild(script);
        isGiscusLoaded.current = false;
      }
    };
  }, [
    repo,
    repoId,
    category,
    categoryId,
    mapping,
    reactionsEnabled,
    emitMetadata,
    inputPosition,
    theme,
    lang,
  ]);

  if (!repo || !repoId) {
    return (
      <div className="p-4 bg-gray-800 rounded-lg border border-gray-700 text-gray-400 text-sm">
        <p>コメント機能を有効にするには、Giscusの設定が必要です。</p>
        <p className="mt-2">
          <a
            href="https://giscus.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-slate-200 underline"
          >
            Giscusのセットアップ方法
          </a>
          を参照してください。
        </p>
      </div>
    );
  }

  return <div ref={containerRef} className="mt-8" />;
}

