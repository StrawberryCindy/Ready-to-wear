//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    windowHeight: 400,
    cloth: [
      {
        id: 1,
        kind: '上衣',
        contents: [
          {
            src:"../../icons/Tshirt.png"
          },
          {
            src: "../../icons/Tshirt.png"
          }
        ]
      },
      {
        id: 2,
        kind: '下衣',
        contents: [{
          src: "../../icons/skirt.png"
        }]
      },
      {
        id: 3,
        kind: '连衣裙',
        contents: [
          {
            src: "../../icons/dress.png"
          },
          {
            src: "../../icons/dress.png"
          },
          {
            src: "../../icons/dress.png"
          }
        ]
      }
      ]
  },
  scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
  },
  handleLongPress: function (e) {
    this.showModal();
  },
  modalDelete: function (e) {
    this.hideModal();
  },
  modalCancel: function (e) {
    this.hideModal();
  },
  addNew: function(e) {
    console.log(e.currentTarget.id)
    let id = e.currentTarget.id
    wx.navigateTo({
      url: "../add/add?id=" +id,
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  }, 
  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
