import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CrtScreen from '@/components/CrtScreen/CrtScreen';
import QrCode from '@/components/QrCode/QrCode';

const meta = {
  component: QrCode,
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
  },
  decorators: [
    (Story) => (
      <CrtScreen className="grid place-content-center">
        <Story />
      </CrtScreen>
    )
  ],
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof QrCode>;

export default meta;
type Story = StoryObj<typeof QrCode>;

export const Default: Story = {};
