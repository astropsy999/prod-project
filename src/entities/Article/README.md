## Сущность статьи

Сущность статьи используется для непосредственного отображения статьи и включает логику взаимодействия с ней.

#### Public api

```typescript jsx
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

- UI (компоненты)

[ArticleDetails](/src/entities/Article/ui/ArticleDetails/) - компонент с информацией о статье

[ArticleList](/src/entities/Article/ui/ArticleList/) - Компонент со списком статей

[ArticleListItem](/src/entities/Article/ui/ArticleListItem/) - Компонент со статьей

[ArticleCodeBlockComponent](/src/entities/Article/ui/ArticleCodeBlockComponent/) - предназначен для удобного отображения блоков кода в статьях

[ArticleImageBlockComponent](/src/entities/Article/ui/ArticleImageBlockComponent/) - предназначен для удобного отображения изображений в статьях

- MODEL (модель)

  -

```

```
