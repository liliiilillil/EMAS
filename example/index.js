import { AppRegistry } from 'react-native'
import { EnvRegister } from '@terminus/rn-debug'
import './app/entrance/patch'
import appGetter from './app/entrance'

const envs = [{ id: 'dev', name: '开发环境' }, { id: 'test', name: '测试环境' }, { id: 'prepub', name: '预发环境' }, { id: 'production', name: '生产环境', default: true }]
EnvRegister(envs, (config) => {
  global.env = config.id
  const { initAgent } = require('./app/entrance/patch')
  initAgent(config.id)
})


AppRegistry.registerComponent('social', () => appGetter())
