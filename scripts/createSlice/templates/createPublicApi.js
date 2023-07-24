// Подключаем модули 'fs/promises', 'resolveRoot' и 'firstCharUpperCase'
const fs = require('fs/promises');
const resolveRoot = require('../resolveRoot');
const firstCharUpperCase = require('../firstCharUpperCase');

// Экспортируем асинхронную функцию, которая создает файл PUBLIC API для заданного слайса
module.exports = async (layer, sliceName) => {
  // Генерируем имя компонента, первая буква которого должна быть в верхнем регистре
  const componentName = firstCharUpperCase(sliceName);

  // Генерируем имя схемы, которое будет использовано в пути файла
  const schemaName = `${sliceName}Schema`;

  try {
    // Создаем файл PUBLIC API, который экспортирует компонент и схему стейта
    await fs.writeFile(
      resolveRoot('src', layer, sliceName, 'index.ts'),
      `export { ${componentName} } from './ui/${componentName}/${componentName}';
export { ${firstCharUpperCase(
        schemaName,
      )} } from './model/types/${schemaName}';`,
    );
  } catch (e) {
    console.log('Не удалось создать PUBLIC API');
  }
};
