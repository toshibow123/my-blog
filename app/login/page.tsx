import { notFound } from "next/navigation";

// ログインページは無効化されています
// 管理者ページが無効化されたため、ログイン機能も不要になりました
export default function AdminLoginPage() {
  notFound();
}
