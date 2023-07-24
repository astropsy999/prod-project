// Импорт необходимых зависимостей из библиотеки @reduxjs/toolkit/query/react
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Импорт константы USER_LOCALSTORAGE_KEY из файла с константами для работы с локальным хранилищем
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

// Определение службы (service) с использованием базового URL и ожидаемых конечных точек (endpoints)
export const rtkApi = createApi({
  // Указываем путь до редьюсера (reducer), где будут храниться данные из запросов
  reducerPath: 'api',

  // Определяем базовый запрос (baseQuery) с указанным базовым URL и функцией для подготовки заголовков
  baseQuery: fetchBaseQuery({
    baseUrl: __API__,
    prepareHeaders: (headers) => {
      // Получаем токен из локального хранилища localStorage по ключу USER_LOCALSTORAGE_KEY
      const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';

      // Если токен существует, добавляем его в заголовок Authorization
      if (token) {
        headers.set('Authorization', token);
      }
      return headers;
    },
  }),

  // Определяем конечные точки (endpoints) для запросов (в данном случае пустой объект)
  endpoints: (builder) => ({}),
});
