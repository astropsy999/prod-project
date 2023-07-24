import { StateSchema } from '@/app/providers/StoreProvider';

// Селектор для получения данных статьи из состояния
export const getArticleDetailsData = (state: StateSchema) =>
  state.articleDetails?.data;

// Селектор для получения состояния загрузки данных статьи
export const getArticleDetailsIsLoading = (state: StateSchema) =>
  state.articleDetails?.isLoading || false;

// Селектор для получения ошибки данных статьи
export const getArticleDetailsError = (state: StateSchema) =>
  state.articleDetails?.error;
