// Импорт необходимых плагинов и зависимостей для сборки приложения
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';

// Импорт типа BuildOptions из types/config для использования опций сборки
import { BuildOptions } from './types/config';

// Функция buildPlugins, которая возвращает массив плагинов для Webpack в зависимости от переданных опций
export function buildPlugins({
  paths,
  isDev,
  apiUrl,
  project,
}: BuildOptions): webpack.WebpackPluginInstance[] {
  const isProd = !isDev;
  const plugins = [
    // Плагин HTMLWebpackPlugin для генерации HTML-файла на основе шаблона
    new HTMLWebpackPlugin({
      template: paths.html, // Используется указанный шаблон HTML
    }),

    // Плагин webpack.ProgressPlugin для отображения прогресса компиляции в консоли
    new webpack.ProgressPlugin(),

    // Плагин webpack.DefinePlugin для определения глобальных констант в коде приложения
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev), // Определение переменной __IS_DEV__, содержащей true, если режим разработки, и false в противном случае
      __API__: JSON.stringify(apiUrl), // Определение переменной __API__, содержащей значение apiUrl, переданное в опции
      __PROJECT__: JSON.stringify(project), // Определение переменной __PROJECT__, содержащей значение project, переданное в опции
    }),

    // Плагин CircularDependencyPlugin для проверки круговых зависимостей в коде приложения
    new CircularDependencyPlugin({
      exclude: /node_modules/, // Исключение папки node_modules из проверки
      failOnError: true, // Опция, указывающая на остановку сборки при обнаружении круговых зависимостей
    }),

    // Плагин ForkTsCheckerWebpackPlugin для проверки TypeScript в отдельном процессе
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true, // Включение семантических диагностических сообщений
          syntactic: true, // Включение синтаксических диагностических сообщений
        },
        mode: 'write-references', // Режим проверки типов с записью ссылок на файлы с типами
      },
    }),
  ];

  // Добавление дополнительных плагинов в режиме разработки
  if (isDev) {
    plugins.push(new ReactRefreshWebpackPlugin()); // Плагин ReactRefreshWebpackPlugin для горячей перезагрузки модулей React
    plugins.push(new webpack.HotModuleReplacementPlugin()); // Плагин webpack.HotModuleReplacementPlugin для горячей замены модулей без перезагрузки страницы

    plugins.push(
      new BundleAnalyzerPlugin({
        openAnalyzer: false, // Опция для открытия анализатора пакетов в браузере (в данном случае отключено)
      }),
    );
  }

  // Добавление дополнительных плагинов в режиме продакшн (сборки)
  if (isProd) {
    plugins.push(
      // Плагин MiniCssExtractPlugin для извлечения CSS в отдельные файлы
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css', // Определение формата имени выходного файла CSS
        chunkFilename: 'css/[name].[contenthash:8].css', // Определение формата имени выходного файла CSS для чанков (динамических импортов)
      }),
    );
    plugins.push(
      // Плагин CopyPlugin для копирования файлов и папок в выходную директорию сборки
      new CopyPlugin({
        patterns: [{ from: paths.locales, to: paths.buildLocales }], // Копирование файлов локализации из папки locales в выходную директорию сборки
      }),
    );
  }

  // Возвращение массива с плагинами для использования в конфигурации Webpack
  return plugins;
}
