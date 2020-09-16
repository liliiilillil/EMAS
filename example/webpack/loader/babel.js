module.exports = {
  loader: {
    loader: 'babel-loader',
    // presets: ['module:metro-react-native-babel-preset'],
    options: {
      presets: [
        ['module:metro-react-native-babel-preset'],
        [
          '@babel/preset-env',
          {
            useBuiltIns: 'usage',
            corejs: '3.1.1',
            targets: {
              ie: '9',
              chrome: '58',
              browsers: ['ie >=9', 'android >= 4', 'ios >= 7', 'and_uc >= 10'],
            },
          },
        ],
        '@babel/react',
      ],
      sourceType: 'unambiguous',
      plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-export-default-from',
        ['import', { libraryName: 'antd-mobile', libraryDirectory: 'lib', style: true }, 'antd-mobile'],
        ['import', { libraryName: '@terminus/mall-utils', libraryDirectory: 'es', style: false }, '@terminus/mall-utils'],
        ['import', { libraryName: '@terminus/mall-base', libraryDirectory: 'es', style: false }, '@terminus/mall-base'],
      ],
    },
  },
  forDesign: {
    loader: 'babel-loader',
    options: {
      presets: [
        [
          '@babel/preset-env',
          {
            useBuiltIns: 'usage',
            corejs: '3.1.1',
            targets: {
              ie: '9',
              chrome: '58',
              browsers: ['ie >=9', 'android >= 4', 'ios >= 7', 'and_uc >= 10'],
            },
          },
        ],
        '@babel/react',
      ],
      sourceType: 'unambiguous',
      plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-export-default-from',
        ['import', { libraryName: 'antd', libraryDirectory: 'lib', style: true }, 'antd'],
        ['import', { libraryName: '@terminus/mall-utils', libraryDirectory: 'es', style: false }, '@terminus/mall-utils'],
        ['import', { libraryName: '@terminus/mall-base', libraryDirectory: 'es', style: false }, '@terminus/mall-base'],
      ],
    },
  },
};
