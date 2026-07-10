import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@/components/Box';

faker.seed(1337);

const meta = {
  component: Box,
  args: {
    title: 'Transmission Control',
    children: <p>{faker.lorem.paragraphs(2)}</p>,
    className: 'w-144 my-8'
  }
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {};

export const NoTitle: Story = {
  args: {
    title: ''
  }
};
