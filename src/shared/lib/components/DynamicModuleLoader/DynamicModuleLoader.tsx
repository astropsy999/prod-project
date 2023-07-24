// Импорт необходимых зависимостей из библиотек и файлов
import { Reducer } from '@reduxjs/toolkit';
import { ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import {
  ReduxStoreWithManager,
  StateSchemaKey,
  StateSchema,
} from '@/app/providers/StoreProvider';

// Определение типа для списка редьюсеров
export type ReducersList = {
  [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
};

// Интерфейс пропсов для компонента DynamicModuleLoader
interface DynamicModuleLoaderProps {
  reducers: ReducersList; // Список редьюсеров для добавления и удаления
  removeAfterUnmount?: boolean; // Флаг для удаления редьюсеров после размонтирования компонента (по умолчанию - true)
  children?: ReactNode; // Дочерние компоненты, переданные внутрь DynamicModuleLoader
}

/**
 * Предназначение компонента состоит в упрощении управления состоянием приложения и оптимизации его производительности.
 * Он позволяет добавлять новые редьюсеры в store при монтировании компонента и удалять их при размонтировании,
 * что может быть полезно для динамической загрузки модулей или разделения кода.
 * @param props
 * @returns
 */

// Компонент DynamicModuleLoader с загрузкой и удалением редьюсеров
export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
  const { children, reducers, removeAfterUnmount = true } = props;
  const store = useStore() as ReduxStoreWithManager; // Получение store с помощью хука useStore и приведение к типу ReduxStoreWithManager
  const dispatch = useDispatch(); // Получение dispatch с помощью хука useDispatch

  useEffect(() => {
    const mountedReducers = store.reducerManager.getMountedReducers(); // Получение списка уже добавленных редьюсеров
    Object.entries(reducers).forEach(([name, reducer]) => {
      const mounted = mountedReducers[name as StateSchemaKey];
      // Добавление нового редьюсера, если он еще не был добавлен
      if (!mounted) {
        store.reducerManager.add(name as StateSchemaKey, reducer);
        dispatch({ type: `@INIT ${name} reducer` });
      }
    });

    // Колбэк для удаления редьюсеров при размонтировании компонента
    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name, reducer]) => {
          store.reducerManager.remove(name as StateSchemaKey);
          dispatch({ type: `@DESTROY ${name} reducer` });
        });
      }
    };
    // eslint-disable-next-line
  }, []);

  // Возвращаем дочерние компоненты, переданные внутрь DynamicModuleLoader
  // (используется пустой фрагмент <></> для обертки)
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};
