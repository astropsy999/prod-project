import { ArticleListItemSkeleton } from 'entities/Article/ui/ArticleListItem/ArticleListItemSkeleton';
import { t } from 'i18next';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { List, ListRowProps, WindowScroller } from 'react-virtualized';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { PAGE_ID } from 'widgets/Page/Page';
// eslint-disable-next-line paths-checking-plugin-ys/path-checker
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
    const isList = view === ArticleView.LIST;

    const itemsPerRow = isList ? 1 : 4;
    const rowCount = isList
      ? articles.length
      : Math.ceil(articles.length / itemsPerRow);
    const rowRenderer = ({
      key, // Unique key within array of rows
      index, // Index of row within collection
      isScrolling, // The List is currently being scrolled
      isVisible, // This row is visible within the List (eg it is not an overscanned row)
      style, // Style object to be applied to row (to position it)
    }: ListRowProps) => {
      const items = [];
      const fromIndex = index * itemsPerRow;
      const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);

      for (let i = fromIndex; i < toIndex; i++) {
        items.push(
          <ArticleListItem
            className={cls.card}
            article={articles[i]}
            view={view}
            target={target}
            key={`str${i}`}
          />,
        );
      }
      return (
        <div key={key} style={style} className={cls.row}>
          {items}
        </div>
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
      <WindowScroller
        onScroll={() => console.log('scroll')}
        scrollElement={document.getElementById(PAGE_ID) as Element}
      >
        {({
          height,
          width,
          registerChild,
          onChildScroll,
          isScrolling,
          scrollTop,
        }) => (
          <div
            ref={registerChild}
            className={classNames(cls.ArticleList, {}, [className, cls[view]])}
          >
            <List
              width={width ? width - 80 : 700}
              height={height ?? 700}
              rowHeight={isList ? 700 : 330}
              rowCount={rowCount}
              rowRenderer={rowRenderer}
              autoHeight
              onScroll={onChildScroll}
              isScrolling={isScrolling}
              scrollTop={scrollTop}
            />
            {isLoading && getSkeletons(view)}
          </div>
        )}
      </WindowScroller>
    );
  },
);
