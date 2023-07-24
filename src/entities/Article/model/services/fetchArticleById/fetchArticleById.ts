import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '../../types/article';

// Создание асинхронного thunk-действия для получения статьи по её идентификатору
export const fetchArticleById = createAsyncThunk<
  Article, // Тип возвращаемого значения асинхронного thunk-действия
  string | undefined, // Тип данных, передаваемых в payload асинхронного thunk-действия
  ThunkConfig<string> // Дополнительная конфигурация для thunk-действия
>('article/fetchArticleById', async (articleId, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  try {
    // Выполнение API-запроса для получения статьи по её идентификатору
    const response = await extra.api.get<Article>(`/articles/${articleId}`, {
      params: { _expand: 'user' },
    });

    // Проверка наличия данных ответа и идентификатора статьи
    if (!response.data || !articleId) {
      throw new Error();
    }

    // Возвращение полученной статьи
    return response.data;
  } catch (e) {
    console.log(e);
    // Обработка ошибок и возврат отклоненного промиса с определенным значением
    return rejectWithValue('Ошибка загрузки статьи');
  }
});
