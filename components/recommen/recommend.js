// components/recommend/recommend.js
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
    result: [] //接收推荐歌单接口获取的数据,截取六个数组
  },
  // 跳转歌单详情

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转歌单广场
    Square() {

    },
    song_sheet(e) {
      let id = e.currentTarget.dataset.item.id
      wx.navigateTo({
        url: `../../pages/home/songSheet/songSheet?id=${id}`,
      })
      console.log(id)
    },
    recommendation() {
      wx.showLoading({
        title: "加载中...",
      })
      app.globalData.fly.get(`/personalized`).then(res => {
        if (res.data) {
          wx.hideLoading()
          // 数组打乱,洗牌算法，高效，这种方法打乱10000个元素的数组来测试仅需要7，8毫秒的时间。
          let testArray = res.data.result;
          if (!Array.prototype.derangedArray) {
            Array.prototype.derangedArray = function() {
              for (let j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
              return this;
            };
          }
          // console.log(testArray.derangedArray()); //结果不唯一
          // 截取三个数组
          this.setData({
            result: testArray.derangedArray().slice(0, 6)
          })
          // console.log(this.data.result)        
        }
      }).catch(err => {
        wx.hideLoading()
        console.log(err)
      })
    }
  },
  ready() {
    this.recommendation()
  }

})