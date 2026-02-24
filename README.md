# readability-cli

将网页 HTML 转换为可读 Markdown 格式的命令行工具。

## 功能特性

- 自动提取网页主要内容,过滤导航、广告等无关内容
- 将 HTML 转换为简洁的 Markdown 格式
- 支持文件参数和管道输入

## 安装

```bash
npm install
```

## 使用方法

### 本地运行

```bash
# 从文件读取
node src/cli.js input.html

# 从管道读取
cat input.html | node src/cli.js
```

### 全局安装

```bash
# 注册全局命令
npm link

# 使用全局命令
readability-cli input.html
cat input.html | readability-cli
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
