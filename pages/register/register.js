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
   // 衣物颜色处理，将RGB转化为HSB差值
   dealColor (cloth) {
    var R1 = cloth.inR;
    var G1 = cloth.inG;
    var B1 = cloth.inB;
    
    var R2 = cloth.tgR;
    var G2 = cloth.tgG;
    var B2 = cloth.tgB;

    let HSB1 = this.changeRGBtoHSB(R1, G1, B1)
    let HSB2 = this.changeRGBtoHSB(R2, G2, B2)
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
  
  initDataTest () {
    var that = this;
    console.log('虚拟初始化数据')
    let data = [{
      "cloid": 1,	// 衣物id
      "tgR": 131,		// 目标RGB值
      "tgG": 8,
      "tgB": 131,
      "code": 5,	//色彩码，1-26
      "inR": 123,		//原始RGB值
      "inG": 41,
      "inB": 22,
      "type": 2,			//衣物属性：种类 1短袖 2长袖 3毛衣 4棉服 5夹克 6西装外套 7连衣裙 8半身裙 9裤子
      "clothlength": 3,		//衣物属性：长度 1短 2中 3长
      "tightness": 2,		//衣物属性：松紧 1紧 2宽
      "thi": 3,				//衣物属性：薄厚 1薄 2中 3厚
      "picurl": "../../images/coat.png"		//图片地址
    },
    {  
      "cloid": 1,	// 衣物id
      "tgR": 199,		// 目标RGB值
      "tgG": 30,
      "tgB": 199,
      "code": 8,	//色彩码，1-26
      "inR": 123,		//原始RGB值
      "inG": 51,
      "inB": 199,
      "type": 2,			//衣物属性：种类 1短袖 2长袖 3毛衣 4棉服 5夹克 6西装外套 7连衣裙 8半身裙 9裤子
      "clothlength": 3,		//衣物属性：长度 1短 2中 3长
      "tightness": 2,		//衣物属性：松紧 1紧 2宽
      "thi": 3,				//衣物属性：薄厚 1薄 2中 3厚
      "picurl": "../../images/coat.png"		//图片地址
    },
  
    {  
      "cloid": 1,	// 衣物id
      "tgR": 12,		// 目标RGB值
      "tgG": 213,
      "tgB": 89,
      "code": 13,	//色彩码，1-26
      "inR": 123,		//原始RGB值
      "inG": 41,
      "inB": 22,
      "type": 1,			//衣物属性：种类 1短袖 2长袖 3毛衣 4棉服 5夹克 6西装外套 7连衣裙 8半身裙 9裤子
      "clothlength": 3,		//衣物属性：长度 1短 2中 3长
      "tightness": 2,		//衣物属性：松紧 1紧 2宽
      "thi": 3,				//衣物属性：薄厚 1薄 2中 3厚
      "picurl": "../../images/test1.png"		//图片地址
    },
    {  
      "cloid": 1,	// 衣物id
      "tgR": 12,		// 目标RGB值
      "tgG": 213,
      "tgB": 89,
      "code": 1,	//色彩码，1-26
      "inR": 123,		//原始RGB值
      "inG": 41,
      "inB": 22,
      "type": 3,			//衣物属性：种类 1短袖 2长袖 3毛衣 4棉服 5夹克 6西装外套 7连衣裙 8半身裙 9裤子
      "clothlength": 3,		//衣物属性：长度 1短 2中 3长
      "tightness": 2,		//衣物属性：松紧 1紧 2宽
      "thi": 3,				//衣物属性：薄厚 1薄 2中 3厚
      "picurl": "../../images/test.png"		//图片地址
    }];
    var cloth = new Array(8);
    for( var i =0; i < cloth.length; i++) {
      cloth[i] = new Array;
    }
    data.forEach(function(item, index) {
      item.HSB = that.dealColor(item);
      cloth[item.type - 1].push(item); // 根据item.type值存入相应的数组
    });
    var clothConStr = new Array(8);
    for( var i =0; i < cloth.length; i++) {
      clothConStr[i] = 'cloth.['+i+'].contents'
      this.setData({
        [clothConStr[i]]: cloth[i]
      })
    }
    console.log(that.data.cloth)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initDataTest();
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