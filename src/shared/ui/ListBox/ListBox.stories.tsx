import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { ListBox } from './ListBox';

export default {
  title: 'shared/ListBox',
  component: ListBox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '100px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => (
  // @ts-ignore
  <ListBox {...args} />
);

export const BottomRight = Template.bind({});
BottomRight.args = {
  direction: 'bottom-right',
  value: '123',
  items: [
    {
      content: '1212132131231',
      value: 'adsfsd',
    },
    {
      content: '1212132131sd231',
      value: 'adsfsdasda',
    },
  ],
};

export const TopLeft = Template.bind({});
TopLeft.args = {
  direction: 'top-left',
  value: '123',
  items: [
    {
      content: '1212132131231',
      value: 'adsfsd',
    },
    {
      content: '1212132131sd231',
      value: 'adsfsdasda',
    },
  ],
};

export const TopRight = Template.bind({});
TopRight.args = {
  direction: 'top-right',
  value: '123',
  items: [
    {
      content: '1212132131231',
      value: 'adsfsd',
    },
    {
      content: '1212132131sd231',
      value: 'adsfsdasda',
    },
  ],
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
  direction: 'bottom-left',
  value: '123',
  items: [
    {
      content: '1212132131231',
      value: 'adsfsd',
    },
    {
      content: '1212132131sd231',
      value: 'adsfsdasda',
    },
  ],
};
