#!/usr/bin/env node

import { readFileSync } from "fs";
import { htmlToReadableMarkdown } from "./index.js";

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
  ${cmd} <file.html>

参数:
  file.html  要转换的HTML文件路径`);
}

// 主函数
function main() {
  const args = process.argv.slice(2);

  // 没有参数时显示帮助信息
  if (args.length === 0) {
    showHelp();
    process.exit(0);
  }

  try {
    const html = readFileSync(args[0], "utf-8");

    if (!html.trim()) {
      console.error("错误: 文件为空");
      process.exit(1);
    }

    // 转换为Markdown
    const markdown = htmlToReadableMarkdown(html);
    console.log(markdown);
  } catch (error) {
    console.error("错误:", error.message);
    process.exit(1);
  }
}

main();
