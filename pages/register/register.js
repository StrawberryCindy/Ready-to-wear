// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
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
        contents: []
      },
      {
        id: 2,
        kind: '长袖',
        contents: []
      },
      {
        id: 3,
        kind: '毛衣',
        contents: []
      },
      {
        id: 4,
        kind: '棉服',
        contents: []
      },
      {
        id: 5,
        kind: '夹克',
        contents: []
      },
      {
        id: 6,
        kind: '西装外套',
        contents: []
      },
      {
        id: 7,
        kind: '连衣裙',
        contents: []
      },
      {
        id: 8,
        kind: '半身裙',
        contents: []
      },
      {
        id: 9,
        kind: '裤子',
        contents: []
      }
    ]
  },
  scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
  },
  addNew: function(e) {
    // 传递对象参数要转成json格式
    var clothSelected = JSON.stringify( e.currentTarget.dataset)
    wx.navigateTo({
      url: "../add/add?clothSelected=" + clothSelected,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})