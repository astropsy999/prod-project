import { lazy } from 'react';

export const ArticlesPageAsync = lazy(
  () =>
    new Promise((resolve) => {
      // @ts-ignore
      // Задержка только для имитации, не делать так на реальных проектах!!!
      setTimeout(() => resolve(import('./ArticlesPage')), 1500);
    }),
);
