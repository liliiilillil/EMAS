/* eslint-disable */
const indexFile = require('./middleware/index-file');

module.exports = async ({ router, options, useMiddleware: addMiddleware, useBeforeMiddleware }) => {
  useBeforeMiddleware(await indexFile({ options }));
};
