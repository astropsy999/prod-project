// Подключаем модули 'fs/promises', 'resolveRoot', 'reduxSliceTemplate' и 'schemaTypeTemplate'
const fs = require('fs/promises');
const resolveRoot = require('../resolveRoot');
const reduxSliceTemplate = require('./reduxSliceTemplate');
const schemaTypeTemplate = require('./schemaTypeTemplate');

// Экспортируем асинхронную функцию, которая создает структуру модели Redux и соответствующие файлы слайса и типа схемы
module.exports = async (layer, sliceName) => {
  // Функция 'resolveModelPath' принимает сегменты пути и использует функцию 'resolveRoot' для получения абсолютного пути к директории модели
  const resolveModelPath = (...segments) =>
    resolveRoot('src', layer, sliceName, 'model', ...segments);

  // Функция 'createModelStructure' создает необходимую структуру директорий для модели
  const createModelStructure = async () => {
    try {
      await fs.mkdir(resolveModelPath());
      await fs.mkdir(resolveModelPath('types'));
      await fs.mkdir(resolveModelPath('slices'));
      await fs.mkdir(resolveModelPath('selectors'));
      await fs.mkdir(resolveModelPath('services'));
    } catch (e) {
      console.log(
        `Не удалось создать model сегмент для слайса ${sliceName}`,
        e,
      );
    }
  };

  // Функция 'createReduxSlice' создает файл Redux слайса на основе шаблона 'reduxSliceTemplate'
  const createReduxSlice = async () => {
    try {
      await fs.writeFile(
        resolveModelPath('slices', `${sliceName}Slice.ts`),
        reduxSliceTemplate(sliceName),
      );
    } catch (e) {
      console.log('Не удалось создать редакс слайс', e);
    }
  };

  // Функция 'createSchemaType' создает файл типа схемы стейта на основе шаблона 'schemaTypeTemplate'
  const createSchemaType = async () => {
    try {
      await fs.writeFile(
        resolveModelPath('types', `${sliceName}Schema.ts`),
        schemaTypeTemplate(sliceName),
      );
    } catch (e) {
      console.log('Не удалось создать тип схемы стейта', e);
    }
  };

  // Создаем структуру модели и необходимые файлы, вызывая соответствующие функции
  await createModelStructure();
  await createReduxSlice();
  await createSchemaType();
};
