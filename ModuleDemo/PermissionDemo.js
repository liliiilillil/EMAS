import Permissions from 'components/Permissions';
//在componentDidMount中调用
componentDidMount(){
  //requestPermission就是PermissionModule中使用@ReactModule标记的方法
  Permissions.requestPermission();
  Permissions.requestPermissionResult();
}