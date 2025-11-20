# 管理者メールアドレス制限の設定方法

指定のGメールアドレスのみが管理者ページにログインできるようにする方法を説明します。

## 方法1: アプリケーション側での制限（推奨・現在の実装）

現在の実装では、アプリケーション側でメールアドレスをチェックしています。この方法のメリットは、柔軟に変更できることです。

### 設定手順

1. **`.env.local` ファイルを開く**
   - プロジェクトルートにある `.env.local` ファイルを編集

2. **許可するメールアドレスを追加**
   ```bash
   # 許可された管理者のメールアドレス（カンマ区切り）
   ALLOWED_ADMIN_EMAILS=your-email@gmail.com
   ```

3. **複数のメールアドレスを許可する場合**
   ```bash
   ALLOWED_ADMIN_EMAILS=admin1@gmail.com,admin2@gmail.com,admin3@gmail.com
   ```

4. **開発サーバーを再起動**
   ```bash
   # サーバーを停止（Ctrl+C）してから
   npm run dev
   ```

### 動作確認

1. 許可されたメールアドレスでログイン
   - `/login` にアクセス
   - 許可されたメールアドレスでログイン
   - → `/admin` にアクセスできる

2. 許可されていないメールアドレスでログイン
   - `/login` にアクセス
   - 許可されていないメールアドレスでログイン
   - → `/admin` にアクセスしようとすると `/login` にリダイレクトされる

## 方法2: Supabase側での制限（オプション）

Supabase側でも制限をかけることができます。この方法は、データベースレベルで制限をかけるため、より厳格です。

### Supabaseでメールドメインを制限する方法

1. **Supabaseダッシュボードにログイン**
   - https://supabase.com/dashboard

2. **Authentication → Policies を開く**
   - 左側のサイドバーから「Authentication」をクリック
   - 「Policies」タブを開く

3. **RLSポリシーを作成（オプション）**
   - ただし、認証自体は制限できません
   - データベースアクセスのみ制限可能

### Supabaseで認証を制限する方法（トリガー）

SupabaseのSQL Editorで以下のSQLを実行すると、特定のメールアドレス以外の認証を拒否できます：

```sql
-- 許可されたメールアドレスのリスト
CREATE OR REPLACE FUNCTION check_allowed_email()
RETURNS TRIGGER AS $$
BEGIN
  -- 許可されたメールアドレスのリスト
  IF NEW.email NOT IN (
    'admin1@gmail.com',
    'admin2@gmail.com'
  ) THEN
    RAISE EXCEPTION 'このメールアドレスは許可されていません';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- トリガーを作成（ユーザー作成時）
CREATE TRIGGER check_email_on_signup
BEFORE INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION check_allowed_email();
```

**注意**: この方法は、ユーザーがサインアップする際にのみ機能します。既存のユーザーには影響しません。

## 推奨される方法

**方法1（アプリケーション側での制限）を推奨します**。理由：

1. ✅ 柔軟に変更できる
2. ✅ 環境変数で管理できる
3. ✅ コードを変更せずに設定を変更できる
4. ✅ 複数の環境（開発・本番）で異なる設定が可能

## トラブルシューティング

### メールアドレスが認識されない場合

1. **環境変数が正しく設定されているか確認**
   ```bash
   # .env.localファイルを確認
   cat .env.local | grep ALLOWED_ADMIN_EMAILS
   ```

2. **メールアドレスの大文字小文字を確認**
   - メールアドレスは大文字小文字を区別しませんが、念のため完全一致を確認

3. **開発サーバーを再起動**
   - 環境変数を変更した場合は、必ずサーバーを再起動

4. **ログを確認**
   - ブラウザのコンソール（F12）でエラーメッセージを確認
   - サーバーのログも確認

### 複数のメールアドレスを設定する場合

- カンマ（`,`）で区切る
- スペースは自動的に削除されます
- 例: `ALLOWED_ADMIN_EMAILS=admin1@gmail.com,admin2@gmail.com,admin3@gmail.com`

