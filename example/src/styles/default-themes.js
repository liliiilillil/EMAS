/* eslint @typescript-eslint/no-var-requires:0,@typescript-eslint/camelcase:0 */
const { lessCover, rnThemeCover } = require('@terminus/nusi-mobile/lib/config/theme/util')

const themes = {
    // 基础色值
    $white: '#fff',
    $darkGray: '#333',
    $gray: '#666',
    $lightGray: '#999',
    $backgroundColorBase: '#F0F0F0',
    // 主题色
    $primaryColor: '#c62f2e',
    $warningColor: '#f9bd10',
    $successColor: '#20a162',
    // 字体颜色
    $textColor: '#1E1E1E',
    $colorTextDark: '#1e1e1e',
    $colorText: '#363433',
    $colorTextAssist: '#74787a',
    $colorTextNote: '#999',
    $colorTextDisabled: '#ddd',
    $colorTextBlue: '#5a99e5',
    // 边框颜色
    $colorBorder: '#eee',
    $rateColorBorder: '#BBBBBB',
    // 背景颜色
    $colorBackground: '#f7f7f7',
    $colorBackgroundActive: '#f6f2e4',
    $badgeColor: '#ff5b05',
    // 提示背景色
    $tipBackground: '#ffecc8',

    // nusi-mobile 主题
    $primary_color: '#c62f2e',
    $brand_primary: '#c62f2e',
    $search_bar_fill: '#f7f7f7',
    $ghost_button_fill_tap: '#c62f2e',
    $primary_button_fill_tap: '#c62f2e',
    $radius_md: 4,
};



const themeForRN = rnThemeCover(themes)

const themeForWeb = lessCover(themes)

module.exports = { themes, themeForRN, themeForWeb }
