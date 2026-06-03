/**
 * 行内代码"碎钻闪耀"样式
 * 自适应亮色/暗色模式，通过 ShokaX 的 [data-theme="dark"] 切换
 */
hexo.extend.filter.register('after_render:html', function (html) {
  const style = `
<style>
  /* ====== 基础：安全兜底色（不支持渐变时也能看清） ====== */
  .post .md code,
  .post .article code,
  .md code {
    position: relative;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: "Cascadia Code", "Fira Code", Consolas, Monaco, "Andale Mono", monospace;
    font-size: 0.88em;
    font-weight: 500;
    letter-spacing: 0.02em;
    overflow: hidden;
    /* 兜底色——看不支持渐变的浏览器 */
    color: #c7254e;
    background: #f9f2f4;
    border: 1px solid rgba(180, 130, 150, 0.25);
    transition: box-shadow 0.3s ease, text-shadow 0.3s ease;
  }

  /* ====== 渐变字：仅在现代浏览器生效 ====== */
  @supports (-webkit-background-clip: text) or (background-clip: text) {
    .md code {
      color: transparent;
      -webkit-background-clip: text, border-box;
      background-clip: text, border-box;
      background-image:
        linear-gradient(160deg,
          #b88a9a  0%,  #a893b8  8%,  #8faac8 17%,
          #e8d5e0 25%,  #c9a8b8 33%,  #b0c0d8 42%,
          #e0c8d4 50%,  #b0c0d8 58%,  #c9a8b8 67%,
          #e8d5e0 75%,  #8faac8 83%,  #a893b8 92%,
          #b88a9a 100%),
        linear-gradient(145deg, #e0b0c0, #c9b8d4, #a8c8e8, #c9b8d4, #e0b0c0);
      background-size: 300% 100%, 100% 100%;
      background-position: 0% 0%, 0% 0%;
      background-origin: padding-box, border-box;
    }
  }

  /* ====== hover：流光旋转 ====== */
  @keyframes diamond-shift {
    0%   { background-position: 0% 0%, 0% 0%;   }
    100% { background-position: 100% 0%, 0% 0%; }
  }

  .md code:hover {
    animation: diamond-shift 3s linear infinite;
    box-shadow:
      0 0 0 1px rgba(180, 140, 170, 0.35),
      0 2px 8px  rgba(160, 130, 160, 0.2);
  }

  /* ====== 光点扫过 ====== */
  .md code::after {
    content: "";
    position: absolute;
    top: -1px;
    left: -60%;
    width: 35%;
    height: calc(100% + 2px);
    background: linear-gradient(105deg,
      transparent 0%,
      rgba(255,255,255,0.5) 35%,
      rgba(255,255,255,0.8) 50%,
      rgba(255,255,255,0.5) 65%,
      transparent 100%);
    border-radius: 4px;
    opacity: 0;
    pointer-events: none;
    z-index: 1;
  }

  @keyframes diamond-glint {
    0%   { left: -60%; }
    100% { left: 110%; }
  }

  .md code:hover::after {
    opacity: 1;
    animation: diamond-glint 1.4s ease-in-out infinite;
  }

  /* ====== 暗色模式 ====== */
  [data-theme="dark"] .md code,
  [data-theme="dark"] .post .md code {
    color: #d0c0f0;
    background: rgba(30, 25, 40, 0.9);
    border-color: rgba(140, 120, 200, 0.35);
    text-shadow:
      0 0 4px  rgba(180, 160, 220, 0.5),
      0 0 8px  rgba(140, 180, 220, 0.3);
  }

  @supports (-webkit-background-clip: text) or (background-clip: text) {
    [data-theme="dark"] .md code {
      color: transparent;
      -webkit-background-clip: text, border-box;
      background-clip: text, border-box;
      background-image:
        linear-gradient(160deg,
          #c0b0e0  0%,  #90c8e8  8%,  #e8d8ff 17%,
          #a8c8e8 25%,  #c8b8e8 33%,  #e0d0f0 42%,
          #ffffff 50%,  #e0d0f0 58%,  #c8b8e8 67%,
          #a8c8e8 75%,  #e8d8ff 83%,  #90c8e8 92%,
          #c0b0e0 100%),
        linear-gradient(145deg, rgba(120,100,180,0.5), rgba(80,150,200,0.5), rgba(150,100,180,0.5));
      background-size: 300% 100%, 100% 100%;
      background-position: 0% 0%, 0% 0%;
    }
  }

  [data-theme="dark"] .md code:hover {
    box-shadow:
      0 0 2px  rgba(160, 140, 220, 0.5),
      0 0 10px rgba(120, 160, 210, 0.35);
    text-shadow:
      0 0 6px  rgba(200, 180, 240, 0.8),
      0 0 14px rgba(160, 200, 240, 0.5);
  }

  [data-theme="dark"] .md code::after {
    background: linear-gradient(105deg,
      transparent 0%,
      rgba(200,180,255,0.3) 35%,
      rgba(220,200,255,0.65) 50%,
      rgba(200,180,255,0.3) 65%,
      transparent 100%);
  }
</style>`;
  return html.replace('</head>', style + '\n</head>');
}, 8);
