import { ArticleListItemSkeleton } from 'entities/Article/ui/ArticleListItem/ArticleListItemSkeleton';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { List, ListRowProps, WindowScroller } from 'react-virtualized';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { PAGE_ID } from 'widgets/Page/Page';
import { ArticleView } from '../../model/consts/consts';
// eslint-disable-next-line paths-checking-plugin-ys/path-checker
import { Article } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
  virtualized?: boolean;
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
    virtualized = true,
  }: ArticleListProps) => {
    const isList = view === ArticleView.LIST;
    const { t } = useTranslation();
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
          <Text
            size={TextSize.L}
            // @ts-ignore
            title={t('Статьи не найдены')}
          />
        </div>
      );
    }

    return (
      // @ts-ignore
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
            // @ts-ignore
            ref={registerChild}
            className={classNames(cls.ArticleList, {}, [className, cls[view]])}
          >
            {virtualized ? (
              // @ts-ignore
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
            ) : (
              articles.map((item) => (
                <ArticleListItem
                  article={item}
                  view={view}
                  target={target}
                  key={item.id}
                  className={cls.card}
                />
              ))
            )}

            {isLoading && getSkeletons(view)}
          </div>
        )}
      </WindowScroller>
    );
  },
);
