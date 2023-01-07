import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { ArticleInfiniteList } from './ArticleInfiniteList';

export default {
  title: 'paged/ArticlesPage/ArticleInfiniteList',
  component: ArticleInfiniteList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleInfiniteList>;

const Template: ComponentStory<typeof ArticleInfiniteList> = (args) => (
  <ArticleInfiniteList {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
