import React from 'react';
import { Text, View, Button } from 'react-native';
import { createStyle, commonStyle } from '../../../styles';

const styles = createStyle({
  text: {
    textAlign: 'center',
  },
});

export function Design(props) {
  function gotoLogin() {
    props.navigation.navigate('Login');
  }

  return (
    <View style={commonStyle.container}>
      <Text style={styles.text}>个人中心</Text>
      <Button onPress={gotoLogin} title="去登陆">
        去登陆页面
      </Button>
    </View>
  );
}
