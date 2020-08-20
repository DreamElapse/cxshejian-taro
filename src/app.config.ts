export default {
  pages: [
      'pages/index/index',
      'pages/add/index',
      'pages/calendar/index',
      'pages/carFood/index',
      'pages/city/index',
      'pages/createOrder/index',
      'pages/demo/index',
      'pages/lateQueryResults/index',
      'pages/mall/index',
      'pages/selectSite/index',
      'pages/user/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '畅行舌尖',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#999999',
    selectedColor: "#f8b02a",
    borderStyle: "black",
    backgroundColor: "#ffffff",
    list: [
      {
        text: "首页",
        pagePath: "pages/index/index",
        iconPath: "./static/img/tabBar/index.png",
        selectedIconPath: "./static/img/tabBar/index_active.png"
      },
      {
        text: "商城",
        pagePath: "pages/mall/index",
        iconPath: "./static/img/tabBar/mall.png",
        selectedIconPath: "./static/img/tabBar/mall_active.png"
      },
      {
        text: "我的",
        pagePath: "pages/user/index",
        iconPath: "./static/img/tabBar/user.png",
        selectedIconPath: "./static/img/tabBar/user_active.png"
      }
    ]
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序',
    }
  }
}