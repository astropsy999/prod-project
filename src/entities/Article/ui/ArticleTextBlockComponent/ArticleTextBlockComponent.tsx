// Импорт необходимых зависимостей и компонентов
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { ArticleTextBlock } from '../../model/types/article';
import cls from './ArticleTextBlockComponent.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';

// Определение интерфейса ArticleTextBlockComponentProps для пропсов компонента
interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock;
}

/**
 * Компонент ArticleTextBlockComponent реализован с использованием мемоизации (memo). Он отображает текстовый блок статьи с учетом
 * функции-признака isAppRedesigned. Внутри компонента используется хук useTranslation для использования функциональности мультиязычности.
 * Компонент возвращает JSX-код, содержащий текстовый блок статьи с заголовком и абзацами. Компонент ToggleFeatures используется для переключения
 * между редизайн и устаревшей версией компонента Text и TextDeprecated, в зависимости от активации/деактивации функции-признака isAppRedesigned.
 */

// Компонент ArticleTextBlockComponent с использованием мемоизации (memo)
export const ArticleTextBlockComponent = memo(
  ({ className, block }: ArticleTextBlockComponentProps) => {
    const { t } = useTranslation();

    return (
      // Возвращение JSX кода компонента ArticleTextBlockComponent
      <div
        className={classNames(cls.ArticleTextBlockComponent, {}, [className])}
      >
        {block.title && (
          // Отображение заголовка блока с помощью компонента Text или TextDeprecated в зависимости от функции-признака isAppRedesigned
          <ToggleFeatures
            feature={'isAppRedesigned'}
            on={<Text title={block.title} className={cls.title} />}
            off={<TextDeprecated title={block.title} className={cls.title} />}
          />
        )}
        {block.paragraphs.map((paragraph) => (
          // Отображение абзацев текста с помощью компонента Text или TextDeprecated в зависимости от функции-признака isAppRedesigned
          <ToggleFeatures
            feature={'isAppRedesigned'}
            on={
              <Text
                key={paragraph}
                text={paragraph}
                className={cls.paragraph}
              />
            }
            off={
              <TextDeprecated
                key={paragraph}
                text={paragraph}
                className={cls.paragraph}
              />
            }
          />
        ))}
      </div>
    );
  },
);
