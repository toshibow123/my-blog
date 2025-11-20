# 管理者認証のセットアップガイド

管理者ページにアクセスするために、Supabase認証を設定します。メール/パスワード認証とGoogle認証の両方をサポートしています。

## 1. Supabaseで認証を有効化

### メール/パスワード認証を有効化（推奨）

1. **Supabaseダッシュボードにログイン**
   - https://supabase.com/dashboard にアクセス

2. **プロジェクトを選択**

3. **Authentication（認証）を開く**
   - 左側のサイドバーから **「Authentication」** をクリック

4. **Providers（プロバイダー）を開く**
   - 「Providers」タブをクリック

5. **Email認証を確認**
   - 「Email」がデフォルトで有効になっています
   - 必要に応じて設定を確認

6. **管理者アカウントを作成（メール/パスワード認証の場合）**
   - 「Authentication」→「Users」を開く
   - 「Add user」ボタンをクリック
   - メールアドレスとパスワードを設定
   - **Auto Confirm User** にチェックを入れる（メール確認をスキップ）
   - 「Create user」をクリック
   - 詳細は `ADMIN_USER_CREATION.md` を参照

### Google認証を有効化（オプション）

### 手順

1. **Supabaseダッシュボードにログイン**
   - https://supabase.com/dashboard にアクセス

2. **プロジェクトを選択**

3. **Authentication（認証）を開く**
   - 左側のサイドバーから **「Authentication」** をクリック

4. **Providers（プロバイダー）を開く**
   - 「Providers」タブをクリック

5. **Googleを有効化**
   - 「Google」を探して、トグルスイッチを **ON** にする

6. **Google OAuth認証情報を取得**
   - Google Cloud Console（https://console.cloud.google.com/）にアクセス
   - 新しいプロジェクトを作成（または既存のプロジェクトを選択）
   - 「APIとサービス」→「認証情報」を開く
   - 「認証情報を作成」→「OAuth 2.0 クライアント ID」を選択
   - アプリケーションの種類: 「ウェブアプリケーション」
   - 承認済みのリダイレクト URI に以下を追加:
     ```
     https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback
     ```
     - `[YOUR-PROJECT-REF]` は、Supabaseのプロジェクト参照IDです
     - 例: `https://pmyalmtplwbzxlpffcmf.supabase.co/auth/v1/callback`

7. **認証情報をSupabaseに設定**
   - Google Cloud Consoleで作成した **クライアント ID** と **クライアント シークレット** をコピー
   - SupabaseのGoogle設定画面に貼り付け
   - 「Save」をクリック

## 2. 環境変数の設定

`.env.local` ファイルに、許可された管理者のメールアドレスを追加：

```bash
# 許可された管理者のメールアドレス（カンマ区切り）
ALLOWED_ADMIN_EMAILS=your-email@gmail.com,another-admin@gmail.com
```

**重要**: 
- 複数のメールアドレスを許可する場合は、カンマ（`,`）で区切ります
- この環境変数が設定されていない場合、すべての認証済みユーザーが管理者としてアクセスできます（本番環境では必ず設定してください）

## 3. 動作確認

1. 開発サーバーを起動:
   ```bash
   npm run dev
   ```

2. ブラウザで `/admin` にアクセス
   - 自動的に `/admin/login` にリダイレクトされます

3. 「Googleでログイン」ボタンをクリック
   - Googleの認証画面が表示されます

4. 許可されたメールアドレスでログイン
   - ログイン後、管理者ダッシュボードにリダイレクトされます

5. 許可されていないメールアドレスでログイン
   - ログインは成功しますが、管理者ページにはアクセスできません

## 4. トラブルシューティング

### リダイレクトエラーが発生する場合

- SupabaseのリダイレクトURIが正しく設定されているか確認
- Google Cloud Consoleの承認済みリダイレクトURIに、SupabaseのコールバックURLが追加されているか確認

### ログインできない場合

- ブラウザのコンソールでエラーメッセージを確認
- Supabaseダッシュボードの「Authentication」→「Logs」でエラーを確認

### 管理者として認識されない場合

- `.env.local` の `ALLOWED_ADMIN_EMAILS` が正しく設定されているか確認
- メールアドレスの大文字小文字が一致しているか確認
- 環境変数を変更した場合は、開発サーバーを再起動

## 参考リンク

- [Supabase Auth ドキュメント](https://supabase.com/docs/guides/auth)
- [Google OAuth セットアップ](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Next.js と Supabase Auth](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

