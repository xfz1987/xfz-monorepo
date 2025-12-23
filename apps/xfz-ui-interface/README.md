# @xfz/ui-interface

Storybook 展示界面，用于 @xfz/ui 组件库的文档和开发。

## 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:6006 查看组件文档。

## 构建静态站点

```bash
pnpm build
```

构建后的文件在 `storybook-static` 目录。

## 预览构建结果

```bash
pnpm preview
```

## 项目结构

```
src/
└── stories/
    ├── Button.stories.tsx    # Button 组件故事
    └── Input.stories.tsx     # Input 组件故事
```

## 添加新的 Story

在 `src/stories/` 目录下创建新的 `.stories.tsx` 文件：

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from '@xfz/ui';

const meta = {
	title: 'Components/YourComponent',
	component: YourComponent,
	tags: ['autodocs'],
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		// your props
	},
};
```
