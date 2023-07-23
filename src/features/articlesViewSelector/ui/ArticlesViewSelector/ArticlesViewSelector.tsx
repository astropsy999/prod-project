import { memo } from 'react';
import ListIconDeprecated from '@/shared/assets/icons/list-24-24.svg';
import CardsIconDeprecated from '@/shared/assets/icons/tiled-24-24.svg';
import ListIcon from '@/shared/assets/icons/burger.svg';
import CardsIcon from '@/shared/assets/icons/tile.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import cls from './ArticlesViewSelector.module.scss';
import { ArticleView } from '@/entities/Article';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface ArticlesViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.CARDS,
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => CardsIcon,
      off: () => CardsIconDeprecated,
    }),
  },
  {
    view: ArticleView.LIST,
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => ListIcon,
      off: () => ListIconDeprecated,
    }),
  },
];

export const ArticlesViewSelector = memo(
  ({ className, view, onViewClick }: ArticlesViewSelectorProps) => {
    const onClick = (newView: ArticleView) => () => {
      onViewClick?.(newView);
    };
    return (
      <ToggleFeatures
        feature={'isAppRedesigned'}
        on={
          <Card
            className={classNames(cls.ArticlesViewSelectorRedesigned, {}, [
              className,
            ])}
            border='round'
          >
            <HStack gap='8'>
              {viewTypes.map((viewType) => (
                <Icon
                  clickable
                  key={viewType.view}
                  onClick={onClick(viewType.view)}
                  Svg={viewType.icon}
                  className={classNames('', {
                    [cls.notSelected]: viewType.view === view,
                  })}
                />
              ))}
            </HStack>
          </Card>
        }
        off={
          <div
            className={classNames(cls.ArticlesViewSelector, {}, [className])}
          >
            {viewTypes.map((viewType) => (
              <ButtonDeprecated
                key={viewType.view}
                theme={ButtonTheme.CLEAR}
                onClick={onClick(viewType.view)}
              >
                <IconDeprecated
                  width={24}
                  height={24}
                  Svg={viewType.icon}
                  className={classNames('', {
                    [cls.notSelected]: viewType.view === view,
                  })}
                />
              </ButtonDeprecated>
            ))}
          </div>
        }
      />
    );
  },
);
