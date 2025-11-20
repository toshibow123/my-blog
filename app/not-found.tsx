import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-9xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          ページが見つかりません
        </h2>
        <p className="text-gray-600 mb-8 text-lg">
          お探しのページは存在しないか、移動または削除された可能性があります。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 px-6 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-yellow-500/50 inline-block"
          >
            ホームに戻る
          </Link>
          <Link
            href="/sitemap"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-full font-semibold transition-colors inline-block"
          >
            サイトマップを見る
          </Link>
        </div>
      </div>
    </div>
  );
}

