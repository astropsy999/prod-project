import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ArticleSortField, ArticleView, ArticleType } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { SortOrder } from '@/shared/types/sort';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import {
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../model/slices/articlesPageSlice';
import cls from './ArticlesPageFilters.module.scss';
import { ArticlesViewSelector } from '@/features/articlesViewSelector';
import { ArticleTypeTabs } from '@/features/articleTypeTabs';
import { ArticleSortSelector } from '@/features/articleSortSelector';

interface ArticlesPageFiltersProps {
  className?: string;
}

export const ArticlesPageFilters = memo(
  ({ className }: ArticlesPageFiltersProps) => {
    const dispatch = useAppDispatch();
    const view = useSelector(getArticlesPageView);
    const sort = useSelector(getArticlesPageSort);
    const order = useSelector(getArticlesPageOrder);
    const search = useSelector(getArticlesPageSearch);
    const type = useSelector(getArticlesPageType);

    const fetchData = useCallback(() => {
      dispatch(fetchArticlesList({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeView = useCallback(
      (view: ArticleView) => {
        dispatch(articlesPageActions.setView(view));
      },
      [dispatch],
    );
    const onChangeSort = useCallback(
      (newSort: ArticleSortField) => {
        dispatch(articlesPageActions.setSort(newSort));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
      },
      [dispatch, fetchData],
    );

    const onChangeOrder = useCallback(
      (newOrder: SortOrder) => {
        dispatch(articlesPageActions.setOrder(newOrder));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
      },
      [dispatch, fetchData],
    );

    const onChangeSearch = useCallback(
      (search: string) => {
        dispatch(articlesPageActions.setSearch(search));
        dispatch(articlesPageActions.setPage(1));
        debouncedFetchData();
      },
      [dispatch, debouncedFetchData],
    );

    const onChangeType = useCallback(
      (value: ArticleType) => {
        dispatch(articlesPageActions.setType(value));
        fetchData();
      },
      [dispatch, fetchData],
    );
    const { t } = useTranslation();

    return (
      <div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
        <div className={cls.sortWrapper}>
          <ArticleSortSelector
            sort={sort}
            order={order}
            onChangeOrder={onChangeOrder}
            onChangeSort={onChangeSort}
          />
          <ArticlesViewSelector view={view} onViewClick={onChangeView} />
        </div>
        <Card className={cls.search}>
          <Input
            onChange={onChangeSearch}
            value={search}
            placeholder={t('Поиск')}
          />
        </Card>
        <ArticleTypeTabs
          className={cls.tabs}
          value={type}
          onChangeType={onChangeType}
        />
      </div>
    );
  },
);
