import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] text-white mt-24 border-t border-gray-800" role="contentinfo">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: プロフィール & サイト情報 */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tight apple-text">Think Simple.</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              北海道在住の見習いエンジニア。
              <br />
              技術、筋トレ、資産形成を軸に、自由なライフスタイルを模索するブログメディアです。
            </p>
            <SocialLinks />
          </div>

          {/* Column 2: カテゴリー */}
          <div>
            <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Categories</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/category/programming" className="hover:text-white transition-colors">Programming</Link></li>
              <li><Link href="/category/fitness" className="hover:text-white transition-colors">Fitness</Link></li>
              <li><Link href="/category/saving" className="hover:text-white transition-colors">Saving & Money</Link></li>
              <li><Link href="/category/others" className="hover:text-white transition-colors">Life & Others</Link></li>
            </ul>
          </div>

          {/* Column 3: 人気の記事（静的リンク） */}
          <div>
            <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Popular Stories</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <Link href="/posts/development-learning" className="hover:text-white transition-colors block leading-snug">
                  開発現場で学んだこと - プログラミング言語だけじゃない
                </Link>
              </li>
              <li>
                <Link href="/posts/saving-sapporo" className="hover:text-white transition-colors block leading-snug">
                  【札幌ノマド】カフェ代を月5000円節約！「札幌市民交流プラザ」活用術
                </Link>
              </li>
              <li>
                <Link href="/posts/python-post" className="hover:text-white transition-colors block leading-snug">
                  Python/Flask学習記録 - 環境構築からHello Worldまで
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: サイト情報 */}
          <div>
            <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Information</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">Profile</Link></li>
              <li><Link href="/learning" className="hover:text-white transition-colors">今日の学び</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
              <li><Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link></li>
            </ul>
          </div>
        </div>

        {/* コピーライト */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">© {currentYear} Toshiboh. All Rights Reserved.</p>
          <div className="text-xs text-gray-500 font-mono">
             Designed by Toshiboh
          </div>
        </div>
      </div>
    </footer>
  );
}
