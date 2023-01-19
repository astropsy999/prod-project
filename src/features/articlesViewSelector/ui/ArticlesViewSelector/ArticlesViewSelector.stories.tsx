import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticlesViewSelector } from './ArticlesViewSelector';

export default {
  title: 'features/ArticlesViewSelector',
  component: ArticlesViewSelector,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticlesViewSelector>;

const Template: ComponentStory<typeof ArticlesViewSelector> = (args) => (
  <ArticlesViewSelector {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
