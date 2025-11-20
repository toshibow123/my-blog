"use client";

import { useRef, ReactNode } from "react";
import gsap from "gsap";

interface Card3DProps {
  children: ReactNode;
  className?: string;
}

export default function Card3D({ children, className = "" }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    // マウス位置をカードの中心からの相対位置に変換（-1 ~ 1）
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // 回転角度を計算（最大15度）
    const rotateY = x * 15;
    const rotateX = -y * 15;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transform-gpu transition-shadow hover:shadow-2xl ${className}`}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}

