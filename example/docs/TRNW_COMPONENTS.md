## trnw-components 提供基础UI组件

基于antd-mobile封装三端统一UI

[git地址](http://git.terminus.io/TRNW-Components/trnw-components)

## 组件文档

  Flex

  [原始文档](https://mobile.ant.design/components/flex/)

  WhiteSpace

  特性

|API|说明|类型|默认值|
|-|-|-|-|
|height|高度|number|12|
|backgroundColor|背景色|string|theme.fill_grey|

  NavBar

  [原始文档](https://mobile.ant.design/components/nav-bar/)
  
  特性

|API|说明|类型|默认值|
|-|-|-|-|
|mode|模式，支持 light, dark|string|light|
|iconName|图标名称|string|back|
|leftContent|导航左边内容|ReactNode|
|rightContent|导航右边内容|ReactNode|
|onLeftClick|点击导航左侧的回调函数|function|

  Header

|API|说明|类型|默认值|
|-|-|-|-|
|mode|模式|'light'/'dark'|light|
|rightContent|导航右边内容|ReactNode|
|onGoBack|点击返回触发的回调函数，可为空|function|
|navigation|navigation 对象，有 pop 方法 |object|
|getScreenDetails|获取 screen 详情接口|function|
|scene|scene 实例 |object|

  Popover

  [原始文档](https://mobile.ant.design/components/popover/)

  SegmentedControl

  [原始文档](https://mobile.ant.design/components/segmented-control/)

  Tabs

  [原始文档](https://mobile.ant.design/components/tabs/)

  TabBar

  [原始文档](https://mobile.ant.design/components/tab-bar)

  Button

  [原始文档](https://mobile.ant.design/components/button)

  新增特性

|API | 说明| 类型 |
|---|---|---|
|size| 按钮大小，可选值为large、small，middle,middleSmall|string|
|type| 按钮类型，可选值为primary/ghost/warning/secondprimary或者不设|string|
|width|是否固定宽度，可选值为fixed或者不设|string|

  Checkbox

  [原始文档](https://mobile.ant.design/components/checkbox/)

  InputItem

  [原始文档](https://mobile.ant.design/components/input-item/)

  AnimatedInputItem
  
  有动画的input
   
|API | 说明| 类型 |
|---|---|---|
|size| 按钮大小，可选值为large、small、middle、middleSmall|string|
|type| 按钮类型，可选值为primary、ghost、warning、secondprimary或者不设|string|
|width|是否固定宽度，可选值为fixed或者不设|string|
|holderText|placeholder|string|

  ControlledTextInput

|API|说明|类型|默认值|
|-|-|-|-|
|value|value 值|string|
|focused|切换聚焦状态|bool|false|
|autoFocus|自动聚焦|bool|false|
|onChange|change 事件触发的回调函数|function|
|style|样式|object|

  PickerView

  [原始文档](https://mobile.ant.design/components/picker-view/)

  Switch

  [原始文档](https://mobile.ant.design/components/switch)

  <!-- SearchBar

  [原始文档](https://mobile.ant.design/components/search-bar/)  -->

  Stepper

  [原始文档](https://mobile.ant.design/components/stepper/)

|API|说明|类型|默认值|
|-|-|-|-|
|showNumber(web only)|是否显示数值|bool|true|

  Accordion

  [原始文档](https://mobile.ant.design/components/accordion/)

  Badge

  [原始文档](https://mobile.ant.design/components/badge/)

  Carousel

  [原始文档](https://mobile.ant.design/components/carousel/)

  Icon

  [原始文档](https://mobile.ant.design/components/icon/)

  Svg

|API|说明|类型|默认值|
|-|-|-|-|
|type|内置 icon 名称|string|
|width|svg 宽度|number|22|
|height|svg 高度|number|22|
|size|图标大小, 优先级: width/height > size |''xxs'/'xs'/'sm'/'md'/'lg'|22|
|color|图标颜色|color|#666|
|style|样式|object|

  Rate

  特性

|API|说明|类型|默认值|
|-|-|-|-|
|disabled|是否可编辑|bool|false|
|maxStars|最大星星数 |number|5|
|activedStars|激活星星数|number|5|
|fullStarType|星星填满的类型|string|'starFull'|
|emptyStarType|空星星的类型|string|'starEmpty'|
|starSize|星星图标的大小|number|12|
|selectedStar|点击星星的回调函数|function|

  List

  [原始文档](https://mobile.ant.design/components/list/) 

  Tag

  [原始文档](https://mobile.ant.design/components/tag/)

  ActivityIndicator

  [原始文档](https://mobile.ant.design/components/activity-indicator/)

  Modal

  [原始文档](https://mobile.ant.design/components/modal/)

  Progress

  [原始文档](https://mobile.ant.design/components/progress/)

  Toast

  [原始文档](https://mobile.ant.design/components/toast)

  SwipeAction

  [原始文档](https://mobile.ant.design/components/swipe-action/)

  ListView

  [原始文档](https://mobile.ant.design/components/list-view/)

  ScrollView

  [原始文档](http://necolas.github.io/react-native-web/storybook/?selectedKind=Components&selectedStory=ScrollView&full=0&addons=0&stories=1&panelRight=0)
  
  Form

  设置 wrappedComponentRef={inst => this.form = inst}, inst 会自带 formInstance 属性, formInstance 属性提供的 API 如下:

|API|说明|类型|
|-|-|-|
|validateFields|校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件|function|
|getFieldsValue|获取一组输入控件的值，如不传入参数，则获取全部组件的值|function|

  PackForm

|API|说明|类型|默认值|
|-|-|-|-|
|packInputArray|input item 数组|array|
|inputWrapStyle|inputItem 样式|object|
|style|组件容器样式|object|
|submitText|submit 按钮的文本|string|确定|
|onSubmit|数据验证成功后回调事件|function|

  Image

  [原始文档](http://necolas.github.io/react-native-web/storybook/?selectedKind=Components&selectedStory=Image&full=0&addons=0&stories=1&panelRight=0)

  新增特性

|API|说明|类型|
|-|-|-|
|calc|用于计算图片尺寸,[gap, count, proportion]分别为总大小，一行几个，长宽比|array|
|width|宽度, 默认 100|number|
|height|高度, 默认 100|number|
|dynamic|当为 true, 按图片比例等比缩放|bool|
|watermark|水印(目前只支持阿里云的水印)|object|

  WebView

|API|说明|类型|默认值|
|-|-|-|-|
|Html|静态的html代码|string|
|handleOnMessage|在webview内部的网页中调用window.postMessage方法时可以触发此属性对应的函数，从而实现网页和RN之间的数据交换。设置此属性的同时会在webview中注入一个postMessage的全局函数并覆盖可能已经存在的同名实现。网页端的window.postMessage只发送一个参数data，此参数封装在RN端的event对象中，即event.nativeEvent.data。data 只能是一个字符串。|function|

  Iconfont

|API|说明|类型|默认值|
|-|-|-|-|
|type|内置 icon 名称|string|
|color|图标颜色|color|#666|
|size|图标大小|''xxs'/'xs'/'sm'/'md'/'lg'或者number|22|
|style|样式|object|

  ImageViewer

|API|说明|类型|默认值|
|-|-|-|-|
|imageUrls|图片资源|array|
|index||number|
|onCancel|close 触发的回调函数|function
|context|内容信息|node/string|