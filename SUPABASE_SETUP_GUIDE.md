# Supabaseセットアップ完全ガイド

## ステップ1: Supabaseアカウント作成とプロジェクト作成

### 1-1. アカウント作成
1. https://supabase.com にアクセス
2. 右上の「Start your project」または「Sign in」をクリック
3. GitHubアカウントでサインイン（推奨）またはメールアドレスで登録

### 1-2. 新しいプロジェクトを作成
1. ダッシュボードで「New Project」をクリック
2. 以下の情報を入力：
   - **Name**: プロジェクト名（例: `myblog-comments`）
   - **Database Password**: データベースのパスワード（**必ずメモしておく！**）
   - **Region**: 最寄りのリージョンを選択（例: `Northeast Asia (Tokyo)`）
   - **Pricing Plan**: Free tier を選択（無料プラン）
3. 「Create new project」をクリック
4. プロジェクトの作成が完了するまで2-3分待つ（「Setting up your project...」と表示される）

---

## ステップ2: APIキーの取得

### 2-1. プロジェクトの設定画面を開く
1. 左サイドバーの「Settings」（歯車アイコン）をクリック
2. 「API」をクリック

### 2-2. 必要な情報をコピー
以下の3つの情報をコピーしてメモしておきます：

#### ① Project URL
- 「Project URL」の下に表示されているURL
- 例: `https://xxxxxxxxxxxxx.supabase.co`

#### ② anon public key
- 「Project API keys」セクションの「anon public」の横にある「eye」アイコンをクリックして表示
- 長い文字列（例: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`）

#### ③ service_role key（オプション）
- 同じく「service_role」の横にある「eye」アイコンをクリック
- **⚠️ 注意: このキーは秘密にしてください。絶対に公開しないでください！**

---

## ステップ3: 環境変数の設定

### 3-1. `.env.local` ファイルを作成・編集
プロジェクトのルートディレクトリ（`package.json` がある場所）に `.env.local` ファイルを作成します。

### 3-2. 環境変数を追加
以下の形式で追加します（実際の値に置き換えてください）：

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**重要:**
- `NEXT_PUBLIC_` で始まる変数は、ブラウザ側でも使える変数です
- `SUPABASE_SERVICE_ROLE_KEY` はサーバー側のみで使用（オプション）
- `.env.local` はGitにコミットしないでください（`.gitignore` に追加済みのはず）

### 3-3. 開発サーバーを再起動
環境変数を変更したら、Next.jsの開発サーバーを再起動してください：

```bash
# 現在のサーバーを停止（Ctrl+C）
# 再度起動
npm run dev
```

---

## ステップ4: データベーステーブルの作成

### 4-1. SQL Editorを開く
1. Supabaseダッシュボードの左サイドバーから「SQL Editor」をクリック
2. 「New query」をクリック

### 4-2. SQLを実行
プロジェクト内の `supabase-schema.sql` ファイルの内容をコピーして、SQL Editorに貼り付けます。

または、以下のSQLを直接貼り付けて実行：

```sql
-- コメントテーブル作成
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  post_slug TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_email TEXT,
  author_ip TEXT,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'spam')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス追加
CREATE INDEX IF NOT EXISTS idx_comments_post_slug ON comments(post_slug);
CREATE INDEX IF NOT EXISTS idx_comments_status ON comments(status);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_author_ip ON comments(author_ip);

-- レート制限チェック関数
CREATE OR REPLACE FUNCTION check_rate_limit()
RETURNS TRIGGER AS $$
DECLARE
  comment_count INTEGER;
BEGIN
  IF NEW.author_ip IS NOT NULL THEN
    SELECT COUNT(*) INTO comment_count
    FROM comments
    WHERE author_ip = NEW.author_ip
      AND created_at > NOW() - INTERVAL '1 hour';
    
    IF comment_count >= 5 THEN
      RAISE EXCEPTION 'Rate limit exceeded. Please wait before posting again.';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- レート制限トリガー
DROP TRIGGER IF EXISTS rate_limit_trigger ON comments;
CREATE TRIGGER rate_limit_trigger
BEFORE INSERT ON comments
FOR EACH ROW
EXECUTE FUNCTION check_rate_limit();

-- 更新日時を自動更新する関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 更新日時トリガー
DROP TRIGGER IF EXISTS update_comments_updated_at ON comments;
CREATE TRIGGER update_comments_updated_at
BEFORE UPDATE ON comments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) の設定
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- 誰でもコメントを投稿できる（INSERT）
CREATE POLICY "Anyone can insert comments"
ON comments FOR INSERT
TO authenticated, anon
WITH CHECK (true);

-- 承認済みコメントは誰でも閲覧可能（SELECT）
CREATE POLICY "Anyone can view approved comments"
ON comments FOR SELECT
TO authenticated, anon
USING (status = 'approved');
```

### 4-3. 実行ボタンをクリック
SQL Editorの右下にある「Run」ボタン（または `Ctrl+Enter` / `Cmd+Enter`）をクリック

### 4-4. 成功確認
「Success. No rows returned」と表示されれば成功です。

---

## ステップ5: 動作確認

### 5-1. テーブルの確認
1. 左サイドバーの「Table Editor」をクリック
2. 「comments」テーブルが表示されていることを確認

### 5-2. コメント機能のテスト
1. ブログの記事ページを開く
2. コメントフォームにテストコメントを入力して投稿
3. Supabaseダッシュボードの「Table Editor」→「comments」で、コメントが追加されているか確認
4. コメントの `status` が `pending` になっていることを確認

### 5-3. コメントの承認
1. Supabaseダッシュボードの「Table Editor」→「comments」を開く
2. 承認したいコメントの行をクリック
3. `status` の値を `pending` から `approved` に変更
4. 「Save」をクリック
5. ブログの記事ページをリロードして、コメントが表示されることを確認

---

## よくある質問（FAQ）

### Q: 環境変数が読み込まれない
**A:** 開発サーバーを再起動してください。`.env.local` の変更は、サーバー起動時に読み込まれます。

### Q: 「Table not found」エラーが出る
**A:** SQL Editorでテーブル作成のSQLが正しく実行されていない可能性があります。再度実行してください。

### Q: コメントが表示されない
**A:** 
1. Supabaseダッシュボードでコメントの `status` が `approved` になっているか確認
2. ブラウザのコンソールでエラーが出ていないか確認
3. 環境変数が正しく設定されているか確認

### Q: レート制限エラーが出る
**A:** 1時間に5件以上のコメントを投稿しようとするとエラーになります。1時間待ってから再度試してください。

### Q: RLS（Row Level Security）エラーが出る
**A:** SQL EditorでRLSポリシーが正しく作成されているか確認してください。上記のSQLを再度実行してください。

---

## トラブルシューティング

### エラー: "relation 'comments' does not exist"
→ SQL Editorでテーブル作成のSQLを実行してください。

### エラー: "permission denied for table comments"
→ RLSポリシーが正しく設定されていない可能性があります。SQL Editorでポリシー作成のSQLを再実行してください。

### エラー: "Rate limit exceeded"
→ 1時間に5件以上のコメントを投稿しようとしています。1時間待ってから再度試してください。

---

## 次のステップ（オプション）

### 自動承認にする場合
すべてのコメントを自動承認にするには、API Route（`app/api/comments/route.ts`）の以下の部分を変更：

```typescript
status: 'pending', // これを 'approved' に変更
```

### メール通知を追加する場合
- Resend API または SendGrid を使用
- Supabase Edge Functions で実装

詳細は `COMMENT_SETUP.md` を参照してください。

