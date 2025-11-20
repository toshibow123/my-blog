import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 管理者ページへのアクセスをブロック（404を返す）
  if (pathname.startsWith("/admin")) {
    return new NextResponse(null, { status: 404 });
  }

  const response = NextResponse.next();

  // パス名をヘッダーに追加（レイアウトで使用）
  response.headers.set("x-pathname", pathname);

  // セキュリティヘッダーの追加（ミドルウェアレベル）
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // レート制限のヘッダー（必要に応じて）
  response.headers.set("X-RateLimit-Limit", "100");
  response.headers.set("X-RateLimit-Remaining", "99");

  return response;
}

// ミドルウェアを適用するパス
export const config = {
  matcher: [
    /*
     * 以下を除くすべてのリクエストパスにマッチ:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
