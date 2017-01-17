
function PostCate(posts,$type="post"){
    // console.log(posts);
    
    var page=this;
    for(var i=0;i<posts.length;i++){
      var post=posts[i];
      if($type=='subject'){
        page.processSubjectCate(post);
      }else{
        page.processPostCate(post);
      }
      
    }

}

// 单个文章处理
function processPostCate(post){
    // console.log(post);

    var has_thumbnail = true;

    if(!post.thumbnail_images){
      // 无特色图片
      // console.log(post.thumbnail_images);
      // http://theme.shejiwo.net/movie/wp-content/themes/Movie2.0/images/smartideo.gif
      var thumbnail = '';  //post.thumbnail_images.full.url;
      if(!thumbnail){
        thumbnail="http://theme.shejiwo.net/movie/wp-content/themes/Movie2.0/images/smartideo.gif";
        has_thumbnail = false;
      }
    }else{
      var thumbnail = post.thumbnail_images.full.url;
    }
    console.log(thumbnail);

    var categories=post.categories;
    var categoriesArr='';
    // console.log(categories);
    for(var index in categories){
      if(categoriesArr==''){
        categoriesArr=categories[index].title;
      }else{
        categoriesArr=categoriesArr+"、"+categories[index].title;
      }
    }
    // console.log(categoriesArr);
    post.thumbnail     = thumbnail;
    post.has_thumbnail = has_thumbnail;
    post.cateArr       = categoriesArr;
}


// 单个专题处理
function processSubjectCate(post){
    console.log(post);
    var subject_thumbnail = post.custom_fields.subject_thumbnail_value;
    var has_thumbnail = true;
    var subject_excerpt = post.custom_fields.subject_excerpt_value;
    
    if(!subject_thumbnail){
      subject_thumbnail=["http://theme.shejiwo.net/movie/wp-content/themes/Movie2.0/images/smartideo.gif"];
      has_thumbnail = false;
    }

    subject_thumbnail = subject_thumbnail[0];

    
    if(!subject_excerpt){
      subject_excerpt=["暂无专题描述"];
    }

    subject_excerpt = subject_excerpt[0];

    

    // console.log(subject_thumbnail);
    // console.log(categoriesArr);
    post.thumbnail       = subject_thumbnail;
    post.has_thumbnail   = has_thumbnail;
    post.subject_excerpt = subject_excerpt;
}



// showToast
function showToast($Title,$Type='loading'){

  wx.showToast({
    title    : $Title,
    icon     : $Type,
    duration : 10000,
    mask     : false
  })
}


// forCates
function forCates(cates){
  console.log(cates);
  var page=this;
  for(var i=0;i<cates.length;i++){
    var cate=cates[i];
    // console.log(cate)
    page.processCate(cate);
  }

}


function processCate(cate){
    console.log(cate);
    var thumbnail = '';
    var hiddenTitle = true;
    if(!cate.thumbnail){
      thumbnail="http://theme.shejiwo.net/movie/wp-content/themes/Movie2.0/images/smartideo.gif";
      hiddenTitle = false;

    }else{
      thumbnail  = cate.thumbnail
    }

    cate.thumbnail   = thumbnail;
    cate.hiddenTitle = hiddenTitle;


}





module.exports={
    forCates           : forCates,
    PostCate           : PostCate,
    showToast          : showToast,
    processCate        : processCate,
    processPostCate    : processPostCate,
    processSubjectCate : processSubjectCate
}
