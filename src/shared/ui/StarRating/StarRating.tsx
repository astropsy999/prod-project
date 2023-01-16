import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import StarIcon from '@/shared/assets/icons/star.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '../Icon/Icon';
import cls from './StarRating.module.scss';

interface StarRatingProps {
  className?: string;
  onSelect?: (starsCount: number) => void;
  size?: number;
  selectedStars?: number;
}

export const StarRating = memo(
  ({ className, size = 30, selectedStars = 0, onSelect }: StarRatingProps) => {
    const { t } = useTranslation();

    const [currentStarCount, setCurrentStarCount] = useState(0);
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
      <div className={classNames(cls.StarRating, {}, [className])}>
        {stars.map((starNumber) => (
          <Icon
            Svg={StarIcon}
            key={starNumber}
            className={classNames(
              cls.StarIcon,
              { [cls.selected]: isSelected },
              [currentStarCount >= starNumber ? cls.hovered : cls.normal],
            )}
            width={size}
            height={size}
            onMouseLeave={onLeave}
            onMouseEnter={onHover(starNumber)}
            onClick={onClick(starNumber)}
          />
        ))}
      </div>
    );
  },
);
