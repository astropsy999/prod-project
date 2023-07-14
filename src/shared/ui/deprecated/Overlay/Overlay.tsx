import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Overlay.module.scss';

interface OverlayProps {
  className?: string;
  onClick?: () => void;
}

/**
 * This is an old component please use the new one from 'redesigned' folder
 * @deprecated
 */
export const Overlay = memo((props: OverlayProps) => {
  const { className, onClick } = props;

  return (
    <div
      onClick={onClick}
      className={classNames(cls.Overlay, {}, [className])}
    />
  );
});
