// pages/my/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    phone: "", //手机号
    password: "", //密码
    uid: '', //用户id
    email: "", //邮箱    
  },

  //输入的手机号
  get_phone(e) {
    let number = e.detail
    if (number.length >= 11) {
      number = number.substring(0, 11)
      let myreg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
      if (myreg.test(number)) {
        this.setData({
          phone: e.detail
        })
      } else {
        wx.showToast({
          title: '手机号格式不正确',
          icon: 'none'
        })
      }
    } else {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      })

    }

  },
  //输入的密码
  get_password(e) {
    this.setData({
      password: e.detail
    })

  },
  //输入的邮箱
  get_email(e) {
    this.setData({
      email: e.detail
    })
  },
  //跳转立即注册页面
  Register() {
    wx.navigateTo({
      url: '../register/register',
    })
  },
  //手机登录立即登录按钮
  getlogin() {

    //手机登录
    app.globalData.fly.get("/login/cellphone", {
      phone: this.data.phone,
      password: this.data.password
    }).then(res => {
      // console.log(res)
      //登录成功
      if (res.data.code === 200) {
        wx.showToast({
          title: "登录成功",
          icon: 'loading...'
        })
        this.setData({
          uid: res.data.account.id
        })
        // 本地存储手机号   
        wx.setStorage({
          key: 'phone',
          data: this.data.phone,
        })
        // 本地存储用户id
        wx.setStorage({
          key: 'uid',
          data: this.data.uid,
        })
        //登录成功跳转首页
        wx.switchTab({
          url: '../../my/my',
        })
      }

    }).catch((err) => {
      if (err) {
        wx.showToast({
          title: '手机号或密码错误',
          icon: 'none',

        })
      }
    })
  },
  //邮箱登录立即登录按钮
  getmailboxlogin() {
    //邮箱登录
    app.globalData.fly.get("/login", {
      email: this.data.email,
      password: this.data.password
    }).then(res => {
      console.log(res)
      //登录成功
      if (res.data.code === 200) {
        wx.showToast({
          title: "登录成功",
          icon: 'loading...'
        })
        this.setData({
          uid: res.data.account.id
        })
        // 本地存储邮箱账号   
        wx.setStorage({
          key: 'email',
          data: this.data.email,
        })
        // 本地存储用户id
        wx.setStorage({
          key: 'uid',
          data: this.data.uid,
        })
        //登录成功跳转首页
        wx.switchTab({
          url: '../../my/my',
        })
      }

    }).catch(() => {
      wx.showToast({
        title: '邮箱或密码错误',
        icon: 'none'
      })
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