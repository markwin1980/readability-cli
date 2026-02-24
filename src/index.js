import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import TurndownService from 'turndown';

/**
 * 将网页HTML转换为可读的Markdown
 * @param {string} html - 网页HTML内容
 * @param {string} url - 网页URL(可选,用于解析相对路径)
 * @returns {string} Markdown内容
 */
export function htmlToReadableMarkdown(html, url = 'http://example.com') {
  // 创建虚拟DOM环境
  const doc = new JSDOM(html, { url });

  // 使用Readability提取主要内容
  const reader = new Readability(doc.window.document);
  const article = reader.parse();

  if (!article) {
    throw new Error('无法提取可读内容');
  }

  // 转换为Markdown
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-'
  });

  // 保留一些自定义规则
  turndownService.addRule('strikethrough', {
    filter: ['del', 's', 'strike'],
    replacement: (content) => `~~${content}~~`
  });

  const markdown = turndownService.turndown(article.content);

  // 组合标题和内容
  let result = '';
  if (article.title) {
    result += `# ${article.title}\n\n`;
  }
  result += markdown;

  return result;
}

/**
 * 从HTML获取文章元数据
 * @param {string} html - 网页HTML内容
 * @param {string} url - 网页URL(可选)
 * @returns {object} 文章元数据
 */
export function getArticleMetadata(html, url = 'http://example.com') {
  const doc = new JSDOM(html, { url });
  const reader = new Readability(doc.window.document);
  const article = reader.parse();

  return article;
}
