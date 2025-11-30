import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getRelatedPosts, getAdjacentPosts, getReadingTime } from "@/lib/posts-markdown";
import Breadcrumb from "@/components/Breadcrumb";
import AnimatedCard from "@/components/AnimatedCard";
import HoverCard from "@/components/HoverCard";
import ShareButtons from "@/components/ShareButtons";
import TableOfContents from "@/components/TableOfContents";
import ReadingProgress from "@/components/ReadingProgress";
import CodeBlockEnhancer from "@/components/CodeBlockEnhancer";
import LikeButton from "@/components/LikeButton";
import Giscus from "@/components/Giscus";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "記事が見つかりません",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: ["トシぼう"],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || !post.content) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);
  const { prev, next } = getAdjacentPosts(slug);
  const readingTime = getReadingTime(post.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: "トシぼう",
      url: "https://www.toshiboh.com/about",
    },
    datePublished: post.date,
    dateModified: post.updated || post.date,
    publisher: {
      "@type": "Organization",
      name: "トシぼうのブログ",
      url: "https://www.toshiboh.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.toshiboh.com/posts/${post.slug}`,
    },
    image: post.hero_image ? `https://www.toshiboh.com${post.hero_image.startsWith("/") ? post.hero_image : `/images/${post.hero_image}`}` : undefined,
  };

  // JSON-LDのサニタイゼーション（XSS対策）
  const sanitizedJsonLd = JSON.stringify(jsonLd)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitizedJsonLd }}
      />
      <article className="container mx-auto px-4 py-8 max-w-4xl" itemScope itemType="https://schema.org/BlogPosting">
        {/* パンくずリスト */}
        <Breadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: post.category, href: `/category/${post.categorySlug}` },
            { label: post.title },
          ]}
        />
        
        <div className="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-700/50 backdrop-blur-sm">
        {/* ヘッダー */}
        <header className="mb-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span className="bg-slate-700 text-slate-200 px-5 py-2 rounded-full text-sm font-semibold border border-slate-600">
              {post.category}
            </span>
            <div className="flex items-center gap-4 text-sm text-gray-400 flex-wrap">
              <time dateTime={post.date} itemProp="datePublished">
                公開: {post.date}
              </time>
              {"updated" in post && post.updated && (
                <time dateTime={post.updated} itemProp="dateModified">
                  更新: {post.updated}
                </time>
              )}
              <span>読了時間: 約{readingTime}分</span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-title text-white mb-4" itemProp="headline">
            {post.title}
          </h1>
          
          {/* 先頭画像（見出し画像） */}
          {"hero_image" in post && post.hero_image && (() => {
            // ショートカット: /images/ で始まらず、http(s):// でもない場合は自動的に /images/ を付ける
            let heroImageUrl = post.hero_image;
            if (!heroImageUrl.startsWith("http://") && !heroImageUrl.startsWith("https://") && !heroImageUrl.startsWith("/")) {
              heroImageUrl = `/images/${heroImageUrl}`;
            }
            return (
              <div className="mb-6">
                <img
                  src={heroImageUrl}
                  alt={post.title}
                  className="w-full h-auto rounded-lg shadow-lg"
                  itemProp="image"
                />
              </div>
            );
          })()}
        </header>

        {/* タグ */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => {
              const tagSlug = tag.toLowerCase();
              return (
                <Link
                  key={tag}
                  href={`/tag/${tagSlug}`}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-full text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  prefetch={true}
                >
                  {tag}
                </Link>
              );
            })}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 relative">
          <div className="flex-1 min-w-0">
            {/* 目次（モバイルのみ） */}
            <div className="lg:hidden mb-8">
              <TableOfContents content={post.content} />
            </div>

            {/* コンテンツ */}
            <div className="prose prose-lg max-w-none prose-invert" itemProp="articleBody">
          <div className="text-gray-300 leading-relaxed">
            {(() => {
              // 文中画像の配列を取得
              const rawImages = ("images" in post && post.images && Array.isArray(post.images)) 
                ? post.images 
                : [];
              
              // ショートカット: /images/ で始まらず、http(s):// でもない場合は自動的に /images/ を付ける
              const images = rawImages.map((img) => {
                if (!img.startsWith("http://") && !img.startsWith("https://") && !img.startsWith("/")) {
                  return `/images/${img}`;
                }
                return img;
              });
              
              const lines = post.content.split("\n");
              const elements: React.ReactNode[] = [];
              let inCodeBlock = false;
              let codeBlockContent: string[] = [];
              let codeBlockLanguage = "";
              let listItems: string[] = [];
              let inList = false;
              let h2Index = 0;
              let h3Index = 0;
              
              for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                const lineIndex = i;
                
                // コードブロックの開始/終了
                if (line.startsWith("```")) {
                  if (inCodeBlock) {
                    // コードブロック終了
                    const codeContent = codeBlockContent.join("\n");
                    elements.push(
                      <pre key={`code-${lineIndex}`} className="bg-gray-900 p-4 rounded-lg overflow-x-auto my-4 border border-gray-700">
                        <code className="text-gray-300">{codeContent}</code>
                      </pre>
                    );
                    codeBlockContent = [];
                    inCodeBlock = false;
                    codeBlockLanguage = "";
                  } else {
                    // コードブロック開始
                    codeBlockLanguage = line.replace("```", "").trim();
                    inCodeBlock = true;
                  }
                  continue;
                }
                
                if (inCodeBlock) {
                  codeBlockContent.push(line);
                  continue;
                }
                
                // Markdown画像記法（![alt](url)）
                const markdownImageMatch = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
                if (markdownImageMatch) {
                  const alt = markdownImageMatch[1] || "画像";
                  let url = markdownImageMatch[2];
                  
                  // ショートカット: /images/ で始まらず、http(s):// でもない場合は自動的に /images/ を付ける
                  if (!url.startsWith("http://") && !url.startsWith("https://") && !url.startsWith("/")) {
                    url = `/images/${url}`;
                  } else if (!url.startsWith("http://") && !url.startsWith("https://") && url.startsWith("/") && !url.startsWith("/images/")) {
                    // / で始まるが /images/ で始まらない場合も /images/ を付ける（念のため）
                    // ただし、既に /images/ で始まる場合はそのまま
                  }
                  
                  elements.push(
                    <div key={lineIndex} className="my-6">
                      <img
                        src={url}
                        alt={alt}
                        className="w-full h-auto rounded-lg shadow-lg border border-gray-700"
                        loading="lazy"
                      />
                    </div>
                  );
                  continue;
                }
                
                // 画像プレースホルダー（[画像0], [画像1]など）
                const imageMatch = line.match(/\[画像(\d+)\]/);
                if (imageMatch) {
                  const imageIndex = parseInt(imageMatch[1], 10);
                  if (images[imageIndex]) {
                    elements.push(
                      <div key={lineIndex} className="my-6">
                        <img
                          src={images[imageIndex]}
                          alt={`画像 ${imageIndex + 1}`}
                          className="w-full h-auto rounded-lg shadow-lg border border-gray-700"
                          loading="lazy"
                        />
                      </div>
                    );
                  }
                  continue;
                }
                
                // 見出し
                if (line.startsWith("### ")) {
                  if (inList) {
                    elements.push(
                      <ul key={`list-${lineIndex}`} className="list-disc list-inside mb-4 space-y-2 text-gray-300">
                        {listItems.map((item, idx) => (
                          <li key={idx}>{item.replace(/^[-*]\s*/, "")}</li>
                        ))}
                      </ul>
                    );
                    listItems = [];
                    inList = false;
                  }
                  h3Index++;
                  const headingText = line.replace(/^###\s+/, "");
                  const headingId = `heading-${h2Index}-${h3Index}`;
                  elements.push(
                    <h3 
                      key={lineIndex} 
                      id={headingId}
                      className="text-xl font-bold mt-6 mb-3 text-white scroll-mt-20"
                    >
                      {headingText}
                    </h3>
                  );
                  continue;
                }
                
                if (line.startsWith("## ")) {
                  if (inList) {
                    elements.push(
                      <ul key={`list-${lineIndex}`} className="list-disc list-inside mb-4 space-y-2 text-gray-300">
                        {listItems.map((item, idx) => (
                          <li key={idx}>{item.replace(/^[-*]\s*/, "")}</li>
                        ))}
                      </ul>
                    );
                    listItems = [];
                    inList = false;
                  }
                  h2Index++;
                  h3Index = 0;
                  const headingText = line.replace(/^##\s+/, "");
                  const headingId = `heading-${h2Index}`;
                  elements.push(
                    <h2 
                      key={lineIndex} 
                      id={headingId}
                      className="text-2xl font-bold mt-8 mb-4 text-white scroll-mt-20"
                    >
                      {headingText}
                    </h2>
                  );
                  continue;
                }
                
                if (line.startsWith("# ")) {
                  if (inList) {
                    elements.push(
                      <ul key={`list-${lineIndex}`} className="list-disc list-inside mb-4 space-y-2 text-gray-300">
                        {listItems.map((item, idx) => (
                          <li key={idx}>{item.replace(/^[-*]\s*/, "")}</li>
                        ))}
                      </ul>
                    );
                    listItems = [];
                    inList = false;
                  }
                  elements.push(
                    <h1 key={lineIndex} className="text-3xl font-bold mt-8 mb-4 text-white">
                      {line.replace(/^#\s+/, "")}
                    </h1>
                  );
                  continue;
                }
                
                // リスト項目
                if (line.match(/^[-*]\s+/)) {
                  if (!inList) {
                    inList = true;
                  }
                  listItems.push(line);
                  continue;
                }
                
                // リスト終了
                if (inList && line.trim() === "") {
                  elements.push(
                    <ul key={`list-${lineIndex}`} className="list-disc list-inside mb-4 space-y-2 text-gray-300">
                      {listItems.map((item, idx) => (
                        <li key={idx}>{item.replace(/^[-*]\s*/, "")}</li>
                      ))}
                    </ul>
                  );
                  listItems = [];
                  inList = false;
                  continue;
                }
                
                // 空行
                if (line.trim() === "") {
                  if (inList) {
                    elements.push(
                      <ul key={`list-${lineIndex}`} className="list-disc list-inside mb-4 space-y-2 text-gray-300">
                        {listItems.map((item, idx) => (
                          <li key={idx}>{item.replace(/^[-*]\s*/, "")}</li>
                        ))}
                      </ul>
                    );
                    listItems = [];
                    inList = false;
                  }
                  elements.push(<br key={lineIndex} />);
                  continue;
                }
                
                // 通常のテキスト
                if (line.trim() && !inList) {
                  // シンプルなMarkdown記法の処理
                  let processedText = line;
                  
                  // 太字 **text** を処理
                  const boldRegex = /\*\*(.+?)\*\*/g;
                  const boldParts: (string | React.ReactNode)[] = [];
                  let lastIndex = 0;
                  let match;
                  
                  while ((match = boldRegex.exec(processedText)) !== null) {
                    if (match.index > lastIndex) {
                      boldParts.push(processedText.substring(lastIndex, match.index));
                    }
                    boldParts.push(<strong key={`bold-${lineIndex}-${match.index}`} className="font-bold text-white">{match[1]}</strong>);
                    lastIndex = match.index + match[0].length;
                  }
                  if (lastIndex < processedText.length) {
                    boldParts.push(processedText.substring(lastIndex));
                  }
                  
                  // インラインコード `code` を処理（太字の後）
                  const finalParts: (string | React.ReactNode)[] = [];
                  boldParts.forEach((part, partIndex) => {
                    if (typeof part === "string") {
                      const codeRegex = /`(.+?)`/g;
                      let codeLastIndex = 0;
                      let codeMatch;
                      
                      while ((codeMatch = codeRegex.exec(part)) !== null) {
                        if (codeMatch.index > codeLastIndex) {
                          finalParts.push(part.substring(codeLastIndex, codeMatch.index));
                        }
                        finalParts.push(<code key={`code-${lineIndex}-${partIndex}-${codeMatch.index}`} className="bg-gray-900 px-2 py-1 rounded text-slate-300 font-mono text-sm">{codeMatch[1]}</code>);
                        codeLastIndex = codeMatch.index + codeMatch[0].length;
                      }
                      if (codeLastIndex < part.length) {
                        finalParts.push(part.substring(codeLastIndex));
                      }
                    } else {
                      finalParts.push(part);
                    }
                  });
                  
                  elements.push(
                    <p key={lineIndex} className="mb-4 text-gray-300">
                      {finalParts.length > 0 ? finalParts : line}
                    </p>
                  );
                }
              }
              
              // 最後にリストが残っている場合
              if (inList && listItems.length > 0) {
                elements.push(
                  <ul key="list-final" className="list-disc list-inside mb-4 space-y-2 text-gray-300">
                    {listItems.map((item, idx) => (
                      <li key={idx}>{item.replace(/^[-*]\s*/, "")}</li>
                    ))}
                  </ul>
                );
              }
              
              return elements;
            })()}
          </div>
        </div>
      </div>
      
      {/* サイドバー（目次・PCのみ） */}
      <aside className="hidden lg:block w-72 flex-shrink-0">
        <div className="sticky top-24">
          <TableOfContents content={post.content} />
        </div>
      </aside>
    </div>

        {/* いいねボタン */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <LikeButton slug={post.slug} title={post.title} />
        </div>

        {/* SNSシェアボタン */}
        <ShareButtons title={post.title} excerpt={post.excerpt} slug={post.slug} />

        {/* 前後の記事ナビゲーション */}
        {(prev || next) && (
          <div className="mt-8 pt-8 border-t border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prev && (
                <Link
                  href={`/posts/${prev.slug}`}
                  className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors border border-gray-600 hover:border-yellow-400"
                  prefetch={true}
                >
                  <div className="text-sm text-gray-400 mb-2">← 前の記事</div>
                  <div className="font-semibold text-white">{prev.title}</div>
                </Link>
              )}
              {next && (
                <Link
                  href={`/posts/${next.slug}`}
                  className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors border border-gray-600 hover:border-yellow-400 md:text-right"
                  prefetch={true}
                >
                  <div className="text-sm text-gray-400 mb-2">次の記事 →</div>
                  <div className="font-semibold text-white">{next.title}</div>
                </Link>
              )}
            </div>
          </div>
        )}

        {/* 関連記事 */}
        {relatedPosts.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-700">
            <h3 className="text-2xl font-title mb-6 text-white">関連記事</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <AnimatedCard key={relatedPost.slug} delay={index * 0.1}>
                  <HoverCard className="bg-gradient-to-br from-gray-700/90 to-gray-800/90 rounded-xl shadow-xl overflow-hidden h-full border border-gray-600/50 backdrop-blur-sm hover:border-yellow-400/30 transition-all duration-300">
                    <Link
                      href={`/posts/${relatedPost.slug}`}
                      className="block p-4 h-full"
                      prefetch={true}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 text-gray-900 px-2.5 py-1 rounded-full text-xs font-bold shadow-lg shadow-yellow-500/30">
                          {relatedPost.category}
                        </span>
                        <span className="text-gray-400 text-xs font-medium">{relatedPost.date}</span>
                      </div>
                      <h4 className="font-title text-white mb-2 line-clamp-2 leading-tight">
                        {relatedPost.title}
                      </h4>
                      <p className="text-gray-300 text-sm line-clamp-2 leading-relaxed">{relatedPost.excerpt}</p>
                    </Link>
                  </HoverCard>
                </AnimatedCard>
              ))}
            </div>
          </div>
        )}

        {/* コメント機能（Giscus） */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <h3 className="text-2xl font-title mb-6 text-white">コメント</h3>
          <Giscus />
        </div>

        {/* フッター */}
        <footer className="mt-8 pt-6 border-t border-gray-700">
          <Link
            href="/"
            className="text-slate-300 hover:text-slate-200 font-semibold inline-flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 rounded"
            prefetch={true}
            aria-label="ホームページに戻る"
          >
            ← ホームに戻る
          </Link>
        </footer>
        </div>
      </article>
    </>
  );
}

