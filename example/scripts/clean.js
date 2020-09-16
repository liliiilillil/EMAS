const del = require('del');
const defaultConfig = require('../webpack/default-config');

console.log('清理文件： lib/**, public/**');
del.sync([defaultConfig.resolve('public/**'), defaultConfig.resolve('lib/**')]);
