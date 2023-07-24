## Сущность статьи

Сущность статьи используется

#### Public api

```[Public api](index.ts)
export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails';

export type { Article } from './model/types/article';

export type { ArticleDetailsSchema } from './model/types/articleDetailsSchema';

export { ArticleList } from './ui/ArticleList/ArticleList';
export { getArticleDetailsData } from './model/selectors/articleDetails';
export {
  ArticleView,
  ArticleType,
  ArticleSortField,
  ArticleBlockType,
} from './model/consts/consts';
```

- Components

[ArticleDetails](/src/entities/Article/ui/ArticleDetails/) - компонент с информацией о статье

`ArticleList` - Компонент со списком статей

`ArticleViewSwitcher` - Компонент переключатель отображения списка статьей (плитка, список)

`ArticleSortSelector` - Компонент с выбором сортировки списка статей

`ArticleTypeTabs` - Компонент с выбором типа статьи

- types

`Article` - Тип, описывающий статью

- selectors

`getArticleDetailsData` - Селектор для получения информации о текущей открытой статье

```

```
