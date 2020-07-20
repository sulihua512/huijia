var app = getApp();
var util = require('../../utils/util');
var Bmob = require('../../utils/bmob.js')
Page({
    data: {
        allgoods: [],
        goodsList: [],
        classifyList: [],
        cart: {
            count: 0,
            total: 0,
        },
        height_list: '20',
    },
    //页面加载时， 获取传过来的参数
    onLoad: function(options) {
        var that = this;
        // 获得房屋分类
        that.getClassIfy();
        // 获取房屋对应房源列表
        that.getGoodsList();
    },
    getClassIfy: function() {
        var that = this;
        util.showLoading();
        var query = Bmob.Query('classify');
        query.find().then(function(results) {
            util.hideLoading();
            that.setData({
                classifyList: results,
            });
            if (that.data.classifySeleted == undefined) {
                console.log(results[0]['objectId']);
                that.setData({
                    classifySeleted: results[0]['objectId']
                });
            }
            that.getClassGoods();
        }, function() {
            util.hideLoading();
        });
    },
    getClassGoods: function() {
        console.log('getClassGoods');
        util.showLoading();
        var that = this;
        var classifySeleted = that.data.classifySeleted;
        var query = Bmob.Query("goods");
        query.equalTo("classify", "==", classifySeleted);
        query.find().then(function(results) {
            util.hideLoading();
            that.setData({
                classgoods: results,
            });
        }, function() {
            util.hideLoading();
        });
    },
    getGoodsList: function() {
        var that = this;
        var query = Bmob.Query("goods");
        query.find().then(function(results) {
            util.hideLoading();
            that.setData({
                allgoods: results,
            });
        }, function() {
            util.hideLoading();
        });
    },
    onShow: function() {
        // this.setData({
        // 	classifySeleted: this.data.goodsList[0].id
        // });
        var that = this;
        that.getClassIfy();
        that.getGoodsList();
	},
	tapClassify: function (e) {
		console.log(this.data.classgoods);
		var id = e.target.dataset.id;
		var that = this;
		that.setData({
			classifySeleted: id
		});
		that.getClassGoods();
	},
    makeNavigate:function(e){
        wx.navigateTo({
            url:e.currentTarget.dataset.url
        });
    },
});