import {
  createAppContainer,
  createSwitchNavigator,
  createBrowserApp,
  BottomTabBar,
  StackViewStyleInterpolator,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Text, Platform, Easing, Animated } from 'react-native';
import { isWeb } from 'utils/platform';
import React from 'react';
import { basicRouterConfig } from 'routers/basic';
import { businessRouterConfig } from 'routers/business';

const getTabBarIcon = (navigation, focused) => {
  const { routeName } = navigation.state;

  // You can return any component that you like here!
  return <Text style={{ color: focused ? 'tomato' : 'gray' }}>{routeName === 'Home' ? '首页' : '分类'}</Text>;
};

function getChildNavigationOptions(navigationRouter, screens) {
  const { navigation } = navigationRouter;
  let childNavigation = null;
  const activeRouterName = Object.keys(screens).find(key => {
    const nav = navigation.getChildNavigation(key);
    if (nav && nav.isFocused()) {
      childNavigation = nav;
      return true;
    }
    return false;
  });
  let options = null;

  if (activeRouterName) {
    const page = screens[activeRouterName];
    if (page) {
      options = page.screen && page.screen.navigationOptions;
      if (!options) {
        options = page.navigationOptions;
      }
    }
  }
  if (typeof options === 'function') {
    return options({ navigation: childNavigation });
  }
  return options;
}

const Main = createBottomTabNavigator(basicRouterConfig.Main, {
  tabBarComponent: BottomTabBar,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
  lazy: true,
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => getTabBarIcon(navigation, focused, tintColor),
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
  navigationOptions: navigationRouter => {
    return getChildNavigationOptions(navigationRouter, basicRouterConfig.Main);
  },
});

const AppStack = createStackNavigator(
  {
    Main: { screen: Main, path: '' },
    ...businessRouterConfig,
  },
  {
    headerMode: 'screen',
    transitionConfig: () => ({
      transitionSpec: isWeb
        ? { duration: 0 }
        : {
            duration: 300,
            easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
            timing: Animated.timing,
          },
      screenInterpolator: StackViewStyleInterpolator.forHorizontal,
      containerStyle: {
        backgroundColor: '#fff',
      },
    }),
    navigationOptions: {
      header: null,
    },
    cardStyle: {
      backgroundColor: 'transparent',
      shadowOpacity: 0,
    },
    transparentCard: isWeb,
    cardShadowEnabled: !isWeb,
    cardOverlayEnabled: !isWeb,
  }
);

const AuthStack = createStackNavigator(basicRouterConfig.Auth);

const createContainer = Platform.OS === 'web' ? createBrowserApp : createAppContainer;

export const NavigatorContainer = createContainer(
  createSwitchNavigator(
    {
      Guide: { screen: basicRouterConfig.Guide, path: 'guide' },
      App: { screen: AppStack, path: '' },
      Auth: { screen: AuthStack, path: 'user' },
    },
    {
      initialRouteName: basicRouterConfig.initialRouteName,
      resetOnBlur: false,
      // backBehavior: 'order',
    }
  )
);
