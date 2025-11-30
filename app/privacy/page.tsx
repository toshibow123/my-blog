export const metadata = {
  title: "プライバシーポリシー | トシぼうのブログ",
  description: "プライバシーポリシーについてのページです。",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-title mb-6 text-white">プライバシーポリシー</h1>
      
      <div className="bg-gray-800 rounded-lg shadow-md p-8 space-y-6 border border-gray-700">
        <section>
          <p className="text-gray-400 text-sm mb-4">
            最終更新日：2025年10月16日
          </p>
          <p className="text-gray-300 leading-relaxed">
            トシぼうのブログ（以下「当サイト」）は、ユーザーの個人情報の保護に努めています。
            本プライバシーポリシーは、当サイトがどのような個人情報を収集し、どのように使用するかを説明します。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">1. 収集する情報</h2>
          <div className="text-gray-300 space-y-3">
            <p>当サイトでは、以下の情報を収集する場合があります：</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>お問い合わせフォームから送信された氏名、メールアドレス、お問い合わせ内容</li>
              <li>アクセスログ（IPアドレス、ブラウザの種類、アクセス日時など）</li>
              <li>Cookie（クッキー）による情報</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">2. 情報の利用目的</h2>
          <div className="text-gray-300 space-y-3">
            <p>収集した情報は、以下の目的で使用します：</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>お問い合わせへの対応</li>
              <li>サイトの改善・分析</li>
              <li>不正アクセスの防止</li>
              <li>統計データの作成</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">3. 広告配信について</h2>
          <div className="text-gray-300 space-y-3">
            <p>
              当サイトは、第三者配信の広告サービス「Googleアドセンス」を利用しています。
              Googleアドセンスは、ユーザーの興味に応じた広告を表示するため、Cookieを使用することがあります。
            </p>
            <p>
              Cookieを無効にする方法や、Googleアドセンスに関する詳細は、
              <a 
                href="https://policies.google.com/technologies/ads" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-slate-200 underline"
              >
                Googleの広告ポリシー
              </a>
              をご確認ください。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">4. アクセス解析ツールについて</h2>
          <div className="text-gray-300 space-y-3">
            <p>
              当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を使用しています。
              このツールはトラフィックデータの収集のためにCookieを使用しています。
            </p>
            <p>
              このデータは匿名で収集されており、個人を特定するものではありません。
              Cookieを無効にすることで、データ収集を拒否することができます。
            </p>
            <p>
              詳細は
              <a 
                href="https://policies.google.com/privacy?hl=ja" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-slate-200 underline"
              >
                Googleのプライバシーポリシー
              </a>
              をご確認ください。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">5. 第三者への提供</h2>
          <p className="text-gray-300 leading-relaxed">
            当サイトは、法令に基づく場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">6. 個人情報の管理</h2>
          <p className="text-gray-300 leading-relaxed">
            当サイトは、収集した個人情報を適切に管理し、漏洩、滅失、毀損の防止に努めます。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">7. プライバシーポリシーの変更</h2>
          <p className="text-gray-300 leading-relaxed">
            当サイトは、必要に応じて本プライバシーポリシーを変更することがあります。
            変更後のプライバシーポリシーは、当サイトに掲載した時点で効力を生じるものとします。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">8. お問い合わせ</h2>
          <p className="text-gray-300 leading-relaxed">
            プライバシーポリシーに関するお問い合わせは、
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

