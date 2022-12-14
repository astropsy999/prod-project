import {createEntityAdapter, createSlice, PayloadAction,} from '@reduxjs/toolkit';
import {StateSchema} from 'app/providers/StoreProvider';
import {Article} from 'entities/Article';
import {ArticleView} from 'entities/Article/model/types/article';
import {ARTICLES_VIEW_LOCALSTORAGE_KEY} from 'shared/const/localstorage';
import {fetchArticlesList} from '../services/fetchArticlesList/fetchArticlesList';
import {ArticlesPageSchema} from '../types/ArticlesPageSchema';

// Since we don't provide `selectId`, it defaults to assuming `entity.id` is the right field
const articlesAdapter = createEntityAdapter<Article>({
  // Keep the "all IDsx`x`` array sorted based on book titles
  selectId: (article) => article.id,
});

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
  (state) => state.articlesPage || articlesAdapter.getInitialState(),
);

const articlesPageSlice = createSlice({
  name: 'articlesPageSlice',
  initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
    isLoading: false,
    ids: [],
    error: undefined,
    entities: {},
    view: ArticleView.CARDS,
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;
      localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload);
    },
    initState: (state) => {
      state.view = localStorage.getItem(
        ARTICLES_VIEW_LOCALSTORAGE_KEY,
      ) as ArticleView;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesList.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchArticlesList.fulfilled,
        (state, action: PayloadAction<Article[]>) => {
          state.isLoading = false;
          articlesAdapter.setAll(state, action.payload);
        },
      )
      .addCase(fetchArticlesList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: articlesPageReducer, actions: articlesPageActions } =
  articlesPageSlice;
