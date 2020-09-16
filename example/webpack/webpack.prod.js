const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin;
// const CleanWebpackPlugin = require('clean-webpack-plugin');

const pathConfig = require('./default-config');
const webpackCommon = require('./webpack.common');

module.exports = merge(webpackCommon, {
  entry: {
    app: pathConfig.entryPath,
  },
  mode: 'production',
  optimization: {
    minimize: true,
    nodeEnv: 'production',
    splitChunks: {
      name: 'vender',
      chunks: 'all',
      minChunks: 1, // 至少被引用两次才分割
      minSize: 30000,
      maxSize: 10000000,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '-',
      cacheGroups: {
        vendors: {
          priority: 0,
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|react-loadable|react-redux|redux|isomorphic-fetch|moment)[\\/]/,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    // https://www.jianshu.com/p/462bb9d1c982
    // loadable 插件
    // new ReactLoadablePlugin({
    //   filename: pathConfig.resolve('lib/react-loadable-chunk-map.json'),
    // }),
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      title: '在线商城',
      filename: pathConfig.resolve('public/index.html'),
      template: pathConfig.resolve('src/views/index.ejs'),
    }),
    new HtmlWebpackPlugin({
      inject: false,
      title: '在线商城',
      filename: pathConfig.resolve('lib/templates/index.hbs'),
      template: pathConfig.resolve('src/views/server_index.hbs'),
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true,
    }),
  ],
});
