"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    // 見出しを抽出（H2とH3のみ）
    const lines = content.split("\n");
    const extractedHeadings: Heading[] = [];
    let h2Index = 0;
    let h3Index = 0;

    lines.forEach((line) => {
      if (line.startsWith("## ") && !line.startsWith("### ")) {
        h2Index++;
        h3Index = 0;
        const text = line.replace(/^##\s+/, "");
        const id = `heading-${h2Index}`;
        extractedHeadings.push({ id, text, level: 2 });
      } else if (line.startsWith("### ")) {
        h3Index++;
        const text = line.replace(/^###\s+/, "");
        const id = `heading-${h2Index}-${h3Index}`;
        extractedHeadings.push({ id, text, level: 3 });
      }
    });

    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    // 見出し要素を監視
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -35% 0%" }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [headings]);

  // スムーズスクロール
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // ヘッダーの高さ分のオフセット
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="bg-white/5 rounded-lg border border-gray-700/50 mb-8 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          目次
        </h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-white text-sm px-3 py-1 rounded-full hover:bg-white/5 transition-colors"
          aria-label={isExpanded ? "折りたたむ" : "展開する"}
        >
          {isExpanded ? "折りたたむ" : "展開する"}
        </button>
      </div>
      {isExpanded && (
        <nav className="p-4">
          <ol className="space-y-2">
            {headings.map((heading, index) => (
              <li
                key={heading.id}
                className={`
                  ${heading.level === 3 ? "ml-6" : ""}
                  ${activeId === heading.id ? "text-blue-400" : "text-gray-300"}
                  hover:text-blue-400 transition-colors cursor-pointer
                `}
              >
                <button
                  onClick={() => scrollToHeading(heading.id)}
                  className="text-left text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded flex items-start gap-2"
                >
                  <span className="text-gray-500 font-mono text-xs mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="flex-1">{heading.text}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </div>
  );
}

