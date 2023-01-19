import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui/Button';
import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { useCounterActions } from '../model/slice/counterSlice';

export const Counter = () => {
  const { t } = useTranslation();
  const counterValue = useCounterValue();
  const { decrement, increment, add } = useCounterActions();
  const handleInc = () => {
    increment();
  };
  const handleDec = () => {
    decrement();
  };
  const handleAddFive = () => {
    add(5);
  };

  return (
    <div>
      <h1 data-testid='value-title'>{counterValue}</h1>
      <Button onClick={handleInc} data-testid='increment-btn'>
        {t('+')}
      </Button>
      <Button onClick={handleDec} data-testid='decrement-btn'>
        {t('-')}
      </Button>
      <Button onClick={handleAddFive} data-testid='decrement-btn'>
        {t('+5')}
      </Button>
    </div>
  );
};
