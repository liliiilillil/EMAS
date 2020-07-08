import React from 'react'
import { Text, View } from 'react-native'
import { Svg, Button } from 'rn-components'
import styleScss from '../index/style.scss'

export default class extends React.Component {
  static navigationOptions = {
    title: '分类',
    tabBarIcon: ({ tintColor }) => {
      return <Svg type='shouye' size='md' color={tintColor || 'white'} />
    },
  }

  render() {
    return (
      <View className={styleScss.indexWrap}>
        <Text>hello world</Text>
        <View className={styleScss.inner}>
          <Button type='primary' onClick={() => this.props.navigation.goBack()}>返回首页</Button>
        </View>
      </View>
    )
  }
}
