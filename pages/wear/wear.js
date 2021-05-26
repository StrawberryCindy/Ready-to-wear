// pages/wear/wear.js
const DEFAULT_PAGE = 0;
Page({

  /**
   * 页面的初始数据
   */
  startPageX: 0,
  currentView: DEFAULT_PAGE,
  data: {
    windowHeight: 0,
    weatherInfoB: {
      date: ' 2021.04.15',
      temperature: '19~28℃',
      weather: '多云'
    },
    bannerCurrent: 0, // 当前显示的banner
    bannerData: [
      {
        'id': 1,
        'isOpenFilp': false, 
        'label': "可爱风",
        'type': 1,  // 1上下衣  2裙子  3外套+上下衣
        'upperCloth': {
          'src': "/images/coat.png", 
          'ilColor': {'R': 174, 'G': 192, 'B': 232},  // initial 图像原始的颜色
          'HSB':  { 'H': 0,  'S': 0,  'B': 0 },  // 转换时的 HSB 值
          'tgColor': {'R': 238, 'G': 130, 'B': 238}   // target 目标颜色
        },
        'downCloth': {
          'src': "/images/test2.png", 
          'ilColor': {'R': 223, 'G': 67, 'B': 72}, 
          'HSB':  { 'H': 0,  'S': 0,  'B': 0 }, 
          'tgColor': {'R': 240, 'G': 90, 'B': 147}
        },
        'outerCloth': null,
        'dress': null,
        'tip': ""
      },
      {
        'id': 2,
        'isOpenFilp': false, 
        'label': "约会装",
        'type': 2,
        'upperCloth': null,
        'downCloth': null,
        'outerCloth': null,
        'dress': {
          'src': '/images/dress.png',
          'ilColor': {'R': 223, 'G': 67, 'B': 72}, 
          'HSB':  { 'H': 0,  'S': 0,  'B': 0 }, 
          'tgColor': {'R': 255, 'G': 10, 'B': 147}
        },
        'tip': ''
      },
      { 'id': 3, 
        'isOpenFilp': false, 
        'label': "运动系",
        'type': 3,
        'upperCloth': {
          'src': "/images/test.png", 
          'ilColor': {'R': 223, 'G': 67, 'B': 72},
          'HSB':  { 'H': 0,  'S': 0,  'B': 0 },
          'tgColor': {'R': 255, 'G': 182, 'B': 193}
        },
        'downCloth': {
          'src': "/images/downpants.png", 
          'ilColor': {'R': 223, 'G': 67, 'B': 72}, 
          'HSB':  { 'H': 0,  'S': 0,  'B': 0 }, 
          'tgColor': {'R': 255, 'G': 10, 'B': 147}
        },
        'outerCloth': {
          'src': "/images/coat.png", 
          'ilColor': {'R': 174, 'G': 192, 'B': 232}, 
          'HSB':  { 'H': 0,  'S': 0,  'B': 0 }, 
          'tgColor': {'R': 238, 'G': 130, 'B': 248}
        },
        'dress': null,
        'tip': ''
      }
    ],
  },
  getDataTest() {
    var that = this
    let data = [{
    "wholeType": 1,	//1:上下衣 2:裙子 3:外套+上下衣
    "label": '可爱风',
    "tips": '天气有点凉，推荐穿暖色\n调的衣服哦，办公场合推荐采用\n不太会出错的相近色搭配\n原则呢！\n ❤',	
    "upperCloth": { 
      "inR": 174,					//原始RGB值
      "inG": 192,
      "inB": 232,
      "tgR": 238,					//目标RGB值
      "tgG": 130,
      "tgB": 238,
      "picurl": "/images/coat.png"			//图片地址
    },
    "downCloth": {  
      "inR": 223,					//原始RGB值
      "inG": 67,
      "inB": 72,
      "tgR": 240,					//目标RGB值
      "tgG": 90,
      "tgB": 147,
      "picurl": "/images/test2.png"
    }, 
    "outerCloth": null,
    "dress": null, 
  },{
    "wholeType": 1,	//1:上下衣 2:裙子 3:外套+上下衣
    "label": '通勤风',
    "tips": '今天紫外线很强，推荐擦防晒\n并且搭配外套防晒衣。 \n ❤',	
    "upperCloth": { 
      "inR": 174,					//原始RGB值
      "inG": 192,
      "inB": 232,
      "tgR": 238,					//目标RGB值
      "tgG": 130,
      "tgB": 238,
      "picurl": "/images/coat.png"			//图片地址
    },
    "downCloth": {  
      "inR": 223,					//原始RGB值
      "inG": 67,
      "inB": 72,
      "tgR": 240,					//目标RGB值
      "tgG": 90,
      "tgB": 147,
      "picurl": "/images/test2.png"
    }, 
    "outerCloth": null,
    "dress": null, 
  }];
    var bannerData = new Array;
    data.forEach(function(item, index) {
      bannerData[index] = new Object;
      bannerData[index] = item;
      bannerData[index].id = index + 1;
      bannerData[index].isOpenFilp = false;
    });
    that.setData({
      bannerData: bannerData
    })
  },
  // 初始化数据
  getData() {
    var that = this;
    wx.request({
      url: 'http://127.0.0.1/fashion',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success (res) {
        console.log(res.data)
        let data = res.data;
        var bannerData = new Array;
        data.forEach(function(item, index) {
          bannerData[index] = new Object;
          bannerData[index] = item;
          bannerData[index].id = index + 1;
          bannerData[index].isOpenFilp = false;
        });
        console.log(bannerData)
        that.setData({
          bannerData: bannerData
        })
      }
    })
  },
  // bannerSwiper
  bannerSwiper(e) {
    const that = this, bannerCurrent = e.detail.current;
    that.setData({
      bannerCurrent
    })
  },

  // 卡牌切换
  switchFlip: function (e) {
    const that = this;
    const index = e.currentTarget.dataset.index;
    const bannerData = that.data.bannerData;
    const isOpenFilp = that.data.bannerData[index].isOpenFilp ? false : true;
    bannerData[index].isOpenFilp = isOpenFilp;
    that.setData({
      bannerData
    });

  },
  touchStart(e) {
    this.startPageX = e.changedTouches[0].pageX;
  },
  touchEnd(e) {
    const moveX = e.changedTouches[0].pageX - this.startPageX;
    const maxPage = this.data.list.length - 1;
    if (Math.abs(moveX) >= 150) {
      if (moveX > 0) {
        this.currentView = this.currentView !== 0 ? this.currentView - 1 : 0;
      } else {
        this.currentView = this.currentView !== maxPage ? this.currentView + 1 : maxPage;
      }
    }
    this.setData({
      toView: `card_${this.currentView}`
    });
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
  
  // 处理各种衣服的颜色，将原RGB和目标RGB都转化为HSB后求差值
  dealUpperColor (i) {
    var cloth, hsbdelta = new Object;
    cloth = this.data.bannerData[i].upperCloth;
    hsbdelta = this.dealColor(cloth);
    var data_str =  'bannerData['+i+'].upperCloth.HSB'
    this.setData({
      [data_str] : hsbdelta
    })
  },
  dealDownColor (i) {
    var cloth = this.data.bannerData[i].downCloth;
    let hsbdelta = this.dealColor(cloth);
    var data_str =  'bannerData['+i+'].downCloth.HSB'
    this.setData({
      [data_str] : hsbdelta
    })
  },
  dealOuterColor (i) {
    var cloth = this.data.bannerData[i].outerCloth;
    let hsbdelta = this.dealColor(cloth);
    var data_str =  'bannerData['+i+'].outerCloth.HSB'
    this.setData({
      [data_str] : hsbdelta
    })
  }, 
  dealDressColor (i) {
    var cloth = this.data.bannerData[i].dress;
    let hsbdelta = this.dealColor(cloth);
    var data_str =  'bannerData['+i+'].dress.HSB'
    this.setData({
      [data_str] : hsbdelta
    })
  },
  
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 取出页面高度 windowHeight
    wx.getSystemInfo({
      success: res => {
        let clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;
        this.setData({
          windowHeight: calc,
        })
      }
    });  
    this.getDataTest();
    for ( var index = 0; index < this.data.bannerData.length; index++ ) {
      var card = new Object();
      card = this.data.bannerData[index];
      if (card.upperCloth) {
        this.dealUpperColor(index);
      }
      if (card.downCloth) {
        this.dealDownColor(index)
      }
      if (card.dress) {
        this.dealDressColor(index);
      }
      if (card.outerCloth) {
        this.dealOuterColor(index);
      }
    }
    console.log(this.data.bannerData)
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