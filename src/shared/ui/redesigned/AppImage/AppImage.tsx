import {
  memo,
  useState,
  ImgHTMLAttributes,
  ReactElement,
  useLayoutEffect,
} from 'react';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  fallBack?: ReactElement;
  errorFallBack?: ReactElement;
}

/**
 * Компонент AppImage отображает изображение.
 * Поддерживает различные настройки и отображение вариантов при загрузке и ошибке.
 *
 * Props:
 * - className: Дополнительный CSS-класс для изображения.
 * - src: URL адрес изображения.
 * - alt: Альтернативный текст для изображения (по умолчанию: 'Image').
 * - fallBack: Вариант отображения, когда изображение еще загружается.
 * - errorFallBack: Вариант отображения, когда возникла ошибка при загрузке изображения.
 */

export const AppImage = memo(
  ({
    className,
    src,
    alt = 'Изображение',
    fallBack,
    errorFallBack,
    ...otherProps
  }: AppImageProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useLayoutEffect(() => {
      const img = new Image();
      img.src = src ?? '';
      img.onload = () => {
        setIsLoading(false);
      };
      img.onerror = () => {
        setIsLoading(false);
        setHasError(true);
      };
    }, [src]);

    if (isLoading && fallBack) {
      return fallBack;
    }

    if (hasError && errorFallBack) {
      return errorFallBack;
    }
    return <img alt={alt} src={src} className={className} {...otherProps} />;
  },
);
