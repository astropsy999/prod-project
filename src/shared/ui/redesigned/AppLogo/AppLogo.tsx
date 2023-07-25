import React, { memo } from 'react';
import cls from './AppLogo.module.scss';
import AppSvg from '@/shared/assets/icons/app-image.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '../Stack';

interface AppLogoProps {
  className?: string; // Дополнительный класс для компонента
  size?: number; // Размер логотипа
}

// Компонент AppLogo
export const AppLogo = memo(({ className, size = 50 }: AppLogoProps) => (
  <HStack
    max
    justify='center'
    className={classNames(cls.appLogoWrapper, {}, [className])} // Формируем классы для стилизации с помощью функции classNames
  >
    <AppSvg
      width={size}
      height={size}
      color='black' // Цвет иконки
      className={cls.appLogo} // Класс для стилизации иконки
    />
    {/* Элемент с классом для стилизации градиента */}
    <div className={cls.gradientBig} />
    {/* Элемент с классом для стилизации маленького градиента */}
    <div className={cls.gradientSmall} />
  </HStack>
));
