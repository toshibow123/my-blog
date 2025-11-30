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

    // 回転角度を計算（最大10度に制限してより自然に）
    const rotateY = x * 10;
    const rotateX = -y * 10;

    // グローエフェクトの強度も計算
    const glowIntensity = Math.abs(x) + Math.abs(y);

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 1000,
    });

    // グローエフェクトを追加
    const glowElement = card.querySelector(".card-glow") as HTMLElement;
    if (glowElement) {
      gsap.to(glowElement, {
        opacity: glowIntensity * 0.3,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    });

    const glowElement = cardRef.current.querySelector(".card-glow") as HTMLElement;
    if (glowElement) {
      gsap.to(glowElement, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transform-gpu transition-shadow hover:shadow-2xl relative ${className}`}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* グローエフェクト */}
      <div 
        className="card-glow absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(148, 163, 184, 0.2) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />
      {children}
    </div>
  );
}

