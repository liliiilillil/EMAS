import Guide from 'pages/guide';
import Design from 'pages/category';
import Login from 'pages/login';
import SignIn from 'pages/sign-in';
import Home from 'pages/home';
import { isWeb } from 'utils/platform';

export const basicRouterConfig = {
  Main: {
    Home: { screen: Home, navigationOptions: { title: 'Home' }, path: 'index' },
    Category: { screen: Design, navigationOptions: { title: 'Category' }, path: 'category' },
  },
  Auth: {
    Login: { screen: Login, navigationOptions: Login.navigationOptions, path: 'login' },
    SignIn: { screen: SignIn, navigationOptions: SignIn.navigationOptions, path: 'sign-in' },
  },
  Guide,
  initialRouteName: isWeb ? 'App' : 'Guide',
  uriPrefix: 'terminus://',
};
