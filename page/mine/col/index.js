// page/classify/index.js
var app = getApp();
var util = require('../../../utils/util');
var Bmob = require('../../../utils/bmob.js')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;

		// that.getList();
	},
	getList: function(){
		var that = this;
		var query = Bmob.Query('col');
		query.equalTo("userId", '==', wx.getStorageSync('userId') );
   		query.include("userAttr");  //userAttr 字段名称，类型 Pointer
   		query.include("goodsAttr");  //bookAttr 字段名称，类型 Pointer
   		query.order('-createdAt');
   		query.find().then(res => {
			util.hideLoading();
			console.log(res);
			that.setData({
				length:res.length,
				book_list : res
			});
		});
	},

	GoDetail: function (e) {
		wx.navigateTo({
			url: '/page/info/index?objectId=' + e.currentTarget.dataset.id,
		})
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		var that = this;

		that.getList();
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})