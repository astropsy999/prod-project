import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { AvatarDropdown } from './AvatarDropdown';

export default {
  title: 'shared/AvatarDropdown',
  component: AvatarDropdown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AvatarDropdown>;

const Template: ComponentStory<typeof AvatarDropdown> = (args) => (
  <AvatarDropdown {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
