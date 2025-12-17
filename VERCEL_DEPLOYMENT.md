# Vercel 部署指南

本项目已配置为可在 Vercel 上完美部署。按照以下步骤进行部署：

## 前置条件

1. 拥有 [Vercel](https://vercel.com) 账户
2. 安装 [Vercel CLI](https://vercel.com/docs/cli)（可选）
3. 项目已推送到 GitHub、GitLab 或 Bitbucket

## 方式一：通过 Git 自动部署（推荐）

### 1. 连接 GitHub 仓库

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 **"New Project"**
3. 选择 **"Import Git Repository"**
4. 搜索并选择你的仓库 `Christmas-Tree-main`
5. 点击 **"Import"**

### 2. 配置项目设置

在项目导入页面，确保以下设置正确：

- **Framework Preset**: `Vite`
- **Root Directory**: `.` (根目录)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3. 配置环境变量（如需要）

如果你的项目需要 API Key，在 **"Environment Variables"** 中添加：

```
GEMINI_API_KEY=your_api_key_here
```

### 4. 点击 Deploy

Vercel 会自动：
1. 安装依赖
2. 构建项目
3. 部署到 Vercel 的 CDN

### 5. 自定义域名（可选）

部署完成后，你可以：
1. 在 Vercel Dashboard 中访问项目
2. 进入 **"Settings"** > **"Domains"**
3. 添加你的自定义域名

## 方式二：使用 Vercel CLI 本地部署

### 1. 安装 Vercel CLI

```bash
npm install -g vercel
```

### 2. 登录 Vercel

```bash
vercel login
```

### 3. 部署项目

```bash
vercel
```

按照提示完成配置后，项目即会部署。

### 4. 生产部署

生产环境部署：

```bash
vercel --prod
```

## 部署配置说明

项目已包含以下 Vercel 配置文件：

### `vercel.json`

- ✅ 指定构建命令和输出目录
- ✅ 配置 MediaPipe 模型文件缓存策略
- ✅ 配置 SPA 路由重写（所有请求路由到 `index.html`）
- ✅ CORS 头配置

### `.vercelignore`

- ✅ 排除不必要的文件，加快部署速度
- ✅ 排除本地配置文件

### 构建优化

`vite.config.ts` 已配置：
- ✅ 自动分割大型库（Three.js、MediaPipe）
- ✅ 优化资源加载

## 部署后的常见问题

### Q: 构建时间太长？

如果构建时间超过 45 分钟，Vercel 会超时。可以：

1. 检查是否有大文件在 node_modules 中
2. 确保 `.vercelignore` 配置正确
3. 考虑预下载 MediaPipe 模型：

```bash
# 本地运行
npm run download-models

# 这会创建 public/mediapipe/hand_landmarker.task
# 在部署时会自动包含到 dist 目录
```

### Q: MediaPipe 模型加载失败？

1. 确保 `public/mediapipe/` 目录存在
2. 运行 `npm run download-models` 下载模型
3. 检查 Vercel Dashboard 中的构建日志

### Q: 手势识别不工作？

1. 检查浏览器开发者工具的 Console 标签页
2. 确保摄像头权限已授予
3. 如果使用自定义域名，确保支持 HTTPS

### Q: 如何更新已部署的项目？

自动部署：
1. 推送代码到 GitHub/GitLab
2. Vercel 会自动检测更改并重新部署

手动部署：
```bash
vercel --prod
```

## 性能优化建议

### 1. 启用 CDN 缓存

Vercel 默认已启用全局 CDN。MediaPipe 模型文件配置了 1 年缓存时间。

### 2. 使用预加载

考虑在 `index.html` 中添加预连接：

```html
<link rel="preconnect" href="https://cdn.jsdelivr.net">
```

### 3. 监控性能

在 Vercel Dashboard 中：
1. 进入项目 **"Analytics"**
2. 查看关键性能指标
3. 检查错误日志

## 环境特定配置

### 开发环境 vs 生产环境

项目在两个环境中均可正常运行。如需环境特定的配置：

1. 在 Vercel Dashboard 中设置不同的环境变量
2. 或在 `vite.config.ts` 中使用 `loadEnv()` 区分

## 故障排除

### 构建失败

查看 Vercel 构建日志：
1. 进入项目 Dashboard
2. 进入 **"Deployments"** 标签
3. 点击失败的部署查看日志

常见原因：
- 依赖安装失败：清除缓存后重试
- 环境变量缺失：检查环境变量设置
- 端口被占用：Vercel 会自动处理

### 运行时错误

1. 检查浏览器控制台错误
2. 查看 Vercel 的实时日志（需要启用）
3. 在本地 `npm run build && npm run preview` 测试

### 模型文件 404 错误

确保：
1. 运行了 `npm run download-models`
2. `public/mediapipe/` 目录存在
3. 文件已提交到 Git 仓库

## 相关资源

- [Vercel 官方文档](https://vercel.com/docs)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html#vercel)
- [MediaPipe 文档](https://ai.google.dev/edge/mediapipe/solutions)

## 支持

如遇到问题，可以：
1. 查看本项目的 `CHINA_SETUP.md`（中国用户适配指南）
2. 查看 Vercel 官方文档
3. 在项目 GitHub Issue 中提问
