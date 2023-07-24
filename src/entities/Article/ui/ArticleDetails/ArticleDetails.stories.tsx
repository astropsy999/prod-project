// Импорт необходимых зависимостей и компонента
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArticleType } from '../../model/consts/articleConsts';
import { Article } from '../../model/types/article';
import { ArticleDetails } from './ArticleDetails';

// Определение метаданных для Storybook компонента ArticleDetails
export default {
  title: 'entities/Article/ArticleDetails', // Заголовок категории истории
  component: ArticleDetails, // Компонент, который будет показываться в истории
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleDetails>;

// Шаблон компонента для использования в Storybook
const Template: ComponentStory<typeof ArticleDetails> = (args) => (
  <ArticleDetails {...args} />
);

// Объект, представляющий статью для отображения в компоненте ArticleDetails
const article: Article = {
  id: '1',
  title: 'Javascript news',
  subtitle: 'Что нового в JS за 2022 год?',
  img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
  views: 1022,
  createdAt: '26.02.2022',
  user: {
    id: '1',
    username: 'User',
  },
  type: [ArticleType.IT],
  blocks: [
    // Блоки статьи
    //...
  ],
};

// Экспорт различных историй для компонента ArticleDetails
export const Normal = Template.bind({}); // История для отображения компонента с нормальным состоянием
Normal.args = {}; // Начальные аргументы для компонента
Normal.decorators = [
  StoreDecorator({
    articleDetails: {
      data: article,
    },
  }),
]; // Декораторы для статьи с данными

export const Loading = Template.bind({}); // История для отображения компонента с состоянием загрузки
Loading.args = {}; // Начальные аргументы для компонента
Loading.decorators = [
  StoreDecorator({
    articleDetails: {
      isLoading: true,
    },
  }),
]; // Декораторы для статьи с состоянием загрузки

export const Error = Template.bind({}); // История для отображения компонента с состоянием ошибки
Error.args = {}; // Начальные аргументы для компонента
Error.decorators = [
  StoreDecorator({
    articleDetails: {
      error: 'error',
    },
  }),
]; // Декораторы для статьи с состоянием ошибки
