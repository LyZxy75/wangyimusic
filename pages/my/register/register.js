// pages/my/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",//手机号
    password: "",//密码
    sms: "",//验证码
    text: ""//昵称

  },
  // 输人的手机号
  get_phone() {

  },
  // 输入的密码
  get_password() {

  },
  // 输入的验证码
  get_sms() {

  },
  // 输入的昵称
  get_text() {

  },
  // 跳转登录页面
  getlogin() {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  // 注册
  register() {
    app.globalData.fly.get("/register/cellphone", {
      phone: this.data.phone,
      password: this.data.password,
      sms: this.data.sms,
      text: this.data.text
    }).then(res => {
      console.log(res)
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