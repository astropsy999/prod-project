import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Select } from './Select';

export default {
  title: 'shared/Select',
  component: Select,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Укажите значение',
  options: [
    { value: '1', content: '1' },
    { value: '2', content: '2' },
    { value: '3', content: '3' },
  ],
};
