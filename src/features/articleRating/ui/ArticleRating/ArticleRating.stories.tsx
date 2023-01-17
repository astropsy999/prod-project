import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import ArticleRating from './ArticleRating';

export default {
  title: 'shared/ArticleRating',
  component: ArticleRating,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleRating>;

const Template: ComponentStory<typeof ArticleRating> = (args) => (
  <ArticleRating {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
