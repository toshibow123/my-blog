-- コメントテーブル作成
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  post_slug TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_email TEXT,
  author_ip TEXT, -- レート制限用（オプション）
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'spam')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス追加（パフォーマンス向上）
CREATE INDEX IF NOT EXISTS idx_comments_post_slug ON comments(post_slug);
CREATE INDEX IF NOT EXISTS idx_comments_status ON comments(status);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_author_ip ON comments(author_ip);

-- レート制限チェック関数
CREATE OR REPLACE FUNCTION check_rate_limit()
RETURNS TRIGGER AS $$
DECLARE
  comment_count INTEGER;
BEGIN
  -- 同じIPアドレスから1時間に5件まで
  IF NEW.author_ip IS NOT NULL THEN
    SELECT COUNT(*) INTO comment_count
    FROM comments
    WHERE author_ip = NEW.author_ip
      AND created_at > NOW() - INTERVAL '1 hour';
    
    IF comment_count >= 5 THEN
      RAISE EXCEPTION 'Rate limit exceeded. Please wait before posting again.';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- レート制限トリガー
DROP TRIGGER IF EXISTS rate_limit_trigger ON comments;
CREATE TRIGGER rate_limit_trigger
BEFORE INSERT ON comments
FOR EACH ROW
EXECUTE FUNCTION check_rate_limit();

-- 更新日時を自動更新する関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 更新日時トリガー
DROP TRIGGER IF EXISTS update_comments_updated_at ON comments;
CREATE TRIGGER update_comments_updated_at
BEFORE UPDATE ON comments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) の設定
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- 誰でもコメントを投稿できる（INSERT）
CREATE POLICY "Anyone can insert comments"
ON comments FOR INSERT
TO authenticated, anon
WITH CHECK (true);

-- 承認済みコメントは誰でも閲覧可能（SELECT）
CREATE POLICY "Anyone can view approved comments"
ON comments FOR SELECT
TO authenticated, anon
USING (status = 'approved');

-- 管理者は全コメントを閲覧・更新可能（後で認証を追加する場合）
-- CREATE POLICY "Admins can manage all comments"
-- ON comments FOR ALL
-- TO authenticated
-- USING (auth.jwt() ->> 'role' = 'admin');

