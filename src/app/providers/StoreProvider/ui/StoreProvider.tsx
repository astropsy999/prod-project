// Импортируем необходимые модули и интерфейсы из Redux Toolkit и React
import { ReducersMapObject } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

// Импортируем интерфейс состояния и функцию для создания хранилища Redux
import { StateSchema } from '../config/StateSchema';
import { createReduxStore } from '../config/store';

// Определяем интерфейс для свойств компонента StoreProvider
interface StoreProviderProps {
  children?: ReactNode; // Дочерние элементы, которые будут обернуты в Provider
  initialState?: DeepPartial<StateSchema>; // Начальное состояние хранилища (частичное состояние)
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>; // Асинхронные редьюсеры (частичные редьюсеры)
}

// Компонент StoreProvider, который оборачивает приложение в Provider и создает хранилище Redux
export const StoreProvider = (props: StoreProviderProps) => {
  const { children, initialState, asyncReducers } = props;

  // Создаем хранилище Redux с использованием функции createReduxStore, передавая начальное состояние и асинхронные редьюсеры
  const store = createReduxStore(
    initialState as StateSchema,
    asyncReducers as ReducersMapObject<StateSchema>,
  );

  // Возвращаем компонент Provider, который оборачивает дочерние элементы приложения
  return <Provider store={store}>{children}</Provider>;
};
