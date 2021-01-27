// components/nav-bar/nav-bar.js
Component({
  properties: {
    title: {
      type: String,
      value: ""
    },
    titleColor: {
      type: String,
      value: "black"
    },
    barColor: {
      type: String,
      value: "white"
    },
    isBack: {
      type: Boolean,
      value: false
    }
  },
  data: {
    statusBarHeight: 0,
    navBarHeight: 0
  },
  methods: {
    onBackBtnClick: function() {
      wx.navigateBack({
        delta: 1
      })
    }
  },
  lifetimes: {
    attached: function() {
      const systemInfo = wx.getSystemInfoSync()
      this.setData({
        statusBarHeight: systemInfo.statusBarHeight,
        navBarHeight: systemInfo.platform == 'android' ? 48 : 44
      })
    }
  }
})
