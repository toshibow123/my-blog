// 画像アップロード機能は無効化されました
// 管理者ページが無効化されたため、Supabase Storageへの画像アップロード機能も不要になりました
// 
// 画像の追加方法:
// 1. 画像ファイルを public/images/ ディレクトリに配置
// 2. MarkdownファイルのFront Matterに画像URLを記入
// 3. 本文中で [画像0], [画像1] の形式で参照

export async function uploadImage(): Promise<string> {
  throw new Error("画像アップロード機能は無効化されました。public/images/ ディレクトリに画像を配置してください。");
}

export async function deleteImage(): Promise<void> {
  throw new Error("画像削除機能は無効化されました。");
}

export async function deleteImages(): Promise<void> {
  throw new Error("画像削除機能は無効化されました。");
}
