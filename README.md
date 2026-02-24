# readability-cli

将网页 HTML 转换为可读 Markdown 格式的命令行工具。

## 功能特性

- 自动提取网页主要内容,过滤导航、广告等无关内容
- 将 HTML 转换为简洁的 Markdown 格式

## 安装

```bash
npm install
```

## 使用方法

### 本地运行

```bash
# 显示帮助信息
node src/cli.js

# 从文件读取
node src/cli.js input.html
```

### 全局安装

```bash
# 从 GitHub 安装
npm install -g markwin1980/readability-cli

# 显示帮助信息
readability-cli

# 使用全局命令
readability-cli input.html
```

## 示例

输入文件 `input.html`:
```html
<!DOCTYPE html>
<html>
<head><title>文章标题</title></head>
<body>
  <nav>导航栏</nav>
  <article>
    <h1>主要文章标题</h1>
    <p>这是一段测试文字。</p>
  </article>
  <footer>页脚</footer>
</body>
</html>
```

输出:
```markdown
# 文章标题

## 主要文章标题

这是一段测试文字。
```

## 技术栈

- [@mozilla/readability](https://github.com/mozilla/readability) - 提取网页主要内容
- [jsdom](https://github.com/jsdom/jsdom) - DOM 实现
- [turndown](https://github.com/mixmark-io/turndown) - HTML 转 Markdown

## License

MIT
