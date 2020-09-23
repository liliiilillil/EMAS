# 二次开发

由于业务需求，多端统一也有二次开发的能力

## 静态资源

#### react-native

利用babel-plugin-module-resolver处理依赖路径的api
```
#根目录下.babelrc 文件
[
        "module-resolver",
        {
          "root": ["./src/components", "./", "./src","./node_modules/@terminus/rn-b2b2c/"]
        }
]
```

root的先后顺序不同，可以让src/images, src/pages等类似路径先找二次开发项目同路径内容，再去找node_modules下rn-b2b2c等包的内容，做到资源文件的二次开发无缝替换

*注意*
`坑1：react-native下有一个文件夹是settings，所以项目如果有一个根目录是settings，就会和react-native冲突，所以避免有名字settings的结构`

#### web

利用webpack的resolver下的alias，modules顺序可完成类似上边babel插件对RN的支持

*注意*
`注意modules尽量减少，能用alias的还是不用modules要不然webpack watch会很慢`

#### 小程序

[ ] todo