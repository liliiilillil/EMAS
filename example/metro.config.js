/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

// module.exports = {
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: false,
//       },
//     }),
//   },
//   sourceExts: ['.scss', '.native', '.ios.js', '.native.js', '.js', '.ios.json', '.native.json', '.json', '.ios.ts', '.native.ts', '.ts', '.ios.tsx', '.native.tsx', '.tsx'],
// }

const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const { resolver: { resolverMainFields } } = await getDefaultConfig();
  return {
    // transformer: {
    //   babelTransformerPath: require.resolve('react-native-sass-transformer'),
    //   getTransformOptions: async () => ({
    //     transform: {
    //       experimentalImportSupport: false,
    //       inlineRequires: false,
    //     },
    //   }),
    // },

    resolver: {
      resolverMainFields: ['native', ...resolverMainFields],
      sourceExts: ['native.js', 'js', 'native.jsx', 'cjs', 'jsx', 'js', 'native.json', 'native.ts', 'native.tsx', 'ts', 'tsx'],
    },
  };
})();
