import React, { Component } from 'react'
import { Text } from 'react-native'

const ICON_SIZE = {
  xxs: 15, xs: 18, sm: 21, md: 22, lg: 36,
}
export class IconFont extends Component {
  constructor(props) {
    super(props)
    this.icons = {}
  }

  reloadResource(NewIcons) {
    this.icons = NewIcons
  }

  render() {
    const { type, color, size, style } = this.props
    return (
      <Text
        style={{
          color: color || '#666',
          fontSize: ICON_SIZE[size] || size || 22,
          fontWeight: 'normal',
          fontStyle: 'normal',
          fontFamily: 'iconfont',
          alignItems: 'center',
          ...style,
        }}
      >
        {this.icons[type]}
      </Text>
    )
  }
}
