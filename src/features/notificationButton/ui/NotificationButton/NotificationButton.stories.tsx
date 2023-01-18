import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { NotificationButton } from './NotificationButton';

export default {
  title: 'entities/NotificationButton',
  component: NotificationButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NotificationButton>;

const Template: ComponentStory<typeof NotificationButton> = (args) => (
  <NotificationButton {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
