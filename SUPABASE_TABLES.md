# Supabaseテーブル設計書

このドキュメントでは、ブログサイトで使用するSupabaseテーブルの詳細を説明します。

## 📊 テーブル一覧

### 1. **posts** - 記事テーブル

記事データを保存するメインテーブルです。

| カラム名 | 型 | 説明 | 必須 | デフォルト |
|---------|-----|------|------|-----------|
| `id` | UUID | 主キー | ✅ | `gen_random_uuid()` |
| `title` | TEXT | 記事タイトル | ✅ | - |
| `slug` | TEXT | URLスラッグ（ユニーク） | ✅ | - |
| `date` | TEXT | 公開日（日本語形式） | ✅ | - |
| `category` | TEXT | カテゴリー名 | ✅ | - |
| `category_slug` | TEXT | カテゴリースラッグ | ✅ | - |
| `tags` | TEXT[] | タグの配列 | ❌ | `{}` |
| `excerpt` | TEXT | 記事の抜粋 | ✅ | - |
| `content` | TEXT | 記事本文（Markdown形式） | ✅ | - |
| `hero_image` | TEXT | 先頭画像のURL | ❌ | `NULL` |
| `images` | TEXT[] | 文中画像のURL配列 | ❌ | `NULL` |
| `published` | BOOLEAN | 公開/非公開フラグ | ❌ | `true` |
| `view_count` | INTEGER | 閲覧数 | ❌ | `0` |
| `created_at` | TIMESTAMP | 作成日時 | ✅ | `NOW()` |
| `updated_at` | TIMESTAMP | 更新日時 | ✅ | `NOW()` |

**インデックス:**
- `idx_posts_slug` - スラッグ検索用
- `idx_posts_category_slug` - カテゴリー検索用
- `idx_posts_created_at` - 日付順ソート用
- `idx_posts_published` - 公開記事フィルタ用

---

### 2. **categories** - カテゴリーテーブル

カテゴリー情報を管理するテーブルです。

| カラム名 | 型 | 説明 | 必須 | デフォルト |
|---------|-----|------|------|-----------|
| `id` | UUID | 主キー | ✅ | `gen_random_uuid()` |
| `name` | TEXT | カテゴリー名（ユニーク） | ✅ | - |
| `slug` | TEXT | カテゴリースラッグ（ユニーク） | ✅ | - |
| `description` | TEXT | カテゴリーの説明 | ❌ | `NULL` |
| `icon` | TEXT | アイコン（絵文字など） | ❌ | `NULL` |
| `color` | TEXT | カテゴリーの色（CSSカラーコード） | ❌ | `NULL` |
| `sort_order` | INTEGER | 表示順序 | ❌ | `0` |
| `created_at` | TIMESTAMP | 作成日時 | ✅ | `NOW()` |

**インデックス:**
- `idx_categories_slug` - スラッグ検索用
- `idx_categories_sort_order` - ソート用

**デフォルトデータ:**
- 未分類、プログラミング、移住、節約、筋トレ、AI、資産形成

---

### 3. **tags** - タグテーブル（オプション）

タグを独立して管理するテーブルです。現在は`posts.tags`配列を使用していますが、将来的にタグ管理機能を強化する場合に使用します。

| カラム名 | 型 | 説明 | 必須 | デフォルト |
|---------|-----|------|------|-----------|
| `id` | UUID | 主キー | ✅ | `gen_random_uuid()` |
| `name` | TEXT | タグ名（ユニーク） | ✅ | - |
| `slug` | TEXT | タグスラッグ（ユニーク） | ✅ | - |
| `description` | TEXT | タグの説明 | ❌ | `NULL` |
| `post_count` | INTEGER | このタグが付いた記事数 | ❌ | `0` |
| `created_at` | TIMESTAMP | 作成日時 | ✅ | `NOW()` |

**インデックス:**
- `idx_tags_slug` - スラッグ検索用

---

### 4. **settings** - サイト設定テーブル

サイト全体の設定を管理するテーブルです。

| カラム名 | 型 | 説明 | 必須 | デフォルト |
|---------|-----|------|------|-----------|
| `id` | UUID | 主キー | ✅ | `gen_random_uuid()` |
| `key` | TEXT | 設定キー（ユニーク） | ✅ | - |
| `value` | TEXT | 設定値（JSON形式も可） | ❌ | `NULL` |
| `type` | TEXT | 設定の型 | ❌ | `'text'` |
| `description` | TEXT | 設定の説明 | ❌ | `NULL` |
| `created_at` | TIMESTAMP | 作成日時 | ✅ | `NOW()` |
| `updated_at` | TIMESTAMP | 更新日時 | ✅ | `NOW()` |

**インデックス:**
- `idx_settings_key` - キー検索用

**デフォルト設定:**
- `site_title` - サイトのタイトル
- `site_description` - サイトの説明
- `site_author` - サイトの著者名
- `posts_per_page` - 1ページあたりの記事数
- `enable_comments` - コメント機能の有効/無効

---

## 🔒 セキュリティポリシー（RLS）

### 読み取り権限
- **posts**: 公開記事（`published = true`）は全ユーザーが閲覧可能
- **categories**: 全ユーザーが閲覧可能
- **tags**: 全ユーザーが閲覧可能
- **settings**: 全ユーザーが閲覧可能

### 書き込み権限
- 現在はService Role Keyを使用しているため、全操作が可能
- **注意**: 本番環境では認証を実装して適切なポリシーを設定してください

---

## 📝 使用例

### 記事の作成
```sql
INSERT INTO posts (title, slug, date, category, category_slug, tags, excerpt, content)
VALUES (
  '記事タイトル',
  'article-slug',
  '2025年1月20日',
  'プログラミング',
  'programming',
  ARRAY['Python', 'Flask'],
  '記事の抜粋',
  '# 記事本文\n\nMarkdown形式で記述...'
);
```

### カテゴリーの追加
```sql
INSERT INTO categories (name, slug, description, icon, sort_order)
VALUES (
  '新カテゴリー',
  'new-category',
  'カテゴリーの説明',
  '🎯',
  10
);
```

### 設定の取得
```sql
SELECT value FROM settings WHERE key = 'site_title';
```

### 設定の更新
```sql
UPDATE settings 
SET value = '新しいタイトル', updated_at = NOW()
WHERE key = 'site_title';
```

---

## 🚀 次のステップ

1. **コメント機能**: 将来的に`comments`テーブルを追加
2. **ユーザー認証**: `users`テーブルとSupabase Authを統合
3. **アナリティクス**: 閲覧数やクリック数の追跡
4. **メディア管理**: 画像やファイルのメタデータ管理

