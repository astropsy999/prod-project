import { Project, SyntaxKind, Node } from 'ts-morph';

// Get the removed feature name and feature state from command-line arguments
const removedFeatureName = process.argv[2]; // example isArticleRatingEnabled
const featureState = process.argv[3]; // on/off

// Validate command-line arguments
if (!removedFeatureName) {
  throw new Error('Specify the feature flag name!');
}
if (!featureState) {
  throw new Error('Specify the feature state (on or off)!');
}
if (featureState !== 'on' && featureState !== 'off') {
  throw new Error('Invalid feature state value (on or off)!');
}

// Create a new TypeScript project
const project = new Project({});

// Add source files to the project
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

// Get all source files from the project
const files = project.getSourceFiles();

// Function to check if a node represents a toggle function
function isToggleFunction(node: Node) {
  let isToggleFeatures = false;
  node.forEachChild((child) => {
    if (
      child.isKind(SyntaxKind.Identifier) &&
      child.getText() === 'toggleFeatures'
    ) {
      isToggleFeatures = true;
    }
  });

  return isToggleFeatures;
}

// Iterate over each source file
files.forEach((sourceFile) => {
  // Iterate over each node in the source file
  sourceFile.forEachDescendant((node) => {
    // Check if the node is a call expression and represents a toggle function
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
      // Get the object options from the call expression
      const objectOptions = node.getFirstDescendantByKind(
        SyntaxKind.ObjectLiteralExpression,
      );

      // Get the 'off' and 'on' function properties from the object options
      const offFunctionProperty = objectOptions?.getProperty('off');
      const onFunctionProperty = objectOptions?.getProperty('on');

      // Get the 'name' property from the object options
      const featureNameProperty = objectOptions?.getProperty('name');

      // Get the body of the 'on' and 'off' functions
      const onFunction = onFunctionProperty?.getFirstDescendantByKind(
        SyntaxKind.ArrowFunction,
      );
      const offFunction = offFunctionProperty?.getFirstDescendantByKind(
        SyntaxKind.ArrowFunction,
      );

      // Get the feature name
      const featureName = featureNameProperty
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getText()
        .slice(1, -1);

      // If the feature name is not the removed feature, skip to the next node
      if (featureName !== removedFeatureName) return;

      // Replace the node with the body of the 'on' or 'off' function based on the feature state
      if (featureState === 'on') {
        node.replaceWithText(onFunction?.getBody().getText() ?? '');
      }
      if (featureState === 'off') {
        node.replaceWithText(offFunction?.getBody().getText() ?? '');
      }
    }
  });
});

// Save the modified project
project.save();
