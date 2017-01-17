// pages/subject/subject.js
var App = getApp();

var ApiUrl  = App.data.ApiUrl;

var Common = require('../../utils/common.js');


Page({
  data:{
    pageNum      : 0,
    pageNum_next : 1,
    PageCount    : App.data.PageCount,

    subjectData  : {},
    isloading    : true,
    nomore       : true,
    moretext     : App.data.moretext

  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

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

    Common.showToast('数据刷新中');

    this.getSubject(true)
  },
  getSubject:function($Refresh=false){
    console.log('getSubject');


    var page        = this;
    var nowPageNum  = this.data.pageNum;
    var nextpageNum = this.data.pageNum_next;
    var nowData     = this.data.subjectData;
    var PageCount   = this.data.PageCount;
    // var PageCount = 20;
    if(!PageCount){
      PageCount = 5
    }

    if($Refresh){
      nowPageNum  = 0;
      nextpageNum  = 1;
      nowData = {}
    }

    wx.request({
      url: ApiUrl+'get_posts?post_type=subject&count='+PageCount+'&page='+nextpageNum,
      header: {
          'content-type': 'json'
      },
      success: function(res) {
        console.log(res.data);
        // return;
        
        if(res.data.count  >  0){
          // console.log(res.data.posts);

          // 获取文章列表
          var Posts = res.data.posts;
          // console.log(Posts);
          Common.PostCate(Posts,'subject');

          // console.log(nowData);
          if(nowData.length){
            var newData=nowData.concat(Posts)
          }else{
            var newData=Posts
          }
          // console.log('Posts');
          // console.log(Posts);
          page.setData({
            subjectData  : newData,
            pageNum      : nextpageNum,
            pageNum_next : nextpageNum+1,
            isloading    : true,
            nomore       : false
          })

          if($Refresh){
            wx.stopPullDownRefresh()
          }

          wx.hideToast();
          
        }else{

          page.setData({
            pageNum_next : -100,
            isloading    : true,
            nomore       : false,
            moretext     : '没有更多了'
          })
          wx.hideToast();

        }
        
      }
    })

    //getSubject

  },
  onReachBottom:function(){
    console.log('onReachBottom');

    if(this.data.pageNum_next  < 0){
      // 没有更多了
      console.log('没有更多了');
      this.setData({
        pageNum_next : -100,
        isloading    : true,
        nomore       : false,
        moretext     : '没有更多了'
      })

    }else{
      // 还能下拉

      this.setData({
        isloading : false,
        nomore    : true
      })

      Common.showToast('数据加载中');

      this.getSubject();

    }
    
  },
  gotoSubject:function(e){
    var id  = e.currentTarget.id;

    // Common.gotoSingle(id);
    wx.navigateTo({
      url: '../subject_single/subject_single?id='+id
    })

  }
})