import React, { Component } from 'react'
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer
} from 'react-navigation-redux-helpers'
import { connect } from 'dva-no-router'
import {
  DynamicModules,
  navigationStateChange,
  globalShare,
  version,
  routes,
  setTopLevelNavigator
} from 'app/utils'
import { mappings, BlackList } from 'app/utils/init'
import Router from 'react-native-navigators-tools/router'
import AppNavigator, { asyncLoad, isLoaded } from './navigator'

export const routerReducer = createNavigationReducer(AppNavigator)

export const routerMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.router
)

const App = reduxifyNavigator(AppNavigator, 'root')

const { HomeNavigator } = DynamicModules.getModules('HomeNavigator')

// router类抽离业务项目， 所需参数通过props传入
// navigationStateChange 需要传入新mappings和老的mappings 用于二次开发 rnparana的newMappings传入空
const routerProps = {
  navigationStateChange: navigationStateChange.bind(this, mappings),
  BlackList,
  AppNavigator,
  asyncLoad,
  isLoaded,
  HomeNavigator,
  globalShare,
}
@Router(routerProps, {
  version,
  routes,
})
@connect(({ router }) => { return { router } })
class NavigatorsIndex extends Component {
  render() {
    const { topDispatch, router } = this.props
    return <App ref={() => setTopLevelNavigator(topDispatch)} dispatch={topDispatch} state={router} />
  }
}

export default NavigatorsIndex
