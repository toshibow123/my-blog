export const metadata = {
  title: "プロフィール | トシぼうのブログ",
  description: "トシぼうのプロフィールページです。経歴、スキル、学習ロードマップなどを紹介します。",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-gray-900 rounded-3xl p-8 md:p-12 border border-gray-800 shadow-2xl">
        
        {/* ヘッダー部分 */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-800 shadow-xl flex-shrink-0 relative group">
            <img
              src="/profile.png"
              alt="トシぼう"
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              width={160}
              height={160}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-4xl font-bold mb-3 text-white tracking-tight">トシぼう</h1>
            <p className="text-blue-400 font-medium mb-4 tracking-wide">Apprentice Engineer / Blogger / Investor</p>
            <p className="text-gray-300 leading-relaxed max-w-2xl">
              東京でのサラリーマン生活を経て、2024年に北海道へ移住したアラフォー見習いエンジニア。
              <br />
              「技術×節約×資産形成」をテーマに、自由で豊かなライフスタイルを模索中。
            </p>
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* 左カラム：経歴・スキル */}
          <div className="md:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3 border-b border-gray-800 pb-2">
                <span className="text-2xl">🚀</span>
                Background
              </h2>
              <div className="space-y-6">
                <div className="relative pl-8 border-l-2 border-gray-800">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-gray-900" />
                  <span className="text-sm text-gray-500 font-mono block mb-1">2024 - Present</span>
                  <h3 className="text-lg font-bold text-white mb-2">北海道へ移住 & 開発現場へ</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    長年の夢だった北海道移住を実現。テスターとして1年経験を積んだ後、開発現場（SES）に参画。
                    Linux, Docker, Gitなどのモダンな開発フローをOJTで習得中。
                  </p>
                </div>
                <div className="relative pl-8 border-l-2 border-gray-800">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-700 border-4 border-gray-900" />
                  <span className="text-sm text-gray-500 font-mono block mb-1">2010 - 2023</span>
                  <h3 className="text-lg font-bold text-white mb-2">アルバイト・派遣でうだつのあがらない日々</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    東京でアルバイトや派遣の仕事を転々としながら、なかなかうだつが上がらない日々を送っていました。
                    この期間に資産形成（インデックス投資）と筋トレに目覚め、エンジニアへの転向を決意。
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3 border-b border-gray-800 pb-2">
                <span className="text-2xl">💻</span>
                Tech Stack
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                  <h3 className="font-bold text-white mb-3 text-sm uppercase tracking-wider">Languages & Frameworks</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-900/30 text-blue-200 px-3 py-1 rounded-lg text-xs font-medium border border-blue-800/50">Python (Flask)</span>
                    <span className="bg-yellow-900/30 text-yellow-200 px-3 py-1 rounded-lg text-xs font-medium border border-yellow-800/50">JavaScript</span>
                    <span className="bg-cyan-900/30 text-cyan-200 px-3 py-1 rounded-lg text-xs font-medium border border-cyan-800/50">React / Next.js</span>
                    <span className="bg-gray-700/30 text-gray-300 px-3 py-1 rounded-lg text-xs font-medium border border-gray-600/50">HTML / CSS</span>
                  </div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                  <h3 className="font-bold text-white mb-3 text-sm uppercase tracking-wider">Tools & Infrastructure</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-orange-900/30 text-orange-200 px-3 py-1 rounded-lg text-xs font-medium border border-orange-800/50">Git / GitHub</span>
                    <span className="bg-blue-900/30 text-blue-200 px-3 py-1 rounded-lg text-xs font-medium border border-blue-800/50">Docker</span>
                    <span className="bg-gray-700/30 text-gray-300 px-3 py-1 rounded-lg text-xs font-medium border border-gray-600/50">Linux (Basic)</span>
                    <span className="bg-green-900/30 text-green-200 px-3 py-1 rounded-lg text-xs font-medium border border-green-800/50">Supabase</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* 右カラム：その他の情報 */}
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-4 text-white">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {["筋トレ", "節約", "資産形成", "AI", "北海道", "ポーカー", "サウナ"].map((tag) => (
                  <span key={tag} className="bg-gray-800 text-gray-300 px-3 py-1.5 rounded-full text-xs font-medium border border-gray-700">
                    #{tag}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4 text-white">Certifications</h2>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>ITパスポート</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Python基礎</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-600">⏳</span>
                  <span>基本情報技術者 (学習中)</span>
                </li>
              </ul>
            </section>

            <div className="pt-6 border-t border-gray-800">
              <h2 className="text-xl font-bold mb-4 text-white">Contact</h2>
              <p className="text-gray-400 text-sm mb-4">
                お仕事のご依頼やご質問は、お問い合わせページよりお願いいたします。
              </p>
              <a 
                href="/contact" 
                className="block w-full bg-white text-black text-center py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
              >
                お問い合わせ
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
