import { Platform } from 'react-native'

const navigator = typeof window !== 'undefined' ? window.navigator : { userAgent: '' }

export const isWeb = Platform.OS === 'web'

export const isIOS = Platform.OS === 'ios'

export const isAndroid = Platform.OS === 'android'

export const isAndroidWeb = /Android|Adr/.test(navigator.userAgent);

export const isWechat = /MicroMessenger/i.test(navigator.userAgent)

export const isAndroidWechat = /MicroMessenger/i.test(navigator.userAgent) && isAndroidWeb

export const isIosWechat = /MicroMessenger/i.test(navigator.userAgent) && /iP(ad|od|hone)/i.test(navigator.userAgent)

export const notTerminusWeb = isWeb && !(/terminus/i.test(navigator.userAgent))

export const isIosWeb = isWeb && /iP(ad|od|hone)/i.test(navigator.userAgent)

export const isSafariMobile = /iP(ad|od|hone)/i.test(navigator.userAgent)
  && /WebKit/i.test(navigator.userAgent)
  && !(/(CriOS|FxiOS|OPiOS|mercury)/i.test(navigator.userAgent))

export const getChannel = () => {
  if (isWechat) {
    return 'WECHAT'
  }
  if (isAndroid) {
    return 'ANDROID'
  }
  if (isIOS) {
    return 'IOS'
  }
  return 'H5'
}
