# Supabase APIキーの取得方法

## 📍 Project URLの場所

### 手順

1. **Supabaseダッシュボードにログイン**
   - https://supabase.com/dashboard にアクセス

2. **プロジェクトを選択**
   - 左側のサイドバーからプロジェクトを選択
   - または、プロジェクト一覧から選択

3. **Settings（設定）を開く**
   - 左側のサイドバーの一番下にある **⚙️ Settings** をクリック

4. **APIセクションを開く**
   - Settingsメニューの中から **「API」** をクリック

5. **Project URLを確認**
   - ページの上部に **「Project URL」** という項目があります
   - 例: `https://pmyalmtplwbzxlpffcmf.supabase.co`
   - このURLをコピーして `.env.local` の `NEXT_PUBLIC_SUPABASE_URL` に貼り付け

## 📋 各キーの場所

### 1. Project URL
- **場所**: Settings → API → **Project URL**
- **用途**: `NEXT_PUBLIC_SUPABASE_URL`
- **形式**: `https://xxxxx.supabase.co`

### 2. anon public キー
- **場所**: Settings → API → **Project API keys** → **anon public**
- **用途**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **形式**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`（長い文字列）

### 3. service_role キー
- **場所**: Settings → API → **Project API keys** → **service_role**
- **用途**: `SUPABASE_SERVICE_ROLE_KEY`
- **形式**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`（長い文字列）
- **⚠️ 重要**: このキーは「Reveal」ボタンをクリックしないと表示されません

## 🔍 見つからない場合

もし「Settings」が見つからない場合：

1. **左側のサイドバーを確認**
   - 一番下にスクロールすると「Settings」があります
   - 歯車アイコン（⚙️）が目印です

2. **プロジェクトが選択されているか確認**
   - ダッシュボードの左上にプロジェクト名が表示されているか確認

3. **別の場所からアクセス**
   - プロジェクトを選択した後、URLが `https://supabase.com/dashboard/project/xxxxx` のようになっているか確認

## 📸 画面の構成（参考）

```
Supabaseダッシュボード
├── 左側サイドバー
│   ├── Table Editor
│   ├── SQL Editor
│   ├── Authentication
│   ├── Storage
│   ├── ...
│   └── ⚙️ Settings ← ここをクリック
│       ├── General
│       ├── API ← ここをクリック
│       ├── Database
│       └── ...
└── メインエリア
    └── API Settings
        ├── Project URL ← ここに表示
        └── Project API keys
            ├── anon public ← ここに表示
            └── service_role ← 「Reveal」で表示
```

## 💡 ヒント

- **Project URL** は通常、プロジェクト名から推測できます
- 例: プロジェクト名が `myblog` の場合、URLは `https://myblog.supabase.co` のようになります
- ただし、実際のURLはSupabaseが自動生成するため、ダッシュボードで確認するのが確実です

