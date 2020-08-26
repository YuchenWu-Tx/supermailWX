//index.js
import {request} from "../../request/request.js";
//获取应用实例
const app = getApp()
Page({
  data: {
    swiperList:[],
    navMeun:[],
    floorList:[]
  },
  onLoad: function () {
    this.getSwiperList()
    this.getNavMenu()
    this.getfloorList()
  },
  getSwiperList:function(){
    request({url:"/home/swiperdata"})
    .then(res=>{
      this.setData({
        swiperList:res.data.message
      })
    })
  },
  getNavMenu(){
    request({url:"/home/catitems"})
    .then(res=>{
      this.setData({
        navMeun:res.data.message
      })
    })
  },
  getfloorList(){
    request({url:"/home/floordata"})
    .then(res=>{
      this.setData({
        floorList:res.data.message
      })
    })
  }
})
