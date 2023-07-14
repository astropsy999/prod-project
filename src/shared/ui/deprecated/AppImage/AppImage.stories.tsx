import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { AppImage } from './AppImage';

export default {
  title: 'shared/AppImage',
  component: AppImage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AppImage>;

const Template: ComponentStory<typeof AppImage> = (args) => (
  <AppImage {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
