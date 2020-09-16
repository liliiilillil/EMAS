import { Tumbler } from '@terminus/mall-base';
import { Provider } from '@terminus/nusi-mobile';
import { initCommonDataConfig, supportNavigatorCommonDataPlugin } from 'utils/common-data';

const tumbler = new Tumbler();

initCommonDataConfig({
  items: [
    {
      name: 'user',
      url: '/api/user/web/current-user',
      excludePath: ['SignIn', 'Auth'],
      // 参考 request 的 options 参数
      options: { quite: true },
      // eslint-disable-next-line no-unused-vars
      handleData(data) {
        return data || {};
      },
      onError() {
        return {};
      },
    },
    {
      name: 'cartCount',
      url: '/api/trade/cart/query/count',
      includePath: ['Activity'],
      // 参考 request 的 options 参数
      options: {
        // clientType: 'H5',
        data: { cartType: 'cart.default', clientType: 'H5' },
      },
      // eslint-disable-next-line no-unused-vars
      handleData(data) {
        return data;
      },
      onError() {
        return undefined;
      },
    },
  ],
});

tumbler.plugin(supportNavigatorCommonDataPlugin());
tumbler.plugin({ component: Provider });

export { tumbler };
