const host = process.env.apiUrl;
console.log(process.env.apiUrl)
export default function request({ url, data, method }) {
  wx.showLoading({
    title: "正在加载中...."
  });
  return new Promise((resolve, reject) => {
    const token = wx.getStorageSync('TOKEN')
    wx.request({
      url: host + url,
      data: data,
      method: method,
      header: {
        "content-type": "application/json",
        "Authorization": token
      },
      success: function(res) {
        wx.hideLoading();
        if(res.data.success === false) {
          if(res.data.status === 401) {
            wx.setStorage({
              key:"TOKEN",
              data:""
            })
            mpvue.navigateTo({
              url: '/pages/login/main'
            })
          } else {
            wx.showToast({
              title: res.data.desc,
              icon: 'none',
              duration: 2000
			      })
			
            reject(res);
          }
        } else {
          resolve(res.data)
        }
      },
      fail: function(res) {
        wx.hideLoading();
        reject(res);
      },
      complete: function(res) {
        // wx.hideLoading();
      }
    });
  });
}
