import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page/Page';

function ForbiddenPage() {
  const { t } = useTranslation('');
  return <Page>{t('Доступ запрещен')}</Page>;
}

export default ForbiddenPage;
