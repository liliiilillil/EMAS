import React from 'react';
import { Text, View } from 'react-native';

export default class TextDemo extends React.Component {
  render() {
    return (
     <View>
        <Text>常规使用</Text>
        <Text>Text组件只能嵌套Text，无法嵌套其他组件</Text>
        <Text style={{ color: 'blue' }}>
          常规使用Text
        </Text>
        <Text>numberOfLines属性</Text>
        <View>
          <Text numberOfLines={3}>端点科技创立于2012年8月，总部位于杭州，在青岛、南京设有分公司。端点科技，定位为新商业软件提供商，为企业创造价值、为伙伴提供支撑、为行业带来改变。 端点科技通过以企业中台为核心，以零售、采供两大产品线为抓手的发展战略，实现软件研发能力的沉淀、复用、量化管理，并将其面向生态开放，实现软件行业全领域的协同和共创。在过去的6年里，端点服务了包括制造、零售、房产、文化等众多行业的领军企业，客户包括以万科、海尔、恒大为代表的世界500强企业，以海信、雏鹰、王力、金隅冀东为代表的中国500强企业等，以新华书店网上商城为代表的国有企业等</Text>
        </View>
      </View>
    );
  }
}
