// pages/wear/wear.js
import { formatTime } from '../../utils/util.js';
import config from '../../config/config.js';
const DEFAULT_PAGE = 0;
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  startPageX: 0,
  currentView: DEFAULT_PAGE,
  data: {
    windowHeight: 0,
    weatherInfo: {},
    bannerCurrent: 0, // 当前显示的banner
    bannerData: [
      {
        wholeType: 5,
        label: '出游场景',
        tips: '天气有点凉，推荐穿暖色\n调的衣服哦，办公场合推荐采用\n不太会出错的相近色搭配\n原则呢！\n ❤'
      }
    ]
  },
  
  localCity: null,    // 本地城市
  currentCity: null,  // 查看城市

  // 初始化数据及判断登录态
  getData(weather) {
    var that = this;
    weather = parseInt(weather);
    var openid = null;
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        openid = res.data
        that.canGetData(weather, openid)
      },
      fail () {
        wx.showModal({
          title: '提示',
          content: '要先登录才可使用个性化功能哦~',
          success (res) {
            if (res.confirm) {
              that.getUserProfile()
            }
          }
        })
      }
    })
  },
  canGetData(weather, openid) {
    weather = 5
    var that = this
    wx.showLoading({
      title: '正在生成穿搭...',
    })
    wx.request({
      url: 'http://1.117.161.67:8081/fashion',
      method: 'GET',
      data: {
        weather: weather,
        openid: openid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success (res) {
        console.log(res.data)
        let data = res.data;
        if (data.upperCloth == null)
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
        that.showData();
      },
      fail() {
        wx.showToast({
          title: '网络错误',
          duration: 1500,
          icon:'error'
        })
      },
      complete (){
        wx.hideLoading()
      }
    })
  },
  // 数据渲染处理
  showData () {
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

  //获取天气接口
  //通过城市名查询天气
  searchByCity(city) {
    // 更新时间
    this.updateTime();
    // loading
    wx.showLoading({ title: '正在查询天气...'});
    // 通过城市名获取天气数据
    wx.request({
      url: config.request.host + '/area-to-weather?area=' + city + '&needIndex=1&needMoreDay=1',
      header: config.request.header,
      success: (res) => {
        if (res.data.showapi_res_body.ret_code == 0) {
          // 设置全局变量
          this.currentCity = res.data.showapi_res_body.cityInfo.c3
          var weatherArray = this.processData(res.data.showapi_res_body);
          this.getData(weatherArray[0].today.day_air_temperature)
          this.setData({ 
            weatherInfo: weatherArray[0]
          });
        } else {
          wx.showToast({  title: '查询天气失败',  icon: 'error' })
        }
      },
      fail: () => {
        wx.showToast({  title: '网络连接超时',  icon: 'error' })
      },
      complete() {
        wx.hideLoading()
      }
    });
  },
  //通过经纬度查询天气
  searchByLocation(latitude, longitude) {
    // 更新时间
    this.updateTime();
    wx.showLoading({ title: '正在查询天气...'});
    // 通过经纬度获取天气数据
    wx.request({
      url: `${config.request.host}/gps-to-weather?from=1&lat=${latitude}&lng=${longitude}&needIndex=1&needMoreDay=1`,
      data: {},
      header: config.request.header,
      success: (res) => {
        // 保存天气数据
        var weatherArray = this.processData(res.data.showapi_res_body);
        console.log(weatherArray[0])
        this.getData(weatherArray[0].today.day_air_temperature)
        this.setData({ 
          weatherInfo: weatherArray[0]
        });
        this.localCity = res.data.showapi_res_body.cityInfo.c3;
        this.currentCity = res.data.showapi_res_body.cityInfo.c3;
      },
      fail: () => {
        wx.hideToast();
        wx.showToast({  title: '网络连接超时',  icon: 'error' })
      },
      complete() {
        wx.hideLoading()
      }
    });
    },  
  //获取当前城市天气数据
  getLocalCityWeather() {
    wx.showLoading({ title: '正在定位...'});
    // 获取当前经纬度
    wx.getLocation({
      success: (res) => {
        this.searchByLocation(res.latitude, res.longitude);
      },
      fail: () => {
        wx.showModal({ title: '定位失败', content: '请开启定位信息', showCancel: false });
      },
      complete() {
        wx.hideLoading()
      }
    });
  },
  //更新时间
  updateTime() {
    const time = new Date(); // 获取当前时间对象
    const date = formatTime(time).split(' ')[0] + ' ' + this.formatWeekday(time.getDay()); // 获取日期和星期数
    this.setData({ date: date }); // 保存
  },
  //格式化星期数
  formatWeekday(index) {
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    return weekdays[index];
  }, 
  //处理天气数据
  processData(data) {
    const weatherInfo = {};
    // 城市信息
    weatherInfo.city = {};
    weatherInfo.city.id = data.cityInfo.c1;
    weatherInfo.city.name_en = data.cityInfo.c2;
    weatherInfo.city.name = data.cityInfo.c3;
    // 天气信息
    weatherInfo.now = data.now;
    weatherInfo.today = data.f1;
    weatherInfo.date = data.f1.day.slice(0,4) + '.' + data.f1.day.slice(4,6)+'.'+ data.f1.day.slice(6,8);
    var weatherArray = new Array();
    weatherArray.push(weatherInfo)
    return weatherArray;
  },

  // 获取用户信息
  getUserProfile() {
    var that = this
    wx.getUserProfile({
      desc: '展示用户信息',
      success: (user) => {
        console.log(user)
        wx.setStorage ({
          key: 'userInfo',
          data: user.userInfo
        }) 
        // 登录
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            if (res.code) {
              //发起网络请求
              console.log(res)
              wx.request({
                url: 'http://1.117.161.67:8081/login',
                data: {
                  code: res.code,
                  encryptedData: user.encryptedData,
                  iv: user.iv
                },
                method: 'GET',
                header: {
                  'content-type': 'application/json'
                },
                success(res) {
                  wx.showToast({
                    title: '登录成功',
                    icon: 'success',
                    duration: 1500
                  })
                  wx.setStorage({
                    key: 'openid',
                    data: res.data
                  })
                  that.canGetData()
                },
                complete(){
                  console.log(that.globalData.userInfo)
                },
                fail (err) {
                  console.log(err);
                  wx.showToast({
                    title: '登录失败',
                    icon: 'error',
                    duration: 1500
                  })
                } 
              })
            } else {
              console.log('登录失败！' + res.errMsg) 
              wx.showToast({
                title: '登录失败',
                icon: 'error',
                duration: 1500
              })
            }
          }
        })
      }
    })
  },

  // 刷新
  refresh() {
    var weather = this.data.weatherInfo.today.day_air_temperature
    if ( weather ) {
      this.getData(weather) 
    } else {
      if (this.currentCity) {
        this.searchByCity(this.currentCity);
      } else {
        this.getLocalCityWeather();
      }
    }
  },

  // 打分评价
  getScore (e) { 
    console.log("被评价的object：", e.detail.rateObj, "评分：", e.detail.value);
    wx.request({
      url: 'http://1.117.161.67:8081/comment',
      method: 'POST',
      data: {
        weather: this.data.weatherInfo.today.day_air_temperature,
        label: e.detail.rateObj,
        score: e.detail.value
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success () {
        wx.showToast({
          title: '打分成功',
          icon: 'none',
          duration: 1000
        })
      },
    })
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
    this.updateTime()
    this.getLocalCityWeather();
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