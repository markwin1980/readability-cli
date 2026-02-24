# readability-cli

将网页 HTML 转换为可读 Markdown 格式的命令行工具。

## 功能特性

- 自动提取网页主要内容，过滤导航、广告等无关内容
- 将 HTML 转换为简洁的 Markdown 格式
- 支持从 URL 直接获取网页内容

## 安装

```bash
npm install
```

## 使用方法

### 本地运行

```bash
# 显示帮助信息
node src/cli.js

# 从 URL 获取网页并转换为 Markdown
node src/cli.js https://example.com/article

# 从文件读取
node src/cli.js input.html

# 输出到文件
node src/cli.js https://example.com/article > output.md
```

### 全局安装

```bash
# 从 GitHub 安装
npm install -g markwin1980/readability-cli

# 显示帮助信息
readability-cli

# 使用全局命令
readability-cli https://example.com/article > output.md
```

## 示例

从 URL 获取网页：

```bash
node src/cli.js https://client.sina.com.cn/news/2026-02-24/doc-inhnxhni2045551.shtml
```

输出:
```markdown
# 年轻人主导2026春节团圆新方式：反向过年、重探家乡、AI管家

　　春回大地，万象更新。2026年春节，9天的"史上最长假期"...
```

## 技术栈

- [@mozilla/readability](https://github.com/mozilla/readability) - 提取网页主要内容
- [linkedom](https://github.com/WebReflection/linkedom) - 轻量级 DOM 实现
- [turndown](https://github.com/mixmark-io/turndown) - HTML 转 Markdown
- [playwright](https://playwright.dev/) - 浏览器自动化，用于获取动态网页

## License

MIT
