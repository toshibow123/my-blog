# トシぼうのブログ

Next.js + Tailwind CSSで構築された個人ブログサイトです。

**セキュリティ重視のMarkdown + GitHubスタイル運用**

このブログは、セキュリティを最優先に考え、Markdownファイルベースの静的生成方式を採用しています。記事の作成・編集は、ローカルのMarkdownファイルを編集し、GitHubにプッシュするだけで自動的にサイトが更新されます。

## 技術スタック

- **Next.js 16** - Reactフレームワーク（静的生成対応）
- **TypeScript** - 型安全性
- **Tailwind CSS** - スタイリング
- **App Router** - Next.jsの最新ルーティングシステム
- **gray-matter** - MarkdownファイルのFront Matterパース
- **remark** - Markdownパーサー

**注意**: このブログは**Supabaseなしで運用**しています。セキュリティとシンプルさを重視し、完全にMarkdownベースの静的生成方式を採用しています。

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# 本番ビルド
npm run build

# 本番サーバーの起動
npm start
```

開発サーバーは [http://localhost:3000](http://localhost:3000) で起動します。

## プロジェクト構造

```
myblog/
├── app/                    # Next.js App Router
│   ├── about/             # プロフィールページ
│   ├── contact/           # お問い合わせページ
│   ├── privacy/           # プライバシーポリシー
│   ├── terms/             # 利用規約
│   ├── posts/             # 記事ページ（動的ルート）
│   ├── category/          # カテゴリーページ
│   ├── tag/               # タグページ
│   ├── layout.tsx         # ルートレイアウト
│   └── page.tsx           # ホームページ
├── content/               # 記事のMarkdownファイル
│   └── posts/            # 記事のMarkdownファイル（.md）
├── components/            # Reactコンポーネント
│   ├── Header.tsx        # ヘッダーコンポーネント
│   ├── Sidebar.tsx        # サイドバーコンポーネント
│   └── Footer.tsx         # フッターコンポーネント
├── lib/                   # ユーティリティ関数
│   ├── posts-markdown.ts # Markdownファイル読み込み関数
│   └── posts-api.ts      # Supabase API（無効化済み、参考用）
├── scripts/               # スクリプト
│   └── export-to-markdown.ts # SupabaseからMarkdownへのエクスポート
└── public/               # 静的ファイル
```

## 📝 記事の作成・編集方法

### 基本的な運用フロー

1. **ローカルでMarkdownファイルを編集**
   - `content/posts/` ディレクトリ内の `.md` ファイルを編集
   - VS Codeなどのエディタで快適に執筆できます

2. **Gitでコミット・プッシュ**
   ```bash
   git add content/posts/新しい記事.md
   git commit -m "新しい記事を追加"
   git push
   ```

3. **自動デプロイ**
   - Vercelなどのホスティングサービスが自動的にビルド・デプロイします

### Markdownファイルの形式

各記事は以下の形式で作成します：

```markdown
---
title: "記事のタイトル"
date: "2025年1月15日"
category: "プログラミング"
categorySlug: "programming"
tags: ["Python", "Flask"]
excerpt: "記事の要約文です。"
slug: "article-slug"
hero_image: "/images/hero.jpg"  # オプション
images: ["/images/img1.jpg", "/images/img2.jpg"]  # オプション
published: true  # falseにすると非公開
---

# 記事のタイトル

記事の本文をここに書きます。

[画像0]  <!-- 文中に画像を挿入する場合は、この形式を使用 -->

続きの本文...
```

### Front Matterの項目説明

- **title**: 記事のタイトル（必須）
- **date**: 公開日（日本語形式、例: "2025年1月15日"）
- **category**: カテゴリー名（表示用）
- **categorySlug**: カテゴリーのスラッグ（URL用、例: "programming"）
- **tags**: タグの配列（例: `["Python", "Flask"]`）
- **excerpt**: 記事の要約（一覧表示で使用）
- **slug**: URLスラッグ（ファイル名から自動生成されるため、通常は不要）
- **hero_image**: ヒーロー画像のURL（オプション）
- **images**: 文中画像のURL配列（オプション）
- **published**: 公開フラグ（`true` または `false`、デフォルト: `true`）

### 画像の追加方法

1. **ヒーロー画像**: `hero_image` フィールドに画像URLを指定
2. **文中画像**: `images` 配列に画像URLを追加し、本文中で `[画像0]`, `[画像1]` の形式で参照

画像ファイルは `public/images/` ディレクトリに配置するか、外部URLを使用できます。

### Supabaseから移行する場合（既に実行済み）

既存のSupabaseデータをMarkdownファイルにエクスポートするには：

```bash
npm run export:markdown
```

**注意**: このコマンドを実行するには、`.env.local`にSupabaseの環境変数が必要です。通常の運用では不要です。

既にエクスポートは完了しており、現在は**Supabaseなしで運用**しています。

## Googleアドセンス審査に向けたチェックリスト

### ✅ 実装済み

- [x] プライバシーポリシーページ（`/privacy`）
- [x] お問い合わせページ（`/contact`）
- [x] 利用規約ページ（`/terms`）
- [x] フッターに必須ページへのリンク
- [x] プロフィールページ（`/about`）
- [x] レスポンシブデザイン
- [x] 明確なナビゲーション構造

### 📝 追加で必要な作業

#### 1. コンテンツの充実
- [ ] 記事数を15〜20記事以上に増やす
- [ ] 各記事を800〜1,500文字以上にする
- [ ] オリジナルコンテンツのみを使用
- [ ] 定期的な更新（週1回以上）

#### 2. お問い合わせページの設定
- [ ] `/app/contact/page.tsx`のメールアドレスを実際のアドレスに変更
- [ ] お問い合わせフォームの実装（オプション）
  - Contact Form 7（WordPressの場合）
  - Formspree、SendGridなどのサービス
  - 自前のAPIエンドポイント

#### 3. SEO対策
- [ ] Google Search Consoleへの登録
- [ ] XMLサイトマップの生成と登録
- [ ] メタタグの最適化（各ページ）
- [ ] 構造化データ（JSON-LD）の追加

#### 4. パフォーマンス最適化
- [ ] 画像の最適化（Next.js Imageコンポーネント使用）
- [ ] ページ速度の改善（Lighthouseスコア90以上を目標）
- [ ] キャッシュ設定

#### 5. その他
- [ ] サイトマップページの作成（`/sitemap`）
- [ ] 404ページのカスタマイズ
- [ ] モバイル表示の確認
- [ ] ブラウザ互換性の確認

## カスタマイズ

### カテゴリーの追加・変更

`components/Sidebar.tsx`の`categories`配列を編集してください。

### 色の変更

Tailwind CSSのクラスを変更することで、サイト全体のカラースキームを変更できます。
主な色：
- プライマリー: `pink-500`, `pink-600`
- グラデーション: `from-purple-600 via-pink-500 to-pink-400`

### メタデータの変更

各ページの`metadata`オブジェクトを編集してください。

## デプロイ

### Vercel（推奨）

```bash
# Vercel CLIのインストール
npm i -g vercel

# デプロイ
vercel
```

### その他のプラットフォーム

- Netlify
- AWS Amplify
- その他の静的ホスティングサービス

## ライセンス

このプロジェクトは個人ブログ用のテンプレートです。
