import { lazy } from 'react';

export const AboutPageLazy = lazy(()=> new Promise(resolve => {
    // @ts-ignore
    // Затримка тільки для курсу, не робіть так на реальних проектах!!!
    setTimeout(()=> resolve(import('./AboutPage')), 1500)
}))