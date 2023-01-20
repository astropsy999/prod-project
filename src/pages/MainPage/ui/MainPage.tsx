import React from 'react';
import { useTranslation } from 'react-i18next';
import { RatingCard } from '@/entities/Rating';
import { Page } from '@/widgets/Page';
import { Counter } from '@/entities/Counter';

function MainPage() {
  const { t } = useTranslation('mainpage');

  return (
    <Page data-testid={'MainPage'}>
      {t('Главная')}
      <Counter />
      <RatingCard
        title={t('Как вам статья?')}
        feedbackTitle={t('Оставьте ваш отзыв')}
        hasFeedback
      />
    </Page>
  );
}

export default MainPage;
