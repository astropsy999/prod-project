import { getUserAuthData, userActions } from 'entities/User';
import { LoginModal } from 'features/authByUsername';
import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useSelector(getUserAuthData);
  const dispatch = useDispatch();

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  if (authData) {
    return (
      <header className={classNames(cls.Navbar)}>
        <Text
          theme={TextTheme.INVERTED}
          className={cls.appName}
          title={t('Евгений Стужук')}
        />
        <AppLink
          className={cls.createBtn}
          theme={AppLinkTheme.SECONDARY}
          to={RoutePath.article_create}
        >
          {t('Создать статью')}
        </AppLink>
        <Dropdown
          className={cls.dropdown}
          items={[
            { content: t('Выйти'), onClick: onLogout },
            {
              content: t('Профиль'),
              href: RoutePath.profile + authData.id,
            },
          ]}
          trigger={<Avatar size={30} src={authData.avatar} />}
          direction={'bottom-left'}
        />

        {isAuthModal && (
          <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
        )}
      </header>
    );
  }
  return (
    <header className={classNames(cls.Navbar)}>
      <Button
        theme={ButtonTheme.OUTLINE_INVERTED}
        className={cls.links}
        onClick={onShowModal}
      >
        {t('Войти')}
      </Button>
      <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
    </header>
  );
});

export default Navbar;
