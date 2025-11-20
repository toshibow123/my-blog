import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export interface PostFrontMatter {
  title: string;
  date: string;
  category: string;
  categorySlug: string;
  tags: string[];
  excerpt: string;
  slug: string;
  hero_image?: string;
  images?: string[];
  published?: boolean;
  updated?: string; // 最終更新日（オプション）
}

export interface Post extends PostFrontMatter {
  content: string;
  contentHtml?: string;
}

const postsDirectory = path.join(process.cwd(), "content/posts");

// 全記事を取得（新しい順）
export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      return getPostBySlug(slug);
    })
    .filter((post): post is Post => post !== null);

  // 日付でソート（新しい順）
  const parseJapaneseDate = (dateStr: string): number => {
    const match = dateStr.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
    if (match) {
      const year = parseInt(match[1], 10);
      const month = parseInt(match[2], 10) - 1;
      const day = parseInt(match[3], 10);
      return new Date(year, month, day).getTime();
    }
    return 0;
  };

  return allPostsData.sort((a, b) => {
    const dateA = parseJapaneseDate(a.date || "");
    const dateB = parseJapaneseDate(b.date || "");
    return dateB - dateA; // 降順（新しい順）
  });
}

// スラッグで記事を取得
export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // slugがFront Matterにない場合は、ファイル名から生成
  const postSlug = (data as any).slug || slug;

  return {
    ...(data as PostFrontMatter),
    slug: postSlug,
    content,
  };
}

// 公開済みの記事のみ取得
export function getPublishedPosts(): Post[] {
  return getAllPosts().filter((post) => post.published !== false);
}

// カテゴリーで記事を取得
export function getPostsByCategory(categorySlug: string): Post[] {
  return getPublishedPosts().filter(
    (post) => post.categorySlug === categorySlug
  );
}

// タグで記事を取得
export function getPostsByTag(tagSlug: string): Post[] {
  return getPublishedPosts().filter((post) =>
    post.tags.some((tag) => tag.toLowerCase() === tagSlug.toLowerCase())
  );
}

// 関連記事を取得
export function getRelatedPosts(slug: string, limit: number = 3): Post[] {
  const post = getPostBySlug(slug);
  if (!post) return [];

  const allPosts = getPublishedPosts().filter((p) => p.slug !== slug);

  // 同じカテゴリーまたは同じタグを持つ記事を優先
  const related = allPosts
    .map((p) => {
      let score = 0;
      if (p.categorySlug === post.categorySlug) score += 2;
      const commonTags = p.tags.filter((tag) =>
        post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
      );
      score += commonTags.length;
      return { post: p, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);

  return related;
}

// 前後の記事を取得
export function getAdjacentPosts(slug: string): {
  prev: Post | null;
  next: Post | null;
} {
  const allPosts = getPublishedPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
    next: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
  };
}

// 読了時間を計算（分）
export function getReadingTime(content: string): number {
  const wordsPerMinute = 200; // 日本語は1分200文字程度
  const textLength = content.replace(/\s/g, "").length;
  return Math.ceil(textLength / wordsPerMinute);
}

// 全タグを取得（重複なし）
export function getAllTags(): Array<{ name: string; slug: string; count: number }> {
  const posts = getPublishedPosts();
  const tagMap = new Map<string, number>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      const slug = tag.toLowerCase();
      tagMap.set(slug, (tagMap.get(slug) || 0) + 1);
    });
  });

  return Array.from(tagMap.entries())
    .map(([slug, count]) => {
      // 最初に見つかった記事のタグ名を使用
      const post = posts.find((p) =>
        p.tags.some((t) => t.toLowerCase() === slug)
      );
      const name = post?.tags.find((t) => t.toLowerCase() === slug) || slug;
      return { name, slug, count };
    })
    .sort((a, b) => b.count - a.count);
}

// 全カテゴリーを取得
export function getAllCategories(): Array<{ name: string; slug: string; count: number }> {
  const posts = getPublishedPosts();
  const categoryMap = new Map<string, number>();

  posts.forEach((post) => {
    const slug = post.categorySlug;
    categoryMap.set(slug, (categoryMap.get(slug) || 0) + 1);
  });

  return Array.from(categoryMap.entries())
    .map(([slug, count]) => {
      const post = posts.find((p) => p.categorySlug === slug);
      const name = post?.category || slug;
      return { name, slug, count };
    })
    .sort((a, b) => a.name.localeCompare(b.name, "ja"));
}

