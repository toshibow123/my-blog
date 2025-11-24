# Giscus（コメント機能）のセットアップ方法

## 1. GitHubリポジトリでGiscusを有効化

1. https://giscus.app/ にアクセス
2. 以下の情報を入力：
   - **Repository**: `toshibow123/my-blog`（または実際のリポジトリ名）
   - **Discussion category**: `Announcements` を選択（または新規作成）
3. 「Generate」ボタンをクリック
4. 表示された設定値をコピー

## 2. 環境変数の設定

`.env.local` に以下を追加：

```env
NEXT_PUBLIC_GISCUS_REPO=toshibow123/my-blog
NEXT_PUBLIC_GISCUS_REPO_ID=R_kgDOLhXXXXX
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_kwDOLhXXXXX
```

## 3. コンポーネントの更新

`app/posts/[slug]/page.tsx` のGiscusコンポーネントを環境変数から読み込むように更新：

```tsx
<Giscus
  repo={process.env.NEXT_PUBLIC_GISCUS_REPO || "toshibow123/my-blog"}
  repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID || ""}
  category={process.env.NEXT_PUBLIC_GISCUS_CATEGORY || "Announcements"}
  categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || ""}
  mapping="pathname"
  reactionsEnabled="1"
  emitMetadata="0"
  inputPosition="bottom"
  theme="dark"
  lang="ja"
/>
```

## 4. GitHubリポジトリの設定

1. リポジトリの「Settings」→「General」→「Features」
2. 「Discussions」を有効化
3. 「Announcements」カテゴリーを作成（または既存のカテゴリーを使用）

## 注意事項

- GiscusはGitHubアカウントでログインする必要があります
- コメントはGitHubのDiscussionとして保存されます
- スパム対策はGitHubが自動で行います

