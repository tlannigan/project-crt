import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview, ReactRenderer } from '@storybook/nextjs-vite';
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    a11y: {
      test: 'error'
    }
  },
  argTypes: {
    children: { table: { disable: true } },
    className: { table: { disable: true } }
  },
  decorators: [
    withThemeByClassName<ReactRenderer>({
      themes: {
        Light: '',
        Dark: 'dark'
      },
      defaultTheme: 'Dark'
    })
  ],
  tags: ['autodocs']
};

export default preview;
