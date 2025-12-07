import { getTodayLearningPosts } from "@/lib/posts-markdown";
import LearningClient from "./LearningClient";

export const metadata = {
  title: "今日の学び | トシぼうのブログ",
  description: "開発現場で学んだことを記録するアーカイブページです。",
};

export default function LearningPage() {
  const posts = getTodayLearningPosts();

  return <LearningClient posts={posts} />;
}
