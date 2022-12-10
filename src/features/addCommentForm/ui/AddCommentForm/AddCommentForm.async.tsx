import { AddCommentFormProps } from './AddCommentForm';
import { FC, lazy } from 'react';

export const AddCommentFormAsync = lazy<FC<AddCommentFormProps>>(
  () =>
    new Promise((resolve) => {
      // @ts-ignore
      // Затримка тільки для курсу, не робіть так на реальних проектах!!!
      setTimeout(() => resolve(import('./AddCommentForm')), 1500);
    }),
);
