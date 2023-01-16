import React from 'react';
import { useTranslation } from 'react-i18next';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { Page } from '@/widgets/Page/Page';

function MainPage() {
  const { t } = useTranslation('mainpage');

  return (
    <Page>
      {t('Главная')}
      <StarRating />
    </Page>
  );
}

export default MainPage;
