import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import avatar from 'shared/assets/tests/avatar.webp';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/TemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import ProfilePage from './ProfilePage';

export default {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = (args) => (
  <ProfilePage {...(args as object)} />
);

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [
  StoreDecorator({
    profile: {
      form: {
        username: 'admin',
        age: 42,
        country: Country.Ukraine,
        lastname: 'Фамилия',
        currency: Currency.UAH,
        first: 'Имя',
        city: 'Город',
        avatar: avatar,
      },
    },
  }),
];

export const Dark = Template.bind({});
Dark.args = {};

Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    profile: {
      form: {
        username: 'admin',
        age: 42,
        country: Country.Ukraine,
        lastname: 'Фамилия',
        currency: Currency.UAH,
        first: 'Имя',
        city: 'Город',
        avatar: avatar,
      },
    },
  }),
];
