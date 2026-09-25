import type { Meta, StoryObj } from '@storybook/react-vite';
import Box from '../Box/Box';
import Tunnel from './Tunnel';

const meta = {
  component: Tunnel,
  title: 'Molecules/Tunnel',
  args: {
    maxShapes: 10,
    duration: 3000,
    direction: 'bottom-left-to-top-right',
    shape: 'rectangle',
    size: 144,
    waveAmplitude: 0,
    waveLength: 6,
    strokeWidth: 2
  },
  argTypes: {
    shape: {
      control: 'select',
      options: ['rectangle', 'square', 'circle', 'triangle']
    },
    waveAmplitude: {
      control: { type: 'range', min: 0, max: 40, step: 1 }
    },
    direction: {
      control: 'select',
      options: [
        'bottom-left-to-top-right',
        'bottom-right-to-top-left',
        'top-right-to-bottom-left',
        'top-left-to-bottom-right'
      ]
    }
  },
  decorators: [
    (Story) => (
      <Box className="w-96 h-48 max-w-full my-8 p-0">
        <Story />
      </Box>
    )
  ],
  render: (args) => <Tunnel {...args} className="size-full" />
} satisfies Meta<typeof Tunnel>;

export default meta;
type Story = StoryObj<typeof Tunnel>;

export const Default: Story = {};

export const BottomRightToTopLeft: Story = {
  args: { direction: 'bottom-right-to-top-left' }
};

export const TopRightToBottomLeft: Story = {
  args: { direction: 'top-right-to-bottom-left' }
};

export const TopLeftToBottomRight: Story = {
  args: { direction: 'top-left-to-bottom-right' }
};

export const Dense: Story = {
  args: {
    maxShapes: 32,
    duration: 3000,
    size: 120,
    waveAmplitude: 16,
    waveLength: 12
  }
};

export const Squares: Story = {
  args: { shape: 'square' }
};

export const Triangles: Story = {
  args: { shape: 'triangle' }
};

export const Circles: Story = {
  args: { shape: 'circle' }
};
