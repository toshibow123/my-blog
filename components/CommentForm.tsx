'use client';

import { useState, FormEvent } from 'react';
import { supabase } from '@/lib/supabase';

interface CommentFormProps {
  postSlug: string;
  onCommentAdded?: () => void;
}

export default function CommentForm({ postSlug, onCommentAdded }: CommentFormProps) {
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsSubmitting(true);

    try {
      // API Route経由でコメントを投稿（レート制限・スパム検出をサーバーサイドで実行）
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postSlug,
          authorName: authorName.trim(),
          authorEmail: authorEmail.trim() || undefined,
          content: content.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'コメントの投稿に失敗しました');
      }

      // 成功
      setSuccess(true);
      setAuthorName('');
      setAuthorEmail('');
      setContent('');
      
      // 親コンポーネントに通知
      if (onCommentAdded) {
        setTimeout(() => {
          onCommentAdded();
          setSuccess(false);
        }, 2000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-12 pt-12 border-t border-gray-800">
      <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
        <span className="text-blue-500">💬</span> コメントを投稿
      </h3>

      {success && (
        <div className="mb-6 p-4 bg-green-900/30 border border-green-700/50 rounded-lg text-green-200">
          コメントを投稿しました！承認後に表示されます。
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-900/30 border border-red-700/50 rounded-lg text-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="authorName" className="block text-sm font-medium text-gray-300 mb-2">
              お名前 <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="authorName"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              required
              maxLength={50}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="お名前を入力"
            />
          </div>

          <div>
            <label htmlFor="authorEmail" className="block text-sm font-medium text-gray-300 mb-2">
              メールアドレス（任意）
            </label>
            <input
              type="email"
              id="authorEmail"
              value={authorEmail}
              onChange={(e) => setAuthorEmail(e.target.value)}
              maxLength={100}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="email@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
            コメント <span className="text-red-400">*</span>
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            minLength={3}
            maxLength={1000}
            rows={5}
            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="コメントを入力してください（3文字以上1000文字以内）"
          />
          <p className="mt-1 text-xs text-gray-500">
            {content.length} / 1000 文字
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
        >
          {isSubmitting ? '投稿中...' : 'コメントを投稿'}
        </button>

        <p className="text-xs text-gray-500">
          ※ コメントは承認後に表示されます。スパム対策のため、URLを含むコメントは自動的に承認待ちになります。
        </p>
      </form>
    </div>
  );
}

