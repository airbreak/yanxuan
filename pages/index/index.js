//index.js
var Util = require('../../utils/util.js');
var Base = Util.base;

class HomeRecommend extends Base{
    constructor(){
        super();
        this.navArr=['推荐','居家','餐具','配件','服装','洗护','婴童','杂货','饮食','其它'];
        this.baseUrl='http://7xqnxu.com1.z0.glb.clouddn.com/yanxuan_';

    }
    getJsonData(callback){
        var param={
            url: this.baseUrl+'data.json',
            sCallback:function(data){
                console.log('ok:')
                console.log(data);
                callback && callback(data);
            }
        };
        this.request(param);
    }

    getMoreGoodsData1(callback){
        var param={
            url: this.baseUrl+'moredata1.json',
            sCallback:function(data){
                callback && callback(data);
            }
        };
        this.request(param);
    }

    getMoreGoodsData2(callback){
        var param={
            url: this.baseUrl+'moredata2.json',
            sCallback:function(data){
                callback && callback(data);
            }
        };
        this.request(param);
    }

    getMoreGoodsData3(callback){
        var param={
            url: this.baseUrl+'moredata3.json', //仅为示例，并非真实的接口地址
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
          moreData1:true,
          moreData2:true,
          moreData3:true,
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
          if(this.data.moreData1) {
              myHome.getMoreGoodsData1((data)=> {
                  this.setData({
                      moreData1: false,
                      goodsKitchenArr: data.goodsKitchenArr,
                      goodsPartsArr: data.goodsPartsArr,
                      goodsClothesArr: data.goodsClothesArr
                  });
              });
              return;
          }
          if(this.data.moreData2){
              myHome.getMoreGoodsData2((data)=> {
                  this.setData({
                      moreData2: false,
                      goodsWashingArr: data.goodsWashingArr,
                      goodsBabyArr: data.goodsBabyArr,
                      goodsGroceriesArr: data.goodsGroceriesArr
                  });
              });
              return;
          }
          if(this.data.moreData3){
              myHome.getMoreGoodsData3((data)=> {
                  this.setData({
                      moreData3: false,
                      goodsFoodArr: data.goodsFoodArr,
                      goodsOtherArr: data.goodsOtherArr
                  });
              });
              return;
          }
      },
})


