import { classNames } from 'shared/lib/classNames/classNames';
import { ButtonHTMLAttributes, FC, memo, ReactNode } from 'react';
import cls from './Button.module.scss';

export enum ButtonTheme {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clear_inverted',
  OUTLINE = 'outline',
  OUTLINE_INVERTED = 'outline_inverted',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'background_inverted',
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  children?: ReactNode;
}

export const Button = memo((props: ButtonProps) => {
  const {
    className,
    children,
    theme,
    disabled,
    square,
    size = ButtonSize.L,
    ...otherProps
  } = props;

  const mods: Record<string, boolean> = {
    [cls[theme]]: true,
    [cls.square]: square,
    [cls[size]]: true,
    [cls.disabled]: disabled,
  };
  return (
    <button
      type='button'
      className={classNames(cls.Button, mods, [className])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
});
