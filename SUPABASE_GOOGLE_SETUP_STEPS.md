# SupabaseでGoogle認証を設定する手順

Google認証のみを使用する場合の、Supabase側の設定手順です。

## 📋 手順（10分で完了）

### ステップ1: SupabaseでGoogle認証を有効化

1. **Supabaseダッシュボードにアクセス**
   - https://supabase.com/dashboard
   - プロジェクトを選択

2. **Authentication → Providers を開く**
   - 左側のサイドバー → 「Authentication」をクリック
   - 「Providers」タブをクリック
   - または直接: https://supabase.com/dashboard/project/[YOUR-PROJECT-ID]/auth/providers

3. **Googleを探して有効化**
   - リストの中から「Google」を探します
   - 「Enable Google provider」のトグルスイッチを **ON** にします

### ステップ2: Google Cloud ConsoleでOAuth認証情報を作成

1. **Google Cloud Consoleにアクセス**
   - https://console.cloud.google.com/
   - Googleアカウントでログイン

2. **プロジェクトを選択または作成**
   - 上部のプロジェクト選択ドロップダウンから選択
   - または「新しいプロジェクト」を作成
     - プロジェクト名: 任意（例: 「My Blog Auth」）
     - 「作成」をクリック

3. **OAuth同意画面を設定（初回のみ）**
   - 左側メニュー → 「APIとサービス」→「OAuth同意画面」
   - **ユーザータイプを選択**
     - 「外部」を選択（個人開発者の場合）
     - 「作成」をクリック
   - **アプリ情報を入力**
     - アプリ名: 任意（例: 「トシぼうのブログ」）
     - ユーザーサポートメール: 自分のメールアドレス
     - デベロッパーの連絡先情報: 自分のメールアドレス
     - 「保存して次へ」をクリック
   - **スコープ**
     - 「保存して次へ」をクリック（デフォルトのままでOK）
   - **テストユーザー**
     - 管理者のGmailアドレスを追加（例: `admin@gmail.com`）
     - 「保存して次へ」をクリック
   - **概要**
     - 「ダッシュボードに戻る」をクリック

4. **OAuth 2.0 クライアント IDを作成**
   - 左側メニュー → 「APIとサービス」→「認証情報」
   - 上部の「+ 認証情報を作成」→「OAuth 2.0 クライアント ID」を選択
   - **アプリケーションの種類**: 「ウェブアプリケーション」を選択
   - **名前**: 任意（例: 「Supabase Google Auth」）

5. **承認済みのリダイレクト URIを追加**
   - 「承認済みのリダイレクト URI」セクションで「+ URI を追加」をクリック
   - 以下のURLを追加（`[YOUR-PROJECT-REF]`を実際の値に置き換え）:
     ```
     https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback
     ```
   - **Supabaseのプロジェクト参照IDを確認する方法**:
     - Supabaseダッシュボード → Settings → General
     - 「Reference ID」を確認
     - 例: `pmyalmtplwbzxlpffcmf` の場合
     - リダイレクトURI: `https://pmyalmtplwbzxlpffcmf.supabase.co/auth/v1/callback`
   - **重要**: URLは完全一致する必要があります（末尾のスラッシュなども含む）

6. **作成をクリック**
   - 「OAuth クライアントを作成しました」というダイアログが表示されます
   - **クライアント ID** と **クライアント シークレット** が表示されます
   - これらをコピーします（後で使います）

### ステップ3: Supabaseに認証情報を設定

1. **Supabaseダッシュボードに戻る**
   - Authentication → Providers → Google

2. **認証情報を入力**
   - **Client ID (for OAuth)**: Google Cloud Consoleで取得したクライアントIDを貼り付け
   - **Client Secret (for OAuth)**: Google Cloud Consoleで取得したクライアントシークレットを貼り付け

3. **「Save」をクリック**
   - 設定が保存されます

### ステップ4: 環境変数を設定（オプション）

許可された管理者のメールアドレスを `.env.local` に設定します。

1. **`.env.local` ファイルを開く**
   - プロジェクトルートの `.env.local` を編集

2. **許可するメールアドレスを追加**
   ```bash
   ALLOWED_ADMIN_EMAILS=your-email@gmail.com
   ```
   - 管理者のGmailアドレスを設定
   - 複数の場合はカンマ区切り: `admin1@gmail.com,admin2@gmail.com`

3. **開発サーバーを再起動**
   ```bash
   npm run dev
   ```

### ステップ5: 動作確認

1. ブラウザで `/login` にアクセス
2. 「Googleでログイン」ボタンをクリック
3. Googleの認証画面が表示されれば成功です
4. 許可されたGmailアドレスでログイン
5. 管理者ダッシュボード（`/admin`）にリダイレクトされれば完了です

## 🔍 トラブルシューティング

### エラー: "Unsupported provider: provider is not enabled"

→ SupabaseでGoogle認証が有効になっていません。
- ステップ1を確認してください
- 「Enable Google provider」のトグルがONになっているか確認

### エラー: "redirect_uri_mismatch"

→ Google Cloud Consoleの承認済みリダイレクトURIが正しく設定されていません。
- Supabaseのプロジェクト参照IDを確認
- リダイレクトURIが完全一致しているか確認
- URLの末尾にスラッシュがないか確認

### エラー: "invalid_client"

→ Google Cloud ConsoleのクライアントIDまたはシークレットが間違っています。
- Supabaseの設定画面で再度確認
- コピー&ペーストで正確に貼り付けられているか確認

### エラー: "access_denied"

→ OAuth同意画面のテストユーザーに追加されていない可能性があります。
- Google Cloud Console → OAuth同意画面 → テストユーザー
- 管理者のGmailアドレスを追加

## 📝 重要なポイント

1. **プロジェクト参照IDの確認**
   - Supabaseダッシュボード → Settings → General → Reference ID
   - このIDを使ってリダイレクトURIを設定

2. **リダイレクトURIの完全一致**
   - URLは完全一致する必要があります
   - `https://` から始まる
   - 末尾にスラッシュがない
   - `/auth/v1/callback` で終わる

3. **テストユーザーの追加**
   - 開発中は、OAuth同意画面で「テストユーザー」にGmailアドレスを追加
   - 本番環境では、OAuth同意画面を「公開」にする必要があります

## 🎯 完了後の確認

- ✅ SupabaseでGoogle認証が有効になっている
- ✅ Google Cloud ConsoleでOAuth認証情報が作成されている
- ✅ リダイレクトURIが正しく設定されている
- ✅ SupabaseにクライアントIDとシークレットが設定されている
- ✅ `.env.local` に `ALLOWED_ADMIN_EMAILS` が設定されている

これで、Google認証のみを使用した安全なログインシステムが完成です！

