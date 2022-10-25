import React from 'react';
import { useTranslation } from 'react-i18next';
import { Counter } from 'entities/Counter';

function MainPage() {
  const { t } = useTranslation('mainpage');
  return (
    <div>
      {t('Головна')}
      <Counter />
    </div>
  );
}

export default MainPage;
