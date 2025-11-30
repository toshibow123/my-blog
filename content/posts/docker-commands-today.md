---
{
  "title": "今日覚えたDockerコマンド - 初心者メモ",
  "date": "2025年11月27日",
  "category": "プログラミング",
  "categorySlug": "programming",
  "tags": [
    "Docker",
    "初心者",
    "開発"
  ],
  "excerpt": "今日覚えたDockerコマンドをメモ。docker compose up、up -d、docker-compose down、docker ps、grepでの検索など、実際に使ったコマンドをまとめました。",
  "slug": "docker-commands-today",
  "published": true
}
---

# 今日覚えたDockerコマンド - 初心者メモ

こんばんは、トシぼうです！

今日はDockerのコマンドをいくつか覚えたので、備忘録としてまとめておきます。

同じ初心者の方の参考になれば嬉しいです！

## 基本的なDocker Composeコマンド

### docker compose up

コンテナを起動するコマンドです。

```bash
docker compose up
```

これでコンテナが起動します。ログがリアルタイムで表示されるので、何かエラーがあったらすぐにわかります。

### docker compose up -d

バックグラウンドで起動するコマンドです。

```bash
docker compose up -d
```

`-d`オプションをつけると、バックグラウンドで動くので、ターミナルが使えるようになります。開発中はこっちの方が便利かも。

### docker-compose down

コンテナを停止・削除するコマンドです。

```bash
docker-compose down
```

コンテナを停止して、削除してくれます。変更を反映させたいときは、これで一度落としてから、また`up`します。

## コンテナの状態を確認

### docker ps

実行中のコンテナを確認するコマンドです。

```bash
docker ps
```

今動いているコンテナの一覧が見れます。コンテナ名や状態、ポート番号などが表示されます。

### grepで検索

特定のコンテナだけを探したいときは、`grep`と組み合わせます。

```bash
docker ps | grep "文字"
```

「文字」を含むコンテナだけを表示してくれます。コンテナがたくさんあるときに便利です。

## Docker内で変更があったら

Docker内で何か変更があったら、**downしてup**するのが基本です。

```bash
docker-compose down
docker compose up -d
```

これで変更が反映されます。シンプルだけど、これが一番確実です。

## CUIに慣れてない場合

CUI（コマンドライン）に慣れてない場合は、**WinSCP**でフォルダ移動とかするのもアリです。

GUIで操作できるので、初心者のうちはこっちの方がわかりやすいかもしれません。

## 反映がうまくいかない場合

Dockerの反映がうまくいかない場合は、**一回削除してから立ち上げ直したら**うまくいったりしたこともありました。

```bash
docker-compose down
docker compose up -d --build
```

`--build`オプションをつけると、イメージを再ビルドしてくれます。

それでもダメな場合は、完全に削除してからやり直すのも手です。

## まとめ

今日覚えたDockerコマンドはこんな感じです。

- `docker compose up` - 起動
- `docker compose up -d` - バックグラウンドで起動
- `docker-compose down` - 停止・削除
- `docker ps` - 実行中のコンテナ確認
- `docker ps | grep "文字"` - 検索

まだまだ覚えることが多いけど、一つずつ覚えていきます！

同じ初心者の方、一緒にがんばりましょう！

