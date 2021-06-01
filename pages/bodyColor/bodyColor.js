// pages/bodyColor/bodyColor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    requireList: [
      {
        title: '1. 观察自己的腕关节，静脉血管更接近于',
        A: '蓝色',
        B: '绿色'
      },
      {
        title: '2. 自己穿一件黑的衣服，看起来',
        A: '像生病了一样',
        B: '很漂亮，很精神。'
      },
      {
        title: '3. 把一张白纸放在你素颜的脸附近，你的肤色看起来如何？',
        A: '没有明显的瑕疵',
        B: '肤色看起来晦暗'
      },
      {
        title: '4. 金色与银色的眼影，自己更适合',
        A: '银色',
        B: '金色'
      },
      {
        title: '5. 如果不涂防晒出门，你的皮肤会',
        A: '发红',
        B: '被晒成黄褐色'
      },
      {
        title: '6.你的眼睛颜色属于',
        A: '黑色或者深棕色',
        B: '棕色'
      }
    ],
    colorData: [],  // 2默认值 0选A 1选B
    colorType: 3, // 0冷色调 1暖色调 2中性肤色
    colors: [
      {
        title: '哇哦，恭喜你！\n是稀有的 冷色调 皮肤哦~',
        clothTip: '♥ 大部分颜色都能令你白皙的皮肤更亮丽动人，色系当中尤以黄色系与蓝色系最能突出洁白的皮肤，令整体显得明艳照人，色调如淡橙红、柠檬黄、苹果绿、紫红、天蓝等明亮色彩最适合不过 \n ',
        lipstick: '♥ 一般来说，冷皮更合适融入蓝色基地的冷唇色，比如玫粉、深红、玫瑰色等 \n  ♡ 不适合明度过高的荧光色，比如荧光粉、荧光橘、以及饱和度低的浅唇色，比如米白、米粉'
      },
      {
        title: 'Hello~ \n你是温暖的暖色调皮肤',
        clothTip: '♥ 暖色的人适合一些茶褐色系，令你看来文艺。墨绿、枣红、咖啡色、金黄色都会使你看来自然高雅\n ♡ 相反蓝色系则与你格格不入，最好别穿蓝色系的上衣。',
        lipstick: '♥ 暖皮更适合融入黄色基底的暖唇色，比如大红、橙红、橘红等 \n ♡ 不适合融入蓝色基底的冷唇色，比如深红、玫红、裸粉，以及同肤色过于相近的颜色，比如裸色、浅肉桂色。'
      },
      {
        title: '好耶ヾ(✿ﾟ▽ﾟ)ノ！\n你是万能的自然色调~',
        clothTip: '♥ 其实你可以放心大胆地穿各种颜色的衣服！！黑白的经典搭配，近几年流行的奶蓝色和baby粉，还有还有小明偷偷给你推荐纯欲风，夏天和吊带最搭了~',
        lipstick: '♡ 别死亡芭比粉就行哈哈哈'
      }
    ],
    reportPic: [
      {
        id: 0,
        src: '/images/bodyColor/white.png',
        title: '冷色调皮肤'
      },
      {
        id: 2,
        src: '/images/bodyColor/mid.png',
        title: '自然肤色'
      },
      {
        id: 1,
        src: '/images/bodyColor/warm.png',
        title: '暖色调皮肤'
      }
    ],
    report: {}
  },
 // bannerSwiper
  bannerSwiper(e) {
    const that = this, bannerCurrent = e.detail.current;
    that.setData({
      bannerCurrent
    })
  },
  getAns(e) {
    var data = e.currentTarget.dataset
    console.log(data)
    // str 对象外的selected，用于生成报告
    var str = 'colorData['+ data.index+']'
    var ansIndex = 2;
    if (data.ans == 'A') {
      ansIndex = 0;
    } else {
      ansIndex = 1;
    }
    this.setData({
      [str]: ansIndex
    })
  },
  checkReport () {
    var colorData = new Array;
    var anum = 0, bnum = 0; 
    colorData = this.data.colorData
    console.log(colorData)
    if (colorData.length !== 6) {
      wx.showToast({
        title: '您的数据还没填完哦 ┐(´∇｀)┌',
        icon: 'none',
        duration: 1500
      })    
      return;
    } else {
      console.log(colorData)
      colorData.forEach(function(item, index) {
        if (item == 1) {
          bnum = bnum+1;
        } else if (item == 0) {
          anum = anum+1;
        }
        });
      // 本地存储
      wx.setStorage({
        key: 'colorData',
        data: colorData
      })
      this.report(anum, bnum)
      // 页面渲染
      this.showModal()
    }
  },
  // 生成肤色报告
  report (anum, bnum) {
    var colorType = 3;
    if (anum > bnum) {
      colorType = 0 // 0冷色调 1暖色调 2中性肤色
    } else if (anum < bnum) {
      colorType = 1
    } else {
      colorType = 2
    }
    console.log(colorType)
    this.setData({
      colorType: colorType,
      report: this.data.colors[colorType]
    })
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    wx.getStorage({
      key: 'colorData',
      success: function(res) {
        console.log(res)
        that.setData({
          colorData: res.data
        })
      }
    })
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