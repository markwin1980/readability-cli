#!/usr/bin/env node

import { readFileSync, readSync } from "fs";
import { htmlToReadableMarkdown, getArticleMetadata } from "./index.js";

// 获取命令名称用于显示帮助信息
function getCommandName() {
  // 检查是通过 node 运行还是全局安装的命令运行
  const scriptPath = process.argv[1];
  if (scriptPath.endsWith("cli.js") || scriptPath.includes("readability-cli")) {
    return "readability-cli";
  }
  return "node src/cli.js";
}

// 从stdin读取或使用参数传入的文件
async function getInput() {
  // 检查是否有命令行参数(排除node和脚本路径)
  const args = process.argv.slice(2);

  if (args.length > 0) {
    // 命令行参数模式
    return readFileSync(args[0], "utf-8");
  }

  // 管道输入模式
  return new Promise((resolve) => {
    let input = "";
    let hasData = false;

    process.stdin.setEncoding("utf-8");

    // 设置超时，如果没有数据则显示帮助
    const timer = setTimeout(() => {
      if (!hasData) {
        const cmd = getCommandName();
        console.log(`将网页HTML转换为可读的Markdown格式

用法:
  ${cmd} <file.html>
  cat <file.html> | ${cmd}
`);
        process.exit(0);
      }
    }, 100);

    process.stdin.on("data", (chunk) => {
      hasData = true;
      input += chunk;
    });

    process.stdin.on("end", () => {
      clearTimeout(timer);
      if (hasData) {
        resolve(input);
      }
    });
  });
}

// 主函数
async function main() {
  try {
    const input = await getInput();

    if (!input.trim()) {
      console.error("错误: 输入为空");
      process.exit(1);
    }

    // 转换为Markdown
    const markdown = htmlToReadableMarkdown(input);
    console.log(markdown);
  } catch (error) {
    console.error("错误:", error.message);
    process.exit(1);
  }
}

main();
