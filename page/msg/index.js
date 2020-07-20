var app = getApp();
var util = require('../../utils/util');
var Bmob = require('../../utils/bmob.js')
function getToday() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

Page({
	data: {
		type:1,
		today:'',
		currentTab:0,
	},
	//跳转搜索页面
	onScearhTap: function (e) {
		wx.navigateTo({
			url: '/page/search/index',
		})
	},
	onLoad: function (options) {
		var that = this;
		wx.getSystemInfo({
            success: (res) => {
                that.setData({
                    pixelRatio: res.pixelRatio,
                    windowHeight: res.windowHeight,
                    windowWidth: res.windowWidth
                })
            },
        })
	},

	// 获取房屋分类
	getClassify:function(){
		var that = this;
		// 加载
		util.showLoading();
		// 获取百科分类表
		var query = Bmob.Query('article_classify');
		// 获取表中的数据
		query.find().then(function (results) {
			//  关闭加载
			util.hideLoading();
			// console.log('租房大计的id',results[0].objectId);
			that.setData({
				nowClassify:results[0].objectId,
				classList: results,
			});
			that.getNews();
		}, function () {
			util.hideLoading();
		});
	},
	// 切换分类
	changeCategory:function(e){
		var that = this;
		that.setData({
			nowClassify:e.currentTarget.dataset.id,
		});
		that.getNews();
	},
	// 获取资讯
	getNews:function(){
		var that = this;
		util.showLoading();
		var query = Bmob.Query('article');
		query.order('-read_num');
		query.order('-createdAt');
		query.equalTo("classify",'==',  that.data.nowClassify);
		query.find().then(res => {
			util.hideLoading();
			that.setData({
				goods_list: res
			});
			util.hideLoading();
			// console.log('获取的资讯列表',res);
		});
	},
    makeNavigate:function(e){
    	wx.navigateTo({
    		url:e.currentTarget.dataset.url
    	});
    },
	onShow: function() {
		var that = this;
		that.getClassify();
		that.getNews(); 
	},
});