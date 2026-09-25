import type { Meta, StoryObj } from '@storybook/react-vite';
import ProgressBar from './ProgressBar';

const meta = {
  component: ProgressBar,
  title: 'Atoms/ProgressBar',
  args: {
    value: 60,
    cells: 20,
    orientation: 'horizontal',
    autoPlay: true,
    duration: 3000,
    className: 'my-8'
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 }
    },
    cells: {
      control: { type: 'range', min: 1, max: 60, step: 1 }
    },
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical']
    },
    duration: {
      control: { type: 'number' }
    },
    showTrack: {
      control: { type: 'boolean' }
    }
  }
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {};

export const Vertical: Story = {
  args: { orientation: 'vertical', cells: 12 }
};

export const DimTrack: Story = {
  args: { showTrack: true }
};
