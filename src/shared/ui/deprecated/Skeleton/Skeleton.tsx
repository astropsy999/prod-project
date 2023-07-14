import { CSSProperties, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  border?: string | number;
}

/**
 * This is an old component please use the new one from 'redesigned' folder
 * @deprecated
 */
export const Skeleton = memo(
  ({ className, width, height, border }: SkeletonProps) => {
    const styles: CSSProperties = {
      width,
      height,
      borderRadius: border,
    };
    return (
      <div
        className={classNames(cls.Skeleton, {}, [className])}
        style={styles}
      />
    );
  },
);
