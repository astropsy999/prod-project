import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types/sort';
import { Select, SelectOption } from '@/shared/ui/deprecated/Select';
import cls from './ArticleSortSelector.module.scss';
import { ArticleSortField } from '@/entities/Article';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

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
      <ToggleFeatures
        feature={'isAppRedesigned'}
        on={(
          <div
            className={classNames(cls.ArticleSortSelectorRedesigned, {}, [
              className,
            ])}
          >
            <VStack gap='8'>
              <Text text='Сортировать по:' />
              <ListBox
                value={sort}
                items={sortFieldOptions}
                onChange={onChangeSort}
              />
              <ListBox
                onChange={onChangeOrder}
                value={order}
                items={orderOptions}
              />
            </VStack>
          </div>
        )}
        off={(
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
        )}
      />
    );
  },
);
