import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ArticleDetails } from '@/entities/Article';
import { ArticleRating } from '@/features/articleRating';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';
import { articleDetailsPageReducer } from '../../model/slices';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import cls from './ArticleDetailsPage.module.scss';
import { getFeatureFlag, toggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/Card';

interface ArticleDetailsPageProps {
  className?: string;
}

// Define a list of reducers for use in DynamicModuleLoader
const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  // Use the useTranslation hook for localization
  const { t } = useTranslation('');

  // Get the "id" parameter from the URL using the useParams hook
  const { id } = useParams<{ id: string }>();

  // If "id" is not defined, return null
  if (!id) {
    return null;
  }

  // Feature flag for article rating
  const articleRatingCard = toggleFeatures({
    name: 'isArticleRatingEnabled',
    on: () => <ArticleRating articleId={id} />,
    off: () => <Card>{t('Оценка статей скоро появится')}</Card>,
  });

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      {/* Create a page using the Page component and apply styles */}
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {/* Group components vertically using VStack */}
        <VStack gap={'16'} max>
          {/* Display the page header */}
          <ArticleDetailsPageHeader />
          {/* Display the article details using the ArticleDetails component */}
          <ArticleDetails id={id} />
          {/* Display the article rating */}
          {/* {isArticleRatingEnabled && <ArticleRating articleId={id} />} */}
          {articleRatingCard}
          {/* Display the article recommendations list */}
          <ArticleRecommendationsList />
          {/* Display the article comments */}
          <ArticleDetailsComments id={id} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
