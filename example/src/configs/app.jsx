/* eslint-disable */
import React, { Component } from 'react';
import { NavigationService } from 'react-navigation';
import { basicRouterConfig } from 'routers/basic';
import { tumbler } from './tumbler';
import { NavigatorContainer } from './navigators';
import { isFunction } from '@terminus/mall-utils';

// const prefix = Linking.makeUrl('/');

export class App extends Component {
  state = {
    ready: false,
    navigator: null,
  };

  RootElement = null;

  async componentDidMount() {
    // 应用 plugin
    tumbler.useApp(
      <NavigatorContainer
        ref={_app => {
          // 增加navigation的监听
          tumbler.trigger('useNavigator', () => _app);
          NavigationService.setTopLevelNavigator(_app);
        }}
        uriPrefix={basicRouterConfig.uriPrefix}
      />
    );
    const RootElement = await tumbler.render();
    this.RootElement = RootElement;
    this.setState({ ready: true });
  }

  render() {
    return this.RootElement;
  }
}
