import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups';
import cls from './AvatarDropdown.module.scss';
import {
  getRouteAdmin,
  getRouteProfile,
  getRouteSettings,
} from '@/shared/const/router';
import { ToggleFeatures } from '@/shared/lib/features';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import { Avatar } from '@/shared/ui/redesigned/Avatar';

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = memo(({ className }: AvatarDropdownProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const authData = useSelector(getUserAuthData);

  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);
  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const isAdminPanelAvailable = isAdmin || isManager;

  if (!authData) {
    return null;
  }

  const items = [
    ...(isAdminPanelAvailable
      ? [{ content: t('Админка'), href: getRouteAdmin() }]
      : []),
    { content: t('Выйти'), onClick: onLogout },
    {
      content: t('Профиль'),
      href: getRouteProfile(authData.id),
    },
    {
      content: t('Настройки'),
      href: getRouteSettings(),
    },
  ];
  return (
    <ToggleFeatures
      feature={'isAppRedesigned'}
      on={
        <Dropdown
          className={classNames(cls.AvatarDropdown, {}, [className])}
          direction='bottom-left'
          items={items}
          trigger={<Avatar size={40} src={authData.avatar} />}
        />
      }
      off={
        <DropdownDeprecated
          className={classNames(cls.AvatarDropdown, {}, [className])}
          direction='bottom-left'
          items={items}
          trigger={
            <AvatarDeprecated
              fallBackInverted
              size={30}
              src={authData.avatar}
            />
          }
        />
      }
    />
  );
});
