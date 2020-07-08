import { Text } from 'react-native'


// 防止系统重置 Text 组件的字体大小
const customProps = { allowFontScaling: false }
const textRender = Text.render
Text.render = function render(props, forwardedRef) {
  const oldProps = props
  const newProps = { ...props, ...customProps }
  try {
    return textRender.call(this, newProps, forwardedRef)
  } finally {
    textRender.call(this, oldProps, forwardedRef)
  }
}
