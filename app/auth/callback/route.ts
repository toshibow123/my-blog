import { NextRequest, NextResponse } from "next/server";

// OAuthコールバックは無効化されています
// 管理者ページが無効化されたため、認証機能も不要になりました
export async function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/", request.url));
}
