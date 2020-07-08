import { NativeModules } from 'react-native';
//这里面Permissions就是PermissionModule中getNames返回的字符串，用于在Js端标记此模块
export default NativeModules.Permissions;