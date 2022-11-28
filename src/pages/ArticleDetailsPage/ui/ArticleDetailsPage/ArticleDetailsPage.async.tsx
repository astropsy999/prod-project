import { lazy } from 'react';

export const ArticleDetailsPageAsync = lazy(
  () =>
    new Promise((resolve) => {
      // @ts-ignore
      // Задержка только для имитации, не делать так на реальных проектах!!!
      setTimeout(() => resolve(import('./ArticleDetailsPage')), 1500);
    }),
);
