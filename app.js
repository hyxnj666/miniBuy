//app.js
App({
  //onLaunch,onShow: options(path,query,scene,shareTicket,referrerInfo(appId,extraData))
  onLaunch: function (options) {
    console.log(999);
    let code = 400;
    wx.setStorageSync("code", code)
  },
  onShow: function (options) {
 
    console.log(222);

  },
  onHide: function () {

  },
  onError: function (msg) {

  },
  //options(path,query,isEntryPage)
  onPageNotFound: function (options) {

  },

});
