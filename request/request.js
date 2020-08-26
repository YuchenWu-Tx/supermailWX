let reqcount = 0
const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1";
export const request=(option)=>{
  reqcount++
  wx.showLoading({
    title: '加载中',
  })
  return new Promise((resolve,reject)=>{
    wx.request({
      ...option,
      url:baseUrl+option.url,
      success:(res)=>{
        resolve(res)
      },
      fail:(err)=>{
        reject(err)
      },
      complete(){
        reqcount--
        if(reqcount==0){
          wx.hideLoading()
        } 
      }
    })
  })
}