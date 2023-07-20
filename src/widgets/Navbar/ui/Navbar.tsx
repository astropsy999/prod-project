import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { LoginModal } from '@/features/authByUsername';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { NotificationButton } from '@/features/notificationButton';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';
import cls from './Navbar.module.scss';
import { getRouteArticleCreate } from '@/shared/const/router';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Card } from '@/shared/ui/redesigned/Card';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useSelector(getUserAuthData);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const mainClass = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => cls.NavbarRedesigned,
    off: () => cls.Navbar,
  });

  if (authData) {
    return (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <header className={classNames(mainClass)}>
            <HStack>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
          </header>
        }
        off={
          <header className={classNames(mainClass)}>
            <Text
              theme={TextTheme.INVERTED}
              className={cls.appName}
              title={t('Евгений Стужук')}
            />
            <AppLink
              className={cls.createBtn}
              theme={AppLinkTheme.SECONDARY}
              to={getRouteArticleCreate()}
            >
              {t('Создать статью')}
            </AppLink>
            <HStack gap={'16'} className={cls.actions}>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>

            {isAuthModal && (
              <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
            )}
          </header>
        }
      />
    );
  }
  return (
    <header className={classNames(mainClass)}>
      <ToggleFeatures
        feature={'isAppRedesigned'}
        on={
          <Button variant={'clear'} className={cls.links} onClick={onShowModal}>
            {t('Войти')}
          </Button>
        }
        off={
          <ButtonDeprecated
            theme={ButtonTheme.OUTLINE_INVERTED}
            className={cls.links}
            onClick={onShowModal}
          >
            {t('Войти')}
          </ButtonDeprecated>
        }
      />

      <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
    </header>
  );
});

export default Navbar;
