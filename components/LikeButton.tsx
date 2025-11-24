"use client";

import { useEffect, useState } from "react";

interface LikeButtonProps {
  slug: string;
  title: string;
}

export default function LikeButton({ slug, title }: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // ローカルストレージからいいね状態を読み込む
    const likedPosts = JSON.parse(
      localStorage.getItem("likedPosts") || "[]"
    ) as string[];
    const isLiked = likedPosts.includes(slug);
    setLiked(isLiked);

    // いいね数を読み込む
    const counts = JSON.parse(
      localStorage.getItem("likeCounts") || "{}"
    ) as Record<string, number>;
    setLikeCount(counts[slug] || 0);
  }, [slug]);

  const handleLike = () => {
    if (!mounted) return;

    const likedPosts = JSON.parse(
      localStorage.getItem("likedPosts") || "[]"
    ) as string[];
    const counts = JSON.parse(
      localStorage.getItem("likeCounts") || "{}"
    ) as Record<string, number>;

    if (liked) {
      // いいねを取り消し
      const newLikedPosts = likedPosts.filter((s) => s !== slug);
      const newCount = Math.max(0, (counts[slug] || 0) - 1);
      localStorage.setItem("likedPosts", JSON.stringify(newLikedPosts));
      counts[slug] = newCount;
      localStorage.setItem("likeCounts", JSON.stringify(counts));
      setLiked(false);
      setLikeCount(newCount);
    } else {
      // いいねを追加
      const newLikedPosts = [...likedPosts, slug];
      const newCount = (counts[slug] || 0) + 1;
      localStorage.setItem("likedPosts", JSON.stringify(newLikedPosts));
      counts[slug] = newCount;
      localStorage.setItem("likeCounts", JSON.stringify(counts));
      setLiked(true);
      setLikeCount(newCount);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all ${
        liked
          ? "bg-slate-700 text-white border-2 border-slate-500"
          : "bg-gray-800 text-gray-300 border-2 border-gray-700 hover:border-slate-500"
      }`}
      aria-label={liked ? "いいねを取り消す" : "いいねする"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 transition-all ${
          liked ? "fill-red-500 text-red-500" : "text-gray-400"
        }`}
        viewBox="0 0 24 24"
        fill={liked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <span>{likeCount > 0 ? likeCount : ""}</span>
      <span className="text-sm">{liked ? "いいね済み" : "いいね"}</span>
    </button>
  );
}

