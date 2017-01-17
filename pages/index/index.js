// pages/index/index.js
var App = getApp();

var ApiUrl  = App.data.ApiUrl;

var Common = require('../../utils/common.js');


Page({
  data:{
    pageNum      : 0,
    pageNum_next : 1,
    PageCount    : App.data.PageCount,

    indexData    : {},
    isloading    : true,
    nomore       : true,
    moretext     : App.data.moretext

  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

    Common.showToast('数据加载中');

    this.getIndex();

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

    this.getIndex(true);

    

  },
  getIndex:function($Refresh=false){

    var page        = this;
    var nowPageNum  = this.data.pageNum;
    var nextpageNum = this.data.pageNum_next;
    var nowData     = this.data.indexData;
    var PageCount   = this.data.PageCount;
    if(!PageCount){
      PageCount = 5
    }

    if($Refresh){
      nowPageNum  = 0;
      nextpageNum = 1;
      nowData     = {}
    }

    wx.request({
      url: ApiUrl+'get_posts?count='+PageCount+'&page='+nextpageNum,
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
          Common.PostCate(Posts);

          // console.log('nowData');
          // console.log(nowData);
          if(nowData.length){
            // console.log('nowData 111');
            var newData=nowData.concat(Posts)
          }else{
            // console.log('nowData 000');
            var newData=Posts
          }
          // console.log('Posts');
          console.log('newData');
          console.log(newData);
          page.setData({
            indexData    : newData,
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

    //getIndex
    
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

      this.getIndex();

    }
    
  },
  gotoSingle:function(e){
    var id  = e.currentTarget.id;

    // Common.gotoSingle(id);
    wx.navigateTo({
      url: '../single/single?id='+id
    })

  }
})