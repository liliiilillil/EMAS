
const path = require('path')
const scheduler = require('scheduler')
const _ = require('lodash')
const reactIs = require('react-is')

module.exports = (config) => {
  const ret = Object.assign({}, config, {
    output: './dist',
    entry: './src/mp_app.tsx',
    maxXmlDepth: 10,
    extraComponents: [
      /@terminus\/octopus-adapter-wx/,
      /@terminus\/octopus-adapter-alipay/,
      /@terminus\/octopus-adapter-dingding/,
    ],
    alias: [
      {
        find: 'react-native',
        replacement: '@terminus/react-native-octopus',
      },
      {
        find: '@terminus/react-navigation',
        replacement: path.resolve(__dirname, 'node_modules/@terminus/react-navigation/src/react-navigation.mp.js'),
      },
      {
        find: 'rn-components',
        replacement: '@terminus/nusi-mobile',
      },
      {
        find: 'themes',
        replacement: path.resolve(__dirname, './lib/demo_mp/themes'),
      },
    ],
    resolve: {
      dedupe: [
        '@terminus/octopus-core',
        '@terminus/octopus-shared',
        'lodash',
      ],
    },
    commonjs: {
      namedExports: {
        scheduler: Object.keys(scheduler),
        lodash: Object.keys(_),
        'react-is': Object.keys(reactIs),
      },
    },
    tsImportPluginOpts: [
      ...config.tsImportPluginOpts,
      {
        style: false,
        libraryName: '@terminus/nusi-mobile',
        libraryDirectory: 'lib',
        camel2DashComponentName: true,
      },
      {
        style: false,
        libraryName: '@ant-design/react-native',
        libraryDirectory: 'lib',
        camel2DashComponentName: true,
      },
      {
        style: false,
        libraryName: '@terminus/mall-utils',
        libraryDirectory: 'es',
        camel2DashComponentName: false,
      },
    ],
    watcherOpts: {
      include: [
        'src/**',
        'node_modules/**',
      ],
    },
  })

  return ret
}