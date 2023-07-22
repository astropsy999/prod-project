import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { Text } from './Text';

export default {
  title: 'shared/Text', // Storybook title for the component
  component: Text, // Component being documented
  argTypes: {
    backgroundColor: { control: 'color' }, // Define the control for the backgroundColor prop
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />; // Define the template for the component story

export const Primary = Template.bind({}); // Primary story
Primary.args = {
  title: 'Title Title',
  text: 'Text Text Text Text',
};

export const Error = Template.bind({}); // Error story
Error.args = {
  title: 'Title Title',
  text: 'Text Text Text Text',
  variant: 'error',
};

export const OnlyTitle = Template.bind({}); // OnlyTitle story
OnlyTitle.args = {
  title: 'Title Title',
};

export const OnlyText = Template.bind({}); // OnlyText story
OnlyText.args = {
  text: 'Text Text Text Text',
};

export const PrimaryDark = Template.bind({}); // PrimaryDark story
PrimaryDark.args = {
  title: 'Title Title',
  text: 'Text Text Text Text',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)]; // Apply the ThemeDecorator with the DARK theme

export const OnlyTitleDark = Template.bind({}); // OnlyTitleDark story
OnlyTitleDark.args = {
  title: 'Title Title',
};
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)]; // Apply the ThemeDecorator with the DARK theme

export const OnlyTextDark = Template.bind({}); // OnlyTextDark story
OnlyTextDark.args = {
  text: 'Text Text Text Text',
};
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)]; // Apply the ThemeDecorator with the DARK theme

export const SizeL = Template.bind({}); // SizeL story
SizeL.args = {
  title: 'Title Title',
  text: 'Text Text Text Text',
  size: 'l',
};

export const SizeM = Template.bind({}); // SizeM story
SizeM.args = {
  title: 'Title Title',
  text: 'Text Text Text Text',
  size: 'm',
};

export const SizeS = Template.bind({}); // SizeS story
SizeS.args = {
  title: 'Title Title',
  text: 'Text Text Text Text',
  size: 's',
};
