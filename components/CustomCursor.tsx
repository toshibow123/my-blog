"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseEnter = () => {
      gsap.to([cursor, follower], {
        scale: 1.5,
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to([cursor, follower], {
        scale: 1,
        duration: 0.3,
      });
    };

    // マウス移動
    window.addEventListener("mousemove", moveCursor);

    // リンクやボタンにホバーした時
    const interactiveElements = document.querySelectorAll("a, button");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* メインカーソル */}
      <div
        ref={cursorRef}
        className="custom-cursor fixed w-4 h-4 bg-yellow-400 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: "-8px",
          top: "-8px",
        }}
      />
      {/* フォロワー（遅れて追従する大きい円） */}
      <div
        ref={followerRef}
        className="custom-cursor-follower fixed w-10 h-10 border-2 border-yellow-400 rounded-full pointer-events-none z-[9998] opacity-50"
        style={{
          left: "-20px",
          top: "-20px",
        }}
      />
      <style jsx global>{`
        body {
          cursor: none;
        }
        a,
        button,
        input,
        textarea {
          cursor: none;
        }
      `}</style>
    </>
  );
}

