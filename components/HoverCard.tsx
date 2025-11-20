"use client";

import { useRef, ReactNode } from "react";
import { gsap } from "gsap";

interface HoverCardProps {
  children: ReactNode;
  className?: string;
}

export default function HoverCard({ children, className = "" }: HoverCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: -5,
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: 0,
        scale: 1,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

