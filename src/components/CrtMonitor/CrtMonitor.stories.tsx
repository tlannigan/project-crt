import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CrtMonitor from '@/components/CrtMonitor/CrtMonitor';

faker.seed(1337);

const meta = {
  component: CrtMonitor,
  title: 'CRT Monitor',
  parameters: {
    // This story IS the CrtMonitor, prevent double CrtMonitor wrappers
    crtMonitor: false
  },
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
    children: <>{faker.lorem.paragraphs(10)}</>,
    className: 'grid place-content-center h-full px-6 py-4'
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
  }
} satisfies Meta<typeof CrtMonitor>;

export default meta;
type Story = StoryObj<typeof CrtMonitor>;

export const Default: Story = {};
