/* eslint-disable @typescript-eslint/no-var-requires */
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin;

const pathConfig = require('./default-config');
const webpackCommon = require('./webpack.common');

module.exports = merge(webpackCommon, {
  entry: {
    app: pathConfig.entryPath,
  },
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    // https://www.jianshu.com/p/462bb9d1c982
    // loadable 插件
    // new ReactLoadablePlugin({
    //   filename: pathConfig.resolve('lib/react-loadable-chunk-map.json'),
    // }),
    new HtmlWebpackPlugin({
      chunks: ['app'],
      title: '在线商城',
      filename: pathConfig.resolve('public/index.html'),
      template: pathConfig.resolve('src/views/index.ejs'),
    }),
    new HtmlWebpackPlugin({
      chunks: ['app'],
      inject: false,
      title: '在线商城',
      filename: pathConfig.resolve('lib/templates/index.hbs'),
      template: pathConfig.resolve('src/views/server_index.hbs'),
    }),
  ],
});
