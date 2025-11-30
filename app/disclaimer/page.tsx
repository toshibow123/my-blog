export const metadata = {
  title: "免責事項 | トシぼうのブログ",
  description: "免責事項についてのページです。",
};

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-title mb-6 text-white">免責事項</h1>
      
      <div className="bg-gray-800 rounded-lg shadow-md p-8 border border-gray-700 space-y-6">
        <section>
          <p className="text-gray-400 text-sm mb-4">
            最終更新日：2025年10月16日
          </p>
          <p className="text-gray-300 leading-relaxed">
            トシぼうのブログ（以下「当サイト」）の免責事項について、以下の通り定めます。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">1. 情報の正確性について</h2>
          <p className="text-gray-300 leading-relaxed">
            当サイトに掲載されている情報は、可能な限り正確な情報を提供するよう努めていますが、
            その正確性、完全性、有用性を保証するものではありません。
            情報の誤りや不備、または情報の利用により生じた損害について、当サイト運営者は一切の責任を負いません。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">2. 損害の免責</h2>
          <p className="text-gray-300 leading-relaxed">
            当サイトの利用により生じた、いかなる損害（直接損害、間接損害、特別損害、結果的損害、逸失利益を含む）についても、
            当サイト運営者は一切の責任を負いません。
            当サイトの情報を利用する際は、自己責任で行ってください。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">3. リンク先の責任</h2>
          <p className="text-gray-300 leading-relaxed">
            当サイトから他のサイトへのリンク、または他のサイトから当サイトへのリンクについて、
            当サイト運営者はリンク先のサイトの内容やサービスについて一切の責任を負いません。
            リンク先のサイトの利用は、利用者の自己責任で行ってください。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">4. コンテンツの変更・削除</h2>
          <p className="text-gray-300 leading-relaxed">
            当サイトは予告なく、コンテンツの変更、削除、運営の中断・終了を行う場合があります。
            これにより生じた損害について、当サイト運営者は一切の責任を負いません。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">5. 投資・金融に関する情報</h2>
          <p className="text-gray-300 leading-relaxed">
            当サイトに掲載されている投資・金融に関する情報は、一般的な情報提供を目的としたものであり、
            投資の勧誘や推奨を目的としたものではありません。
            投資判断は、利用者の自己責任で行ってください。
            投資により生じた損害について、当サイト運営者は一切の責任を負いません。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">6. プログラミング・技術情報</h2>
          <p className="text-gray-300 leading-relaxed">
            当サイトに掲載されているプログラミングや技術に関する情報は、学習・参考を目的としたものであり、
            その正確性や動作を保証するものではありません。
            コードの利用により生じた損害について、当サイト運営者は一切の責任を負いません。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">7. 免責事項の変更</h2>
          <p className="text-gray-300 leading-relaxed">
            当サイトは、必要に応じて本免責事項を変更することがあります。
            変更後の免責事項は、当サイトに掲載した時点で効力を生じるものとします。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">8. お問い合わせ</h2>
          <p className="text-gray-300 leading-relaxed">
            免責事項に関するお問い合わせは、
            <a href="/contact" className="text-slate-300 hover:text-slate-200 underline">
              お問い合わせページ
            </a>
            よりご連絡ください。
          </p>
        </section>
      </div>
    </div>
  );
}

