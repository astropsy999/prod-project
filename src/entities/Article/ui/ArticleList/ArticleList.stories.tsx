import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { ArticleList } from './ArticleList';

export default {
  title: 'shared/ArticleList',
  component: ArticleList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleList>;

const Template: ComponentStory<typeof ArticleList> = (args) => (
  <ArticleList {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
