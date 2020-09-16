import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { commonStyle } from 'styles';
import { login } from 'login/service';
import { Icon } from 'common/icon';

export function Login(props) {
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  // const [message, setMessage] = useState('');

  async function toLogin() {
    try {
      await login(identity, password);
      alert('登录成功');
      props.navigation.navigate('App');
    } catch (e) {
      console.log(e);
    }
  }

  function toSignIn() {
    props.navigation.navigate('SignIn');
  }

  return (
    <View style={commonStyle.container}>
      <Text>登录页面</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%' }}
        onChangeText={value => setIdentity(value)}
        value={identity}
      />
        <Icon type="ic-tmall-wo" />
      <Text>
      </Text>
      <TextInput
        secureTextEntry
        textContentType="password"
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%' }}
        onChangeText={value => setPassword(value)}
        value={password}
      />
      <Button onPress={toLogin} title="点击登录" />
      <Button onPress={toSignIn} title="注册" />
    </View>
  );
}
