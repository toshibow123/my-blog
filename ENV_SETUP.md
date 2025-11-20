# 環境変数の設定方法

## 📝 手順

### 1. `.env.local` ファイルを作成

プロジェクトルート（`package.json` がある場所）に `.env.local` というファイルを作成してください。

### 2. 以下の内容をコピーして貼り付け

```bash
# Supabase設定
# ⚠️ このファイルは絶対にGitにコミットしないでください！

# プロジェクトURL（PUBLIC - 公開しても安全）
# Project ID: fjqhlklqshqbacpxkkcj
# 推測されるURL: https://fjqhlklqshqbacpxkkcj.supabase.co
# 実際のURLはSettings → Generalで確認してください
NEXT_PUBLIC_SUPABASE_URL=https://fjqhlklqshqbacpxkkcj.supabase.co

# 匿名キー（PUBLIC - 公開しても安全、ただしRLSで保護）
NEXT_PUBLIC_SUPABASE_ANON_KEY=ここにPublishable keyを貼り付け

# サービスロールキー（SECRET - 絶対に公開しない！）
# このキーは管理者操作用で、サーバーサイドのみで使用
SUPABASE_SERVICE_ROLE_KEY=ここにSecret keyを貼り付け

# 許可された管理者のメールアドレス（カンマ区切り）
# このメールアドレスのみが管理者ページにアクセスできます
# 例: ALLOWED_ADMIN_EMAILS=admin@example.com,another-admin@example.com
ALLOWED_ADMIN_EMAILS=your-email@gmail.com
```

### 3. Supabaseダッシュボードからキーを取得

1. https://supabase.com/dashboard にログイン
2. プロジェクトを選択
3. **左側のサイドバーの一番下**にある **⚙️ Settings** をクリック
4. **「API Keys」** をクリック
   - または直接: https://supabase.com/dashboard/project/pmyalmtplwbzxlpffcmf/settings/api-keys
5. 以下のキーをコピー：

   #### Project URLの取得
   - **Settings** → **「General」** または **「API」** をクリック
   - **「Project URL」** という項目を探す
   - 表示されているURLをそのままコピー
   - または、Project IDから生成: `https://{project-id}.supabase.co`
   - あなたのProject ID: `fjqhlklqshqbacpxkkcj`
   - 推測されるURL: `https://fjqhlklqshqbacpxkkcj.supabase.co`
   - これを `.env.local` の `NEXT_PUBLIC_SUPABASE_URL` に貼り付け
   - ⚠️ 実際のURLはSettings → Generalで確認するのが確実です

   #### API Keysの取得（API Keysページで）
   - **Publishable key**（公開可能キー）
     - ページ上部の「Publishable key」セクションに表示されています
     - 例: `sb_publishable_CP-mSRWvxUcM908GQEIDOQ_chETHX1h`
     - コピーアイコンをクリックしてコピー
     - `.env.local` の `NEXT_PUBLIC_SUPABASE_ANON_KEY` に貼り付け
   - **Secret key**（秘密キー）
     - 「Secret keys」セクションの「default」キー
     - 目のアイコン（👁️）をクリックして表示
     - コピーアイコンをクリックしてコピー
     - `.env.local` の `SUPABASE_SERVICE_ROLE_KEY` に貼り付け
     - ⚠️ 秘密キーは目のアイコンをクリックしないと表示されません

### 4. ファイルを保存

`.env.local` ファイルを保存してください。

### 5. 開発サーバーを再起動

環境変数を読み込むために、開発サーバーを再起動してください：

```bash
# 現在のサーバーを停止（Ctrl+C）
# その後、再起動
npm run dev
```

## ⚠️ 重要事項

- `.env.local` ファイルは **絶対にGitにコミットしないでください**
- `.gitignore` に既に含まれているので、通常は問題ありません
- 念のため、コミット前に `git status` で確認してください

## 📍 ファイルの場所

```
myblog/
├── package.json
├── .env.local          ← ここに作成
├── .env.local.example  ← これは例（参考用）
└── ...
```

