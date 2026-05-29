# ShokaX 主题配置指南

> 配置文件：`_config.shokax.yml`  
> 修改后运行 `hexo clean && hexo generate` 生效

---

## 一、站点品牌

```yaml
alternate: 我的博客        # 顶部大标题（显示在导航栏左侧）
```

**图标：**
```yaml
icon:
  favicon: "/favicon.ico"               # 浏览器标签页小图标
  apple_touch_icon: "/apple-touch-icon.png"  # iOS 添加到桌面图标
```
替换图标：将你的 `favicon.ico` 和 `apple-touch-icon.png` 放入 `source/_data/assets/`

---

## 二、导航菜单

```yaml
menu:
  home: / || home                       # 首页
  archives: /archives/ || list-alt       # 归档
  categories: /categories/ || th         # 分类
  tags: /tags/ || tags                  # 标签
  friends: /friends/ || heart           # 友链
  about: /about/ || user                # 关于
```
删除行首的 `#` 即可启用该菜单项。格式：`链接 || 图标名`

---

## 三、社交链接

```yaml
social:
  github: https://github.com/你的用户名 || github || "#191717"
  zhihu: https://www.zhihu.com/people/你的用户名 || zhihu || "#1e88e5"
  email: mailto:你的邮箱@xxx.com || envelope || "#55acd5"
  bilibili: https://space.bilibili.com/你的ID || bilibili || "#00a1d6"
```
格式：`链接 || 图标 || 颜色`，颜色可省略

支持的平台图标：`github` `gitee` `twitter` `zhihu` `weibo` `bilibili` `music` `email` `facebook` `youtube` `instagram` `douban` `stackoverflow` `skype`

---

## 四、首页外观

### 置顶大标题
```yaml
alternate: 我的博客    # 改这里
```

### 封面图片
```yaml
images:                                 # 首页和文章封面池（至少 6 张）
  - https://api.ixiaowai.cn/gqapi/gqapi.php    # 随机二次元
  - https://api.btstu.cn/sjbz/api.php?lx=dongman  # 随机动漫
  - https://你的图片地址.jpg
```
- 留空则使用 Bing 每日壁纸
- 支持本地图片：`- /images/cover1.jpg`
- 图片放入 `source/images/` 目录

### 首页头图
```yaml
homeConfig:
  gradient: false                       # 使用渐变色代替图片
  fixedCover: ""                        # 固定封面图 URL
  coverConfig:
    enableCover: true                   # 是否显示头图
    enablePreload: true                 # 预加载头图（加速首屏）
    enableNextGradientCover: false       # 翻页时使用渐变色封面
```

---

## 五、主题外观

### 暗色模式
```yaml
darkmode: true                          # 开启暗色模式切换按钮
auto_dark:
  enable: true                          # 自动切换
  start: 20                             # 20:00 自动切暗色
  end: 7                                # 07:00 自动切亮色
```

### 字体
```yaml
font:
  enable: true
  loadFromGoogle: true                  # 从 Google Fonts 加载
  global:
    family: Mulish                      # 全局正文字体
  logo:
    family: Fredericka the Great        # 大标题字体
    size: 3.5
  headings:
    family: Noto Serif SC               # 标题字体（思源宋体）
  codes:
    family: Inconsolata                  # 代码块字体
```
> 如果不用 Google 字体，设 `loadFromGoogle: false` 并在 `source/_data/custom.styl` 中自定义

### 加载动画
```yaml
loader:
  start: true                           # 进站时显示加载小猫动画
  switch: false                         # 切页面时显示（建议关闭，影响体验）
```

### 烟花特效
```yaml
fireworks:
  enable: true                          # 鼠标点击出现烟花
```
> 关闭则设 `false`，配色和粒子参数可调整 `options` 部分

### 全站黑白
```yaml
grayMode: false                         # 设为 true 时全站变黑白（用于哀悼日）
```

---

## 六、文章设置

### 字数统计
```yaml
post:
  count: true                           # 显示字数和阅读时长
```

### 打赏
```yaml
reward:
  enable: true
  account:
    wechatpay: /wechatpay.png           # 微信收款码（放入 source/images/）
    alipay: /alipay.png                 # 支付宝收款码
```
> 不需要则设 `enable: false`，或删除不用的支付方式

### 文章过期提示
```yaml
outime:
  enable: false
  days: 90                              # 超过 90 天标记为"可能已失效"
```

### 版权协议
```yaml
creative_commons:
  license: by-nc-sa                     # 署名-非商业-相同方式共享
  language: deed.zh                     # 中文版
```
可选协议：`by` `by-nc` `by-nd` `by-sa` `by-nc-nd` `by-nc-sa` `zero`

---

## 七、功能模块

```yaml
modules:
  debug: false          # 调试模式（开发用）
  player: true          # 音乐播放器
  fireworks: true       # 烟花特效
  visibilityListener: true  # 标签页标题变化（切走时显示"快回来"）
  tabs: true            # 文章内选项卡
  quiz: true            # 文章内问答
  cloudflarePatch: false  # 使用 Cloudflare Rocket Loader 时开启
```

---

## 八、评论系统

### Waline（推荐，免费）
```yaml
waline:
  enable: true
  serverURL: "https://你的域名.vercel.app"   # 部署后填入
  lang: "zh-CN"
  pageview: true                          # 同时统计浏览量
```
部署教程：https://waline.js.org/guide/get-started/

### Twikoo（备选）
```yaml
twikoo:
  enable: false
  envId: "https://你的twikoo地址"
```

---

## 九、音乐播放器

```yaml
playerAPI: "https://api.injahow.cn"    # Meting API 地址
audio:
  - title: 我的歌单
    list:
      - https://music.163.com/#/playlist?id=2943811283
  - title: 轻音乐
    list:
      - https://music.163.com/#/playlist?id=2031842656
```
> 支持网易云、QQ 音乐、酷狗、虾米的歌单链接  
> 播放器位置在页面底部 `#player`

---

## 十、搜索

### Pagefind 本地搜索
```yaml
pagefind:
  enable: false                         # 开启后需额外配置
```
> 开启后每次构建需额外运行 `pnpm dlx pagefind --site public`，建议保持关闭，用浏览器 Ctrl+F 即可

---

## 十一、SEO 与统计

### SEO
```yaml
seo:
  bing: ""                              # Bing 站长验证码
  google: ""                            # Google Search Console 验证码
  baidu: ""                             # 百度站长验证码
```

### 访问统计
```yaml
visitor:
  clarity: false                        # 微软 Clarity
  baiduAnalytics: false                 # 百度统计
  googleAnalytics: false                # Google Analytics
```
填入对应的统计 ID 即可启用

---

## 十二、侧边栏与页脚

### 侧边栏
```yaml
sidebar:
  position: left                        # left 或 right
  avatar: avatar.jpg                    # 头像（放入 source/_data/assets/）
```

### 小部件
```yaml
widgets:
  random_posts: true                    # 随机文章
  recent_comments: true                 # 最新评论
```

### 页脚
```yaml
footer:
  since: 2026                           # 建站年份
  icon:
    name: sakura rotate                 # 爱心旁的图标
    color: "#ffc0cb"                    # 图标颜色（粉色）
  powered: true                         # 显示 Hexo & ShokaX 标识
  icp:                                  # ICP 备案（国内服务器需要）
    enable: false
    icpnumber: "浙ICP备xxx号"
    beian: "浙公网安备xxx号"
    recordcode: "xxx"
```

---

## 十三、更多配置

### PWA 渐进式应用
```yaml
pwa:
  enable: false                         # 开启后网站可离线访问（需自备配置文件）
```

### 实验功能
```yaml
experiments:
  antiFakeWebsite: true                 # 防恶意网站伪装
  copyrightLength: 50                   # 复制文字超此长度提示版权
  mobileWidth: 820px                    # 移动端导航栏切换宽度
```

### AI 摘要
```yaml
summary:
  enable: false                         # 需要 API Key
  model: "gpt-3.5-turbo"
  apiKey: ""
```

---

## 常用速查

| 我想要... | 修改配置项 |
|-----------|-----------|
| 改博客名 | `alternate` |
| 加导航链接 | `menu` |
| 换封面图 | `images` |
| 开暗色模式 | `darkmode: true` |
| 换字体 | `font` 下各项 |
| 关烟花 | `modules.fireworks: false` |
| 关音乐 | `modules.player: false` |
| 加评论 | `waline.enable: true` |
| 换头像 | `sidebar.avatar` |
| 加社交链接 | `social` |
| 开打赏 | `reward.enable: true` |
| 改页脚年份 | `footer.since` |
| 加背景音乐 | `audio` |
| 灰色哀悼 | `grayMode: true` |
| 百度收录 | `seo.baidu` + `visitor.baiduAnalytics` |
