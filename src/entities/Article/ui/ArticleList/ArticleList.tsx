import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
  className?: string;
}

export const ArticleList = memo(({ className }: ArticleListProps) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.ArticleList, {}, [className])}>
      ArticleList
    </div>
  );
});
