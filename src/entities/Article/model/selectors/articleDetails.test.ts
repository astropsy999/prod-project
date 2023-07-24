// Импорт необходимых зависимостей
import { StateSchema } from '@/app/providers/StoreProvider';
import {
  getArticleDetailsData,
  getArticleDetailsIsLoading,
  getArticleDetailsError,
} from './articleDetails';

// Описание тестов для селекторов getArticleDetailsData, getArticleDetailsIsLoading и getArticleDetailsError
describe('getArticleDetailsData', () => {
  // Тест на получение данных из состояния
  test('should return data', () => {
    // Задаем тестовые данные
    const data = {
      id: '1',
      title: 'subtitle',
    };
    // Создаем тестовое состояние, в котором установлены данные для articleDetails
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        data,
      },
    };
    // Проверяем, что результат селектора соответствует ожидаемым данным
    expect(getArticleDetailsData(state as StateSchema)).toEqual(data);
  });

  // Тест на работу с пустым состоянием
  test('should work with empty state', () => {
    // Создаем пустое тестовое состояние
    const state: DeepPartial<StateSchema> = {};
    // Проверяем, что результат селектора равен undefined (т.е. данных нет)
    expect(getArticleDetailsData(state as StateSchema)).toEqual(undefined);
  });

  // Тест на получение ошибки из состояния
  test('should return error', () => {
    // Создаем тестовое состояние, в котором установлена ошибка для articleDetails
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        error: 'error',
      },
    };
    // Проверяем, что результат селектора соответствует ожидаемой ошибке
    expect(getArticleDetailsError(state as StateSchema)).toEqual('error');
  });

  // Тест на работу с пустым состоянием ошибки
  test('should work with empty state', () => {
    // Создаем пустое тестовое состояние
    const state: DeepPartial<StateSchema> = {};
    // Проверяем, что результат селектора равен undefined (т.е. ошибки нет)
    expect(getArticleDetailsError(state as StateSchema)).toEqual(undefined);
  });

  // Тест на получение состояния isLoading из состояния
  test('should return isLoading', () => {
    // Создаем тестовое состояние, в котором установлено isLoading для articleDetails
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        isLoading: true,
      },
    };
    // Проверяем, что результат селектора соответствует ожидаемому значению isLoading
    expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(true);
  });

  // Тест на работу с пустым состоянием isLoading
  test('should work with empty state isLoading', () => {
    // Создаем пустое тестовое состояние
    const state: DeepPartial<StateSchema> = {};
    // Проверяем, что результат селектора равен false (т.е. isLoading не установлено)
    expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(false);
  });
});
