// pages/single/single.js

var App = getApp();

var ApiUrl  = App.data.ApiUrl;

var Common = require('../../utils/common.js');

Page({
  data:{

    id   : 231,

    Post : {}

  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

    console.log(options);
    var getId  = options.id;

    if(getId){
      this.setData({
        id : getId
      })
    }

    
    Common.showToast('数据加载中');

    this.getSingle();


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
  getSingle:function(){

    var page = this;
    var id   = page.data.id;


    wx.request({
      url: ApiUrl+'get_post?id='+id,
      header: {
          'content-type': 'json'
      },
      success: function(res) {
        console.log(res.data);
        
        if(res.data.status  ==  "ok"){
          // console.log(res.data.posts);
          var post  = res.data.post;



/**

Github：https://github.com/icindy/wxParse

var article = '<div>我是HTML代码</div>';
/**
* WxParse.wxParse(bindName , type, data, target,imagePadding)
* 1.bindName绑定的数据名(必填)
* 2.type可以为html或者md(必填)
* 3.data为传入的具体数据(必填)
* 4.target为Page对象,一般为this(必填)
* 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
* /
var that = this;
WxParse.wxParse('article', 'html', article, that,5);

*/



          Common.processPostCate(post);

          page.setData({
            Post:post
          })


          wx.hideToast();


          return;

          // 设置title
          var Title = res.data.title;
          wx.setNavigationBarTitle({
            title: 'V电影_'+Title
          })
          

          // 获取文章列表
          var Posts = res.data.posts;
          // console.log(Posts);
          Common.processPostCate(Posts);
          // console.log(Posts);
          page.setData({
            categoryData : Posts,
            pageNum      : res.data.pages
          })
          wx.hideToast();
          
        }
        
      }
    })


  }
})