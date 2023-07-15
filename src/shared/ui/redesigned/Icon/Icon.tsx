import React, { memo, VFC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>;

interface IconBaseProps extends SvgProps {
  className?: string;
  Svg: VFC<React.SVGProps<SVGSVGElement>>;
}

interface NonClickableIconProps extends IconBaseProps {
  clickable?: false;
}

interface ClickableIconProps extends IconBaseProps {
  clickable: true;
  onClick: () => void;
}

type IconProps = NonClickableIconProps | ClickableIconProps;

/**
 * The Icon component displays an SVG icon.
 *
 * Props:
 * - className: Additional CSS class for the icon.
 * - Svg: The SVG component to be rendered as the icon.
 * - width: The width of the icon (default: 32).
 * - height: The height of the icon (default: 32).
 * - clickable: Whether the icon is clickable or not.
 * - onClick: The click event handler for clickable icons.
 */
export const Icon = memo((props: IconProps) => {
  const {
    className,
    Svg,
    width = 32,
    height = 32,
    clickable,
    ...otherProps
  } = props;
  const { t } = useTranslation();

  const icon = (
    <Svg
      width={width}
      height={height}
      className={classNames(cls.Icon, {}, [className])}
      {...otherProps}
      onClick={undefined}
    >
      {t('Icon')}
    </Svg>
  );

  if (clickable) {
    return (
      <button
        type='button'
        className={cls.button}
        onClick={props.onClick}
        style={{ height, width }}
      >
        {icon}
      </button>
    );
  }

  return icon;
});
