"use client";

import Script from "next/script";
import { useEffect } from "react";

export default function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  useEffect(() => {
    if (!measurementId) {
      console.warn("Google Analytics: 測定IDが設定されていません");
      return;
    }
    console.log("Google Analytics: 測定ID", measurementId);
  }, [measurementId]);

  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
        onLoad={() => {
          console.log("Google Analytics: スクリプトが読み込まれました", measurementId);
        }}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
          });
          console.log('Google Analytics: 初期化完了', '${measurementId}');
        `}
      </Script>
    </>
  );
}

