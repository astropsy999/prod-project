import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import cls from './ArticleListItem.module.scss';

interface ArticleListItemProps {
  className?: string;
}

export const ArticleListItem = memo(({ className }: ArticleListItemProps) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.ArticleListItem, {}, [className])}>
      ArticleListItem
    </div>
  );
});
