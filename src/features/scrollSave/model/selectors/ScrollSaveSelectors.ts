import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

export const getScrollSaveScroll = (state: StateSchema) =>
  state?.scrollSave.scroll;

export const getScrollSaveScrollByPath = createSelector(
  getScrollSaveScroll,
  (state: StateSchema, path: string) => path,
  (scroll, path) => scroll[path] || 0,
);
