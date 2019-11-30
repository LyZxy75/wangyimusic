// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '', //手机号
    uid: '', //用户id
    level: '', //用户等级
    profile: {} //装用户信息
  },
  //跳转登录页面
  login() {
    wx.navigateTo({
      url: './login/login',
    })
  },
  //跳转编辑资料页面
  editing() {
    wx.navigateTo({
      url: './mystuff/mystuff',
    })
  },
  // 退出登录
  sing_out() {
    app.globalData.fly.get("/logout").then(res => {
      if(wx.removeStorageSync(`uid`)){
        this.setData({
          uid: ""
        })
      }
     
    })
  },
  // 获取用户信息
  getuserDetails() {
    app.globalData.fly.get("/user/detail", {
      uid: this.data.uid
    }).then(res => {
    if(res){
      this.setData({
        level: res.data.level,
        profile: res.data.profile
      })
      // console.log(this.data.level)
      // console.log(this.data.profile)
      console.log(res.data)
    }
    })
  },
  //登录状态
  // status() {
  //   app.globalData.fly.get("/login/status").then(res => {
  //     cons.log(res)
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getuserDetails()
    // this.status()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 获取本地存储的手机号、用户id
    this.setData({
      phone: wx.getStorageSync(`phone`),
      uid: wx.getStorageSync(`uid`)

    })
    // console.log(this.data.phone)
    // console.log(this.data.uid)

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