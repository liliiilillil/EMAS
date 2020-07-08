import ReactNative from 'react-native'
import { defaultPropsWithScope } from 'props-overrider'

const { Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } = ReactNative

ReactNative.DeviceInfo = {
  isIPhoneX_deprecated: false,
}


// 替换 Touchable 的默认 move 和 release 行为，一旦滑动就在 release 时触发 TERMINATED 而不触发 onPress
function touchableComponentWillMount() {
  this.moved = false

  const oldMove = this.touchableHandleResponderMove
  this.touchableHandleResponderMove = (...args) => {
    this.moved = true
    oldMove(...args)
  }
  const oldRelease = this.touchableHandleResponderRelease
  this.touchableHandleResponderRelease = (...args) => {
    if (this.moved) {
      this._receiveSignal('RESPONDER_TERMINATED')
      this.moved = false
      return
    }
    oldRelease(...args)
  }
}
TouchableHighlight.prototype.componentWillMount = touchableComponentWillMount
TouchableOpacity.prototype.componentWillMount = touchableComponentWillMount
TouchableWithoutFeedback.prototype.componentWillMount = touchableComponentWillMount

// 为了保持 react-native-web Text 组件从 0.0.113 -> 0.0.130 的升级后特性不变所做的兼容
defaultPropsWithScope(Text, {
  style() {
    return [
      {
        fontFamily: 'inherit',
        fontSize: 'inherit',
        boxSizing: 'inherit',
        whiteSpace: 'pre-wrap',
      },
      this.props.style,
    ]
  },
})
