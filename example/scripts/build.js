/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const webpack = require('webpack');
const execSync = require('child_process').execSync;
const helper = require('./helper');

const prodConfig = require('../webpack/webpack.prod');
const prodLayoutConfig = require('../webpack/webpack.prod.design.layout');
const designConfig = require('../webpack/webpack.design');

const queue = [
  { compile: webpack(designConfig), name: '1/3 prod design' },
  { compile: webpack(prodConfig), name: '2/3 prod' },
  { compile: webpack(prodLayoutConfig), name: '3/3 prod layout' },
];


function build() {
  if (!queue.length) {
    console.log('打包完成');
    return;
  }
  const { compile, name } = queue.shift();
  console.log(`${name}打包`);
  compile.run((err, stats) => {
    console.log(`============  webpack build ${name} complete ============`);
    console.log(`build ${name} 耗时：${stats.endTime - stats.startTime}ms`);
    helper.packLog(err, stats);
    if (err) {
      process.exit(1);
    }
    build();
  });
}

function printBpVer() {
  console.log('-----------------------------------');
  console.log(`Current node version: ${execSync('node -v')}`);
  console.log(`Current npm  version: v${execSync('npm -v')}`);
  console.log('-----------------------------------');
}

printBpVer();
build();
