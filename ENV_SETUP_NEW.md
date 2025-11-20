# 環境変数の設定方法（新しいAPI Keys形式）

## 📍 現在のページ

https://supabase.com/dashboard/project/pmyalmtplwbzxlpffcmf/settings/api-keys

このページで確認できるもの：
- **Publishable key**（公開可能キー）
- **Secret key**（秘密キー）

## 📝 手順

### 1. Publishable keyをコピー

1. ページ上部の **「Publishable key」** セクションを確認
2. キーが表示されています（例: `sb_publishable_CP-mSRWvxUcM908GQEIDOQ_chETHX1h`）
3. 右側の **コピーアイコン** をクリックしてコピー
4. このキーを `.env.local` の `NEXT_PUBLIC_SUPABASE_ANON_KEY` に貼り付け

### 2. Secret keyをコピー

1. **「Secret keys」** セクションを確認
2. **「default」** という名前のキーを探す
3. 目のアイコン（👁️）をクリックしてキーを表示
4. コピーアイコンをクリックしてコピー
5. このキーを `.env.local` の `SUPABASE_SERVICE_ROLE_KEY` に貼り付け

### 3. Project URLを取得

Project URLは別のページにあります：

1. 左側のサイドバーで **Settings** をクリック
2. **「General」** をクリック
3. **「Project URL」** という項目を探す
4. 表示されているURLをコピー
5. `.env.local` の `NEXT_PUBLIC_SUPABASE_URL` に貼り付け

### 4. .env.localファイルを作成

プロジェクトルート（`package.json` がある場所）に `.env.local` ファイルを作成して、以下を入力：

```bash
# Supabase設定
# ⚠️ このファイルは絶対にGitにコミットしないでください！

# プロジェクトURL（Settings → General で確認）
NEXT_PUBLIC_SUPABASE_URL=ここにProject URLを貼り付け

# 公開可能キー（API KeysページのPublishable key）
NEXT_PUBLIC_SUPABASE_ANON_KEY=ここにPublishable keyを貼り付け

# 秘密キー（API KeysページのSecret key、目のアイコンで表示）
SUPABASE_SERVICE_ROLE_KEY=ここにSecret keyを貼り付け
```

### 5. 開発サーバーを再起動

環境変数を読み込むために、開発サーバーを再起動してください：

```bash
npm run dev
```

## ⚠️ 重要事項

- `.env.local` ファイルは **絶対にGitにコミットしないでください**
- Secret keyは目のアイコンをクリックしないと表示されません
- Secret keyは絶対に公開しないでください

