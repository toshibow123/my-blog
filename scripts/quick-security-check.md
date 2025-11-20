# クイックセキュリティチェック

## 🚀 すぐに実行できるチェック

### 1. 依存関係の脆弱性チェック（5分）

```bash
npm audit
npm audit fix  # 自動修正可能なもの
```

### 2. オンラインツールでチェック（10分）

以下のサイトにURLを入力するだけ：

1. **SecurityHeaders.com**
   - URL: https://securityheaders.com/?q=https://www.toshiboh.com
   - セキュリティヘッダーの確認

2. **SSL Labs**
   - URL: https://www.ssllabs.com/ssltest/analyze.html?d=www.toshiboh.com
   - SSL/TLS証明書の評価

3. **Mozilla Observatory**
   - URL: https://observatory.mozilla.org/analyze/www.toshiboh.com
   - 総合的なセキュリティスコア

4. **Sucuri SiteCheck**
   - URL: https://sitecheck.sucuri.net/
   - マルウェアとブラックリストのチェック

### 3. コマンドラインでチェック（5分）

```bash
# セキュリティチェックスクリプトを実行
npm run security:check

# または直接実行
./scripts/security-check.sh https://www.toshiboh.com
```

### 4. ブラウザの開発者ツールでチェック（5分）

1. Chrome DevToolsを開く（F12）
2. **Network**タブを開く
3. ページをリロード
4. 任意のリクエストを選択
5. **Headers**タブでレスポンスヘッダーを確認
   - `X-Frame-Options`
   - `X-Content-Type-Options`
   - `Content-Security-Policy`
   - `Strict-Transport-Security`

## 📋 月次チェックリスト

毎月1回、以下をチェック：

- [ ] `npm audit` を実行
- [ ] SecurityHeaders.comでスコアを確認
- [ ] SSL Labsで証明書の有効期限を確認
- [ ] 依存関係を最新版に更新
- [ ] アクセスログを確認（異常なアクセスがないか）

## 🔍 詳細チェック（四半期ごと）

- [ ] OWASP ZAPでスキャン
- [ ] Burp Suiteで手動テスト
- [ ] ペネトレーションテストの実施
- [ ] セキュリティポリシーの見直し

