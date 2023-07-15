import { memo, useCallback } from 'react';
import { ArticlesViewSelector } from '@/features/articlesViewSelector';
// import { useArticleFilters } from '../../lib/hooks/useArticleFilters';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getArticlesPageView } from '../../model/selectors/articlesPageSelectors';
import { ArticleView } from '@/entities/Article';
import { articlesPageActions } from '../../model/slices/articlesPageSlice';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface ViewSelectorContainerProps {
  className?: string;
}

export const ViewSelectorContainer = memo(
  (props: ViewSelectorContainerProps) => {
    const { className } = props;
    const { view, onChangeView } = useArticleFilters();

    return (
      <ArticlesViewSelector
        className={className}
        view={view}
        onViewClick={onChangeView}
      />
    );
  },
);
