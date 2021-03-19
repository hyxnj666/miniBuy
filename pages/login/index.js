// pages/login/index.js
Page({
  handleGetUserInfo(e) {
    // console.log(e);

    const { userInfo } = e.detail;
    wx.setStorageSync("userinfo", userInfo);
    console.log(userInfo);
    if (userInfo != undefined) {
      console.log(1);
      let code = 200
      wx.setStorageSync("code", code)
    } else {
      let code = 400
      wx.setStorageSync("code", code)
    }
    wx.navigateBack({
      delta: 1
    });

  }
})