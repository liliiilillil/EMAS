const send = require('koa-send');
const isIgnorePath = require('./utils/is-ignore-path');

module.exports = async function({ options }) {
  const { root } = options;

  return async function(ctx, next) {
    const { path: requestPath, method } = ctx;
    if (method !== 'GET') {
      await next();
      return;
    }

    if (requestPath.startsWith('/favicon.ico')) {
      await send(ctx, 'public/assets/images/favicon.ico', { root });
      return;
    }

    if (isIgnorePath(requestPath)) {
      await next();
      return;
    }

    await send(ctx, 'public/index.html', { root });
  };
};
