'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Comment {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
}

interface CommentListProps {
  postSlug: string;
}

export default function CommentList({ postSlug }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // デバッグ用：環境変数の確認
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        console.error('Supabase環境変数が設定されていません');
        setError('Supabase環境変数が設定されていません');
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('comments')
        .select('id, author_name, content, created_at')
        .eq('post_slug', postSlug)
        .eq('status', 'approved') // 承認済みのみ表示
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error('Supabase fetch error:', fetchError);
        throw fetchError;
      }

      console.log('Fetched comments:', data);
      setComments(data || []);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching comments:', err);
      const errorMessage = err?.message || 'コメントの読み込みに失敗しました';
      setError(`コメントの読み込みに失敗しました: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postSlug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}年${month}月${day}日`;
  };

  if (isLoading) {
    return (
      <div className="mt-12 pt-12 border-t border-gray-800">
        <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
          <span className="text-blue-500">💬</span> コメント ({comments.length})
        </h3>
        <p className="text-gray-400">読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-12 pt-12 border-t border-gray-800">
        <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
          <span className="text-blue-500">💬</span> コメント
        </h3>
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="mt-12 pt-12 border-t border-gray-800">
      <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
        <span className="text-blue-500">💬</span> コメント ({comments.length})
      </h3>

      {comments.length === 0 ? (
        <p className="text-gray-400">まだコメントはありません。最初のコメントを投稿してみませんか？</p>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-6 hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600/30 flex items-center justify-center text-blue-300 font-bold">
                    {comment.author_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{comment.author_name}</p>
                    <p className="text-xs text-gray-500">{formatDate(comment.created_at)}</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

