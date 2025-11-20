export const metadata = {
  title: "利用規約 | トシぼうのブログ",
  description: "利用規約についてのページです。",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">利用規約</h1>
      
      <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
        <section>
          <p className="text-gray-600 text-sm mb-4">
            最終更新日：2025年10月16日
          </p>
          <p className="text-gray-700 leading-relaxed">
            本規約は、トシぼうのブログ（以下「当サイト」）の利用条件を定めるものです。
            当サイトを利用される方は、本規約に同意したものとみなされます。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. 適用範囲</h2>
          <p className="text-gray-700 leading-relaxed">
            本規約は、当サイトのすべての利用者に適用されます。
            当サイトを利用することにより、利用者は本規約に同意したものとみなされます。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. コンテンツの利用</h2>
          <div className="text-gray-700 space-y-3">
            <p>当サイトに掲載されているコンテンツ（記事、画像、その他の情報）について：</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>著作権は当サイト運営者に帰属します</li>
              <li>個人の学習・研究目的での利用は可能です</li>
              <li>商用利用や転載は、事前の許可が必要です</li>
              <li>引用する場合は、出典を明記してください</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. 禁止行為</h2>
          <div className="text-gray-700 space-y-3">
            <p>以下の行為を禁止します：</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>当サイトのコンテンツを無断で転載・複製すること</li>
              <li>当サイトの運営を妨害する行為</li>
              <li>不正アクセスやハッキング行為</li>
              <li>他の利用者や第三者に不利益を与える行為</li>
              <li>法令に違反する行為</li>
              <li>公序良俗に反する行為</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. 免責事項</h2>
          <div className="text-gray-700 space-y-3">
            <p>
              当サイトのコンテンツは、情報提供を目的としており、その正確性、完全性、有用性を保証するものではありません。
            </p>
            <p>
              当サイトの利用により生じた損害について、当サイト運営者は一切の責任を負いません。
            </p>
            <p>
              当サイトは予告なく内容の変更、削除、運営の中断・終了を行う場合があります。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. リンクについて</h2>
          <p className="text-gray-700 leading-relaxed">
            当サイトから他のサイトへのリンク、または他のサイトから当サイトへのリンクについて、
            当サイト運営者はその内容について責任を負いません。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. 広告について</h2>
          <p className="text-gray-700 leading-relaxed">
            当サイトでは、第三者配信の広告サービスを利用しています。
            広告の内容やリンク先については、当サイト運営者は責任を負いません。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">7. 規約の変更</h2>
          <p className="text-gray-700 leading-relaxed">
            当サイトは、必要に応じて本規約を変更することがあります。
            変更後の規約は、当サイトに掲載した時点で効力を生じるものとします。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">8. お問い合わせ</h2>
          <p className="text-gray-700 leading-relaxed">
            本規約に関するお問い合わせは、
            <a href="/contact" className="text-yellow-600 hover:text-yellow-700 underline">
              お問い合わせページ
            </a>
            よりご連絡ください。
          </p>
        </section>
      </div>
    </div>
  );
}

