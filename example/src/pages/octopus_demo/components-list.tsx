import React from 'react';
import { View, TouchableHighlight, Text, Platform } from 'react-native';
import { NavigationService } from '@terminus/react-navigation';

const styles = {
  container: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  containerWX: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '800px' },
  itemWrap: { display: 'flex', height: 40, width: 200, alignItems: 'center', justifyContent: 'center', backgroundColor: 'blue', marginTop: 10 },
  itemWrapWX: { display: 'flex', height: '40px', width: '200px', alignItems: 'center', justifyContent: 'center', backgroundColor: 'blue', marginTop: '10px' },
};

const isWechat = Platform.OS === 'wx';
export default class ComponentsList extends React.Component {
  render() {
    const comps = [
      {
        text: 'Button',
        url: '/pages/basicComponents/button/index',
      },
      {
        text: 'ImageDemo',
        url: '/pages/basicComponents/image/index',

      },
      {
        text: 'TextDemo',
        url: '',
      }
    ];
    return (
      <View style={isWechat ? styles.containerWX : styles.container}>
      {
          comps.map(comp => {
              return (
                <TouchableHighlight
                  key={comp.text}
                  onPress={() => {
                    NavigationService.navigate(comp.text);
                }}
                  style={isWechat ? styles.itemWrapWX : styles.itemWrap}
                >
                    <Text style={{ color: '#fff' }}>{comp.text}</Text>
                </TouchableHighlight>
              );
          })
      }
      </View>
    );
  }
}
