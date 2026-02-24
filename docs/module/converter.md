# 核心转换模块

## 概述

提供网页 HTML 内容到可读 Markdown 格式的转换功能,基于 Mozilla Readability 提取主要内容并转换为 Markdown。

## 核心组件

| 类/函数                  | 文件     | 说明                     |
| ------------------------ | -------- | ------------------------ |
| `htmlToReadableMarkdown` | index.js | 将HTML转换为可读Markdown |
| `getArticleMetadata`     | index.js | 获取文章元数据           |

## 处理流程

### HTML转Markdown流程

1. 创建虚拟DOM环境(JSDOM)
2. 使用Readability提取文章主要内容
3. 使用Turndown将HTML转换为Markdown
4. 组合文章标题和内容并返回
