import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { CommentList } from './CommentList';

export default {
  title: 'shared/CommentList',
  component: CommentList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => (
  <CommentList {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
