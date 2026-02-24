# 核心转换模块

## 概述

提供网页 HTML 内容到可读 Markdown 格式的转换功能，基于 Mozilla Readability 提取主要内容并转换为 Markdown。

## 核心组件

| 类/函数                  | 文件     | 说明                     |
| ------------------------ | -------- | ------------------------ |
| `fetchHtml`              | index.js | 从 URL 获取网页 HTML     |
| `htmlToReadableMarkdown` | index.js | 将HTML转换为可读Markdown |
| `getArticleMetadata`     | index.js | 获取文章元数据           |

## 处理流程

### HTML转Markdown流程

1. 创建虚拟DOM环境（使用 linkedom）
2. 使用Readability提取文章主要内容
3. 使用Turndown将HTML转换为Markdown
4. 组合文章标题和内容并返回

## 依赖库

- **linkedom** - 轻量级 DOM 实现，替代 jsdom
- **@mozilla/readability** - 提取网页主要内容
- **turndown** - HTML 转 Markdown
- **playwright** - 浏览器自动化，用于获取动态网页
