import { NavigationService } from '@terminus/react-navigation';
import { request, isObject } from '@terminus/mall-utils';
import { Toast } from '@terminus/nusi-mobile';

// 登录白名单
export const WITHOUT_LOGIN_ROUTES = ['Home', 'Activity', 'ItemDetail', 'Cart', 'Category', 'Search'];

const _DEV_ = process.env.NODE_ENV === 'development';

// request相关的配置，解包，错误处理
export const requestCommonConfig = {
  onReceive: async (data, response, options) => {
    const { status } = response;
    if (_DEV_) {
      console.log(response.url, status, data); // eslint-disable-line
    }
    if (status < 200 || status >= 300) {
      throw new Error(request.getMessage(data, '请求响应异常'));
    }
    if (options.url.includes('/api/user/files/upload')) {
      return;
    }
    if (data && !data.success) {
      throw new Error(request.getMessage(data, '响应异常'));
    }
  },
  convertData: data => {
    if (isObject(data) && data !== null) {
      return data.data;
    }
    return data;
  },
  onError(e, response, options) {
    if (options.quiet) {
      return;
    }
    if (response.status === 401) {
      return;
    }
    Toast.fail(e.message);
  },
  onUnauthorized(data, response, options) {
    if (options.preventToLogin) {
      return;
    }
    const { routeName, params } = NavigationService.getCurrentNav() || {};

    // 如果在login遇到401，无需跳转
    if (routeName === 'Login') {
      return;
    }

    if (routeName) {
      if (WITHOUT_LOGIN_ROUTES.includes(routeName)) {
        NavigationService.navigate('Login');
        return;
      }
      // pop 暂时不生效, 先用goBack
      NavigationService.goBack();
      NavigationService.navigate('Login', { from: JSON.stringify({ routeName, params }) });
      return;
    }
    if (options.quiet === false) {
      Toast.fail(request.getMessage(data, '未登录'));
    }
  },
};
