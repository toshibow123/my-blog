# Supabaseセットアップガイド

## 1. Supabaseアカウントの作成

1. https://supabase.com/ にアクセス
2. 「Start your project」をクリック
3. GitHubアカウントでサインアップ（推奨）

## 2. プロジェクトの作成

1. 「New Project」をクリック
2. プロジェクト名を入力（例: `myblog`）
3. データベースパスワードを設定（重要：忘れないように！）
4. リージョンを選択（`Tokyo` が最速）
5. 「Create new project」をクリック

## 3. データベーステーブルの作成

Supabaseダッシュボードの「SQL Editor」で以下を実行：

```sql
-- ============================================
-- 1. 記事テーブル (posts)
-- ============================================
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  date TEXT NOT NULL,
  category TEXT NOT NULL,
  category_slug TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}', -- タグの配列
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  hero_image TEXT, -- 先頭画像（見出し画像）のURL
  images TEXT[], -- 文中画像のURL配列
  published BOOLEAN DEFAULT true, -- 公開/非公開フラグ
  view_count INTEGER DEFAULT 0, -- 閲覧数
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. カテゴリーテーブル (categories)
-- ============================================
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT, -- カテゴリーの説明
  icon TEXT, -- アイコン（絵文字など）
  color TEXT, -- カテゴリーの色（CSSカラーコード）
  sort_order INTEGER DEFAULT 0, -- 表示順序
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. タグテーブル (tags) - オプション
-- ============================================
-- タグを独立して管理したい場合に使用
CREATE TABLE tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT, -- タグの説明
  post_count INTEGER DEFAULT 0, -- このタグが付いた記事数
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. サイト設定テーブル (settings)
-- ============================================
CREATE TABLE settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL, -- 設定キー（例: 'site_title', 'site_description'）
  value TEXT, -- 設定値（JSON形式も可）
  type TEXT DEFAULT 'text', -- 設定の型（text, number, boolean, json）
  description TEXT, -- 設定の説明
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- インデックスの作成（検索を高速化）
-- ============================================
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_category_slug ON posts(category_slug);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_published ON posts(published) WHERE published = true;
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_sort_order ON categories(sort_order);
CREATE INDEX idx_tags_slug ON tags(slug);
CREATE INDEX idx_settings_key ON settings(key);

-- ============================================
-- RLS（Row Level Security）の設定
-- ============================================
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- ============================================
-- セキュリティポリシー
-- ============================================

-- 全ユーザーが読み取り可能（公開ブログのため）
CREATE POLICY "Posts are viewable by everyone" ON posts
  FOR SELECT USING (published = true OR true); -- 管理者は非公開も見れる

CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Tags are viewable by everyone" ON tags
  FOR SELECT USING (true);

CREATE POLICY "Settings are viewable by everyone" ON settings
  FOR SELECT USING (true);

-- 管理者のみ書き込み可能（Service Role Keyを使用するため、全許可）
-- 注意: 本番環境では認証を実装して適切なポリシーを設定してください
CREATE POLICY "Allow all operations for service role on posts" ON posts
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations for service role on categories" ON categories
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations for service role on tags" ON tags
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations for service role on settings" ON settings
  FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- 初期データの投入（オプション）
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
```

## 4. 環境変数の設定

`.env.local` ファイルを作成（または編集）：

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Supabaseダッシュボードの「Settings」→「API」から取得：
- `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `service_role` → `SUPABASE_SERVICE_ROLE_KEY`（管理者用、サーバーサイドのみ）

## 5. Supabase Storageの設定

画像をアップロードするために、Supabase Storageバケットを作成します：

1. Supabaseダッシュボードの「Storage」を開く
2. 「New bucket」をクリック
3. バケット名: `images`
4. 「Public bucket」にチェック（画像を公開するため）
5. 「Create bucket」をクリック

## 6. パッケージのインストール

```bash
npm install @supabase/supabase-js
```

## 7. Supabaseクライアントの作成

`lib/supabase.ts` を作成（後で実装）

## 8. 認証の実装（オプション）

管理者ページを保護する場合は、Supabase Authを使用：

```bash
npm install @supabase/auth-helpers-nextjs
```

## 参考リンク

- [Supabase公式ドキュメント](https://supabase.com/docs)
- [Next.js統合ガイド](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

