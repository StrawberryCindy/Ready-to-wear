//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    windowHeight: 400,
    nav: [
      { 
        'title': '测测你是什么身形 >>>',
        'toUrl': '/pages/bodyShape/bodyShape',
        'color': '#f5eaf8'
      },
      { 
        'title': '测测你是什么肤色 >>>',
        'toUrl': '/pages/bodyColor/bodyColor',
        'color': '#FFF8DC'
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
  },
  onShow () {
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (user) => {
        console.log(user)
        this.setData({
          userInfo: user.userInfo,
          hasUserInfo: true
        })
        // 登录
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            if (res.code) {
              //发起网络请求
              console.log(res)
              wx.request({
                url: 'http://222.16.61.214:8081/login',
                data: {
                  code: res.code,
                  encryptedData: user.encryptedData,
                  iv: user.iv
                },
                method: 'GET',
                header: {
                  'content-type': 'application/json'
                },
                success(res) {
                  console.log(res)
                },
                complete(){

                },
                fail (err) {
                  console.log(err);
                } 
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }
    })
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
