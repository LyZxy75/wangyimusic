// pages/singer/singerDetails/singerDetails.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    singer_information: {}, //歌手信息
    singer_songs: {}, //歌手热门单曲
    singer_id: '', //歌手id
  },
  //获取歌手单曲
  getsingerDetails() {
    wx.showLoading({
      title: '加载中...',
    })
    app.globalData.fly.get(`/artists?id=${this.data.singer_id}`) //点击后请求
      .then(res => {
        if (res.data) {
          wx.hideLoading()
          this.setData({
            singer_information: res.data.artist, //歌手信息            
            singer_songs: res.data.hotSongs  //歌手热门单曲数据
          })
          // console.log(res.data.artist);
          // console.log(res.data.hotSongs);

        }
      }).catch(err => {
        wx.hideLoading()
        console.log(err);
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      singer_id: options.singer_id // 接收singer传过来的歌手id
    })
    console.log(this.data.singer_id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getsingerDetails()
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