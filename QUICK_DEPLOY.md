# Vercel 部署快速指南 🚀

## 3 分钟快速部署

### 步骤 1：推送到 GitHub

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 步骤 2：连接 Vercel

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 **"New Project"**
3. 选择 **"Import Git Repository"**
4. 搜索 `Christmas-Tree-main`
5. 点击 **"Import"**

### 步骤 3：配置项目（如需要）

**构建设置**应自动检测为：
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

**环境变量**（可选）：
- 如需 Gemini API：添加 `GEMINI_API_KEY`

### 步骤 4：部署

点击 **"Deploy"** 按钮，Vercel 会自动处理其他一切！

✅ **完成！** 你的项目已在线！

---

## 自动化 CI/CD 部署（可选）

项目已配置 GitHub Actions，每次推送到 `main` 分支时自动部署。

需要的 Secrets（在 GitHub 仓库设置中添加）：
- `VERCEL_TOKEN` - Vercel 账户令牌
- `VERCEL_ORG_ID` - Vercel 组织 ID
- `VERCEL_PROJECT_ID` - Vercel 项目 ID

获取这些值：
1. 在 Vercel 账户设置中找到 Token
2. 部署后在 Vercel 项目设置中找到 ID

---

## 部署常见问题

### Q: 部署后手势识别不工作？
A: 运行 `npm run download-models` 将模型下载到本地

### Q: 构建失败？
A: 检查 Vercel 构建日志，通常是依赖安装问题

### Q: 如何访问已部署的网站？
A: Vercel 会自动分配一个 `xxx.vercel.app` 域名，或配置自定义域名

### Q: 如何回滚到上一个版本？
A: 在 Vercel Dashboard 的 Deployments 中选择之前的版本点击 "Promote"

---

## 性能监控

部署后可在 Vercel Dashboard 中查看：
- Web Vitals 性能指标
- 错误日志
- 部署历史

---

## 自定义域名（可选）

1. 在 Vercel Dashboard 中进入项目
2. 进入 Settings → Domains
3. 添加你的自定义域名
4. 按照说明配置 DNS 记录

---

## 支持

- 📖 [Vercel 官方文档](https://vercel.com/docs)
- 🐛 [GitHub Issues](https://github.com/yourusername/Christmas-Tree-main/issues)
- 💬 [Vercel 社区](https://vercel.com/community)

**祝部署愉快！** 🎉
