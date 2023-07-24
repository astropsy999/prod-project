// Импорт необходимых зависимостей
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
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
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import cls from './ArticleDetails.module.scss';
import { renderArticleBlock } from './renderBlock';

// Определение типа пропсов для компонента ArticleDetails
interface ArticleDetailsProps {
  className?: string;
  id?: string;
}

// Компонент, отображающий информацию о статье с использованием устаревших компонентов
const Deprecated = () => {
  const article = useSelector(getArticleDetailsData);

  return (
    <>
      {/* Вывод аватара */}
      <HStack justify={'center'} max className={cls.avatarWrapper}>
        <Avatar size={200} src={article?.img} className={cls.avatar} />
      </HStack>
      {/* Вывод основной информации о статье */}
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

      {/* Вывод блоков статьи */}
      {article?.blocks.map(renderArticleBlock)}
    </>
  );
};

// Компонент, отображающий информацию о статье с использованием обновленных компонентов
const Redesigned = () => {
  const article = useSelector(getArticleDetailsData);

  return (
    <>
      <Text bold title={article?.title} size={'l'} />
      <Text text={article?.subtitle} />
      <AppImage
        fallback={
          <SkeletonRedesigned width={'100%'} height={'420px'} border={'16px'} />
        }
        src={article?.img}
        className={cls.img}
      />

      {/* Вывод блоков статьи */}
      {article?.blocks.map(renderArticleBlock)}
    </>
  );
};

// Компонент-заглушка для отображения скелетонов в зависимости от признака 'isAppRedesigned'
const Skeleton = toggleFeatures({
  name: 'isAppRedesigned',
  on: () => SkeletonRedesigned,
  off: () => SkeletonDeprecated,
});

// Основной компонент ArticleDetails
export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { className, id } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const error = useSelector(getArticleDetailsError);

  // Получение данных статьи при монтировании компонента
  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id]);

  let content;

  // Вывод контента в зависимости от состояния загрузки или ошибки
  if (isLoading) {
    content = (
      <>
        {/* Вывод скелетонов */}
        <Skeleton
          className={cls.avatar}
          width={200}
          height={200}
          border='50%'
        />
        <Skeleton className={cls.title} width={300} height={32} border='16px' />
        <Skeleton
          className={cls.skeleton}
          width={600}
          height={24}
          border='16px'
        />
        <Skeleton
          className={cls.skeleton}
          width='100%'
          height={200}
          border='16px'
        />
        <Skeleton
          className={cls.skeleton}
          width='100%'
          height={200}
          border='16px'
        />
      </>
    );
  } else if (error) {
    content = <div>{t('Error')}</div>;
  } else {
    // Отображение данных статьи с учетом признака 'isAppRedesigned'
    content = (
      <ToggleFeatures
        feature={'isAppRedesigned'}
        on={<Redesigned />}
        off={<Deprecated />}
      />
    );
  }

  // Конфигурация reducers для DynamicModuleLoader
  const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
  };

  return (
    // Обертка компонента с использованием DynamicModuleLoader для управления состоянием articleDetails
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
