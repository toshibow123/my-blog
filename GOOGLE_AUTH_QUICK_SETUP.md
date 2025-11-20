# Google認証のクイックセットアップ

「Unsupported provider: provider is not enabled」エラーが出る場合は、SupabaseでGoogle認証を有効化する必要があります。

## 📋 手順（5分で完了）

### 1. Supabaseダッシュボードにアクセス

1. https://supabase.com/dashboard にログイン
2. プロジェクトを選択

### 2. Google認証を有効化

1. **左側のサイドバーから「Authentication」をクリック**
   - または直接: https://supabase.com/dashboard/project/[YOUR-PROJECT-ID]/auth/providers

2. **「Providers」タブをクリック**

3. **「Google」を探す**
   - リストの中から「Google」を探します

4. **トグルスイッチをONにする**
   - 「Enable Google provider」のトグルをONにします

### 3. Google OAuth認証情報を設定（必須）

Google認証を使うには、Google Cloud ConsoleでOAuth認証情報を作成する必要があります。

#### 3-1. Google Cloud Consoleで認証情報を作成

1. **Google Cloud Consoleにアクセス**
   - https://console.cloud.google.com/

2. **プロジェクトを選択または作成**
   - 上部のプロジェクト選択ドロップダウンから選択
   - または「新しいプロジェクト」を作成

3. **OAuth同意画面を設定（初回のみ）**
   - 左側メニュー → 「APIとサービス」→「OAuth同意画面」
   - ユーザータイプを選択（外部 or 内部）
   - アプリ名を入力（例: 「トシぼうのブログ」）
   - 保存して次へ

4. **認証情報を作成**
   - 左側メニュー → 「APIとサービス」→「認証情報」
   - 上部の「+ 認証情報を作成」→「OAuth 2.0 クライアント ID」を選択
   - アプリケーションの種類: **「ウェブアプリケーション」**を選択
   - 名前: 任意（例: 「Supabase Google Auth」）

5. **承認済みのリダイレクト URIを追加**
   - 「承認済みのリダイレクト URI」セクションで「+ URI を追加」
   - 以下のURLを追加（`[YOUR-PROJECT-REF]`を実際の値に置き換え）:
     ```
     https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback
     ```
   - 例: `https://pmyalmtplwbzxlpffcmf.supabase.co/auth/v1/callback`
   - **重要**: Supabaseのプロジェクト参照IDを確認してください
     - Supabaseダッシュボード → Settings → General → Reference ID

6. **作成をクリック**
   - クライアントIDとクライアントシークレットが表示されます
   - これらをコピーします（後で使います）

#### 3-2. Supabaseに認証情報を設定

1. **Supabaseダッシュボードに戻る**
   - Authentication → Providers → Google

2. **認証情報を入力**
   - **Client ID (for OAuth)**: Google Cloud Consoleで取得したクライアントIDを貼り付け
   - **Client Secret (for OAuth)**: Google Cloud Consoleで取得したクライアントシークレットを貼り付け

3. **「Save」をクリック**

### 4. 動作確認

1. ブラウザで `/login` にアクセス
2. 「Googleでログイン」ボタンをクリック
3. Googleの認証画面が表示されれば成功です

## 🔍 トラブルシューティング

### エラー: "Unsupported provider: provider is not enabled"

→ SupabaseでGoogle認証が有効になっていません。上記の手順2を確認してください。

### エラー: "redirect_uri_mismatch"

→ Google Cloud Consoleの承認済みリダイレクトURIが正しく設定されていません。
- Supabaseのプロジェクト参照IDを確認
- リダイレクトURIが完全一致しているか確認（末尾のスラッシュなども含む）

### エラー: "invalid_client"

→ Google Cloud ConsoleのクライアントIDまたはシークレットが間違っています。
- Supabaseの設定画面で再度確認してください

## 📝 参考

- [Supabase公式ドキュメント: Google認証](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Google Cloud Console](https://console.cloud.google.com/)

