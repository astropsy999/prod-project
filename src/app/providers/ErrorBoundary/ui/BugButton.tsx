import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/deprecated/Button';

// Компонент для тестування ErrorBoundary
export const BugButton = () => {
  const [error, setError] = useState(false);
  const onThrow = () => setError(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (error) {
      throw new Error();
    }
  }, [error]);
  return <Button onClick={onThrow}>{t('Помилка')}</Button>;
};
