Component({
  properties: {
    content: {
      type: Object,
      value: {}
    },
    selected:{
      type: Object,
      value: {}
    }
    // 传入的数据结构为
    // contents :{
    //  options: { id: int, name: text },
    //  selected: {},
    // }
  },
  data: {
    isShow: false,
    defaultOption: {
      id: 0,
      name: '请选择'
    }
  },
  methods: {
    optionTap(e) {
      let dataset = e.target.dataset
      this.setData({
        selected: dataset
      })

      // 调用父组件方法，并传参
      this.triggerEvent("change", { ...dataset })
      console.log(this.data.selected)
      this.close()
    },
    openClose() {
      this.setData({
        isShow: !this.data.isShow
      })
    },

    // 此方法供父组件调用
    close() {
      this.setData({
        isShow: false
      })
    }
  },
  lifetimes: {
    // 组件生命周期声明对象，将组件的生命周期收归到该字段进行声明，原有声明方式仍旧有效，如同时存在两种声明方式，则lifetimes字段内声明方式优先级最高
    attached: function () {
    }
  },
  observers: {
   
  }
})