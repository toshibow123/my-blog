// 認証機能は無効化されました
// 管理者ページが無効化されたため、認証機能も不要になりました

// すべての関数は無効化されています
export async function getCurrentUser() {
  return null;
}

export async function isAdmin(): Promise<boolean> {
  return false;
}
