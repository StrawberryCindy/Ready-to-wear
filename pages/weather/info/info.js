// pages/weather/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // infoAll 是所有信息
    var infoAll = JSON.parse(decodeURIComponent(options.info))

    var info = new Array;
    info[0] = infoAll.uv;
    info[1] = infoAll.clothes;
    info[2] = infoAll.sports;
    info[3] = infoAll.beauty;
    info[4] = infoAll.cold;
    info[5] = infoAll.gj;
    info[6] = infoAll.wash_car;
    var infoName = ['防晒指数', '穿衣指数', '运动指数', '化妆指数', '感冒指数', '逛街指数', '洗车指数'];
    var infoSrc = ['/icons/weather/uv.png', '/icons/weather/dressing.png', '/icons/weather/sport.png', '/icons/weather/makeup.png', '/icons/weather/flu.png', '/icons/weather/shopping.png', '/icons/weather/car_washing.png']
    info.map(function(obj, index) {
      obj.name = infoName[index];
      obj.src = infoSrc[index]
    })
    console.log(info)
    this.setData({
      info: info
    })
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