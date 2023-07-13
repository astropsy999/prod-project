import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import { Article } from '../types/article';
import { ArticleDetailsSchema } from '../types/articleDetailsSchema';

// Define initial state for article details
const initialState: ArticleDetailsSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

// Create articleDetailsSlice using createSlice from Redux Toolkit
export const articleDetailsSlice = createSlice({
  name: 'articleDetails', // Slice name
  initialState, // Initial state
  reducers: {}, // No additional reducers defined
  extraReducers: (builder) => {
    builder
      // Handle pending action for fetching article by ID
      .addCase(fetchArticleById.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      // Handle fulfilled action for fetching article by ID
      .addCase(
        fetchArticleById.fulfilled,
        (state, action: PayloadAction<Article>) => {
          state.isLoading = false;
          state.data = action.payload;
        },
      )
      // Handle rejected action for fetching article by ID
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Export action creators and reducer from articleDetailsSlice
export const { actions: articleDetailsActions } = articleDetailsSlice;
export const { reducer: articleDetailsReducer } = articleDetailsSlice;
