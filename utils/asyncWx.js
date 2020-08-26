/**  
 *获取地址权限设置
*/
export const getSetting = ()=>{
  return new Promise((resolve,reject)=>{
    wx.getSetting({
      fail: (res) => {
        reject(res)
      },
      success: (result) => {
        resolve(result)
      },
    })
  })
}

/**  
 *打开地址选择
*/
export const chooseAddress = ()=>{
  return new Promise((resolve,reject)=>{
    wx.chooseAddress({
      fail: (res) => {
        reject(res)
      },
      success:(res) =>{
        resolve(res)
      }
    })
  })
}

/**  
 *登录获取code
*/
export const login = ()=>{
  return new Promise((resolve,reject)=>{
    wx.login({
      fail: (res) => {
        reject(res)
      },
      success:(res) =>{
        resolve(res)
      }
    })
  })
}

/**  
 *获取微信支付
*/
export const requestPaymenta = (option)=>{
  return new Promise((resolve,reject)=>{
    wx.requestPayment({
      ...option,
      success(){
        resolve('支付成功')
      },
      fail(){
        reject("支付失败")
      }
    })
  })
}