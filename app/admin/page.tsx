import { notFound } from "next/navigation";

// 管理者ページは無効化されています
// セキュリティを重視し、Markdown + GitHubスタイルの運用に切り替えました
// 記事の作成・編集は、content/posts/ ディレクトリ内のMarkdownファイルを編集してください
export default function AdminDashboard() {
  notFound();
}
