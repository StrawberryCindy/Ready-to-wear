// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs) 
  },
  watch: function (method) {
    var obj = this.globalData
    Object.defineProperty(obj, 'userInfo', {
      configurable: true,
      enumerable: true,
      set: function (value) {
        this._name = value;
        method(value);
      },
      get: function(){
        return this._name
      }
    })
  },
  globalData: {
    userInfo: null
  },
  getUserProfile() {
    var that = this
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (user) => {
        console.log(user)
        // 登录
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            if (res.code) {
              //发起网络请求
              console.log(res)
              wx.showLoading({
                title: '登录ing...',
              })
              wx.request({
                url: 'http://1.117.161.67:8081/login',
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
                  wx.showToast({
                    title: '登录成功',
                    icon: 'success',
                    duration: 1500
                  })
                  that.globalData.userInfo = user.userInfo;
                  wx.setStorage ({
                    key: 'userInfo',
                    data: user.userInfo
                  }) 
                  wx.setStorage({
                    key: 'openid',
                    data: res.data
                  })
                },
                complete(){
                  console.log(that.globalData.userInfo)
                  wx.hideLoading()
                },
                fail (err) {
                  console.log(err);
                  wx.showToast({
                    title: '登录失败',
                    icon: 'error',
                    duration: 1500
                  })
                } 
              })
            } else {
              console.log('登录失败！' + res.errMsg) 
              wx.showToast({
                title: '登录失败',
                icon: 'error',
                duration: 1500
              })
            }
          }
        })
      }
    })
  }
})