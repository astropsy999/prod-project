import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { Currency } from '../../model/types/currency';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}

const options = [
  { value: Currency.UAH, content: Currency.UAH },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = memo(
  ({ className, value, onChange, readonly }: CurrencySelectProps) => {
    const { t } = useTranslation();

    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Currency);
      },
      [onChange],
    );

    const props = {
      className,
      defaultValue: t('Укажите валюту'),
      value,
      items: options,
      label: t('Валюта'),
      onChange: onChangeHandler,
      readonly,
      direction: 'top-right' as const,
    };

    return (
      <ToggleFeatures
        feature={'isAppRedesigned'}
        on={<ListBox {...props} />}
        off={<ListBoxDeprecated {...props} />}
      />
    );

    // return (
    //   <Select
    //     className={classNames('', {}, [className])}
    //     label={t('Укажите валюту')}
    //     options={options}
    //     value={value}
    //     onChange={onChangeHandler}
    //     readonly={readonly}
    //   />
    // );
  },
);
