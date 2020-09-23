import { CommonDataItemConfig, commonDataConfig } from 'utils/common-data/config';
import { request, isFunction } from '@terminus/mall-utils';

const _DEV_ = process.env.NODE_ENV === 'development';

/**
 * 初始化数据,只获取initialData
 * @param { object } initialData 初始化数据，如果已有数据将不再调用
 */
export async function getInitialData() {
  const initialData = {};
  const promises = commonDataConfig.items.map(async config => {
    const { name, initialData: initD } = config;
    if (initD) {
      if (isFunction(initD)) {
        initialData[name] = await initD();
      } else {
        initialData[name] = initD;
      }
    }
  });
  await Promise.all(promises);
  return initialData;
}

export function matchRouterName(config, routerName) {
  const { excludePath, includePath } = config;
  if (excludePath) {
    if (!routerName || !excludePath.includes(routerName)) {
      return true;
    }
    return false;
  }
  if (includePath) {
    if (routerName && includePath.includes(routerName)) {
      return true;
    }
  }
  return false;
}

/**
 * 根据单个config获取数据
 * @param config 配置项
 * @param ctx 服务端ctx
 */
async function handleConfigRequest(config: CommonDataItemConfig, ctx?) {
  const { handleData, url, onError, name } = config;
  try {
    if (url) {
      const data = await request(config.url, Object.assign({ quiet: true, isGlobal: true, ctx }, config.options));
      return { [name]: handleData ? handleData(data) : data };
    }
    return {};
  } catch (e) {
    if (_DEV_) {
      console.log(e);
    }
    if (onError) {
      return { [name]: onError(e) };
    }
    return {};
  }
}

function getConfig(name) {
  return commonDataConfig.items.find(config => config.name === name);
}

async function assignPromiseData(promises) {
  const list = (await Promise.all(promises)).filter(it => it);
  if (!list.length) {
    return {};
  }
  return Object.assign.apply([], list);
}

/**
 * 刷新公共数据
 * @param name name
 */
export async function requestCommonData(name: string | string[]) {
  // 传入target只获取target的数据
  if (name) {
    const targets = Array.isArray(name) ? name : [name];
    const promises = [];
    targets.forEach(n => {
      promises.push(handleConfigRequest(getConfig(n)));
    });

    return await assignPromiseData(promises);
  }
  return undefined;
}

/**
 * 获取所有初始异步数据
 * @param routerName native端的时候routerName为空
 */
export async function getAsyncInitialData(routerName?: string) {
  const names = [];

  commonDataConfig.items.forEach(item => {
    const { name, url } = item;
    if (!url) {
      return;
    }

    if (matchRouterName(item, routerName)) {
      names.push(name);
    }
  });

  return await requestCommonData(names);
}
