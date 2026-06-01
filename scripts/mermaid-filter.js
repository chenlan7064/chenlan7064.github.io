/**
 * ShokaX Mermaid 图表过滤器
 * 将 Shiki 语法高亮的 mermaid 代码块转换为客户端可渲染的 <pre class="mermaid"> 格式
 * 同时在页面中注入 mermaid.js CDN
 */

hexo.extend.filter.register('after_render:html', function (html) {
  // 1. 将 Shiki 渲染的 mermaid 代码块还原为原始 mermaid 文本
  //    匹配: <pre class="shiki ..."><code class="language-mermaid">...带 span 标签的内容...</code></pre>
  html = html.replace(
    /<pre class="shiki[^"]*"[^>]*><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g,
    function (match, content) {
      // 去除所有 HTML 标签（Shiki 的 span），还原纯文本
      const rawText = content
        .replace(/<span[^>]*>/g, '')
        .replace(/<\/span>/g, '')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim();
      return '<pre class="mermaid">' + rawText + '</pre>';
    }
  );

  // 2. 注入 mermaid.js CDN 和初始化脚本（仅在包含 mermaid 块的页面）
  if (html.includes('pre class="mermaid"')) {
    const mermaidScript = `
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true, theme: 'default' });
</script>`;
    html = html.replace('</body>', mermaidScript + '\n</body>');
  }

  return html;
}, 9); // priority 9: 在大多数 filter 之后运行，但在 layout 注入之后
