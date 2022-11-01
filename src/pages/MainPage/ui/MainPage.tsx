import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';

function MainPage() {
  const { t } = useTranslation('mainpage');
  const [value, setValue] = useState('');

  const onChange = (val: string) => {
    setValue(val);
  };
  return <div>{t('Головна')}</div>;
}

export default MainPage;
