# BrandVoice 灵感库

品牌知识资产管理与灵感收集工具 - 中文版 PWA

## 功能特性

- 📚 **资料库** - 管理和浏览所有归档文档
- 💡 **灵感墙** - 金句流动展示（流动/网格双模式）
- 🔍 **智能检索** - 标签和全文搜索
- 📖 **文档阅读器** - 双栏布局，智能导航
- 💾 **数据备份** - 一键导出/恢复所有数据
- 🌐 **PWA 支持** - 可安装为独立应用

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 部署步骤

### 1. 构建应用

```bash
npm run build
```

构建产物将生成在 `dist/` 目录。

### 2. 部署到服务器

将 `dist/` 目录的所有文件上传到您的 Web 服务器（如 Nginx, Apache, Vercel, Netlify 等）。

### 3. PWA 安装

部署后，在支持的浏览器中访问应用：

- **桌面端**: Chrome/Edge 浏览器会在地址栏显示"安装"图标
- **移动端**: 使用浏览器的"添加到主屏幕"功能

### 4. 图标配置（可选）

替换 `public/` 目录下的图标文件：

- `icon-192x192.png` - 192x192 像素
- `icon-512x512.png` - 512x512 像素

## 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **数据存储**: localStorage (浏览器本地存储)

## 数据格式

支持导入的 JSON 文档格式：

```json
{
  "document": {
    "id": "doc_001",
    "title": "文档标题",
    "date": "2025-01-01",
    "interviewees": ["姓名"],
    "summary": "摘要"
  },
  "sections": [
    {
      "title": "章节标题",
      "category": "【观点/理念】",
      "tags": ["标签1", "标签2"],
      "insight": "核心洞察",
      "quotes": ["金句1", "金句2"],
      "keyPoints": ["要点1", "要点2"]
    }
  ]
}
```

## 版本

v1.2.0 - 完整中文本地化，PWA 就绪

## 许可

MIT License
