import React from 'react';
import { Text, View, Button,StyleSheet } from 'react-native';
import { NavigationService } from '@terminus/react-navigation';

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    width: '100%',
    backgroundColor: '#f00',
  },
  textCenter: {
    textAlign: 'center',
  },
  container: {
    position: 'relative',
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Home(props) {
  function gotoLogin() {
    NavigationService.navigate('Login');
  }

  function gotoCategory() {
    NavigationService.navigate('Category', { path: '/activity/123' });
  }

  function gotoActivity() {
    // props.navigation.navigate('Activity', { path: '/activity/123' });
    NavigationService.navigate('Activity', { path: '/activity/123' });
  }

  function gotoComponentsList() {
    NavigationService.navigate('ComponentsList');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>首页</Text>
      <Button onPress={gotoCategory} title="分类页面" />
      <Button onPress={gotoComponentsList} title="公共组件" />
      
    </View>
  );
}
