import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

function MainPage() {
  const { t } = useTranslation('mainpage');

  return <Page data-testid={'MainPage'}>{t('Главная')}</Page>;
}

export default MainPage;
