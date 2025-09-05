# 宠兽收集网站部署指南

## 本地运行

要在本地运行这个网站，请按照以下步骤操作：

1. 确保您的电脑上已安装 Node.js 和 npm（或 pnpm）
2. 克隆项目代码到本地
3. 在项目根目录运行以下命令：

```bash
# 安装依赖
npm install
# 或使用 pnpm（如果已安装）
pnpm install

# 启动开发服务器
npm run dev
# 或
pnpm dev
```

4. 服务器启动后，您可以在浏览器中访问 `http://localhost:3000` 来查看网站

## 构建生产版本

要构建生产版本的网站，请运行：

```bash
npm run build
# 或
pnpm build
```

构建完成后，生成的静态文件将位于 `dist` 目录中。

## 预览生产版本

要预览构建后的生产版本，请运行：

```bash
npm run preview
# 或
pnpm preview
```

预览服务器启动后，您可以在浏览器中访问 `http://localhost:4173` 来查看生产版本的网站。

## 部署到 GitHub Pages

项目已配置好 GitHub Pages 部署环境，只需按照以下步骤操作：

1. 确保您的项目已推送到 GitHub
2. 修改 `package.json` 中的 `homepage` 字段为您的 GitHub Pages URL：
   ```json
   "homepage": "https://yourusername.github.io/your-repository-name"
   ```
3. 在项目根目录运行以下命令：
   ```bash
   npm run deploy
   ```
4. 等待部署完成，然后访问您的 GitHub Pages URL 查看网站

## 部署到其他平台

### 1. Netlify

1. 访问 [Netlify](https://www.netlify.com/) 并注册/登录
2. 点击"New site from Git"
3. 选择您的 Git 仓库
4. 配置构建设置：
   - Build command: `npm run build`
   - Publish directory: `dist`
5. 点击"Deploy site"

### 2. Vercel

1. 访问 [Vercel](https://vercel.com/) 并注册/登录
2. 点击"New Project"
3. 选择您的 Git 仓库
4. Vercel 会自动检测项目配置，通常不需要额外设置
5. 点击"Deploy"

## 注意事项

- 确保在部署前更新 `package.json` 中的 `homepage` 字段为您的实际域名
- 对于生产环境，建议优化图片大小和资源加载
- 该网站支持 PWA 特性，用户可以将其添加到主屏幕使用
- 如果在 GitHub Pages 上遇到路由问题，可能需要刷新页面后手动导航

部署完成后，您将获得一个可以访问的公开链接，您可以将此链接分享给其他用户。