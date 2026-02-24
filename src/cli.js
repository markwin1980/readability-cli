#!/usr/bin/env node

import { readFileSync } from 'fs';
import { htmlToReadableMarkdown, getArticleMetadata } from './index.js';

// 从stdin读取或使用参数传入的文件
async function getInput() {
  // 检查是否有命令行参数(排除node和脚本路径)
  const args = process.argv.slice(2);

  if (args.length > 0) {
    // 命令行参数模式
    return readFileSync(args[0], 'utf-8');
  }

  // 管道输入模式
  return new Promise((resolve) => {
    let input = '';
    process.stdin.setEncoding('utf-8');
    process.stdin.on('data', (chunk) => {
      input += chunk;
    });
    process.stdin.on('end', () => {
      resolve(input);
    });
  });
}

// 主函数
async function main() {
  try {
    const input = await getInput();

    if (!input.trim()) {
      console.error('错误: 输入为空');
      process.exit(1);
    }

    // 转换为Markdown
    const markdown = htmlToReadableMarkdown(input);
    console.log(markdown);

  } catch (error) {
    console.error('错误:', error.message);
    process.exit(1);
  }
}

main();
