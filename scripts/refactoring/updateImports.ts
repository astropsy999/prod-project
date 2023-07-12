import { Project } from 'ts-morph';

// Создаем новый проект
const project = new Project({});

// Добавляем исходные файлы по пути 'src/**/*.ts'
project.addSourceFilesAtPaths('src/**/*.ts');
// Добавляем исходные файлы по пути 'src/**/*.tsx'
project.addSourceFilesAtPaths('src/**/*.tsx');

// Получаем список файлов проекта
const files = project.getSourceFiles();

// Функция для проверки абсолютного пути
function isAbsolutePaths(value: string) {
  // Список слоев пути
  const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages'];
  // Проверяем, начинается ли значение с одного из слоев
  return layers.some((layer) => value.startsWith(layer));
}

// Обходим каждый файл проекта
files.forEach((sourceFile) => {
  // Получаем все объявления импортов в файле
  const importDeclarations = sourceFile.getImportDeclarations();

  // Обходим каждое объявление импорта
  importDeclarations.forEach((importDeclaration) => {
    // Получаем значение модуля импорта
    const value = importDeclaration.getModuleSpecifierValue();

    // Проверяем, является ли путь абсолютным
    if (isAbsolutePaths(value)) {
      // Заменяем значение модуля на "@/{значение}"
      importDeclaration.setModuleSpecifier(`@/${value}`);
    }
  });
});

// Сохраняем изменения в проекте
project.save();
