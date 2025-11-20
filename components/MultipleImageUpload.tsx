"use client";

import { useState, useRef } from "react";
import { uploadImage } from "@/lib/storage-api";

interface MultipleImageUploadProps {
  label: string;
  values: string[];
  onChange: (urls: string[]) => void;
  folder?: string;
  description?: string;
}

export default function MultipleImageUpload({
  label,
  values,
  onChange,
  folder = "posts",
  description,
}: MultipleImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // 画像ファイルかチェック
    const invalidFiles = files.filter((file) => !file.type.startsWith("image/"));
    if (invalidFiles.length > 0) {
      alert("画像ファイルのみ選択してください");
      return;
    }

    // ファイルサイズチェック（10MB以下）
    const oversizedFiles = files.filter((file) => file.size > 10 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      alert("画像サイズは10MB以下にしてください");
      return;
    }

    setUploading(true);

    try {
      // 複数ファイルを順番にアップロード
      const uploadedUrls: string[] = [];
      for (const file of files) {
        const url = await uploadImage(file, folder);
        uploadedUrls.push(url);
      }

      // 既存のURLに追加
      onChange([...values, ...uploadedUrls]);
    } catch (error) {
      console.error("Error uploading images:", error);
      alert(`画像のアップロードに失敗しました: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setUploading(false);
      // ファイル入力をリセット
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = (index: number) => {
    const newValues = values.filter((_, i) => i !== index);
    onChange(newValues);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-300">{label}</label>
      {description && <p className="text-xs text-gray-500">{description}</p>}

      {/* プレビュー一覧 */}
      {values.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {values.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url}
                alt={`画像 ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border border-gray-700"
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-full text-xs font-semibold transition-colors"
                aria-label={`画像 ${index + 1} を削除`}
              >
                ×
              </button>
              <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* アップロードボタン */}
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          disabled={uploading}
          className="hidden"
          id={`multiple-image-upload-${label}`}
        />
        <label
          htmlFor={`multiple-image-upload-${label}`}
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
              画像を追加（複数選択可）
            </>
          )}
        </label>
      </div>

      {values.length > 0 && (
        <p className="text-xs text-gray-500">
          {values.length}枚の画像がアップロードされています。本文中で使用する順番に並んでいます。
        </p>
      )}
    </div>
  );
}

