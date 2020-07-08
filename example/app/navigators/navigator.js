/*  eslint-disable import/no-unresolved */

import React from 'react'
import { Easing, Animated } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import { createScreen, DynamicModules, isWeb, enableDeepLink } from 'app/utils'
import * as screens from 'app/pages'
import CardStackStyleInterpolator from 'react-native-navigators-tools/screen-interpolator'

const { HomeNavigator } = DynamicModules.getModules('HomeNavigator')

const AppNavigator = createStackNavigator(
  {
    HomeNavigator: { screen: HomeNavigator, navigationOptions: () => ({ header: null }) },
    ...createScreen(screens),
  },
  {
    headerMode: 'screen',
    initialRouteName: 'HomeNavigator',
    transitionConfig: () => ({
      transitionSpec: isWeb ? { duration: 0 } : {
        duration: 300,
        easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
        timing: Animated.timing,
      },
      screenInterpolator: CardStackStyleInterpolator.forHorizontal,
    }),
    navigationOptions: {
      header: null,
    },
    cardStyle: {
      backgroundColor: 'white',
      shadowOpacity: 0,
    },
  }
)

export default (isWeb ? AppNavigator : enableDeepLink(AppNavigator, 'xhsdnative'))
