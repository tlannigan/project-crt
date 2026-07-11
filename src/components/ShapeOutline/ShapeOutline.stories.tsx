import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ShapeOutline from '@/components/ShapeOutline/ShapeOutline';

const meta = {
  component: ShapeOutline,
  title: 'Atoms/Shape Outline',
  args: {
    type: 'square',
    width: 144,
    height: 144,
    strokeWidth: 2,
    color: 'currentColor'
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['rectangle', 'square', 'circle', 'triangle']
    },
    width: { control: { type: 'range', min: 16, max: 240, step: 1 } },
    height: { control: { type: 'range', min: 16, max: 240, step: 1 } },
    strokeWidth: { control: { type: 'range', min: 1, max: 12, step: 1 } }
  },
  decorators: [
    (Story) => (
      <div className="text-foreground m-8">
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof ShapeOutline>;

export default meta;
type Story = StoryObj<typeof ShapeOutline>;

export const Square: Story = {};

export const Rectangle: Story = {
  args: { type: 'rectangle', height: 90 }
};

export const Circle: Story = {
  args: { type: 'circle' }
};

export const Triangle: Story = {
  args: { type: 'triangle' }
};

export const ThickStroke: Story = {
  args: { strokeWidth: 8 }
};
