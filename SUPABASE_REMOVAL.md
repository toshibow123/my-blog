# Supabase連携の削除について

## 概要

このブログは、セキュリティとシンプルさを重視し、**完全にMarkdownベースの静的生成方式**に移行しました。

Supabaseへの依存を削除することで：
- ✅ **セキュリティ向上**: 外部サービスへの依存を削減
- ✅ **コスト削減**: 無料プランの制限を回避
- ✅ **シンプルな運用**: Markdownファイルのみで管理
- ✅ **高速化**: 静的生成による最適なパフォーマンス

## 削除・無効化した機能

### 1. 管理者ページ
- `/admin` 配下のすべてのページを無効化（404を返す）
- 認証機能も不要になったため削除

### 2. 画像アップロード機能
- Supabase Storageへの画像アップロード機能を無効化
- 画像は `public/images/` ディレクトリに直接配置する方式に変更

### 3. 認証機能
- ログインページ (`/login`) を無効化
- OAuthコールバック (`/auth/callback`) を無効化

## 残しているもの

### 1. エクスポートスクリプト
- `scripts/export-to-markdown.ts` - 既に実行済み、将来の移行用に残しています
- 実行するには環境変数が必要ですが、通常の運用では不要です

### 2. 型定義
- `lib/supabase.ts` の型定義（`Post`, `Category`など）は、他の場所で使用されている可能性があるため残しています

### 3. ドキュメント
- Supabase関連のドキュメントファイルは、参考として残しています

## 現在の運用方法

### 記事の作成・編集
1. `content/posts/` ディレクトリに `.md` ファイルを作成・編集
2. Front Matterに記事のメタデータを記入
3. Markdown形式で本文を書く
4. Gitでコミット・プッシュ
5. Vercelなどのホスティングサービスが自動デプロイ

### 画像の追加
1. 画像ファイルを `public/images/` ディレクトリに配置
2. MarkdownファイルのFront Matterに画像URLを記入
3. 本文中で `[画像0]`, `[画像1]` の形式で参照

詳細は `MARKDOWN_GUIDE.md` を参照してください。

## 環境変数の削除（オプション）

Supabaseを使わなくなったため、以下の環境変数は不要になりました：

```bash
# 以下は削除しても問題ありません
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ALLOWED_ADMIN_EMAILS=
```

ただし、`scripts/export-to-markdown.ts` を実行する場合は必要です。

## パッケージの削除（オプション）

`@supabase/supabase-js` パッケージは、エクスポートスクリプトで使用しているため、完全に削除する場合は：

```bash
# エクスポートスクリプトを削除する場合
rm scripts/export-to-markdown.ts
rm scripts/migrate-posts.ts

# パッケージを削除
npm uninstall @supabase/supabase-js
```

ただし、将来Supabaseに戻す可能性がある場合は、パッケージを残しておくことをおすすめします。

