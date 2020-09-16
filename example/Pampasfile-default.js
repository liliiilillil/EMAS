/* eslint-disable */
const _ = require('lodash');

const options = {
  port: 8081,
  webBackendUrl: 'https://portal-web-test.app.terminus.io',
  services: require('./server/config/service'),
  serviceConfig: (services, webBackendUrl, selfUrl) => {
    _.each(services, service => {
      const { url, type = 'http' } = service;
      if (type.toLowerCase() === 'http') {
        service.type = 'http';
        service.url = `${url.startsWith('/api/herd') ? selfUrl : webBackendUrl}${url}`;
      }
    });
    return services;
  },
};

module.exports = opts => {
  _.defaultsDeep(opts, options);
  const selfUrl = opts.selfUrl || `http://127.0.0.1:${opts.port}`;
  return {
    port: opts.port,
    selfUrl,
    root: __dirname,
    auth: { enable: false },
    statics: 'public/assets',
    extension: './server/index',
    static: {
      prefix: '/assets',
      root: 'public/assets',
      maxage: 1000 * 60 * 60,
    },
    csrf: {
      enable: false,
    },
    redis: {
      port: process.env.REDIS_PORT || 6379,
      host: process.env.REDIS_HOST || '127.0.0.1',
      password: process.env.REDIS_PASSWORD || 'anywhere',
      db: process.env.HERD_REDIS_DB_INDEX || process.env.REDIS_DB_INDEX || 1,
    },
    // Session for designer only
    session: { user: { enable: false } },
    designer: {
      enable: false,
      siteManageUrl: '/system/sites',
      mysql: {
        // 如果不使用装修，那么 mysql 是不需要配的
        host: process.env.MYSQL_HOST || '127.0.0.1',
        port: process.env.MYSQL_PORT || 3306, // default 3306
        database: process.env.MYSQL_DATABASE || 'eevee_h5',
        username: process.env.MYSQL_USERNAME || 'root',
        password: process.env.MYSQL_PASSWORD || '123456789',
        pool: {
          // connection pool
          min: 0,
          max: 10, // max connections
          idle: 10000, // idle time(ms),that a connection can be idle before being released
        },
      },
      // 相对于项目的目录路径
      components: require('./src/design/design.json'),
      layouts: {
        pc: {
          app: 'mobile',
          root: '/', // views root
          pageLayout: 'inner.html', // 页面默认 layout
          designLayout: 'index.html', // 装修主页面
          name: 'h5模版',
        },
      },
    },
    proxy: {
      enable: true, // default is false
      router: [
        // an array, required if enable set to true and not have match,to. whole path will route when first matched in array.
        {
          match: '/api/(?!herd).*', // a regex string, required if enable set to true. whole path matched
          to: opts.webBackendUrl, // required too
        },
      ],
    },
    errorHandle: {
      codeViews: {
        500: 'redirect:/busy',
        403: 'redirect:/no-permission',
        404: 'redirect:/404',
      },
    },
    // Services
    services: opts.serviceConfig(opts.services, opts.webBackendUrl, selfUrl),
    invokers: {
      timeout: 10000, // 默认值为 1000 ms
      unwrap: res => {
        if (res.success && res.data != null) {
          return res.data;
        }
        return res;
      }, // 默认为 true ，也可以为一个 function 去支持自定义的 unwrapResponse
    },
  };
};
