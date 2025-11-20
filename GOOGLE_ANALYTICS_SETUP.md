# 📊 Google Analytics & Search Console 設定ガイド

## Google Analytics 4（GA4）の設定

### 1. Google Analyticsアカウントの作成

1. [Google Analytics](https://analytics.google.com/) にアクセス
2. 「測定を開始」をクリック
3. アカウント名を入力（例: トシぼうのブログ）
4. プロパティ名を入力（例: トシぼうのブログ）
5. 業種・タイムゾーンを選択:
   - 業種: ブログ/メディア
   - タイムゾーン: 日本
6. ウェブストリームを作成:
   - URL: `https://www.toshiboh.com`
   - ストリーム名: Web

### 2. 測定IDの取得

作成後、「測定ID」（例: `G-XXXXXXXXXX`）が表示されます。
これをコピーしておきます。

### 3. Next.jsへの実装

#### 方法1: Google Analytics コンポーネント（推奨）

`components/GoogleAnalytics.tsx` を作成:

```typescript
"use client";

import Script from "next/script";

export default function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
```

`app/layout.tsx` に追加:

```typescript
import GoogleAnalytics from "@/components/GoogleAnalytics";

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        {/* 本番環境でのみ有効化 */}
        {process.env.NODE_ENV === "production" && (
          <GoogleAnalytics measurementId="G-XXXXXXXXXX" />
        )}
        {children}
      </body>
    </html>
  );
}
```

#### 方法2: 環境変数を使用

`.env.local` に追加:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

コンポーネントで使用:

```typescript
<GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
```

### 4. 動作確認

1. サイトをデプロイ
2. Google Analyticsのリアルタイムレポートを開く
3. 自分のサイトにアクセス
4. リアルタイムで1ユーザーが表示されればOK

---

## Google Search Console の設定

### 1. Search Consoleへの登録

1. [Google Search Console](https://search.google.com/search-console/) にアクセス
2. 「プロパティを追加」をクリック
3. 「URLプレフィックス」を選択
4. URL: `https://www.toshiboh.com` を入力

### 2. 所有権の確認

#### 方法1: HTMLタグ（推奨）

1. Search Consoleに表示されるメタタグをコピー:
   ```html
   <meta name="google-site-verification" content="XXXXXXXXXXXXX" />
   ```

2. `app/layout.tsx` の `metadata` に追加:
   ```typescript
   export const metadata: Metadata = {
     // ... 他の設定
     verification: {
       google: "XXXXXXXXXXXXX", // content属性の値だけ
     },
   };
   ```

3. デプロイ
4. Search Consoleで「確認」をクリック

#### 方法2: HTMLファイル

1. Search Consoleからダウンロードしたファイルを `public/` に配置
2. デプロイ
3. Search Consoleで「確認」をクリック

### 3. サイトマップの送信

1. Search Consoleの左メニューから「サイトマップ」を選択
2. 「新しいサイトマップの追加」に以下を入力:
   ```
   https://www.toshiboh.com/sitemap.xml
   ```
3. 「送信」をクリック

### 4. インデックス登録のリクエスト

1. Search Consoleの「URL検査」を選択
2. 主要ページのURLを入力:
   - `https://www.toshiboh.com/`
   - `https://www.toshiboh.com/about`
   - `https://www.toshiboh.com/posts/[記事スラッグ]`
3. 「インデックス登録をリクエスト」をクリック

---

## 📈 確認項目チェックリスト

### Google Analytics

- [ ] 測定IDを取得
- [ ] GoogleAnalyticsコンポーネントを作成
- [ ] app/layout.tsx に追加
- [ ] デプロイ
- [ ] リアルタイムレポートで確認

### Google Search Console

- [ ] プロパティを追加
- [ ] 所有権の確認（メタタグ）
- [ ] デプロイ
- [ ] 所有権の確認完了
- [ ] サイトマップを送信
- [ ] 主要ページのインデックス登録をリクエスト

---

## 💡 運用のヒント

### Google Analytics

1. **目標の設定**
   - お問い合わせページへの到達
   - プロフィールページの閲覧
   - 記事の読了（スクロール深度）

2. **カスタムイベント**
   - 外部リンククリック
   - SNSシェアボタンのクリック
   - 記事のカテゴリー別閲覧

### Google Search Console

1. **毎週の確認事項**
   - クロールエラー
   - インデックス登録状況
   - 検索パフォーマンス

2. **改善ポイント**
   - クリック率の低いページ
   - 表示回数は多いがクリックされないページ
   - モバイルユーザビリティの問題

---

## 🚨 注意事項

1. **プライバシーポリシーの更新**
   - Google Analyticsの使用を明記
   - クッキーの使用について記載
   - `/privacy` ページを更新

2. **Cookie同意バナー**
   - 必要に応じてCookie同意バナーを実装
   - EU圏のユーザーがいる場合は特に重要

3. **データ保持期間**
   - Google Analyticsのデータ保持期間を設定
   - プライバシーポリシーと整合性を保つ

---

## 📚 参考リンク

- [Google Analytics 4 ヘルプ](https://support.google.com/analytics/)
- [Google Search Console ヘルプ](https://support.google.com/webmasters/)
- [Next.js × Google Analytics](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)

