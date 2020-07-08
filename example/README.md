# TRNW-App-Template

三端统一项目模板

## 环境配置

#### 当前环境说明

  -  react-native:  0.57.7
  -  react":  16.7.0

#### 开发环境要求

- cocoapods : 建议使用1.4.0 注意如果为1.5.0以上版本，则必须降级
- gem  :建议2.7.6 ，注意如果为2.7.7，则必须降级
- ruby :建议2.5.0以下
- node : 8.0.0以上 即可
- npm : 5.0.0以上即可
- 安卓SDK 需要安装9.0/28的版本

## 启动

#### IOS


  
  若刚更新或第一次安装 请先执行npm install 或 npm update --no-repo-update
  
  然后运行npm start 并新开窗口执行 npm run ios 即可

####  Android

  然后运行npm start 并新开窗口直接执行 npm run android即可(手机插入电脑开启调试模式或已有模拟器启动)

#### web

- 若仅需启动查看无需后端接口 npm run demo即可
- 需要根据项目配置herd
- npm run web && run herd-local

#### 增加svg icon

  ```
     node svgmake.js http://iconfont.cn/xxxxx        // 后面的链接为对应iconfont仓库的symbol 链接
  ```


## 注意事项

-  目前ios使用cocoapods来管理所有依赖，所以涉及到原生的依赖`不能直接使用react-native link ....` 必须手动导入，导入方法一般具体组件库中会有说明。
- 修改原生文件，即ios、android目录下的文件，必须重新编译才能生效



## 附录

详见doc文件夹下

-  app更新发版说明
-  ios添加udid



