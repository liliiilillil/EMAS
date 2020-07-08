import React from 'react'
import { Text, View } from 'react-native'
import { Svg, Button } from 'rn-components'
import styleScss from './style.scss'

export default class extends React.Component {
  static navigationOptions = {
    title: '首页',
    tabBarIcon: ({ tintColor }) => {
      return <Svg type='shouye' size='md' color={tintColor || 'white'} />
    },
  }

  render() {
    return (
      <View className={styleScss.indexWrap}>
        <Text>hello world! count: {this.props.count}</Text>
        <View className={styleScss.inner}>
          <Button type='primary' onClick={() => this.props.navigation.navigate('Test')}>跳转</Button>
        </View>

      </View>
    )
  }
}
