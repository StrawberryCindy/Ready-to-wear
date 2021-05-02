// pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clothContent:{
      options: [
        {  id: 1,  name: '短袖'  },
        {  id: 2,  name: '长袖'  }, 
        {  id: 3,  name: '裤子'  }, 
        {  id: 4,  name: '半身裙'  }, 
        {  id: 5,  name: '连衣裙'  },
        {  id: 6,  name: '毛衣'  }, 
        {  id: 7,  name: '夹克'  }, 
        {  id: 8,  name: '西装外套'  }, 
        {  id: 9,  name: '羽绒服'  }, 
      ],
      selected: {id: 0, name: ''}
    },
    lengthContent: {
      options: [
        { id: 1, name: '短款'},
        { id: 2, name: '适中'},
        { id: 3, name: '长款'}
      ],
      selected: {id: 0, name: ''}
    },
    tightContent: {
      options: [
        { id: 1, name: '修身'},
        { id: 2, name: '宽松'}
      ],
      selected: {id: 0, name: ''}
    },
    thiContent: {
      options: [
        { id: 1, name: '薄'},
        { id: 2, name: '适中'},
        { id: 3, name: '厚'}
      ],
      selected: {id: 0, name: ''}
    },
    rgb: 'rgb(0,154,97)',//初始值
    pick: false
  },
  // 显示取色器
  toPick: function () {
    this.setData({
      pick: true
    })
  },
  //取色结果回调
  toPick: function () {
    this.setData({
      pick: true
    })
  },
  pickColor(e) {
    console.log(e.detail.color)
    this.setData({
      rgb: e.detail.color
    })
  },
  changeStyle (e) {
    console.log(e)
    this.data.styleContent.selected = e.detail
  },
  close() {
    // 关闭select
    this.selectComponent('#selectCloth').close();
    this.selectComponent('#selectLength').close();
    this.selectComponent('#selectStyle').close();
    this.selectComponent('#selectThi').close();
  },

  //选择改色时触发（在左侧色盘触摸或者切换右侧色相条）
  onChangeColor(e) {
    //返回的信息在e.detail.colorData中
    this.setData({
      colorData: e.detail.colorData
    })
  },
  
  // 确认添加衣服
  confirm() {
    wx.navigateBack({
      delta: 0,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 对 从个人页面传参 route进来的 对象进行 解json操作
    if (JSON.stringify(options) !== '{}') {
      var clothSelected =  JSON.parse(options.clothSelected);
      this.setData({
        'clothContent.selected' : clothSelected
      })
    }
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