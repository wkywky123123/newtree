#!/usr/bin/env node
/**
 * 下载 MediaPipe 模型文件脚本
 * 在中国使用时，此脚本会从国内可访问的源下载模型
 *
 * 使用方法: node scripts/download-mediapipe-models.js
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '../public/mediapipe');

// 确保目录存在
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

const MODEL_URL = 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task';
const MODEL_PATH = path.join(PUBLIC_DIR, 'hand_landmarker.task');

async function downloadModel() {
  console.log('=== MediaPipe 模型下载工具 ===\n');

  // 检查文件是否已存在
  if (fs.existsSync(MODEL_PATH)) {
    console.log('✓ 模型文件已存在，跳过下载');
    return;
  }

  console.log(`正在下载模型文件...`);
  console.log(`源: ${MODEL_URL}`);

  try {
    // 使用curl下载文件
    execSync(`curl -L -o "${MODEL_PATH}" "${MODEL_URL}"`, {
      stdio: 'inherit',
      timeout: 300000 // 5分钟超时
    });

    if (fs.existsSync(MODEL_PATH)) {
      const stats = fs.statSync(MODEL_PATH);
      console.log(`✓ 下载完成，文件大小: ${stats.size} bytes`);
    } else {
      throw new Error('下载后文件不存在');
    }
  } catch (error) {
    console.error('✗ 下载失败:', error.message);
    console.log('\n请手动下载模型文件:');
    console.log(MODEL_URL);
    console.log(`保存到: ${MODEL_PATH}`);
    process.exit(1);
  }
}

downloadModel().catch((error) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`✓ 已下载到: ${filePath}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // 删除部分文件
      reject(err);
    });
  });
}

async function downloadAllModels() {
  console.log('=== MediaPipe 模型下载工具 ===\n');
  
  for (const model of models) {
    const filePath = path.join(PUBLIC_DIR, model.name);
    
    // 如果文件已存在，跳过
    if (fs.existsSync(filePath)) {
      console.log(`✓ 文件已存在（跳过）: ${model.name}\n`);
      continue;
    }

    let downloaded = false;
    for (const url of model.urls) {
      try {
        await downloadFile(url, filePath);
        downloaded = true;
        break;
      } catch (error) {
        console.log(`✗ 下载失败: ${error.message}`);
        continue;
      }
    }

    if (!downloaded) {
      console.error(`\n✗ 无法下载 ${model.name}，所有源都失败了`);
      process.exit(1);
    }
    console.log('');
  }

  console.log('✓ 所有模型下载完成！');
  console.log(`模型文件位置: ${PUBLIC_DIR}`);
}

downloadAllModels().catch((error) => {
  console.error('下载过程中出错:', error);
  process.exit(1);
});
