"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deletePost } from "@/lib/posts-api";
import type { Post } from "@/lib/supabase";

interface AdminPostsClientProps {
  posts: Post[];
}

export default function AdminPostsClient({ posts }: AdminPostsClientProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (post: Post) => {
    if (confirm(`「${post.title}」を削除しますか？\nこの操作は取り消せません。`)) {
      setDeletingId(post.id);
      try {
        await deletePost(post.id);
        alert("記事を削除しました！");
        router.refresh();
      } catch (error) {
        console.error("Error deleting post:", error);
        alert(`エラーが発生しました: ${error instanceof Error ? error.message : "Unknown error"}`);
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (posts.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center">
        <p className="text-gray-400 mb-4">記事がありません</p>
        <Link
          href="/admin/posts/new"
          className="text-yellow-400 hover:text-yellow-300 font-semibold underline"
          prefetch={true}
        >
          最初の記事を作成する
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">タイトル</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">カテゴリー</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">日付</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">タグ</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-700/30 transition-colors">
                <td className="px-6 py-4">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-white hover:text-yellow-400 transition-colors font-medium"
                    prefetch={true}
                    target="_blank"
                  >
                    {post.title}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                    {post.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-400 text-sm">{post.date}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 2 && (
                      <span className="text-gray-500 text-xs">+{post.tags.length - 2}</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/posts/${post.slug}/edit`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-semibold transition-colors"
                      prefetch={true}
                    >
                      編集
                    </Link>
                    <button
                      onClick={() => handleDelete(post)}
                      disabled={deletingId === post.id}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deletingId === post.id ? "削除中..." : "削除"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

