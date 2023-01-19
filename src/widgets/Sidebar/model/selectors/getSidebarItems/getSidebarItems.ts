import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import ArticleIcon from '@/shared/assets/icons/article-20-20.svg';
import AboutIcon from '@/shared/assets/icons/clarity_list-outline-badged.svg';
import ProfileIcon from '@/shared/assets/icons/profile_icon.svg';
import MainIcon from '@/shared/assets/icons/Vector.svg';
import { SidebarItemType } from '../../types/sidebar';
import {
  getRouteMain,
  getRouteAbout,
  getRouteProfile,
  getRouteArticles,
} from '@/shared/const/router';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: getRouteMain(),
      Icon: MainIcon,
      text: 'Главная',
    },
    {
      path: getRouteAbout(),
      Icon: AboutIcon,
      text: 'О нас',
    },
  ];

  if (userData) {
    sidebarItemsList.push(
      {
        path: getRouteProfile(userData.id),
        Icon: ProfileIcon,
        text: 'Профиль',
        authOnly: true,
      },
      {
        path: getRouteArticles(),
        Icon: ArticleIcon,
        text: 'Статьи',
        authOnly: true,
      },
    );
  }
  return sidebarItemsList;
});
