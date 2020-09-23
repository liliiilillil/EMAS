# 路由

- basic.js   //基础（静态）页面
  + 包含 首页，分类，我的 等tabbar的页面
  + 用户登录、注册 相关页面
  + Guide开屏广告页面

- business.js  //业务（普通）页面

### rn & H5 路由配置

 - 基础路由

    ```
    //文件路径  src/routers/basic.js

    import Guide from 'pages/guide';
    import Design from 'pages/category';
    import Login from 'pages/login';
    import SignIn from 'pages/sign-in';
    import Home from 'pages/home';
    import { isWeb } from 'utils/platform';
    
    export const basicRouterConfig = {
      Main: {
        Home: { screen: Home, navigationOptions: { title: 'Home' }, path: 'index' },
        Category: { screen: Design, navigationOptions: { title: 'Category' }, path:     'category' },
      },
      Auth: {
        Login: { screen: Login, navigationOptions: Login.navigationOptions, path:     'login' },
        SignIn: { screen: SignIn, navigationOptions: SignIn.navigationOptions,     path: 'sign-in' },
      },
      Guide,
      initialRouteName: isWeb ? 'App' : 'Guide',
    };

    ```
  - 业务路由

    ```
    // 文件路径 src/routers/business.js
    import Activity from 'pages/activity';
    import ComponentsList from 'pages/demo/components-list';
    import ImageDemo from 'pages/demo/components/Image';
    import TextDemo from 'pages/demo/components/Text';
    
    export const businessRouterConfig = {
      Activity: { screen: Activity, path: 'activity' },
      ComponentsList: { screen: ComponentsList },
      ImageDemo: { screen: ImageDemo },
      TextDemo: { screen: TextDemo },
    };

    ```

#### 小程序路由配置

微信小程序路由需要在 小程序入口文件里面进行配置

```
#src/mp_app.tsx

import React from 'react'
import { Route, Router, TabRouter } from '@terminus/octopus-router'

import ComponentsList from './pages/demo/components-list'
import ImageDemo from './pages/demo/components/Image'
import TextDemo from './pages/demo/components/Text'


class Index extends React.Component {
  render() {
    const { children } = this.props
    return (
      <>
      <Router
        navigationOptions={{
          navigationBarTitleText: 'Hellow World',
          navigationBarBackgroundColor: '#eee',
          navigationBarTextStyle: 'white',
        }}
      >
        <TabRouter text='主页' image='' selectedImage=''>
          <Route name={'ComponentsList'} component={ComponentsList} />
          <Route name={'ImageDemo'} component={ImageDemo}/>
          <Route name={'TextDemo'} component={TextDemo}/>
        </TabRouter>
      </Router>
      {children}
      </>
    )
  }
}

export default Index
```

*注意*
`小程序路由里面的name就是对应rn的routeName,同一个模块routeName一定要保持一致，否则路由无法统一跳转`

### 路由跳转

为了保证微信小程序 跟 RN 路由保持一致，路由跳转如下

```
import { NavigationService } from '@terminus/react-navigation'

# 跳转下一页面
NavigationService.navigate(routeName,params)  // routeName: 路由名称，params: 路由参数

# 返回上一级页面
NavigationService.pop()
```

### deeplink 配置

deeplink 是用户点击外链唤起APP并且跳转指定页面
depplink 一般情况由 `scheme` `host` `path` `args` 三部分组成
如`terminus://terminus.io/category?id=123` 

1. 前端配置

    ```
    // src/routers/basic.js
    export const basicRouterConfig = {
        uriPrefix: 'terminus://',  // uriPrefix 路由scheme,需要跟native端配置保持一致
    };
    ```

2. Android配置

  ```
  //修改 AndroidManifest.xml
  // android/src/main/AndroidManifest.xml
  //在MainActivity中加入 唤起入口

  <activity
        android:name=".MainActivity"
        android:label="@string/app_name"
        android:launchMode="singleTask"
        android:theme="@style/ActivityTheme"
        android:configChanges="keyboard|keyboardHidden|orientation|screenSize"
        android:windowSoftInputMode="adjustResize|adjustPan|stateHidden">
        <intent-filter>
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
        </intent-filter>
        <intent-filter>
            <action android:name="android.intent.action.VIEW" />
            <category android:name="android.intent.category.DEFAULT" />
            <category android:name="android.intent.category.BROWSABLE" />
            <data android:scheme="terminus" /> // 此处配置scheme
        </intent-filter>
      </activity>
  ```

  3. ios 配置

   xcode 打开项目 ios/${projectName}.xcworkspace 文件
   选中对应的target，选择info，添加URL Types