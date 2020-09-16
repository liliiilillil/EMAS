export const environments = [
  {
    id: 'development',
    name: '开发环境',
  },
  {
    id: 'test',
    name: '测试环境',
  },
  {
    id: 'staging',
    name: '预发环境',
  },
  {
    id: 'production',
    name: '生产环境',
    default: true,
  },
];

export const envConfigsMap = {
  development: {
    domain: 'terminus.io',
    url: 'https://portal-web-dev.app.terminus.io',
  },
  test: {
    domain: 'terminus.io',
    url: 'https://portal-web-test.app.terminus.io',
  },
  staging: {
    domain: 'terminus.io',
    url: 'https://portal-web-test.app.terminus.io',
  },
  production: {
    url: 'https://portal-web-test.app.terminus.io',
    domain: 'terminus.io',
  },
};
