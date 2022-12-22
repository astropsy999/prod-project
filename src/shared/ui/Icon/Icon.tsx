import { t } from 'i18next';
import React, { memo, VFC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface IconProps {
  className?: string;
  Svg: VFC<React.SVGProps<SVGSVGElement>>;
}

export const Icon = memo(({ className, Svg }: IconProps) => (
  <Svg className={classNames(cls.Icon, {}, [className])}>{t('Icon')}</Svg>
));
