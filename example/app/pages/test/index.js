import React from 'react'
import { Text, View } from 'react-native'
import { Svg, Button, SegmentedControl } from 'rn-components'
import { ShareIcon } from '@terminus/react-native-social'
import styleScss from '../design/index/style.scss'

const params = {
  title: '端点网络科技',
  content: '测试分享内容',
  url: 'https://item.xhsd.com/items/110000100309487',
  // image: 'https://img1.xinhuashudian.com/images/2018/07/21/5787d6ac-4e5a-4741-935e-af74953779a7.png',
  image: 'http://img1.xinhuashudian.com/images/2019/04/22/707753e0-4276-4826-9cf6-11d550dcedc0.jpg?x-oss-process=image/resize,h_200,w_200',
}

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      result: '',
    }
  }

  static navigationOptions = {
    title: '分类1234567',
    tabBarIcon: ({ tintColor }) => {
      return <Svg type='shouye' size='md' color={tintColor || 'white'} />
    },
  }

  render() {
    return (
      <View className={styleScss.indexWrap}>
        <Text>now COUNT: {this.props.count}</Text>
        <View className={styleScss.inner}>
          <Button type='primary' onClick={() => this.props.addCount((this.props.count + 1))}>+1</Button>
        </View>
        <View className={styleScss.inner}>
          <SegmentedControl style={{ width: '100%' }} values={['test1', 'test2']} />
        </View>
        <View className={styleScss.inner}>
          <ShareIcon
            label='分享'
            shareInfo={params}
            size={12}
            handleShareResult={(data) => {
              // const { success = false, errStr = '' } = data || {}
              // const info = success === true ? '分享成功' : `${errStr}`
              // Toast.info(info)
              console.log('=============')
              console.log(data)
              this.setState({
                result: `${data.channel} ${data.errStr}`,
              })
          }}
          />
        </View>
        <View className={styleScss.inner}>
          <Text>{this.state.result}</Text>
        </View>
      </View>
    )
  }
}
