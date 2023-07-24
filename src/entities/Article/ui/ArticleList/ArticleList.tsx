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

/**
 *В данном коде представлен компонент ArticleList, который отображает список статей или карточек статей.
 *Он имеет различные варианты отображения, которые определяются через пропс view.
 *Компонент принимает следующие пропсы:
 *
 *className - класс компонента для настройки стилей;
 *articles - массив статей;
 *isLoading - флаг загрузки данных (по умолчанию - false);
 *target - атрибут target для ссылок (опционально);
 *view - вид отображения списка статей (опционально, по умолчанию используется вид ArticleView.CARDS).
 *
 *Если данных нет и не идет загрузка (!isLoading && !articles.length), компонент выводит сообщение "Статьи не найдены".
 *Для переключения между разработанным и устаревшим интерфейсами используется компонент ToggleFeatures.
 *В зависимости от активного интерфейса (isAppRedesigned), отображается соответствующий вариант компонента ArticleList:
 *с использованием нового интерфейса (on) или старого (off).
 *В компоненте также используются компоненты ArticleListItem и ArticleListItemSkeleton для отображения статей и "скелетов" статей соответственно.
 * @param view
 * @returns
 */

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
