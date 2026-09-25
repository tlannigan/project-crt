import type { Meta, StoryObj } from '@storybook/react-vite';
import QrCode from './QrCode';

const meta = {
  component: QrCode,
  title: 'Atoms/QR Code',
  args: {
    url: 'https://tlannigan.com',
    errorCorrection: 'M',
    quietZone: 4
  },
  argTypes: {
    errorCorrection: {
      control: { type: 'inline-radio' },
      options: ['L', 'M', 'Q', 'H']
    },
    quietZone: {
      control: { type: 'range', min: 0, max: 8, step: 1 }
    }
  }
} satisfies Meta<typeof QrCode>;

export default meta;
type Story = StoryObj<typeof QrCode>;

export const Default: Story = {};
