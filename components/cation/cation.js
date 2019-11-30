// components/cation/cation.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number //点击后请求
    },
    letters: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    song: [],
    lete:'热',    
    category: [
      5001,
      1001,
      1002,
      1003,
      2001,
      2002,
      2003,
      6001,
      6002,
      6003,
      7001,
      7002,
      7003,
      4001,
      4002,
      4003
    ]
  },
  ready() {    
  },
  // 微信小程序数据监听器，相当于Wacth，只有一般组件有
  observers:{
    // 父组件传过来的数据对象
    letters(val){
      this.setData({
        lete: val
      })
      // console.log(this.data.lete)
      this.Music()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

    // 歌手类型对应的歌手列表数据
    Music() {
      if (this.data.lete === '热') {
        wx.showLoading({
          title: '加载中...',
        })
        app.globalData.fly.get(`/artist/list?cat=${this.data.category[this.properties.index]}`) //点击后请求
          .then(res => {
            if (res.data.artists) {
              wx.hideLoading()
              this.setData({
                song: res.data.artists
              })
              // console.log(res.data.artists);            
            }
          }).catch(err => {
            wx.hideLoading()
            console.log(err);
          })
      }else{
        wx.showLoading({
          title: '加载中...',
        })
        app.globalData.fly.get(`/artist/list?cat=${this.data.category[this.properties.index]}&&initial=${this.data.lete}`) //点击后请求
          .then(res => {
            if (res.data.artists) {
              wx.hideLoading()
              this.setData({
                song: res.data.artists
              })
              // console.log(res.data.artists);            
            }
          }).catch(err => {
            wx.hideLoading()
            console.log(err);
          })
      }
    },
    singer(e) {
    //  console.log(e)
      let singer_id = e.currentTarget.dataset.item.id
      // console.log(e.currentTarget.dataset.item.id)
      wx.navigateTo({
        url: `../../pages/singer/singerDetails/singerDetails?singer_id=${singer_id}`,
      })
    }
  }
})