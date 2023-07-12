import { Project } from 'ts-morph';
import path from 'path';

// Создаем новый проект
const project = new Project({});

// Добавляем исходные файлы в проект
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

// Получаем список файлов проекта
const files = project.getSourceFiles();

// Устанавливаем путь к директории "shared/ui"
const uiPath = path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui');

// Получаем директорию "shared/ui"
const getSharedUiDir = project.getDirectory(uiPath);

// Получаем список директорий в "shared/ui"
const componentsDirs = getSharedUiDir?.getDirectories();

// Функция для проверки абсолютного пути
function isAbsolutePaths(value: string) {
  const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages'];
  return layers.some((layer) => value.startsWith(layer));
}

// Обходим каждый файл проекта
files.forEach((sourceFile) => {
  // Получаем все импорты в файле
  const importDeclarations = sourceFile.getImportDeclarations();

  // Обходим каждый импорт
  importDeclarations.forEach((importDeclaration) => {
    // Получаем значение модуля импорта
    const value = importDeclaration.getModuleSpecifierValue();

    // Удаляем префикс "@/"
    const valueWithoutAlias = value.replace('@/', '');

    // Разделяем значение модуля по разделителям "/"
    const segments = valueWithoutAlias.split('/');

    // Проверяем, является ли первый сегмент "shared"
    const isSharedLayer = segments?.[0] === 'shared';

    // Проверяем, является ли второй сегмент "ui"
    const isUiSlice = segments?.[1] === 'ui';

    // Если путь является абсолютным, относится к "shared/ui",
    // то заменяем его на "@/{первый сегмент}/{второй сегмент}"
    if (isAbsolutePaths(valueWithoutAlias) && isSharedLayer && isUiSlice) {
      const result = valueWithoutAlias.split('/').slice(0, 3).join('/');
      importDeclaration.setModuleSpecifier(`@/${result}`);
    }
  });
});

// Обходим каждую директорию в "shared/ui"
componentsDirs?.forEach((dir) => {
  // Создаем путь к файлу index.ts в текущей директории
  const indexFilePath = `${dir.getPath()}/index.ts`;

  // Получаем исходный файл index.ts, если он существует
  const indexFile = dir.getSourceFile(indexFilePath);

  // Если index.ts не существует, создаем его
  if (!indexFile) {
    // Генерируем исходный код для index.ts
    const sourceCode = `export * from './${dir.getBaseName()}';`;

    // Создаем исходный файл index.ts
    const file = dir.createSourceFile(indexFilePath, sourceCode, {
      overwrite: true,
    });

    // Сохраняем файл
    file.save();
  }
});

// Сохраняем проект
project.save();
