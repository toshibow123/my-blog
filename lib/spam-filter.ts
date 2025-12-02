// スパム検出用の簡単なフィルター

const spamKeywords = [
  'buy now',
  'click here',
  'limited time',
  'act now',
  'free money',
  'make money fast',
  'work from home',
  'get rich',
];

const suspiciousPatterns = [
  /https?:\/\//, // URL
  /www\./, // www
  /[A-Z]{5,}/, // 大文字の連続（5文字以上）
  /[!@#$%^&*()_+=\[\]{}|;':"\\,.<>\/?]{3,}/, // 特殊文字の連続
];

export function detectSpam(content: string): {
  isSpam: boolean;
  reason?: string;
} {
  const lowerContent = content.toLowerCase();
  const trimmedContent = content.trim();

  // 空のコメント
  if (trimmedContent.length === 0) {
    return { isSpam: true, reason: 'Empty comment' };
  }

  // 短すぎるコメント（3文字未満）
  if (trimmedContent.length < 3) {
    return { isSpam: true, reason: 'Comment too short' };
  }

  // 長すぎるコメント（1000文字以上）
  if (trimmedContent.length > 1000) {
    return { isSpam: true, reason: 'Comment too long' };
  }

  // スパムキーワードチェック
  for (const keyword of spamKeywords) {
    if (lowerContent.includes(keyword)) {
      return { isSpam: true, reason: `Contains spam keyword: ${keyword}` };
    }
  }

  // 疑わしいパターンチェック
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(content)) {
      // URLは自動的にスパム扱い（または承認制にする）
      if (pattern.source.includes('https?://')) {
        return { isSpam: true, reason: 'Contains URL (requires moderation)' };
      }
      // その他のパターンは警告のみ（承認制にする）
      return { isSpam: false, reason: 'Suspicious pattern detected' };
    }
  }

  return { isSpam: false };
}

