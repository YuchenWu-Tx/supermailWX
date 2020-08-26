// pages/category/category.js
import {request} from "../../request/request.js"
Page({
  data: {
    cateAll:[],
    cateLeftList:[],
    caterightList:[],
    currentIndex:0,
    rightscrolltop:0
  },
  onLoad: function (options) {
    let cates = wx.getStorageSync('cates')
    // 数据过期时间为1000s
    if(!cates || Date.now()-cates.date>1000*3000){
      this.getcateAll()
    }else{
      this.setData({
        cateAll:cates.data,
        cateLeftList:cates.data.map(item=>item.cat_name),
        caterightList:cates.data[0].children
      })
    }
  },
  getcateAll(){
    request({url:"/categories"})
    .then(res=>{
      let cateAll = res.data.message
      // 缓存数据
      wx.setStorageSync('cates',{date:Date.now(),data:cateAll})
      this.setData({
        cateAll:cateAll,
        cateLeftList:cateAll.map(item=>item.cat_name),
        caterightList:cateAll[0].children
      })
    })
  },
  itemtap(e){
    let index = e.currentTarget.dataset.index
    let cateAll = this.__data__.cateAll
    this.setData({
      currentIndex:index,
      caterightList:cateAll[index].children,
      rightscrolltop:0
    })
  },













  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})