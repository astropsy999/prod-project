// Импортируемые константы для типов блоков и типов статей
import { ArticleBlockType, ArticleType } from '../consts/consts';
import { User } from '@/entities/User';

// Интерфейс базового блока статьи
export interface ArticleBlockBase {
  id: string; // Уникальный идентификатор блока
  type: ArticleBlockType; // Тип блока (код, изображение, текст и т.д.)
}

// Интерфейс для блока статьи с кодом
export interface ArticleCodeBlock extends ArticleBlockBase {
  type: ArticleBlockType.CODE; // Указываем тип кодового блока
  code: string; // Кодовое содержимое блока
}

// Интерфейс для блока статьи с изображением
export interface ArticleImageBlock extends ArticleBlockBase {
  type: ArticleBlockType.IMAGE; // Указываем тип блока с изображением
  src: string; // Путь к изображению
  title: string; // Заголовок изображения
}

// Интерфейс для блока статьи с текстом
export interface ArticleTextBlock extends ArticleBlockBase {
  type: ArticleBlockType.TEXT; // Указываем тип текстового блока
  title?: string; // Заголовок текстового блока (необязательный)
  paragraphs: string[]; // Массив параграфов текста
}

// Общий тип для всех возможных блоков статьи
export type ArticleBlock =
  | ArticleCodeBlock
  | ArticleTextBlock
  | ArticleImageBlock;

// Интерфейс для статьи
export interface Article {
  id: string; // Уникальный идентификатор статьи
  title: string; // Заголовок статьи
  user: User; // Информация о пользователе, авторе статьи
  subtitle: string; // Подзаголовок статьи
  img: string; // Путь к изображению статьи
  views: number; // Количество просмотров статьи
  createdAt: string; // Дата создания статьи
  type: ArticleType[]; // Типы статьи (ALL, IT, SCIENCE, ECONOMICS и т.д.)
  blocks: ArticleBlock[]; // Массив блоков статьи (код, текст, изображение)
}
