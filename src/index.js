import { Readability } from "@mozilla/readability";
import { parseHTML } from "linkedom";
import TurndownService from "turndown";
import { chromium } from "playwright";

const userAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";

/**
 * 从网址获取网页HTML内容
 * @param {string} url - 网页URL
 * @returns {Promise<string>} HTML内容
 */
export async function fetchHtml(url) {
  const browser = await chromium.launch({
    headless: true,
    args: [
      "--disable-blink-features=AutomationControlled",
      "--no-first-run",
      "--no-zygote",
    ],
  });
  const context = await browser.newContext({ userAgent: userAgent });
  const page = await context.newPage();

  try {
    await page.goto(url);
    const html = await page.content();
    return html;
  } finally {
    await browser.close();
  }
}

/**
 * 将网页HTML转换为可读的Markdown
 * @param {string} html - 网页HTML内容
 * @param {string} url - 网页URL(可选,用于解析相对路径)
 * @returns {string} Markdown内容
 */
export function htmlToReadableMarkdown(html, url = "") {
  // 创建虚拟DOM环境
  const { document } = parseHTML(html);

  // 使用Readability提取主要内容
  const reader = new Readability(document, { url: url || undefined });
  const article = reader.parse();

  if (!article) {
    throw new Error("无法提取可读内容");
  }

  // 转换为Markdown
  const turndownService = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
  });

  // 保留一些自定义规则
  turndownService.addRule("strikethrough", {
    filter: ["del", "s", "strike"],
    replacement: (content) => `~~${content}~~`,
  });

  const markdown = turndownService.turndown(article.content);

  // 组合标题和内容
  let result = "";
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
export function getArticleMetadata(html, url = "") {
  const { document } = parseHTML(html);
  const reader = new Readability(document, { url: url || undefined });
  const article = reader.parse();

  return article;
}
