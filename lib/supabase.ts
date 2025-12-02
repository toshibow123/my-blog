import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase環境変数が設定されていません。コメント機能は動作しません。');
}

// 環境変数がない場合は、ダミーのクライアントを作成するか、nullを返したいところですが、
// 既存のコードが import { supabase } from ... としているため、
// URLがない場合はダミーのURLを設定してクラッシュを防ぎます。
// ただし、実際にAPIを呼ぶとエラーになります。
const url = supabaseUrl || 'https://example.supabase.co';
const key = supabaseAnonKey || 'dummy-key';

export const supabase = createClient(url, key);

// サーバーサイド用（Service Role Keyが必要な場合）
export const createServerClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    return supabase; // フォールバック
  }
  // ここでもurlが必要
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co';
  
  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};
