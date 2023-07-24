// Импорт зависимостей из библиотек и модулей приложения
import webpack from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types/config';

// Функция buildWebpackConfig для создания конфигурации Webpack
export function buildWebpackConfig(
  options: BuildOptions,
): webpack.Configuration {
  // Разбор опций из объекта options
  const { paths, mode, isDev } = options;

  // Возврат объекта с конфигурацией Webpack
  return {
    mode, // Режим сборки: 'development' или 'production'
    entry: paths.entry, // Точка входа (главный файл) приложения
    output: {
      filename: '[name].[contenthash].js', // Имя файлов для сборки
      path: paths.build, // Путь для сохранения собранного кода
      clean: true, // Очистка папки сборки перед каждой новой сборкой
      publicPath: '/', // Публичный путь для подгрузки ассетов в браузере
    },
    plugins: buildPlugins(options), // Подключение плагинов Webpack (определенных в отдельном файле buildPlugins)
    module: {
      rules: buildLoaders(options), // Подключение загрузчиков (loaders) для обработки различных типов файлов
    },
    resolve: buildResolvers(options), // Подключение разрешителей (resolvers) для удобной работы с путями
    devtool: isDev ? 'eval-cheap-module-source-map' : undefined, // Настройка инструмента для отладки кода в development-режиме
    devServer: isDev ? buildDevServer(options) : undefined, // Настройки сервера разработки для development-режима
  };
}
