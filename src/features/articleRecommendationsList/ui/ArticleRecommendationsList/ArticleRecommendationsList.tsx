import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleList } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { useArticleRecommendationsList } from '../../api/articleRecomendationsApi';
import { ToggleFeatures } from '@/shared/lib/features';

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
      <VStack
        data-testid='ArticleRecommendationsList'
        gap={'8'}
        className={classNames('', {}, [className])}
      >
        <ToggleFeatures
          feature={'isAppRedesigned'}
          on={<Text size={'l'} title={t('Рекомендуем')} />}
          off={<TextDeprecated size={TextSize.L} title={t('Рекомендуем')} />}
        />

        <ArticleList articles={articles} target='_blank' />
      </VStack>
    );
  },
);
