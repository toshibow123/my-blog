"use client";

interface ShareButtonsProps {
  title: string;
  excerpt: string;
  slug: string;
}

export default function ShareButtons({ title, excerpt, slug }: ShareButtonsProps) {
  const url = `https://www.toshiboh.com/posts/${slug}`;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      alert("URLをコピーしました！");
    }
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-800">
      <h3 className="text-lg font-semibold mb-6 text-white">この記事をシェア</h3>
      <div className="flex flex-wrap gap-3">
        {/* X (Twitter) */}
        <a
          href={`https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-12 h-12 bg-black hover:bg-gray-900 text-white rounded-full transition-colors"
          aria-label="Xでシェア"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </svg>
        </a>

        {/* Threads */}
        <a
          href={`https://www.threads.net/intent/post?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-12 h-12 bg-black hover:bg-gray-900 text-white rounded-full transition-colors"
          aria-label="Threadsでシェア"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12.186 8.672 18.743.047h-2.927l-5.005 5.9-4.44-5.9H0l7.434 9.876-7.434 9.876h2.927l5.162-6.1 4.44 6.1H24L12.186 8.672zm-2.267 2.671L8.544 9.515 3.2 2.42h2.527l4.219 5.923 1.52-1.775zm-5.38 6.36L15.456 14.485 20.8 21.58h-2.527l-4.219-5.923-1.52 1.775z"></path>
          </svg>
        </a>

        {/* Bluesky */}
        <a
          href={`https://bsky.app/intent/compose?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-12 h-12 bg-[#0085FF] hover:bg-[#0070E6] text-white rounded-full transition-colors"
          aria-label="Blueskyでシェア"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 10.8c-1.087-2.114-4.046-6.44-8.4-6.44-2.68 0-4.8 1.74-4.8 4.8 0 3.24 2.88 7.56 8.4 13.2 5.52-5.64 8.4-9.96 8.4-13.2 0-3.06-2.12-4.8-4.8-4.8-4.354 0-7.313 4.326-8.4 6.44zm0 0c1.087-2.114 4.046-6.44 8.4-6.44 2.68 0 4.8 1.74 4.8 4.8 0 3.24-2.88 7.56-8.4 13.2-5.52-5.64-8.4-9.96-8.4-13.2 0-3.06 2.12-4.8 4.8-4.8 4.354 0 7.313 4.326 8.4 6.44z"></path>
          </svg>
        </a>

        {/* はてなブックマーク */}
        <a
          href={`https://b.hatena.ne.jp/entry/${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-12 h-12 bg-[#00A4DE] hover:bg-[#0093CC] text-white rounded-full transition-colors"
          aria-label="はてなブックマークに追加"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.47 0H3.53A3.53 3.53 0 0 0 0 3.53v16.94A3.53 3.53 0 0 0 3.53 24h16.94A3.53 3.53 0 0 0 24 20.47V3.53A3.53 3.53 0 0 0 20.47 0zm-2.89 15.18c-.39.19-.9.33-1.53.41-.63.09-1.35.13-2.16.13H8.11v-1.5h5.78c.45 0 .84-.04 1.17-.11.33-.08.58-.19.75-.33.17-.14.26-.32.26-.54 0-.25-.1-.45-.3-.6-.2-.15-.5-.25-.9-.3-.4-.06-.9-.09-1.5-.09H8.11V10.5h5.78c.6 0 1.1.03 1.5.09.4.05.7.15.9.3.2.15.3.35.3.6 0 .22-.09.4-.26.54-.17.14-.42.25-.75.33-.33.08-.72.11-1.17.11H8.11V9h5.78c.81 0 1.53.04 2.16.13.63.09 1.14.22 1.53.41.39.19.59.45.59.78 0 .33-.2.59-.59.78z"></path>
          </svg>
        </a>

        {/* Instapaper */}
        <a
          href={`https://www.instapaper.com/hello2?url=${encodedUrl}&title=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-12 h-12 bg-[#000000] hover:bg-gray-900 text-white rounded-full transition-colors"
          aria-label="Instapaperに保存"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M14.766 20.259c0 1.819.271 2.089 2.934 2.292v.713H6.301v-.713c2.662-.203 2.934-.473 2.934-2.292V3.708c0-1.784-.272-2.089-2.934-2.292V.703h11.399v.713c-2.662.203-2.934.508-2.934 2.292v16.551z"></path>
          </svg>
        </a>

        {/* LINE */}
        <a
          href={`https://social-plugins.line.me/lineit/share?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-12 h-12 bg-[#06C755] hover:bg-[#05B048] text-white rounded-full transition-colors"
          aria-label="LINEでシェア"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.348 0 .63.285.63.63 0 .349-.282.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.028 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"></path>
          </svg>
        </a>

        {/* リンクをコピー */}
        <button
          onClick={handleCopyLink}
          className="inline-flex items-center justify-center w-12 h-12 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-colors"
          aria-label="URLをコピー"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
