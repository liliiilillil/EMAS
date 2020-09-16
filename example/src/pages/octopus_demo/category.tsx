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

export default function Category(props) {
  function gotoHome() {
    NavigationService.navigate('Home');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>分类</Text>
      <Button onPress={gotoHome} title="去首页" />
    </View>
  );

}
