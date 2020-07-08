/*  eslint-disable import/no-unresolved */

import { BottomTabBar } from 'react-navigation-tabs'
import variables from 'themes/default'
import { rem, DynamicModules } from 'app/utils'
import { enhanceTabNavigator } from 'react-native-navigators-tools'

const { Index, Category } = DynamicModules.getModules('Index', 'Category')

const Style = {
  bottomTabStyle: {
    height: rem(50),
    backgroundColor: variables.fill_grey,
    justifyContent: 'center',
    paddingTop: rem(5),
    paddingBottom: rem(4),
  },
  tabStyle: {
    justifyContent: 'flex-end',
    height: rem(40),
  },
  labelStyle: {
    fontSize: rem(12),
    lineHeight: rem(12),
    marginTop: rem(0),
    marginBottom: rem(0),
  },
}

const HomeNavigator = enhanceTabNavigator(
  {
    Index: { path: 'index', screen: Index },
    Category: { path: 'category', screen: Category },
  },
  {
    tabBarComponent: BottomTabBar,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    tabBarOptions: {
      activeTintColor: variables.brand_primary,
      inactiveTintColor: variables.color_text_base,
      style: Style.bottomTabStyle,
      tabStyle: Style.tabStyle,
      labelStyle: Style.labelStyle,
      iconStyle: { flexGrow: 1 },
    },
  }
)

export default HomeNavigator
