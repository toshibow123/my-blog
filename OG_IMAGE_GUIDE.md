# 📸 OGP画像（og-image.jpg）作成ガイド

## OGP画像とは？

OGP（Open Graph Protocol）画像は、SNS（Twitter、Facebook、LINEなど）でリンクをシェアした時に表示されるサムネイル画像です。

## 📏 推奨サイズ

- **サイズ**: 1200 x 630 px
- **ファイル形式**: JPG または PNG
- **ファイル名**: `og-image.jpg`
- **配置場所**: `public/og-image.jpg`

## 🎨 デザインのポイント

### 必須要素
1. **ブログ名**: 「トシぼうのブログ」
2. **キャッチフレーズ**: 「節約しながらもマッチョをあきらめず、AIや資産形成も大好き」
3. **プロフィール画像**: `/public/profile.png` を使用
4. **背景色**: ダークグレー（#1F2937）+ ゴールドアクセント

### デザイン案

```
┌─────────────────────────────────────────┐
│                                         │
│    [プロフィール画像]                      │
│                                         │
│       トシぼうのブログ                      │
│   ━━━━━━━━━━━━━━━━━━━━                  │
│                                         │
│   節約しながらもマッチョをあきらめず、          │
│   AIや資産形成も大好き                      │
│                                         │
│   www.toshiboh.com                      │
│                                         │
└─────────────────────────────────────────┘
```

## 🛠️ 作成方法

### 方法1: Canva（おすすめ・無料）

1. [Canva](https://www.canva.com/) にアクセス
2. 「カスタムサイズ」→ 1200 x 630 px
3. 背景色を設定（#1F2937 ダークグレー）
4. テキストを追加:
   - タイトル: 「トシぼうのブログ」（フォントサイズ: 60-80px、太字）
   - サブタイトル: キャッチフレーズ（フォントサイズ: 30-40px）
   - URL: 「www.toshiboh.com」（フォントサイズ: 24px）
5. プロフィール画像をアップロード・配置
6. ゴールド色のアクセント（線やアイコン）を追加
7. ダウンロード → JPG形式 → `og-image.jpg` として保存

### 方法2: Figma（デザインツール）

1. [Figma](https://www.figma.com/) にアクセス
2. 新規ファイル作成 → 1200 x 630 px のフレームを作成
3. デザインを作成（Canvaと同様）
4. Export → JPG → `og-image.jpg`

### 方法3: Photoshop / GIMP

1. 新規ドキュメント作成（1200 x 630 px）
2. 背景レイヤーを塗りつぶし（#1F2937）
3. テキストとプロフィール画像を配置
4. JPG形式で保存 → `og-image.jpg`

### 方法4: オンラインツール

- [Placeit](https://placeit.net/)
- [Crello](https://crello.com/)
- [Snappa](https://snappa.com/)

## 📂 配置方法

作成した画像を以下に配置:

```bash
public/og-image.jpg
```

## ✅ 確認方法

### 1. ローカルでの確認

画像を配置後、以下のURLにアクセス:
```
http://localhost:3000/og-image.jpg
```

### 2. SNSでの表示確認

- **Facebook**: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- **Twitter**: [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- **LinkedIn**: [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

## 🎨 色の参考

現在のサイトデザインに合わせた配色:

- **背景**: `#1F2937` (gray-800)
- **テキスト**: `#FFFFFF` (white)
- **アクセント**: `#F59E0B` (yellow-500)
- **グラデーション**: `#F59E0B` → `#D97706` (yellow-500 → yellow-600)

## 💡 デザインのヒント

1. **シンプルに**: 情報を詰め込みすぎない
2. **読みやすく**: フォントサイズは大きめに
3. **ブランドカラー**: ゴールド/イエローを使う
4. **余白**: 十分な余白を確保
5. **プロフィール画像**: 目立つ位置に配置

## 📝 例文テンプレート

```
━━━━━━━━━━━━━━━━━━━━━━━━
    トシぼうのブログ
━━━━━━━━━━━━━━━━━━━━━━━━

節約しながらもマッチョをあきらめず、
AIや資産形成も大好き

プログラミング | 筋トレ | 北海道移住

www.toshiboh.com
```

## 🚀 完成後

1. `public/og-image.jpg` に配置
2. デプロイ
3. SNSでシェアして確認

画像が正しく表示されていれば完了です！

