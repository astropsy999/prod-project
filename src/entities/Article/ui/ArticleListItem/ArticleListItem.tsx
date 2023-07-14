import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Card } from '@/shared/ui/deprecated/Card';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Text } from '@/shared/ui/deprecated/Text';
import { ArticleBlockType, ArticleView } from '../../model/consts/consts';
import { Article, ArticleTextBlock } from '../../model/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import cls from './ArticleListItem.module.scss';
import { getRouteArticleDetails } from '@/shared/const/router';
import { AppImage } from '@/shared/ui/deprecated/AppImage';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo(
  ({ className, article, view, target }: ArticleListItemProps) => {
    const { t } = useTranslation();

    const types = <Text text={article.type.join(',')} className={cls.types} />;
    const views = (
      <>
        <Text text={String(article.views)} className={cls.views} />
        <Icon Svg={EyeIcon} />
      </>
    );
    if (view === ArticleView.LIST) {
      const textBlock = article.blocks.find(
        (block) => block.type === ArticleBlockType.TEXT,
      ) as ArticleTextBlock;
      return (
        <div
          data-testid='ArticleListItem'
          className={classNames(cls.ArticleListItem, {}, [
            className,
            cls[view],
          ])}
        >
          <Card className={cls.card}>
            <div className={cls.header}>
              <Avatar size={30} src={article.user.avatar} />
              <Text title={article.user.username} className={cls.username} />
              <Text text={article.createdAt} className={cls.date} />
            </div>
            <Text title={article.title} className={cls.title} />
            {types}
            <AppImage
              fallBack={<Skeleton width={'100%'} height={250} />}
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
              fallBack={<Skeleton width={200} height={200} />}
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
          <Text title={article.title} className={cls.title} />
        </Card>
      </AppLink>
    );
  },
);
