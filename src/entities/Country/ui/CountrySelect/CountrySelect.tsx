import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { Country } from '../../model/types/country';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

const options = [
  { value: Country.Cyprus, content: Country.Cyprus },
  { value: Country.Ukraine, content: Country.Ukraine },
  { value: Country.Kazakhstan, content: Country.Kazakhstan },
];

export const CountrySelect = memo(
  ({ className, value, onChange, readonly }: CountrySelectProps) => {
    const { t } = useTranslation();

    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Country);
      },
      [onChange],
    );

    const props = {
      className,
      defaultValue: t('Страна'),
      value,
      items: options,
      label: t('Страна'),
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
  },
);
