// Импорт необходимых зависимостей из библиотек и файлов
import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import { ArticleView } from '../../model/consts/articleConsts';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import cls from './ArticleList.module.scss';
import { Article } from '../../model/types/article';
import { ToggleFeatures } from '@/shared/lib/features';
import { HStack } from '@/shared/ui/redesigned/Stack';

// Определение пропсов для компонента ArticleList
interface ArticleListProps {
  className?: string; // Класс компонента для настройки стилей
  articles: Article[]; // Массив статей
  isLoading?: boolean; // Флаг загрузки данных (по умолчанию - false)
  target?: HTMLAttributeAnchorTarget; // Атрибут target для ссылок (опционально)
  view?: ArticleView; // Вид отображения списка статей (опционально)
}

// Функция, возвращающая массив "скелетов" статей для демонстрации загрузки
const getSkeletons = (view: ArticleView) =>
  new Array(view === ArticleView.CARDS ? 9 : 3)
    .fill(0)
    .map((item, index) => (
      <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
    ));

// Компонент ArticleList
export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    view = ArticleView.CARDS,
    isLoading,
    target,
  } = props;
  const { t } = useTranslation(); // Хук для использования мультиязычности (i18n)

  // Если данных нет и не идет загрузка, отображается сообщение "Статьи не найдены"
  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        <Text size={TextSize.L} title={t('Статьи не найдены')} />
      </div>
    );
  }

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        // Компоненты ArticleListItem объединены в горизонтальную линию (HStack) для переключения между разработанным и устаревшим интерфейсами
        <HStack
          wrap='wrap'
          gap='16'
          className={classNames(cls.ArticleListRedesigned, {}, [])}
          data-testid='ArticleList'
        >
          {articles.map((item) => (
            // Для каждой статьи в массиве создается компонент ArticleListItem
            <ArticleListItem
              article={item}
              view={view}
              target={target}
              key={item.id}
              className={cls.card}
            />
          ))}
          {/* Если идет загрузка, отображаются "скелеты" статей */}
          {isLoading && getSkeletons(view)}
        </HStack>
      }
      off={
        // Альтернативная версия, если приложение не переключено на новый интерфейс
        <div
          className={classNames(cls.ArticleList, {}, [className, cls[view]])}
          data-testid='ArticleList'
        >
          {articles.map((item) => (
            // Для каждой статьи в массиве создается компонент ArticleListItem
            <ArticleListItem
              article={item}
              view={view}
              target={target}
              key={item.id}
              className={cls.card}
            />
          ))}
          {/* Если идет загрузка, отображаются "скелеты" статей */}
          {isLoading && getSkeletons(view)}
        </div>
      }
    />
  );
});
