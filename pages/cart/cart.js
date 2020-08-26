// pages/cart/cart.js
import {getSetting,chooseAddress} from "../../utils/asyncWx"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressInfo:{},
    addressShow:false,
    carts:[],
    total:0,
    catesNum:0,
    allcheck:true
  },
  addressHandler(){
    let licence = false
    getSetting()
    .then((res)=>{
      licence = res.authSetting['scope.address']
      if(licence === false){
        wx.openSetting()
        throw "err"
      }else{
        return chooseAddress()
      }
      }
    )
    .then((addressInfo)=>{
      addressInfo['address'] = addressInfo.provinceName+addressInfo.cityName+addressInfo.countyName+addressInfo.detailInfo
      wx.setStorageSync('address', addressInfo)
    })
    .catch((err)=>{
      console.log(err)
    })
  },
  countTotal(){
    let {carts} = this.data
    let cartsNum = 0
    let total = carts.reduce((oldValue,item)=>{
      if(item.check){
        cartsNum+=item.num
        return oldValue+=(item.goods_price*item.num)
      }else{
        return oldValue
      }
    },0)
    let allcheck = !(carts.some((item=>{
      return !(item.check)
    })))
    allcheck = carts.length==0?false:allcheck
    this.setData({
      cartsNum,
      total,
      allcheck
    })
  },
  itemcheck(e){
    let {carts} = this.data
    let index = e.currentTarget.dataset.index
    carts[index].check = !(carts[index].check)
    this.setData({
      carts,
    })
    wx.setStorageSync('cart',carts)
    this.countTotal()
  },
  btnAllcheck(){
    let {carts,allcheck} = this.data
    carts = carts.map(element => {
      element.check = !allcheck
      return element
    });
    this.setData({
      carts,
      allcheck:!allcheck
    })
    wx.setStorageSync('cart',carts)
    this.countTotal()
  },
  control_sub(e){
    let {carts} = this.data
    let index = e.currentTarget.dataset.index
    if(carts[index].num==1){
      wx.showModal({
        title: '提示',
        content: '是否删除商品',
        success: (res)=> {
          if (res.confirm) {
            carts.splice(index,1)
            this.setData({
              carts,
            })
            wx.setStorageSync('cart',carts)
            this.countTotal()
          } else if (res.cancel) {
            return 0
          }
        }
      })
    }else{
      carts[index].num--
    }
    this.setData({
      carts,
    })
    wx.setStorageSync('cart',carts)
    this.countTotal()
  },
  control_add(e){
    let {carts} = this.data
    let index = e.currentTarget.dataset.index
    carts[index].num++
    this.setData({
      carts,
    })
    wx.setStorageSync('cart',carts)
    this.countTotal()
  },
  tools_git(){
    let {carts,addressShow} = this.data
    if(!carts.length){
      wx.showToast({
        title: '请添加商品',
      })
    }else if(!addressShow){
      wx.showToast({
        title: '请添加地址',
      })
    }else{
      wx.navigateTo({
        url: '/pages/pay/pay',
      })
    }
  },
  onShow: function () {
    // 地址管理
    let address = wx.getStorageSync('address')
    let addressShow = address.userName?true:false
    this.setData({
      addressShow,
      addressInfo:address
    })
    //商品数据管理
    let carts = wx.getStorageSync('cart')||[]
    this.setData({
      carts
    })
    // 计算价格
    this.countTotal()
  },
  
})