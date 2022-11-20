import { lazy } from 'react';

export const ProfilePageAsync = lazy(
  () =>
    new Promise((resolve) => {
      // @ts-ignore
      // Затримка тільки для курсу, не робіть так на реальних проектах!!!
      setTimeout(() => resolve(import('./ProfilePage')), 1500);
    }),
);
