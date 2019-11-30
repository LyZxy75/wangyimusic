// components/program/program.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    com_program: [] //接收推荐节目接口获取的数据,截取六个数组
  },
  ready() {
    this.recommended_program()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转更多节目
    program() {

    },
    recommended_program() {
      wx.showLoading({
        title: "加载中...",
      })
      app.globalData.fly.get(`/program/recommend`).then(res => {//推荐节目
        // console.log(res)
        if (res.data) {
          wx.hideLoading()
          // 数组打乱,洗牌算法，高效，这种方法打乱10000个元素的数组来测试仅需要7，8毫秒的时间。
          let testArray = res.data.programs;
          if (!Array.prototype.derangedArray) {
            Array.prototype.derangedArray = function() {
              for (let j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
              return this;
            };
          }
          // console.log(testArray.derangedArray()); //结果不唯一
          // 截取三个数组
          this.setData({
            com_program: testArray.derangedArray().slice(0, 6)
          })
          // console.log(this.data.com_program)
        }
        // }
      }).catch(err => {
        wx.hideLoading()
        console.log(err)
      })
    }
  }
})