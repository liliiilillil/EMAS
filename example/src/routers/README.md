### 路由配置
- basic.js   //基础（静态）页面
  + 包含 首页，分类，我的 等tabbar的页面
  + 用户登录、注册 相关页面
  + Guide开屏广告页面

- business.js  //业务（普通）页面

#### 配置规则：
  基本参照 navigation 的配置方式
参考如下：
``` javascript
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
};
```