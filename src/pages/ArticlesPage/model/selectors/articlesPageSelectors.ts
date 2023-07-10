import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticleSortField, ArticleType, ArticleView } from '@/entities/Article';
import { buildSelector } from '@/shared/lib/store';

// Получение состояния загрузки страницы со статьями
export const getArticlesPageIsLoading = (state: StateSchema) =>
  state.articlesPage?.isLoading || false;

// Получение сообщения об ошибке страницы со статьями
export const getArticlesPageError = (state: StateSchema) =>
  state.articlesPage?.error;

// Получение режима отображения страницы со статьями (по умолчанию: ArticleView.CARDS)
export const getArticlesPageView = (state: StateSchema) =>
  state.articlesPage?.view || ArticleView.CARDS;

// Получение номера текущей страницы страницы со статьями (по умолчанию: 1)
export const getArticlesPageNum = (state: StateSchema) =>
  state.articlesPage?.page || 1;

// Получение лимита (количества статей на странице) страницы со статьями (по умолчанию: 9)
export const getArticlesPageLimit = (state: StateSchema) =>
  state.articlesPage?.limit || 9;

// Проверка, есть ли еще статьи для загрузки на странице со статьями
export const getArticlesPageHasMore = (state: StateSchema) =>
  state.articlesPage?.hasMore;

// Проверка, была ли инициализация страницы со статьями
export const getArticlesPageInited = (state: StateSchema) =>
  state.articlesPage?._inited;

// Получение порядка сортировки статей (asc или desc) (по умолчанию: 'asc')
export const getArticlesPageOrder = (state: StateSchema) =>
  state.articlesPage?.order ?? 'asc';

// Получение поля для сортировки статей (по умолчанию: ArticleSortField.CREATED)
export const getArticlesPageSort = (state: StateSchema) =>
  state.articlesPage?.sort ?? ArticleSortField.CREATED;

// Получение поискового запроса для фильтрации статей (по умолчанию: '')
export const getArticlesPageSearch = (state: StateSchema) =>
  state.articlesPage?.search ?? '';

// Получение типа статей для отображения (по умолчанию: ArticleType.ALL)
export const getArticlesPageType = (state: StateSchema) =>
  state.articlesPage?.type ?? ArticleType.ALL;

// Экспортируем хук useArticleItemById, полученный с помощью функции buildSelector.
// Хук useArticleItemById будет возвращать значение статьи с заданным id из состояния приложения.

export const [useArticleItemById] = buildSelector(
  // Определяем селектор, который принимает состояние и id статьи
  (state, id: string) => state.articlesPage?.entities[id],
);
