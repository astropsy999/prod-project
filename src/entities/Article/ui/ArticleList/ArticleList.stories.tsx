// Импорт необходимых зависимостей из библиотек
import { ComponentMeta, ComponentStory } from '@storybook/react';

// Импорт компонента ArticleList из файла, который будет тестироваться
import { ArticleList } from './ArticleList';
// Импорт типа ArticleView из файла с константами статьи
import { ArticleView } from '../../model/consts/articleConsts';
// Импорт типа Article из файла с типами статьи
import { Article } from '../../model/types/article';

/**
 * В данном коде представлен компонент ArticleList,
 * который используется для отображения списка статей или карточек с информацией о них.
 * Он является частью сторибука (Storybook) и содержит примеры различных состояний компонента для
 * его демонстрации в Storybook. Каждый пример (LoadingBig, LoadingSmall, ListSmall, ListBig) содержит свои аргументы,
 * которые передаются в компонент ArticleList через шаблон Template.Примеры включают различные комбинации массива статей (articles),
 * флага загрузки (isLoading) и вида компонента (view).
 *
 * Template - это шаблон для компонента ArticleList, который используется для демонстрации различных вариантов компонента в Storybook.
 * Он принимает аргументы и передает их в ArticleList.
 * article - это объект с данными о статье, который используется для создания примеров статей в различных состояниях.
 * Компонент ArticleList в коде не представлен и должен содержать логику для отображения списка или карточек статей на основе переданных пропсов
 * (articles, isLoading, view).
 */

// Настройки для истории компонента, чтобы использовать его в Storybook
export default {
  title: 'entities/Article/ArticleList', // Заголовок для категории компонента в Storybook
  component: ArticleList, // Сам компонент, который будет тестироваться
  argTypes: {
    backgroundColor: { control: 'color' }, // Настройка аргументов для изменения фона компонента (для демонстрации в Storybook)
  },
} as ComponentMeta<typeof ArticleList>;

// Шаблон компонента, используется для демонстрации различных вариантов компонента в Storybook
const Template: ComponentStory<typeof ArticleList> = (args) => (
  <ArticleList {...args} />
);

// Объект с данными о статье, используется для создания примеров статей
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
    // Здесь перечислены блоки статьи, содержащие различные типы контента
  ],
} as Article;

// Примеры различных состояний компонента для демонстрации в Storybook

// Пример компонента с загрузкой и видом "список" (ArticleView.LIST)
export const LoadingBig = Template.bind({});
LoadingBig.args = {
  articles: [], // Пустой массив статей
  isLoading: true, // Флаг загрузки
  view: ArticleView.LIST, // Вид компонента - список
};

// Пример компонента с загрузкой и видом "карточки" (ArticleView.CARDS)
export const LoadingSmall = Template.bind({});
LoadingSmall.args = {
  articles: [], // Пустой массив статей
  isLoading: true, // Флаг загрузки
  view: ArticleView.CARDS, // Вид компонента - карточки
};

// Пример компонента с заполненным массивом статей и видом "карточки" (ArticleView.CARDS)
export const ListSmall = Template.bind({});
ListSmall.args = {
  articles: new Array(9).fill(0).map((item, index) => ({
    ...article,
    id: String(index),
  })), // Массив с 9 одинаковыми статьями, но с различными id
  isLoading: false, // Флаг загрузки (false, т.к. статьи загружены)
  view: ArticleView.CARDS, // Вид компонента - карточки
};

// Пример компонента с заполненным массивом статей и видом "список" (ArticleView.LIST)
export const ListBig = Template.bind({});
ListBig.args = {
  articles: new Array(9).fill(0).map((item, index) => ({
    ...article,
    id: String(index),
  })), // Массив с 9 одинаковыми статьями, но с различными id
  isLoading: false, // Флаг загрузки (false, т.к. статьи загружены)
  view: ArticleView.LIST, // Вид компонента - список
};
