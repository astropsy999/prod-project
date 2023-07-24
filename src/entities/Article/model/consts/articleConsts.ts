// Перечисление ArticleSortField определяет поля, по которым можно сортировать статьи.
export enum ArticleSortField {
  VIEWS = 'views', // Поле сортировки по количеству просмотров статьи.
  TITLE = 'title', // Поле сортировки по заголовку статьи.
  CREATED = 'createdAt', // Поле сортировки по дате создания статьи.
}

// Перечисление ArticleBlockType определяет типы блоков статьи.
export enum ArticleBlockType {
  CODE = 'CODE', // Блок с кодом.
  IMAGE = 'IMAGE', // Блок с изображением.
  TEXT = 'TEXT', // Блок с текстом.
}

// Перечисление ArticleType определяет типы статей.
export enum ArticleType {
  ALL = 'ALL', // Все типы статей.
  IT = 'IT', // Тип статьи по тематике информационных технологий.
  SCIENCE = 'SCIENCE', // Тип статьи по научной тематике.
  ECONOMICS = 'ECONOMICS', // Тип статьи по экономической тематике.
}

// Перечисление ArticleView определяет виды отображения статей.
export enum ArticleView {
  LIST = 'LIST', // Отображение статей в виде списка.
  CARDS = 'CARDS', // Отображение статей в виде карточек.
}
