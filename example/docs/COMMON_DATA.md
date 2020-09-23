### commonData Plugin for Tumbler

公共数据存储

- 轻量级
- 路由匹配式的配置
- 支持接口绑定

#### 快速上手

使用方式

```javascript
import { initCommonDataConfig, supportNavigatorCommonDataPlugin, commonDataPlugin } from 'utils/common-data';

// 初始化配置
initCommonDataConfig({
  items: [
    {
      name: 'user',
      url: '/api/user/web/current-user',
      excludePath: ['SignUp', 'Auth'],
      // 参考 request 的 options 参数
      options: {},
      // eslint-disable-next-line no-unused-vars
      handleData(data) {
        return data || {};
      },
      // 防止重复调用
      onError() {
        return {};
      },
    },
  ],
});

// 应用
tumbler.plugin(supportNavigatorCommonDataPlugin(initialData));
// 或
tumbler.plugin(commonDataPlugin(initialData));
```

#### API

- initCommonDataConfig      配置commonData的接口，路由，初始值等
- commonDataPlugin          应用 commonDataPlugin
- supportNavigatorCommonDataPlugin 应用 带有根据路由变化自动刷新数据的 plugin
  + 须配合使用 tumbler.trigger('useNavigator', () => navigation); 注入navigation
  + 注：是否自动获取数据的判断规则。 根据 !commonData[key] === true 来判断是否刷新
- useCommonData             hooks方式使用 commonData
- injectCommonData          wrapper的方式使用commonData

#### 配置项说明 Item
|名称|类型|必填|作用|备注|
---|---|---|---|---
name| string | true | 在commonData中的key | -
url | string | false| 后端接口 | 目前不支持动态传参
excludePath | string[] | false | 配置的routerName | -
includePath | string[] | false | 配置的routerName | excludePath 和 includePath 二选一、也可以都不配置<br >&nbsp;&nbsp;&nbsp;&nbsp;如果两个都配置，includePath 失效<br >&nbsp;&nbsp;&nbsp;&nbsp;excludePath 被排除的页面，跳转至非被排除的页面时（如果还未加载）会发请求<br >&nbsp;&nbsp;&nbsp;&nbsp;includePath 包含的页面，跳转至被包含的页面时（如果还未加载）会发请求<br >&nbsp;&nbsp;&nbsp;&nbsp;配置 excludePath = [] 效果等同于 excludePath = undefined<br >&nbsp;&nbsp;&nbsp;&nbsp;配置 includePath = [] 表示所有页面均未被包含，所有页面均不会主动发起请求
options | RequestOptions | false | 配置fetch的参数 | 可参考 @terminus/mall-utils 中的request
initialData | object | false |  配置初始数据 | -
handleData | (data) => object | false | 请务必返回对象 | -
onError | () => any | false | 如配置请返回 |


```typescript react
import React, { useEffect, createContext, PureComponent, useContext } from 'react';
import { isPromise } from '@terminus/mall-utils';
import { requestCommonData, getInitialData, getAsyncInitialData, matchRouterName } from './helper';
import { commonDataConfig } from './config';

const _DEV_ = process.env.NODE_ENV === 'development';

type RefreshTarget = string[] | string | Promise<object>;

export type CommonData = {
  [key: string]: any;
  /**
   * 刷新公共数据
   * @param target commonDataConfig 中配置的name、需要刷新的数据
   * @param preload 自定义数据
   *    typeof target === string
   *        不配置data 调用 commonDataConfig 配置的 name = tagert 接口
   *        配置 data 直接将 commonData 中的 target 的值设置为data
   *    typeof target === string[]
   *        同时调用 commonDataConfig 配置的 name in tagert 接口
   *        data 失效
   *    typeof target === function
   *        promise的返回结果会被展开到commonData中
   */
  refresh: (target?: RefreshTarget, preload?: object) => Promise<void>;
};

export type CommonDataState = Omit<CommonData, 'refresh'>;

const defaultCommonData: CommonData = { refresh: async () => undefined };

const commonDataContext = createContext(defaultCommonData);

class Container extends PureComponent<CommonDataState, CommonDataState> {
  constructor(props: CommonDataState) {
    super(props);
    this.state = { ...(props.initialState || {}) };
  }

  refresh = async (target: RefreshTarget, preload?: object) => {
    // 如果直接传入preload
    if (preload && typeof target === 'string') {
      const newData = { [target]: preload };
      this.setState(newData);
      return;
    }

    // 空的
    if (Array.isArray(target) && !target.length) {
      return;
    }
    // loading 状态维护
    let newData: CommonDataState = {};
    this.setState({ loading: true });

    if (isPromise(target)) {
      newData = await target;
    } else if (target) {
      newData = await requestCommonData(target as string | string[]);
    }
    newData.loading = false;

    this.setState(newData);
  };

  render() {
    const { children } = this.props;
    return (
      <commonDataContext.Provider value={{ ...this.state, refresh: this.refresh }}>
        {children}
      </commonDataContext.Provider>
    );
  }
}

// useCommonData, 便于hooks操作
export function useCommonData() {
  return useContext(commonDataContext);
}

function Provider(props) {
  const { navigator, initialState } = props;
  return (
    <Container initialState={initialState}>
      <CommonDataCheck navigation={navigator && navigator._navigation} />
      {props.children}
    </Container>
  );
}

// 检测路由的变更，根据路由变更自动刷新数据
function CommonDataCheck(props) {
  const { navigation } = props;
  const { refresh, ...commonData } = useCommonData();
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (navigation) {
      const listener = navigation.addListener('action', event => {
        const { action = {} } = event;
        const { type, routeName } = action;
        const names = [];
        if (type === 'Navigation/NAVIGATE' && routeName) {
          if (_DEV_) {
            console.log(`Navigation to: ${routeName}`);
          }
          commonDataConfig.items.forEach(config => {
            if (matchRouterName(config, routeName) && !commonData[config.name]) {
              names.push(config.name);
            }
          });
        }
        if (names.length) {
          refresh(names);
        }
      });
      return () => {
        listener.remove();
      };
    }
  }, [commonData, navigation, refresh]);
  return null;
}

export async function commonDataPlugin(initialData) {
  const staticData = await getInitialData();
  const asyncData = await getAsyncInitialData();
  const initialState = { ...staticData, ...initialData, ...asyncData };
  return {
    component: Container,
    props: { initialState },
  };
}

// 增加一个注入navigation的事件订阅
export async function supportNavigatorCommonDataPlugin(initialData) {
  const staticData = await getInitialData();
  const asyncData = await getAsyncInitialData();
  const initialState = { ...staticData, ...initialData, ...asyncData };

  return {
    component: Provider,
    props: { initialState },
    subscribes: {
      useNavigator: (prevState, navigator) => ({
        ...prevState,
        navigator,
      }),
    },
  };
}

export function injectCommonData<T extends CommonData>(CustomComponent: React.ComponentType<T>) {
  return function injectedCommonData(props: T) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const commonData = useContext(commonDataContext);
    return <CustomComponent {...commonData} {...props} />;
  };
}
```
