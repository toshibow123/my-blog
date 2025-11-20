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
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
      <h2 className="text-lg font-bold text-white mb-4">目次</h2>
      <nav>
        <ol className="space-y-2">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={`
                ${heading.level === 3 ? "ml-4" : ""}
                ${activeId === heading.id ? "text-yellow-400" : "text-gray-300"}
                hover:text-yellow-400 transition-colors cursor-pointer
              `}
            >
              <button
                onClick={() => scrollToHeading(heading.id)}
                className="text-left hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}

