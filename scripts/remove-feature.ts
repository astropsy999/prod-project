// Импортируем необходимые модули и типы
import { JsxAttribute, Node, Project, SyntaxKind } from 'ts-morph';

// Получаем имя удаленной функциональности и состояние функциональности из аргументов командной строки
const removedFeatureName = process.argv[2]; // пример isArticleEnabled
const featureState = process.argv[3]; // пример off/on

// Определяем имена функции переключения и компонента переключения
const toggleFunctionName = 'toggleFeatures';
const toggleComponentName = 'ToggleFeatures';

// Проверяем, предоставлено ли имя удаленной функциональности
if (!removedFeatureName) {
  throw new Error('Пожалуйста, укажите имя флага функциональности');
}

// Проверяем, предоставлено ли состояние функциональности
if (!featureState) {
  throw new Error(
    'Пожалуйста, укажите состояние функциональности (on или off)',
  );
}

// Проверяем, является ли состояние функциональности допустимым (должно быть либо 'on', либо 'off')
if (featureState !== 'on' && featureState !== 'off') {
  throw new Error(
    'Недопустимое состояние функциональности (должно быть либо on, либо off)',
  );
}

// Создаем новый проект TypeScript
const project = new Project({});

// Добавляем исходные файлы в проект
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

// Получаем все исходные файлы в проекте
const files = project.getSourceFiles();

// Функция для проверки, представляет ли узел функцию переключения
function isToggleFunction(node: Node) {
  let isToggleFeatures = false;

  node.forEachChild((child) => {
    if (
      child.isKind(SyntaxKind.Identifier) &&
      child.getText() === toggleFunctionName
    ) {
      isToggleFeatures = true;
    }
  });

  return isToggleFeatures;
}

// Функция для проверки, представляет ли узел компонент переключения
function isToggleComponent(node: Node) {
  const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier);

  return identifier?.getText() === toggleComponentName;
}

// Функция для замены функции переключения
const replaceToggleFunction = (node: Node) => {
  const objectOptions = node.getFirstDescendantByKind(
    SyntaxKind.ObjectLiteralExpression,
  );

  if (!objectOptions) return;

  const offFunctionProperty = objectOptions.getProperty('off');
  const onFunctionProperty = objectOptions.getProperty('on');
  const featureNameProperty = objectOptions.getProperty('name');

  const onFunction = onFunctionProperty?.getFirstDescendantByKind(
    SyntaxKind.ArrowFunction,
  );
  const offFunction = offFunctionProperty?.getFirstDescendantByKind(
    SyntaxKind.ArrowFunction,
  );
  const featureName = featureNameProperty
    ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
    ?.getText()
    .slice(1, -1);

  if (featureName !== removedFeatureName) return;

  if (featureState === 'on') {
    node.replaceWithText(onFunction?.getBody().getText() ?? '');
  }

  if (featureState === 'off') {
    node.replaceWithText(offFunction?.getBody().getText() ?? '');
  }
};

// Функция для получения атрибута JSX по имени
const getAttributeNodeByName = (jsxAttributes: JsxAttribute[], name: string) =>
  jsxAttributes.find((node) => node.getName() === name);

// Функция для получения замененного значения компонента из атрибута JSX
const getReplacedComponent = (attribute?: JsxAttribute) => {
  const value = attribute
    ?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
    ?.getExpression()
    ?.getText();

  if (value?.startsWith('(')) {
    return value.slice(1, -1);
  }

  return value;
};

// Функция для замены компонента переключения
const replaceComponent = (node: Node) => {
  const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);

  const onAttribute = getAttributeNodeByName(attributes, 'on');
  const offAttribute = getAttributeNodeByName(attributes, 'off');
  const featureNameAttribute = getAttributeNodeByName(attributes, 'feature');
  const featureName = featureNameAttribute
    ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
    ?.getText()
    ?.slice(1, -1);

  if (featureName !== removedFeatureName) return;

  const offValue = getReplacedComponent(offAttribute);
  const onValue = getReplacedComponent(onAttribute);

  if (featureState === 'on' && onValue) {
    node.replaceWithText(onValue);
  }

  if (featureState === 'off' && offValue) {
    node.replaceWithText(offValue);
  }
};

// Обрабатываем каждый исходный файл в проекте
files.forEach((sourceFile) => {
  // eslint-disable-next-line consistent-return
  sourceFile.forEachDescendant((node) => {
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
      return replaceToggleFunction(node);
    }

    if (
      node.isKind(SyntaxKind.JsxSelfClosingElement) &&
      isToggleComponent(node)
    ) {
      return replaceComponent(node);
    }
  });
});

// Сохраняем измененный проект
project.save();
