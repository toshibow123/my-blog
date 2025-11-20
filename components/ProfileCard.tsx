import Link from "next/link";
import Card3D from "./Card3D";
import AnimatedCard from "./AnimatedCard";

export default function ProfileCard() {
  return (
    <AnimatedCard delay={0.1}>
      <Card3D>
        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700">
          <div className="p-6">
            <div className="flex flex-col items-center text-center mb-4">
              <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-yellow-400 shadow-lg">
                <img
                  src="/profile.png"
                  alt="トシぼう"
                  className="object-cover w-full h-full"
                  width={96}
                  height={96}
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">トシぼう</h3>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                アラフォーで北海道に移住した「トシぼう」です！
                <br />
                節約しながらもマッチョをあきらめず、AIや資産形成も大好き。
              </p>
              <Link
                href="/about"
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 px-4 py-2 rounded-full font-semibold transition-all shadow-md hover:shadow-yellow-500/50 inline-flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-800 text-sm"
                prefetch={true}
              >
                プロフィールを見る →
              </Link>
            </div>
          </div>
        </div>
      </Card3D>
    </AnimatedCard>
  );
}

