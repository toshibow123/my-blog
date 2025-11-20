# 認証設定の違いを理解する

Google認証の設定で、GメールアドレスとクライアントIDの違いを説明します。

## 🔑 2つの異なる設定

### 1. Supabaseの設定（Google Cloud Consoleで作成）

**場所**: Supabaseダッシュボード → Authentication → Providers → Google

**必要なもの**:
- **Client IDs**: Google Cloud Consoleで作成したOAuthクライアントID
  - 例: `123456789-abcdefghijklmnop.apps.googleusercontent.com`
  - これは**Gメールアドレスではありません**
- **Client Secret**: Google Cloud Consoleで作成したOAuthクライアントシークレット
  - 例: `GOCSPX-abcdefghijklmnopqrstuvwxyz`

**これらは何？**
- Google認証を使うための「認証情報」
- Google Cloud Consoleで作成する必要がある
- 一度作成すれば、ずっと使える

### 2. 環境変数の設定（自分のGメールアドレス）

**場所**: `.env.local` ファイル

**必要なもの**:
- **ALLOWED_ADMIN_EMAILS**: 管理者として許可するGメールアドレス
  - 例: `your-email@gmail.com`
  - これは**自分のGメールアドレス**です

**これは何？**
- どのGメールアドレスが管理者としてログインできるかを指定
- 複数のメールアドレスを許可する場合はカンマ区切り

## 📋 設定の流れ

### ステップ1: Google Cloud Consoleで認証情報を作成

1. Google Cloud Consoleにアクセス
2. OAuth 2.0 クライアント IDを作成
3. **クライアントID**と**クライアントシークレット**を取得
   - これらは長い文字列です（Gメールアドレスではありません）

### ステップ2: Supabaseに認証情報を設定

1. Supabaseダッシュボード → Authentication → Providers → Google
2. **Client IDs**: Google Cloud Consoleで取得したクライアントIDを貼り付け
3. **Client Secret**: Google Cloud Consoleで取得したクライアントシークレットを貼り付け
4. 「Save」をクリック

### ステップ3: 環境変数にGメールアドレスを設定

1. `.env.local` ファイルを開く
2. 以下を追加:
   ```bash
   ALLOWED_ADMIN_EMAILS=your-email@gmail.com
   ```
   - ここに**自分のGメールアドレス**を入力
3. 開発サーバーを再起動

## 🎯 まとめ

| 設定場所 | 入力するもの | 例 |
|---------|------------|-----|
| Supabase (Client IDs) | Google Cloud Consoleで作成したクライアントID | `123456789-abc...apps.googleusercontent.com` |
| Supabase (Client Secret) | Google Cloud Consoleで作成したシークレット | `GOCSPX-abc...xyz` |
| `.env.local` (ALLOWED_ADMIN_EMAILS) | **自分のGメールアドレス** | `admin@gmail.com` |

## 💡 簡単に言うと

- **Supabaseの設定**: Google Cloud Consoleで作成した「認証情報」（長い文字列）
- **環境変数**: 管理者として許可する「Gメールアドレス」（自分のメールアドレス）

両方必要ですが、**別々の場所**に設定します！

