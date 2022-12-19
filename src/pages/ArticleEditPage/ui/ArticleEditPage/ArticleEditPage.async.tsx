import { lazy } from 'react';

export const ArticleEditPageAsync = lazy(
  () =>
    new Promise((resolve) => {
      // @ts-ignore
      // Задержка только для имитации, не делать так на реальных проектах!!!
      setTimeout(() => resolve(import('./ArticleEditPage')), 400);
    }),
);
