/**
 * ShokaX 代码块内 LaTeX 公式渲染过滤器
 *
 * Shiki 语法高亮将代码内容视为纯文本，不会渲染 $...$ 内的 LaTeX 公式。
 * 本过滤器在最终 HTML 中识别代码块内的数学公式（$...$ 和 $$...$$），
 * 用 KaTeX 服务端渲染后替换，使代码注释/伪代码中的公式也能正确显示。
 *
 * 智能跳过 shell 变量（$PATH、$HOME）和金额（$100），仅处理真正的 LaTeX 公式。
 */

const katex = require('katex');

// ===== HTML 工具函数 =====

function decodeHtmlEntities(text) {
  return text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function stripHtmlTags(text) {
  return text.replace(/<[^>]*>/g, '');
}

/**
 * 判断 $...$ 内的内容是否是真正的 LaTeX 数学公式
 * 返回: true（肯定是数学）| false（不是数学，保留原文）| 'try_katex'（尝试渲染）
 */
function isLatexMath(content) {
  const trimmed = content.trim();

  if (!trimmed) return false;

  // 强信号：LaTeX 命令（\）、上下标（^_）、分组（{}）
  if (/[\\^_{}]/.test(trimmed)) return true;

  // 含空格但无 LaTeX 命令 → 需含数学运算符才尝试渲染
  // 避免同行的多个 shell 变量被错误配对（如 "$PATH and $HOME"）
  if (/\s/.test(trimmed)) {
    if (/[=+\-*\/<>|!]/.test(trimmed)) return 'try_katex';
    return false;
  }

  // Shell/PHP 变量：$PATH、$HOME、$i、$_
  if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(trimmed)) {
    // 1-2 字符的短变量（如 $x$、$N$）很可能是数学变量
    if (trimmed.length <= 2) return 'try_katex';
    // 3 字符及以上（如 $PATH、$HOME）→ 跳过
    return false;
  }

  // 金额：$100、$5.99
  if (/^\d+(\.\d+)?$/.test(trimmed)) return false;

  // Shell 特殊变量：$@、$*、$?、$#、$!、$-、$0~$9
  if (/^[@*?#!\-0-9]$/.test(trimmed)) return false;

  // 其他情况：尝试 KaTeX 渲染
  return 'try_katex';
}

/**
 * 渲染 LaTeX 公式，失败时返回 null
 */
function renderMath(latex, displayMode) {
  try {
    return katex.renderToString(latex, {
      displayMode: displayMode,
      throwOnError: true,       // 严格模式：语法错误抛异常
      strict: false,            // 不警告 LaTeX 风格问题
      trust: false              // 安全：不信任输入
    });
  } catch (e) {
    return null;
  }
}

/**
 * 替换代码内容中的 $$...$$ 块级公式
 */
function processDisplayMath(html) {
  // 匹配 $$ 非贪心配对，不允许跨行
  return html.replace(/\$\$([^$\n]+?)\$\$/g, function (match, captured) {
    // 提取纯 LaTeX
    const latex = decodeHtmlEntities(stripHtmlTags(captured)).trim();
    if (!latex) return match;

    // 必须有 LaTeX 强信号才处理
    if (!/[\\^_{}]/.test(latex)) return match;

    const rendered = renderMath(latex, true);
    return rendered || match;
  });
}

/**
 * 替换代码内容中的 $...$ 行内公式
 */
function processInlineMath(html) {
  // 匹配 $ 非贪心配对，禁止跨行（避免 $HOME 与下行 $PATH 错误配对）
  return html.replace(/\$([^$\n]+?)\$/g, function (match, captured) {
    // 提取纯 LaTeX 内容
    const latex = decodeHtmlEntities(stripHtmlTags(captured)).trim();
    if (!latex) return match;

    // 启发式判断是否为数学公式
    const verdict = isLatexMath(latex);

    if (verdict === false) {
      // 非数学（shell 变量、金额），保留原文
      return match;
    }

    // 尝试 KaTeX 渲染
    const rendered = renderMath(latex, false);
    if (rendered) {
      return rendered;
    }

    // 渲染失败，保留原文
    return match;
  });
}

// ===== 主过滤器 =====

hexo.extend.filter.register('after_render:html', function (html) {
  // 检查配置开关
  const config = hexo.theme.config.code_math;
  if (config && config.enable === false) return html;

  // 快速路径：没有代码相关元素就没有工作要做
  if (!html.includes('<pre class="shiki') && !html.includes('<code>')) return html;

  // === 第一步：处理 Shiki 代码块（围栏代码块） ===
  html = html.replace(
    /<pre class="shiki[^"]*"[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/g,
    function (preMatch, codeContent) {
      if (!codeContent.includes('$')) return preMatch;

      let modified = codeContent;
      modified = processDisplayMath(modified);
      modified = processInlineMath(modified);

      if (modified !== codeContent) {
        return preMatch.replace(codeContent, modified);
      }
      return preMatch;
    }
  );

  // === 第二步：处理行内代码 <code>（反引号 `` ` `$...$` `` ````） ===
  // 注意：只匹配无属性的 <code>，避免匹配 <pre> 内的 <code class="language-xxx">
  html = html.replace(
    /<code>([\s\S]*?)<\/code>/g,
    function (codeMatch, codeContent) {
      if (!codeContent.includes('$')) return codeMatch;

      let modified = codeContent;
      modified = processDisplayMath(modified);
      modified = processInlineMath(modified);

      if (modified !== codeContent) {
        return '<code>' + modified + '</code>';
      }
      return codeMatch;
    }
  );

  return html;
}, 10); // priority 10: 在 mermaid-filter(9) 和 inline-code-style(8) 之后运行
