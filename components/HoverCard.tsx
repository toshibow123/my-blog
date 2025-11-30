"use client";

import { useRef, ReactNode } from "react";
import { gsap } from "gsap";

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function HoverCard({ children, className = "", style = {} }: HoverCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: -6,
        scale: 1.015,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className={className}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

