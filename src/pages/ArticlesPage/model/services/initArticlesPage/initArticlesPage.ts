import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ArticleSortField } from 'entities/Article';
import { getArticlesPageInited } from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { fetchArticlesList } from 'pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from 'pages/ArticlesPage/model/slices/articlesPageSlice';
import { SortOrder } from 'shared/types';

export const initArticlesPage = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>
>('articlesPage/initArticlesPage', async (searchParams, thunkAPI) => {
  const { getState, dispatch } = thunkAPI;
  const inited = getArticlesPageInited(getState());

  if (!inited) {
    const orderFromURL = searchParams.get('order') as SortOrder;
    const sortFromURL = searchParams.get('sort') as ArticleSortField;
    const searchFromURL = searchParams.get('search');

    if (orderFromURL) {
      dispatch(articlesPageActions.setOrder(orderFromURL));
    }
    if (sortFromURL) {
      dispatch(articlesPageActions.setSort(sortFromURL));
    }
    if (searchFromURL) {
      dispatch(articlesPageActions.setSearch(searchFromURL));
    }
    dispatch(articlesPageActions.initState());
    dispatch(fetchArticlesList({}));
  }
});
