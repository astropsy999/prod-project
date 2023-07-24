import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchArticleById } from './fetchArticleById';

const data = {
  id: '1',
  title: 'subtitle',
};

// Описание тестов для асинхронного thunk-действия fetchArticleById
describe('fetchArticleById.test', () => {
  // Тест на успешное получение данных
  test('success fetching', async () => {
    // Создание экземпляра TestAsyncThunk с передачей функции fetchArticleById
    const thunk = new TestAsyncThunk(fetchArticleById);
    // Мокирование метода get API для возврата успешного промиса с данными
    thunk.api.get.mockReturnValue(Promise.resolve({ data }));
    // Вызов thunk-действия с передачей идентификатора статьи
    const result = await thunk.callThunk(data.id);

    // Проверка вызова метода get API
    expect(thunk.api.get).toHaveBeenCalled();
    // Проверка, что статус запроса соответствует успешному выполнению
    expect(result.meta.requestStatus).toBe('fulfilled');
    // Проверка, что полученные данные совпадают с ожидаемыми
    expect(result.payload).toEqual(data);
  });

  // Тест на получение ошибки
  test('error fetching', async () => {
    // Создание экземпляра TestAsyncThunk с передачей функции fetchArticleById
    const thunk = new TestAsyncThunk(fetchArticleById);

    // Мокирование метода get API для возврата промиса с ошибкой (статус 403)
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

    // Вызов thunk-действия с передачей идентификатора статьи
    const result = await thunk.callThunk(data.id);

    // Проверка, что статус запроса соответствует отклоненному состоянию
    expect(result.meta.requestStatus).toBe('rejected');
  });
});
