# 中国区域适配指南

本项目已针对在中国地区正常使用进行了优化。以下是改进说明：

## 主要改进

### 1. **移除 CDN 依赖**
- ✅ 移除了 esm.sh CDN（包含 Google MediaPipe 库）
- ✅ 改为本地 npm 包管理
- ✅ 移除了 Tailwind CSS CDN，改为本地编译

### 2. **解决 MediaPipe 谷歌 CDN 问题**
- ✅ 替换了 `storage.googleapis.com` 为 JsDelivr（中国可访问）
- ✅ 创建了本地模型下载脚本
- ✅ 支持本地模型文件或 CDN 自动回退

### 3. **使用国内 NPM 镜像**
- ✅ 创建了 `.npmrc` 文件，配置使用淘宝 NPM 镜像
- ✅ 大幅加快依赖安装速度

### 4. **替换外部图片源**
- ✅ 将 picsum.photos（被中国防火墙阻止）替换为本地 SVG 占位符
- ✅ 您可以后续替换为自己的图片 URL

### 5. **完整的本地开发环境**
- ✅ 添加了 Tailwind CSS 配置文件
- ✅ 添加了 PostCSS 配置文件
- ✅ 所有依赖都可以离线使用

## 安装步骤

### 方式一：使用淘宝镜像（推荐在中国使用）

```bash
# npm 会自动读取 .npmrc 文件
npm install

# 【可选】下载 MediaPipe 模型文件到本地（推荐）
# 这样可以完全不依赖任何外部 CDN
npm run download-models
```

### 方式二：如果要切换回官方源

```bash
# 修改 .npmrc 的 registry 设置或使用命令
npm install --registry https://registry.npmjs.org/
```

### 方式三：使用 yarn 或 pnpm

```bash
# 使用 yarn
yarn install

# 使用 pnpm（推荐）
pnpm install
```

### 【重要】首次运行前

建议下载 MediaPipe 模型文件到本地，这样可以完全不依赖谷歌 CDN：

```bash
npm run download-models
```

这会将手势识别模型下载到 `public/mediapipe/` 目录。

## 启动开发服务器

```bash
npm run dev
```

然后在浏览器中打开 `http://localhost:3000`

## 生产构建

```bash
npm run build
```

构建文件会输出到 `dist/` 目录

## 常见问题

### Q: 手势识别模型从哪里加载？
A: 默认使用 JsDelivr CDN（`cdn.jsdelivr.net`，在中国可访问）。建议运行 `npm run download-models` 下载到本地，这样完全不依赖任何外部 CDN。

### Q: 仍然无法加载手势识别？
A: 
1. 首先检查网络连接
2. 尝试运行 `npm run download-models` 下载本地模型
3. 如果下载失败，可能需要使用 VPN 或寻找其他镜像源

### Q: 仍然无法加载其他资源？
A: 确保 `.npmrc` 文件中的镜像源设置正确。可以运行 `npm config list` 查看当前配置。

### Q: 如何使用自己的图片？
A: 修改 `App.tsx` 中的 `DEFAULT_PHOTOS` 数组，替换为您的图片 URL：
```typescript
const DEFAULT_PHOTOS = [
  "https://your-domain.com/photo1.jpg",
  "https://your-domain.com/photo2.jpg",
  // ...
];
```

### Q: MediaPipe 库是否可在中国使用？
A: 是的，`@mediapipe/tasks-vision` npm 包可以通过国内镜像源正常下载和使用。

### Q: 是否需要梯子（VPN）？
A: 
- ✅ npm 包依赖：不需要，使用国内镜像源
- ✅ Tailwind CSS：不需要，已本地化
- ✅ MediaPipe 模型：建议下载到本地（不需要梯子），或使用 JsDelivr CDN（中国可访问）
- ✅ 示例图片：已改为本地 SVG（不需要梯子）

## 技术栈（完全本地化）

- React 19.2.3
- Three.js 0.182.0
- @react-three/fiber 9.4.2
- @react-three/drei 10.7.7
- MediaPipe Tasks Vision (本地 npm 包)
- Tailwind CSS 3.4.0
- Vite 6.2.0

所有依赖都已配置为通过本地 npm 管理，不再依赖任何外部 CDN。
