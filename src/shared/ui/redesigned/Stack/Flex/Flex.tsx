import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Flex.module.scss';

export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexWrap = 'nowrap' | 'wrap';
export type FlexDirection = 'row' | 'column';
export type FlexGap = '4' | '8' | '16' | '24' | '32';

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

type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

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
  const classes = [
    className,
    alignClasses[align],
    directionClasses[direction],
    justifyClasses[justify],
    cls[wrap],
    gap && gapClasses[gap],
  ];

  const mods: Mods = {
    [cls.max]: max,
  };
  return (
    <div className={classNames(cls.Flex, mods, classes)} {...otherProps}>
      {children}
    </div>
  );
};
