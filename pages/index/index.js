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
    cloth: [
      {
        id: 1,
        kind: '短袖',
        contents: [{  src:"../../icons/Tshirt.png" },  {  src: "../../icons/Tshirt.png" }]
      },
      {
        id: 4,
        kind: '短裙',
        contents: [{  src: "../../icons/skirt.png" }]
      },
      {
        id: 5,
        kind: '连衣裙',
        contents: [{  src: "../../icons/dress.png" },{  src: "../../icons/dress.png" },{  src: "../../icons/dress.png" }]
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
    // 传递对象参数要转成json格式
    var clothSelected = JSON.stringify( e.currentTarget.dataset)
    wx.navigateTo({
      url: "../add/add?clothSelected=" + clothSelected,
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
    if (wx.getUserProfile) {
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
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
    this.initData();
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  initData () {
    wx.request({
      url: '/closet', 
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
        // cloth[[],[],[]...] 二维数组，每个内部元素对应 cloth.contents
        var cloth = new Array(8);
        for( var i =0; i < cloth.length; i++) {
          cloth[i] = new Array;
        }
        let data = res.data;
        data.forEach(function(item, index) {
          console.log(item)
          cloth[type - 1].push(item);
        })
        var clothConStr = new Array(8);
        for( var i =0; i < cloth.length; i++) {
          clothConStr[i] = 'cloth.['+i+'].contents'
          this.setData({
            [clothConStr[i]]: cloth[i]
          })
        }
      }
    })
  }
})
