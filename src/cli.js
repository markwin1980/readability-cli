#!/usr/bin/env node

import { htmlToReadableMarkdown, fetchHtml } from "./index.js";

// 获取命令名称用于显示帮助信息
function getCommandName() {
  const scriptPath = process.argv[1];
  if (scriptPath.endsWith("cli.js") || scriptPath.includes("readability-cli")) {
    return "readability-cli";
  }
  return "node src/cli.js";
}

// 显示帮助信息
function showHelp() {
  const cmd = getCommandName();
  console.log(`将网页HTML转换为可读的Markdown格式

用法:
  ${cmd} <url>

参数:
  url  网页URL(以http://或https://开头)`);
}

// 主函数
async function main() {
  const args = process.argv.slice(2);

  // 没有参数时显示帮助信息
  if (args.length === 0) {
    showHelp();
    process.exit(0);
  }

  const url = args[0];

  try {
    // 从URL获取HTML并转换为Markdown
    const html = await fetchHtml(url);

    if (!html.trim()) {
      console.error("错误: 内容为空");
      process.exit(1);
    }

    const markdown = htmlToReadableMarkdown(html, url);
    console.log(markdown);
  } catch (error) {
    console.error("错误:", error.message);
    process.exit(1);
  }
}

main();
