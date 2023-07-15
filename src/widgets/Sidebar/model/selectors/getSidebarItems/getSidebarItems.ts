import { toggleFeatures } from '@/shared/lib/features';
import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';

import ArticleIconDeprecated from '@/shared/assets/icons/article-20-20.svg';
import AboutIconDeprecated from '@/shared/assets/icons/clarity_list-outline-badged.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/profile_icon.svg';
import MainIconDeprecated from '@/shared/assets/icons/Vector.svg';

import ArticleIcon from '@/shared/assets/icons/article.svg';
import AboutIcon from '@/shared/assets/icons/Info.svg';
import ProfileIcon from '@/shared/assets/icons/avatar.svg';
import MainIcon from '@/shared/assets/icons/home.svg';

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
        authOnly: true,
      },
      {
        path: getRouteArticles(),
        Icon: toggleFeatures({
          name: 'isAppRedesigned',
          on: () => ArticleIcon,
          off: () => ArticleIconDeprecated,
        }),
        text: 'Статьи',
        authOnly: true,
      },
    );
  }
  return sidebarItemsList;
});
