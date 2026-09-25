import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-themes',
    '@storybook/addon-mcp'
  ],

  framework: '@storybook/nextjs-vite',
  staticDirs: ['../public'],

  features: {
    experimentalReview: true,
    experimentalDocgenServer: true
  }
};
export default config;
