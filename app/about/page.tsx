export const metadata = {
  title: "プロフィール | トシぼうのブログ",
  description: "トシぼうのプロフィールページです。",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-white">プロフィール</h1>
      
      <div className="bg-gray-800 rounded-lg shadow-md p-8 border border-gray-700">
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-yellow-400 shadow-lg flex-shrink-0">
            <img
              src="/profile.png"
              alt="トシぼう"
              className="object-cover w-full h-full"
              width={128}
              height={128}
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2 text-white">トシぼう</h2>
            <p className="text-gray-300 mb-4">
              アラフォーで北海道に移住した「トシぼう」です！
            </p>
            <p className="text-gray-300 leading-relaxed">
              節約しながらもマッチョをあきらめず、AIや資産形成も大好き。
              このブログが少しでも参考になればうれしいです！
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 space-y-4">
          <section>
            <h3 className="text-xl font-semibold mb-2 text-white">経歴</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• 生まれてから30代後半まで東京在住</li>
              <li>• 2024年に北海道へ移住</li>
              <li>• プログラミング、節約、筋トレが趣味</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2 text-white">興味のあること</h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold shadow-md">プログラミング</span>
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold shadow-md">節約</span>
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold shadow-md">筋トレ</span>
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold shadow-md">AI</span>
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold shadow-md">資産形成</span>
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold shadow-md">北海道</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

