# 🚀 デプロイメントガイド - WordPressからNext.jsへの移行

## 📋 移行前の準備

### 1. WordPressサイトのバックアップ

**重要**: 既存のWordPressサイトのデータをバックアップしてください。

- データベースのエクスポート
- メディアファイル（画像など）のダウンロード
- テーマ・プラグインの設定の記録

### 2. 必要な情報の確認

- ドメイン: `www.toshiboh.com`
- ドメインのDNS設定がどこで管理されているか（お名前.com、Route53、Cloudflareなど）
- 現在のWordPressのホスティング先

---

## 🎯 デプロイ手順

### ステップ1: GitHubにコードをプッシュ

```bash
# Gitリポジトリの初期化（まだの場合）
git init

# リモートリポジトリを追加（GitHubでリポジトリを作成してから）
git remote add origin https://github.com/your-username/myblog.git

# コミット
git add .
git commit -m "Initial commit: Next.js blog"

# プッシュ
git push -u origin main
```

### ステップ2: Vercelにデプロイ

#### 方法1: Vercel CLI（推奨）

```bash
# Vercel CLIのインストール
npm i -g vercel

# ログイン
vercel login

# プロジェクトのデプロイ
vercel

# 本番環境にデプロイ
vercel --prod
```

#### 方法2: Vercel Web UI

1. [Vercel](https://vercel.com/) にアクセス
2. GitHubアカウントでログイン
3. 「Add New Project」をクリック
4. GitHubリポジトリを選択
5. プロジェクト設定:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`（そのまま）
   - **Build Command**: `npm run build`（自動検出される）
   - **Output Directory**: `.next`（自動検出される）
6. 「Deploy」をクリック

### ステップ3: 環境変数の設定

Vercelのダッシュボードで環境変数を設定：

1. プロジェクトの「Settings」→「Environment Variables」
2. 以下を追加：
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-J9G841J6YJ
   ```
3. 「Save」をクリック
4. 再デプロイ（「Deployments」タブから「Redeploy」）

### ステップ4: カスタムドメインの設定

#### Vercel側の設定

1. Vercelダッシュボード → プロジェクト → 「Settings」→「Domains」
2. `www.toshiboh.com` を追加
3. VercelがDNS設定の指示を表示します

#### DNS設定（ドメイン管理側）

現在のWordPressサイトのDNS設定を変更：

**AレコードまたはCNAMEレコードを変更**:

```
# 方法1: CNAMEレコード（推奨）
www.toshiboh.com → cname.vercel-dns.com

# 方法2: Aレコード
www.toshiboh.com → 76.76.21.21（VercelのIPアドレス）
```

**注意**: 
- 既存のWordPressサイトのDNS設定を確認
- 変更前に現在の設定をメモしておく
- DNSの反映には数時間かかる場合があります

### ステップ5: SSL証明書の確認

Vercelは自動的にSSL証明書を発行します。数分〜数時間で有効になります。

---

## ⚠️ 重要な注意事項

### 移行時のダウンタイム

1. **段階的移行（推奨）**:
   - まずVercelにデプロイ（`vercel.app`のURLで確認）
   - 動作確認が完了してからDNSを変更

2. **DNS変更のタイミング**:
   - 深夜やアクセスが少ない時間帯に実施
   - DNSの反映を待つ（数時間〜24時間）

### SEO対策

1. **301リダイレクトの設定**:
   - WordPressのURL構造とNext.jsのURL構造が異なる場合
   - `next.config.ts`にリダイレクト設定を追加（必要に応じて）

2. **Google Search Consoleの更新**:
   - 新しいサイトマップを送信: `https://www.toshiboh.com/sitemap.xml`
   - インデックス登録をリクエスト

3. **Google Analyticsの確認**:
   - 本番環境で正常に動作しているか確認

---

## 🔍 移行後の確認項目

- [ ] サイトが正常に表示される
- [ ] すべてのページがアクセス可能
- [ ] 画像が正しく表示される
- [ ] Google Analyticsが動作している
- [ ] サイトマップが正しく生成されている
- [ ] モバイル表示が正常
- [ ] ページ速度が良好（Lighthouseスコア確認）

---

## 🆘 トラブルシューティング

### DNSが反映されない

- DNSプロパゲーションの確認: [whatsmydns.net](https://www.whatsmydns.net/)
- キャッシュのクリア: `sudo dscacheutil -flushcache`（Mac）

### ビルドエラー

- Vercelのビルドログを確認
- 環境変数が正しく設定されているか確認
- ローカルで `npm run build` が成功するか確認

### 画像が表示されない

- `public/` フォルダ内の画像のパスを確認
- Markdownファイル内の画像パスを確認

---

## 📞 サポート

問題が発生した場合は、以下を確認：
1. Vercelのデプロイログ
2. ブラウザのコンソールエラー
3. DNS設定の確認

