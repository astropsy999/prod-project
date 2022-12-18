import { ArticleListItemSkeleton } from 'entities/Article/ui/ArticleListItem/ArticleListItemSkeleton';
import { t } from 'i18next';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) => {
  return new Array(view === ArticleView.CARDS ? 9 : 3)
    .fill(0)
    .map((item, index) => (
      <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
    ));
};
export const ArticleList = memo(
  ({
    className,
    articles,
    view = ArticleView.CARDS,
    isLoading,
    target,
  }: ArticleListProps) => {
    const renderArticle = (article: Article) => {
      return (
        <ArticleListItem
          className={cls.card}
          article={article}
          view={view}
          key={article.id}
          target={target}
        />
      );
    };

    if (!isLoading && !articles.length) {
      return (
        <div
          className={classNames(cls.ArticleList, {}, [className, cls[view]])}
        >
          <Text size={TextSize.L} title={t('Статьи не найдены')} />
        </div>
      );
    }

    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        {articles.length > 0 ? articles.map(renderArticle) : null}
        {isLoading && getSkeletons(view)}
      </div>
    );
  },
);
