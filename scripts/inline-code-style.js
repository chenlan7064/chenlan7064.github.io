/**
 * 行内代码美化样式（仿 Hexo Next 主题风格）
 * 针对文章正文中的 <code> 标签，不影响代码块
 */
hexo.extend.filter.register('after_render:html', function (html) {
  const style = `<style>
  /* 行内代码样式 - Hexo Next 主题风格 */
  .post .md code,
  .post .article code,
  .md code {
    color: #c7254e;
    background: #f9f2f4;
    padding: 2px 4px;
    border-radius: 3px;
    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
    font-size: 0.9em;
    word-wrap: break-word;
  }
</style>`;
  return html.replace('</head>', style + '\n</head>');
}, 8);
