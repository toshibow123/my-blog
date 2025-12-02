# コメント機能セットアップガイド

## 1. Supabaseプロジェクトの作成

1. https://supabase.com にアクセスしてアカウントを作成
2. 新しいプロジェクトを作成
3. プロジェクトの「Settings」→「API」から以下を取得：
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`（オプション、API Routeで使用）

## 2. 環境変数の設定

`.env.local` ファイルに以下を追加：

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key  # オプション（API Routeで使用）
```

## 3. データベーステーブルの作成

Supabaseのダッシュボードで「SQL Editor」を開き、`supabase-schema.sql` の内容を実行してください。

または、Supabase CLIを使用している場合：

```bash
supabase db push
```

## 4. 機能の確認

### 実装済み機能

✅ **基本的なコメント投稿・表示**
- コメントフォーム
- 承認済みコメントの一覧表示

✅ **レート制限**
- IPアドレスベースで1時間に5件まで
- データベース側でも制限（二重チェック）

✅ **スパム検出**
- URL検出（自動的に承認待ち）
- スパムキーワード検出
- 文字数制限（3文字以上1000文字以内）

✅ **承認制（モデレーション）**
- コメントは自動的に「承認待ち」状態
- Supabaseダッシュボードから直接承認・却下が可能

## 5. コメントの承認方法

管理画面は実装していません。コメントを承認するには、Supabaseダッシュボードを使用します：

1. Supabaseダッシュボードにログイン
2. 「Table Editor」→「comments」テーブルを開く
3. 承認したいコメントの `status` を `pending` から `approved` に変更
4. スパムと判定されたコメントは `spam` のまま、または削除

または、SQL Editorで一括承認：

```sql
-- すべての承認待ちコメントを承認
UPDATE comments SET status = 'approved' WHERE status = 'pending';

-- 特定の記事のコメントを承認
UPDATE comments SET status = 'approved' WHERE post_slug = 'your-post-slug' AND status = 'pending';
```

## 6. 今後の拡張（オプション）

### reCAPTCHA v3
```bash
npm install react-google-recaptcha-v3
```

### メール通知
- Resend API または SendGrid を使用
- Supabase Edge Functions で実装

### リアルタイム更新
- Supabase Realtime を使用
- コメントが追加されたら自動更新

## トラブルシューティング

### コメントが表示されない
- SupabaseのRLSポリシーを確認
- コメントの `status` が `approved` になっているか確認

### レート制限エラーが出る
- 1時間待ってから再度試す
- データベース側の制限も確認

### コメントを承認する方法
- Supabaseダッシュボードの「Table Editor」から直接編集
- または、SQL Editorで一括更新

