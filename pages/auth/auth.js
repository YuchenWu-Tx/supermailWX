// pages/auth/auth.js
import {request} from "../../request/request"
Page({
  handleGetUserInfo(e){
    if(e.detail.iv){
      const { encryptedData, rawData, iv, signature } = e.detail;
      const loginParam={ encryptedData, rawData, iv, signature };
      wx.setStorageSync('loginParam', loginParam)
      /* login()
      .then((res)=>{
        const code = res.code
        const loginParams={ encryptedData, rawData, iv, signature ,code};
        const {token}= request({url:"/users/wxlogin",data:loginParams,method:"post"});
        wx.setStorageSync("token", token);
      }) */
    }
    wx.navigateBack({
      delta: -1,
    })
  }
})