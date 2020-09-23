import { Design } from 'common/design-render';
import React from 'react';
import { Button } from 'react-native';

function Home(props) {
  return <Design {...props}></Design>;
}

Home.navigationOptions = {
  headerTitle: '首页',
  headerRight: () => <Button onPress={() => alert('This is a button!')} title="弹窗" />,
};

export default Home;
