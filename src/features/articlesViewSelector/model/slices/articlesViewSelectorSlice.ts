import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticlesViewSelectorSchema } from '../types/articlesViewSelectorSchema';

const initialState: ArticlesViewSelectorSchema = {};

export const articlesViewSelectorSlice = createSlice({
  name: 'articlesViewSelector',
  initialState,
  reducers: {
    template: (state, action: PayloadAction<string>) => {},
  },
  // extraReducers: (builder) => {
  //     builder
  //         .addCase(, (state) => {
  //             state.error = undefined;
  //             state.isLoading = true;
  //         })
  //         .addCase(, (state) => {
  //             state.isLoading = false;
  //         })
  //         .addCase(, (state, action) => {
  //             state.isLoading = false;
  //             state.error = action.payload;
  //         });
  // },
});

export const { actions: articlesViewSelectorActions } =
  articlesViewSelectorSlice;
export const { reducer: articlesViewSelectorReducer } =
  articlesViewSelectorSlice;
