// Импорт необходимых зависимостей из библиотеки @babel/core
import { PluginItem } from '@babel/core';

// Экспорт функции, возвращающей объект PluginItem
export default function (): PluginItem {
  return {
    visitor: {
      // Метод Program выполняется для каждой программы (файла) перед его обработкой
      Program(path, state) {
        // Получение запрещенных идентификаторов из опций плагина, если они заданы
        const forbidden = state.opts.props || [];

        // Обход AST (Abstract Syntax Tree) для текущего пути
        path.traverse({
          // Встречаем JSX идентификаторы (теги или компоненты)
          JSXIdentifier(current) {
            // Получаем имя идентификатора (тега или компонента)
            const nodeName = current.node.name;

            // Проверяем, содержится ли имя идентификатора в списке запрещенных
            if (forbidden.includes(nodeName)) {
              // Если имя идентификатора присутствует в списке запрещенных, удаляем его родительский путь
              current.parentPath.remove();
            }
          },
        });
      },
    },
  };
}
