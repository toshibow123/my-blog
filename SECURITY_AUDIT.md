# セキュリティ監査ガイド（ホワイトハッカー視点）

このドキュメントは、自分のサイトをホワイトハッカー視点でセキュリティチェックする方法をまとめています。

## 🔍 チェック項目一覧

### 1. 依存関係の脆弱性チェック

```bash
# npmの脆弱性をチェック
npm audit

# 自動修正可能な脆弱性を修正
npm audit fix

# 詳細なレポートを生成
npm audit --json > audit-report.json
```

### 2. セキュリティヘッダーの確認

#### オンラインツール
- **SecurityHeaders.com**: https://securityheaders.com/
  - サイトURLを入力してセキュリティヘッダーをチェック
- **Mozilla Observatory**: https://observatory.mozilla.org/
  - より詳細なセキュリティスコアを取得

#### コマンドライン
```bash
# curlでヘッダーを確認
curl -I https://www.toshiboh.com

# セキュリティヘッダーのみを確認
curl -I https://www.toshiboh.com | grep -i "x-\|strict-transport\|content-security"
```

### 3. SSL/TLS証明書の確認

```bash
# SSL証明書の詳細を確認
openssl s_client -connect www.toshiboh.com:443 -showcerts

# SSL Labsでスコアを確認
# https://www.ssllabs.com/ssltest/analyze.html?d=www.toshiboh.com
```

### 4. 脆弱性スキャン

#### オンラインツール
- **OWASP ZAP**: https://www.zaproxy.org/
  - 無料のオープンソース脆弱性スキャナー
  - デスクトップアプリまたはDockerで実行可能
- **Burp Suite Community Edition**: https://portswigger.net/burp/communitydownload
  - プロフェッショナルなWebアプリケーションセキュリティテストツール
- **Nmap**: https://nmap.org/
  - ポートスキャンとサービス検出

#### コマンドライン
```bash
# Nmapでポートスキャン（自分のサーバーのみ）
nmap -sV -sC www.toshiboh.com

# Nikto（Webサーバースキャナー）
nikto -h www.toshiboh.com
```

### 5. コンテンツセキュリティポリシー（CSP）の確認

```bash
# CSPレポートを確認（ブラウザの開発者ツール）
# Chrome DevTools > Network > Headers > Response Headers
```

### 6. XSS（クロスサイトスクリプティング）テスト

手動テスト項目：
- 検索フォームに `<script>alert('XSS')</script>` を入力
- URLパラメータに `<img src=x onerror=alert(1)>` を追加
- コメント欄（あれば）にJavaScriptコードを入力

### 7. SQLインジェクションテスト

- 検索フォームに `' OR '1'='1` を入力
- URLパラメータに `'; DROP TABLE--` を追加

**注意**: このサイトは静的サイトなのでSQLインジェクションのリスクは低い

### 8. ディレクトリトラバーサルテスト

```bash
# 存在しないファイルへのアクセス
curl https://www.toshiboh.com/../../../etc/passwd
curl https://www.toshiboh.com/.env
curl https://www.toshiboh.com/package.json
```

### 9. 情報漏洩チェック

```bash
# ソースマップの確認（本番環境では無効化されているはず）
curl https://www.toshiboh.com/_next/static/chunks/main.js.map

# .gitディレクトリへのアクセス
curl https://www.toshiboh.com/.git/config

# バックアップファイルの確認
curl https://www.toshiboh.com/backup.sql
curl https://www.toshiboh.com/database.sql
```

### 10. レート制限のテスト

```bash
# 大量のリクエストを送信（自分のサイトのみ）
for i in {1..100}; do curl -I https://www.toshiboh.com; done
```

### 11. セッション管理の確認

- Cookieの設定（HttpOnly, Secure, SameSite）
- セッションタイムアウト
- CSRFトークンの有無

### 12. 認証・認可の確認

- パスワードポリシー
- 多要素認証（MFA）
- ログイン試行回数制限

**注意**: このサイトは認証機能がないため、該当なし

## 🛠️ 推奨ツール

### ブラウザ拡張機能
- **Wappalyzer**: 使用している技術スタックを確認
- **Cookie-Editor**: Cookieの設定を確認
- **ModHeader**: カスタムヘッダーを追加してテスト

### コマンドラインツール
- **curl**: HTTPリクエストの送信
- **wget**: ファイルのダウンロード
- **nmap**: ネットワークスキャン
- **nikto**: Webサーバーの脆弱性スキャン

### オンラインサービス
- **SecurityHeaders.com**: セキュリティヘッダーのチェック
- **SSL Labs**: SSL/TLS証明書の評価
- **Mozilla Observatory**: 総合的なセキュリティスコア
- **Sucuri SiteCheck**: マルウェアとブラックリストのチェック

## 📋 チェックリスト

### 基本セキュリティ
- [ ] 依存関係の脆弱性がないか確認
- [ ] セキュリティヘッダーが正しく設定されているか
- [ ] SSL/TLS証明書が有効で最新か
- [ ] ソースマップが本番環境で無効化されているか
- [ ] 環境変数がGitにコミットされていないか

### アプリケーションセキュリティ
- [ ] XSS対策が実装されているか
- [ ] CSRF対策が実装されているか（フォームがある場合）
- [ ] 入力検証が実装されているか
- [ ] エラーメッセージに機密情報が含まれていないか
- [ ] ログに機密情報が記録されていないか

### インフラストラクチャ
- [ ] 不要なポートが開いていないか
- [ ] ファイアウォールが適切に設定されているか
- [ ] バックアップが定期的に取得されているか
- [ ] アクセスログが監視されているか

## ⚠️ 注意事項

1. **自分のサイトのみをテストする**: 他人のサイトをテストする場合は、事前に許可を取得してください
2. **本番環境でのテストは慎重に**: 過度なリクエストはサーバーに負荷をかける可能性があります
3. **法的リスク**: 許可なく他人のサイトをテストすることは違法になる可能性があります

## 📚 参考リソース

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [Mozilla Web Security Guidelines](https://infosec.mozilla.org/guidelines/web_security)
- [Next.js Security Best Practices](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)

