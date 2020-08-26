// pages/goods_list/goods_list.js
import {request} from "../../request/request.js";



Page({
  data: {
    titles:['综合','销量','价格'],
    goodsList:[],
  },
  params:{
    "query":'',
    "cid":Number,
    "pagenum":1,
    "pagesize":10
  },
  maxPage:1,
  barIndexchange(Obj){
    console.log(Obj.detail)
    // 对this.params进行修改
    this.params.pagenum = 1
    // 清空数据
    this.setData({
      goodsList:[]
    })
    this.getgoodsList()
  },
  getgoodsList(callback){
    request({url:"/goods/search",data:this.params})
    .then(res=>{
      let goodsitem = res.data.message
      this.maxPage=Math.ceil(goodsitem.total/this.params.pagesize)
      this.setData({
        goodsList:[...this.data.goodsList,...goodsitem.goods],
      })
      this.params.pagenum++
      callback?callback():''
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.params.cid=Number(options.cid) || "",
    this.params.query = options.query || ""
    this.getgoodsList()
  },
  

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.params.pagenum = 1
    // 清空数据
    this.setData({
      goodsList:[]
    })
    this.getgoodsList(()=>{
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.params.pagenum==this.maxPage){
      wx.showToast({
        title: '商品加载完毕',
        icon: 'success',
        duration: 2000,
        mask:true
      })
    }else{
      this.getgoodsList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
})