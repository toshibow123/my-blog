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
import CommentsSection from "@/components/CommentsSection";

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
      {/* クライアントサイドでのコードブロック拡張機能（コピーボタン、ハイライト）を有効化 */}
      <CodeBlockEnhancer />
      
      <article className="container mx-auto px-4 py-8 max-w-4xl" itemScope itemType="https://schema.org/BlogPosting">
        {/* パンくずリスト */}
        <Breadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: post.category, href: `/category/${post.categorySlug}` },
            { label: post.title },
          ]}
        />
        
        <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-black rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-800/50 backdrop-blur-sm">
        {/* ヘッダー */}
        <header className="mb-10 border-b border-gray-800 pb-8">
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="bg-blue-900/30 text-blue-200 px-4 py-1.5 rounded-full text-xs font-bold border border-blue-800/50 uppercase tracking-wider">
              {post.category}
            </span>
            <div className="flex items-center gap-4 text-sm text-gray-400 font-mono">
              <time dateTime={post.date} itemProp="datePublished" className="flex items-center gap-1">
                📅 {post.date}
              </time>
              {/* 推定読了時間 */}
              <span className="flex items-center gap-1 text-gray-300 bg-gray-800 px-2 py-0.5 rounded">
                ⏱️ 読了時間: 約{readingTime}分
              </span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight" itemProp="headline">
            {post.title}
          </h1>
          
          {/* 先頭画像（見出し画像） */}
          {"hero_image" in post && post.hero_image && (() => {
            let heroImageUrl = post.hero_image;
            if (!heroImageUrl.startsWith("http://") && !heroImageUrl.startsWith("https://") && !heroImageUrl.startsWith("/")) {
              heroImageUrl = `/images/${heroImageUrl}`;
            }
            return (
              <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
                <img
                  src={heroImageUrl}
                  alt={post.title}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                  itemProp="image"
                />
              </div>
            );
          })()}
        </header>

        {/* タグ */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => {
              const tagSlug = tag.toLowerCase();
              return (
                <Link
                  key={tag}
                  href={`/tag/${tagSlug}`}
                  className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1 rounded-lg text-xs font-medium transition-colors border border-gray-700 hover:border-gray-600"
                  prefetch={true}
                >
                  #{tag}
                </Link>
              );
            })}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-12 relative">
          <div className="flex-1 min-w-0">
            {/* 目次（モバイルのみ） */}
            <div className="lg:hidden mb-8">
              <TableOfContents content={post.content} />
            </div>

            {/* コンテンツ */}
            <div className="prose prose-lg prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:text-gray-300 prose-p:leading-8 prose-a:text-blue-400 prose-img:rounded-xl prose-pre:bg-[#1d1f21]" itemProp="articleBody">
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
                    // Prism.js用のクラスを付与 (language-xxx)
                    const langClass = codeBlockLanguage ? `language-${codeBlockLanguage}` : "language-text";
                    
                    elements.push(
                      <pre key={`code-${lineIndex}`} className={`p-4 rounded-lg overflow-x-auto my-6 border border-gray-700 shadow-lg bg-[#1d1f21] ${langClass}`}>
                        <code className={`text-sm font-mono ${langClass}`}>{codeContent}</code>
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
                  
                  if (!url.startsWith("http://") && !url.startsWith("https://") && !url.startsWith("/")) {
                    url = `/images/${url}`;
                  } else if (!url.startsWith("http://") && !url.startsWith("https://") && url.startsWith("/") && !url.startsWith("/images/")) {
                  }
                  
                  // Hokkai4.jpg の場合は小さく表示
                  const isSmallImage = url.includes("Hokkai4");
                  elements.push(
                    <div key={lineIndex} className={`my-8 ${isSmallImage ? "flex justify-center" : ""}`}>
                      <img
                        src={url}
                        alt={alt}
                        className={`${isSmallImage ? "w-48 h-auto" : "w-full h-auto"} rounded-xl shadow-2xl border border-gray-700/50`}
                        loading="lazy"
                      />
                      {alt !== "画像" && !isSmallImage && <p className="text-center text-sm text-gray-500 mt-2">{alt}</p>}
                    </div>
                  );
                  continue;
                }
                
                // 画像プレースホルダー
                const imageMatch = line.match(/\[画像(\d+)\]/);
                if (imageMatch) {
                  const imageIndex = parseInt(imageMatch[1], 10);
                  if (images[imageIndex]) {
                    elements.push(
                      <div key={lineIndex} className="my-8">
                        <img
                          src={images[imageIndex]}
                          alt={`画像 ${imageIndex + 1}`}
                          className="w-full h-auto rounded-xl shadow-2xl border border-gray-700/50"
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
                      <ul key={`list-${lineIndex}`} className="list-disc list-inside mb-6 space-y-2 text-gray-300 pl-4 marker:text-blue-500">
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
                      className="text-xl font-bold mt-8 mb-4 text-white scroll-mt-24 flex items-center gap-2"
                    >
                      <span className="text-blue-500 text-sm">#</span> {headingText}
                    </h3>
                  );
                  continue;
                }
                
                if (line.startsWith("## ")) {
                  if (inList) {
                    elements.push(
                      <ul key={`list-${lineIndex}`} className="list-disc list-inside mb-6 space-y-2 text-gray-300 pl-4 marker:text-blue-500">
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
                      className="text-2xl font-bold mt-12 mb-6 text-white scroll-mt-24 pb-2 border-b border-gray-800"
                    >
                      {headingText}
                    </h2>
                  );
                  continue;
                }
                
                if (line.startsWith("# ")) {
                  if (inList) {
                    elements.push(
                      <ul key={`list-${lineIndex}`} className="list-disc list-inside mb-6 space-y-2 text-gray-300 pl-4 marker:text-blue-500">
                        {listItems.map((item, idx) => (
                          <li key={idx}>{item.replace(/^[-*]\s*/, "")}</li>
                        ))}
                      </ul>
                    );
                    listItems = [];
                    inList = false;
                  }
                  elements.push(
                    <h1 key={lineIndex} className="text-3xl font-bold mt-10 mb-6 text-white">
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
                    <ul key={`list-${lineIndex}`} className="list-disc list-inside mb-6 space-y-2 text-gray-300 pl-4 marker:text-blue-500">
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
                      <ul key={`list-${lineIndex}`} className="list-disc list-inside mb-6 space-y-2 text-gray-300 pl-4 marker:text-blue-500">
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
                  let processedText = line;
                  
                  // 太字 **text**
                  const boldRegex = /\*\*(.+?)\*\*/g;
                  const boldParts: (string | React.ReactNode)[] = [];
                  let lastIndex = 0;
                  let match;
                  
                  while ((match = boldRegex.exec(processedText)) !== null) {
                    if (match.index > lastIndex) {
                      boldParts.push(processedText.substring(lastIndex, match.index));
                    }
                    boldParts.push(<strong key={`bold-${lineIndex}-${match.index}`} className="font-bold text-white bg-white/10 px-1 rounded">{match[1]}</strong>);
                    lastIndex = match.index + match[0].length;
                  }
                  if (lastIndex < processedText.length) {
                    boldParts.push(processedText.substring(lastIndex));
                  }
                  
                  // リンク [text](url)
                  const linkParts: (string | React.ReactNode)[] = [];
                  boldParts.forEach((part, partIndex) => {
                    if (typeof part === "string") {
                      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
                      let linkLastIndex = 0;
                      let linkMatch;
                      
                      while ((linkMatch = linkRegex.exec(part)) !== null) {
                        if (linkMatch.index > linkLastIndex) {
                          linkParts.push(part.substring(linkLastIndex, linkMatch.index));
                        }
                        linkParts.push(
                          <a 
                            key={`link-${lineIndex}-${partIndex}-${linkMatch.index}`} 
                            href={linkMatch[2]} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
                          >
                            {linkMatch[1]}
                          </a>
                        );
                        linkLastIndex = linkMatch.index + linkMatch[0].length;
                      }
                      if (linkLastIndex < part.length) {
                        linkParts.push(part.substring(linkLastIndex));
                      }
                    } else {
                      linkParts.push(part);
                    }
                  });
                  
                  // インラインコード `code`
                  const finalParts: (string | React.ReactNode)[] = [];
                  linkParts.forEach((part, partIndex) => {
                    if (typeof part === "string") {
                      const codeRegex = /`(.+?)`/g;
                      let codeLastIndex = 0;
                      let codeMatch;
                      
                      while ((codeMatch = codeRegex.exec(part)) !== null) {
                        if (codeMatch.index > codeLastIndex) {
                          finalParts.push(part.substring(codeLastIndex, codeMatch.index));
                        }
                        finalParts.push(<code key={`code-${lineIndex}-${partIndex}-${codeMatch.index}`} className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300 font-mono text-sm border border-gray-700">{codeMatch[1]}</code>);
                        codeLastIndex = codeMatch.index + codeMatch[0].length;
                      }
                      if (codeLastIndex < part.length) {
                        finalParts.push(part.substring(codeLastIndex));
                      }
                    } else {
                      finalParts.push(part);
                    }
                  });
                  
                  // 引用 > text
                  if (line.startsWith("> ")) {
                    elements.push(
                      <blockquote key={lineIndex} className="border-l-4 border-blue-500 pl-4 italic text-gray-400 my-6 bg-gray-800/30 py-2 pr-2 rounded-r-lg">
                        {finalParts.length > 0 ? finalParts : line.replace(/^>\s*/, "")}
                      </blockquote>
                    );
                  } else {
                    elements.push(
                      <p key={lineIndex} className="mb-6 text-gray-300 leading-8">
                        {finalParts.length > 0 ? finalParts : line}
                      </p>
                    );
                  }
                }
              }
              
              // 最後にリストが残っている場合
              if (inList && listItems.length > 0) {
                elements.push(
                  <ul key="list-final" className="list-disc list-inside mb-6 space-y-2 text-gray-300 pl-4 marker:text-blue-500">
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
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24">
          <TableOfContents content={post.content} />
        </div>
      </aside>
    </div>

        {/* いいねボタン */}
        <div className="mt-12 pt-12 border-t border-gray-800">
          <div className="flex justify-center">
             <LikeButton slug={post.slug} title={post.title} />
          </div>
        </div>

        {/* SNSシェアボタン */}
        <div className="mt-8">
           <ShareButtons title={post.title} excerpt={post.excerpt} slug={post.slug} />
        </div>

        {/* 前後の記事ナビゲーション */}
        {(prev || next) && (
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {prev && (
                <Link
                  href={`/posts/${prev.slug}`}
                  className="group p-6 bg-gray-800/50 hover:bg-gray-800 rounded-2xl transition-all border border-gray-700/50 hover:border-gray-600"
                  prefetch={true}
                >
                  <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider font-bold group-hover:text-blue-400 transition-colors">Previous</div>
                  <div className="font-bold text-white text-lg leading-tight group-hover:underline decoration-gray-600 underline-offset-4">{prev.title}</div>
                </Link>
              )}
              {next && (
                <Link
                  href={`/posts/${next.slug}`}
                  className="group p-6 bg-gray-800/50 hover:bg-gray-800 rounded-2xl transition-all border border-gray-700/50 hover:border-gray-600 md:text-right"
                  prefetch={true}
                >
                  <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider font-bold group-hover:text-blue-400 transition-colors">Next</div>
                  <div className="font-bold text-white text-lg leading-tight group-hover:underline decoration-gray-600 underline-offset-4">{next.title}</div>
                </Link>
              )}
            </div>
          </div>
        )}

        {/* 関連記事 */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-800">
            <h3 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
               <span className="text-blue-500">📑</span> 関連記事
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <AnimatedCard key={relatedPost.slug} delay={index * 0.1}>
                  <HoverCard className="h-full bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:bg-gray-800 hover:border-gray-600 transition-all group overflow-hidden">
                    <Link
                      href={`/posts/${relatedPost.slug}`}
                      className="block p-6 h-full flex flex-col"
                      prefetch={true}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500 group-hover:text-blue-400 transition-colors">
                          {relatedPost.category}
                        </span>
                        <span className="text-gray-600 text-xs">{relatedPost.date}</span>
                      </div>
                      <h4 className="font-bold text-white mb-3 leading-snug group-hover:text-gray-200 transition-colors flex-grow">
                        {relatedPost.title}
                      </h4>
                    </Link>
                  </HoverCard>
                </AnimatedCard>
              ))}
            </div>
          </div>
        )}

        {/* コメントセクション */}
        <CommentsSection postSlug={post.slug} />

        {/* フッター */}
        <footer className="mt-12 pt-8 border-t border-gray-800 text-center">
          <Link
            href="/"
            className="text-gray-400 hover:text-white font-medium inline-flex items-center gap-2 transition-colors px-6 py-3 rounded-full hover:bg-white/5"
            prefetch={true}
            aria-label="ホームページに戻る"
          >
            ← Back to Home
          </Link>
        </footer>
        </div>
      </article>
    </>
  );
}
