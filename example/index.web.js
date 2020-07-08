import React from 'react'
import 'core-js'
import { AppRegistry } from 'react-native'
import './app/entrance/patch'
import appGetter from './app/entrance'

const FastClick = require('fastclick')

FastClick.attach(document.body)

const init = async () => {
  const App = await appGetter()
  const renderApp = () => <App />

  AppRegistry.registerComponent('social', () => renderApp)

  AppRegistry.runApplication('social', {
    rootTag: document.getElementById('container'),
  })
}

init()
