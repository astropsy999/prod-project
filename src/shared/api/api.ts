// Импорт необходимых зависимостей
import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

// Создание экземпляра axios с базовым URL, указанным в переменной окружения __API__
export const $api = axios.create({
  baseURL: __API__,
});

// Интерцептор запросов axios для добавления заголовка Authorization
$api.interceptors.request.use((config) => {
  // Проверяем наличие заголовков в конфигурации запроса
  if (config.headers) {
    // Получаем значение токена из localStorage по ключу USER_LOCALSTORAGE_KEY
    // и устанавливаем его в заголовок Authorization
    config.headers.Authorization =
      localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
  }
  // Возвращаем обновленную конфигурацию запроса
  return config;
});
