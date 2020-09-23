import { AppRegistry } from 'react-native';
import { App } from 'configs/app';
import { attach } from 'fastclick';
import { isObject, request } from '@terminus/mall-utils';

attach(document.body);

export function start() {
  request.initRequestConfig({
    // on
    onReceive: async (data, response) => {
      const { status } = response;
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
  });
  // render(<App />, document.getElementById('container'));
  AppRegistry.registerComponent('TRNWAppTemplate', () => App);
  AppRegistry.runApplication('TRNWAppTemplate', {
    rootTag: document.getElementById('container'),
  });
}
