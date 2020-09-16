
const autoprefixer = require('autoprefixer');
const flexibility = require('postcss-flexibility');

module.exports = {
  loader: {
    loader: 'postcss-loader',
    options: {
      plugins: [autoprefixer(), flexibility()],
    },
  },
};
