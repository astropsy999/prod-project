import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './ArticlesFilters.module.scss';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleSortSelector } from '@/features/articleSortSelector';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useTranslation } from 'react-i18next';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';
import { ArticleTypeTabs } from '@/features/articleTypeTabs';
import { Input } from '@/shared/ui/redesigned/Input';
import { Icon } from '@/shared/ui/redesigned/Icon';
import SearchIcon from '@/shared/assets/icons/search.svg';

interface ArticlesFiltersProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  type: ArticleType;
  search: string;
  onChangeSearch: (value: string) => void;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
  onChangeType: (type: ArticleType) => void;
}

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
  const {
    className,
    sort,
    order,
    type,
    search,
    onChangeOrder,
    onChangeSearch,
    onChangeSort,
    onChangeType,
  } = props;

  const { t } = useTranslation();

  return (
    <Card
      className={classNames(cls.ArticlesFilters, {}, [className])}
      padding='24'
    >
      <VStack gap='32'>
        <Input
          onChange={onChangeSearch}
          value={search}
          placeholder={t('Поиск')}
          addonLeft={<Icon Svg={SearchIcon} />}
        />
        <ArticleSortSelector
          sort={sort}
          order={order}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />

        <ArticleTypeTabs
          className={cls.tabs}
          value={type}
          onChangeType={onChangeType}
        />
      </VStack>
    </Card>
  );
});
