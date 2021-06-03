// pages/weather/weather.js
import { formatTime } from '../../utils/util.js';
import config from '../../config/config.js';

Page({
  data: {
    date: '',         // 日期
    weatherInfo: {},  // 天气数据
    inputContent: '', // 输入框内容
    weatherTheme: '#9999CC' // 根据天气修改的背景色
  },

  localCity: null,    // 本地城市
  currentCity: null,  // 查看城市

  onLoad() {
    this.getAuthority()
  },
  onshow() {
    this.updateTime();    // 设置时间
    // 获取天气
    if (this.currentCity) {
      this.searchByCity(this.currentCity);
      } else {
      this.getAuthority();
    }
  },

  /* 获取定位授权 */
  getAuthority(){
    wx.getSetting({
      success: (res) => {
        // res.authSetting['scope.userLocation']  undefined-表示初始化进入该页面 false-表示非初始化进入该页面,且未授权
        if (res.authSetting['scope.userLocation'] != true) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              this.updateTime();    // 设置时间
              // 获取天气
              this.getLocalCityWeacher();
            },
            fail: function(error) {
              wx.showModal({
                title: '提示',
                content: '您未开启定位权限，请点击确定去开启权限！',
                success(res) {
                  if (res.confirm) {
                    wx.openSetting()
                  }
                },
                fail: function() {
                  wx.showToast({
                    title: '未获取定位权限，请重新打开设置',
                    icon: 'none',
                    duration: 2000 
                  })
                }
              })
            }
          })
        } else {
          this.updateTime();    // 设置时间
          // 获取天气
          this.getLocalCityWeacher();
        }
      }
    })
  },
  /* 跳转气象信息详情页 */
  toDetail(e) {
    console.log('进入气象信息详情页', e.data)

  },
  /**
   * 更新时间
   */
  updateTime() {
    const time = new Date(); // 获取当前时间对象
    const date = formatTime(time).split(' ')[0] + ' ' + this.formatWeekday(time.getDay()); // 获取日期和星期数
    this.setData({ date: date }); // 保存
  },


  /**
   * 获取当前城市天气数据
   */
  getLocalCityWeacher() {
    wx.showToast({ title: '正在定位...', icon: 'loading', duration: 2000000, });
    // 获取当前经纬度
    wx.getLocation({
      success: (res) => {
        this.searchByLocation(res.latitude, res.longitude);
      },
      fail: () => {
        wx.hideToast();
        wx.showModal({ title: '定位失败', content: '获取不到本地天气了呢！', showCancel: false, });
      }
    });
  },

  /**
   * 通过经纬度查询天气
   * @param {number} latitude 纬度
   * @param {number} longitude 经度
   */
  searchByLocation(latitude, longitude) {
    // 更新时间
    this.updateTime();
    wx.showToast({ title: '正在查询...', icon: 'loading', duration: 2000000 });
    // 通过经纬度获取天气数据
    wx.request({
      url: `${config.request.host}/gps-to-weather?from=1&lat=${latitude}&lng=${longitude}&needIndex=1&needMoreDay=1`,
      data: {},
      header: config.request.header,
      success: (res) => {
        // 保存天气数据
        var weatherArray = this.processData(res.data.showapi_res_body);
        this.setData({ 
          weatherInfo: weatherArray[0],
          weatherTheme: weatherArray[1]
        });
        this.localCity = res.data.showapi_res_body.cityInfo.c3;
        this.currentCity = res.data.showapi_res_body.cityInfo.c3;
        wx.hideToast();
      },
      fail: () => {
        wx.hideToast();
        wx.showModal({ title: '网络超时', content: '连接服务器失败,请检查网络设置！', showCancel: false });
      }
    });
  },

/**
 * 通过城市名查询天气
 * @param {string} city 
 */
  searchByCity(city) {
    // 更新时间
    this.updateTime();
    // loading
    wx.showToast({ title: '正在加载...', icon: 'loading', duration: 2000000 });
    // 通过城市名获取天气数据
    wx.request({
      url: config.request.host + '/area-to-weather?area=' + city + '&needIndex=1&needMoreDay=1',
      header: config.request.header,
      success: (res) => {
        wx.hideToast();
        if (res.data.showapi_res_body.ret_code == 0) {
          // 设置全局变量
          this.currentCity = res.data.showapi_res_body.cityInfo.c3
          var weatherArray = this.processData(res.data.showapi_res_body);
          this.setData({ 
            weatherInfo: weatherArray[0],
            weatherTheme: weatherArray[1]
          });
        } else {
          wx.showModal({ title: '查询失败', content: '输入的城市名称有误，请重新输入！', showCancel: false });
        }
      },
      fail: () => {
        wx.hideToast()
        wx.showModal({ title: '网络超时', content: '当前网络不可用,请检查网络设置！', showCancel: false });
      }
    });
  },

  /**
   * 刷新
   */
  refresh() {
    if (this.currentCity) {
      this.searchByCity(this.currentCity);
      } else {
      this.getAuthority();
    }
  },

  /**
   * 处理天气数据
   * @param {object} data 数据
   */
  processData(data) {
    const weatherInfo = {};
    // 城市信息
    weatherInfo.city = {};
    weatherInfo.city.id = data.cityInfo.c1;
    weatherInfo.city.name_en = data.cityInfo.c2;
    weatherInfo.city.name = data.cityInfo.c3;
    // 天气信息
    weatherInfo.now = data.now;
    var weatherTheme = ''
    switch (weatherInfo.now.weather_code) {
      case '00' : weatherTheme = '#FFCC66';
      break;
      case '01': weatherTheme = '#CC9999';
      break;
      case '20', '29', '30', '31':  weatherTheme = '#CC9966';
      break;
      default:  weatherTheme = '#006699'
    };
    weatherInfo.today = data.f1;
    var weatherArray = new Array();
    weatherArray.push(weatherInfo)
    weatherArray.push(weatherTheme)
    return weatherArray;
  },

  /**
   * 格式化星期数
   * @param {number} index 星期数
   */
  formatWeekday(index) {
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    return weekdays[index];
  },

  /**
   * 点击刷新按钮
   */
  onRefreshBtnClick() {
    this.refresh();
  },
});