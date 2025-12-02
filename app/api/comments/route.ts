import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { detectSpam } from '@/lib/spam-filter';

// レート制限用のインメモリキャッシュ（本番環境ではRedis推奨）
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): { allowed: boolean; message?: string } {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1時間
  const maxRequests = 5;

  const requests = rateLimitMap.get(ip) || [];
  const recentRequests = requests.filter((time) => now - time < windowMs);

  if (recentRequests.length >= maxRequests) {
    return {
      allowed: false,
      message: 'レート制限に達しました。1時間後に再度お試しください。',
    };
  }

  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  return { allowed: true };
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0] ||
      req.headers.get('x-real-ip') ||
      'unknown';

    // レート制限チェック
    const rateLimitCheck = checkRateLimit(ip);
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        { error: rateLimitCheck.message },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { postSlug, authorName, authorEmail, content } = body;

    // バリデーション
    if (!postSlug || !authorName || !content) {
      return NextResponse.json(
        { error: '必須項目が不足しています' },
        { status: 400 }
      );
    }

    if (authorName.length > 50) {
      return NextResponse.json(
        { error: 'お名前は50文字以内で入力してください' },
        { status: 400 }
      );
    }

    if (content.length < 3 || content.length > 1000) {
      return NextResponse.json(
        { error: 'コメントは3文字以上1000文字以内で入力してください' },
        { status: 400 }
      );
    }

    // スパム検出
    const spamCheck = detectSpam(content);
    if (spamCheck.isSpam) {
      // スパムと判定された場合は、statusを'spam'にする
      const status = spamCheck.reason?.includes('URL') ? 'pending' : 'spam';
      
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      await supabase.from('comments').insert({
        post_slug: postSlug,
        author_name: authorName,
        author_email: authorEmail || null,
        author_ip: ip,
        content: content,
        status: status,
      });

      return NextResponse.json(
        {
          error: 'スパムと判定されたため、コメントは承認待ちになりました。',
          requiresModeration: true,
        },
        { status: 403 }
      );
    }

    // 正常なコメントを投稿（承認待ち）
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data, error } = await supabase
      .from('comments')
      .insert({
        post_slug: postSlug,
        author_name: authorName,
        author_email: authorEmail || null,
        author_ip: ip,
        content: content,
        status: 'pending', // 承認制
      })
      .select()
      .single();

    if (error) {
      // レート制限エラー（データベース側）の場合
      if (error.message.includes('Rate limit exceeded')) {
        return NextResponse.json(
          { error: 'レート制限に達しました。しばらく待ってから再度お試しください。' },
          { status: 429 }
        );
      }

      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'コメントの投稿に失敗しました' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'コメントを投稿しました。承認後に表示されます。',
        comment: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}

