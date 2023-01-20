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

export const AppImage = memo(
  ({
    className,
    src,
    alt = 'Image',
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
