"use client";

import { useState, useRef } from "react";
import { uploadImage } from "@/lib/storage-api";

interface ImageUploadProps {
  label: string;
  value: string | null;
  onChange: (url: string | null) => void;
  folder?: string;
  description?: string;
}

export default function ImageUpload({
  label,
  value,
  onChange,
  folder = "posts",
  description,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 画像ファイルかチェック
    if (!file.type.startsWith("image/")) {
      alert("画像ファイルを選択してください");
      return;
    }

    // ファイルサイズチェック（10MB以下）
    if (file.size > 10 * 1024 * 1024) {
      alert("画像サイズは10MB以下にしてください");
      return;
    }

    setUploading(true);

    try {
      // プレビューを表示
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Supabaseにアップロード
      const url = await uploadImage(file, folder);
      onChange(url);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert(`画像のアップロードに失敗しました: ${error instanceof Error ? error.message : "Unknown error"}`);
      setPreview(null);
    } finally {
      setUploading(false);
      // ファイル入力をリセット
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    onChange(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-300">{label}</label>
      {description && <p className="text-xs text-gray-500">{description}</p>}

      {/* プレビュー */}
      {preview && (
        <div className="relative w-full max-w-md">
          <img
            src={preview}
            alt="プレビュー"
            className="w-full h-auto rounded-lg border border-gray-700"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-sm font-semibold transition-colors"
            aria-label="画像を削除"
          >
            × 削除
          </button>
        </div>
      )}

      {/* アップロードボタン */}
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
          className="hidden"
          id={`image-upload-${label}`}
        />
        <label
          htmlFor={`image-upload-${label}`}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer ${
            uploading
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-gray-700 hover:bg-gray-600 text-white"
          }`}
        >
          {uploading ? (
            <>
              <span className="animate-spin">⏳</span>
              アップロード中...
            </>
          ) : (
            <>
              <span>📷</span>
              {preview ? "画像を変更" : "画像をアップロード"}
            </>
          )}
        </label>
      </div>
    </div>
  );
}

