#!/usr/bin/env node
/**
 * 下载 MediaPipe 模型文件脚本
 * 在中国使用时，此脚本会从国内可访问的源下载模型
 * 
 * 使用方法: node scripts/download-mediapipe-models.js
 */

import https from 'https';
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

// 模型下载列表
const models = [
  {
    name: 'hand_landmarker.task',
    // 使用在中国可访问的CDN源
    urls: [
      'https://fastly.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22-rc.20250304/wasm/hand_landmarker.task',
      // 备用Google源
      'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task'
    ]
  }
];

async function downloadFile(url, filePath) {
  return new Promise((resolve, reject) => {
    console.log(`正在下载: ${url}`);
    
    const file = fs.createWriteStream(filePath);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // 处理重定向
        downloadFile(response.headers.location, filePath)
          .then(resolve)
          .catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`下载失败: HTTP ${response.statusCode}`));
        return;
      }

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
