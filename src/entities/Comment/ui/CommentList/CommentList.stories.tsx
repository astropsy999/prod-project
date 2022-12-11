import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { CommentList } from './CommentList';

export default {
  title: 'entities/Comment/CommentList',
  component: CommentList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => (
  <CommentList {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  comments: [
    {
      id: '1',
      text: 'Comment 1',
      user: { id: '1', username: 'User' },
    },
    {
      id: '2',
      text: 'Comment 2',
      user: { id: '2', username: 'Admin' },
    },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  comments: [],
  isLoading: true,
};
