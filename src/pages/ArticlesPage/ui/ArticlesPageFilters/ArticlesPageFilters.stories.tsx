import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { ArticlesPageFilters } from './ArticlesPageFilters';

export default {
  title: 'shared/ArticlesPageFilters',
  component: ArticlesPageFilters,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticlesPageFilters>;

const Template: ComponentStory<typeof ArticlesPageFilters> = (args) => (
  <ArticlesPageFilters {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
