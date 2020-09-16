# TRNW-App-Template
多端统一项目模板，一套代码四端运行(Android、iOS、h5、小程序)

## 环境准备
多端统一环境主要是前端环境、Android、iOS
具体可以环境搭建参考[环境配置说明](docs/ENVIRONMENT.md)

## 发版声明 

npm publish 会忽略package-lock.json 和.gitignore。  为了适配创建项目cli， 需要先执行npm run compile 等发版完成后再执行uncompile

## 项目pipeline.yml说明

  该文件一般是用于打包发布流程的配置文件，用户需根据项目需求，对模板程序中的pipeline.yml进行修改。布置打包发布的流程
  详细pipeline.yml参数说明链接地址：https://docs.terminus.io/dice-docs-3-14/spec/pipeline-yml.html


## 启动
[多端统一项目启动](docs/START.md)

## 开发文档
* [项目结构](docs/PROJECT_TREE.md)
* [二开指南](docs/DEVELOP.md)
* [路由](docs/NAVIGATION.md)
* [基础组件](docs/COMPONENTS.md)
* [网络请求](docs/NETWORK.md)
* [状态管理](docs/UNSTATED.md)

## 调试
* [移动端调试](docs/MODBILE_DEBUG.md)

## 性能优化
日常开发优化[注意事项](docs/PERFORMANCE.md)

## CHANGELOG
版本变化[记录](./CHANGELOG.md)

## 附录
* [iOS uidi 添加说明](docs/IOS_UDID.md)
* [APP发版说明](docs/APP_UPDATE_PUBLISH.md)
* [小程序端开发编译说明](docs/mp/INTRODUCTION.md)

