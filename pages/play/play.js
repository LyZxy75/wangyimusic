// pages/play/play.js
const app = getApp()
const bgMusic = wx.getBackgroundAudioManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Music: [], //播放歌曲的所有详情
    display: 'order', //判断按顺序，单曲，随机标签
    plays: 'start', //判断开始，暂停标签
    colle: 'ction', //判断收藏，取消收藏标签
    jump: {}, //播放歌曲的所有详情
    song_index: 0, //获取所有id的下标
    valueNum: 0, //获取进度条当前值(实时更新的值)
    sliderMax: 0, //处理后的进度条最大值
    sliderMin: 0, //进度条最小值
    sliderMax1: 0, //未处理的进度条最大值(秒)
    suspend: true, //控制旋转图片的暂停   
    src: ''
  },
  request() {
    //加载图标
    wx.showLoading({
      title: "加载中..."
    });
    // 获取歌单详情
    app.globalData.fly.get(`/song/detail?ids=${this.data.jump[this.data.song_index]}`) //播放歌曲的所有详情
      .then(res => {

        this.setData({
          Music: res.data.songs
        })
        console.log(this.data.Music)
        // console.log(this.data.Music[0].id);
        // 获取音乐url
        app.globalData.fly.get(`song/url?id=${this.data.Music[0].id}`).then(res => {
          this.setData({
            src: res.data.data[0].url
          })
          console.log(res.data.data[0].url);
          bgMusic.title = this.data.src//背景音频必须设置title，否则会报错
          bgMusic.src = this.data.src ///音乐url          
          bgMusic.onTimeUpdate(() => { //监听音频播放进度更新事件 
            let times = bgMusic.currentTime
            // console.log(times)
            this.setData({
              valueNum: parseInt(bgMusic.currentTime) //获取进度条当前值(实时更新的值)
            })
            // console.log(this.data.valueNum)
            let minute1 = parseInt(this.data.valueNum / 60); //分钟
            let sec1 = parseInt(this.data.valueNum % 60); //秒
            if (minute1.toString().length === 1) {
              minute1 = `0${minute1}`
            }
            if (sec1.toString().length === 1) {
              sec1 = `0${sec1}`
            }
            this.setData({
              sliderMin: `${minute1}:${sec1}` //处理后的进度条时间 00:00 往上加(实时更新)
            })
            // console.log(this.data.sliderMin)
            // console.log(this.data.valueNum);

          });
          setTimeout(() => {

            let time = bgMusic.duration;
            console.log(bgMusic.duration);
            this.setData({
              sliderMax1: bgMusic.duration //未处理的歌曲总时长(秒)
            })
            // console.log(this.data.sliderMax1 + '789')
            let minute = parseInt(time / 60); //分钟
            let sec = parseInt(time % 60); //秒
            if (minute.toString().length === 1) {
              minute = `0${minute}`
            }
            if (sec.toString().length === 1) {
              sec = `0${sec}`
            }

            this.setData({
              sliderMax: `${minute}:${sec}` //处理后的歌曲总时长00:00
            })
            // console.log(this.data.sliderMax + '564')
          }, 1000);
          wx.hideLoading(); // 取消加载提示框
        }).catch(e => {
          console.log(e);
        })
      })
      .catch(e => {
        console.log(e);
      })
  },
  // 播放模式
  pattern() {
    if (this.data.display === 'order') { //判断按顺序，单曲，随机标签
      bgMusic.loop = true //是否循环播放
      this.setData({
        display: 'single',
      })
    } else if (this.data.display === 'single') {
      this.setData({
        display: 'random',
      })
    } else if (this.data.display === 'random') {

      this.setData({
        display: 'order',

      })
    }
  },
  // 播放、暂停
  mode() {
    if (this.data.plays === 'suspend') {
      bgMusic.play(); //播放
      this.setData({
        plays: 'start',
        suspend: true
      })
    } else if (this.data.plays === 'start') { //判断开始，暂停标签      
      bgMusic.pause(); //暂停
      this.setData({
        plays: 'suspend',
        suspend: false
      })

    }
  },
  // 收藏
  like() {
    if (this.data.colle === 'ction') { //判断收藏，取消收藏标签
      this.setData({
        colle: 'cancel'
      })
    } else if (this.data.colle === 'cancel') {
      this.setData({
        colle: 'ction'
      })
    }
  },
  // 上一首
  upper() {
    if (this.data.song_index > 0) {
      this.setData({
        song_index: this.data.song_index * 1 - 1
      })
      console.log(this.data.song_index);
      this.request()
    } else {
      this.setData({
        song_index: this.data.jump.length - 1
      })
      console.log(this.data.song_index);
      this.request()
    }
  },
  // 下一首
  lower() {
    if (this.data.song_index < this.data.jump.length - 1) {
      this.setData({
        song_index: this.data.song_index * 1 + 1
      })
      console.log(this.data.song_index);
      this.request()
    } else {
      this.setData({
        song_index: 0
      })
      console.log(this.data.song_index);
      this.request()
    }

  },
  Speed(event) {
    console.log(event)
    this.setData({
      valueNum: event.detail.value
    })
    console.log(this.data.valueNum)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // songSheet传过来的数据，点击单个歌曲播放传过来整个列表的id
    // console.log(options)
    this.setData({
      jump: JSON.parse(options.item),//整个列表的所有id
      song_index: options.index//每个歌曲对应在列表中的下标
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.request()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    bgMusic.onEnded(() => {

    })
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