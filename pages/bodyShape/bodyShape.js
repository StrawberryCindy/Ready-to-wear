// pages/bodyShape/bodyShape.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [
      { "id": 1, "project": "肩围", "unit": "cm" },
      { "id": 2, "project": "胸围", "unit": "cm" },
      { "id": 3, "project": "腰围", "unit": "cm" },
      { "id": 4, "project": "臀围", "unit": "cm" }
    ],
   bodyData: [],
   showMesMtd: 0,
   styles: [
      {
        title: '草莓型身材（T型）',
        url: '/images/style1.jpg',
        dsc: '肩膀宽或厚，手臂粗壮，骨架大，上身宽，下身细，身材呈倒三角形，呈草莓形状。',
        tip: '上窄下宽，扬长避短，注意下半身亮点打造，适合伞裙或阔腿裤，适合v领合身肩线款。\n 避免落肩袖，泡泡袖，垫肩（可能会让肩膀看起来更宽呜呜(つД`)）。'
      },
      {
        title: '矩形身材（H型）',
        url: '/images/style2.jpg',
        dsc: '胸部，腰部和臀部尺码相差不大，髋骨也比较窄小，没有明显的腰部曲线。',
        tip: '一定要尝试人为制造腰线！！\n 1.比如用材质挺括的、下摆的高腰裙或A字裙 来制造腰胯的宽度差；\n 2.通过腰带或腰封制造腰线；\n 3.用层次感中和扁平，如长外套；\n 4.或通过加肩宽、胯宽的方法，如加肩垫然后搭配高腰。'
      },
      {
        title: '梨形身材（A型）',
        url: '/images/style3.jpg',
        dsc: '一般上身相对较瘦，臀宽腰细腿粗。',
        tip: '弱化下半身，重点移至上半身，稍微要让上半身看起来有肉一些，显得身材匀称。\n 适合有肩部设计的衣服，增加上半身的力量感。\n 避免穿过于净身的下装，可以穿高腰的小A字群或阔腿裤等。也可以尝试oversize风格的穿搭，让上半身显得不那么单薄，同时适当的小面积印花设计的上装也能让把关注点放在上半身。'
      },
      {
        title: '沙漏型身材（X型）',
        url: '/images/style4.jpg',
        dsc: '肩围与臀围尺码基本一致，匀称身形，腰围较细，三围比例适中，并且有明显的腰部曲线。',
        tip: ' 发挥优点，呈现曲线优势，突出自己的小蛮腰。\n 不是特别丰满的X型身材穿搭选择较多，但不适宜穿过于紧身的下装，因为这样会使下身显得更粗壮，且应避开如垫肩、泡泡袖类会使肩线扩大，身材比例失衡的上装。\n &&较丰满的mm在选择面料的时候不要选太光面有膨胀感的材质哦~'
      }
    ],
    styleShow: {}
  },
  // 显示测量方法
  showMesMtd () {
    this.setData({
      showMesMtd: !this.data.showMesMtd
    })
  },
  //获取当前用户输入的指标信息,并动态改变页面内容
  getInput: function (e) {
    let x = parseInt( e.currentTarget.dataset.name) - 1;
    let data = e.detail.value;
    var str = 'bodyData['+x+']';
    this.setData({
      [str]: data
    })
  },
  checkReport () {
    var bodyData = new Array;
    bodyData = this.data.bodyData
    if (bodyData.length !== 0) {
      bodyData.forEach(function(item, index) {
        if (item == 0) {
          this.noReport()
          return;
        }
      });
      console.log(bodyData)
      // 本地存储
      wx.setStorage({
        key: 'bodyData',
        data: bodyData
      })
      // 页面渲染
      let style = this.report(bodyData[0], bodyData[1], bodyData[2], bodyData[3])
      console.log('style', style)
      if (style) {
        this.setData({
          styleShow: this.data.styles[style - 1]
        })
      } else {
        //未查询到身体参数结果的情况
        this.setData({
          styleShow: null
        })
      }
      this.showModal()
    } else {
      this.noReport()
    }
  },
  noReport() {
    wx.showToast({
      title: '您的数据还没填完哦 ┐(´∇｀)┌',
      icon: 'none',
      duration: 1500
    })    
  },
  // 判断身材类型>> 
  // 0：无   1:倒三角身材(T)   2：矩形身材(H)  3:梨型身材(A)  4:沙漏型身材(X)
  report(shoulder, chest, waist, hip){ 
    var style = 0;

    var a=(shoulder-hip)/shoulder;
    var b=(chest-hip)/chest;
    var c=(shoulder-chest)/shoulder;
    var d=(hip-waist)/hip;
    var e=(shoulder-waist)/shoulder
    var f=(hip-chest)/hip
    var g=(hip-shoulder)/hip;
    var h=(chest-waist)/chest;
    if(a>0.05 || b>0.05) {
      style=1
    } else {
      if( 0<=c<0.05 && 0<=a<0.05 && ( 0<=f<0.05 || 0<=b<0.05) && 0<=e<0.25 && 0<=d<0.25) {
        style=2
      } else {
        if(g>0.05||f>0.05){ 
          style=3
        } else if( 0<=c<0.05 && e>0.25 && h>0.25 && d>0.25 ){
          style=4
        } else { style = 0 }
      }
    }
    return style
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
    var that = this
    wx.getStorage({
      key: 'bodyData',
      success: function(res) {
        that.setData({
          bodyData: res.data
        })
      }
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