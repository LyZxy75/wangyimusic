// pages/singer/singer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,    
    letter_index: 0,
    letters:'热',
    Letter: [
      "热",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z"
    ],
    Singer: [
      "入驻歌手",
      "华语男歌手",
      "华语女歌手",
      "华语组合/乐队",
      "欧美男歌手",
      "欧美女歌手",
      "欧美组合/乐队",
      "日本男歌手",
      "日本女歌手",
      "日本组合/乐队",
      "韩国男歌手",
      "韩国女歌手",
      "韩国组合/乐队",
      "其他男歌手",
      "其他女歌手",
      "其他组合/乐队"
    ]
  },
  branch(event) {
    // console.log(event)
    this.setData({
      letter_index: event.currentTarget.dataset.index,
      letters: event.currentTarget.dataset.item      
    })
    // console.log(this.data.letter_index)
    // console.log(this.data.letters)

  },
  onChange(event) {
    // console.log(event);
    this.setData({
      active: event.detail.name
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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