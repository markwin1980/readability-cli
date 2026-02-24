# 项目测试说明

本文件仅包含项目的**测试命令**说明。

## 安装依赖

```bash
npm install
```

## 运行测试

### 基本功能测试

```bash
# 显示帮助信息
node src/cli.js

# 从文件读取测试
node src/cli.js test.html

# 从管道读取测试
cat test.html | node src/cli.js
```

### 全局命令测试

```bash
# 注册全局命令
npm link

# 使用全局命令测试
readability-cli test.html
cat test.html | readability-cli
```

### 预期结果

- 成功提取文章主要内容
- 过滤导航、侧边栏、广告、页脚等无关内容
- 正确转换标题、代码块、列表、链接等格式为 Markdown
