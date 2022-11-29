import React from 'react';
import { useTranslation } from 'react-i18next';

function MainPage() {
  const { t } = useTranslation('mainpage');

  return <div>{t('Главная')}</div>;
}

export default MainPage;
