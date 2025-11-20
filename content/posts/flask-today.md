---
{
  "title": "今日やったFlaskのこと",
  "date": "2025年10月16日",
  "category": "プログラミング",
  "categorySlug": "programming",
  "tags": [
    "Python",
    "Flask"
  ],
  "excerpt": "DB_INFO = { 'user':'postgres', 'password':'', 'host':'localhost', 'name':'postgres' } SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg://{user}:{password}@{host}/{...",
  "slug": "flask-today",
  "published": true
}
---

# 今日やったFlaskのこと

こんばんは、トシぼうです。

今日はFlaskでデータベース接続の設定をやっていました。

```python
DB_INFO = {
    'user': 'postgres',
    'password': '',
    'host': 'localhost',
    'name': 'postgres'
}

SQLALCHEMY_DATABASE_URI = f'postgresql+psycopg://{DB_INFO["user"]}:{DB_INFO["password"]}@{DB_INFO["host"]}/{DB_INFO["name"]}'
```

PostgreSQLに接続する際の設定ですね。環境変数を使う方がセキュアですが、開発環境ではこのような設定でも問題ありません。

次回は、実際のデータベース操作について書こうと思います。