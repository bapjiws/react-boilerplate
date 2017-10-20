// On require.context, see https://webpack.js.org/guides/dependency-management/#require-context
export const importAllAsArray = r => r.keys().map(r);

export const importAllAsObject = r => {
  const imports = {};
  r.keys().forEach(key => {
    imports[key.replace('./', '')] = r(key);
  });
  return imports;
};
