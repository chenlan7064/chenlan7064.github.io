# 博客工作指南

## 项目信息

| 项目 | 信息 |
|------|------|
| 站点地址 | https://chenlan7064.github.io/ |
| 框架 | Hexo 8.x |
| 主题 | ShokaX 0.5.x |
| CMS | Sveltia CMS（`/admin/`） |
| 仓库 | `chenlan7064/chenlan7064.github.io` |
| 远程协议 | SSH（`git@github.com:chenlan7064/chenlan7064.github.io.git`） |

---

## 分支结构

| | `source` 分支 | `main` 分支 |
|---|---|---|
| **内容** | Hexo 源码（Markdown、配置、脚本） | 构建产物（纯 HTML/CSS/JS） |
| **来源** | 本地编辑 / CMS 写入 | `hexo generate` 生成 |
| **部署方式** | `git push origin source` | `hexo deploy` 强制推送 |
| **用途** | 版本控制 & 内容管理 | GitHub Pages 托管 |

```
source 分支（源码）                  main 分支（部署）
├── _config.yml          →          ├── index.html
├── source/_posts/*.md   →  hexo    ├── 2026/05/30/xxx/index.html
├── scripts/scroll-fix.js → generate├── css/
├── source/_data/custom.styl        ├── js/
└── node_modules/                   └── ...
```

---

## Sveltia CMS 能做什么

通过 `https://chenlan7064.github.io/admin/` 直接操作 `source` 分支：

| 操作 | 能否 | 说明 |
|------|------|------|
| 创建/编辑/删除文章 | ✅ | 修改 `source/_posts/*.md` |
| 修改文章分类/标签/封面 | ✅ | 文章 Front Matter |
| 上传图片 | ✅ | 存到图床或 `source/images/` |
| 修改页面配置 | ❌ 不推荐 | 部分配置可能不支持 |

> ⚠️ CMS 改动只 commit 到 `source` 分支，**不会自动构建部署**。

---

## 必须在本地做的事

| 操作 | 说明 |
|------|------|
| `hexo generate && hexo deploy` | 构建并部署（CMS 改完文章后必须执行） |
| 修改 `_config.yml` | 站点配置、主题选项、菜单、评论等 |
| 修改 `custom.styl` | 自定义 CSS 样式 |
| 修改 `scripts/` | JS 脚本注入（如 `scroll-fix.js`） |
| 安装/升级依赖 | `package.json` |
| 修改主题模板 | `layout/` Pug 文件 |
| 配置 SEO/评论/搜索 | 主题集成相关 |

---

## 日常更新流程

```
┌──────────────────────┐
│  ① CMS 后台写文章     │  https://chenlan7064.github.io/admin/
│     保存 = 自动 commit │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│  ② 本地同步           │  git pull origin source
│     拉取 CMS 新文章    │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│  ③ 构建 + 部署        │  hexo clean && hexo generate && hexo deploy
│     生成 → 推送 main   │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│  ④ 备份 source 分支   │  git push origin source
│     保存本地改动        │
└──────────────────────┘
```

### 一键三连

```bash
# 拉取 CMS 改动的文章，构建，部署
git pull origin source && hexo clean && hexo generate && hexo deploy

# 如果有本地配置改动，再推 source 分支
git push origin source
```

---

## 本地开发

```bash
# 启动本地预览服务器（默认 http://localhost:4000）
hexo server

# 新建文章
hexo new "我的新文章"
```

---

## 项目特殊配置

### 滚动修复（`scripts/scroll-fix.js`）

通过 Hexo 钩子 `after_render:html` 在 `<head>` 末尾注入修复 CSS：

```css
body { overflow-y: scroll !important; }
body.fullscreen { overflow: hidden !important; }
#loading { pointer-events: none; }
footer#footer { position: relative !important; z-index: 2 !important; }
main { padding-bottom: 3rem !important; }
```

### 自定义样式（`source/_data/custom.styl`）

```stylus
body
  overflow-y scroll !important

#footer
  overflow visible !important
```

### 部署协议

`_config.yml` 中的 deploy.repo 使用 SSH 协议，因当前网络环境 HTTPS 被墙：

```yaml
deploy:
  type: git
  repo: git@github.com:chenlan7064/chenlan7064.github.io.git
  branch: main
```

---

## 目录速查

| 路径 | 用途 |
|------|------|
| `_config.yml` | Hexo 站点 & 部署配置 |
| `source/_posts/` | 文章 Markdown 文件 |
| `source/_data/custom.styl` | 自定义 CSS |
| `source/admin/` | Sveltia CMS 配置 |
| `scripts/scroll-fix.js` | 滚动修复注入脚本 |
| `public/` | 构建输出（不提交） |
| `node_modules/hexo-theme-shokax/` | ShokaX 主题 |
