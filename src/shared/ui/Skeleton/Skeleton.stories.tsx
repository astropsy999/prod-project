import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/TemeDecorator';
import { Skeleton } from './Skeleton';

export default {
  title: 'shared/Skeleton',
  component: Skeleton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => (
  <Skeleton {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  width: '100%',
  height: 200,
};

export const Circle = Template.bind({});
Circle.args = {
  border: '50%',
  width: 100,
  height: 100,
};

export const NormalDark = Template.bind({});
NormalDark.args = {
  width: '100%',
  height: 200,
};

NormalDark.decorators = [ThemeDecorator(Theme.DARK)];

export const CircleDark = Template.bind({});
CircleDark.args = {
  border: '50%',
  width: 100,
  height: 100,
};
CircleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const NormalGDC = Template.bind({});
NormalGDC.args = {
  width: '100%',
  height: 200,
};

NormalGDC.decorators = [ThemeDecorator(Theme.GDC)];

export const CircleGDC = Template.bind({});
CircleGDC.args = {
  border: '50%',
  width: 100,
  height: 100,
};
CircleGDC.decorators = [ThemeDecorator(Theme.GDC)];
