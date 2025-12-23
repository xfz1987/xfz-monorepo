import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@xfz/ui/src';

const meta = {
	title: 'Components/Input',
	component: Input,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'filled', 'outlined'],
			description: 'Input 样式变体',
		},
		inputSize: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
			description: 'Input 尺寸',
		},
		type: {
			control: 'select',
			options: ['text', 'email', 'password', 'number', 'tel', 'url'],
		},
		disabled: {
			control: 'boolean',
		},
	},
	decorators: [
		(Story) => (
			<div style={{ width: '400px' }}>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: '请输入内容...',
	},
};

export const WithLabel: Story = {
	args: {
		label: '用户名',
		placeholder: '请输入用户名',
	},
};

export const WithHelperText: Story = {
	args: {
		label: '邮箱',
		placeholder: 'example@email.com',
		helperText: '我们会保护您的隐私信息',
		type: 'email',
	},
};

export const WithError: Story = {
	args: {
		label: '密码',
		placeholder: '请输入密码',
		type: 'password',
		error: '密码长度至少为 8 位',
	},
};

export const Filled: Story = {
	args: {
		variant: 'filled',
		label: '姓名',
		placeholder: '请输入姓名',
	},
};

export const Outlined: Story = {
	args: {
		variant: 'outlined',
		label: '电话',
		placeholder: '请输入电话号码',
		type: 'tel',
	},
};

export const Small: Story = {
	args: {
		inputSize: 'sm',
		label: '小尺寸',
		placeholder: '小尺寸输入框',
	},
};

export const Medium: Story = {
	args: {
		inputSize: 'md',
		label: '中尺寸',
		placeholder: '中尺寸输入框',
	},
};

export const Large: Story = {
	args: {
		inputSize: 'lg',
		label: '大尺寸',
		placeholder: '大尺寸输入框',
	},
};

export const Disabled: Story = {
	args: {
		label: '禁用状态',
		placeholder: '禁用的输入框',
		disabled: true,
		value: '不可编辑',
	},
};

export const Password: Story = {
	args: {
		label: '密码',
		type: 'password',
		placeholder: '请输入密码',
		helperText: '密码长度应为 8-20 位',
	},
};

export const Email: Story = {
	args: {
		label: '邮箱地址',
		type: 'email',
		placeholder: 'your@email.com',
	},
};

export const NumberInput: Story = {
	args: {
		label: '数量',
		type: 'number',
		placeholder: '请输入数量',
		min: 0,
		max: 100,
	},
};

export const WithValue: Story = {
	args: {
		label: '预填充值',
		value: '这是预填充的值',
		helperText: '您可以修改这个值',
	},
};

export const FilledWithError: Story = {
	args: {
		variant: 'filled',
		label: '电子邮箱',
		placeholder: 'example@email.com',
		type: 'email',
		error: '邮箱格式不正确',
	},
};

export const OutlinedWithError: Story = {
	args: {
		variant: 'outlined',
		label: '手机号',
		placeholder: '请输入手机号',
		type: 'tel',
		error: '手机号格式不正确',
	},
};
