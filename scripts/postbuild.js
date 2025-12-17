#!/usr/bin/env node
/**
 * 后构建脚本
 * 在 Vite 构建后，确保 public 目录中的模型文件被复制到 dist
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');
const distDir = path.join(__dirname, 'dist');

// 递归复制目录
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const files = fs.readdirSync(src);
  files.forEach(file => {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    const stat = fs.statSync(srcFile);

    if (stat.isDirectory()) {
      copyDir(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  });
}

// 复制 public 目录中的所有文件到 dist（除了已经被 Vite 处理的）
try {
  if (fs.existsSync(publicDir)) {
    console.log('正在复制 public 目录到 dist...');
    copyDir(publicDir, distDir);
    console.log('✓ public 目录已复制完成');
  }
} catch (error) {
  console.error('复制 public 目录失败:', error);
  process.exit(1);
}
