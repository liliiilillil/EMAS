/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const lessThemes = require('../src/styles/default-themes')

const env = process.env;

const cdnPath = env.CDN_PATH;

// 项目根目录
const basePath = path.join(__dirname, '../');

// 获取文件绝对路径
function resolve(...pathNames) {
  const paths = [basePath, ...pathNames];
  return path.resolve(...paths);
}

const entryPath = resolve('index.js');
const outputPath = resolve('public');
const config = {
  resolve,
  basePath,
  entryPath,
  outputPath,
  themes: lessThemes.themeForWeb,
  publicPath: cdnPath ? (cdnPath === '/' ? '/' : `${cdnPath}/`) : '/',
  htmlTemplate: resolve('src/index.html'),
  resolveModules: [
    resolve('src/components'),
    resolve('src'),
    'node_modules/@terminus',
    'node_modules',
    './node_modules',
  ],
  resolveAlias: {
    'react-native': '@terminus/react-native-web',
    color: 'styles/default.less',
    '@react-native-community/async-storage-backend': '@react-native-community/async-storage-backend-web',
    'react-native-linear-gradient': 'react-native-web-linear-gradient',
    // 临时映射
    '@ant-design/react-native': 'antd-mobile',
  },
  extensions: [
    '.web.js',
    '.web.mjs',
    '.web.json',
    '.web.jsx',
    '.web.ts',
    '.web.tsx',
    '.js',
    '.mjs',
    '.json',
    '.jsx',
    '.ts',
    '.tsx',
    '.ios.js',
    '.scss',
    '.less',
  ],
  EnvironmentPlugin() {
    return new webpack.EnvironmentPlugin({
      PACK_ENV: process.env.PACK_ENV || process.env.NODE_ENV || 'production',
    });
  },
  ProgressPlugin() {
    return new webpack.ProgressPlugin();
  },
  ssrEntryPath: resolve('src/ssr/index.tsx'),
  ssrOutputPath: resolve('lib/app'),
  babelIncludes: [
    resolve('index.js'),
    resolve('src'),
    resolve('routers'),
    resolve('configs'),
    resolve('node_modules/@terminus'),
    resolve('node_modules/react-native-reanimated'),
    resolve('node_modules/react-native-collapsible'),
    resolve('node_modules/react-native-gesture-handler'),
    resolve('node_modules/@bang88/react-native-ultimate-listview'),
    resolve('node_modules/@react-navigation'),
    resolve('node_modules/react-native-modal-popover'),
    resolve('node_modules/react-native-screens'),
  ],
};

module.exports = config;
