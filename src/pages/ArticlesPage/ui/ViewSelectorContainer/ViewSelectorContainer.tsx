import { memo } from 'react';
import { ArticlesViewSelector } from '@/features/articlesViewSelector';
// import { useArticleFilters } from '../../lib/hooks/useArticleFilters';
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
