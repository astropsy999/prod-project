// Импорт необходимых зависимостей из библиотеки React
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
// Импорт функции classNames для удобного создания классов элементов
import { classNames } from '@/shared/lib/classNames/classNames';
// Импорт компонентов Text и TextDeprecated для отображения текстовых элементов
import { Text as TextDeprecated, TextAlign } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
// Импорт типа ArticleImageBlock из файла с типами статьи
import { ArticleImageBlock } from '../../model/types/article';
// Импорт стилей для компонента ArticleImageBlockComponent
import cls from './ArticleImageBlockComponent.module.scss';
// Импорт компонента ToggleFeatures для управления отображением компонентов в зависимости от флагов приложения
import { ToggleFeatures } from '@/shared/lib/features';

// Определение интерфейса для пропсов компонента ArticleImageBlockComponent
interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
}

/**
 * Компонент ArticleImageBlockComponent отвечает за отображение блока с изображением статьи.
 * Он использует memo для оптимизации перерисовок, что может быть полезным для компонентов,
 * у которых нет необходимости перерисовываться при изменении пропсов.
 * Внутри компонента используется хук useTranslation из библиотеки react-i18next для перевода текстовых данных.
 * Компонент отображает изображение, используя тег <img> с путем к изображению из свойства block.src,
 * а также указывает альтернативный текст для изображения из свойства block.title.
 */

// Компонент ArticleImageBlockComponent, обернутый в memo для оптимизации перерисовок
export const ArticleImageBlockComponent = memo(
  ({ className, block }: ArticleImageBlockComponentProps) => {
    // Использование хука useTranslation для перевода текстовых данных
    const { t } = useTranslation();

    return (
      <div
        // Применение стилей через classNames для компонента ArticleImageBlockComponent
        className={classNames(cls.ArticleImageBlockComponent, {}, [className])}
      >
        {/* Отображение изображения с использованием тега <img> */}
        <img src={block.src} alt={block.title} className={cls.img} />

        {/* Проверка наличия заголовка блока и отображение текста в зависимости от флага isAppRedesigned */}
        {block.title && (
          <ToggleFeatures
            feature={'isAppRedesigned'}
            // Если флаг isAppRedesigned включен, будет использован компонент Text из библиотеки redesigned
            on={<Text text={block.title} align='center' />}
            // Если флаг isAppRedesigned выключен, будет использован компонент TextDeprecated из библиотеки deprecated
            off={<TextDeprecated text={block.title} align={TextAlign.CENTER} />}
          />
        )}
      </div>
    );
  },
);
