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
import { Page } from '@/widgets/Page';
import { articleDetailsPageReducer } from '../../model/slices';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import cls from './ArticleDetailsPage.module.scss';
import {
  ToggleFeatures,
  getFeatureFlag,
  toggleFeatures,
} from '@/shared/lib/features';
import { Card } from '@/shared/ui/deprecated/Card';
import { off } from 'process';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';

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

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <ToggleFeatures
        feature={'isAppRedesigned'}
        on={
          <StickyContentLayout
            content={
              <Page
                className={classNames(cls.ArticleDetailsPage, {}, [className])}
              >
                <VStack gap={'16'} max>
                  <DetailsContainer />
                  <ToggleFeatures
                    feature='isArticleRatingEnabled'
                    on={<ArticleRating articleId={id} />}
                    off={<Card>{t('Оценка статей скоро появится')}</Card>}
                  />
                  <ArticleRecommendationsList />
                  <ArticleDetailsComments id={id} />
                </VStack>
              </Page>
            }
            right={<AdditionalInfoContainer />}
          />
        }
        off={
          <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            <VStack gap={'16'} max>
              <ArticleDetailsPageHeader />
              <ArticleDetails id={id} />
              <ToggleFeatures
                feature='isAppRedesigned'
                on={<ArticleRating articleId={id} />}
                off={<Card>{t('Оценка статей скоро появится')}</Card>}
              />
              <ArticleRecommendationsList />
              <ArticleDetailsComments id={id} />
            </VStack>
          </Page>
        }
      />
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
