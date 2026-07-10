import { withThemeByClassName } from '@storybook/addon-themes';
import type { Decorator, Preview, ReactRenderer } from '@storybook/nextjs-vite';
import { IBM_Plex_Mono } from 'next/font/google';
import CrtScreen from '@/components/CrtScreen/CrtScreen';
import '../src/styles/globals.css';
import { themes } from 'storybook/theming';

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-mono-ibm',
  subsets: ['latin'],
  weight: ['400']
});

// Conditionally render CrtScreen wrapper around component stories
const withCrtScreen: Decorator = (Story, { viewMode, parameters }) => {
  const height = viewMode === 'docs' ? '' : 'h-dvh';

  return (
    <div className={`${ibmPlexMono.variable} ${height} font-mono-ibm`}>
      {parameters.crtScreen === false ? (
        <Story />
      ) : (
        <CrtScreen className="grid place-content-center h-full">
          <Story />
        </CrtScreen>
      )}
    </div>
  );
};

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
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
    withCrtScreen
  ],
  tags: ['autodocs']
};

export default preview;
