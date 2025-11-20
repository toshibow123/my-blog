# ⚠️ 緊急：APIキーのセキュリティ対策

## 🚨 重要：提供されたAPIキーは無効化してください

チャットでAPIキーを共有してしまった場合、**すぐにSupabaseでキーを無効化して再生成**してください。

## 1. Supabaseでキーを無効化・再生成

1. Supabaseダッシュボードにログイン
2. 「Settings」→「API」に移動
3. 「Reset API keys」をクリック
4. 新しいキーを生成

**⚠️ 古いキーは完全に無効化されます**

## 2. 正しい環境変数の設定

`.env.local` ファイルをプロジェクトルートに作成：

```bash
# Supabase設定
# ⚠️ このファイルは絶対にGitにコミットしないでください！

# プロジェクトURL（PUBLIC - 公開しても安全）
NEXT_PUBLIC_SUPABASE_URL=https://pmyalmtplwbzxlpffcmf.supabase.co

# 匿名キー（PUBLIC - 公開しても安全、ただしRLSで保護）
NEXT_PUBLIC_SUPABASE_ANON_KEY=新しいanonキーをここに

# サービスロールキー（SECRET - 絶対に公開しない！）
# このキーは管理者操作用で、サーバーサイドのみで使用
SUPABASE_SERVICE_ROLE_KEY=新しいservice_roleキーをここに
```

## 3. .env.localファイルの確認

```bash
# .env.localが.gitignoreに含まれているか確認
cat .gitignore | grep .env

# .env.localがGitに追跡されていないか確認
git ls-files | grep .env
```

## 4. Git履歴の確認

もし誤ってAPIキーをコミットしてしまった場合：

```bash
# Git履歴を確認
git log --all --full-history --source -- "*env*"

# もしコミットされていたら、履歴から削除する必要があります
# （詳細は後述）
```

## 5. セキュリティチェックリスト

- [ ] Supabaseで古いキーを無効化
- [ ] 新しいキーを生成
- [ ] `.env.local` ファイルを作成（プロジェクトルートに）
- [ ] `.env.local` が `.gitignore` に含まれていることを確認
- [ ] `.env.local` がGitに追跡されていないことを確認
- [ ] コード内にAPIキーがハードコードされていないことを確認
- [ ] 開発サーバーを再起動（環境変数を読み込むため）

## 6. キーの種類の説明

### PUBLIC（公開しても安全）
- `NEXT_PUBLIC_SUPABASE_URL`: プロジェクトURL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: 匿名キー
  - Row Level Security (RLS) で保護されているため、公開しても安全
  - ただし、RLSポリシーが正しく設定されていることが前提

### SECRET（絶対に公開しない）
- `SUPABASE_SERVICE_ROLE_KEY`: サービスロールキー
  - **このキーは管理者権限を持ちます**
  - データベースの全操作が可能
  - **絶対に公開しないでください**
  - サーバーサイドのみで使用

## 7. もしGitにコミットしてしまった場合

```bash
# 1. まず、Supabaseでキーを無効化・再生成

# 2. Git履歴から削除（危険な操作なので注意）
# この操作は履歴を書き換えるため、チームで共有している場合は注意が必要
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env.local" \
  --prune-empty --tag-name-filter cat -- --all

# 3. リモートに強制プッシュ（注意：他のメンバーに影響）
# git push origin --force --all
```

## 8. 今後の対策

1. **環境変数は絶対にコードに書かない**
2. **`.env.local` は必ず `.gitignore` に含める**
3. **コミット前に `git status` で確認**
4. **APIキーを共有する場合は、DMや暗号化された方法を使用**

## 参考リンク

- [Supabase セキュリティガイド](https://supabase.com/docs/guides/platform/security)
- [環境変数の管理](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

