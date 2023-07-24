import { Configuration, DefinePlugin, RuleSetRule } from 'webpack';
import path from 'path';
import { buildCssLoader } from '../build/loaders/buildCssLoader';

export default {
  // Путь к историям компонентов
  stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx)'],

  // Дополнения для Storybook
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
      },
    },
    '@storybook/addon-interactions',
    'storybook-addon-mock',
    'storybook-addon-themes',
  ],

  // Фреймворк, используемый в Storybook
  framework: '@storybook/react',

  // Основные настройки
  core: {
    builder: 'webpack5',
  },

  // Настройки Webpack, применяемые в конце конфигурации
  webpackFinal: async (config: Configuration) => {
    const paths = {
      build: '',
      html: '',
      entry: '',
      src: path.resolve(__dirname, '..', '..', 'src'),
      locales: '',
      buildLocales: '',
    };

    // Добавляем путь к исходникам в разрешение модулей
    config!.resolve!.modules!.push(paths.src);

    // Добавляем расширения файлов для разрешения модулей
    config!.resolve!.extensions!.push('.ts', '.tsx');
    config!.resolve!.alias = {
      ...config!.resolve!.alias,
      '@': paths.src,
    };

    // Изменяем правила модулей для обработки файлов SVG с помощью SVGR
    config!.module!.rules = config!.module!.rules!.map(
      // @ts-ignore
      (rule: RuleSetRule) => {
        if (/svg/.test(rule.test as string)) {
          return { ...rule, exclude: /\.svg$/i };
        }

        return rule;
      },
    );

    // Добавляем правило для обработки файлов SVG с помощью SVGR
    config!.module!.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Добавляем правило для обработки CSS
    config!.module!.rules.push(buildCssLoader(true));

    // Добавляем плагин для определения глобальных переменных
    config!.plugins!.push(
      new DefinePlugin({
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify('https://testapi.ru'),
        __PROJECT__: JSON.stringify('storybook'),
      }),
    );

    // Возвращаем измененную конфигурацию
    return config;
  },
};
