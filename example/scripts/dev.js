/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * 仅允许打包程序
 * design 仅打包不 watch
 * 监听 dev config.
 * 用于 herd dev 模式
 */

const webpack = require('webpack');

const helper = require('./helper');

const webpackDevConfig = require('../webpack/webpack.dev');

const configs = [webpackDevConfig];
let name = '开发';

const devCompiler = webpack(configs);
helper.logging(devCompiler, name);

devCompiler.watch({ aggregateTimeout: 1000 }, (err, stats) => {
  helper.packLog(err, stats);
});
