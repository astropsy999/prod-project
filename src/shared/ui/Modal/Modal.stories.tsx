import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/TemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Modal } from './Modal';

export default {
  title: 'shared/Modal',
  component: Modal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
  children:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At atque consectetur corporis cum deserunt dignissimos dolore dolores eius eos esse est eum eveniet harum hic incidunt inventore ipsa iste iure magnam magni maxime nam nulla numquam officia quae quia quidem sint soluta suscipit, tempore ullam veniam vero vitae. Minima, repudiandae!\n',
};

export const Dark = Template.bind({});
Dark.args = {
  isOpen: true,
  children:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At atque consectetur corporis cum deserunt dignissimos dolore dolores eius eos esse est eum eveniet harum hic incidunt inventore ipsa iste iure magnam magni maxime nam nulla numquam officia quae quia quidem sint soluta suscipit, tempore ullam veniam vero vitae. Minima, repudiandae!\n',
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];
