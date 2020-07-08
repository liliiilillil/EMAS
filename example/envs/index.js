const cookieDomain = ['terminus.io'] // 用于确认为内部链接域名
const cookieDomains = {
  dev: 'terminus.io',
  test: 'terminus.io',
  prepub: 'terminus.io',
  production: 'terminus.io',
}
const schemes = {
  dev: 'https',
  test: 'https',
  prepub: 'https',
  production: 'https',
}
const domain = {
  dev: 'm-dev.app.terminus.io',
  test: 'm-test.app.terminus.io',
  prepub: 'm-test.app.terminus.io',
  production: 'm-test.app.terminus.io',
}
module.exports = {
  cookieDomain,
  cookieDomains,
  networkDomain: domain,
  schemes,
}
