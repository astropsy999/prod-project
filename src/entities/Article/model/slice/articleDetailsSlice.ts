import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import { Article } from '../types/article';
import { ArticleDetailsSchema } from '../types/articleDetailsSchema';

// Определение начального состояния для деталей статьи
const initialState: ArticleDetailsSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

// Создание articleDetailsSlice с помощью createSlice из Redux Toolkit
export const articleDetailsSlice = createSlice({
  name: 'articleDetails', // Имя среза
  initialState, // Начальное состояние
  reducers: {}, // Отсутствие дополнительных редюсеров
  extraReducers: (builder) => {
    builder
      // Обработка действия pending для запроса статьи по идентификатору
      .addCase(fetchArticleById.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      // Обработка действия fulfilled для успешного запроса статьи по идентификатору
      .addCase(
        fetchArticleById.fulfilled,
        (state, action: PayloadAction<Article>) => {
          state.isLoading = false;
          state.data = action.payload;
        },
      )
      // Обработка действия rejected для неудачного запроса статьи по идентификатору
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Экспорт созданных action creators и редюсера из articleDetailsSlice
export const { actions: articleDetailsActions } = articleDetailsSlice;
export const { reducer: articleDetailsReducer } = articleDetailsSlice;
