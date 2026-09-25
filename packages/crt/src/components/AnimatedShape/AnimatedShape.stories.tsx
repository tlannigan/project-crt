import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import AnimatedShape from '@/components/AnimatedShape/AnimatedShape';
import Box from '@/components/Box/Box';

const BOTTOM_LEFT_TO_TOP_RIGHT = {
  from: { x: '0%', y: '100%' },
  to: { x: '100%', y: '0%' }
};

const meta = {
  component: AnimatedShape,
  title: 'Atoms/Tunnel Shape',
  args: {
    shape: 'rectangle',
    size: 144,
    strokeWidth: 2,
    color: 'currentColor',
    path: BOTTOM_LEFT_TO_TOP_RIGHT,
    offset: 0,
    age: 1500, // Middle of animation duration
    duration: 3000,
    paused: true
  },
  argTypes: {
    shape: {
      control: 'select',
      options: ['rectangle', 'square', 'circle', 'triangle']
    },
    size: { control: { type: 'range', min: 16, max: 240, step: 1 } },
    offset: { control: { type: 'range', min: -80, max: 80, step: 1 } },
    age: { control: { type: 'range', min: 0, max: 3000, step: 1 } },
    path: { control: false }
  },
  decorators: [
    (Story) => (
      <Box className="w-96 h-48 max-w-full my-8 p-0">
        <Story />
      </Box>
    )
  ]
} satisfies Meta<typeof AnimatedShape>;

export default meta;
type Story = StoryObj<typeof AnimatedShape>;

export const MidFlight: Story = {};

export const NearStart: Story = {
  args: { age: 300 }
};

export const NearEnd: Story = {
  args: { age: 2700 }
};

export const Animated: Story = {
  args: { paused: false }
};
