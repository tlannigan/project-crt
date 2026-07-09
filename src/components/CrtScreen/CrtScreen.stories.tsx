import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CrtScreen from '@/components/CrtScreen/CrtScreen';

faker.seed(1337);

const meta = {
  component: CrtScreen,
  args: {
    hasBloom: true,
    hasCornerReflection: true,
    hasGlassCurvature: true,
    hasScanlines: true,
    hasFlicker: true,
    hasAperture: true,
    children: <p>{faker.lorem.paragraphs(30)}</p>,
    className: 'p-4'
  },
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof CrtScreen>;

export default meta;
type Story = StoryObj<typeof CrtScreen>;

export const Default: Story = {};
