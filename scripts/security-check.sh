#!/bin/bash

# セキュリティチェックスクリプト
# 使用方法: ./scripts/security-check.sh https://www.toshiboh.com

SITE_URL="${1:-https://www.toshiboh.com}"

echo "🔒 セキュリティチェックを開始します..."
echo "対象サイト: $SITE_URL"
echo ""

# 1. 依存関係の脆弱性チェック
echo "📦 1. 依存関係の脆弱性チェック"
echo "----------------------------------------"
if command -v npm &> /dev/null; then
    npm audit --audit-level=moderate
else
    echo "⚠️  npmがインストールされていません"
fi
echo ""

# 2. セキュリティヘッダーの確認
echo "🛡️  2. セキュリティヘッダーの確認"
echo "----------------------------------------"
if command -v curl &> /dev/null; then
    echo "レスポンスヘッダー:"
    curl -I "$SITE_URL" 2>/dev/null | grep -i "x-\|strict-transport\|content-security\|referrer-policy" || echo "セキュリティヘッダーが見つかりません"
else
    echo "⚠️  curlがインストールされていません"
fi
echo ""

# 3. SSL証明書の確認
echo "🔐 3. SSL証明書の確認"
echo "----------------------------------------"
if command -v openssl &> /dev/null; then
    DOMAIN=$(echo "$SITE_URL" | sed -e 's|^[^/]*//||' -e 's|/.*$||')
    echo "証明書の有効期限:"
    echo | openssl s_client -connect "$DOMAIN:443" -servername "$DOMAIN" 2>/dev/null | openssl x509 -noout -dates || echo "証明書情報を取得できませんでした"
else
    echo "⚠️  opensslがインストールされていません"
fi
echo ""

# 4. 情報漏洩チェック
echo "🔍 4. 情報漏洩チェック"
echo "----------------------------------------"
DOMAIN=$(echo "$SITE_URL" | sed -e 's|^[^/]*//||' -e 's|/.*$||')

# .envファイルのチェック
echo "チェック中: .envファイル"
if curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/.env" | grep -q "200"; then
    echo "⚠️  警告: .envファイルが公開されています！"
else
    echo "✅ .envファイルは公開されていません"
fi

# .gitディレクトリのチェック
echo "チェック中: .gitディレクトリ"
if curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/.git/config" | grep -q "200"; then
    echo "⚠️  警告: .gitディレクトリが公開されています！"
else
    echo "✅ .gitディレクトリは公開されていません"
fi

# package.jsonのチェック
echo "チェック中: package.json"
if curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/package.json" | grep -q "200"; then
    echo "⚠️  警告: package.jsonが公開されています！"
else
    echo "✅ package.jsonは公開されていません"
fi

# ソースマップのチェック
echo "チェック中: ソースマップ"
if curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/_next/static/chunks/main.js.map" | grep -q "200"; then
    echo "⚠️  警告: ソースマップが公開されています！"
else
    echo "✅ ソースマップは公開されていません"
fi
echo ""

# 5. セキュリティヘッダーの詳細チェック
echo "🛡️  5. セキュリティヘッダーの詳細チェック"
echo "----------------------------------------"
if command -v curl &> /dev/null; then
    HEADERS=$(curl -I "$SITE_URL" 2>/dev/null)
    
    # 各ヘッダーのチェック
    echo "$HEADERS" | grep -i "strict-transport-security" > /dev/null && echo "✅ Strict-Transport-Security: 設定済み" || echo "⚠️  Strict-Transport-Security: 未設定"
    echo "$HEADERS" | grep -i "x-frame-options" > /dev/null && echo "✅ X-Frame-Options: 設定済み" || echo "⚠️  X-Frame-Options: 未設定"
    echo "$HEADERS" | grep -i "x-content-type-options" > /dev/null && echo "✅ X-Content-Type-Options: 設定済み" || echo "⚠️  X-Content-Type-Options: 未設定"
    echo "$HEADERS" | grep -i "x-xss-protection" > /dev/null && echo "✅ X-XSS-Protection: 設定済み" || echo "⚠️  X-XSS-Protection: 未設定"
    echo "$HEADERS" | grep -i "content-security-policy" > /dev/null && echo "✅ Content-Security-Policy: 設定済み" || echo "⚠️  Content-Security-Policy: 未設定"
    echo "$HEADERS" | grep -i "referrer-policy" > /dev/null && echo "✅ Referrer-Policy: 設定済み" || echo "⚠️  Referrer-Policy: 未設定"
fi
echo ""

echo "✅ セキュリティチェックが完了しました"
echo ""
echo "📚 追加のチェック方法:"
echo "   - SecurityHeaders.com: https://securityheaders.com/?q=$SITE_URL"
echo "   - SSL Labs: https://www.ssllabs.com/ssltest/analyze.html?d=$DOMAIN"
echo "   - Mozilla Observatory: https://observatory.mozilla.org/analyze/$DOMAIN"

