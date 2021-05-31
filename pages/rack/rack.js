//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
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
    ],
    toDelete: 0
  },
  scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
  },
  // 进入衣物详情页（修改衣物信息）
  toDetail (e) {
    console.log(e.currentTarget.dataset.content)
    var content = e.currentTarget.dataset.content;
    var allSelected = new Array;
    allSelected[0] = content.type;
    allSelected[1] = content.clothlength;
    allSelected[2] = content.tightness;
    allSelected[3] = content.thi;
    allSelected[4] = content.code; // color ID
    allSelected = JSON.stringify(allSelected)
    wx.navigateTo({
      url: "../add/add?allSelected=" + allSelected
    })
  },
  // 添加衣物
  addNew: function(e) {
    // 传递对象参数要转成json格式
    var clothSelected = JSON.stringify( e.currentTarget.dataset)
    wx.navigateTo({
      url: "../add/add?clothSelected=" + clothSelected,
    })
  },
  // 长按-->模态框
  handleLongPress: function (e) {
    var cloid = e.currentTarget.dataset.content.cloid;
    this.setData({
      toDelete: cloid
    })
    this.showModal();
  },
  
  // 删除功能前的登录判断
  modalDelete: function (e) {
    this.hideModal();
    var openid = null;
    var that = this
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        openid = res.data
        that.canDelete(openid)
      },
      fail: function() {
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
  canDelete(openid) {
    // 请求删除接口 
    var that = this;
    wx.showLoading({
      title: '请求删除中...',
    })
    wx.request({
      url: 'http://222.16.61.214:8081/delete',
      method: 'POST',
      data: {
        cloid: that.data.toDelete,
        openid: openid
      },
      header: {
        'content-type':'application/x-www-form-urlencoded'
      },
      success () {
        that.initData();
        wx.showToast({
          title: '删除成功！',
          icon: 'success',
          duration: 1500
        })
      },
      fail () {
        wx.showToast({
          title: '删除失败！',
          icon: 'error',
          duration: 1500
        })
      },
      complete() {
        wx.hideLoading()
      }
    })
  },
  modalCancel: function (e) {
    this.hideModal();
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
  initData (openid) {
    console.log('初始化数据')
    var that = this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'http://222.16.61.214:8081/closet', 
      data: {
        openid: openid
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success (res) {
        console.log(res.data)
        // cloth[[],[],[]...] 二维数组，每个内部元素对应 cloth.contents
        var cloth = new Array(9);
        for( var i =0; i < cloth.length; i++) {
          cloth[i] = new Array;
        }
        let data = res.data;
        data.forEach(function(item, index) {
          item.HSB = that.dealColor(item);
          cloth[item.type - 1].push(item); // 根据item.type值存入相应的数组
        });
        var clothConStr = new Array(8);
        for( var i =0; i < cloth.length; i++) {
          clothConStr[i] = 'cloth.['+i+'].contents'
          that.setData({
            [clothConStr[i]]: cloth[i]
          })
        }
      },
      fail (e) {
        console.log(e)
      },
      complete() {
        wx.hideLoading()
      }
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
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () { 
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
  onShow () {
    var that = this
    var openid = null;
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        openid = res.data
        that.initData(openid);
      },
      fail () {
        wx.showModal({
          title: '提示',
          content: '要先登录才可使用个性化功能哦~'
        })
      }
    })
  }
})
