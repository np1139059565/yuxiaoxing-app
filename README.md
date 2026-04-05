# Shadcn-UI 模板使用说明

## 技术栈

本项目使用：

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

所有 shadcn/ui 组件已下载到 `@/components/ui`。

## 文件结构

- `index.html` - HTML 入口文件
- `vite.config.ts` - Vite 配置文件
- `tailwind.config.ts` - Tailwind CSS 配置文件
- `package.json` - 依赖与脚本
- `src/main.tsx` - 项目入口
- `src/App.tsx` - 路由组件（引入页面并配置路由）
- `src/pages/Index.tsx` - 主页面入口（修改此文件以构建 UI）
- `src/index.css` - 全局 CSS 配置

## 组件

- 所有 shadcn/ui 组件已预先下载并可在 `@/components/ui` 使用

## 样式

- 将全局样式添加到 `src/index.css`，或根据需要创建新的 CSS 文件
- 使用 Tailwind 类对组件进行样式化

## 开发

- 在你的 React 组件中从 `@/components/ui` 导入组件
- 通过修改 Tailwind 配置来自定义界面样式

## 说明

`@/` 路径别名指向 `src/` 目录

# 命令

**安装依赖**

```shell
pnpm i
```

**启动预览**

```shell
pnpm run dev
```

**构建项目**

```shell
pnpm run build
```
