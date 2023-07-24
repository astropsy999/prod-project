// Импортируем функцию createTemplate из файла createTemplate.js
const createTemplate = require('./templates/createTemplate');

// Получаем аргументы командной строки: слой и название слайса
const layer = process.argv[2]; // Слой, указанный пользователем
const sliceName = process.argv[3]; // Название слайса, указанное пользователем

// Определяем список допустимых слоев
const layers = ['features', 'entities', 'pages'];

// Проверяем, предоставлен ли слой и является ли он допустимым
if (!layer || !layers.includes(layer)) {
  throw new Error(`Укажите слой ${layers.join(' или ')}`);
}

// Проверяем, предоставлено ли название слайса
if (!sliceName) {
  throw new Error('Укажите название слайса');
}

// Вызываем функцию createTemplate с переданными аргументами
createTemplate(layer, sliceName);
