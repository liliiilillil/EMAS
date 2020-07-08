import React from 'react'
import { Text, View } from 'react-native'
import { Header, Button } from 'rn-components'

export default class extends React.Component {
  static navigationOptions = {
    headerTitle: '样例',
    header: headerProps => <Header {...headerProps} />,
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>example</Text>
        <View style={{ width: 200, marginTop: 20 }}>
          <Button type='primary' onClick={() => this.props.navigation.goBack()}>返回首页</Button>
        </View>
      </View>
    )
  }
}