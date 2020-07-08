const red = '#E61818'
const darkred = '#B50D0D'
const dark = '#1E1E1E'
const white = '#ffffff'
const gray = '#999999'
const lightgray = '#DDDDDD'
const gainsboro = '#EFEFEF'
const smoke = '#F7F7F7'
// const yellow = '#FCC326'
const orange = '#FEB13B'
const transparent = 'transparent'
// const green = '#94b741'
// const darkGreen = '#81a134'
const color_price = '#d70000'
const color_primary = red
// const color_ghost = '#bfbfbf'
const color_text_primary = dark
const color_text_secondary = gray
const color_text_minor = lightgray
// const color_text_ghost = gray
const color_border = lightgray
const brandPrimary = color_primary
const brandPrimaryTap = darkred
const dark_brand_primary = darkred

export default {
  // 色彩
  red,
  darkred,
  dark,
  white,
  gray,
  lightgray,
  gainsboro,
  smoke,
  // 导航条背景颜色
  header_bg_color: smoke,
  // 导航条字体大小
  header_title_size: 18,
  orange,
  transparent,
  color_primary,
  // 价格颜色
  color_price,
  // ---
  // 文字色
  color_text_base: color_text_primary, // 基本
  color_text_base_inverse: '#fff', // 基本 _ 反色
  color_text_secondary, // 辅助色
  color_text_placeholder: color_text_minor, // 文本框提示
  color_text_disabled: lightgray, // 失效
  color_text_caption: color_text_secondary, // 辅助描述
  color_text_paragraph: '#333', // 段落
  color_link: brandPrimary, // 链接

  // 背景色
  fill_base: '#fff', // 组件默认背景
  fill_body: '#fff', // 页面背景
  fill_tap: '#ddd', // 组件默认背景 _ 按下
  fill_disabled: gainsboro, // 通用失效背景
  fill_mask: 'rgba(0, 0, 0, .4)', // 遮罩背景
  color_icon_base: '#ccc', // 许多小图标的背景，比如一些小圆点，加减号
  fill_grey: gainsboro,
  primary_background: gainsboro,
  color_border: lightgray,

  // 透明度
  opacity_disabled: '0.3', // switch checkbox radio 等组件禁用的透明度

  // 全局/品牌色
  brand_primary: brandPrimary,
  dark_brand_primary,
  brand_primary_tap: brandPrimaryTap,
  brand_success: brandPrimary,
  brand_warning: orange,
  brand_error: darkred,
  brand_important: red, // 用于小红点
  brand_wait: '#108ee9',

  // 边框色
  border_color_base: '#ddd',

  //

  // 字体尺寸
  // ---
  font_size_icontext: 10,
  font_size_caption_sm: 12,
  font_size_base: 14,
  font_size_subhead: 15,
  font_size_caption: 16,
  font_size_heading: 17,

  // 圆角
  // ---
  radius_xs: 2,
  radius_sm: 3,
  radius_md: 5,
  radius_lg: 7,

  // 边框尺寸
  // ---
  border_width_sm: 0.5,
  border_width_md: 1,
  border_width_lg: 2,

  // 间距
  // ---
  // 水平间距
  h_spacing_sm: 5,
  h_spacing_md: 8,
  h_spacing_lg: 15,

  // 垂直间距
  v_spacing_xs: 3,
  v_spacing_sm: 6,
  v_spacing_md: 9,
  v_spacing_lg: 15,
  v_spacing_xl: 21,

  // 高度
  // ---
  line_height_base: 1, // 单行行高
  line_height_paragraph: 1.5, // 多行行高

  // 图标尺寸
  // ---
  icon_size_xxs: 15,
  icon_size_xs: 18,
  icon_size_sm: 21,
  icon_size_md: 22, // 导航条上的图标
  icon_size_lg: 36,

  // 动画缓动
  // ---
  ease_in_out_quint: 'cubic_bezier(0.86, 0, 0.07, 1)',

  // 组件变量
  // ---

  actionsheet_item_height: 50,
  actionsheet_item_font_size: 18,

  // button
  button_height: 32,
  button_font_size: 12,
  h_button_spacing: 12,
  button_radius: 2,

  button_height_sm: 28,
  button_font_size_sm: 12,
  h_button_spacing_sm: 12,

  button_height_md: 36,
  button_font_size_md: 12,
  h_button_spacing_md: 12,

  button_height_lg: 42,
  button_font_size_lg: 16,

  fixed_button_width: 72,

  across_button_height: 50,

  disable_text_color: white,
  ghost_disable_text_color: '#ddd',

  primary_button_fill: brandPrimary,
  primary_button_fill_tap: brandPrimaryTap,
  primary_highlight_text_color: white,
  primary_raw_text_color: white,

  ghost_button_color: color_text_primary, // 同时应用于背景、文字颜色、边框色
  ghost_button_border_color: color_border,
  ghost_button_fill_tap: smoke,

  warning_button_fill: orange,
  warning_button_fill_tap: '#F78D36',
  warning_highlight_text_color: white,
  warning_raw_text_color: white,

  link_button_fill_tap: '#ddd',
  link_button_font_size: 16,

  button_height_global: 42,

  // modal
  modal_font_size_heading: 18,
  modal_button_font_size: 18, // 按钮字号
  modal_button_height: 50, // 按钮高度

  // list
  list_header_bg_color: transparent,
  list_item_font_size_content: 16,
  list_title_height: 30,
  list_item_height_sm: 35,
  list_item_height: 44,

  // input
  input_label_width: 17, // InputItem、TextareaItem 文字长度基础值
  input_font_size: 16,
  input_color_icon: '#ccc',
  input_color_icon_tap: brandPrimary,


  input_color_placeholder: '#bbbbbb', // input占位文字颜色

  input_item_height: 20,

  // tabs
  tabs_color: brandPrimary,
  tabs_height: 42,
  tabs_font_size_heading: 15,

  // segmented_control
  segmented_control_color: brandPrimary, // 同时应用于背景、文字颜色、边框色
  segmented_control_height: 27,
  segmented_control_fill_tap: `${brandPrimary}10`,

  // tab_bar
  tab_bar_fill: '#ebeeef',
  tab_bar_height: 50,

  // toast
  toast_fill: 'rgba(0, 0, 0, .8)',

  // search_bar
  search_bar_fill: '#e8e8e8',
  search_bar_height: 44,
  search_bar_input_height: 28,
  search_bar_font_size: 15,
  search_color_icon: '#bbbbbb', // input search icon 的背景色
  search_tab_split_color: lightgray,
  search_tab_icon_color: '#bbb',
  search_list_fill: '#ebebeb',

  // notice_bar
  notice_bar_fill: '#fffada',
  notice_bar_height: 36,

  // switch
  switch_fill: '#4dd865',

  // tag
  tag_height: 25,
  tag_small_height: 15,

  // table
  table_title_height: 30,

  // picker
  option_height: 42, // picker 标题的高度

  toast_zindex: 1999,
  action_sheet_zindex: 1000,
  popup_zindex: 999,
  modal_zindex: 999,
}
