import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import StarIcon from '@/shared/assets/icons/star.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon as IconDeprecated } from '../Icon/Icon';
import cls from './StarRating.module.scss';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Icon } from '../../redesigned/Icon';

interface StarRatingProps {
  className?: string;
  onSelect?: (starsCount: number) => void;
  size?: number;
  selectedStars?: number;
}

/**
 * This is an old component please use the new one from 'redesigned' folder
 * @deprecated
 */
export const StarRating = memo(
  ({ className, size = 30, selectedStars = 0, onSelect }: StarRatingProps) => {
    const { t } = useTranslation();

    const [currentStarCount, setCurrentStarCount] = useState(selectedStars);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    const onHover = (starsCount: number) => () => {
      if (!isSelected) {
        setCurrentStarCount(starsCount);
      }
    };

    const onLeave = () => {
      if (!isSelected) {
        setCurrentStarCount(0);
      }
    };

    const onClick = (starsCount: number) => () => {
      if (!isSelected) {
        onSelect?.(starsCount);
        setCurrentStarCount(starsCount);
        setIsSelected(true);
      }
    };

    const stars = [1, 2, 3, 4, 5];

    return (
      <div
        className={classNames(
          toggleFeatures({
            name: 'isAppRedesigned',
            on: () => cls.StarRatingRedesigned,
            off: () => cls.StarRating,
          }),
          {},
          [className],
        )}
      >
        {stars.map((starNumber) => {
          const commonProps = {
            Svg: StarIcon,
            key: starNumber,
            className: classNames(
              cls.StarIcon,
              { [cls.selected]: isSelected },
              [currentStarCount >= starNumber ? cls.hovered : cls.normal],
            ),
            width: size,
            height: size,
            onMouseLeave: onLeave,
            onMouseEnter: onHover(starNumber),
            onClick: onClick(starNumber),
            'data-testid': `StarRating.${starNumber}`,
            'data-selected': currentStarCount >= starNumber,
          };
          return (
            <ToggleFeatures
              feature={'isAppRedesigned'}
              on={<Icon clickable={!isSelected} {...commonProps} />}
              off={<IconDeprecated {...commonProps} />}
            />
          );
        })}
      </div>
    );
  },
);
