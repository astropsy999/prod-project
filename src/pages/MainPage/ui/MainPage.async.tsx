import { lazy } from 'react';

export const MainPageAsync = lazy(
  () =>
    new Promise((resolve) => {
      // @ts-ignore
      // Затримка тільки для курсу, не робіть так на реальних проектах!!!
      setTimeout(() => resolve(import('./MainPage')), 1500);
    }),
);