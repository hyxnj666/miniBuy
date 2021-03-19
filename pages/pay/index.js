
/* 
1 页面加载的时候
  1 从缓存中获取购物车数据 渲染到页面中
    这些数据  checked=true 
2 微信支付
  1 哪些人 哪些帐号 可以实现微信支付
    1 企业帐号 
    2 企业帐号的小程序后台中 必须 给开发者 添加上白名单 
      1 一个 appid 可以同时绑定多个开发者
      2 这些开发者就可以公用这个appid 和 它的开发权限  
3 支付按钮
  1 先判断缓存中有没有token
  2 没有 跳转到授权页面 进行获取token 
  3 有token 。。。
  4 创建订单 获取订单编号
  5 已经完成了微信支付
  6 手动删除缓存中 已经被选中了的商品 
  7 删除后的购物车数据 填充回缓存
  8 再跳转页面 
 */
import { getSetting, chooseAddress, openSetting, showModal, showToast, requestPayment } from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from "../../request/index.js";
Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
  arr: [],
  onShow() {
    // 1 获取缓存中的收货地址信息
    const address = wx.getStorageSync("address");
    // 1 获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart") || [];
    // 过滤后的购物车数组
    cart = cart.filter(v => v.checked);
    this.setData({ address });

    // 1 总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
    })
    this.setData({
      cart,
      totalPrice, totalNum,
      address
    });
  },
  // 点击 支付 
  async handleOrderPay() {
    try {

      // 1 判断缓存中有没有token 
      const info = wx.getStorageSync("info");
      // 2 判断
      // console.log(code);
      if (!info) {
        // console.log(1);
        wx.navigateTo({
          url: '/pages/auth/index'
        });
        return;
      }
      // 3 创建订单
      // 3.1 准备 请求头参数
      // const header = { Authorization: token };
      // 3.2 准备 请求体参数

      await showToast({ title: "支付成功" });

      // console.log(this.cartArr);
      // wx.setStorageSync("cartArr", this.cartArr)
      // 8 手动删除缓存中 已经支付了的商品
      let newCart = wx.getStorageSync("cart");
      let newCarts = newCart.filter(v => !v.checked);


      // 订单数据

      let cartArr = wx.getStorageSync("cartArr") || [];
      debugger
      console.log(cartArr, wx.getStorageSync("cartArr"));


      // 成功的订单数据

      let readyCart = newCart.filter(v => v.checked);
      console.log(readyCart);
      readyCart.forEach(v => {
        let obj = {};
        obj.time = v.add_time;
        obj.price = v.goods_price * v.num;
        obj.upd_time = v.upd_time
        this.arr.push(obj);
      })
      let cartArr1 = [...cartArr, ...this.arr]
      // 剩余购物车数据
      console.log(cartArr);
      console.log(cartArr1);
      console.log(this.arr);
      // newCart = newCart.filter(v => !v.checked);
      // wx.setStorageSync("cart", newCart);
      wx.setStorageSync("cart", newCarts);

      wx.setStorageSync("cartArr", cartArr1)
      // console.log(cartArr);

      // 8 支付成功了 跳转到订单页面
      wx.navigateTo({
        url: '/pages/order/index?type=1'
      });

    } catch (error) {
      console.log(error);
      await showToast({ title: "支付失败" })
    }
  }


})



