import { memo } from 'react';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { Icon } from 'shared/ui/Icon/Icon';
import { Text } from 'shared/ui/Text/Text';
import { Article, ArticleView } from '../../model/types/article';
import cls from './ArticleListItem.module.scss';

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
}

export const ArticleListItem = memo(
  ({ className, article, view }: ArticleListItemProps) => {
    if (view === ArticleView.LIST) {
      return (
        <div
          className={classNames(cls.ArticleListItem, {}, [
            className,
            cls[view],
          ])}
        >
          {article.title}
        </div>
      );
    }

    return (
      <div
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        <Card className={cls.card}>
          <div className={cls.imageWrapper}>
            <img alt={article.title} src={article.img} className={cls.img} />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <div className={cls.infoWrapper}>
            <Text text={article.type.join(',')} className={cls.types} />
            <Text text={String(article.views)} className={cls.views} />
            <Icon Svg={EyeIcon} />
          </div>
          <Text title={article.title} className={cls.title} />
        </Card>
      </div>
    );
  },
);
