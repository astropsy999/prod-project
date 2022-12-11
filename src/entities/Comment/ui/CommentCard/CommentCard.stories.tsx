import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { CommentCard } from './CommentCard';

export default {
  title: 'entities/Comment/CommentCard',
  component: CommentCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => (
  <CommentCard {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  comment: {
    id: '1',
    text: 'Comment 1',
    user: { id: '1', username: 'User' },
  },
};

export const Loading = Template.bind({});
Loading.args = {
  comment: {
    id: '1',
    text: 'Comment 1',
    user: { id: '1', username: 'User' },
  },
  isLoading: true,
};
