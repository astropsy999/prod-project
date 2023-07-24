// Импорт необходимых зависимостей
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Code } from '@/shared/ui/redesigned/Code';
import { ArticleCodeBlock } from '../../model/types/article'; // Импорт типа ArticleCodeBlock из файла article.ts
import cls from './ArticleCodeBlockComponent.module.scss'; // Импорт файлов стилей для компонента

// Интерфейс пропсов компонента ArticleCodeBlockComponent
interface ArticleCodeBlockComponentProps {
  className?: string; // Опциональное свойство, класс для стилизации компонента
  block: ArticleCodeBlock; // Объект типа ArticleCodeBlock, представляющий блок кода статьи
}

// Компонент ArticleCodeBlockComponent с оптимизацией memo
export const ArticleCodeBlockComponent = memo(
  ({ className, block }: ArticleCodeBlockComponentProps) => {
    const { t } = useTranslation(); // Хук для перевода текста

    return (
      // Возвращает разметку блока кода статьи
      <div
        className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}
      >
        {/* Используется компонент Code для отображения блока кода */}
        <Code text={block.code} />
      </div>
    );
  },
);
