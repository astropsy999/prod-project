// Импорт библиотек и компонентов для использования в сторибуке (storybook)
import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ArticleView } from '../../model/consts/articleConsts';
import { ArticleListItem } from './ArticleListItem';
import { Article } from '../../model/types/article';

/**
 *В данном коде представлена конфигурация компонента ArticleListItem для отображения в сторибуке (storybook).
 *Сторибук - это инструмент для разработки компонентов React, который позволяет создавать документацию и примеры использования компонентов.
 *Компонент имеет два варианта отображения - Big и Small. В каждом из вариантов компоненту передаются аргументы view (вид отображения статьи)
 *и article (объект с информацией о статье), которые используются для правильного отображения компонента в сторибуке.
 *Объект article содержит информацию о статье, такую как id, заголовок, подзаголовок, изображение, количество просмотров,
 *дата создания и другие свойства. Он также содержит массив blocks, в котором хранятся блоки статьи (текстовые, кодовые, изображения и т.д.).
 *Строка as ComponentMeta<typeof ArticleListItem> задает тип метаинформации компонента для сторибука, а as ComponentStory<typeof ArticleListItem>
 *указывает тип шаблона компонента. Компонент Template используется для отображения компонента ArticleListItem с переданными аргументами.
 *Таким образом, разработчик может увидеть, как компонент будет выглядеть с различными входными данными в сторибуке.
 */

// Конфигурация компонента для сторибука
export default {
  title: 'entities/Article/ArticleListItem',
  component: ArticleListItem,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleListItem>;

// Шаблон компонента для отображения в сторибуке
const Template: ComponentStory<typeof ArticleListItem> = (args) => (
  <ArticleListItem {...args} />
);

// Объект с информацией о статье для отображения в сторибуке
const article = {
  id: '1',
  title: 'Javascript news asfasjf asfjkask f',
  subtitle: 'Что нового в JS за 2022 год?',
  img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
  views: 1022,
  createdAt: '26.02.2022',
  user: {
    id: '1',
    username: 'Ulbi tv',
    avatar:
      'https://xakep.ru/wp-content/uploads/2018/05/171485/KuroiSH-hacker.jpg',
  },
  type: ['IT', 'SCIENCE', 'POLITICS', 'ECONOMICS'],
  blocks: [
    // Массив с блоками статьи (текст, код, изображение и т.д.)
    // Каждый блок содержит id, type и другие свойства в зависимости от типа блока
  ],
} as Article;

// Компонент для представления большой статьи (в виде списка)
export const Big = Template.bind({});
Big.args = {
  view: ArticleView.LIST,
  article, // Передаем объект с информацией о статье в компонент
};

// Компонент для представления маленькой статьи (в виде карточки)
export const Small = Template.bind({});
Small.args = {
  view: ArticleView.CARDS,
  article, // Передаем объект с информацией о статье в компонент
};
