import React from 'react'
import createLoading from 'dva-loading'
import { NetInfo } from 'react-native'
import dva from 'dva-no-router'
import { Toast, Modal, Provider } from 'rn-components'
import { navigate } from 'app/utils'
import NavigatorsIndex, { routerReducer, routerMiddleware } from 'app/navigators'
import { registerModels } from 'app/entrance/model'

const app = dva({
  initialState: {},
  extraReducers: { router: routerReducer },
  onAction: [routerMiddleware],
  onError(e, dispatch) {
    e && e.preventDefault()
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      if (connectionInfo.type === 'none') {
        dispatch({ type: 'common/netWorkStatus', payload: { netWorkStatus: false } })
      }
    })
    if (e.response) {
      if (e.response.statusCode === 401) {
        // dispath为 Modal静态方法, 实现当弹窗时调用接口返回未登录，等待所有弹窗关闭，然后跳转
        Modal.dispatch(() => {
          setTimeout(() => navigate('Login', { needBack: true, reloadBack: true }), 200)
        })

        window.user = undefined
        Toast.info('请登录', 2, () => {}, false)
        return
      }
      setTimeout(() => Toast.info(e.response.body ? e.response.body.error : '当前网络异常，请稍后重试', 2, () => { }, false))
      return
    }
    setTimeout(() => Toast.info('当前网络异常，请稍等重试'), 0)
  },
})

app.use(createLoading({ effects: true }))

registerModels(app)
app.router(() => { return (<Provider><NavigatorsIndex /></Provider>) })

const init = () => {
  // await NavigatorsIndex.asyncLoadIfNeeded() // TODO 其实可以放到 router 的 cwm 里做，但这里可以提前 load ，感觉能快一点，先放这里吧……
  return app.start()
}


export default init

