"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
  style?: React.CSSProperties;
}

export default function AnimatedText({
  text,
  className = "",
  as: Component = "span",
  delay = 0,
  style,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll(".char");

    // 各文字をアニメーション
    gsap.fromTo(
      chars,
      {
        opacity: 0,
        y: 50,
        rotateX: -90,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.03,
        delay,
        ease: "back.out(1.7)",
      }
    );

    // カラフルな色変化（タイトル用は親要素でスタイル指定されている場合はスキップ）
    if (!className.includes("text-4xl") && !className.includes("text-6xl")) {
      gsap.to(chars, {
        color: "transparent",
        backgroundImage: "linear-gradient(90deg, #fbbf24, #f59e0b, #eab308)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        duration: 0.5,
        stagger: 0.03,
        delay: delay + 0.5,
      });
    }
  }, [text, delay]);

  // テキストを1文字ずつspanに分割
  const chars = text.split("").map((char, index) => {
    return (
      <span
        key={index}
        className="char inline-block"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    );
  });

  return (
    <Component ref={containerRef as any} className={className} style={style}>
      {chars}
    </Component>
  );
}

