import Link from "next/link";
import Card3D from "./Card3D";
import AnimatedCard from "./AnimatedCard";
import SocialLinks from "@/components/SocialLinks";

export default function ProfileCard() {
  return (
    <AnimatedCard delay={0.1}>
      <Card3D>
        <div className="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50 backdrop-blur-sm">
          <div className="p-6">
            <div className="flex flex-col items-center text-center mb-4">
              <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden border-3 border-slate-400 shadow-xl shadow-slate-500/30 ring-2 ring-slate-400/20">
                <img
                  src="/profile.png"
                  alt="トシぼう"
                  className="object-cover w-full h-full"
                  width={96}
                  height={96}
                />
              </div>
              <h3 className="text-xl font-title text-white mb-2">トシぼう</h3>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                アラフォーで北海道に移住した「トシぼう」です！
                <br />
                節約しながらもマッチョをあきらめず、AIや資産形成も大好き。
              </p>
              <Link
                href="/about"
                className="bg-slate-700 hover:bg-slate-600 text-white px-5 py-2.5 rounded-full font-semibold transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-gray-800 text-sm hover:scale-105"
                prefetch={true}
              >
                プロフィールを見る
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <SocialLinks />
            </div>
          </div>
        </div>
      </Card3D>
    </AnimatedCard>
  );
}

