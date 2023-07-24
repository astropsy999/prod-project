// Импорт плагина для Babel, который удаляет определенные пропсы из JSX
import babelRemovePropsPlugin from '../../babel/babelRemovePropsPlugin';
// Импорт типа BuildOptions из другого файла
import { BuildOptions } from '../types/config';

// Определение интерфейса BuildBabelLoaderProps, который расширяет BuildOptions и может содержать дополнительный флаг isTsx
interface BuildBabelLoaderProps extends BuildOptions {
  isTsx?: boolean;
}

// Функция buildBabelLoader, которая принимает объект с параметрами BuildBabelLoaderProps и возвращает объект с настройками для загрузчика Babel
export function buildBabelLoader({ isDev, isTsx }: BuildBabelLoaderProps) {
  const isProd = !isDev;
  return {
    test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,  // Определение типов файлов, которые должен обрабатывать загрузчик Babel
    exclude: /node_modules/,  // Исключение папки "node_modules" из обработки
    use: {
      loader: 'babel-loader',  // Используемый загрузчик - Babel-loader
      options: {
        cacheDirectory: true,  // Включение кэширования для ускорения повторной обработки файлов
        presets: ['@babel/preset-env', '@babel/preset-typescript'],  // Предустановки (presets) Babel для поддержки современных функций JavaScript и TypeScript
        plugins: [
          [
            '@babel/plugin-transform-typescript',  // Плагин Babel для обработки TypeScript
            {
              isTsx,  // Передача флага isTsx в настройки плагина для правильной обработки TypeScript/JSX файлов
            },
          ],
          '@babel/plugin-transform-runtime',  // Плагин для поддержки функциональности Babel, такой как async/await и другие
          isTsx &&
            isProd && [
              babelRemovePropsPlugin,  // Плагин для удаления определенных пропсов из JSX
              {
                props: ['data-testid'],  // Массив имен пропсов, которые нужно удалить (в данном случае - 'data-testid')
              },
            ],
          isDev && require.resolve('react-refresh/babel'),  // Плагин для поддержки Hot Module Replacement (HMR) в режиме разработки
        ].filter(Boolean),  // Фильтрация массива плагинов, чтобы удалить undefined (если флаг isTsx не установлен)
      },
    },
  };
}
