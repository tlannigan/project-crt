import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-themes',
    '@storybook/addon-mcp'
  ],

  framework: '@storybook/react-vite',

  features: {
    experimentalReview: true,
    experimentalDocgenServer: true
  },

  viteFinal: (config) => ({
    ...config,
    plugins: [...(config.plugins ?? []), tailwindcss()]
  })
};
export default config;
