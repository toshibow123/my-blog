'use client';

import { useState } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

interface CommentsSectionProps {
  postSlug: string;
}

export default function CommentsSection({ postSlug }: CommentsSectionProps) {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCommentAdded = () => {
    // コメントが追加されたら、CommentListを再読み込み
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="mt-16">
      <CommentList key={refreshKey} postSlug={postSlug} />
      <CommentForm postSlug={postSlug} onCommentAdded={handleCommentAdded} />
    </div>
  );
}

