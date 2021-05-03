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
    colors: [
      {
        'id': 1,
        'type': 1, //颜色属性 1none 2warm 3cold   
        'rgb': {'R':248, 'G':248, 'B':255 },
        'isPick': true
      }, 
      {
        'id': 2,
        'type': 1,
        'rgb': {'R':0, 'G':0, 'B':0 },
        'isPick': false
      },
      {
        'id': 3,
        'type': 1,
        'rgb': {'R':137, 'G':137, 'B':137 },
        'isPick': false
      },
      {
        'id': 4,
        'type': 1,
        'rgb': {'R':194, 'G':194, 'B':194 },
        'isPick': false
      },
      {
        'id': 5,
        'type': 2,
        'rgb': {'R':255, 'G':182, 'B':193 },
        'isPick': false
      },
      {
        'id': 6,
        'type': 2,
        'rgb': {'R':255, 'G':192, 'B':203 },
        'isPick': false
      },
      {
        'id': 7,
        'type': 2,
        'rgb': {'R':255, 'G':105, 'B':180 },
        'isPick': false
      },
      {
        'id': 8,
        'type': 2,
        'rgb': {'R':205, 'G':92, 'B':92 },
        'isPick': false
      },
      {
        'id': 9,
        'type': 2,
        'rgb': {'R':255, 'G':0, 'B':0 },
        'isPick': false
      },
      {
        'id': 10,
        'type': 2,
        'rgb': {'R':220, 'G':20, 'B':60 },
        'isPick': false
      },
      {
        'id': 11,
        'type': 2,
        'rgb': {'R':255, 'G':165, 'B':0 },
        'isPick': false
      },
      {
        'id': 12,
        'type': 2,
        'rgb': {'R':255, 'G':222, 'B':173 },
        'isPick': false
      },
      {
        'id': 13,
        'type': 2,
        'rgb': {'R':255, 'G':250, 'B':205 },
        'isPick': false
      },
      {
        'id': 14,
        'type': 2,
        'rgb': {'R':240, 'G':230, 'B':140 },
        'isPick': false
      },
      {
        'id': 15,
        'type': 2,
        'rgb': {'R':255, 'G':215, 'B':0 },
        'isPick': false
      },
      {
        'id': 16,
        'type': 3,
        'rgb': {'R':34, 'G':139, 'B':34 },
        'isPick': false
      },
      {
        'id': 17,
        'type': 3,
        'rgb': {'R':154, 'G':205, 'B':50 },
        'isPick': false
      },
      {
        'id': 18,
        'type': 3,
        'rgb': {'R':144, 'G':238, 'B':144 },
        'isPick': false
      },
      {
        'id': 19,
        'type': 3,
        'rgb': {'R':157, 'G':190, 'B':243 },
        'isPick': false
      },
      {
        'id': 20,
        'type': 3,
        'rgb': {'R':176, 'G':224, 'B':230 },
        'isPick': false
      },{
        'id': 21,
        'type': 3, 
        'rgb': {'R':135, 'G':206, 'B':250 },
        'isPick': false
      }, 
      {
        'id': 22,
        'type': 3,
        'rgb': {'R':210, 'G':192, 'B':230 },
        'isPick': false
      },
      {
        'id': 23,
        'type': 3,
        'rgb': {'R':123, 'G':104, 'B':238 },
        'isPick': false
      },
      {
        'id': 24,
        'type': 3,
        'rgb': {'R':148, 'G':0, 'B':211 },
        'isPick': false
      },
      {
        'id': 25,
        'type': 3,
        'rgb': {'R':238, 'G':130, 'B':238 },
        'isPick': false
      },
      {
        'id': 26,
        'type': 3,
        'rgb': {'R':221, 'G':160, 'B':221 },
        'isPick': false
      },
    ],
    colorPicked: {}, //targetRGB
    showImage: '/images/test1.png'
  },
  pickColor(e) {
    var rgb = new Object;
    var id = e.currentTarget.dataset.id;
    rgb = e.currentTarget.dataset.color;
    this.setData({
      'colorPicked': rgb
    })
    console.log('Pick',this.data.colorPicked)
    this.initColor(id);
  },
  initColor (i) {
    if (i) { i = i; } else { i = 0; }
    var str = '';
    var str_pick = '';
    var that = this;
    for (var index = 0; index < this.data.colors.length; index++) {
      str = 'colors['+index+'].isPick';
      that.setData({
        colors: that.data.colors.map(item=>{
          item.isPick = false
          return item
        })
      })
    }
    str_pick =  'colors['+(i-1)+'].isPick';
    that.setData({
      [str_pick]: true
    })
  },
  // 以下代码用于取色器，暂不删除了
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