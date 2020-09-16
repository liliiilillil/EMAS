
const pathConfig = require('../default-config');

module.exports = {
  loader: {
    loader: 'less-loader',
    options: {
      javascriptEnabled: true,
      modifyVars: pathConfig.themes,
    },
  },
};
