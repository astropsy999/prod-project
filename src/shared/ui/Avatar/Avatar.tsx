import { CSSProperties, useMemo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import { AppImage } from '../AppImage';
import UserIcon from '../../assets/icons/user.svg';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
  fallBackInverted?: boolean;
}

export const Avatar = ({
  className,
  src,
  size = 100,
  alt,
  fallBackInverted,
}: AvatarProps) => {
  const mods: Mods = {};
  const styles = useMemo<CSSProperties>(
    () => ({
      width: size,
      height: size,
    }),
    [size],
  );

  const fallBack = <Skeleton width={size} height={size} border={'50%'} />;
  const errorFallback = (
    <Icon
      inverted={fallBackInverted}
      Svg={UserIcon}
      width={size}
      height={size}
    />
  );
  return (
    <AppImage
      fallBack={fallBack}
      errorFallBack={errorFallback}
      src={src}
      alt={alt}
      style={styles}
      className={classNames(cls.Avatar, mods, [className])}
    />
  );
};
