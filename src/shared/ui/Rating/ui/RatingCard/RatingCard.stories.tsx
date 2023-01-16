import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { RatingCard } from './RatingCard';

export default {
  title: 'shared/Rating',
  component: RatingCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof RatingCard>;

const Template: ComponentStory<typeof RatingCard> = (args) => (
  <RatingCard {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
