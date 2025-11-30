---
{
  "title": "Python/Flask学習記録 - 環境構築からHello Worldまで",
  "date": "2025年10月15日",
  "category": "プログラミング",
  "categorySlug": "programming",
  "tags": [
    "Python",
    "Flask",
    "初心者",
    "環境構築"
  ],
  "excerpt": "未経験からエンジニアを目指して、PythonのWebフレームワーク「Flask」の学習を始めました。なぜDjangoではなくFlaskを選んだのか、そして最初の環境構築手順をまとめました。",
  "slug": "python-post",
  "published": true
}
---

# Python/Flask学習記録 - 環境構築からHello Worldまで

この記事は約4分で読めます。

## 結論

*   初心者は**DjangoよりもFlask**から入るのがおすすめ（構造がシンプルで理解しやすい）。
*   `venv` で仮想環境を作るのは必須習慣にしよう。

---

こんばんは、トシぼうです。

北海道はすっかり寒くなり、ストーブが恋しい季節になりました。
インドアで集中できるこの時期こそ、プログラミング学習に最適ですね。

さて、最近は**Python**を使ったWebアプリケーション開発の勉強に力を入れています。
今回は、私が学習中のフレームワーク**「Flask」**について、選んだ理由と環境構築の備忘録をシェアします。

## なぜDjangoではなくFlaskなのか？

PythonのWebフレームワークといえば「Django」が有名ですが、私はあえて**Flask**を選びました。

### 理由1: マイクロフレームワークであること

Djangoは「フルスタック」で何でも揃っていますが、その分ブラックボックスが多く、裏側で何が起きているか理解しにくいと感じました。

一方、Flaskは**「必要な機能だけを自分で追加していく」**スタイルです。
Webアプリの仕組み（ルーティング、リクエスト処理、テンプレート描画など）を一つ一つ理解しながら進められるので、初学者の学習用として最適だと判断しました。

### 理由2: コード量が少なくて済む

「Hello World」を表示するだけなら、Flaskはたった数行で書けます。

## Flask環境構築の手順

Macでの環境構築手順をメモしておきます。

### 1. プロジェクトディレクトリの作成

```bash
mkdir my-flask-app
cd my-flask-app
```

### 2. 仮想環境の作成と有効化

Pythonのプロジェクトごとにライブラリを管理するため、`venv`を使います。

```bash
# 仮想環境の作成
python3 -m venv venv

# 有効化（プロンプトの先頭に (venv) が表示されればOK）
source venv/bin/activate
```

### 3. Flaskのインストール

```bash
pip install flask
```

## 最初のFlaskアプリを作る

`app.py` というファイルを作成し、以下のコードを記述します。

```python
from flask import Flask

# Flaskクラスのインスタンスを作成
app = Flask(__name__)

# ルーティングの設定
# '/' にアクセスがあったら hello() 関数を実行する
@app.route('/')
def hello():
    return '<h1>Hello, Flask!</h1><p>北海道から愛を込めて。</p>'

# アプリケーションの実行
if __name__ == '__main__':
    # debug=True にすると、コード変更時に自動リロードされる
    app.run(debug=True)
```

### 実行してみる

ターミナルで以下を実行します。

```bash
python app.py
```

ブラウザで `http://127.0.0.1:5000/` にアクセスすると...
無事、「Hello, Flask!」が表示されました！

## 今後の学習計画

まずはこのFlaskを使って、簡単な**「家計簿アプリ」**を作ってみようと思います。
データベース（SQLiteやPostgreSQL）との連携も必要になるので、SQLの勉強も並行して進めていきます。

同じように未経験からエンジニアを目指している方、一緒に頑張りましょう！
