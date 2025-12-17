# 魔法圣诞树 ✨

一个极具电影感的 3D 手势控制圣诞树。挥挥手即可打散、聚合粒子，捏合手指抓取照片，体验魔法般的节日氛围。

**[🚀 在线演示](https://christmas-tree.vercel.app)** | **[📖 中国用户指南](./CHINA_SETUP.md)** | **[🌐 Vercel 部署](./VERCEL_DEPLOYMENT.md)**

## ✨ 功能特点

- 🎄 **3D 圣诞树场景** - 使用 Three.js 渲染精美的 3D 圣诞树
- 👋 **手势识别** - 基于 MediaPipe 的实时手势检测和跟踪
- ✨ **粒子效果** - 手势控制粒子的散开和聚合
- 📸 **照片互动** - 捏合手指抓取和显示照片
- 🎨 **精美UI** - 使用 Tailwind CSS 构建的现代用户界面
- 🌍 **中国适配** - 完全本地化，无需梯子即可使用
- 🚀 **Vercel 部署** - 一键部署到 Vercel CDN

## 🚀 快速开始

### 前置条件

- Node.js 18+
- 现代浏览器（支持 WebGL 和摄像头）
- 摄像头设备

### 安装和运行

```bash
# 1. 克隆项目
git clone https://github.com/yourusername/Christmas-Tree-main.git
cd Christmas-Tree-main

# 2. 安装依赖（自动使用国内镜像源）
npm install

# 3. 【推荐】下载 MediaPipe 模型到本地
npm run download-models

# 4. 启动开发服务器
npm run dev
```

然后在浏览器中打开 `http://localhost:3000`，允许摄像头访问即可开始体验！

## 📦 生产构建

```bash
# 构建项目
npm run build

# 预览构建结果
npm run preview
```

## 🌐 Vercel 部署

### 自动部署（推荐）

1. 将代码推送到 GitHub
2. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
3. 新建项目，选择你的仓库
4. Vercel 会自动检测配置并部署

### 手动部署

```bash
npm install -g vercel
vercel login
vercel --prod
```

详细说明见 [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

## 🛠 技术栈

| 技术 | 说明 |
|------|------|
| React | 前端框架 |
| TypeScript | 类型安全 |
| Three.js | 3D 图形库 |
| @react-three/fiber | React + Three.js 集成 |
| MediaPipe | 手势识别模型 |
| Tailwind CSS | 样式框架 |
| Vite | 构建工具 |
| Vercel | 部署平台 |

## 📁 项目结构

```
src/
├── components/
│   ├── Scene.tsx              # 3D 场景
│   ├── HandController.tsx     # 手势控制
│   ├── MagicTree.tsx          # 圣诞树模型
│   └── SnowParticles.tsx      # 粒子效果
├── utils/
│   └── geometry.ts            # 几何工具
├── App.tsx                    # 主应用
├── styles.css                 # 全局样式
└── index.tsx                  # 入口文件
```

## 🌍 中国用户特别说明

项目已完全中国化，**无需梯子即可使用**！

关键改进：
- ✅ 使用淘宝 NPM 镜像源
- ✅ 移除了所有谷歌 CDN
- ✅ MediaPipe 模型可本地下载
- ✅ 图片源已替换为本地

详见 [CHINA_SETUP.md](./CHINA_SETUP.md)

## ⚙️ 环境变量

创建 `.env.local` 文件：

```env
GEMINI_API_KEY=your_api_key_here  # 可选
```

## 🐛 常见问题

### Q: 手势识别不工作？

- 检查摄像头权限
- 确保光线充足
- 运行 `npm run download-models` 重新下载模型
- 查看浏览器控制台错误

### Q: 在中国无法加载？

见 [CHINA_SETUP.md](./CHINA_SETUP.md) - 项目已完全中国化

### Q: 如何使用自己的图片？

编辑 `App.tsx` 的 `DEFAULT_PHOTOS` 数组

### Q: 如何自定义圣诞树？

编辑 `components/MagicTree.tsx` 调整外观和配置

### Q: 构建时间过长？

- 清除 npm 缓存：`npm cache clean --force`
- 删除 node_modules 和 package-lock.json 重新安装

## 📊 浏览器支持

| 浏览器 | 支持 | 备注 |
|------|------|------|
| Chrome | ✅ | 推荐 |
| Firefox | ✅ | 支持 |
| Safari | ✅ | 需要 14+ |
| Edge | ✅ | Chromium 版本 |
| 移动浏览器 | ✅ | 需要 WebGL 支持 |

## 🚀 性能优化

- 自动代码分割
- Three.js 库分离加载
- MediaPipe 延迟加载
- Tailwind CSS 优化
- CDN 缓存策略

## 📝 更新日志

### v1.0.0 (2025-12-17)
- ✨ 初始版本发布
- 🌍 完全中国化适配
- 🚀 Vercel 一键部署
- 👋 实时手势识别
- 📸 照片交互功能

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**祝你使用愉快！** 🎄✨
