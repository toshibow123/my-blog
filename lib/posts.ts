// 記事データの型定義
export interface Post {
  id: number;
  title: string;
  date: string;
  category: string;
  categorySlug: string;
  tags: string[];
  excerpt: string;
  slug: string;
  content?: string;
}

// カテゴリーのマッピング
export const categoryMap: Record<string, string> = {
  programming: "プログラミング",
  migration: "移住",
  saving: "節約",
  fitness: "筋トレ",
  ai: "AI",
  investment: "資産形成",
  uncategorized: "未分類",
};

// タグのマッピング
export const tagMap: Record<string, string> = {
  python: "Python",
  flask: "Flask",
  hokkaido: "北海道",
  saving: "節約",
  fitness: "筋トレ",
  "筋トレ": "筋トレ",
  ai: "AI",
  investment: "資産形成",
  poker: "ポーカー",
  "ポーカー": "ポーカー",
};

// 記事のコンテンツデータ
const postContents: Record<string, string> = {
  "flask-today": `
# 今日やったFlaskのこと

こんばんは、トシぼうです。

今日はFlaskでデータベース接続の設定をやっていました。

\`\`\`python
DB_INFO = {
    'user': 'postgres',
    'password': '',
    'host': 'localhost',
    'name': 'postgres'
}

SQLALCHEMY_DATABASE_URI = f'postgresql+psycopg://{DB_INFO["user"]}:{DB_INFO["password"]}@{DB_INFO["host"]}/{DB_INFO["name"]}'
\`\`\`

PostgreSQLに接続する際の設定ですね。環境変数を使う方がセキュアですが、開発環境ではこのような設定でも問題ありません。

次回は、実際のデータベース操作について書こうと思います。
  `.trim(),
  "python-post": `
# 久々投稿 + Python

こんばんは、トシぼうです。

皆様いかがお過ごしでしょうか？

北海道は暑い時期を一瞬で乗り越え、8月後半には既に涼しく、9月は本当に毎日が快適で、10月の今となってはもう寒いです笑

なんならもう毛布出してますし、知人は暖房つけてますｗ

北海道はそんな都市ですｗ

暑さと湿気で前髪が決まらないあなた、絶対北海道住んだほうがいいですよ。

さて、今日はPythonの話でもしようかなと思います。

最近、PythonでWebアプリケーションを作る機会が増えてきました。FlaskやDjangoなど、フレームワークも充実していて、開発が楽しいです。

次回は、実際に作ったアプリケーションについて書こうと思います。
  `.trim(),
  "saving-fitness": `
# 【節約】【筋トレ】北海道で節約しながら体鍛えるなら

こんばんは。

今日はタイトル通りのこと話します。

実は私は、筋トレが趣味です。(趣味というか本当はやりたくないけど様々なプラス効果があるのでやってますｗ

黒子のバスケの紫原が言った

「嫌いだよ、練習なんて」
「ただ負けるのはもっと嫌いなの」

まさにこの精神でやってます。

そんな感じで筋トレをやってると絡んでくる食費上昇問題。

でも、北海道なら安い食材が手に入るので、節約しながらもタンパク質をしっかり摂取できます。

次回は、具体的な節約方法について書こうと思います。
  `.trim(),
  "saving-sapporo": `
# 【節約話】札幌住まいならここを利用して！

はい、ということで今回は節約の話。

札幌にお住まいの方なら地下鉄使えると思いますけど、めっちゃおすすめの場所あります。

それは・・・

大通駅の図書館「札幌市民交流プラザ」

ここはフリーWi-Fi、作業スペース、電源完備で、しかも無料！

カフェ代を節約したい方には最適な場所です。

ぜひ利用してみてください。
  `.trim(),
  "poker": `
# ポーカーに行った話

お盆中暇だったから、かねてからやりたかったポーカーをすすきのにやりに行った。

夜のすすきのは東京住まいの時の出張ぶり。

華やかだけどめっちゃごちゃついてるわけじゃなくてほど良い。

なんていうか、昔の歌舞伎町や池袋の感じの規模を小さくした感じがいいんだよなぁ。

話は戻すけど、すすきのに到着してからポーカーができる店を検索して、行ってみました。

結果は...まあ、楽しかったですｗ

また行きたいな。
  `.trim(),
};

// 全記事データ
export const allPosts: Post[] = [
  {
    id: 1,
    title: "今日やったFlaskのこと",
    date: "2025年10月16日",
    category: "プログラミング",
    categorySlug: "programming",
    tags: ["Python", "Flask"],
    excerpt: "DB_INFO = { 'user':'postgres', 'password':'', 'host':'localhost', 'name':'postgres' } SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg://{user}:{password}@{host}/{...",
    slug: "flask-today",
    content: postContents["flask-today"],
  },
  {
    id: 2,
    title: "久々投稿 + Python",
    date: "2025年10月15日",
    category: "未分類",
    categorySlug: "uncategorized",
    tags: ["Python"],
    excerpt: "こんばんは、トシぼうです。 皆様いかがお過ごしでしょうか？ 北海道は暑い時期を一瞬で乗り越え、8月後半には既に涼しく、9月は本当に毎日が快適で、 10月の今となってはもう寒いです笑...",
    slug: "python-post",
    content: postContents["python-post"],
  },
  {
    id: 3,
    title: "【節約】【筋トレ】北海道で節約しながら体鍛えるなら",
    date: "2025年8月21日",
    category: "未分類",
    categorySlug: "uncategorized",
    tags: ["節約", "筋トレ", "北海道"],
    excerpt: "こんばんは。今日はタイトル通りのこと話します。実は私は、筋トレが趣味です。",
    slug: "saving-fitness",
    content: postContents["saving-fitness"],
  },
  {
    id: 4,
    title: "【節約話】札幌住まいならここを利用して！",
    date: "2025年8月20日",
    category: "未分類",
    categorySlug: "uncategorized",
    tags: ["節約", "北海道"],
    excerpt: "はい、ということで今回は節約の話。札幌にお住まいの方なら地下鉄使えると思いますけど、めっちゃおすすめの場所あります。",
    slug: "saving-sapporo",
    content: postContents["saving-sapporo"],
  },
  {
    id: 5,
    title: "ポーカーに行った話",
    date: "2025年8月19日",
    category: "未分類",
    categorySlug: "uncategorized",
    tags: ["ポーカー"],
    excerpt: "お盆中暇だったから、かねてからやりたかったポーカーをすすきのにやりに行った。",
    slug: "poker",
    content: postContents["poker"],
  },
];

// スラッグで記事を取得
export function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find((post) => post.slug === slug);
}

// 関連記事を取得（同じカテゴリーまたはタグが共通する記事）
export function getRelatedPosts(slug: string, limit: number = 3): Post[] {
  const post = getPostBySlug(slug);
  if (!post) return [];

  const related = allPosts
    .filter((p) => {
      if (p.slug === slug) return false;
      // 同じカテゴリーまたは共通のタグがある記事
      return (
        p.categorySlug === post.categorySlug ||
        p.tags.some((tag) => post.tags.includes(tag))
      );
    })
    .slice(0, limit);

  return related;
}

// 前後の記事を取得
export function getAdjacentPosts(slug: string): {
  prev: Post | null;
  next: Post | null;
} {
  const index = allPosts.findIndex((post) => post.slug === slug);
  if (index === -1) return { prev: null, next: null };

  return {
    prev: index > 0 ? allPosts[index - 1] : null,
    next: index < allPosts.length - 1 ? allPosts[index + 1] : null,
  };
}

// 読了時間を計算（1分あたり200文字）
export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return minutes;
}

// カテゴリーで記事を取得
export function getPostsByCategory(categorySlug: string): Post[] {
  return allPosts.filter((post) => post.categorySlug === categorySlug);
}

// タグで記事を取得
export function getPostsByTag(tagSlug: string): Post[] {
  const tagName = tagMap[tagSlug] || tagSlug;
  return allPosts.filter((post) =>
    post.tags.some((tag) => {
      const tagLower = tag.toLowerCase();
      const slugLower = tagSlug.toLowerCase();
      const nameLower = tagName.toLowerCase();
      return tagLower === nameLower || tagLower === slugLower || tag === tagName || tag === tagSlug;
    })
  );
}

// 全カテゴリーを取得
export function getAllCategories() {
  const categories = new Set(allPosts.map((post) => post.categorySlug));
  return Array.from(categories).map((slug) => ({
    slug,
    name: categoryMap[slug] || slug,
    count: allPosts.filter((post) => post.categorySlug === slug).length,
  }));
}

// 全タグを取得
export function getAllTags() {
  const tagCounts: Record<string, { count: number; name: string }> = {};
  allPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      const tagKey = tag.toLowerCase();
      if (!tagCounts[tagKey]) {
        tagCounts[tagKey] = {
          count: 0,
          name: tagMap[tagKey] || tag,
        };
      }
      tagCounts[tagKey].count += 1;
    });
  });
  return Object.entries(tagCounts)
    .map(([slug, data]) => ({
      slug,
      name: data.name,
      count: data.count,
    }))
    .sort((a, b) => b.count - a.count);
}

