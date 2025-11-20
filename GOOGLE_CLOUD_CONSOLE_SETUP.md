# Google Cloud ConsoleでOAuth認証情報を作成する手順

SupabaseでGoogle認証を使うために、Google Cloud ConsoleでOAuth認証情報（クライアントIDとシークレット）を作成します。

## 📋 手順（10分で完了）

### ステップ1: Google Cloud Consoleにアクセス

1. **Google Cloud Consoleにアクセス**
   - https://console.cloud.google.com/
   - Googleアカウントでログイン

### ステップ2: プロジェクトを作成または選択

1. **プロジェクトを選択**
   - 画面上部のプロジェクト選択ドロップダウンをクリック
   - 既存のプロジェクトを選択するか、「新しいプロジェクト」を作成

2. **新しいプロジェクトを作成する場合**
   - 「新しいプロジェクト」をクリック
   - プロジェクト名: 任意（例: 「My Blog Auth」）
   - 「作成」をクリック
   - プロジェクトが作成されるまで数秒待つ

### ステップ3: OAuth同意画面を設定（初回のみ）

1. **OAuth同意画面を開く**
   - 左側メニュー → 「APIとサービス」→「OAuth同意画面」
   - または直接: https://console.cloud.google.com/apis/credentials/consent

2. **ユーザータイプを選択**
   - 「外部」を選択（個人開発者や小規模チームの場合）
   - 「作成」をクリック

3. **アプリ情報を入力**
   - **アプリ名**: 任意（例: 「トシぼうのブログ」）
   - **ユーザーサポートメール**: 自分のメールアドレスを選択
   - **デベロッパーの連絡先情報**: 自分のメールアドレスを入力
   - 「保存して次へ」をクリック

4. **スコープ（スキップ可能）**
   - 「保存して次へ」をクリック（デフォルトのままでOK）

5. **テストユーザーを追加**
   - 「+ ADD USERS」をクリック
   - 管理者のGmailアドレスを入力（例: `admin@gmail.com`）
   - 「追加」をクリック
   - 「保存して次へ」をクリック

6. **概要を確認**
   - 「ダッシュボードに戻る」をクリック

### ステップ4: OAuth 2.0 クライアント IDを作成

1. **認証情報ページを開く**
   - 左側メニュー → 「APIとサービス」→「認証情報」
   - または直接: https://console.cloud.google.com/apis/credentials

2. **OAuth 2.0 クライアント IDを作成**
   - 画面上部の「+ 認証情報を作成」をクリック
   - 「OAuth 2.0 クライアント ID」を選択

3. **アプリケーションの種類を選択**
   - **アプリケーションの種類**: 「ウェブアプリケーション」を選択

4. **名前を入力**
   - **名前**: 任意（例: 「Supabase Google Auth」）

5. **承認済みのリダイレクト URIを追加**
   - 「承認済みのリダイレクト URI」セクションで「+ URI を追加」をクリック
   - 以下のURLを入力（`[YOUR-PROJECT-REF]`を実際の値に置き換え）:
     ```
     https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback
     ```
   - **Supabaseのプロジェクト参照IDを確認する方法**:
     - Supabaseダッシュボード → Settings → General
     - 「Reference ID」を確認
     - 例: `fjqhlklqshqbacpxkkcj` の場合
     - リダイレクトURI: `https://fjqhlklqshqbacpxkkcj.supabase.co/auth/v1/callback`
   - **重要**: 
     - URLは完全一致する必要があります
     - `https://` から始まる
     - 末尾にスラッシュがない
     - `/auth/v1/callback` で終わる

6. **作成をクリック**
   - 「OAuth クライアントを作成しました」というダイアログが表示されます

### ステップ5: クライアントIDとシークレットをコピー

1. **クライアントIDをコピー**
   - ダイアログに表示されている「クライアント ID」をコピー
   - 例: `123456789-abcdefghijklmnop.apps.googleusercontent.com`
   - または、認証情報ページで作成したクライアントIDをクリックして表示

2. **クライアントシークレットをコピー**
   - ダイアログに表示されている「クライアント シークレット」をコピー
   - 例: `GOCSPX-abcdefghijklmnopqrstuvwxyz`
   - **重要**: シークレットは一度しか表示されません。必ずコピーしてください
   - もし見逃した場合は、認証情報ページでクライアントIDをクリックして再表示できます

### ステップ6: Supabaseに設定

1. **Supabaseダッシュボードに戻る**
   - Authentication → Providers → Google

2. **認証情報を入力**
   - **Client IDs**: コピーしたクライアントIDを貼り付け
   - **Client Secret (for OAuth)**: コピーしたクライアントシークレットを貼り付け

3. **「Save」をクリック**

## 📝 重要なポイント

### クライアントIDとは？

- Google認証を使うために必要な識別子
- 公開しても安全（ただし、シークレットは絶対に公開しない）
- 例: `123456789-abcdefghijklmnop.apps.googleusercontent.com`

### クライアントシークレットとは？

- Google認証を使うために必要な秘密鍵
- **絶対に公開しない**
- 例: `GOCSPX-abcdefghijklmnopqrstuvwxyz`

### リダイレクトURIとは？

- Google認証後に戻ってくるURL
- SupabaseのCallback URLと完全一致する必要がある
- 例: `https://fjqhlklqshqbacpxkkcj.supabase.co/auth/v1/callback`

## 🔍 トラブルシューティング

### OAuth同意画面が表示されない場合

- プロジェクトが選択されているか確認
- 左側メニューから「APIとサービス」→「OAuth同意画面」に直接アクセス

### クライアントシークレットが見えない場合

- 認証情報ページで、作成したクライアントIDをクリック
- 「クライアント シークレット」の目のアイコンをクリックして表示

### リダイレクトURIエラーが出る場合

- SupabaseのCallback URLを確認
- Google Cloud ConsoleのリダイレクトURIと完全一致しているか確認
- URLの末尾にスラッシュがないか確認

## 🎯 完了後の確認

- ✅ Google Cloud Consoleでプロジェクトが作成されている
- ✅ OAuth同意画面が設定されている
- ✅ OAuth 2.0 クライアント IDが作成されている
- ✅ リダイレクトURIが正しく設定されている
- ✅ クライアントIDとシークレットをコピーした
- ✅ Supabaseに認証情報を設定した

これで、Google認証が使えるようになります！

