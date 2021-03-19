import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import { login } from "../../utils/asyncWx.js";
// pages/auth/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  // cartArr: [],

  async handleGetUserInfo(e) {
    // 1 获取用户信息
    const { encryptedData, rawData, iv, signature } = e.detail;
    // 2 获取小程序登录成功后的code
    const { code } = await login();
    const loginParams = { encryptedData, rawData, iv, signature, code };
    //  3 发送请求 获取用户的token
    // const res = await request({ url: "/users/wxlogin", data: loginParams, method: "post" });
    // console.log(code);
    // console.log(loginParams);
    // console.log(res);
    // console.log(loginParams);
    if (loginParams.encryptedData) {
      let info = loginParams.encryptedData
      wx.setStorageSync("info", info);
      console.log(1);
    }

    wx.navigateBack({
      delta: 1
    });
  }
  // let cart = wx.getStorageSync("cart")

})
