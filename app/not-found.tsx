import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-9xl font-title font-black text-gray-800 mb-4 select-none">404</h1>
      <div className="relative z-10 -mt-12">
        <h2 className="text-3xl md:text-4xl font-title text-white mb-6">
          ページが見つかりません
        </h2>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
          お探しのページは移動したか、削除された可能性があります。<br />
          もしかすると、URLが間違っているかもしれません。
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-yellow-500/50"
          >
            ホームに戻る
          </Link>
          <Link
            href="/posts"
            className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-full font-bold transition-all border border-gray-700 hover:border-gray-600"
          >
            記事一覧を見る
          </Link>
        </div>
      </div>
    </div>
  );
}
