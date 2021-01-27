// miniprogram/pages/luckyPan/luckyPan.js
const db = wx.cloud.database();
//获取指定的集合
const collection = db.collection("luckyGift");

const loopCount = 8

Page({
  data: {
    luckyGift: [],
    isStart: false,
    currentIndex: -1,
    speed: 120
  },
  onLoad: function (options) {
    collection.get().then(res => {
      for (let i = 0; i < res.data.length; i++) {
        let item = res.data[i];
        this.data.luckyGift.push(item);
      }
      this.setData({
        luckyGift: this.data.luckyGift
      });
    });
  },
  onStartBtnClick: function() {
    if (this.data.isStart) return
    this.data.isStart = true
    //随机出结果
    let result = Math.floor(Math.random() * 8)
    let currentLoop = 1
    console.log("中奖号", result)
    //自执行函数
    let count = -1;
    !(function interval(self) {
      setTimeout(() => {
        count++
        if (count > 7) {
          currentLoop++
          count = 0
        }
        if (currentLoop < loopCount / 2) {
          self.setData({
            speed: self.data.speed - 2
          })
        } else if (currentLoop == loopCount / 2) {
          self.setData({
            speed: 120
          })
        } else if (currentLoop == loopCount && count == result - 3) {
          self.setData({
            speed: 180
          })
        } else if (currentLoop == loopCount && count == result - 2) {
          self.setData({
            speed: 190
          })
        } else if (currentLoop == loopCount && count == result - 1) {
          self.setData({
            speed: 200
          })
        } else if (currentLoop > loopCount / 2) {
          self.setData({
            speed: self.data.speed + 5
          })
        }
        if (result == count && currentLoop == loopCount) {
          //中奖弹窗
          wx.showModal({
            title: '中奖了',
            content: '你中奖了',
          })
          self.setData({
            speed: 120,
            isStart: false,
            currentIndex: -1
          })
        } else {
          interval(self)
        }
        self.setData({
          currentIndex: count
        })
      }, self.data.speed)
    })(this)
  }
})