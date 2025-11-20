/**
 * 既存の記事データをSupabaseに移行するスクリプト
 * 
 * 使用方法:
 *   npm run migrate:posts
 * 
 * または:
 *   npx tsx scripts/migrate-posts.ts
 */

// 環境変数を読み込む（最初に実行する必要がある）
import dotenv from "dotenv";
import { resolve } from "path";

// .env.localファイルを読み込む
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

// 環境変数が読み込まれた後にインポート
import { allPosts } from "../lib/posts";
import { createClient } from "@supabase/supabase-js";

// 移行スクリプト用のSupabaseクライアントを作成
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error("❌ エラー: 環境変数が設定されていません。");
  console.error("   .env.localファイルに以下が設定されているか確認してください：");
  console.error("   - NEXT_PUBLIC_SUPABASE_URL");
  console.error("   - SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

interface LocalPost {
  id: number;
  title: string;
  date: string;
  category: string;
  categorySlug: string;
  tags: string[];
  excerpt: string;
  slug: string;
  content?: string;
}

async function migratePosts() {
  console.log("🚀 記事の移行を開始します...\n");

  if (!supabaseAdmin) {
    console.error("❌ エラー: Supabaseが設定されていません。");
    console.error("   .env.localファイルに環境変数が設定されているか確認してください。");
    process.exit(1);
  }

  // 既存の記事を確認
  const { data: existingPosts, error: fetchError } = await supabaseAdmin
    .from("posts")
    .select("slug");

  if (fetchError) {
    console.error("❌ エラー: 既存の記事を取得できませんでした:", fetchError.message);
    process.exit(1);
  }

  const existingSlugs = new Set(existingPosts?.map((p) => p.slug) || []);
  console.log(`📊 既存の記事数: ${existingSlugs.size}\n`);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  // 各記事を移行
  for (const post of allPosts as LocalPost[]) {
    // 既に存在する場合はスキップ
    if (existingSlugs.has(post.slug)) {
      console.log(`⏭️  スキップ: "${post.title}" (既に存在します)`);
      skipCount++;
      continue;
    }

    try {
      // Supabaseの形式に変換
      const supabasePost = {
        title: post.title,
        slug: post.slug,
        date: post.date,
        category: post.category,
        category_slug: post.categorySlug,
        tags: post.tags || [],
        excerpt: post.excerpt,
        content: post.content || "",
      };

      const { data, error } = await supabaseAdmin
        .from("posts")
        .insert(supabasePost)
        .select()
        .single();

      if (error) {
        console.error(`❌ エラー: "${post.title}" の移行に失敗しました:`, error.message);
        errorCount++;
      } else {
        console.log(`✅ 移行成功: "${post.title}"`);
        successCount++;
      }
    } catch (error) {
      console.error(`❌ エラー: "${post.title}" の移行中に例外が発生しました:`, error);
      errorCount++;
    }
  }

  // 結果を表示
  console.log("\n" + "=".repeat(50));
  console.log("📊 移行結果");
  console.log("=".repeat(50));
  console.log(`✅ 成功: ${successCount}件`);
  console.log(`⏭️  スキップ: ${skipCount}件`);
  console.log(`❌ エラー: ${errorCount}件`);
  console.log(`📝 合計: ${allPosts.length}件`);
  console.log("=".repeat(50) + "\n");

  if (errorCount > 0) {
    console.error("⚠️  一部の記事の移行に失敗しました。");
    process.exit(1);
  } else {
    console.log("🎉 すべての記事の移行が完了しました！");
  }
}

// スクリプトを実行
migratePosts().catch((error) => {
  console.error("❌ 予期しないエラーが発生しました:", error);
  process.exit(1);
});

