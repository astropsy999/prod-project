import { lazy } from 'react';
export var AboutPageLazy = lazy(function () {
    return new Promise(function (resolve) {
        // @ts-ignore
        // Затримка тільки для курсу, не робіть так на реальних проектах!!!
        setTimeout(function () { return resolve(import('./AboutPage')); }, 1500);
    });
});
