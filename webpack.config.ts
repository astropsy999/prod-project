import path from 'path';
import webpack from 'webpack';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildPaths, BuildMode } from './config/build/types/config';

// Функция для определения URL API в зависимости от режима сборки и переданного apiUrl
function getApiUrl(mode: BuildMode, apiUrl?: string) {
  // Если apiUrl передан явно, вернуть его
  if (apiUrl) {
    return apiUrl;
  }
  // Если режим сборки - production, вернуть '/api'
  if (mode === 'production') {
    return '/api';
  }
  // Вернуть URL API для режима development (localhost:8000)
  return 'http://localhost:8000';
}

export default (env: BuildEnv) => {
  // Определение путей для сборки
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'), // Входной файл для сборки
    build: path.resolve(__dirname, 'build'), // Каталог для собранного приложения
    html: path.resolve(__dirname, 'public', 'index.html'), // Файл index.html
    src: path.resolve(__dirname, 'src'), // Корневой каталог исходного кода
    locales: path.resolve(__dirname, 'public', 'locales'), // Каталог с языковыми файлами
    buildLocales: path.resolve(__dirname, 'build', 'locales'), // Каталог для собранных языковых файлов
  };

  // Определение режима сборки (development по умолчанию) и порта (3000 по умолчанию)
  const mode = env?.mode || 'development';
  const PORT = env?.port || 3000;

  // Определение URL API с помощью функции getApiUrl, передача режима и, возможно, apiUrl
  const apiUrl = getApiUrl(mode, env?.apiUrl);

  // Определение флага isDev, который равен true для режима 'development', иначе false
  const isDev = mode === 'development';

  // Сборка конфигурации Webpack с помощью функции buildWebpackConfig
  const config: webpack.Configuration = buildWebpackConfig({
    mode, // Режим сборки
    paths, // Пути для сборки
    isDev, // Флаг isDev
    port: PORT, // Порт
    apiUrl, // URL API
    project: 'frontend', // Название проекта (frontend)
  });

  // Возвращаем собранную конфигурацию Webpack
  return config;
};
