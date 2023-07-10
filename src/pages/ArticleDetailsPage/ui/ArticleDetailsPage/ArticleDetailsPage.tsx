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
import { getFeatureFlag } from '@/shared/lib/features';

interface ArticleDetailsPageProps {
  className?: string;
}

// Определяем список редьюсеров для использования в DynamicModuleLoader
const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  // Используем хук useTranslation для локализации
  const { t } = useTranslation('');

  // Получаем параметр id из URL с помощью хука useParams
  const { id } = useParams<{ id: string }>();

  // Фича флаг для рейтинга

  const isArticleRatingEnabled = getFeatureFlag('isArticleRatingEnabled');

  // Если id не определен, возвращаем null
  if (!id) {
    return null;
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      {/* Создаем страницу с помощью компонента Page и применяем стили */}
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {/* Группируем компоненты вертикально с помощью VStack */}
        <VStack gap={'16'} max>
          {/* Отображаем заголовок страницы */}
          <ArticleDetailsPageHeader />
          {/* Отображаем детали статьи с помощью компонента ArticleDetails */}
          <ArticleDetails id={id} />
          {/* Отображаем рейтинг статьи */}
          {isArticleRatingEnabled && <ArticleRating articleId={id} />}
          {/* Отображаем список рекомендаций статей */}
          <ArticleRecommendationsList />
          {/* Отображаем комментарии к статье */}
          <ArticleDetailsComments id={id} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
