import { RequestOptions } from '@terminus/mall-utils/es/request/types';

export type CommonDataItemConfig = {
  name: string;
  url?: string;
  options?: RequestOptions;
  ssr?: boolean;
  handleData?: (res: any) => any;
  /**
   * 请求时的错误 在onError 处理
   * 如果不配置，直接返回 {}，并在控制台打印错误信息
   */
  onError?: (
    e: Error & {
      data: any;
      response: any;
      hasBeenLogin: boolean;
    }
  ) => any;
  initialData?: object;
  /**
   * excludePath 和 includePath 二选一、也可以都不配置
   *  * 如果两个都配置，includePath 失效
   *  * excludePath 被排除的页面，跳转至非被排除的页面时（如果还未加载）会发请求
   *  * includePath 包含的页面，跳转至被包含的页面时（如果还未加载）会发请求
   *  * 配置 excludePath = [] 效果等同于 excludePath = undefined
   *  * 配置 includePath = [] 表示所有页面均未被包含，所有页面均不会主动发起请求
   */
  excludePath?: string[];
  includePath?: string[];
};

export type CommonDataDefaultConfig = {
  items: CommonDataItemConfig[];
};

export const commonDataConfig: CommonDataDefaultConfig = {
  items: [
    {
      name: 'preOrderCommonData',
      initialData: {
        // 选中的收货地址ID
        selectedAddressId: null,
        // 选中的优惠券
        // {activityId, benefitId, shopId}
        selectedCoupon: null,
        // 保存选中的礼品卡信息
        // {activityId, benefitId, shopId, benefitType}
        selectedCards: [],
        // 保存选中的积分信息
        // { amount, benefitType }
        selectedPoint: [],
        // 选中的发票
        selectedInvoice: null,
        // 买家留言
        buyerNotes: {},
        // 预售手机号
        presaleMobile: null,
      },
    },
  ],
};

/**
 * 配置项合并
 * @param options 新配置项
 */
export function initCommonDataConfig(options: CommonDataDefaultConfig) {
  Object.assign(commonDataConfig, options);
}
