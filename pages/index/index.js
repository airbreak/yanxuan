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
  },
  getJsonData:function(callback){
    wx.request({
            url: 'http://127.0.0.1/wechat/index.json', //仅为示例，并非真实的接口地址
            // data: null,
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
              callback && callback(res.data);
            },
            fail:function(err){
              err;
            }
        });
  }
}

//获取应用实例
var app = getApp()
var navArr=[{title:'推荐',index:0},
{title:'居家',index:1},
{title:'餐具',index:2},{title:'配件',index:3},
{title:'服装',index:4},{title:'洗护',index:5},
{title:'婴童',index:6},{title:'杂货',index:7},
{title:'饮食',index:8},{title:'其它',index:9}]
var classArr=['selected'];
var myHome=new Home()
Page({
  data: {
    navArr:navArr,
    viewClassArr:['show'],
    classArr:classArr,
    currentItem:'推荐',
    colorsArr:['#6F5499','#1E69AD','#59AF50','#563D7C',
    '#CF4646','#3998DB','#51A67B','#EFD65B','#653A54','#5BB69A'],
    imgArr:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    });
    myHome.getJsonData(function(data){
        that.setData({
          imgArr:data.banners,
          goodsBrand:data.goods.goodsBrand
        });
    });
  },
  selecteClass:function(event){
     var target=event.target,
         index = myHome.getIndexForNavMenu(target.dataset.titleName);
      this.setData({
        currentItem:target.dataset.titleName
      })
  }
})


