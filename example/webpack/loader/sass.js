const pathConfig = require('../default-config');

module.exports = {
  loader: {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
      sassOptions: {
        includePaths: [pathConfig.resolve('node_modules/compass-mixins/lib')],
      },
    },
  },
};
