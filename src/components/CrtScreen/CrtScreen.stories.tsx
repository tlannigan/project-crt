import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CrtScreen from '@/components/CrtScreen/CrtScreen';

faker.seed(1337);

const meta = {
  component: CrtScreen,
  args: {
    hasBloom: true,
    hasCornerReflection: true,
    hasEdgeShadow: true,
    hasScanlines: true,
    hasFlicker: true,
    hasGrain: true,
    hasHumBar: true,
    hasPhosphorMask: true,
    scanlineCount: 240,
    children: <>{faker.lorem.paragraphs(30)}</>,
    className: 'p-4'
  },
  argTypes: {
    scanlineCount: {
      control: {
        type: 'range',
        min: 16,
        max: 1000,
        step: 1
      }
    }
  },
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof CrtScreen>;

export default meta;
type Story = StoryObj<typeof CrtScreen>;

export const Default: Story = {};
