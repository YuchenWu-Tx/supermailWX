// pages/goods_detail/goods_detail.js
import {request} from "../../request/request.js";


Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail_info:{},
  },
  params:{
    goods_id:Number
  },
  previewImgurl:[],
  previewImage(e){
    let current = e.currentTarget.dataset.url
    wx.previewImage({
      current:current, // 当前显示图片的http链接
      urls: this.previewImgurl
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.params.goods_id = options.goods_id
    this.getDetailInfo()
  },
  getDetailInfo(){
    request({url:"/goods/detail",data:this.params})
    .then(res=>{
      let info = res.data.message
      console.log(info)
      this.previewImgurl = info.pics.map(item=>item.pics_mid)
      this.setData({
        detail_info:{
          pics:info.pics,
          goods_big_logo:info.goods_big_logo,
          goods_introduce:info.goods_introduce,
          goods_small_logo:info.goods_small_logo,
          goods_price:info.goods_price,
          goods_name:info.goods_name,
          goods_id:info.goods_id
        },
      })
    })
  },
  addgoods(){
    let carts = wx.getStorageSync('cart')||[]
    let index = carts.findIndex(item=>item.goods_id==this.data.detail_info.goods_id)
    if(index==-1){
      let cart = JSON.parse(JSON.stringify(this.data.detail_info))
      cart['num'] =1
      cart['check'] = true
      carts.push(cart)
    }else{
      carts[index].num++
    }
    wx.setStorageSync('cart', carts)
    wx.showToast({
      title: '添加购物车成功',
      mask:true,
    })
  }
})