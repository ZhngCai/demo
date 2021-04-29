export default {
  pages: [
    'pages/index/index',
    'pages/my/index',
    'pages/user/index',
  ],
  tabBar: {
    "list": [{
      "pagePath": "pages/index/index",
      "iconPath": "asset/images/icon_component.png",
      "selectedIconPath": "asset/images/icon_component_HL.png",
      "text": "首页"
    }, {
      "pagePath": "pages/my/index",
      "iconPath": "asset/images/icon_API.png",
      "selectedIconPath": "asset/images/icon_API_HL.png",
      "text": "我的"
    }]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}
