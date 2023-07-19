import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import { ArticleView } from '../../model/consts/articleConsts';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import cls from './ArticleList.module.scss';
import { Article } from '../../model/types/article';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) =>
  new Array(view === ArticleView.CARDS ? 9 : 3)
    .fill(0)
    .map((item, index) => (
      <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
    ));
export const ArticleList = memo(
  ({
    className,
    articles,
    view = ArticleView.CARDS,
    isLoading,
    target,
  }: ArticleListProps) => {
    const { t } = useTranslation();

    if (!isLoading && !articles.length) {
      return (
        <div
          className={classNames(cls.ArticleList, {}, [className, cls[view]])}
        >
          <Text
            size={TextSize.L}
            // @ts-ignore
            title={t('Статьи не найдены')}
          />
        </div>
      );
    }

    return (
      <div
        data-testid='ArticleList'
        className={classNames(cls.ArticleList, {}, [className, cls[view]])}
      >
        {articles.map((item) => (
          <ArticleListItem
            article={item}
            view={view}
            target={target}
            key={item.id}
            className={cls.card}
          />
        ))}

        {isLoading && getSkeletons(view)}
      </div>
    );
  },
);
