import React from 'react';
import { View, Text, Button } from 'react-native';
import { commonStyle } from 'styles';

export function SignIn(props) {
  function hasLogin() {
    props.navigation.navigate('App');
  }
  return (
    <View style={commonStyle.container}>
      <Text>注册</Text>
      <Button onPress={hasLogin} title="点击注册" />
    </View>
  );
}
