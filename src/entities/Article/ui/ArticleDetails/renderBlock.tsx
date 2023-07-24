// Импорт типа ArticleBlockType из файла с константами articleConsts
import { ArticleBlockType } from '../../model/consts/articleConsts';
// Импорт типа ArticleBlock из файла с типами статьи
import { ArticleBlock } from '../../model/types/article';
// Импорт компонентов для отображения блоков статьи
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
// Импорт стилей для компонента ArticleDetails
import cls from './ArticleDetails.module.scss';
/**
 * Функция renderArticleBlock используется для отображения различных блоков статьи в зависимости от их типа.
 * Она принимает в качестве аргумента объект block типа ArticleBlock, который содержит информацию о конкретном блоке статьи.
 * Внутри функции используется конструкция switch для определения типа блока block.type и выбора соответствующего компонента для его отображения.
 * Если тип блока соответствует ArticleBlockType.CODE, то будет возвращен компонент ArticleCodeBlockComponent с передачей блока в качестве пропса.
 * Если тип блока соответствует ArticleBlockType.IMAGE, то будет возвращен компонент ArticleImageBlockComponent с передачей блока в качестве пропса.
 * А если тип блока соответствует ArticleBlockType.TEXT, то будет возвращен компонент ArticleTextBlockComponent с передачей блока в качестве пропса.
 * Если тип блока не определен или неизвестен (не совпадает ни с одним из определенных в switch), то функция вернет null, что означает,
 * что данный тип блока не будет отображаться в итоговом выводе.
 * @param block
 * @returns
 */
// Функция renderArticleBlock принимает блок статьи (ArticleBlock) и возвращает соответствующий компонент для его отображения
export const renderArticleBlock = (block: ArticleBlock) => {
  // Используется конструкция switch для определения типа блока и выбора соответствующего компонента для его отображения
  switch (block.type) {
    case ArticleBlockType.CODE:
      // Возвращается компонент ArticleCodeBlockComponent с передачей блока в качестве пропса
      return (
        <ArticleCodeBlockComponent
          key={block.id}
          block={block}
          className={cls.block}
        />
      );
    case ArticleBlockType.IMAGE:
      // Возвращается компонент ArticleImageBlockComponent с передачей блока в качестве пропса
      return (
        <ArticleImageBlockComponent
          key={block.id}
          block={block}
          className={cls.block}
        />
      );
    case ArticleBlockType.TEXT:
      // Возвращается компонент ArticleTextBlockComponent с передачей блока в качестве пропса
      return (
        <ArticleTextBlockComponent
          key={block.id}
          className={cls.block}
          block={block}
        />
      );
    // В случае, если тип блока неизвестен или не определен, возвращается null
    default:
      return null;
  }
};
