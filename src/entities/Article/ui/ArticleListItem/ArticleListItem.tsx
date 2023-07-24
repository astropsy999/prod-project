// Импорт необходимых зависимостей и компонентов
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { ArticleView } from '../../model/consts/articleConsts';
import { Article } from '../../model/types/article';
import { ToggleFeatures } from '@/shared/lib/features';
import { ArticleListItemDeprecated } from './ArticleListItemDeprecated/ArticleListItemDeprecated';
import { ArticleListItemRedesigned } from './ArticleListItemRedesigned/ArticleListItemRedesigned';

// Определение интерфейса для пропсов компонента ArticleListItem
export interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

/**
 * В данном коде определен компонент ArticleListItem, который использует мемоизацию (memo) для оптимизации рендеринга.
 * Компонент принимает входные данные через интерфейс ArticleListItemProps, который включает в себя className, article, view и target.
 * Компонент ArticleListItem использует ToggleFeatures, который представляет собой компонент для переключения между двумя
 * различными версиями компонента ArticleListItem, в зависимости от функции-признака isAppRedesigned.
 * Это означает, что в зависимости от активации или деактивации функции-признака isAppRedesigned, будет отображаться одна из двух версий компонента.
 * Если функция-признак isAppRedesigned активна (параметр "on"), то будет использоваться компонент ArticleListItemRedesigned, который
 * представляет редизайн версию статьи с новым интерфейсом.
 * Если функция-признак isAppRedesigned неактивна (параметр "off"), то будет использоваться компонент ArticleListItemDeprecated, который
 * представляет устаревшую версию статьи с предыдущим интерфейсом.
 * Такое разделение позволяет легко включать или отключать новый дизайн статьи в зависимости от наличия активной функции-признака isAppRedesigned.
 * Также мемоизация компонента позволяет избежать ненужных перерисовок при изменении пропсов.
 */

// Компонент ArticleListItem с использованием мемоизации (memo)
export const ArticleListItem = memo((props: ArticleListItemProps) => (
  // ToggleFeatures - компонент для переключения между различными версиями ArticleListItem
  <ToggleFeatures
    feature='isAppRedesigned' // Имя функции-признака для определения, какую версию компонента использовать
    // Включение функции-признака (если признак активен)
    on={<ArticleListItemRedesigned {...props} />} // Используем ArticleListItemRedesigned, если функция-признак активна
    // Отключение функции-признака (если признак неактивен)
    off={<ArticleListItemDeprecated {...props} />} // Используем ArticleListItemDeprecated, если функция-признак неактивна
  />
));
