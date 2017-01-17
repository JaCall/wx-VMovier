// pages/user/user.js
var App = getApp();

var ApiUrl  = App.data.ApiUrl;

var Common = require('../../utils/common.js');


Page({
  data:{
    userInfo : [],

    gender   : 1

  },
  onPullDownRefresh:function(){
    wx.stopPullDownRefresh()
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

    var page=this;

    App.getUserInfo(function(userInfo){
      console.log(userInfo);
      //更新数据
      page.setData({
        userInfo : userInfo,
        gender   : userInfo.gender
      })
      
    })


  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})