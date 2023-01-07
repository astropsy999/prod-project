import { FC, lazy } from 'react';
import { LoginFormProps } from './LoginForm';

export const LoginFormAsync = lazy<FC<LoginFormProps>>(
  () =>
    new Promise((resolve) => {
      // @ts-ignore
      // Затримка тільки для курсу, не робіть так на реальних проектах!!!
      setTimeout(() => resolve(import('./LoginForm')), 1500);
    }),
);
