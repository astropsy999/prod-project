import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import ArticleDetailsPage from './ArticleDetailsPage';

export default {
  title: 'entities/ArticleDetailsPage',
  component: ArticleDetailsPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleDetailsPage>;

const Template: ComponentStory<typeof ArticleDetailsPage> = (args) => (
  <ArticleDetailsPage {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
