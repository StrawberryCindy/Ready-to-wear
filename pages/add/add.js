// pages/add/add.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    clothContent:{
      options: [
        {  id: 1,  name: '短袖'  },
        {  id: 2,  name: '长袖'  }, 
        {  id: 3,  name: '毛衣'  }, 
        {  id: 4,  name: '羽绒服'  }, 
        {  id: 5,  name: '夹克'  },
        {  id: 6,  name: '西装外套'  }, 
        {  id: 7,  name: '连衣裙'  }, 
        {  id: 8,  name: '半身裙'  }, 
        {  id: 9,  name: '裤子'  }, 
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
        'colortype': 1, //颜色属性 1none 2warm 3cold   
        'rgb': {'R':248, 'G':248, 'B':255 },
        'isPick': true
      }, 
      {
        'id': 2,
        'colortype': 1,
        'rgb': {'R':0, 'G':0, 'B':0 },
        'isPick': false
      },
      {
        'id': 3,
        'colortype': 1,
        'rgb': {'R':137, 'G':137, 'B':137 },
        'isPick': false
      },
      {
        'id': 4,
        'colortype': 1,
        'rgb': {'R':194, 'G':194, 'B':194 },
        'isPick': false
      },
      {
        'id': 5,
        'colortype': 2,
        'rgb': {'R':255, 'G':182, 'B':193 },
        'isPick': false
      },
      {
        'id': 6,
        'colortype': 2,
        'rgb': {'R':255, 'G':192, 'B':203 },
        'isPick': false
      },
      {
        'id': 7,
        'colortype': 2,
        'rgb': {'R':255, 'G':105, 'B':180 },
        'isPick': false
      },
      {
        'id': 8,
        'colortype': 2,
        'rgb': {'R':205, 'G':92, 'B':92 },
        'isPick': false
      },
      {
        'id': 9,
        'colortype': 2,
        'rgb': {'R':255, 'G':0, 'B':0 },
        'isPick': false
      },
      {
        'id': 10,
        'colortype': 2,
        'rgb': {'R':220, 'G':20, 'B':60 },
        'isPick': false
      },
      {
        'id': 11,
        'colortype': 2,
        'rgb': {'R':255, 'G':165, 'B':0 },
        'isPick': false
      },
      {
        'id': 12,
        'colortype': 2,
        'rgb': {'R':255, 'G':222, 'B':173 },
        'isPick': false
      },
      {
        'id': 13,
        'colortype': 2,
        'rgb': {'R':255, 'G':250, 'B':205 },
        'isPick': false
      },
      {
        'id': 14,
        'colortype': 2,
        'rgb': {'R':240, 'G':230, 'B':140 },
        'isPick': false
      },
      {
        'id': 15,
        'colortype': 2,
        'rgb': {'R':255, 'G':215, 'B':0 },
        'isPick': false
      },
      {
        'id': 16,
        'colortype': 3,
        'rgb': {'R':34, 'G':139, 'B':34 },
        'isPick': false
      },
      {
        'id': 17,
        'colortype': 3,
        'rgb': {'R':154, 'G':205, 'B':50 },
        'isPick': false
      },
      {
        'id': 18,
        'colortype': 3,
        'rgb': {'R':144, 'G':238, 'B':144 },
        'isPick': false
      },
      {
        'id': 19,
        'colortype': 3,
        'rgb': {'R':157, 'G':190, 'B':243 },
        'isPick': false
      },
      {
        'id': 20,
        'colortype': 3,
        'rgb': {'R':176, 'G':224, 'B':230 },
        'isPick': false
      },{
        'id': 21,
        'colortype': 3, 
        'rgb': {'R':135, 'G':206, 'B':250 },
        'isPick': false
      }, 
      {
        'id': 22,
        'colortype': 3,
        'rgb': {'R':210, 'G':192, 'B':230 },
        'isPick': false
      },
      {
        'id': 23,
        'colortype': 3,
        'rgb': {'R':123, 'G':104, 'B':238 },
        'isPick': false
      },
      {
        'id': 24,
        'colortype': 3,
        'rgb': {'R':148, 'G':0, 'B':211 },
        'isPick': false
      },
      {
        'id': 25,
        'colortype': 3,
        'rgb': {'R':238, 'G':130, 'B':238 },
        'isPick': false
      },
      {
        'id': 26,
        'colortype': 3,
        'rgb': {'R':221, 'G':160, 'B':221 },
        'isPick': false
      },
    ],
    colorPicked: { 'id': 1, 'rgb': {'R':248, 'G':248, 'B':255 }}, // targetRGB
    inRGB: {}, // 图片原始颜色
    picurl: '',
    canPreview: 0,  // 0-default 1-ok
    HSB: { H:0, S:0, B:0 },
    lastSelect: []
  },

  // 用户选择颜色时的交互
  pickColor(e) {
    var rgb = new Object;
    var id = e.currentTarget.dataset.id;
    rgb = e.currentTarget.dataset.color; // rgb用于后续预览图片的变色处理
    let colorPicked = {id, rgb}
    var inRGB = this.data.inRGB;
    this.setData({
      'colorPicked': colorPicked
    })
    if (inRGB.R) { // 当原始衣物颜色存在时,即已请求过参数数据 & 修改颜色时
      var HSB = this.dealColor (this.data.inRGB)
      this.setData({
        HSB: HSB
      })
    }
    this.showColor(id);
  },
  // 颜色选中时的前端页面变化
  showColor (i) {
    // i表示当前选中颜色的id
    if (i) { i = i; } else { i = 0; }
    var str_pick = '';
    var that = this;
    that.setData({
      colors: that.data.colors.map(item=>{
        item.isPick = false
        return item
      })
    })
    str_pick =  'colors['+(i-1)+'].isPick';
    that.setData({
      [str_pick]: true
    })
  },
  // 衣物变色处理, 返回hsb对象
  dealColor (inRGB) {
    var that = this;  // 存在异步问题
    var R1 = inRGB.R;
    var G1 = inRGB.G;
    var B1 = inRGB.B;
    var R2 = that.data.colorPicked.rgb.R;
    var G2 = that.data.colorPicked.rgb.G;
    var B2 = that.data.colorPicked.rgb.B;

    let HSB1 = that.changeRGBtoHSB(R1, G1, B1)
    let HSB2 = that.changeRGBtoHSB(R2, G2, B2)
    var S = 0, B = 0;
    if ( HSB2[1] < HSB1[1] ) {
      S = parseFloat(((HSB2[1]) / HSB1[1]).toFixed(4));
    } else {
      S = 1 + parseFloat((HSB2[1] - HSB1[1]).toFixed(4));
    }
    if ( HSB2[2] < HSB1[2] ) {
      B = parseFloat(((HSB2[2]) / HSB1[2]).toFixed(4));
    } else {
      B = 1 + parseFloat((HSB2[2] - HSB1[2]).toFixed(4));
    }
    var hsbdelta = {
      H: parseFloat((HSB2[0] - HSB1[0]).toFixed(0)),
      S: S,
      B: B
    };
    return hsbdelta;
  },
  changeRGBtoHSB (R, G, B) {
    // 由小到大排序RGB, RGB[0]为min， RGB[2]为max
    var RGB = [R, G, B];
    RGB.sort(function(a, b){return a - b});
    let min = RGB[0], max = RGB[2];

    var hsbB = max/255, hsbS = 0, hsbH = 0;
    if ( max == 0 ) {
      hsbS = 0;
    }else{
      hsbS = (max-min)/max;
    }
    if ( max == 0 || min == 255 ) {
      hsbH = 0;
    } else if (max == R && G >= B) {
      hsbH = 60*(G-B) / (max-min);
    } else if (max == R && B > G) {
      hsbH = 60*(G-B) / (max-min) + 360;
    } else if (max == G) {
      hsbH = 60*(B-R) / (max-min) + 120;
    } else if (max == B) {
      hsbH = 60*(R-G) / (max-min) + 240;
    }
    var HSB = [hsbH, hsbS, hsbB];
    return HSB;
  },
  // 页面衣物属性变化时
  change (e) {
    var str = e.currentTarget.id + '.selected';
    this.setData({
      [str]: e.detail
    })
    this.checkAll()
  },
  close() {
    // 关闭select
    this.selectComponent('#clothContent').close();
    this.selectComponent('#lengthContent').close();
    this.selectComponent('#tightContent').close();
    this.selectComponent('#thiContent').close();
    this.checkAll()
  },
  // 检查所有属性---→ 判断是否可以预览衣物
  checkAll () {
    var that = this;
    let select = new Array;
    select[0] = this.data.clothContent.selected.id;
    select[1] = this.data.lengthContent.selected.id;
    select[2] = this.data.tightContent.selected.id;
    select[3] = this.data.thiContent.selected.id;
    for (var index =0; index<4; index++){
      if ( !select[index] ) {
        return;
      }
    }
    // 选择项全不为初始值0, 开始预览
    select.forEach(function(item, index) {
      if (item !== that.data.lastSelect[index]) {
        that.setData({
          lastSelect: select
        })
        that.previewImg()
        return;
      }
    })
  },

  previewImgTest () {
    var that = this;
    var res = {
      picurl: '/images/coat.png',
      inR: 172,
      inG: 194,
      inB: 232
    }
    let inRGB = {R:res.inR, G:res.inG, B:res.inB};
    let HSB = that.dealColor(inRGB);
    that.setData({
      picurl: res.picurl,
      canPreview: 1,
      inRGB: inRGB,
      HSB: HSB
    })
  },

  // 预览衣物接口
  previewImg () {
    console.log(this.data.lastSelect, '发送预览图片请求')
    var that = this;
    // 发送请求之前先清空掉原有的（用于网络不好的情况）
    that.setData({
      picurl: '',
      inRGB: {}
    })
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'http://222.16.61.214:8081/preview',
      data: {
        type: that.data.clothContent.selected.id,
        clothlength: that.data.lengthContent.selected.id,
        tightness: that.data.tightContent.selected.id,
        thi: that.data.thiContent.selected.id
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success (res) {
        console.log(res.data)
        wx.hideLoading()
        if (res.data.length) {
          let data = res.data[0];
          let inRGB = {R:data.inR, G:data.inG, B:data.inB};
          let HSB = that.dealColor(inRGB);
          that.setData({
            picurl: data.picurl,
            canPreview: 1,
            inRGB: inRGB,
            HSB: HSB
          })
        } else {
          wx.showToast({
            title: '未找到该属性衣物 是小明的问题 QAQ',
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail (e) {
        console.log(e)
        wx.hideLoading()
        wx.showToast({
          title: '网络连接失败',
          icon: 'error',
          duration: 1500
        })
      },
      complete (e) {
        wx.hideLoading()
      }
    })
  },

  // 确认添加衣物及登录判断
  confirm() {
    var that = this;
    var id = that.data.colorPicked.id;
    var colortype = 0;
    let colors = that.data.colors;
    for (var i = 0 ; i<colors.length; i++) {
      if (colors[i].id == id) {
        colortype = colors[i].colortype;
        break;
      }
    }
    var openid = null;
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        openid = res.data
        that.canAdd(openid, id, colortype)
      },
      fail () {
        wx.showModal({
          title: '提示',
          content: '要先登录才可使用个性化功能哦~',
          success (res) {
            if (res.confirm) {
              app.getUserProfile()
            }
          }
        })
      }
    })
  },
  // 通过登录，请求添加接口
  canAdd (openid, id, colortype) {
    var that = this;
    if (this.data.picurl) {
      wx.showLoading({
        title: '加载中...',
      }) 
      wx.request({
        url: 'http://222.16.61.214:8081/add',
        data: {
          tgR: that.data.colorPicked.rgb.R,
          tgG: that.data.colorPicked.rgb.G,
          tgB: that.data.colorPicked.rgb.B,
          colortype: colortype,
          code: id,
          openid: openid
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success (res) {
          console.log(res)
          let inRGB = {R:res.inR, G:res.inG, B:res.inB};
          let HSB = that.dealColor(inRGB);
          that.setData({
            canPreview: 1,
            inRGB: inRGB,
            HSB: HSB
          })
          wx.showToast({
            title: '添加成功！', // 标题
            icon: 'success',    // 图标类型，默认success
            duration: 1500,      // 提示窗停留时间，默认1500ms
            success: function(){ 
              setTimeout(function () { 
                  wx.navigateBack({ 
                    delta: 0,
                  }) 
              }, 1500) 
            }
          })
        },
        fail (e) {
          console.log(e)
        },
        complete() {
          wx.hideLoading()
        }
      })
    } else {
      wx.showToast({
        title: '您的数据还没选完哦 ┐(´∇｀)┌',
        icon: 'none',
        duration: 1500
      })
    }
  },

  // 解析除颜色外的所有数据
  selectedInit (str, id) {
    // string 要对应解析的字段名，如'clothContent' 
    var stringToObj = {
      'clothContent': this.data.clothContent.options,
      'lengthContent': this.data.lengthContent.options,
      'tightContent': this.data.tightContent.options,
      'thiContent': this.data.thiContent.options
    }
    var options = stringToObj[str];
    var selected = options[id - 1];
    return selected;
  },

  //解析颜色
  colorInit (id) {
    var colorPicked = new Object;
    colorPicked.id = id;
    colorPicked.rgb = this.data.colors[ id - 1 ].rgb;
    this.setData({
      'colorPicked': colorPicked
    })
    console.log('Pick', this.data.colorPicked)
    this.showColor(id);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 对 从个人页面传参 route进来的 对象进行 解json操作
    if (JSON.stringify(options) !== '{}') {
      if (options.allSelected) {
        var allSelectedId = JSON.parse(options.allSelected);
        var allSeleted = new Array;
        allSeleted[0] = this.selectedInit('clothContent', allSelectedId[0]);
        allSeleted[1] = this.selectedInit('lengthContent', allSelectedId[1]);
        allSeleted[2] = this.selectedInit('tightContent', allSelectedId[2]);
        allSeleted[3] = this.selectedInit('thiContent', allSelectedId[3]);
        this.colorInit(allSelectedId[4]);
        this.setData({
          'clothContent.selected': allSeleted[0],
          'lengthContent.selected': allSeleted[1],
          'tightContent.selected': allSeleted[2],
          'thiContent.selected': allSeleted[3],
        })
        console.log('修改---传入数据', allSeleted)
      } else {
        var clothSelected = JSON.parse(options.clothSelected);
        clothSelected = this.selectedInit('clothContent', clothSelected.id);
        this.setData({
          'clothContent.selected' : clothSelected
        })
      }
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