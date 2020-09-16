
import React from 'react'
import '@terminus/react-native-octopus/src/polyfill'
import { Route, Router, TabRouter } from '@terminus/octopus-router'

import ComponentsList from './pages/octopus_demo/components-list'
import ImageDemo from './pages/octopus_demo/components/Image'
import TextDemo from './pages/octopus_demo/components/Text'
import Home  from './pages/octopus_demo/home'
import Category from './pages/octopus_demo/category'


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
        <TabRouter text='首页'>
          <Route name="Home" component={Home}/>
        </TabRouter>
        <TabRouter text='分类'>
          <Route name="Category" component={Category}/>
        </TabRouter>
        <Route name="ImageDemo" component={ImageDemo}/>
        <Route name="TextDemo" component={TextDemo}/>
        <Route name="ComponentsList" component={ComponentsList}/>
      </Router>
      {children}
      </>
    )
  }
}

export default Index

