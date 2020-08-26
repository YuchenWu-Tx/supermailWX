// pages/pay/pay.js
import {login} from "../../utils/asyncWx"
import {request} from "../../request/request"
import {requestPaymenta} from "../../utils/asyncWx"
Page({
  data: {
    addressInfo:{},
    total:Number,
    cartsNum:Number,
    carts:[]
  },
  countTotal(){
    let {carts} = this.data
    let cartsNum = 0
    let total = carts.reduce((oldValue,item)=>{
      cartsNum+=item.num
      return oldValue+=(item.goods_price*item.num)
    },0)
    this.setData({
      cartsNum,
      total,
    })
  },
  tools_git(){
    if(wx.getStorageSync('loginParam')){
      login()
        // 获取用户token
      .then((res)=>{
        const code = res.code
        const loginParams={...wx.getStorageSync('loginParam'),code};
        return request({url:"/users/wxlogin",data:loginParams,method:"post"});
      })
        // 创建订单并获取订单编号
      .then((res)=>{
        let token = res;
        token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo" // 设置假数据模拟获取token
        wx.setStorageSync("token", token);
        let {total,carts} = this.data;
        let {address} = this.data.addressInfo;
        let goods = []
        carts.forEach((item)=>{
            goods.push({
              goods_id:item.goods_id,
              goods_number:item.num,
              goods_price:item.goods_price
          })
        })
        const orderParams = {goods,consignee_addr:address,order_price:total}
        const header = {"Authorization":token}
        return request({url:"/my/orders/create",data:orderParams,method:"post",header});
      })
        // 获取支付参数
      .then((res)=>{
        const{order_number} = res.data.message;
        const token = wx.getStorageSync("token")
        const header = {"Authorization":token}
        return request({url:"/my/orders/req_unifiedorder",data:{order_number},method:"post",header});
      })
       // 发起支付
      .then((res)=>{
        const {pay} = res.data.message ;
        return requestPaymenta(pay)  
      })
      .then((res)=>{
        console.log(res)
      })
      .catch((err)=>{
        console.log(err)
      })
    }else{
      wx.navigateTo({
        url: '/pages/auth/auth',
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let address = wx.getStorageSync('address')
    this.setData({
      addressInfo:address
    })
    //商品数据管理
    let carts = wx.getStorageSync('cart')||[]
    carts = carts.filter((item)=>{
      return item.check
    })
    this.setData({
      carts
    })
    this.countTotal()
  },
})