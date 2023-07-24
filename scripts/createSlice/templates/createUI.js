// Подключаем модули 'fs/promises', 'resolveRoot', 'firstCharUpperCase' и шаблоны для компонента, истории и стилей
const fs = require('fs/promises');
const resolveRoot = require('../resolveRoot');
const firstCharUpperCase = require('../firstCharUpperCase');
const componentTemplate = require('./componentTemplate');
const storyTemplate = require('./storyTemplate');
const styleTemplate = require('./styleTemplate');

// Экспортируем асинхронную функцию, которая создает структуру для UI компонента заданного слайса
module.exports = async (layer, sliceName) => {
  // Функция для получения пути к UI директории
  const resolveUIPath = (...segments) =>
    resolveRoot('src', layer, sliceName, 'ui', ...segments);

  // Функция для создания UI директории
  const createUIDir = async () => {
    try {
      await fs.mkdir(resolveUIPath());
    } catch (e) {
      console.log('Не удалось создать UI директорию');
    }
  };

  // Функция для создания компонента
  const createComponent = async () => {
    try {
      // Генерируем имя компонента, первая буква которого должна быть в верхнем регистре
      const componentName = firstCharUpperCase(sliceName);

      // Создаем директорию для компонента
      await fs.mkdir(resolveUIPath(componentName));

      // Создаем файлы для компонента, используя соответствующие шаблоны
      await fs.writeFile(
        resolveUIPath(componentName, `${componentName}.tsx`),
        componentTemplate(componentName),
      );
      await fs.writeFile(
        resolveUIPath(componentName, `${componentName}.stories.tsx`),
        storyTemplate(layer, componentName),
      );
      await fs.writeFile(
        resolveUIPath(componentName, `${componentName}.module.scss`),
        styleTemplate(componentName),
      );
    } catch (e) {
      console.log('Не удалось создать компонент');
    }
  };

  // Вызываем функции для создания структуры и компонента
  await createUIDir();
  await createComponent();
};
