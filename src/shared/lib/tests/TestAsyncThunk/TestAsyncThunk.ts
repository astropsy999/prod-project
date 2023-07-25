import { AsyncThunkAction } from '@reduxjs/toolkit';
import axios, { AxiosStatic } from 'axios';
import { StateSchema } from '@/app/providers/StoreProvider';

type ActionCreatorType<Return, Arg, RejectedValue> = (
  arg: Arg,
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>;

jest.mock('axios');

// Создаем мок axios для тестирования
const mockedAxios = jest.mocked(axios, true);

// Класс TestAsyncThunk для тестирования асинхронных thunk-функций
export class TestAsyncThunk<Return, Arg, RejectedValue> {
  dispatch: jest.MockedFn<any>; // Мок функции dispatch

  getState: () => StateSchema; // Функция для получения состояния Redux

  actionCreator: ActionCreatorType<Return, Arg, RejectedValue>; // Функция-создатель action

  api: jest.MockedFunctionDeep<AxiosStatic>; // Мок axios для отправки запросов

  navigate: jest.MockedFn<any>; // Мок функции навигации (например, для роутинга)

  constructor(
    actionCreator: ActionCreatorType<Return, Arg, RejectedValue>,
    state?: DeepPartial<StateSchema>,
  ) {
    this.actionCreator = actionCreator;
    this.dispatch = jest.fn(); // Создаем мок функции dispatch
    this.getState = jest.fn(() => state as StateSchema); // Создаем функцию для получения состояния Redux, возвращающую переданное состояние state
    this.api = mockedAxios; // Используем мок axios для отправки запросов
    this.navigate = jest.fn(); // Создаем мок функции навигации
  }

  // Метод для вызова thunk-функции с переданным аргументом
  async callThunk(arg: Arg) {
    const action = this.actionCreator(arg); // Создаем action с переданным аргументом
    const result = await action(this.dispatch, this.getState, {
      api: this.api,
      navigate: this.navigate,
    }); // Выполняем action с моками dispatch, getState, api и navigate

    return result; // Возвращаем результат выполнения action
  }
}
