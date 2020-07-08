# ios udid添加说明

公司/个人级别开发者账号，打的测试包，必须是在描述文件中添加过udid的手机，才能进行安装测试。该说明主要讲如何更新添加udid。

#### 1. 进入苹果开发者网站添加udid

- 登录苹果开发者网站[AppDeveloper](https://developer.apple.com/),点击 `account` 登录管理平台。并选择`Certificates, IDs & Profiles` 选项进入证书编辑界面

![](https://ws3.sinaimg.cn/large/0069RVTdgy1fuxmvxlum2j31kw0utaif.jpg)

- 在证书管理界面，左边栏功能选择区，点击`Deveices`=> `对应设配平台：例如All`进入设备udid管理区，可选中的顶部`+`号,进入添加udid页面

![](https://ws1.sinaimg.cn/large/0069RVTdgy1fuxmw555u9j31kw0utn6d.jpg)

- 在添加界面操作添加udid，添加方法有单独添加和批量添加，用户可选择具体功能操作。完成后点击底部`continue`按钮

![](https://ws3.sinaimg.cn/large/0069RVTdgy1fuxmvn7b8pj31kw107wob.jpg)

- 在接下来确认的页面点击完成即可

#### 2. 修改描述文件


 - 在证书管理界面，左边栏功能选择区，点击`Provisioning Profiles`=> `环境证书（开发、生产）：例如Development`进入描述文件选择区域。并点击选择当前项目的描述文件，进入描述文件编辑界面
 - 
  ![](https://ws2.sinaimg.cn/large/0069RVTdgy1fuxn5d5gyvj31kw14pk0b.jpg)

 - 在描述文件编辑页面，重新选择`Devices`选项，勾上刚才添加的udid devices。最后点击`Generate`完成更新

 ![](https://ws3.sinaimg.cn/large/0069RVTdgy1fuxn5fxx1tj31kw131n45.jpg)
 
 - 最后将更新后的描述文件下载下来,并双击打开。

 
####3.  更新代码中的描述文件

 - 用Xcode打开具体项目，点击项目Project => Targets下面的项目名称 => General => Signing/Signing(debug/Test/Release)选项.
 - 在 Signing/Signing(debug/Test/Release)选项下，现在需要添加udid的环境（一般为Test或者Debug环境），在`Provisioning Profile`下拉框中选择刚刚下载打开的描述文件。
  ![](https://ws2.sinaimg.cn/large/0069RVTdgy1fuxne2xdi1j31kw0w0n8c.jpg)
 - 更新提交代码
 
 
#### 4. 更新打包机上的描述文件，并重新打包

- 将下载的描述文件传到打包机上，双击打开
 (可用`scp -r local_dir username@servername:remote_dir` 操作上传,	`open ./xxxx.mobileprovision`打开)
   
- 登录jenkins打包环境, 重新打包即可



 
 


