// Подключаем модуль 'firstCharUpperCase', который содержит функцию для преобразования первой буквы строки в верхний регистр
const firstCharUpperCase = require('../firstCharUpperCase');

// Экспортируем функцию, которая генерирует шаблон редакс слайса для заданного слайса
module.exports = (sliceName) => {
  // Генерируем имя типа схемы для заданного слайса, первая буква которого должна быть в верхнем регистре
  const typeName = `${firstCharUpperCase(sliceName)}Schema`;

  return `import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ${typeName} } from '../types/${sliceName}Schema';

const initialState: ${typeName} = {
    // Инициализируем начальное состояние слайса (пустым объектом в данном случае)
};

// Создаем редакс слайс с заданным именем, начальным состоянием и редюсерами
export const ${sliceName}Slice = createSlice({
    name: '${sliceName}', // Имя слайса
    initialState, // Начальное состояние
    reducers: {
        // Здесь можно добавить редюсеры для обработки действий (payload actions)
        template: (state, action: PayloadAction<string>) => {
            // Редюсер 'template', который может обрабатывать действие с переданным текстовым параметром
            // В этой функции можно изменять состояние 'state' на основе переданных данных 'action.payload'
        },
    },
    // Можно также добавить 'extraReducers', если необходимо обрабатывать действия из других редакс слайсов
});

// Экспортируем экшены и редюсеры из созданного редакс слайса для использования в приложении
export const { actions: ${sliceName}Actions } = ${sliceName}Slice;
export const { reducer: ${sliceName}Reducer } = ${sliceName}Slice;`;
};
