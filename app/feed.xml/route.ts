import { getPublishedPosts } from "@/lib/posts-markdown";

export async function GET() {
  const baseUrl = "https://www.toshiboh.com";
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
        const pubDate = new Date().toUTCString(); // 日付パースは簡略化
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

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

