import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview, ReactRenderer } from '@storybook/nextjs-vite';
import { IBM_Plex_Mono } from 'next/font/google';
import '../src/styles/globals.css';

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-mono-ibm',
  subsets: ['latin'],
  weight: ['400']
});

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
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
    (Story) => (
      <div className={`${ibmPlexMono.variable} font-mono-ibm`}>
        <Story />
      </div>
    ),
    withThemeByClassName<ReactRenderer>({
      themes: {
        Green: 'green',
        Orange: 'orange'
      },
      defaultTheme: 'Green'
    })
  ],
  tags: ['autodocs']
};

export default preview;
