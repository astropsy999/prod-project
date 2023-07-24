// Импорт необходимых зависимостей из библиотек и файлов
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from '../ArticleListItem.module.scss';
import { Text } from '@/shared/ui/deprecated/Text';
import { Icon } from '@/shared/ui/deprecated/Icon';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import { ArticleTextBlock } from '../../../model/types/article';
import {
  ArticleView,
  ArticleBlockType,
} from '../../../model/consts/articleConsts';
import { Card } from '@/shared/ui/deprecated/Card';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { ArticleTextBlockComponent } from '../../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { getRouteArticleDetails } from '@/shared/const/router';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { ArticleListItemProps } from '../ArticleListItem';

/**
 * В данном коде представлен компонент ArticleListItemDeprecated, который отображает статьи или карточки статей в разных видах (ArticleView).
 * Этот компонент является устаревшим, так как использует старые компоненты для отображения интерфейса.
 *
 * Компонент принимает следующие пропсы:
 *  className - класс компонента для настройки стилей;
 *  article - объект статьи;
 *  view - вид отображения списка статей;
 *  target - атрибут target для ссылок (опционально).
 *
 * Компонент в зависимости от вида (view) отображает статью либо в виде списка, либо в виде карточки.
 * Внутри компонента создаются необходимые элементы для представления информации о статье, такие как аватар, название, типы статьи, количество просмотров и другие.
 * Данный устаревший компонент представлен как пример глобального процесса по замене компонентов в приложении на новые используюя различные условия
 */

// Компонент ArticleListItemDeprecated
export const ArticleListItemDeprecated = memo((props: ArticleListItemProps) => {
  const { className, article, view, target } = props;
  const { t } = useTranslation(); // Хук для использования мультиязычности (i18n)

  // Формирование элементов с типами статьи и количеством просмотров
  const types = <Text text={article.type.join(', ')} className={cls.types} />;
  const views = (
    <>
      <Text text={String(article.views)} className={cls.views} />
      <Icon Svg={EyeIcon} />
    </>
  );

  // Если view === ArticleView.LIST (Вид списка статей)
  if (view === ArticleView.LIST) {
    // Находим первый блок текстового типа для отображения в описании статьи
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;

    // Возвращаем JSX разметку для представления статьи в виде списка
    return (
      <div
        data-testid='ArticleListItem'
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        <Card className={cls.card}>
          <div className={cls.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text text={article.user.username} className={cls.username} />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <Text title={article.title} className={cls.title} />
          {types}
          <AppImage
            fallback={<Skeleton width='100%' height={250} />}
            src={article.img}
            className={cls.img}
            alt={article.title}
          />
          {textBlock && (
            <ArticleTextBlockComponent
              block={textBlock}
              className={cls.textBlock}
            />
          )}
          <div className={cls.footer}>
            <AppLink target={target} to={getRouteArticleDetails(article.id)}>
              <Button theme={ButtonTheme.OUTLINE}>
                {t('Читать далее...')}
              </Button>
            </AppLink>
            {views}
          </div>
        </Card>
      </div>
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
      <Card className={cls.card}>
        <div className={cls.imageWrapper}>
          <AppImage
            fallback={<Skeleton width={200} height={200} />}
            alt={article.title}
            src={article.img}
            className={cls.img}
          />
          <Text text={article.createdAt} className={cls.date} />
        </div>
        <div className={cls.infoWrapper}>
          {types}
          {views}
        </div>
        <Text text={article.title} className={cls.title} />
      </Card>
    </AppLink>
  );
});
