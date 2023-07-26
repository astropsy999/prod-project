// Импорт необходимых типов и библиотек
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Flex.module.scss';

// Типы для определения возможных значений атрибутов justify, align, wrap, direction и gap
export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexWrap = 'nowrap' | 'wrap';
export type FlexDirection = 'row' | 'column';
export type FlexGap = '4' | '8' | '16' | '24' | '32';

// Объекты, связывающие значения атрибутов с соответствующими CSS классами из модуля Flex.module.scss
const justifyClasses: Record<FlexJustify, string> = {
  start: cls.justifyStart,
  end: cls.justifyEnd,
  center: cls.justifyCenter,
  between: cls.justifyBetween,
};

const alignClasses: Record<FlexAlign, string> = {
  start: cls.alignStart,
  end: cls.alignEnd,
  center: cls.alignCenter,
};

const directionClasses: Record<FlexDirection, string> = {
  row: cls.directionRow,
  column: cls.directionColumn,
};

const gapClasses: Record<FlexGap, string> = {
  4: cls.gap4,
  8: cls.gap8,
  16: cls.gap16,
  24: cls.gap24,
  32: cls.gap32,
};

// Тип для определения свойств элемента div
type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

// Интерфейс для определения свойств компонента Flex
export interface FlexProps extends DivProps {
  className?: string;
  children: ReactNode;
  justify?: FlexJustify;
  align?: FlexAlign;
  wrap?: FlexWrap;
  direction: FlexDirection;
  gap?: FlexGap;
  max?: boolean;
}

// Компонент Flex, который принимает различные свойства и применяет их для создания гибкого контейнера с определенным стилем
export const Flex = ({
  className,
  children,
  justify = 'start',
  align = 'center',
  direction = 'row',
  wrap = 'nowrap',
  gap,
  max,
  ...otherProps
}: FlexProps) => {
  // Формирование классов компонента на основе переданных свойств
  const classes = [
    className,
    alignClasses[align],
    directionClasses[direction],
    justifyClasses[justify],
    cls[wrap],
    gap && gapClasses[gap],
  ];

  // Модификаторы для стилизации компонента с помощью classNames
  const mods: Mods = {
    [cls.max]: max,
  };

  // Возвращаем контейнер с классами и дочерними элементами
  return (
    <div className={classNames(cls.Flex, mods, classes)} {...otherProps}>
      {children}
    </div>
  );
};
