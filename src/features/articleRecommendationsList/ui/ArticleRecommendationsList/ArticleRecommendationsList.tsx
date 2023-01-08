import { ArticleList } from 'entities/Article';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/ui/Stack';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { useArticleRecommendationsList } from '../../api/articleRecomendationsApi';

interface ArticleRecommendationListProps {
  className?: string;
}

export const ArticleRecommendationsList = memo(
  (props: ArticleRecommendationListProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const {
      data: articles,
      isLoading,
      error,
    } = useArticleRecommendationsList(3);

    if (isLoading || error || !articles) {
      return null;
    }

    return (
      <VStack gap={'8'} className={classNames('', {}, [className])}>
        <Text size={TextSize.L} title={t('Рекомендуем')} />
        <ArticleList articles={articles} target='_blank' virtualized={false} />
      </VStack>
    );
  },
);
