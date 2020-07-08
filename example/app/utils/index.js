import { cookieDomains, networkDomain } from 'envs'
import { Platform } from 'react-native'
import { getUrl } from 'react-native-navigators-tools'

export * from 'react-native-web-utils'
// export * from 'app/pages/common/components/share-utils'
export * from 'react-native-navigators-tools'

export const getUrlForUrlJump = getUrl(cookieDomains[global.env || 'production'], Platform.OS === 'web' ? window.location.origin : networkDomain[global.env || 'production'])
export const channel = 2 //  1-pc, 2-手机
export const pageSize = 10 // 默认分页条数
export const maxCartCount = 200 // 最大可加入购物车数量
export const noCdn = false // 是否需要CDN
export const passwordRule = /^[\s\S]{6,16}$/
// 用于标识是不是homeNavigators
export const routes = {
  index: 'Index',
  buyer: 'Me',
  indexCart: 'IndexCart',
  category: 'Category',
  Index: 'index',
  Me: 'buyer',
  IndexCart: 'indexCart',
  Category: 'category',
}
export const version = {
  ios: '0.0.1',
  android: '0.0.1',
}
export const addressDeep = 4 // 地址层级, [省，市，区，街道]
export const adShow = true // 是否有广告页
export const guideShow = true // 是否有引导页
export const defaultDivisionIds = '110000,110100,110105'
export const defaultDivisionNames = '北京,北京市,朝阳区'
export const priceUnit = '元'
export const virtualCoinUnit = '虚拟币'
export const appScheme = '' // 唤起appScheme
export const defaultCartType = 'cart.default'
