export const metadata = {
  title: "お問い合わせ | トシぼうのブログ",
  description: "お問い合わせページです。ご質問やご意見をお待ちしております。",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-title mb-6 text-white">お問い合わせ</h1>
      
      <div className="bg-gray-800 rounded-lg shadow-md p-8 mb-8 border border-gray-700">
        <p className="text-gray-300 mb-6 leading-relaxed">
          ご質問、ご意見、お仕事のご依頼など、お気軽にお問い合わせください。
          お返事には数日かかる場合がございます。ご了承ください。
        </p>

        <div className="bg-slate-700 border-l-4 border-slate-500 p-4 mb-6 shadow-md rounded">
          <p className="text-white font-semibold mb-2">お問い合わせ方法</p>
          <p className="text-gray-300">
            メールアドレス：<a 
              href="mailto:info@toshiboh.com" 
              className="text-slate-300 hover:text-slate-200 underline font-semibold"
            >
              info@toshiboh.com
            </a>
          </p>
          <p className="text-gray-400 text-sm mt-2">
            ※お返事には2〜3営業日程度かかる場合がございます。
          </p>
        </div>

        <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
          <h2 className="text-xl font-semibold mb-4 text-white">よくある質問</h2>
          <dl className="space-y-4">
            <div>
              <dt className="font-semibold text-white mb-1">Q. 返信はどのくらいで来ますか？</dt>
              <dd className="text-gray-300 text-sm">
                A. 通常2〜3営業日以内に返信いたします。お急ぎの場合は、件名に「【至急】」と記載していただけると対応が早くなります。
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-white mb-1">Q. 広告掲載のご相談はできますか？</dt>
              <dd className="text-gray-300 text-sm">
                A. はい、お気軽にご相談ください。内容を確認の上、ご返信いたします。
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-white mb-1">Q. 記事の転載について</dt>
              <dd className="text-gray-300 text-sm">
                A. 当サイトの記事の転載は原則として禁止しております。ご利用の際は事前にご連絡ください。
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="bg-slate-700 border-l-4 border-slate-500 p-4 rounded">
        <p className="text-sm text-gray-300">
          <strong>注意事項：</strong>
          スパムメールや不適切な内容のメールには返信いたしません。
          また、個人情報の取り扱いについては
          <a href="/privacy" className="text-slate-300 hover:text-slate-200 underline">
            プライバシーポリシー
          </a>
          をご確認ください。
        </p>
      </div>
    </div>
  );
}

