import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { ArticleSortSelector } from './ArticleSortSelector';

export default {
  title: 'shared/ArticleSortSelector',
  component: ArticleSortSelector,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleSortSelector>;

const Template: ComponentStory<typeof ArticleSortSelector> = (args) => (
  <ArticleSortSelector {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
