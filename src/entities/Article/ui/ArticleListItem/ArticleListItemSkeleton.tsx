// Импорт необходимых зависимостей и компонентов
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Card as CardRedesigned } from '@/shared/ui/redesigned/Card';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { ArticleView } from '../../model/consts/articleConsts';
import cls from './ArticleListItem.module.scss';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';

// Определение интерфейса для пропсов компонента ArticleListItemSkeleton
interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

/**
 * Внутри компонента ArticleListItemSkeleton происходит отрисовка контента статьи с помощью заглушек Skeleton. В зависимости от выбранного view,
 * компонент отображает заглушки для соответствующего вида статьи. Компонент ToggleFeatures позволяет переключаться между редизайн и устаревшей
 * версией карточки статьи, а также между редизайн и устаревшей версией изображения (Skeleton). В зависимости от активации/деактивации
 * функции-признака isAppRedesigned, отображается соответствующая версия компонента.
 * Возвращается JSX код с использованием определенных классов и компонентов в зависимости от функции-признака isAppRedesigned.
 * Отображается карточка статьи с соответствующим контентом и стилями.
 */

// Компонент ArticleListItemSkeleton с использованием мемоизации (memo)
export const ArticleListItemSkeleton = memo(
  (props: ArticleListItemSkeletonProps) => {
    const { className, view } = props;

    // Определение класса основного блока в зависимости от функции-признака isAppRedesigned
    const mainClass = toggleFeatures({
      name: 'isAppRedesigned',
      on: () => cls.ArticleListItemRedesigned, // Если функция-признак активна, используем редизайн версию
      off: () => cls.ArticleListItem, // Если функция-признак неактивна, используем устаревшую версию
    });

    // Определение компонента Skeleton в зависимости от функции-признака isAppRedesigned
    const Skeleton = toggleFeatures({
      name: 'isAppRedesigned',
      on: () => SkeletonRedesigned, // Если функция-признак активна, используем редизайн версию Skeleton
      off: () => SkeletonDeprecated, // Если функция-признак неактивна, используем устаревшую версию Skeleton
    });

    // Если view равен ArticleView.LIST, отображаем компонент для списка статей
    if (view === ArticleView.LIST) {
      const cardContent = (
        // Контент карточки статьи в виде заглушек Skeleton для редизайн и устаревшей версии
        <>
          <div className={cls.header}>
            <Skeleton border='50%' height={30} width={30} />
            <Skeleton
              width={150}
              height={16}
              className={cls.username}
              border='16px'
            />
            <Skeleton
              width={150}
              height={16}
              className={cls.date}
              border='16px'
            />
          </div>
          <Skeleton
            width={250}
            height={24}
            className={cls.title}
            border='16px'
          />
          <Skeleton height={200} className={cls.img} border='16px' />
          <div className={cls.footer}>
            <Skeleton height={36} width={200} border='16px' />
          </div>
        </>
      );
      return (
        // Отображение карточки статьи с редизайном или устаревшей версией в зависимости от функции-признака
        <div className={classNames(mainClass, {}, [className, cls[view]])}>
          <ToggleFeatures
            feature='isAppRedesigned'
            on={
              <CardRedesigned border='round' className={cls.card}>
                {cardContent}
              </CardRedesigned>
            }
            off={
              <CardDeprecated className={cls.card}>
                {cardContent}
              </CardDeprecated>
            }
          />
        </div>
      );
    }

    // Если view не равен ArticleView.LIST, отображаем компонент для карточки статьи
    const cardContent = (
      // Контент карточки статьи в виде заглушек Skeleton для редизайн и устаревшей версии
      <>
        <ToggleFeatures
          feature='isAppRedesigned'
          on={
            <Skeleton
              width='100%'
              height={150}
              border='32px'
              className={cls.img}
            />
          }
          off={
            <div className={cls.imageWrapper}>
              <Skeleton width={200} height={200} className={cls.img} />
            </div>
          }
        />
        <div className={cls.infoWrapper}>
          <Skeleton width={130} height={16} border='16px' />
        </div>
        <Skeleton width={150} height={16} className={cls.title} border='16px' />
      </>
    );

    return (
      // Отображение карточки статьи с редизайном или устаревшей версией в зависимости от функции-признака
      <div className={classNames(mainClass, {}, [className, cls[view]])}>
        <ToggleFeatures
          feature='isAppRedesigned'
          on={
            <CardRedesigned border='round' className={cls.card}>
              {cardContent}
            </CardRedesigned>
          }
          off={
            <CardDeprecated className={cls.card}>{cardContent}</CardDeprecated>
          }
        />
      </div>
    );
  },
);
