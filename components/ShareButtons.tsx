"use client";

interface ShareButtonsProps {
  title: string;
  excerpt: string;
  slug: string;
}

export default function ShareButtons({ title, excerpt, slug }: ShareButtonsProps) {
  const url = `https://www.toshiboh.com/posts/${slug}`;

  const handleCopyLink = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: excerpt,
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("URLをコピーしました！");
    }
  };

  return (
    <div className="mt-8 pt-8 border-t border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">シェアする</h3>
      <div className="flex gap-3 flex-wrap">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-md hover:shadow-lg"
          aria-label="Twitterでシェア"
        >
          Twitter
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-md hover:shadow-lg"
          aria-label="Facebookでシェア"
        >
          Facebook
        </a>
        <a
          href={`https://b.hatena.ne.jp/entry/${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-md hover:shadow-lg"
          aria-label="はてなブックマークに追加"
        >
          はてブ
        </a>
        <button
          onClick={handleCopyLink}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-md hover:shadow-lg"
          aria-label="URLをコピー"
        >
          リンクをコピー
        </button>
      </div>
    </div>
  );
}

