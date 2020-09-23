import { AppRegistry } from 'react-native';
import { EnvRegister } from '@terminus/rn-debug';
import { App } from 'configs/app';
import { request, isObject } from '@terminus/mall-utils';
import { environments, envConfigsMap } from 'configs/environments';

const _DEV_ = process.env.NODE_ENV === 'development';

export function start() {
  EnvRegister(environments, config => {
    const env = config.id;
    const envConfig = envConfigsMap[env];
    global.env = env;
    // 配置环境相关的 fetch 等
    request.initRequestConfig({
      // 请求发出之前
      beforeSend: async (api, options) => {
        return {
          url: `${envConfig.url}${api}`,
          options,
        };
      },
      // on
      onReceive: async (data, response, options) => {
        const { status } = response;
        if (_DEV_) {
          console.log(options.url, data); // eslint-disable-line
        }
        if (status < 200 || status >= 300) {
          throw new Error(request.getMessage(data, '请求响应异常'));
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
        if (!options.quiet) {
          alert(e.message);
        }
      },
    });
  });
  AppRegistry.registerComponent('TRNWAppTemplate', () => App);
}
