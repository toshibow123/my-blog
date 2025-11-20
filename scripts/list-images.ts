#!/usr/bin/env tsx
/**
 * public/images/ ディレクトリ内の画像ファイル一覧を表示するスクリプト
 * 
 * 使い方:
 *   npm run list:images
 * 
 * または:
 *   npx tsx scripts/list-images.ts
 */

import fs from "fs";
import path from "path";

const imagesDir = path.join(process.cwd(), "public", "images");

function listImages() {
  console.log("📸 利用可能な画像ファイル一覧\n");
  console.log("=" .repeat(50));
  
  if (!fs.existsSync(imagesDir)) {
    console.log("❌ public/images/ ディレクトリが存在しません。");
    console.log("   まず、画像ファイルを配置してください。\n");
    return;
  }

  const files = fs.readdirSync(imagesDir);
  const imageFiles = files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"].includes(ext);
  });

  if (imageFiles.length === 0) {
    console.log("📭 画像ファイルが見つかりませんでした。");
    console.log(`   画像を ${imagesDir} に配置してください。\n`);
    return;
  }

  console.log(`✅ ${imageFiles.length}個の画像ファイルが見つかりました:\n`);

  imageFiles.forEach((file, index) => {
    const filePath = path.join(imagesDir, file);
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    
    console.log(`${index + 1}. ${file}`);
    console.log(`   📁 パス: /images/${file}`);
    console.log(`   📏 サイズ: ${sizeKB} KB`);
    console.log(`   📝 使い方: ![説明](${file}) または ![説明](/images/${file})`);
    console.log("");
  });

  console.log("=" .repeat(50));
  console.log("\n💡 ヒント:");
  console.log("   - ファイル名だけ指定すると自動的に /images/ が付きます");
  console.log("   - 例: ![説明](chicken-breast.jpg) → /images/chicken-breast.jpg");
  console.log("   - 外部URLも使用可能: ![説明](https://example.com/image.jpg)\n");
}

listImages();

