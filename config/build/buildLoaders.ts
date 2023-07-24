// Импорт необходимых модулей и зависимостей
// @ts-ignore
import webpack, { RuleSetRule } from 'webpack';
import { buildBabelLoader } from './loaders/buildBabelLoader';
import { buildCssLoader } from './loaders/buildCssLoader';
import { BuildOptions } from './types/config';

// Функция buildLoaders, которая строит и возвращает массив правил загрузчиков (loaders) для Webpack
export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const { isDev } = options;

  // Настройка загрузчика для файлов SVG с использованием @svgr/webpack
  const svgLoader = {
    test: /\.svg$/,
    use: [{
      loader: '@svgr/webpack',
      options: {
        icon: true,
        svgoConfig: {
          plugins: [
            { name: 'convertColors',
              params: {
                currentColor: true,
              } },
          ],
        },
      },
    }],
  };

  // Создание загрузчиков для кода (JS/JSX) с использованием buildBabelLoader
  const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
  const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });

  // Создание загрузчика для обработки CSS с использованием buildCssLoader
  const cssLoader = buildCssLoader(isDev);

  // Загрузчик для файлов (PNG, JPEG, GIF, WOFF2, WOFF) с использованием file-loader
  const fileLoader: RuleSetRule = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    loader: 'file-loader',
    options: {
      name: '[path][name].[ext]',
    },
  };

  // Возвращение массива с заданными загрузчиками в нужном порядке
  return [
    fileLoader,
    svgLoader,
    codeBabelLoader,
    tsxCodeBabelLoader,
    cssLoader,
  ];
}
