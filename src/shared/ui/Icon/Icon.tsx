import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, { memo, VFC } from 'react';
import cls from './Icon.module.scss';

interface IconProps {
  className?: string;
  Svg: VFC<React.SVGProps<SVGSVGElement>>;
}

export const Icon = memo(({ className, Svg }: IconProps) => {
  return <Svg className={classNames(cls.Icon, {}, [className])}>Icon</Svg>;
});
