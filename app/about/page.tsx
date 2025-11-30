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
              <span className="bg-slate-700 text-slate-200 px-3 py-1 rounded-full text-sm font-semibold border border-slate-600">プログラミング</span>
              <span className="bg-slate-700 text-slate-200 px-3 py-1 rounded-full text-sm font-semibold border border-slate-600">節約</span>
              <span className="bg-slate-700 text-slate-200 px-3 py-1 rounded-full text-sm font-semibold border border-slate-600">筋トレ</span>
              <span className="bg-slate-700 text-slate-200 px-3 py-1 rounded-full text-sm font-semibold border border-slate-600">AI</span>
              <span className="bg-slate-700 text-slate-200 px-3 py-1 rounded-full text-sm font-semibold border border-slate-600">資産形成</span>
              <span className="bg-slate-700 text-slate-200 px-3 py-1 rounded-full text-sm font-semibold border border-slate-600">北海道</span>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2 text-white">連絡先</h3>
            <p className="text-gray-300 mb-2">
              お問い合わせは
              <a 
                href="/contact" 
                className="text-slate-300 hover:text-slate-200 underline"
              >
                お問い合わせページ
              </a>
              よりお願いいたします。
            </p>
            <p className="text-gray-400 text-sm">
              ※メールでのお問い合わせには数日かかる場合がございます。
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2 text-white">このブログについて</h3>
            <p className="text-gray-300 leading-relaxed">
              このブログは、アラフォーで北海道に移住した見習いエンジニア「トシぼう」の成長日記です。
              プログラミング、節約、筋トレ、AI、資産形成など、日々の学びや体験を共有しています。
              同じような境遇の方や、これから移住や転職を考えている方の参考になれば幸いです。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

