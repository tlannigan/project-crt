import { withThemeByClassName } from '@storybook/addon-themes';
import type { Decorator, Preview, ReactRenderer } from '@storybook/react-vite';
import { themes } from 'storybook/theming';
import CrtMonitor from '../src/components/CrtMonitor/CrtMonitor';
import './preview.css';

// Conditionally render CrtMonitor wrapper around component stories
const withCrtMonitor: Decorator = (Story, { viewMode, parameters, globals }) => {
  const height = viewMode === 'docs' ? '' : 'h-dvh';
  const fontClass = globals.font === 'plex' ? 'font-plex' : 'font-vga';

  return (
    <div className={`${height} ${fontClass}`}>
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
  initialGlobals: {
    font: 'vga'
  },
  globalTypes: {
    font: {
      name: 'Font',
      description: 'Component font family',
      toolbar: {
        icon: 'type',
        items: [
          { value: 'vga', title: 'IBM VGA 8x16' },
          { value: 'plex', title: 'IBM Plex Mono' }
        ],
        dynamicTitle: true
      }
    }
  },
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
