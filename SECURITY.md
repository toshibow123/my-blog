# セキュリティポリシー

## 現在のセキュリティ対策

### ✅ 実装済み

1. **セキュリティヘッダー**
   - `Strict-Transport-Security`: HTTPSの強制
   - `X-Frame-Options`: クリックジャッキング対策
   - `X-Content-Type-Options`: MIMEタイプスニッフィング対策
   - `X-XSS-Protection`: XSS攻撃対策
   - `Referrer-Policy`: リファラー情報の制御
   - `Content-Security-Policy`: コンテンツセキュリティポリシー

2. **Next.jsの標準セキュリティ機能**
   - Reactの自動XSS対策
   - TypeScriptによる型安全性
   - サーバーサイドレンダリング（SSR）

3. **環境変数の管理**
   - `.env.local`ファイルを使用（`.gitignore`に含まれている）
   - 機密情報の漏洩防止

### 📝 推奨される追加対策

#### 1. フォーム実装時の対策

お問い合わせフォームを実装する場合は、以下を実装してください：

- **入力検証**: クライアントサイドとサーバーサイドの両方で検証
- **サニタイゼーション**: HTMLタグの除去、特殊文字のエスケープ
- **レート制限**: スパム防止のため、送信回数を制限
- **reCAPTCHA**: ボット対策
- **CSRF対策**: Next.jsのCSRF保護機能を使用

#### 2. 依存関係の管理

定期的に依存関係の脆弱性をチェック：

```bash
npm audit
npm audit fix
```

#### 3. 環境変数の管理

機密情報は環境変数で管理：

```bash
# .env.local（.gitignoreに含まれている）
NEXT_PUBLIC_SITE_URL=https://www.toshiboh.com
CONTACT_EMAIL=your-email@example.com
```

#### 4. ログとモニタリング

- アクセスログの監視
- 異常なアクセスパターンの検出
- エラーログの監視

#### 5. 定期的な更新

- Next.jsと依存関係の定期的な更新
- セキュリティパッチの適用

## セキュリティ監査

定期的にセキュリティチェックを実施してください。詳細は `SECURITY_AUDIT.md` を参照してください。

### クイックチェック

```bash
# 依存関係の脆弱性チェック
npm audit

# セキュリティチェックスクリプトの実行
npm run security:check
```

### オンラインツール

- **SecurityHeaders.com**: https://securityheaders.com/?q=https://www.toshiboh.com
- **SSL Labs**: https://www.ssllabs.com/ssltest/analyze.html?d=www.toshiboh.com
- **Mozilla Observatory**: https://observatory.mozilla.org/analyze/www.toshiboh.com

## 脆弱性の報告

セキュリティ上の問題を発見した場合は、以下のメールアドレスまでご連絡ください：
contact@example.com

## 参考リンク

- [Next.js セキュリティ](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Content Security Policy](https://developer.mozilla.org/ja/docs/Web/HTTP/CSP)

