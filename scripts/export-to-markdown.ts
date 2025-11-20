/**
 * Supabaseの記事データをMarkdownファイルにエクスポートするスクリプト
 * 
 * 使用方法:
 * npm run export:markdown
 */

import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";

// .env.localを先に読み込む（supabase.tsをインポートする前に）
dotenv.config({ path: path.join(process.cwd(), ".env.local") });

import { createClient } from "@supabase/supabase-js";
import type { Post } from "../lib/supabase";

// Supabaseクライアントを直接作成（環境変数が読み込まれた後）
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Supabase環境変数が設定されていません。");
  console.error("NEXT_PUBLIC_SUPABASE_URL と SUPABASE_SERVICE_ROLE_KEY を .env.local に設定してください。");
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

const postsDirectory = path.join(process.cwd(), "content/posts");

async function exportPostsToMarkdown() {
  console.log("🚀 SupabaseからMarkdownファイルへのエクスポートを開始します...\n");

  // content/postsディレクトリを作成
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
    console.log("📁 content/posts ディレクトリを作成しました\n");
  }

  // Supabaseから全記事を取得
  const { data: posts, error } = await supabaseAdmin
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ 記事の取得に失敗しました:", error);
    process.exit(1);
  }

  if (!posts || posts.length === 0) {
    console.log("⚠️  エクスポートする記事がありません。");
    return;
  }

  console.log(`📊 取得した記事数: ${posts.length}\n`);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const post of posts) {
    try {
      const filePath = path.join(postsDirectory, `${post.slug}.md`);

      // 既にファイルが存在する場合はスキップ（上書きを防ぐ）
      if (fs.existsSync(filePath)) {
        console.log(`⏭️  スキップ: "${post.title}" (既にファイルが存在します)`);
        skipCount++;
        continue;
      }

      // Front Matterを作成
      const frontMatter: Record<string, any> = {
        title: post.title,
        date: post.date || "",
        category: post.category || "",
        categorySlug: post.category_slug || "",
        tags: post.tags || [],
        excerpt: post.excerpt || "",
        slug: post.slug,
      };

      // オプションフィールドを追加
      if (post.hero_image) {
        frontMatter.hero_image = post.hero_image;
      }
      if (post.images && Array.isArray(post.images) && post.images.length > 0) {
        frontMatter.images = post.images;
      }
      if (post.published !== undefined) {
        frontMatter.published = post.published;
      }

      // Front Matterを文字列化
      const frontMatterString = JSON.stringify(frontMatter, null, 2);

      // Markdownファイルの内容を作成
      let markdownContent = `---\n${frontMatterString}\n---\n\n`;

      // ヒーロー画像がある場合は先頭に追加
      if (post.hero_image) {
        markdownContent += `![${post.title}](${post.hero_image})\n\n`;
      }

      // 本文を追加
      let content = post.content || "";

      // 画像プレースホルダー（[画像0], [画像1]など）を処理
      if (post.images && Array.isArray(post.images)) {
        post.images.forEach((imageUrl, index) => {
          // [画像N] の形式で既に存在する場合はそのまま、存在しない場合は追加
          const placeholder = `[画像${index}]`;
          if (!content.includes(placeholder)) {
            // 適切な位置に画像を挿入（本文の最後に追加）
            content += `\n\n${placeholder}\n`;
          }
        });
      }

      markdownContent += content;

      // ファイルに書き込み
      fs.writeFileSync(filePath, markdownContent, "utf8");
      console.log(`✅ エクスポート: "${post.title}" -> ${post.slug}.md`);
      successCount++;
    } catch (err) {
      console.error(`❌ エラー: "${post.title}"`, err);
      errorCount++;
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log("📊 エクスポート結果");
  console.log("=".repeat(50));
  console.log(`✅ 成功: ${successCount}件`);
  console.log(`⏭️  スキップ: ${skipCount}件`);
  console.log(`❌ エラー: ${errorCount}件`);
  console.log(`📝 合計: ${posts.length}件`);
  console.log("=".repeat(50));
  console.log("🎉 エクスポートが完了しました！");
  console.log(`\n📁 ファイルは ${postsDirectory} に保存されました。`);
}

exportPostsToMarkdown().catch((error) => {
  console.error("❌ 予期しないエラー:", error);
  process.exit(1);
});

