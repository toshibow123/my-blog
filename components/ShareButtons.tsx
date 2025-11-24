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

  const handleInstagramShare = () => {
    // Instagramは直接URLシェアができないため、URLをコピーして案内
    navigator.clipboard.writeText(url);
    alert("URLをコピーしました！\nInstagramアプリで投稿する際に、このURLを貼り付けてください。");
  };

  return (
    <div className="mt-8 pt-8 border-t border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-slate-300">シェアする</h3>
      <div className="flex gap-3 flex-wrap">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors shadow-md hover:shadow-lg"
          aria-label="Twitterでシェア"
        >
          Twitter
        </a>
        <a
          href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors shadow-md hover:shadow-lg"
          aria-label="LINEでシェア"
        >
          LINE
        </a>
        <button
          onClick={handleInstagramShare}
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors shadow-md hover:shadow-lg"
          aria-label="Instagramでシェア"
        >
          Instagram
        </button>
        <button
          onClick={handleCopyLink}
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors shadow-md hover:shadow-lg"
          aria-label="URLをコピー"
        >
          リンクをコピー
        </button>
      </div>
    </div>
  );
}

