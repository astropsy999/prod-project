// Импорт интерфейса Article из файла article.ts
import { Article } from './article';

// Интерфейс для представления схемы деталей статьи
export interface ArticleDetailsSchema {
  isLoading: boolean; // Флаг, указывающий на состояние загрузки данных (true - загрузка, false - загрузка завершена)
  error?: string; // Строка с информацией об ошибке (необязательно)
  data?: Article; // Объект, содержащий данные о статье (необязательно)
}
