// pages/subject_single/subject_single.js
var App = getApp();

var ApiUrl  = App.data.ApiUrl;

var Common = require('../../utils/common.js');

Page({
  data:{

    id          : 119,
    postid      : 0,

    Subject     : {},

    SubjectData : {}

  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
    var getId  = options.id;

    if(getId){
      this.setData({
        id:getId
      })
    }

    Common.showToast('数据加载中');

    this.getSubject();
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
  getSubject:function(){
    console.log('getSubject');


    var page = this;
    var id   = page.data.id;


    wx.request({
      url: ApiUrl+'get_post?post_type=subject&id='+id,
      header: {
          'content-type': 'json'
      },
      success: function(res) {
        // console.log(res.data.post);

        var post   = res.data.post;
        var postid = res.data.post.custom_fields.post_array_value;
        Common.processSubjectCate(post)
        console.log(post);
        console.log(postid);
        page.setData({
          Subject : post,
          postid  : postid
        })

        // 设置title
        var Title = post.title;
        wx.setNavigationBarTitle({
          title: Title+'_V电影'
        })

        page.getSubjectPost();


        

        
      }
    })
  },
  getSubjectPost:function(){
    // SubjectData
    console.log('get Subject Post');
    var page   = this;
    var postid = this.data.postid;
    console.log(postid);

    if(postid){

      wx.request({
        url: ApiUrl+'get_posts?id='+postid,
        header: {
            'content-type': 'json'
        },
        success: function(res) {
          console.log(res.data);
          // return;
          
          if(res.data.count  >  0){
            console.log(res.data.posts);
            // 获取文章列表
            var Posts = res.data.posts;
            // console.log(Posts);
            Common.PostCate(Posts);
            
            page.setData({
              SubjectData:Posts
            })

            wx.hideToast();

          }
          
        }
      })
    

    }else{
      wx.hideToast();
    }
    

    // getSubjectPost
  },   
  gotoSingle:function(e){
    var id  = e.currentTarget.id;

    // Common.gotoSingle(id);
    wx.navigateTo({
      url: '../single/single?id='+id
    })

  },
  onShareAppMessage: function () {
    var id = this.data.id;

    return {
      title : '自定义分享标题',
      desc  : '自定义分享描述',
      path  : '/page/subject_single/subject_single?id='+id
    }
  }
})