import Link from "next/link";
import SocialLinks from "./SocialLinks";

export default function AuthorProfile() {
  return (
    <section className="mt-16 pt-12 border-t border-gray-800">
      <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-1 h-6 bg-blue-500"></span>
        著者情報
      </h2>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* プロフィール写真 */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-700">
            <img
              src="/profile.png"
              alt="トシぼう"
              className="object-cover w-full h-full"
              width={96}
              height={96}
            />
          </div>
        </div>

        {/* 著者情報 */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">トシぼう</h3>
          <p className="text-gray-400 text-sm mb-4 leading-relaxed">
            東京でのサラリーマン生活を経て、2024年に北海道へ移住したアラフォー見習いエンジニア。
            「技術×節約×資産形成」をテーマに、自由で豊かなライフスタイルを模索中。
            テスターとして1年経験を積んだ後、開発現場（SES）に参画。Linux, Docker, Gitなどのモダンな開発フローをOJTで習得中です。
          </p>
          
          {/* SNSリンク */}
          <div className="flex gap-3">
            <SocialLinks />
          </div>
        </div>
      </div>
    </section>
  );
}

