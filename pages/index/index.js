//index.js

function Home(){

};

Home.prototype={
  getIndexForNavMenu:function(name){
    var len=navArr.length
    for(var i=0;i<len;i++){
      if(name==navArr[i]){
        return i;
      }
    }
  }
}

//获取应用实例
var app = getApp()
var navArr=['推荐','居家','餐具','配件','服装','洗护','婴童','杂货','饮食','其它']
var myHome=new Home()
Page({
  data: {
    navArr:navArr,
    currentIndex:0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  selecteClass:function(event){
    var target=event.target,
         index = myHome.getIndexForNavMenu(target.dataset.titleName)
  }
})


