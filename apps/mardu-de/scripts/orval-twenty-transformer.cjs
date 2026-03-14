function renameNumericComponentKeys(openApiDocument, section) {
  const collection = openApiDocument?.components?.[section];
  if (!collection || typeof collection !== 'object') {
    return {};
  }

  const renameMap = {};
  const nextCollection = {};

  for (const [key, value] of Object.entries(collection)) {
    if (/^\d/.test(key)) {
      const nextKey = `Http${key}`;
      renameMap[`#/components/${section}/${key}`] = `#/components/${section}/${nextKey}`;
      nextCollection[nextKey] = value;
      continue;
    }

    nextCollection[key] = value;
  }

  openApiDocument.components[section] = nextCollection;
  return renameMap;
}

function rewriteRefs(node, renameMap) {
  if (!node || typeof node !== 'object') {
    return;
  }

  if (Array.isArray(node)) {
    for (const item of node) {
      rewriteRefs(item, renameMap);
    }
    return;
  }

  if (typeof node.$ref === 'string') {
    for (const [from, to] of Object.entries(renameMap)) {
      if (node.$ref === from) {
        node.$ref = to;
      }
    }
  }

  for (const value of Object.values(node)) {
    rewriteRefs(value, renameMap);
  }
}

module.exports = (openApiDocument) => {
  const componentSections = [
    'schemas',
    'responses',
    'parameters',
    'examples',
    'requestBodies',
    'headers',
    'securitySchemes',
    'links',
    'callbacks',
    'pathItems',
  ];

  const renameMap = componentSections.reduce((acc, section) => {
    const partialMap = renameNumericComponentKeys(openApiDocument, section);
    return { ...acc, ...partialMap };
  }, {});

  if (Object.keys(renameMap).length > 0) {
    rewriteRefs(openApiDocument, renameMap);
  }

  return openApiDocument;
};
