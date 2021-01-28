// miniprogram/pages/profile/profile.js
Page({
  data: {
    isLogin: {
      type: Boolean,
      value: false
    },
    userInfo: {
      type: Object,
      value: {}
    }
  },

  onLoad: function (options) {
    const isLogin = wx.getStorageSync(wx.loginStatusKey)
    const userInfo = wx.getStorageSync(wx.dbUserInfoKey)
    this.setData({
      isLogin: isLogin == undefined ? false : isLogin,
      userInfo: userInfo == undefined ? {} : userInfo
    })
  },

  onLoginBtnClick: function() {
    this.getSettings()
  },

  onLogoutBtnClick: function() {
    wx.setStorageSync(wx.loginStatusKey, false);
    wx.setStorageSync(wx.dbUserInfoKey, {});
    this.setData({
      isLogin: false,
      userInfo: {}
    })
  },
  
  getSettings: function() {
    wx.getSetting().then(res => {
      if (res.authSetting["scope.userInfo"]) {
        //授权成功
        this.getUserInfo()
      } else {
        this.authorize()
      }
    })
  },

  authorize: function() {
    wx.openSetting({
      withSubscriptions: true,
    }).then(res => {
      console.log(res)
    })
  },

  getUserInfo: function() {
    wx.getUserInfo().then(res => {
      this.login(res.userInfo)
    })
  },

  login: function(userInfo){
    wx.login().then(res => {
      if (res.code) {
        //本地储存
        wx.setStorageSync(wx.dbUserInfoKey, userInfo)
        wx.setStorageSync(wx.loginStatusKey, true)
        this.setData({
          isLogin: true,
          userInfo: userInfo
        })
      }
    })
  }
})