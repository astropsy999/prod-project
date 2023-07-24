// Импорт необходимых зависимостей из библиотек и файлов
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleListItemRedesigned.module.scss';
import { ArticleListItemProps } from '../ArticleListItem';
import { Text } from '@/shared/ui/redesigned/Text';
import { Icon } from '@/shared/ui/redesigned/Icon';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { ArticleTextBlock } from '../../../model/types/article';
import { Card } from '@/shared/ui/redesigned/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { getRouteArticleDetails } from '@/shared/const/router';
import { Button } from '@/shared/ui/redesigned/Button';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import {
  ArticleBlockType,
  ArticleView,
} from '../../../model/consts/articleConsts';

/**
 *В данном коде представлен компонент ArticleListItemRedesigned, который отображает статьи или карточки статей в разных видах (ArticleView).
 *Этот компонент является модернизированным и использует новые компоненты для отображения интерфейса.
 *
 * Компонент принимает следующие пропсы:
 * className - класс компонента для настройки стилей;
 * article - объект статьи;
 * view - вид отображения списка статей;
 * target - атрибут target для ссылок (опционально).
 *
 * Компонент в зависимости от вида (view) отображает статью либо в виде списка, либо в виде карточки.
 * Внутри компонента создаются необходимые элементы для представления информации о статье, такие как аватар, название, подзаголовок, количество просмотров и другие.
 * Данный компонент использует новые компоненты из библиотеки @/shared/ui/redesigned, что позволяет сделать интерфейс более современным и
 * легко изменяемым при необходимости.
 */

// Компонент ArticleListItemRedesigned
export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
  const { className, article, view, target } = props;
  const { t } = useTranslation(); // Хук для использования мультиязычности (i18n)

  // Формирование JSX для информации о пользователе (аватар и имя)
  const userInfo = (
    <>
      <Avatar size={32} src={article.user.avatar} className={cls.avatar} />
      <Text bold text={article.user.username} />
    </>
  );

  // Формирование JSX для отображения количества просмотров
  const views = (
    <HStack gap='8'>
      <Icon Svg={EyeIcon} />
      <Text text={String(article.views)} className={cls.views} />
    </HStack>
  );

  // Если view === ArticleView.LIST (Вид списка статей)
  if (view === ArticleView.LIST) {
    // Находим первый блок текстового типа для отображения в описании статьи
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;

    // Возвращаем JSX разметку для представления статьи в виде списка
    return (
      <Card
        padding='24'
        max
        data-testid='ArticleListItem'
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        <VStack max gap='16'>
          <HStack gap='8' max>
            {userInfo}
            <Text text={article.createdAt} />
          </HStack>
          <Text title={article.title} bold />
          <Text title={article.subtitle} size='s' />
          <AppImage
            fallback={<Skeleton width='100%' height={250} />}
            src={article.img}
            className={cls.img}
            alt={article.title}
          />
          {textBlock?.paragraphs && (
            <Text
              className={cls.textBlock}
              text={textBlock.paragraphs.slice(0, 2).join(' ')}
            />
          )}
          <HStack max justify='between'>
            <AppLink target={target} to={getRouteArticleDetails(article.id)}>
              <Button variant='outline'>{t('Читать далее...')}</Button>
            </AppLink>
            {views}
          </HStack>
        </VStack>
      </Card>
    );
  }

  // Возвращаем JSX разметку для представления статьи в виде карточки
  return (
    <AppLink
      data-testid='ArticleListItem'
      target={target}
      to={getRouteArticleDetails(article.id)}
      className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
    >
      <Card className={cls.card} border='partial' padding='0'>
        <AppImage
          fallback={<Skeleton width={200} height={200} />}
          alt={article.title}
          src={article.img}
          className={cls.img}
        />
        <VStack className={cls.info} gap='4'>
          <Text title={article.title} className={cls.title} />
          <VStack gap='4' className={cls.footer} max>
            <HStack justify='between' max>
              <Text text={article.createdAt} className={cls.date} />
              {views}
            </HStack>
            <HStack gap='4'>{userInfo}</HStack>
          </VStack>
        </VStack>
      </Card>
    </AppLink>
  );
});
