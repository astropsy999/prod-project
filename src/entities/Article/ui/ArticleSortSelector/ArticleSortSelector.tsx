import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { SortOrder } from 'shared/types';
import { Select, SelectOption } from 'shared/ui/Select/Select';
import { ArticleSortField } from '../../model/consts/consts';
import cls from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = memo(
  ({
    className,
    sort,
    onChangeSort,
    onChangeOrder,
    order,
  }: ArticleSortSelectorProps) => {
    const { t } = useTranslation();
    const orderOptions = useMemo<SelectOption<SortOrder>[]>(
      () => [
        {
          value: 'asc',
          content: t('возрастанию'),
        },
        {
          value: 'desc',
          content: t('убыванию'),
        },
      ],
      [t],
    );

    const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
      () => [
        {
          value: ArticleSortField.CREATED,
          content: t('дате создания'),
        },
        {
          value: ArticleSortField.TITLE,
          content: t('названию'),
        },
        {
          value: ArticleSortField.VIEWS,
          content: t('популярности'),
        },
      ],
      [t],
    );

    // const changeSortHandler = useCallback(
    //   (newSort: string) => {
    //     onChangeSort(newSort as ArticleSortField);
    //   },
    //   [onChangeSort],
    // );

    // const changeOrderHandler = useCallback(
    //   (newOrder: string) => {
    //     onChangeOrder(newOrder as SortOrder);
    //   },
    //   [onChangeOrder],
    // );

    return (
      <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
        <Select
          value={sort}
          options={sortFieldOptions}
          label={t('Сортировать ПО')}
          onChange={onChangeSort}
        />
        <Select
          onChange={onChangeOrder}
          value={order}
          options={orderOptions}
          label={t('по')}
          className={cls.order}
        />
      </div>
    );
  },
);
