"use client";

import { useState } from "react";

interface NewsletterFormProps {
  placeholder?: string;
}

export default function NewsletterForm({ placeholder = "メールアドレスを入力" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // ここでメールマガジンサービス（Mailchimp、ConvertKitなど）のAPIを呼び出す
    // 現在はローカルストレージに保存する簡易版
    try {
      const subscribers = JSON.parse(localStorage.getItem("newsletterSubscribers") || "[]");
      if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem("newsletterSubscribers", JSON.stringify(subscribers));
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "送信中..." : "登録"}
        </button>
      </div>
      {status === "success" && (
        <p className="text-green-400 text-sm">登録ありがとうございます！</p>
      )}
      {status === "error" && (
        <p className="text-red-400 text-sm">エラーが発生しました。もう一度お試しください。</p>
      )}
    </form>
  );
}

