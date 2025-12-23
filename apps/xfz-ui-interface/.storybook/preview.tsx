import type { Preview } from '@storybook/react';
import '@xfz/ui/src/styles/globals.css';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		options: {
			storySort: {
				order: ['欢迎', ['介绍'], 'Components', ['Button', 'Input']],
			},
		},
	},
};

export default preview;
