// components/newDish/newDish.js
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
    albums: [], //接收云音乐首页新碟接口获取的数据,截取六个数组
    flag: 1, //切换新碟、新歌 动态属性
    song_data: [] //接收云音乐首页新歌速递接口获取的数据,截取六个数组
  },
  ready() {
    this.newDish()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转更多新碟
    stillMore() {

    },
    // 新碟
    newd() {
      this.setData({
        flag: 1
      })
    },
    // 新歌
    songs() {
      this.setData({
        flag: 2
      })
      this.newsong()
    },
    newDish() {
      wx.showLoading({
        title: "加载中...",
      })
      app.globalData.fly.get(`/album/newest`).then(res => {//新碟
        // console.log(res)
        if (res.data) {
          wx.hideLoading()
          // 数组打乱,洗牌算法，高效，这种方法打乱10000个元素的数组来测试仅需要7，8毫秒的时间。
          let testArray = res.data.albums;
          if (!Array.prototype.derangedArray) {
            Array.prototype.derangedArray = function() {
              for (let j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
              return this;
            };
          }
          // console.log(testArray.derangedArray()); //结果不唯一
          // 截取三个数组
          this.setData({
            albums: testArray.derangedArray().slice(0, 6)
          })
          // console.log(this.data.albums)
        }
      }).catch(err => {
        wx.hideLoading()
        console.log(err)
      })
    },
    newsong() {
      wx.showLoading({
        title: "加载中...",
      })
      app.globalData.fly.get(`/top/song`).then(res => {//新歌
        console.log(res)
        if (res.data) {
          wx.hideLoading()
          // 数组打乱,洗牌算法，高效，这种方法打乱10000个元素的数组来测试仅需要7，8毫秒的时间。
          let testArray = res.data.data;
          if (!Array.prototype.derangedArray) {
            Array.prototype.derangedArray = function () {
              for (let j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
              return this;
            };
          }
          // console.log(testArray.derangedArray()); //结果不唯一
          // 截取三个数组
          this.setData({
            song_data: testArray.derangedArray().slice(0, 6)
          })
          console.log(this.data.song_data)
        }
      }).catch(err => {
        wx.hideLoading()
        console.log(err)
      })
    },
    song_sheet(e) {
      let id = e.currentTarget.dataset.item.id
      wx.navigateTo({
        url: `../../pages/home/songSheet/songSheet?id=${id}`,
      })
      console.log(id)
    }

  }
})