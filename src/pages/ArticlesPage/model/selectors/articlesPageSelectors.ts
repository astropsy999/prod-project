import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticleSortField, ArticleType, ArticleView } from '@/entities/Article';
import { buildSelector } from '@/shared/lib/store';

// Get the loading state of the articles page
export const getArticlesPageIsLoading = (state: StateSchema) =>
  state.articlesPage?.isLoading || false;

// Get the error message of the articles page
export const getArticlesPageError = (state: StateSchema) =>
  state.articlesPage?.error;

// Get the view mode of the articles page (default: ArticleView.CARDS)
export const getArticlesPageView = (state: StateSchema) =>
  state.articlesPage?.view || ArticleView.CARDS;

// Get the current page number of the articles page (default: 1)
export const getArticlesPageNum = (state: StateSchema) =>
  state.articlesPage?.page || 1;

// Get the limit (number of articles per page) of the articles page (default: 9)
export const getArticlesPageLimit = (state: StateSchema) =>
  state.articlesPage?.limit || 9;

// Check if there are more articles to load on the articles page
export const getArticlesPageHasMore = (state: StateSchema) =>
  state.articlesPage?.hasMore;

// Check if the articles page has been initialized
export const getArticlesPageInited = (state: StateSchema) =>
  state.articlesPage?._inited;

// Get the sorting order of the articles (asc or desc) (default: 'asc')
export const getArticlesPageOrder = (state: StateSchema) =>
  state.articlesPage?.order ?? 'asc';

// Get the sorting field of the articles (default: ArticleSortField.CREATED)
export const getArticlesPageSort = (state: StateSchema) =>
  state.articlesPage?.sort ?? ArticleSortField.CREATED;

// Get the search query for filtering articles (default: '')
export const getArticlesPageSearch = (state: StateSchema) =>
  state.articlesPage?.search ?? '';

// Get the type of articles to display (default: ArticleType.ALL)
export const getArticlesPageType = (state: StateSchema) =>
  state.articlesPage?.type ?? ArticleType.ALL;

// Export the useArticleItemById hook obtained with the buildSelector function.
// The useArticleItemById hook will return the article value with the given id from the application state.

export const [useArticleItemById] = buildSelector(
  // Define the selector that takes the state and article id
  (state, id: string) => state.articlesPage?.entities[id],
);
