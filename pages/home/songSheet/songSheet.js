// pages/home/songSheet/songSheet.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songsheet_id: 2385384236, //接收首页推荐歌单recommend穿过来的id
    songsheet: [],//歌单分类所有详情
    s: [],
    whole: []//点击单个歌曲传整个列表的id

  },
  // 播放全部
  play_all() {

  },
  // 收藏
  collection() {

  },
  // 播放,跳转播放页面，并将所有歌曲id和index以数组的方式传过去
  music(e) {
console.log(e)
    JSON.stringify(this.data.whole);
    wx.navigateTo({
      url: `../../play/play?item=${JSON.stringify(this.data.whole)}&index=${e.currentTarget.dataset.index}`,
    })
  },
  //获取歌单详情
  getsongsheet() {
    wx.showLoading({
      title: '加载中...',
    })
    app.globalData.fly.get('/playlist/detail', {
      id: this.data.songsheet_id,
      s: this.data.s
    }).then(res => {
      if (res.data) {
        wx.hideLoading()
        this.setData({
          songsheet: res.data.playlist
        })
        //把歌曲所有id都push进去

        this.data.songsheet.tracks.map((item) => {//点击单个歌曲传整个列表的id
          this.data.whole.push(item.id)
        });
                    console.log(this.data.whole);
      }
      console.log(res.data.playlist)
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.id) {
      this.setData({
        songsheet_id: options.id
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getsongsheet()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})