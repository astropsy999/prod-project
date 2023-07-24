// Импорт необходимых зависимостей из библиотек и модулей приложения
import { useSelector } from 'react-redux';
import { toggleFeatures } from '@/shared/lib/features';
import { getUserAuthData } from '@/entities/User';

// Импорт иконок для боковой панели
import ArticleIconDeprecated from '@/shared/assets/icons/article-20-20.svg';
import AboutIconDeprecated from '@/shared/assets/icons/clarity_list-outline-badged.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/profile_icon.svg';
import MainIconDeprecated from '@/shared/assets/icons/Vector.svg';

import ArticleIcon from '@/shared/assets/icons/article.svg';
import AboutIcon from '@/shared/assets/icons/Info.svg';
import ProfileIcon from '@/shared/assets/icons/avatar.svg';
import MainIcon from '@/shared/assets/icons/home.svg';

// Импорт типа элемента боковой панели и функций для создания маршрутов
import { SidebarItemType } from '../../types/sidebar';
import {
  getRouteMain,
  getRouteAbout,
  getRouteProfile,
  getRouteArticles,
} from '@/shared/const/router';

// Кастомный хук useSidebarItems для получения списка элементов боковой панели
export const useSidebarItems = () => {
  // Использование useSelector для получения данных о пользователе из Redux
  const userData = useSelector(getUserAuthData);
  const sidebarItemsList: SidebarItemType[] = [
    // Создание элементов боковой панели для "Главной" и "О нас"
    {
      path: getRouteMain(),
      Icon: toggleFeatures({
        name: 'isAppRedesigned',
        on: () => MainIcon,
        off: () => MainIconDeprecated,
      }),
      text: 'Главная',
    },
    {
      path: getRouteAbout(),
      Icon: toggleFeatures({
        name: 'isAppRedesigned',
        on: () => AboutIcon,
        off: () => AboutIconDeprecated,
      }),
      text: 'О нас',
    },
  ];

  // Добавление элементов боковой панели "Профиль" и "Статьи", если есть данные о пользователе (авторизован)
  if (userData) {
    sidebarItemsList.push(
      {
        path: getRouteProfile(userData.id),
        Icon: toggleFeatures({
          name: 'isAppRedesigned',
          on: () => ProfileIcon,
          off: () => ProfileIconDeprecated,
        }),
        text: 'Профиль',
        authOnly: true, // Опция, указывающая, что элемент виден только для авторизованных пользователей
      },
      {
        path: getRouteArticles(),
        Icon: toggleFeatures({
          name: 'isAppRedesigned',
          on: () => ArticleIcon,
          off: () => ArticleIconDeprecated,
        }),
        text: 'Статьи',
        authOnly: true, // Опция, указывающая, что элемент виден только для авторизованных пользователей
      },
    );
  }

  // Возвращение списка элементов боковой панели
  return sidebarItemsList;
};
