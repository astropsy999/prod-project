// Определение перечисления AppRoutes, содержащего все маршруты приложения
export enum AppRoutes {
  MAIN = 'main', // Главная страница
  ABOUT = 'about', // Страница "О нас"
  PROFILE = 'profile', // Страница профиля пользователя
  ARTICLES = 'articles', // Страница со списком статей
  ARTICLE_DETAILS = 'article_details', // Страница деталей статьи
  ARTICLE_CREATE = 'article_create', // Страница создания новой статьи
  ARTICLE_EDIT = 'article_edit', // Страница редактирования статьи
  ADMIN_PANEL = 'admin_panel', // Страница административной панели
  SETTINGS = 'settings', // Страница настроек
  FORBIDDEN = 'forbidden', // Страница с запретом доступа

  // Last
  NOT_FOUND = 'not_found', // Страница "Не найдено" (последний маршрут для обработки неправильных URL)
}

// Функции для получения путей маршрутов приложения
export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteArticles = () => '/articles';
export const getRouteArticleDetails = (id: string) => `/articles/${id}`;
export const getRouteArticleCreate = () => '/articles/new';
export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`;
export const getRouteAdmin = () => '/admin';
export const getRouteSettings = () => '/settings';
export const getRouteForbidden = () => '/forbidden';
export const getRouteNotFound = () => '*'; // Специальный маршрут для несуществующих URL

// Объект AppRouteByPathPattern, который связывает пути маршрутов с соответствующими значениями из перечисления AppRoutes
export const AppRouteByPathPattern: Record<string, AppRoutes> = {
  [getRouteMain()]: AppRoutes.MAIN,
  [getRouteAbout()]: AppRoutes.ABOUT,
  [getRouteProfile(':id')]: AppRoutes.PROFILE,
  [getRouteArticles()]: AppRoutes.ARTICLES,
  [getRouteArticleDetails(':id')]: AppRoutes.ARTICLE_DETAILS,
  [getRouteArticleCreate()]: AppRoutes.ARTICLE_CREATE,
  [getRouteArticleEdit(':id')]: AppRoutes.ARTICLE_EDIT,
  [getRouteAdmin()]: AppRoutes.ADMIN_PANEL,
  [getRouteSettings()]: AppRoutes.SETTINGS,
  [getRouteForbidden()]: AppRoutes.FORBIDDEN,
};
