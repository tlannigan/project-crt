import { withThemeByClassName } from '@storybook/addon-themes';
import type { Decorator, Preview, ReactRenderer } from '@storybook/nextjs-vite';
import { IBM_Plex_Mono } from 'next/font/google';
import CrtMonitor from '@/components/CrtMonitor/CrtMonitor';
import '../src/styles/globals.css';
import { themes } from 'storybook/theming';

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-mono-ibm',
  subsets: ['latin'],
  weight: ['400']
});

// Conditionally render CrtMonitor wrapper around component stories
const withCrtMonitor: Decorator = (Story, { viewMode, parameters }) => {
  const height = viewMode === 'docs' ? '' : 'h-dvh';

  return (
    <div className={`${ibmPlexMono.variable} ${height} font-mono-ibm`}>
      {parameters.crtMonitor === false ? (
        <Story />
      ) : (
        <CrtMonitor className="grid place-content-center h-full">
          <Story />
        </CrtMonitor>
      )}
    </div>
  );
};

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    options: {
      storySort: { method: 'alphabetical' }
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    docs: {
      theme: themes.dark
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
        Green: 'green',
        Orange: 'orange'
      },
      defaultTheme: 'Green'
    }),
    withCrtMonitor
  ],
  tags: ['autodocs']
};

export default preview;
