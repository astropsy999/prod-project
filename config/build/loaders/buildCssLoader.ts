// Импорт MiniCssExtractPlugin из библиотеки mini-css-extract-plugin
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

// Функция buildCssLoader, которая возвращает конфигурацию загрузчика для обработки CSS и SCSS файлов
export function buildCssLoader(isDev: boolean) {
  return {
    // Тестирует файлы с расширениями .scss, .sass и .css
    test: /\.s[ac]ss$/i,

    // Исключает папку node_modules из обработки
    exclude: /node_modules/,

    // Использует список загрузчиков для обработки файлов
    use: [
      // В режиме разработки использует 'style-loader' для внедрения стилей внутри тега <style>
      // В режиме продакшн использует MiniCssExtractPlugin.loader для извлечения стилей в отдельные CSS файлы
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,

      // Использует 'css-loader' для обработки CSS файлов
      {
        loader: 'css-loader',
        options: {
          modules: {
            // Определяет, будут ли использоваться CSS-модули для файлов
            // Если в пути файла присутствует '.module.', то CSS-модули будут активированы
            auto: (resPath: string) => Boolean(resPath.includes('.module.')),

            // Определяет формат имени класса для CSS-модулей
            // В режиме разработки: '[path][name]__[local]--[hash:base64:5]'
            // В режиме продакшн: '[hash:base64:8]'
            localIdentName: isDev
              ? '[path][name]__[local]--[hash:base64:5]'
              : '[hash:base64:8]',
          },
        },
      },

      // Использует 'sass-loader' для обработки SCSS файлов
      'sass-loader',
    ],
  };
}
