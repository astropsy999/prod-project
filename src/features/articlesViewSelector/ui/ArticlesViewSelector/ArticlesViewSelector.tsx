import { memo } from 'react';
import ListIcon from '@/shared/assets/icons/list-24-24.svg';
import CardsIcon from '@/shared/assets/icons/tiled-24-24.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Icon } from '@/shared/ui/deprecated/Icon';
import cls from './ArticlesViewSelector.module.scss';
import { ArticleView } from '@/entities/Article';

interface ArticlesViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.CARDS,
    icon: CardsIcon,
  },
  {
    view: ArticleView.LIST,
    icon: ListIcon,
  },
];

export const ArticlesViewSelector = memo(
  ({ className, view, onViewClick }: ArticlesViewSelectorProps) => {
    const onClick = (newView: ArticleView) => () => {
      onViewClick?.(newView);
    };
    return (
      <div className={classNames(cls.ArticlesViewSelector, {}, [className])}>
        {viewTypes.map((viewType) => (
          <Button
            key={viewType.view}
            theme={ButtonTheme.CLEAR}
            onClick={onClick(viewType.view)}
          >
            <Icon
              width={24}
              height={24}
              Svg={viewType.icon}
              className={classNames('', {
                [cls.notSelected]: viewType.view === view,
              })}
            />
          </Button>
        ))}
      </div>
    );
  },
);
