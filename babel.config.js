module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'module:metro-react-native-babel-preset'
    ],
    plugins: [
      'react-native-reanimated/plugin',
      '@babel/plugin-transform-private-methods',
      '@babel/plugin-transform-numeric-separator',
      '@babel/plugin-transform-class-properties',
      '@babel/plugin-transform-async-generator-functions',
      '@babel/plugin-transform-export-namespace-from',
      '@babel/plugin-transform-json-strings',
      '@babel/plugin-transform-unicode-property-regex',
      '@babel/plugin-transform-logical-assignment-operators',
      '@babel/plugin-transform-dynamic-import'
    ],
  };
};


