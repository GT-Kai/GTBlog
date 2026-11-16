# 留白 · 中文个人博客模板

这是一个**真正的 Astro 6 静态博客项目**，而不是一张不可编辑的设计图。你可以直接改文字、加文章、替换个人信息，再部署到 Cloudflare Workers。无需数据库、后端服务器或付费主题。

> **重要：**目前展示的「留白」「你的名字」、项目简介、三篇文章都是示例。正式公开前，请替换为你自己的信息。当前 `https://example.com` 也是占位地址；部署后必须改为真实网址。

## 0. 需要什么

- Node.js **24 LTS（推荐）**，或者 **22.23.4 及以上**
- 编辑器：推荐 VS Code（可配合 ChatGPT 或你喜欢的 AI 编辑代码）
- 一个 GitHub 账号、一个 Cloudflare 账号（发布阶段需要）

## 1. 本地预览

下载 ZIP 并解压，在终端进入项目目录：

```bash
npm install
npm run dev
```

在浏览器打开终端显示的网址（通常为 `http://localhost:4321`）。

其他命令：

```bash
npm run build      # 生成静态文件到 dist/
npm run preview    # 预览正式构建结果
npm run deploy     # 部署到 Cloudflare（首次需要先登录）
```

## 2. 先改成你的网站（最重要）

### A. 修改站名和个人介绍

打开 `src/config.ts` 修改以下字段：

- `name`：博客中文名称（当前为「留白」）
- `englishName`：英文署名
- `author`：你的署名
- `role`、`intro`、`description`、`location`：个人介绍
- `email` / `github`：不填则不显示相应链接
- `projects`：正在做的项目，可修改/增加/删除

页面地址及样式由以下文件控制：

```text
src/pages/index.astro         首页
src/pages/writing/index.astro 文章目录及搜索
src/pages/writing/[slug].astro 文章详情
src/pages/projects.astro      项目
src/pages/about.astro         关于
src/styles/global.css        网站样式/颜色/响应式/深浅色
```

### B. 发布第一篇文章

到 `src/content/blog/` 新建 `my-first-post.md`（文件名决定文章网址）：

```markdown
---
title: '我的第一篇文章'
description: '一段简短摘要，用来展示在文章列表中。'
pubDate: 2026-11-16
category: '随笔'
tags: ['写作', '生活']
---

# 你好，世界

这是我的第一篇文章。

## 小标题

用 **Markdown** 轻松排版，也可以使用列表：

- 第一条
- 第二条
```

保存后，运行 `npm run dev` 会自动更新页面。`draft: true` 可让尚未完成的文章不被发布。三篇示例文章可直接删掉。

### C. 改颜色 / 风格

打开 `src/styles/global.css`，找到 `:root` 中的 `--bg`、`--ink`、`--accent`，分别控制背景、文字和强调色。深色主题在 `:root[data-theme='dark']`。

## 3. 上传到 GitHub

在 GitHub 新建一个**空白**仓库，例如 `my-blog`（不要勾选自动添加 README）。打开项目终端运行：

```bash
git init
git add .
git commit -m "Launch my personal blog"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/my-blog.git
git push -u origin main
```

把 `YOUR_USERNAME` 换成自己的 GitHub 用户名。如已初始化 Git，则略过 `git init`。首次推送需登录 GitHub（通常通过浏览器验证、凭据管理器或 SSH，不要把密码写在代码里）。

## 4. 部署到 Cloudflare Workers（推荐）

Cloudflare 当前推荐新项目使用 Workers，静态 Astro 项目无需服务器适配器。仓库已包含 `wrangler.jsonc`，其中 `assets.directory` 设置为 `./dist`。

### 方法 A：连接 GitHub 自动部署

1. 登录 https://dash.cloudflare.com/，打开 **Workers & Pages**。
2. 点击 **Create application**，在 Workers 部署流程中选择 **Import a repository**（实际按钮文字可能随后台更新）。
3. 连接 GitHub，选择你刚创建的 `my-blog` 仓库。
4. 设置 **Build command** 为 `npm run build`，**Deploy command** 为 `npm run deploy`。如果需要配置 Root directory，请使用仓库根目录。
5. 建议配置构建变量 `PUBLIC_SITE_URL` 为你的最终网址，如 `https://your-blog.workers.dev`；这只影响生成的 SEO 地址，第一次部署可以稍后再补。
6. 完成部署后，Cloudflare 会提供一个 `*.workers.dev` 的公开网址。打开它检查首页、文章详情、RSS 与 404 页面。
7. 后续每次 push 到 GitHub，将按配置自动构建和部署。

官方指南：
- https://docs.astro.build/en/guides/deploy/cloudflare/
- https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/
- https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/

### 方法 B：命令行直接部署

```bash
npx wrangler login
npm run build
npm run deploy
```

若项目名已被你的 Cloudflare 账户占用，可修改 `wrangler.jsonc` 内的 `name`，然后重新部署。

## 5. 自定义域名

域名**不是必须的**。可以先使用 Cloudflare 分配的免费 `*.workers.dev` 地址。

如果已经购买域名，可以在 Workers 对应项目的 **Settings / Domains & Routes**（或 **Custom Domains**）中添加域名，按控制台步骤配置 DNS。绑定成功后，在 Cloudflare 的项目构建环境变量中把 `PUBLIC_SITE_URL` 改为 `https://你的域名`，重新部署，确保 canonical、RSS、sitemap 和 robots.txt 指向正确域名。

## 6. 上线检查清单

- [ ] 已把 `src/config.ts` 中的「留白」「你的名字」换成真实信息
- [ ] 删除或重写三篇**示例文章**
- [ ] 修改项目卡片（或删除不需要的项目）
- [ ] `npm run build` 在自己的电脑成功
- [ ] GitHub 仓库已经推送完整源码
- [ ] Cloudflare 构建成功，打开 `workers.dev` 能正常访问
- [ ] 手机上检查首页与文章页面
- [ ] 测试深浅色切换和文章搜索
- [ ] 访问 `/rss.xml`、`/sitemap.xml` 和错误页面测试 404
- [ ] `PUBLIC_SITE_URL` 改为真实网址并重新部署
- [ ] 有域名的话已检查 HTTPS 与 DNS

## 7. 用 AI 协助后续维护

把以下话术直接发给你的 AI 代码助手：

> 我有一个 Astro 6 静态博客。请阅读 `src/config.ts`、`src/styles/global.css` 和 `src/pages/`。保持现有移动端适配和深浅色模式，将网站改成 [你想要的风格]。请只修改必要文件，不增加没必要的依赖。告诉我每个改动的原因，最后检查构建报错。

> 我准备写一篇关于 [主题] 的个人博客。先以编辑身份向我提出 5 个能让文章更具体的问题，不要编造我的经历。等我回答后，再帮我整理成适合 `src/content/blog/` 的 Markdown，包括 title、description、pubDate、category、tags。

## 项目结构

```text
liubai-blog/
├── src/
│   ├── components/             页眉、页脚、文章卡片
│   ├── content/blog/           Markdown 文章
│   ├── content.config.ts       文章字段校验
│   ├── layouts/BaseLayout.astro 统一 SEO 和页面框架
│   ├── lib/posts.ts            文章排序/日期/链接
│   ├── pages/                  首页、文章、项目、关于、RSS、sitemap、404
│   ├── styles/global.css       全站样式
│   └── config.ts               站点名称、作者、项目配置
├── public/favicon.svg
├── astro.config.mjs
├── wrangler.jsonc
└── package.json
```

### 当前项目的边界

- 不带可视化写作后台：文章以 Markdown 文件管理。如果以后确实需要浏览器后台，可以再接入 CMS。
- 不带评论、用户登录或数据库：这是为了控制复杂度。
- 不包含图片 CDN 或自动备份：源码由 GitHub 保存，但重要内容仍建议另行备份。
- Cloudflare 价格、额度和部署界面可能变化，实际以官网为准。

祝写作顺利。
