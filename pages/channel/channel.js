// pages/channel/channel.js
var App = getApp();

var ApiUrl  = App.data.ApiUrl;

var Common = require('../../utils/common.js');


Page({
  data:{

    channelData : {}


  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

    Common.showToast('数据加载中');
    this.getChannel();

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
  },
  onPullDownRefresh:function(){
    wx.stopPullDownRefresh()
  },
  getChannel:function(){
    console.log('getChannel');
    console.log(ApiUrl);

    var page=this;
    wx.request({
      url: ApiUrl+'get_category_index',
      header: {
          'content-type': 'json'
      },
      success: function(res) {
        
        if(res.data.status  ==  "ok"){
          console.log(res.data.categories);

          Common.forCates(res.data.categories);

          page.setData({
            channelData:res.data.categories
          })
        }
        wx.hideToast();
      }
    })

    //getChannel
  },
  gotoCate:function(e){
    // console.log('goCate');
    // console.log(e.currentTarget.id);
    if(e.currentTarget.id>0){

      var cid = e.currentTarget.id;
      wx.navigateTo({
        url: '../category/category?id='+cid
      })

    }else{

      wx.showModal({
        title: '错误提示',
        showCancel:false,
        content: '未成功获取到分类ID',
        success: function(res) {
          if (res.confirm) {
            
          }
        }
      })

    }

    //  gotoCate
  }
})