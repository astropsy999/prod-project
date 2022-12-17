import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { ArticlesViewSwitcher } from './ArticlesViewSwitcher';

export default {
  title: 'entities/Article/ArticlesViewSwitcher',
  component: ArticlesViewSwitcher,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticlesViewSwitcher>;

const Template: ComponentStory<typeof ArticlesViewSwitcher> = (args) => (
  <ArticlesViewSwitcher {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
