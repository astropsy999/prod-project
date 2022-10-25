import React from 'react';
import { useTranslation } from 'react-i18next';
import { Counter } from 'entities/Counter';

function AboutPage() {
  const { t } = useTranslation('about');
  return (
    <div>
      {t('Про нас')}
      <Counter />
    </div>
  );
}

export default AboutPage;
