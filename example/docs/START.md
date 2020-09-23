# 启动

## 依赖安装

工程目录下执行

```
 npm i
```

ios 目录下执行

```
cd ios
pod update --no-repo-update
```

启动node server

```
# 根目录下执行
npm run start
```

## iOS启动

根目录下执行

```
npm run ios
```

## android 启动

* 首先启动模拟器 或者 直接数据线连接真机并起开[debug模式](https://developer.android.com/studio/debug/dev-options.html?hl=zh-cN)
* 执行debug打包命令
  ```
  npm run android
  ```

Android打包过程中如果提示依赖无法安装，请打开阿里郎的加速或者自行准备代理

## h5启动

* 进查看效果，无需后端接口交互直接执行一下命令即可

    ```
     # 根目录下执行
     npm run demo
    ```
* 项目需要接口交互
  * 自行配置`Pampasfile.js`
  * 根据项目要求是否需要配置NGINX

    ```
    # 根目录下执行
    npm run herd-local
    npm run web
    ```

## 微信小程序启动

```
# 根目录下执行
npm run octopus:watch
```
编译完成之后，启动微信小程序模拟器，导入项目即可预览效果