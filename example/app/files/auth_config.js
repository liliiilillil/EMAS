const paranaAuthConfig = require('@terminus/rn-b2b2c/app/files/auth_config')

module.exports = {
  enable: true,
  strict: false,
  service: 'getRolesByUserId',
  loginRedirect: '/login',
  roles: {
    BUYER: {
      requests: [],
    },
    GLOBAL: {
      requests: [...paranaAuthConfig.roles.GLOBAL.requests],
    },
    LOGIN: {
      requests: [...paranaAuthConfig.roles.LOGIN.requests],
    },
    SELLER: {
      requests: [...paranaAuthConfig.roles.SELLER.requests],
      resources: ['manage_site_shop_design'],
    },
    ADMIN: {
      requests: ['GET: /system/.*'],
      resources: [
        'manage_site_design',
        'manage_site_shop_templet',
        'manage_site_article',
      ],
    },
  },
  trees: {
    OPERATOR: {
      sitemanager: {
        name: '站点管理',
        children: {
          site_design: {
            name: '站点装修管理',
            resources: ['manage_site_design'],
          },
          site_shop_templet: {
            name: '店铺模版管理',
            resources: ['manage_site_shop_templet'],
          },
          site_article: {
            name: '文章管理',
            resources: ['manage_site_article'],
          },
          site_shop_design: {
            name: '店铺装修管理',
            resources: ['manage_site_shop_design'],
          },
        },
      },
    },
  },
  resources: {
    // 装修系统
    manage_site_design: {
      requests: [
        'GET: /system/sites(|/styles/.*|/scripts/.*|/fonts/.*|/images/.*)',
        'ALL: /api/design/.*',
        'ALL: /api/images/.*',
        'ALL: /design/.*',
      ],
    },
    manage_site_shop_templet: {
      requests: [
        'GET: /system/sites(|/styles/.*|/scripts/.*|/fonts/.*|/images/.*)',
        'ALL: /api/design/.*',
        'ALL: /api/images/.*',
        'ALL: /design/.*',
      ],
    },
    manage_site_article: {
      requests: [
        'GET: /system/sites(|/styles/.*|/scripts/.*|/fonts/.*|/images/.*)',
        'ALL: /api/design/.*',
        'ALL: /api/images/.*',
        'ALL: /design/.*',
      ],
    },
    manage_site_shop_design: {
      requests: [
        'GET: /system/sites(|/styles/.*|/scripts/.*|/fonts/.*|/images/.*)',
        'ALL: /api/design/.*',
        'ALL: /api/images/.*',
        'ALL: /design/.*',
      ],
    },
  },
}
