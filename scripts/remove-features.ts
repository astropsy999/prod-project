import { JsxAttribute, Node, Project, SyntaxKind } from 'ts-morph';

// Get removed feature name and feature state from command line arguments
const removedFeatureName = process.argv[2]; // example isArticleEnabled
const featureState = process.argv[3]; // example off/on

// Define toggle function and toggle component names
const toggleFunctionName = 'toggleFeatures';
const toggleComponentName = 'ToggleFeatures';

// Check if removed feature name is provided
if (!removedFeatureName) {
  throw new Error('Please specify the name of the feature flag');
}

// Check if feature state is provided
if (!featureState) {
  throw new Error('Please specify the feature state (on or off)');
}

// Check if feature state is valid (either 'on' or 'off')
if (featureState !== 'on' && featureState !== 'off') {
  throw new Error('Invalid feature state (should be either on or off)');
}

// Create a new TypeScript project
const project = new Project({});

// Add source files to the project
project.addSourceFilesAtPaths('src/**/ArticleDetailsPage.ts');
project.addSourceFilesAtPaths('src/**/ArticleDetailsPage.tsx');

// Get all source files in the project
const files = project.getSourceFiles();

// Function to check if a node represents the toggle function
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

// Function to check if a node represents the toggle component
function isToggleComponent(node: Node) {
  const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier);

  return identifier?.getText() === toggleComponentName;
}

// Function to replace the toggle function
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

// Function to get the JSX attribute node by name
const getAttributeNodeByName = (
  jsxAttributes: JsxAttribute[],
  name: string,
) => {
  return jsxAttributes.find((node) => node.getName() === name);
};

// Function to get the replaced component value from JSX attribute
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

// Function to replace the toggle component
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

// Process each source file in the project
files.forEach((sourceFile) => {
  sourceFile.forEachDescendant((node) => {
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
      replaceToggleFunction(node);
    }

    if (
      node.isKind(SyntaxKind.JsxSelfClosingElement) &&
      isToggleComponent(node)
    ) {
      replaceComponent(node);
    }
  });
});

// Save the modified project
project.save();
