# 📝 記事の書き方ガイド

## 基本的な手順

### 1. 新しいMarkdownファイルを作成

`content/posts/` ディレクトリに、新しい `.md` ファイルを作成します。

ファイル名は、URLスラッグとして使われるので、英数字とハイフンで構成することをおすすめします。

**例：**
- ✅ `my-first-article.md`
- ✅ `python-tutorial-2025.md`
- ❌ `記事1.md`（日本語は避ける）
- ❌ `my article.md`（スペースは避ける）

### 2. Front Matterを記入

ファイルの先頭に、`---` で囲まれたFront Matterを記入します。

```markdown
---
title: "記事のタイトル"
date: "2025年1月15日"
category: "プログラミング"
categorySlug: "programming"
tags: ["Python", "Flask"]
excerpt: "記事の要約文です。"
published: true
---
```

### 3. 本文を書く

Front Matterの下に、Markdown形式で本文を書きます。

```markdown
# 記事のタイトル

こんにちは、トシぼうです。

この記事では...
```

## Front Matterの詳細説明

### 必須項目

- **title**: 記事のタイトル（文字列）
- **date**: 公開日（日本語形式、例: "2025年1月15日"）
- **category**: カテゴリー名（表示用、例: "プログラミング"）
- **categorySlug**: カテゴリーのスラッグ（URL用、例: "programming"）
- **tags**: タグの配列（例: `["Python", "Flask"]`）
- **excerpt**: 記事の要約（一覧表示で使用）

### オプション項目

- **slug**: URLスラッグ（通常はファイル名から自動生成されるため、省略可能）
- **hero_image**: ヒーロー画像のURL（例: `"/images/hero.jpg"`）
- **images**: 文中画像のURL配列（例: `["/images/img1.jpg", "/images/img2.jpg"]`）
- **published**: 公開フラグ（`true` または `false`、デフォルト: `true`）

## カテゴリーとタグ

### カテゴリー

既存のカテゴリーを使用するか、新しいカテゴリーを作成できます。

**既存のカテゴリー例：**
- `category: "プログラミング"`, `categorySlug: "programming"`
- `category: "節約"`, `categorySlug: "saving"`
- `category: "筋トレ"`, `categorySlug: "fitness"`
- `category: "AI"`, `categorySlug: "ai"`
- `category: "資産形成"`, `categorySlug: "investment"`
- `category: "移住"`, `categorySlug: "migration"`

### タグ

タグは配列形式で記入します。複数のタグを追加できます。

```markdown
tags: ["Python", "Flask", "Web開発"]
```

## 画像の追加方法

### 1. 画像ファイルを配置

画像ファイルを `public/images/` ディレクトリに配置します。

**例：**
```
public/
  images/
    hero.jpg
    screenshot1.png
    diagram.png
    chicken-breast.jpg
```

### 2. 利用可能な画像を確認

ターミナルで以下のコマンドを実行すると、利用可能な画像ファイルの一覧が表示されます：

```bash
npm run list:images
```

### 3. ヒーロー画像を追加

記事の先頭に表示される大きな画像を追加する場合：

**方法1: ファイル名だけ指定（推奨）**
```markdown
---
hero_image: "hero.jpg"
---
```

**方法2: フルパス指定**
```markdown
---
hero_image: "/images/hero.jpg"
---
```

**方法3: 外部URL**
```markdown
---
hero_image: "https://example.com/image.jpg"
---
```

### 4. 文中画像を追加

#### 方法A: Markdown記法（最も簡単・推奨）

本文中に直接書くだけ：

```markdown
![画像の説明](chicken-breast.jpg)
```

ファイル名だけ指定すると、自動的に `/images/` が付きます！

**例：**
- `![説明](chicken-breast.jpg)` → `/images/chicken-breast.jpg`
- `![説明](/images/chicken-breast.jpg)` → `/images/chicken-breast.jpg`（そのまま）
- `![説明](https://example.com/image.jpg)` → `https://example.com/image.jpg`（外部URL）

#### 方法B: プレースホルダー方式

1. **Front Matterに画像URLを追加**
   ```markdown
   ---
   images: ["screenshot1.png", "diagram.png"]
   ---
   ```
   ファイル名だけ指定すると、自動的に `/images/` が付きます！

2. **本文中で参照**
   ```markdown
   説明文...
   
   [画像0]  <!-- 最初の画像（screenshot1.png） -->
   
   続きの説明...
   
   [画像1]  <!-- 2番目の画像（diagram.png） -->
   ```

### 💡 画像の使い方のコツ

- **ファイル名だけ指定**: `hero_image: "hero.jpg"` や `![説明](image.jpg)` と書くだけでOK
- **外部URLも使える**: `https://example.com/image.jpg` のような外部URLも使用可能
- **画像一覧を確認**: `npm run list:images` で利用可能な画像を確認できます

## Markdown記法の例

### 見出し

```markdown
# 大見出し（H1）
## 中見出し（H2）
### 小見出し（H3）
```

### リスト

```markdown
- 箇条書き1
- 箇条書き2
- 箇条書き3

1. 番号付きリスト1
2. 番号付きリスト2
3. 番号付きリスト3
```

### 強調

```markdown
**太字**
*斜体*
~~取り消し線~~
```

### リンク

```markdown
[リンクテキスト](https://example.com)
```

### コード

```markdown
インラインコード: `const x = 10;`

コードブロック:
```python
def hello():
    print("Hello, World!")
```
```

### 引用

```markdown
> これは引用文です。
```

### 水平線

```markdown
---
```

## 実際の例

`content/posts/example-article.md` を参考にしてください。

## 記事を公開する手順

1. **Markdownファイルを作成・編集**
   - `content/posts/` に `.md` ファイルを作成
   - Front Matterと本文を記入

2. **Gitでコミット**
   ```bash
   git add content/posts/新しい記事.md
   git commit -m "新しい記事を追加"
   ```

3. **GitHubにプッシュ**
   ```bash
   git push
   ```

4. **自動デプロイ**
   - Vercelなどのホスティングサービスが自動的にビルド・デプロイします
   - 数分でサイトに反映されます

## よくある質問

### Q: ファイル名は何でもいいの？

A: ファイル名はURLスラッグとして使われます。英数字とハイフンで構成することをおすすめします。

### Q: 日付の形式は？

A: 日本語形式で記入してください。例: "2025年1月15日"

### Q: 下書きとして保存したい

A: `published: false` を設定すると、非公開になります。

### Q: 画像はどこに置けばいい？

A: `public/images/` ディレクトリに配置してください。

### Q: 既存のSupabaseデータを移行したい

A: 以下のコマンドを実行してください：
```bash
npm run export:markdown
```

