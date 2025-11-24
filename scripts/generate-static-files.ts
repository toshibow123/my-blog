import fs from "fs";
import path from "path";
import { getPublishedPosts, getAllCategories, getAllTags } from "../lib/posts-markdown";

const baseUrl = "https://www.toshiboh.com";
const publicDir = path.join(process.cwd(), "public");

// sitemap.xmlを生成
function generateSitemap() {
  const currentDate = new Date().toISOString();

  // 基本ページ
  const routes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tags`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/archive`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // 記事ページ
  const posts = getPublishedPosts();
  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // カテゴリーページ
  const categories = getAllCategories();
  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // タグページ
  const tags = getAllTags();
  const tagRoutes = tags.map((tag) => ({
    url: `${baseUrl}/tag/${tag.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // XMLサイトマップの生成
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...routes, ...postRoutes, ...categoryRoutes, ...tagRoutes]
  .map(
    (item) => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastModified}</lastmod>
    <changefreq>${item.changeFrequency}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap, "utf-8");
  console.log("✅ sitemap.xml を生成しました");
}

// feed.xml (RSS)を生成
function generateFeed() {
  const posts = getPublishedPosts().slice(0, 20); // 最新20件

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>トシぼうのブログ</title>
    <link>${baseUrl}</link>
    <description>節約しながらもマッチョをあきらめず、AIや資産形成も大好き。アラフォーで北海道に移住したトシぼうのブログです。</description>
    <language>ja</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .map((post) => {
        const pubDate = new Date().toUTCString();
        const postUrl = `${baseUrl}/posts/${post.slug}`;
        const description = post.excerpt || "";

        return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <category><![CDATA[${post.category}]]></category>
    </item>`;
      })
      .join("\n")}
  </channel>
</rss>`;

  fs.writeFileSync(path.join(publicDir, "feed.xml"), rss, "utf-8");
  console.log("✅ feed.xml を生成しました");
}

// .htaccessファイルを生成（Next.jsのルーティング用）
function generateHtaccess() {
  const htaccess = `# Next.js静的エクスポート用のリダイレクト設定
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # 既存のファイルやディレクトリはそのまま
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d

  # .html拡張子を削除してリダイレクト
  RewriteCond %{REQUEST_FILENAME}.html -f
  RewriteRule ^(.*)$ $1.html [L]

  # 末尾スラッシュを削除
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)/$ /$1 [R=301,L]
</IfModule>

# セキュリティヘッダー
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>`;

  fs.writeFileSync(path.join(publicDir, ".htaccess"), htaccess, "utf-8");
  console.log("✅ .htaccess を生成しました");
}

// メイン処理
function main() {
  console.log("📝 静的ファイルを生成中...");
  generateSitemap();
  generateFeed();
  generateHtaccess();
  console.log("✨ 完了しました！");
}

main();

