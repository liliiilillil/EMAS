import { agent, isWeb, DynamicModules } from 'app/utils'
import NewIcons from 'app/files/font/iconfont.svg.js'
import icons from 'app/files/font/iconfont'
import { Svg, Iconfont } from 'rn-components'
import { networkDomain, schemes } from 'envs'
import totalModules from 'app/navigators/register-modules'
import 'app/entrance/patch/patch'

DynamicModules.registerModules(totalModules)


const getDomain = (env) => {
  if (isWeb) return networkDomain
  return networkDomain[env || global.env || 'production']
}

export const initAgent = (env) => {
  agent.init({
    sign: false,
    domain: getDomain(env),
    header: { 'x-requested-with': 'XMLHttpRequest' },
    scheme: schemes[env || global.env || 'production'],
  })
}
initAgent()
new Svg().reloadResource(NewIcons)
new Iconfont().reloadResource(icons)
