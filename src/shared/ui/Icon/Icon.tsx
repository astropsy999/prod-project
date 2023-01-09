import React, { memo, VFC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface IconProps {
  className?: string;
  Svg: VFC<React.SVGProps<SVGSVGElement>>;
}

export const Icon = memo(({ className, Svg }: IconProps) => {
  const { t } = useTranslation();

  return (
    <Svg className={classNames(cls.Icon, {}, [className])}>{t('Icon')}</Svg>
  );
});
