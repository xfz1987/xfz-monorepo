# @xfz/ui

Xfz UI 组件库 - 使用 TypeScript + Tailwind CSS + Storybook 构建

## 特性

- ⚡️ TypeScript 支持
- 🎨 Tailwind CSS 样式
- 📚 Storybook 文档和开发环境
- 📦 支持 ESM 和 CJS 格式
- 🔥 热更新开发体验

## 安装

```bash
pnpm install
```

## 开发

启动 Storybook 开发服务器：

```bash
pnpm dev
```

## 构建

构建组件库：

```bash
pnpm build
```

构建 Storybook 静态站点：

```bash
pnpm build:storybook
```

## 使用

```tsx
import { Button } from '@xfz/ui';

function App() {
	return (
		<Button variant='primary' size='md'>
			Click me
		</Button>
	);
}
```

## 组件列表

- Button - 按钮组件

## 技术栈

- React 18
- TypeScript 5
- Tailwind CSS 3
- Storybook 8
- tsup (打包工具)
- Vite (Storybook 构建工具)
