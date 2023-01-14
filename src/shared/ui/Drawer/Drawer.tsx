import { useTheme } from 'app/providers/ThemeProvider';
import React, { memo, ReactNode } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import cls from './Drawer.module.scss';

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Drawer = memo((props: DrawerProps) => {
  const { className, children, onClose, isOpen } = props;
  const { theme } = useTheme();

  const mods: Mods = {
    [cls.opened]: isOpen,
  };

  return (
    <Portal>
      <div
        className={classNames(cls.Drawer, mods, [
          className,
          theme,
          'app_drawer',
        ])}
      >
        <Overlay onClick={onClose} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  );
});
