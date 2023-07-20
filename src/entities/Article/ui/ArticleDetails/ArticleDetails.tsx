import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg';
import EveIcon from '@/shared/assets/icons/eye-20-20.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import cls from './ArticleDetails.module.scss';
import { renderArticleBlock } from './renderBlock';

interface ArticleDetailsProps {
  className?: string;
  id?: string;
}

const Deprecated = () => {
  const article = useSelector(getArticleDetailsData);

  return (
    <>
      <HStack justify={'center'} max className={cls.avatarWrapper}>
        <Avatar size={200} src={article?.img} className={cls.avatar} />
      </HStack>
      <VStack gap={'4'} max data-testid='ArticleDetails.Info'>
        <TextDeprecated
          className={cls.title}
          title={article?.title}
          text={article?.subtitle}
          size={TextSize.L}
        />
        <HStack gap={'8'} className={cls.articleInfo}>
          <Icon Svg={EveIcon} className={cls.icon} />
          <TextDeprecated text={String(article?.views)} />
        </HStack>
        <HStack gap={'8'} className={cls.articleInfo}>
          <Icon Svg={CalendarIcon} className={cls.icon} />
          <TextDeprecated text={article?.createdAt} />
        </HStack>
      </VStack>

      {article?.blocks.map(renderArticleBlock)}
    </>
  );
};
const Redesigned = () => {
  const article = useSelector(getArticleDetailsData);

  return (
    <>
      <Text bold title={article?.title} size={'l'} />
      <Text text={article?.subtitle} />
      <AppImage
        fallback={<Skeleton width={'100%'} height={'420px'} border={'16px'} />}
        src={article?.img}
        className={cls.img}
      />

      {article?.blocks.map(renderArticleBlock)}
    </>
  );
};

const Skeleton = toggleFeatures({
  name: 'isAppRedesigned',
  on: () => SkeletonRedesigned,
  off: () => SkeletonDeprecated,
});

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { className, id } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const error = useSelector(getArticleDetailsError);

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id]);

  let content;

  if (isLoading) {
    content = (
      <>
        <Skeleton
          className={cls.avatar}
          width={200}
          height={200}
          border='50%'
        />
        <Skeleton className={cls.title} width={300} height={32} />
        <Skeleton className={cls.skeleton} width={600} height={24} />
        <Skeleton className={cls.skeleton} width='100%' height={200} />
        <Skeleton className={cls.skeleton} width='100%' height={200} />
      </>
    );
  } else if (error) {
    content = <div>{t('Error')}</div>;
  } else {
    content = (
      <ToggleFeatures
        feature={'isAppRedesigned'}
        on={<Redesigned />}
        off={<Deprecated />}
      />
    );
  }

  const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
  };

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <VStack
        max
        gap={'16'}
        className={classNames(cls.ArticleDetails, {}, [className])}
      >
        {content}
      </VStack>
    </DynamicModuleLoader>
  );
});
