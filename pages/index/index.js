// 0 引入 用来发送请求的 方法 一定要把路径补全
import { request } from "../../request/index.js";

//Page Object
Page({
  data: {
    // 轮播图数据
    swiperList: [],
    // 导航数组 
    catesList: [],
    // 楼层数据
    floorList: []
  },
  //options(Object)
  onLoad: function (options) {
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     this.setData({
    //       swiperList: result.data.message
    //     })
    //   },
    // });

    this.getSwiperList();
    this.getCateList();
    this.getFloorList()

  },

  // 获取轮播图数据 
  getSwiperList() {
    request({ url: "/home/swiperdata" }).then(result => {
      // /pages/goods_detail/index?goods_id=129
      result.forEach(v => {
        let data = v.navigator_url
        // console.log(data);
        let url = data.replace(/main/g, 'index');//'xbcdx'
        // console.log(url);
        v.navigator_url = url
      })
      this.setData({
        swiperList: result
      })
    })
  },

  // 获取 导航数据 
  getCateList() {
    request({ url: "/home/catitems" }).then(result => {
      this.setData({
        catesList: result
      })
    })
  },

  // 获取楼层数据
  getFloorList() {
    request({ url: "/home/floordata" }).then(result => {
      // console.log(result);
      result.forEach(v => {
        v.product_list.forEach(item => {
          // console.log(item.navigator_url);
          let data = item.navigator_url
          let url = data.split('=');
          // console.log(url);
          item.navigator_url = '/pages/goods_list/index?query=' + url[1]
          // console.log(item.navigator_url);
        })
      })
      this.setData({
        floorList: result
      })
    })
  }
});