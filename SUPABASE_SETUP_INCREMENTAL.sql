-- ============================================
-- Supabaseテーブル作成SQL（既存データを保持する版）
-- ============================================
-- 既存のテーブルがある場合でも、不足しているカラムだけを追加
-- ============================================

-- ============================================
-- 1. 記事テーブル (posts) - 既存テーブルがある場合のカラム追加
-- ============================================
-- 既存のテーブルがある場合は、不足しているカラムだけを追加
DO $$ 
BEGIN
  -- テーブルが存在しない場合は作成
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'posts') THEN
    CREATE TABLE posts (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      date TEXT NOT NULL,
      category TEXT NOT NULL,
      category_slug TEXT NOT NULL,
      tags TEXT[] DEFAULT '{}',
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      hero_image TEXT,
      images TEXT[],
      published BOOLEAN DEFAULT true,
      view_count INTEGER DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  ELSE
    -- 既存テーブルに不足しているカラムを追加
    ALTER TABLE posts ADD COLUMN IF NOT EXISTS hero_image TEXT;
    ALTER TABLE posts ADD COLUMN IF NOT EXISTS images TEXT[];
    ALTER TABLE posts ADD COLUMN IF NOT EXISTS published BOOLEAN DEFAULT true;
    ALTER TABLE posts ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;
  END IF;
END $$;

-- ============================================
-- 2. カテゴリーテーブル (categories)
-- ============================================
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'categories') THEN
    CREATE TABLE categories (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      icon TEXT,
      color TEXT,
      sort_order INTEGER DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  ELSE
    ALTER TABLE categories ADD COLUMN IF NOT EXISTS description TEXT;
    ALTER TABLE categories ADD COLUMN IF NOT EXISTS icon TEXT;
    ALTER TABLE categories ADD COLUMN IF NOT EXISTS color TEXT;
    ALTER TABLE categories ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;
  END IF;
END $$;

-- ============================================
-- 3. タグテーブル (tags) - オプション
-- ============================================
CREATE TABLE IF NOT EXISTS tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  post_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. サイト設定テーブル (settings)
-- ============================================
CREATE TABLE IF NOT EXISTS settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  type TEXT DEFAULT 'text',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- インデックスの作成（既存の場合はスキップ）
-- ============================================
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_category_slug ON posts(category_slug);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published) WHERE published = true;
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_sort_order ON categories(sort_order);
CREATE INDEX IF NOT EXISTS idx_tags_slug ON tags(slug);
CREATE INDEX IF NOT EXISTS idx_settings_key ON settings(key);

-- ============================================
-- RLS（Row Level Security）の設定
-- ============================================
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- ============================================
-- セキュリティポリシー（既存の場合は削除して再作成）
-- ============================================

-- 既存のポリシーを削除
DROP POLICY IF EXISTS "Posts are viewable by everyone" ON posts;
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON categories;
DROP POLICY IF EXISTS "Tags are viewable by everyone" ON tags;
DROP POLICY IF EXISTS "Settings are viewable by everyone" ON settings;
DROP POLICY IF EXISTS "Allow all operations for service role on posts" ON posts;
DROP POLICY IF EXISTS "Allow all operations for service role on categories" ON categories;
DROP POLICY IF EXISTS "Allow all operations for service role on tags" ON tags;
DROP POLICY IF EXISTS "Allow all operations for service role on settings" ON settings;

-- 全ユーザーが読み取り可能
CREATE POLICY "Posts are viewable by everyone" ON posts
  FOR SELECT USING (published = true OR true);

CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Tags are viewable by everyone" ON tags
  FOR SELECT USING (true);

CREATE POLICY "Settings are viewable by everyone" ON settings
  FOR SELECT USING (true);

-- 管理者のみ書き込み可能
CREATE POLICY "Allow all operations for service role on posts" ON posts
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations for service role on categories" ON categories
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations for service role on tags" ON tags
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations for service role on settings" ON settings
  FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- 初期データの投入
-- ============================================

-- デフォルトカテゴリーの追加
INSERT INTO categories (name, slug, description, icon, sort_order) VALUES
  ('未分類', 'uncategorized', 'カテゴリー未設定の記事', '📁', 0),
  ('プログラミング', 'programming', 'プログラミング関連の記事', '💻', 1),
  ('移住', 'migration', '移住関連の記事', '🏠', 2),
  ('節約', 'saving', '節約関連の記事', '💰', 3),
  ('筋トレ', 'fitness', '筋トレ関連の記事', '💪', 4),
  ('AI', 'ai', 'AI関連の記事', '🤖', 5),
  ('資産形成', 'investment', '資産形成関連の記事', '📈', 6)
ON CONFLICT (slug) DO NOTHING;

-- デフォルト設定の追加
INSERT INTO settings (key, value, type, description) VALUES
  ('site_title', 'トシぼうのブログ', 'text', 'サイトのタイトル'),
  ('site_description', '節約しながらもマッチョをあきらめず、AIや資産形成も大好き。', 'text', 'サイトの説明'),
  ('site_author', 'トシぼう', 'text', 'サイトの著者名'),
  ('posts_per_page', '10', 'number', '1ページあたりの記事数'),
  ('enable_comments', 'false', 'boolean', 'コメント機能の有効/無効')
ON CONFLICT (key) DO NOTHING;

