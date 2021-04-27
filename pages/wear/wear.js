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
        'label': "通勤风",
        'upperCloth': "/images/test.png",
        'downCloth': "",
        'shoes': ""
      },
      {
        'id': 2,
        'isOpenFilp': false, 
      },
      { 'id': 3, 
        'isOpenFilp': false, 
      },
      { 'id': 4, 
        'isOpenFilp': false, 
      }
    ],
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

    const query = wx.createSelectorQuery()
    query.select('#myCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')

        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)

        //ctx.fillRect(0, 0, 100, 100)

        const img  = canvas.createImage();
        img.onLoad = () => {
          console.log("1")
          ctx.drawImage(img, 10, 10, 100, 100);
        }
        
        img.src = this.data.bannerData[0].upperCloth;
 
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