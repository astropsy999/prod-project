import { bindActionCreators, createSlice } from '@reduxjs/toolkit';
import { SliceCaseReducers, CreateSliceOptions } from '@reduxjs/toolkit/dist';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

/**
 * Функция для создания Redux среза с генерацией хуков для удобного использования экшенов
 * @param options - Объект с опциями для создания среза
 * @returns Объект с созданным срезом и хуком useActions для использования экшенов
 */
export function buildSlice<
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string = string,
>(options: CreateSliceOptions<State, CaseReducers, Name>) {
  const slice = createSlice(options);

  /**
   * Хук useActions для получения экшенов и диспетчера для использования в компонентах
   * @returns Экшены среза, связанные с диспетчером
   */
  const useActions = (): typeof slice.actions => {
    const dispatch = useDispatch();
    // @ts-ignore
    return useMemo(
      // @ts-ignore
      () => bindActionCreators(slice.actions, dispatch),
      [dispatch],
    );
  };

  // Возвращаем объект с созданным срезом и хуком useActions
  return {
    ...slice,
    useActions,
  };
}
