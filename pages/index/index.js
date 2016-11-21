//index.js
var Util = require('../../utils/util.js');
var Base = Util.base;

class HomeRecommend extends Base{
    constructor(){
        super();
        this.navArr=['推荐','居家','餐具','配件','服装','洗护','婴童','杂货','饮食','其它']
    }
    getJsonData(callback){
        var param={
            url: 'http://127.0.0.1/neteasy_yanxuan/pages/index/data.json', //仅为示例，并非真实的接口地址
            sCallback:function(data){
                callback && callback(data);
            }
        };
        this.request(param);
    }

    getMoreGoodsData1(callback){
        var param={
            url: 'http://127.0.0.1/neteasy_yanxuan/pages/index/moredata1.json', //仅为示例，并非真实的接口地址
            sCallback:function(data){
                callback && callback(data);
            }
        };
        this.request(param);
    }

    getMoreGoodsData2(callback){
        var param={
            url: 'http://127.0.0.1/neteasy_yanxuan/pages/index/moredata2.json', //仅为示例，并非真实的接口地址
            sCallback:function(data){
                callback && callback(data);
            }
        };
        this.request(param);
    }

};

//获取应用实例
var app = getApp()

var classArr=['selected'];

var myHome=new HomeRecommend()  //实例化 home 的推荐页面

Page({
      data: {
          navArr:myHome.navArr,
          viewClassArr:['show'],
          classArr:classArr,
          currentItem:0,
          imgArr:[],
          specialSwiper:{dot:false,auto:false},
          modalHidden:true,
          loadingHidden:true,
          threshold:200,
          moreData1:false,
          moreData2:false,
          moreData3:false,
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
        myHome.getJsonData((data)=>{
            that.setData({
                imgArr: data.banners,
                goodsBrand:data.goods.goodsBrand,
                goodsNewArr:data.goods.goodsNewArr,
                goodsRecommentArr:data.goods.goodsRecommentArr,
                goodsSpecialArr:data.goods.goodsSpecialArr,
                goodsHomeArr:data.goods.goodsHomeArr,

                goodsKitchenArr:[],
                goodsPartsArr:[],
                goodsClothesArr:[],


                goodsWashingArr:[],
                goodsBabyArr:[],
                goodsGroceriesArr:[],

                goodsFoodArr:[],
                goodsOtherArr:[],
            });
        });
      },

      selecteClass:function(event){
         var target=event.target;
          this.setData({
            currentItem:target.dataset.index
      })
    },

      //滚动加载更多商品
      loadMoreGoods:function(){
          if(!this.data.moreData1) {
              myHome.getMoreGoodsData1((data)=> {
                  this.setData({
                      moreData1: true,
                      goodsKitchenArr: data.goodsKitchenArr,
                      goodsPartsArr: data.goodsPartsArr,
                      goodsClothesArr: data.goodsClothesArr
                  });
              });
          }
          //if(!this.data.moreData2){
          //    myHome.getMoreGoodsData2((data)=> {
          //        this.setData({
          //            moreData2: true,
          //            goodsKitchenArr: data.goodsKitchenArr,
          //            goodsPartsArr: data.goodsPartsArr,
          //            goodsClothesArr: data.goodsClothesArr
          //        });
          //    });
          //}
      },


})


