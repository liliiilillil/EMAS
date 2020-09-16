import React, { useContext } from 'react';
import { Login } from 'login';
import { Button } from 'react-native';
import { NavigationContext } from 'react-navigation';

Login.navigationOptions = () => {
  return {
    headerTitle: '登录',
    headerRight: () => <Button onPress={() => alert('This is a button!')} title="返回" color="#fff" />,
    headerLeft: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const nav = useContext(NavigationContext);
      console.log(nav);

      function backToApp() {
        nav.navigate('App');
      }
      return <Button title="<返回" onPress={backToApp} />;
    },
  };
};

export default Login;
