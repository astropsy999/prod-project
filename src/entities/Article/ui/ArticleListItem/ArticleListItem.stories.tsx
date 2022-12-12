import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { ArticleListItem } from './ArticleListItem';

export default {
  title: 'shared/ArticleListItem',
  component: ArticleListItem,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleListItem>;

const Template: ComponentStory<typeof ArticleListItem> = (args) => (
  <ArticleListItem {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
