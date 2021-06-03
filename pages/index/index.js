//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: app.globalData.userInfo,
    hasUserInfo: app.globalData.hasUserInfo,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    windowHeight: 400,
    nav: [
      { 
        'title': '测测你是什么『身形』 >>>',
        'toUrl': '/pages/bodyShape/bodyShape',
        'color': '#FFF8DC',
        logo: '/images/index/body.png'
      },
      { 
        'title': '测测你是什么『肤色』 >>>',
        'toUrl': '/pages/bodyColor/bodyColor',
        'color': '#f5eaf8',
        logo: '/images/index/color.png'
      }
    ]
  },
  goto(e) {
    var url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: url
    })
  }, 
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () { 
    let that = this;
    if ( wx.getUserProfile ) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    // 取出页面高度 windowHeight
    wx.getSystemInfo({
      success: res=> {
        let clientHeight = res.windowHeight,
            clientWidth = res.windowWidth,
            rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;
        this.setData({
          windowHeight: calc
        })
      }
    });
    getApp().watch(that.watchBack)
  },
  watchBack: function (value){
    if (value) {
      this.setData({
        userInfo: value,
        hasUserInfo: true
      })
    }
  },
  onShow() {
    var that = this
    // 判断用户是否登录
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({
          userInfo: res.data,
          hasUserInfo: true
        })
      }
    })
  },
  getUserProfile(e) {
    app.getUserProfile()
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
