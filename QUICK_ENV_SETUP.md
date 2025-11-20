# クイック環境変数設定ガイド

## 📍 Project URLの確認方法

Project URLは **Settings → General** または **Settings → API** のページに表示されています。

### 手順

1. 左側のサイドバーで **Settings** をクリック
2. **「General」** をクリック
3. **「Project URL」** という項目を探す
   - または **「API」** をクリックして、ページ上部の **「Project URL」** を確認

### 表示されるURLの形式

Project URLは以下のような形式です：
- `https://pmyalmtplwbzxlpffcmf.supabase.co`
- `https://pmyalmtplwbzxlpffcmf.supabase.io`
- その他の形式（Supabaseのバージョンによって異なる場合があります）

**⚠️ 重要**: 表示されているURLをそのままコピーしてください。`.co`で終わらなくても問題ありません。

## 📝 .env.localファイルの内容

プロジェクトルート（`package.json` がある場所）に `.env.local` ファイルを作成して、以下を入力：

```bash
# Supabase設定
# ⚠️ このファイルは絶対にGitにコミットしないでください！

# プロジェクトURL（Settings → General または API で確認）
NEXT_PUBLIC_SUPABASE_URL=ここに実際のProject URLを貼り付け

# 匿名キー（API Keysページで確認）
NEXT_PUBLIC_SUPABASE_ANON_KEY=ここにanon publicキーを貼り付け

# サービスロールキー（API Keysページで「Reveal」ボタンで表示）
SUPABASE_SERVICE_ROLE_KEY=ここにservice_roleキーを貼り付け
```

## ✅ 確認事項

1. **Settings → General** または **Settings → API** で **Project URL** を確認
2. **Settings → API Keys** で **anon public** キーを確認
3. **Settings → API Keys** で **service_role** キーを確認（「Reveal」ボタンで表示）
4. `.env.local` ファイルを作成
5. 3つの値を貼り付け
6. ファイルを保存
7. 開発サーバーを再起動（`npm run dev`）
