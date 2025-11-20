// Supabase連携は無効化されました
// このファイルは型定義のみを提供します（他のファイルで使用されている可能性があるため）

// 型定義（Markdownベースの運用でも使用）
export interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  category: string;
  category_slug: string;
  tags: string[];
  excerpt: string;
  content: string;
  hero_image?: string | null;
  images?: string[] | null;
  published?: boolean | null;
  view_count?: number | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

// Supabaseクライアントは使用しません（Markdownベースの運用に移行）
// エクスポートスクリプト（scripts/export-to-markdown.ts）で使用する場合は、
// そのスクリプト内で直接クライアントを作成しています
