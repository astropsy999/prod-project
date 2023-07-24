// Импортируем необходимые модули и функции из Redux Toolkit и Redux
import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { CombinedState, Reducer } from 'redux';

// Импортируем редьюсеры из различных модулей
import { counterReducer } from '@/entities/Counter';
import { userReducer } from '@/entities/User';
import { scrollSaveReducer } from '@/features/scrollSave';

// Импортируем API и настройки для Redux Toolkit
import { $api } from '@/shared/api/api';
import { rtkApi } from '@/shared/api/rtkApi';

// Импортируем функцию для создания менеджера редьюсеров и интерфейсы состояния
import { createReducerManager } from './reducerManager';
import { StateSchema, ThunkExtraArg } from './StateSchema';

// Функция для создания хранилища Redux
export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
) {
  // Определяем корневые редьюсеры, включая асинхронные редьюсеры и стандартные редьюсеры из различных модулей
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
    scrollSave: scrollSaveReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
  };

  // Создаем менеджер редьюсеров
  const reducerManager = createReducerManager(rootReducers);

  // Дополнительные аргументы для thunk-функций
  const extraArg: ThunkExtraArg = {
    api: $api,
  };

  // Создаем хранилище Redux с использованием configureStore из Redux Toolkit
  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: __IS_DEV__, // Флаг для включения DevTools в режиме разработки
    preloadedState: initialState, // Начальное состояние хранилища
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg, // Передаем дополнительные аргументы в thunk-функции
        },
      }).concat(rtkApi.middleware), // Добавляем middleware для работы с RTK Query
  });

  // Присваиваем хранилищу свойство с менеджером редьюсеров для возможности динамического добавления/удаления редьюсеров
  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
}

// Определяем тип для диспатчера Redux, основываясь на типе создаваемого хранилища
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
